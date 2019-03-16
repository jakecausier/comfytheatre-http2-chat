!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){n(1),e.exports=n(3)},function(e,t,n){"use strict";console.log("Script loaded");var r=null,o=n(2),i=document.location.protocol+"//"+document.location.hostname;function a(){var e=document.getElementById("msg");e.value.length>600?(console.log("Input too long"),document.getElementById("chatErrors").style.display="block",document.getElementById("inputErrors").innerText="Your message is too long."):(document.getElementById("chatErrors").style.display="none",fetch(i+":4000/message",{method:"POST",credentials:"include",headers:{"content-type":"application/json"},body:JSON.stringify({msg:e.value})}).catch(function(e){return console.log(e)}),document.getElementById("msg").value="")}function l(){fetch(i+":4000/users").then(function(e){return e.json()}).then(function(e){document.getElementById("userList").innerHTML=e.userList[0]?e.userList.join("<br>"):"No user"})}function c(){console.log("start sse");var e=document.getElementById("username");e.value=o.sanitize(e.value,{ALLOWED_TAGS:[]}),document.cookie="user=".concat(e.value),chatEntryPoint.style.display="none",chatControls.style.display="block",(r=new EventSource(i+":4000/register")).onerror=function(e){console.log("EventSource failed",e)},r.addEventListener("info",function(e){var t,n,r=document.getElementById("chat"),o=JSON.parse(e.data);r.innerHTML+=(t=o.sender,n=o.msg,'<div class="message"><div class="user">'+t+'</div><div class="content">'+n+"</div></div>"),console.log("sse info",o),r.scrollTop=r.scrollHeight-r.clientHeight},!1),r.addEventListener("oper",function(e){l(),console.log("sse oper",e.data)},!1)}window.onload=function(){document.getElementById("chatEntryPoint");document.getElementById("chatControls").style.display="none",r&&l();var e=document.getElementById("username"),t=document.getElementById("enterChat"),n=document.getElementById("msg"),o=document.getElementById("sendMessage");e.addEventListener("keyup",function(e){13===e.keyCode&&t.click()}),t.addEventListener("click",c),n.addEventListener("keyup",function(e){13===e.keyCode&&o.click()}),o.addEventListener("click",a)}},function(e,t,n){e.exports=function(){"use strict";var e=Object.freeze||function(e){return e},t=e(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),n=e(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","audio","canvas","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","video","view","vkern"]),r=e(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),o=e(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),i=e(["#text"]),a=Object.freeze||function(e){return e},l=a(["accept","action","align","alt","autocomplete","background","bgcolor","border","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","coords","crossorigin","datetime","default","dir","disabled","download","enctype","face","for","headers","height","hidden","high","href","hreflang","id","integrity","ismap","label","lang","list","loop","low","max","maxlength","media","method","min","multiple","name","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","type","usemap","valign","value","width","xmlns"]),c=a(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","tabindex","targetx","targety","transform","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),s=a(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),u=a(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),d=Object.hasOwnProperty,f=Object.setPrototypeOf,m=("undefined"!=typeof Reflect&&Reflect).apply;function p(e,t){f&&f(e,null);for(var n=t.length;n--;){var r=t[n];if("string"==typeof r){var o=r.toLowerCase();o!==r&&(Object.isFrozen(t)||(t[n]=o),r=o)}e[r]=!0}return e}function y(e){var t={},n=void 0;for(n in e)m(d,e,[n])&&(t[n]=e[n]);return t}m||(m=function(e,t,n){return e.apply(t,n)});var g=Object.seal||function(e){return e},h=g(/\{\{[\s\S]*|[\s\S]*\}\}/gm),v=g(/<%[\s\S]*|[\s\S]*%>/gm),b=g(/^data-[\-\w.\u00B7-\uFFFF]/),T=g(/^aria-[\-\w]+$/),E=g(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),L=g(/^(?:\w+script|data):/i),A=g(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g),x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function S(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var k=("undefined"!=typeof Reflect&&Reflect).apply,M=Array.prototype.slice,O=Object.freeze,w=function(){return"undefined"==typeof window?null:window};k||(k=function(e,t,n){return e.apply(t,n)});var _=function(e,t){if("object"!==(void 0===e?"undefined":x(e))||"function"!=typeof e.createPolicy)return null;var n=null;t.currentScript&&t.currentScript.hasAttribute("data-tt-policy-suffix")&&(n=t.currentScript.getAttribute("data-tt-policy-suffix"));var r="dompurify"+(n?"#"+n:"");try{return e.createPolicy(r,{createHTML:function(e){return e}})}catch(e){return console.warn("TrustedTypes policy "+r+" could not be created."),null}};return function e(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w(),d=function(t){return e(t)};if(d.version="1.0.10",d.removed=[],!a||!a.document||9!==a.document.nodeType)return d.isSupported=!1,d;var f=a.document,m=!1,g=!1,N=a.document,D=a.DocumentFragment,C=a.HTMLTemplateElement,R=a.Node,H=a.NodeFilter,I=a.NamedNodeMap,z=void 0===I?a.NamedNodeMap||a.MozNamedAttrMap:I,F=a.Text,j=a.Comment,B=a.DOMParser,P=a.TrustedTypes;if("function"==typeof C){var W=N.createElement("template");W.content&&W.content.ownerDocument&&(N=W.content.ownerDocument)}var U=_(P,f),G=U?U.createHTML(""):"",q=N,V=q.implementation,Y=q.createNodeIterator,J=q.getElementsByTagName,K=q.createDocumentFragment,X=f.importNode,$={};d.isSupported=V&&void 0!==V.createHTMLDocument&&9!==N.documentMode;var Q=h,Z=v,ee=b,te=T,ne=L,re=A,oe=E,ie=null,ae=p({},[].concat(S(t),S(n),S(r),S(o),S(i))),le=null,ce=p({},[].concat(S(l),S(c),S(s),S(u))),se=null,ue=null,de=!0,fe=!0,me=!1,pe=!1,ye=!1,ge=!1,he=!1,ve=!1,be=!1,Te=!1,Ee=!1,Le=!0,Ae=!0,xe=!1,Se={},ke=p({},["audio","head","math","script","style","template","svg","video"]),Me=p({},["audio","video","img","source","image"]),Oe=p({},["alt","class","for","id","label","name","pattern","placeholder","summary","title","value","style","xmlns"]),we=null,_e=N.createElement("form"),Ne=function(e){we&&we===e||(e&&"object"===(void 0===e?"undefined":x(e))||(e={}),ie="ALLOWED_TAGS"in e?p({},e.ALLOWED_TAGS):ae,le="ALLOWED_ATTR"in e?p({},e.ALLOWED_ATTR):ce,se="FORBID_TAGS"in e?p({},e.FORBID_TAGS):{},ue="FORBID_ATTR"in e?p({},e.FORBID_ATTR):{},Se="USE_PROFILES"in e&&e.USE_PROFILES,de=!1!==e.ALLOW_ARIA_ATTR,fe=!1!==e.ALLOW_DATA_ATTR,me=e.ALLOW_UNKNOWN_PROTOCOLS||!1,pe=e.SAFE_FOR_JQUERY||!1,ye=e.SAFE_FOR_TEMPLATES||!1,ge=e.WHOLE_DOCUMENT||!1,be=e.RETURN_DOM||!1,Te=e.RETURN_DOM_FRAGMENT||!1,Ee=e.RETURN_DOM_IMPORT||!1,ve=e.FORCE_BODY||!1,Le=!1!==e.SANITIZE_DOM,Ae=!1!==e.KEEP_CONTENT,xe=e.IN_PLACE||!1,oe=e.ALLOWED_URI_REGEXP||oe,ye&&(fe=!1),Te&&(be=!0),Se&&(ie=p({},[].concat(S(i))),le=[],!0===Se.html&&(p(ie,t),p(le,l)),!0===Se.svg&&(p(ie,n),p(le,c),p(le,u)),!0===Se.svgFilters&&(p(ie,r),p(le,c),p(le,u)),!0===Se.mathMl&&(p(ie,o),p(le,s),p(le,u))),e.ADD_TAGS&&(ie===ae&&(ie=y(ie)),p(ie,e.ADD_TAGS)),e.ADD_ATTR&&(le===ce&&(le=y(le)),p(le,e.ADD_ATTR)),e.ADD_URI_SAFE_ATTR&&p(Oe,e.ADD_URI_SAFE_ATTR),Ae&&(ie["#text"]=!0),ge&&p(ie,["html","head","body"]),ie.table&&p(ie,["tbody"]),O&&O(e),we=e)},De=function(e){d.removed.push({element:e});try{e.parentNode.removeChild(e)}catch(t){e.outerHTML=G}},Ce=function(e,t){try{d.removed.push({attribute:t.getAttributeNode(e),from:t})}catch(e){d.removed.push({attribute:null,from:t})}t.removeAttribute(e)},Re=function(e){var t=void 0,n=void 0;if(ve)e="<remove></remove>"+e;else{var r=e.match(/^[\s]+/);(n=r&&r[0])&&(e=e.slice(n.length))}if(m)try{t=(new B).parseFromString(e,"text/html")}catch(e){}if(g&&p(se,["title"]),!t||!t.documentElement){var o=t=V.createHTMLDocument(""),i=o.body;i.parentNode.removeChild(i.parentNode.firstElementChild),i.outerHTML=U?U.createHTML(e):e}return n&&t.body.insertBefore(N.createTextNode(n),t.body.childNodes[0]||null),J.call(t,ge?"html":"body")[0]};d.isSupported&&(function(){try{var e=Re('<svg><p><style><img src="</style><img src=x onerror=1//">');e.querySelector("svg img")&&(m=!0)}catch(e){}}(),function(){try{var e=Re("<x/><title>&lt;/title&gt;&lt;img&gt;");e.querySelector("title").innerHTML.match(/<\/title/)&&(g=!0)}catch(e){}}());var He=function(e){return Y.call(e.ownerDocument||e,e,H.SHOW_ELEMENT|H.SHOW_COMMENT|H.SHOW_TEXT,function(){return H.FILTER_ACCEPT},!1)},Ie=function(e){return"object"===(void 0===R?"undefined":x(R))?e instanceof R:e&&"object"===(void 0===e?"undefined":x(e))&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName},ze=function(e,t,n){$[e]&&$[e].forEach(function(e){e.call(d,t,n,we)})},Fe=function(e){var t,n=void 0;if(ze("beforeSanitizeElements",e,null),!((t=e)instanceof F||t instanceof j||"string"==typeof t.nodeName&&"string"==typeof t.textContent&&"function"==typeof t.removeChild&&t.attributes instanceof z&&"function"==typeof t.removeAttribute&&"function"==typeof t.setAttribute))return De(e),!0;var r=e.nodeName.toLowerCase();if(ze("uponSanitizeElement",e,{tagName:r,allowedTags:ie}),!ie[r]||se[r]){if(Ae&&!ke[r]&&"function"==typeof e.insertAdjacentHTML)try{var o=e.innerHTML;e.insertAdjacentHTML("AfterEnd",U?U.createHTML(o):o)}catch(e){}return De(e),!0}return"noscript"===r&&e.innerHTML.match(/<\/noscript/i)?(De(e),!0):"noembed"===r&&e.innerHTML.match(/<\/noembed/i)?(De(e),!0):(!pe||e.firstElementChild||e.content&&e.content.firstElementChild||!/</g.test(e.textContent)||(d.removed.push({element:e.cloneNode()}),e.innerHTML?e.innerHTML=e.innerHTML.replace(/</g,"&lt;"):e.innerHTML=e.textContent.replace(/</g,"&lt;")),ye&&3===e.nodeType&&(n=(n=(n=e.textContent).replace(Q," ")).replace(Z," "),e.textContent!==n&&(d.removed.push({element:e.cloneNode()}),e.textContent=n)),ze("afterSanitizeElements",e,null),!1)},je=function(e,t,n){if(Le&&("id"===t||"name"===t)&&(n in N||n in _e))return!1;if(fe&&ee.test(t));else if(de&&te.test(t));else{if(!le[t]||ue[t])return!1;if(Oe[t]);else if(oe.test(n.replace(re,"")));else if("src"!==t&&"xlink:href"!==t||"script"===e||0!==n.indexOf("data:")||!Me[e])if(me&&!ne.test(n.replace(re,"")));else if(n)return!1}return!0},Be=function(e){var t=void 0,n=void 0,r=void 0,o=void 0,i=void 0;ze("beforeSanitizeAttributes",e,null);var a=e.attributes;if(a){var l={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:le};for(i=a.length;i--;){var c=t=a[i],s=c.name,u=c.namespaceURI;if(n=t.value.trim(),r=s.toLowerCase(),l.attrName=r,l.attrValue=n,l.keepAttr=!0,ze("uponSanitizeAttribute",e,l),n=l.attrValue,"name"===r&&"IMG"===e.nodeName&&a.id)o=a.id,a=k(M,a,[]),Ce("id",e),Ce(s,e),a.indexOf(o)>i&&e.setAttribute("id",o.value);else{if("INPUT"===e.nodeName&&"type"===r&&"file"===n&&(le[r]||!ue[r]))continue;"id"===s&&e.setAttribute(s,""),Ce(s,e)}if(l.keepAttr){ye&&(n=(n=n.replace(Q," ")).replace(Z," "));var f=e.nodeName.toLowerCase();if(je(f,r,n))try{u?e.setAttributeNS(u,s,n):e.setAttribute(s,n),d.removed.pop()}catch(e){}}}ze("afterSanitizeAttributes",e,null)}},Pe=function e(t){var n=void 0,r=He(t);for(ze("beforeSanitizeShadowDOM",t,null);n=r.nextNode();)ze("uponSanitizeShadowNode",n,null),Fe(n)||(n.content instanceof D&&e(n.content),Be(n));ze("afterSanitizeShadowDOM",t,null)};return d.sanitize=function(e,t){var n=void 0,r=void 0,o=void 0,i=void 0,l=void 0;if(e||(e="\x3c!--\x3e"),"string"!=typeof e&&!Ie(e)){if("function"!=typeof e.toString)throw new TypeError("toString is not a function");if("string"!=typeof(e=e.toString()))throw new TypeError("dirty is not a string, aborting")}if(!d.isSupported){if("object"===x(a.toStaticHTML)||"function"==typeof a.toStaticHTML){if("string"==typeof e)return a.toStaticHTML(e);if(Ie(e))return a.toStaticHTML(e.outerHTML)}return e}if(he||Ne(t),d.removed=[],xe);else if(e instanceof R)n=Re("\x3c!--\x3e"),1===(r=n.ownerDocument.importNode(e,!0)).nodeType&&"BODY"===r.nodeName?n=r:n.appendChild(r);else{if(!be&&!ye&&!ge&&-1===e.indexOf("<"))return U?U.createHTML(e):e;if(!(n=Re(e)))return be?null:G}n&&ve&&De(n.firstChild);for(var c=He(xe?e:n);o=c.nextNode();)3===o.nodeType&&o===i||Fe(o)||(o.content instanceof D&&Pe(o.content),Be(o),i=o);if(i=null,xe)return e;if(be){if(Te)for(l=K.call(n.ownerDocument);n.firstChild;)l.appendChild(n.firstChild);else l=n;return Ee&&(l=X.call(f,l,!0)),l}var s=ge?n.outerHTML:n.innerHTML;return ye&&(s=(s=s.replace(Q," ")).replace(Z," ")),U?U.createHTML(s):s},d.setConfig=function(e){Ne(e),he=!0},d.clearConfig=function(){we=null,he=!1},d.isValidAttribute=function(e,t,n){we||Ne({});var r=e.toLowerCase(),o=t.toLowerCase();return je(r,o,n)},d.addHook=function(e,t){"function"==typeof t&&($[e]=$[e]||[],$[e].push(t))},d.removeHook=function(e){$[e]&&$[e].pop()},d.removeHooks=function(e){$[e]&&($[e]=[])},d.removeAllHooks=function(){$={}},d}()}()},function(e,t){}]);