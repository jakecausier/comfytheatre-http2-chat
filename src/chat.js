
'use strict'

console.log('Script loaded');
let source = null;
const DOMPurify = require('dompurify');
const URL = "https://comfytheatre.test"// + document.location.hostname;

window.onload = () => {
  const chatEntryPoint = document.getElementById("chatEntryPoint");
  const chatControls = document.getElementById("chatControls");

  chatControls.style.display = "none";

  if (source) loadUsers();

  var enterChatInput = document.getElementById("username");
  var enterChatSubmit = document.getElementById("enterChat");
  var chatMessageInput = document.getElementById("msg");
  var chatMessageSubmit = document.getElementById("sendMessage");

  enterChatInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      enterChatSubmit.click();
    }
  });

  enterChatSubmit.addEventListener('click', enterChat);
  
  chatMessageInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      chatMessageSubmit.click();
    }
  });

  chatMessageSubmit.addEventListener('click', sendMessage);
}

function randomName() {
  const random = `Anonymous-${Math.random().toString(36).substring(7)}`;
  userName.value = random;
}

function sendMessage() {
  const input = document.getElementById('msg');

  if (input.value.length > 600) {
    console.log("Input too long");
    document.getElementById('chatErrors').style.display = "block";
    document.getElementById('inputErrors').innerText = "Your message is too long."
  } else {
    document.getElementById('chatErrors').style.display = "none";
    fetch(URL + ':4000/message', {
      method: "POST",
      credentials: 'include',
      headers: {
        "content-type": 'application/json',
        "Access-Control-Allow-Origin": "https://comfytheatre.test",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        msg: input.value
      })
    }).catch(err => console.log(err));
    document.getElementById('msg').value = '';
  }
}

function loadUsers() {
  fetch(URL + ':4000/users')
  .then(response => response.json())
  .then(json => {
    document.getElementById("userList").innerHTML = json.userList[0] ? json.userList.join('<br>') : 'No user';
  });
}

function quitChat() {
  source.close();
  console.log('Chat closed');
  document.cookie = `user=`;
  document.getElementById('userList').innerHTML = '';
  // document.getElementById('chat').innerHTML = '';
  chatEntryPoint.style.display = "block";
  chatControls.style.display = "none";
}

function enterChat() {
  console.log('start sse')

  var userName = document.getElementById("username")

  console.log('CURRENT USERNAME: ' + userName.value);

  var cleanUserName;
  cleanUserName = DOMPurify.sanitize(userName.value, {ALLOWED_TAGS: []})

  console.log('CLEANED USERNAME: ' + cleanUserName);

  document.cookie = `user=${cleanUserName}`;

  chatEntryPoint.style.display = "none";
  chatControls.style.display = "block";

  source = new EventSource(URL + ':4000/register', {withCredentials: true});

  source.onerror = (e) => {
    console.log("EventSource failed", e);
  };

  source.addEventListener("info", (e) => {
    const chat = document.getElementById('chat');
    const data = JSON.parse(e.data)
    chat.innerHTML += makeMessageNicer(data.sender, data.msg)
    console.log('sse info', data)

    /* Scroll to the bottom of the chat window */
    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  }, false);

  source.addEventListener("oper", (e) => {
    loadUsers();
    console.log('sse oper', e.data)
  }, false);
}


function makeMessageNicer(user, msg) {
  return '<div class="message"><div class="user">' + user + '</div><div class="content">' + msg + '</div></div>';
}