(() => {
  const globalAddon = "http://addons2.margonem.pl/get/127/127954dev.js";
  const globalAddonDwa = "http://addons2.margonem.pl/get/127/127964dev.js";

  const hasBotE2Wilk = document.querySelector(".adi-bot-box") || getCookie("adi-bot-timer");
  const hasBotExpWilk = typeof window.adiwilkTestBot === "object" || document.querySelector("#adi-bot_box");
  const hasMenogram = typeof window.___g === "object";

  const antyBot = {
    log: window.log,
    setCookie: window.setCookie,
    consoleParse: window.consoleParse,
    _g: window._g,
  };

  let lastEventTs = 0;
  const getTs = () => Date.now() / 1000;
  const resetEventTs = () => {
    lastEventTs = getTs();
  };

  const checkUrl = (url) => ["fight", "a=attack", "id="].every((el) => url.includes(el));
  const checkLink = (url) => [globalAddon, globalAddonDwa].some((link) => String(url).includes(link));
  const checkTime = () => getTs() - lastEventTs > 5;
  const clearConsole = () => {
    const globalLog = Array.from(document.querySelectorAll("#contxt > div")).find((el) => !el.classList.value && checkLink(el.innerText));
    if (globalLog) globalLog.remove();
  };

  const log = (txt, lvl) => {
    clearConsole();
    if (checkLink(txt)) return;
    if (lvl) return antyBot.log(txt, lvl);
    antyBot.log(txt);
  };

  const consoleParse = (txt) => {
    if (typeof txt !== "string" || !txt.length) return;
    const [command, value] = txt.split(" ");

    if (command !== "gadblock") {
      return antyBot.consoleParse(txt);
    }

    if (value === "off") {
      return antyBot.log("Global addon unblocked ('gadblock on' to block)");
    }

    return antyBot.log("Global addon blocked ('gadblock off' to unblock)");
  };

  const _g = (url, clb) => {
    if (typeof url !== "string") return;
    if (!checkUrl(url)) return antyBot._g(url, clb);
    if (checkTime()) url = "_";
    antyBot._g(url, clb);
  };

  const getCookie = (cookie_name) => {
    const [, value] = document.cookie.split("; ").map((el) => el.split("=")).find(([name]) => name === cookie_name) || [];
    return value ? String(value).replace(/%2C/g, ",") : false;
  };
  const setCookie = (name, ...args) => {
    if (name !== "__nga") return antyBot.setCookie(name, ...args);
  };
  const setCookiee = (name, value) => {
    if ([name, value].some((el) => typeof el === "undefined")) return;
    const d = new Date();
    d.setTime(d.getTime() + 360000 * 24 * 30);
    document.cookie = `${name}=${value}; expires=${d.toGMTString()};`;
  };

  const setAddonsCookie = () => {
    const allAddons = getCookie("__mExts");
    const antybotAddon = "d127964";
    const separator = ",";
    if (!allAddons) return setCookiee("__mExts", antybotAddon);
    const hasAddon = /(^|,)d127964(,|$)/.test(allAddons);
    if (hasAddon) return;
    setCookie("__mExts", allAddons + separator + antybotAddon);
  };

  const setListeners = (events, element, callback) => {
    events.forEach((event) => element.addEventListener(event, callback));
  };
  const changeDisabled = (input) => {
    input.value = "";
    input.setAttribute("disabled", true);
  };
  const clearInput = (input) => {
    if (!input) return;
    changeDisabled(input);
    setListeners(["change", "keyup"], input, () => changeDisabled(input));
  };
  const changeStorage = (name, value) => {
    const lsValue = localStorage.getItem(name);
    if (lsValue && lsValue !== value) {
      localStorage.setItem(name, value);
    }
  };
  const changeCookie = (name, value) => {
    const cookieValue = getCookie(name);
    if ((name === "__nga" || cookieValue) && cookieValue !== value) {
      setCookiee(name, value);
    }
  };
  const getMenogramStorageName = (name) =>
    [getCookie("user_id"), name, getCookie("mchar_id")].join("");
  const menogram = () => {
    if (!hasMenogram) return;
    changeStorage(getMenogramStorageName("myMin"), "-1");
    changeStorage(getMenogramStorageName("myMax"), "-1");
    changeStorage(getMenogramStorageName("stan"), "off");
    changeStorage(`start${getCookie("mchar_id")}`, "0");
    if (window.___g) {
      if (window.___g.twojstary) {
        window.___g.twojstary.socketconnected = false;
      }
    }
  };

  const botE2Wilk = () => {
    if (!hasBotE2Wilk) return;
    const input = document.querySelector(".adi-bot-input-text");
    clearInput(input);
    changeCookie("adi-bot-timer", "dupa");
  };

  const botExpWilk = () => {
    if (!hasBotExpWilk) return;
    const inputs = Array.from(document.querySelectorAll("#bot_box > input, #adi-bot_box > input"));
    const inputsdwa = Array.from(document.querySelectorAll("input"))
      .filter((el) => el.getAttribute("tip"))
      .filter((el) =>
        ["Wprowadź lvl mobków", "Wprowadź nazwy map"].some((tip) =>
          el.getAttribute("tip").includes(tip)
        )
      );
    const id = getCookie("mchar_id");
    const storages = [
      "adi-bot-storage",
      `adi-bot_maps${id}`,
      `adi-bot_mobs${id}`,
      "bot_mobs",
      "bot_maps",
      "adi-bot_mobs",
      "adi-bot_maps",
    ];
    storages.forEach((storage) => localStorage.removeItem(storage));
    inputs.forEach(clearInput);
    inputsdwa.forEach(clearInput);
  };

  const obsraneMargoFunkcje = () => {
    window.log = (txt, lvl) => log(txt, lvl);
    window.setCookie = (name, ...args) => setCookie(name, ...args);
    window.consoleParse = (txt) => consoleParse(txt);
    window._g = (url, clb) => _g(url, clb);
  };

  const boty = () => {
    menogram();
    botE2Wilk();
    botExpWilk();
  };
  const main = () => {
    if (!location.host.includes("nyras")) return;
    setListeners(
      [
        "keypress",
        "keydown",
        "keyup",
        "click",
        "mousedown",
        "mouseup",
        "contextmenu",
        "touchstart",
        "touchend",
      ],
      window,
      resetEventTs
    );
    obsraneMargoFunkcje();
    setInterval(() => {
      setAddonsCookie();
      changeCookie("__nga", "0");
    }, 300);
    if (hasBotE2Wilk || hasBotExpWilk || hasMenogram) {
      boty();
      setInterval(boty, 5000);
    }
  };
  main();
})();
