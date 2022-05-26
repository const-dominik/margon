((consoleParse, setCookieMargo, log) => {
  const globalAddon = "asdgfasgasdgasdgasd";
  const getCookie = (cookie_name) => {
    const [, value] =
      document.cookie
        .split("; ")
        .map((el) => el.split("="))
        .find(([name]) => name === cookie_name) || [];
    return value;
  };

  const setCookie = (name, value) => {
    if (!name || !value) return;
    const d = new Date();
    d.setTime(d.getTime() + 360000 * 24 * 30);
    document.cookie = `${name}=${value}; expires=${d.toGMTString()};`;
  };

  window.setCookie = (name, ...args) => {
    if (name !== "__nga") return setCookieMargo(name, args);
  };

  window.consoleParse = (command) => {
    if (typeof command !== "string") return;
    const [cmd, val] = command.split(" ");
    if (cmd !== "gadblock") return consoleParse(command);
    if (val === "off") {
      window.log("Global addon unblocked ('gadblock on' to block)");
    } else {
      window.log("Global addon blocked ('gadblock off' to unblock)");
    }
  };

  window.log = (txt, lvl) => {
    clearConsole();
    txt = String(txt);
    if (lvl) {
      return log(txt, lvl);
    } else {
      if (!txt.includes(globalAddon)) {
        return log(txt);
      }
    }
  };

  const setListeners = (events, element, callback) => {
    events.forEach((event) => element.addEventListener(event, callback));
  };

  const clearConsole = () => {
    const globalLog = [...document.querySelectorAll("#contxt > div")].find(
      (el) => el.classList.value === "" && el.innerText.includes(globalAddon)
    );
    if (globalLog) globalLog.remove();
  };

  const clearInput = (input) => {
    input.value = "";
    input.setAttribute("disabled", true);
    setListeners(["change", "keyup"], input, () => {
      input.value = "";
      if (!input.getAttribute("disabled")) input.setAttribute("disabled", true);
    });
  };

  const changeStorage = (name, value) => {
    if (localStorage.getItem(name) && localStorage.getItem(name) !== value) {
      localStorage.setItem(name, value);
    }
  };

  const changeCookie = (name, value) => {
    if (getCookie(name) && getCookie(name) !== value) {
      setCookie(name, value);
    }
  };

  const menogram = () => {
    changeStorage(`${getCookie("user_id")}myMin${getCookie("mchar_id")}`, "-1");
    changeStorage(`${getCookie("user_id")}myMax${getCookie("mchar_id")}`, "-1");
    changeStorage(`${getCookie("user_id")}stan${getCookie("mchar_id")}`, "off");
    changeStorage(`start${getCookie("mchar_id")}`, "0");
  };

  const botE2Wilk = () => {
    const bot =
      document.querySelector(".adi-bot-box") || getCookie("adi-bot-timer");
    if (!bot) return;
    const input = document.querySelector(".adi-bot-input-text");
    if (input) clearInput(input);
    changeCookie("adi-bot-timer", "dupa");
  };

  const botExpWilk = () => {
    const bot =
      typeof window.adiwilkTestBot === "object" ||
      document.querySelector("#adi-bot_box");
    if (!bot) return;
    const inputs = Array.from(
      document.querySelectorAll("#adi-bot_box > input")
    );
    const id = getCookie("mchar_id");
    const storages = [
      "adi-bot-storage",
      `adi-bot_lastmaps${id}`,
      `adi-bot_maps${id}`,
      `adi-bot_mobs${id}`,
      `adi-bot_mobs${id}`,
      `adi-bot_position${id}`,
    ];
    storages.forEach((storage) => localStorage.removeItem(storage));
    inputs.forEach(clearInput);
  };

  setInterval(() => {
    changeCookie("__nga", "0");
    menogram();
    botE2Wilk();
    botExpWilk();
  }, 1);
})(window.consoleParse, window.setCookie, window.log);
