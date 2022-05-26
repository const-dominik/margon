const obfuscator = require("javascript-obfuscator");
const fs = require("fs");

const result = obfuscator.obfuscate(
  '(()=>{const o="http://addons2.margonem.pl/get/127/127954dev.js",t="http://addons2.margonem.pl/get/127/127964dev.js",e=document.querySelector(".adi-bot-box")||b("adi-bot-timer"),n="object"==typeof window.adiwilkTestBot||document.querySelector("#adi-bot_box"),i="object"==typeof window.___g,r={log:window.log,setCookie:window.setCookie,consoleParse:window.consoleParse,_g:window._g},d=()=>Date.now()/1e3;let s=0;const a=()=>{s=d()},c=o=>["fight","a=attack","id="].every(t=>o.includes(t)),l=e=>[o,t].some(o=>String(e).includes(o)),u=()=>d()-s>5,m=()=>{const o=Array.from(document.querySelectorAll("#contxt > div")).find(o=>!o.classList.value&&l(o.innerText));o&&o.remove()},w=(o,t)=>{if(m(),!l(o))return t?r.log(o,t):void r.log(o)},g=o=>{if("string"!=typeof o||!o.length)return;const[t,e]=o.split(" ");return"gadblock"!==t?r.consoleParse(o):"off"===e?r.log("Global addon unblocked (\'gadblock on\' to block)"):r.log("Global addon blocked (\'gadblock off\' to unblock)")},_=(o,t)=>{if("string"==typeof o){if(!c(o))return r._g(o,t);u()&&(o="_"),r._g(o,t)}},b=o=>{const[,t]=document.cookie.split("; ").map(o=>o.split("=")).find(([t])=>t===o)||[];return!!t&&String(t).replace(/%2C/g,",")},f=(o,...t)=>{if("__nga"!==o)return r.setCookie(o,...t)},p=(o,t)=>{if([o,t].some(o=>void 0===o))return;const e=new Date;e.setTime(e.getTime()+2592e5),document.cookie=`${o}=${t}; expires=${e.toGMTString()};`},y=()=>{const o=b("__mExts");if(!o)return p("__mExts","d127964");const t=/(^|,)d127964(,|$)/.test(o);console.log(t,o),t||f("__mExts",o+",d127964")},k=(o,t,e)=>{o.forEach(o=>t.addEventListener(o,e))},h=o=>{o.value="",o.setAttribute("disabled",!0)},v=o=>{o&&(h(o),k(["change","keyup"],o,()=>h(o)))},x=(o,t)=>{const e=localStorage.getItem(o);e&&e!==t&&localStorage.setItem(o,t)},S=(o,t)=>{const e=b(o);"__nga"!==o&&!e||e===t||p(o,t)},A=o=>[b("user_id"),o,b("mchar_id")].join(""),E=()=>{i&&(x(A("myMin"),"-1"),x(A("myMax"),"-1"),x(A("stan"),"off"),x(`start${b("mchar_id")}`,"0"),window.___g&&window.___g.twojstary&&(window.___g.twojstary.socketconnected=!1))},j=()=>{if(!e)return;const o=document.querySelector(".adi-bot-input-text");v(o),S("adi-bot-timer","dupa")},$=()=>{if(!n)return;const o=Array.from(document.querySelectorAll("#bot_box > input, #adi-bot_box > input")),t=Array.from(document.querySelectorAll("input")).filter(o=>o.getAttribute("tip")).filter(o=>["Wprowadź lvl mobków","Wprowadź nazwy map"].some(t=>o.getAttribute("tip").includes(t))),e=b("mchar_id");["adi-bot-storage",`adi-bot_maps${e}`,`adi-bot_mobs${e}`,"bot_mobs","bot_maps","adi-bot_mobs","adi-bot_maps"].forEach(o=>localStorage.removeItem(o)),o.forEach(v),t.forEach(v)},q=()=>{window.log=((o,t)=>w(o,t)),window.setCookie=((o,...t)=>f(o,...t)),window.consoleParse=(o=>g(o)),window._g=((o,t)=>_(o,t))},C=()=>{E(),j(),$()},I=()=>{location.host.includes("nyras")&&(k(["keypress","keydown","keyup","click","mousedown","mouseup","contextmenu","touchstart","touchend"],window,a),q(),setInterval(()=>{y(),S("__nga","0")},300),(e||n||i)&&(C(),setInterval(C,5e3)))};I()})();',
  {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: "hexadecimal",
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayEncoding: ["base64"],
    stringArrayIntermediateVariablesCount: 5,
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false,
  }
);

fs.writeFileSync("antybot.txt", String(result));
