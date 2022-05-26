if (!localStorage.getItem("dedziory")) localStorage.setItem("dedziory", 0);
let licznik = Number(localStorage.getItem("dedziory"));

const _battleMsg = window.battleMsg;
window.battleMsg = (a, b) => {
    _battleMsg(a, b);
    if (a.includes("loser=") && a.includes("nick czlenia")) {
        licznik++;
        localStorage.setItem("dedziory", licznik);
    }
}

const nick = document.querySelector("#nick");
nick.addEventListener("click", () => window.message(licznik));