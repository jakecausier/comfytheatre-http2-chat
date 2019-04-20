'use strict'

const env = require('dotenv').config();
const http2 = require('http2');
const fs = require('fs');
const path = require('path');
const cookie = require('cookie');
const helper = require('./src/helper');

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

const { HTTP2_HEADER_PATH } = http2.constants
const URL = process.env.SERVER_URL;
const PORT = process.env.SERVER_PORT
const PUBLIC_PATH = path.join(__dirname, './public')

const publicFiles = helper.getFiles(PUBLIC_PATH)

// Push file
function push (stream, path) {
  const file = publicFiles.get(path)

  if (!file) {
    return
  }
  stream.pushStream({[HTTP2_HEADER_PATH]: path }, (err, pushStream, headers) => {
    pushStream.respondWithFD(file.fileDescriptor, file.headers)
  })
}

const clients = {};         // Object of registered users
const messageLimit = 25;    // Limit of how many messages to save
var messageArray = [];      // Array of all our messages


const broadcast = (buffer) => {
  var messages = JSON.stringify(messageArray);
  Object.entries(clients).forEach(([clientId, res]) => res.write(`event: info\ndata: ${messages}\n\n`, 'utf8'));
}

const broadCastAdd = (user) => {
  user = DOMPurify.sanitize(user, {ALLOWED_TAGS: []});
  console.log('User joined:', user);
  Object.entries(clients).forEach(([clientId, res]) => res.write(`event: oper\ndata: {"oper":"add","user":"${user}"}\n\n`, 'utf8'));
}

const broadCastDel = (user) => {
  console.log('User left:', user);
  Object.entries(clients).forEach(([clientId, res]) => res.write(`event: oper\ndata: {"oper":"del", "user":"${user}"}\n\n`, 'utf8'));
}

// Request handler
const onRequest = (req, res) => {
  // console.log('httpVersion', req.httpVersion)

  const reqPath = req.headers[':path'] === '/' ? '/index.html' : req.headers[':path'];
  const file = publicFiles.get(reqPath);

  // Configure preflight requests with what they wantt
  if (req.headers[':method'] === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, Access-Control-Allow-Credentials, Access-Control-Allow-Origin',
      'Access-Control-Allow-Origin': 'https://' + URL,
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Max-Age': 2147483647,
    });
    res.stream.end();
    return;
  }

  if (req.headers[':method'] === 'GET' && reqPath === '/users') {
    res.stream.respond({
      'Content-type': 'text/plain',
      'Access-Control-Allow-Origin': 'https://' + URL,
      'Access-Control-Allow-Credentials': true,
      ':status': 200
    });
    res.stream.end(JSON.stringify({ userList: Object.keys(clients) }));
    return;
  }

  /* Admin: Empty the message array */
  if (req.headers[':method'] === 'POST' && reqPath === '/admin/clear') {

    let jsonString = '';
    req.on('data', (data) => {
      jsonString += data;
    });

    req.on('end', () => {
      const json = JSON.parse(jsonString);
      
      if (json.verify === process.env.ADMIN_KEY) {
        console.log('Clearing chat...');
        messageArray = [];
        broadcast(messageArray);
      }
    });

    res.stream.respond({
      'Content-type': 'text/html',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Allow-Origin': 'https://' + URL,
      'Access-Control-Allow-Credentials': true,
      ':status': 204
    });
    res.stream.end();
    return;
  }

  /* Receive the message */
  if (req.headers[':method'] === 'POST' && reqPath === '/message') {

    const cookies = cookie.parse(req.headers.cookie)

    if (!cookies.user) {
      console.log('Unknown user tried to join')
      res.stream.respond({
        'Content-type': 'text/plain',
        'Access-Control-Allow-Origin': 'https://' + URL,
        'Access-Control-Allow-Credentials': true,
        ':status': 401
      });
      res.stream.end();
      return;
    }

    let jsonString = '';
    req.on('data', (data) => {
      jsonString += data;
    });

    req.on('end', () => {
      const json = JSON.parse(jsonString);

      json.msg = DOMPurify.sanitize(json.msg, {ALLOWED_TAGS: []});

      if (json.msg !== '') {

        messageArray.push(json);
        if (messageArray.length > messageLimit) {
          messageArray.shift();
        }
        broadcast(messageArray);
        
      }
    });

    res.stream.respond({
      'Content-type': 'text/html',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Allow-Origin': 'https://' + URL,
      'Access-Control-Allow-Credentials': true,
      ':status': 204
    });
    res.stream.end();
    return;
  }

  if (reqPath === '/register') {
    // req.setTimeout(Infinity);
    // req.socket.setTimeout(Number.MAX_VALUE);
    req.socket.setTimeout(2147483647); // MAX Integer
    res.writeHead(200, {
      'Content-type': 'text/event-stream',
      'Access-Control-Allow-Origin': 'https://' + URL,
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Max-Age': 2147483647,
      'Cache-Control': 'no-cache'
    });

    const cookies = cookie.parse(req.headers.cookie)

    clients[cookies.user] = res;  // <- Add this client to the broadcast list
    broadCastAdd(cookies.user);

    broadcast(messageArray);

    ((clientId) => {
      req.on("close", () => { // <- Remove this client when he disconnects
        delete clients[clientId]
        broadCastDel(clientId);
      });
    })(cookies.user);
    return;
  }

  // File not found
  if (!file) {
    res.stream.respond({ 'content-type': 'text/html', ':status': 404 });
    res.stream.end('<h1>Wrong turn?</h1>');
    return
  }

  // Serve file
  res.stream.respondWithFD(file.fileDescriptor, file.headers)

  req.on('finish', () => console.log('con closed'))
}


//var serverCert = '/etc/letsencrypt/live/test.comfytheatre.co.uk/fullchain.pem';
//var serverKey = '/etc/letsencrypt/live/test.comfytheatre.co.uk/privkey.pem';
var serverCert = process.env.SERVER_CERT;
var serverKey = process.env.SERVER_KEY;

const server = http2.createSecureServer({
  cert: fs.readFileSync(path.join(serverCert)),
  key: fs.readFileSync(path.join(serverKey))
}, onRequest);

server.listen(PORT, URL, (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`Server listening on ${PORT}`)
})

function trim_nulls(data) {
  var y;
  for (var x in data) {
    y = data[x];
    if (y === "null" || y === null || y === "" || typeof y === "undefined" || (y instanceof Object && Object.keys(y).length == 0)) {
      delete data[x];
    }
    if (y instanceof Object) y = trim_nulls(y);
  }
  return data;
}