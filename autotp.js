// ==UserScript==
// @name         autotp test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*.margonem.pl/
// @grant        none
// ==/UserScript==

(function (d, _n, _b) {
    //graficzne elementy
    let box = d.createElement("span");
    box.id = "adisonzawodowiec";
    box.innerHTML = "Przeciągnij teleport<br>";

    //chowanie okienka
    let box3 = d.createElement("span");
    box3.id = "asdasdrewwq";
    box3.classList.add("b_buttons");
    box3.tip = "Wyświetl okienko od uciekania";
    let style1 = d.createElement("style");
    style1.innerHTML = "#asdasdrewwq{left:88.5px;top:512px;background-image:url(https://i.imgur.com/IMA9wNk.png);opacity:.7}#asdasdrewwq:hover{opacity:1}";
    d.querySelector("#panel").appendChild(box3);
    d.head.appendChild(style1);
    box3.addEventListener("click", function () {
        let dane = localStorage.getItem("brutus_position").split("|");
        let x = dane[0];
        let y = dane[1];
        if (dane[2] == 1) {
            d.querySelector("#adisonzawodowiec").style.display = "none";
            localStorage.setItem("brutus_position", `${x}|${y}|0`);
        } else {
            d.querySelector("#adisonzawodowiec").style.display = "block";
            localStorage.setItem("brutus_position", `${x}|${y}|1`);
        }
    });

    //dla itemka
    let inpTp = d.createElement("div");
    inpTp.id = "adison_inpTp";
    inpTp.style = "position: relative; left: 77px; width: 32px; height: 32px; background: rgba(40,40,40,0.5); border: 1px solid #333333; margin-bottom: 5px; margin-top: 2px";
    box.appendChild(inpTp);

    let inpLvl = d.createElement("input");
    inpLvl.type = "text";
    inpLvl.size = "1";
    inpLvl.id = "adison_inpLvl";
    box.appendChild(inpLvl);
    box.innerHTML += "<br>";

    let inpDontRun = d.createElement("input");
    inpDontRun.type = "text";
    inpDontRun.size = "20";
    inpDontRun.id = "dominik_inpDontRun";
    inpDontRun.setAttribute("tip", "nigdy nie uciekaj, oddziel przecinkiem (nick,nick)")
    box.appendChild(inpDontRun);
    box.innerHTML += "<br>";

    let inpRun = d.createElement("input");
    inpRun.type = "text";
    inpRun.size = "20";
    inpRun.id = "dominik_inpRun";
    inpRun.setAttribute("tip", "zawsze uciekaj, oddziel przecinkiem (nick,nick, ucieka nawet z wyłączonym uciekaniem)");
    box.appendChild(inpRun);
    box.innerHTML += "<br>";

    let inpClan = d.createElement("input");
    inpClan.type = "checkbox";
    inpClan.name = "adison_inpClan";
    box.appendChild(inpClan);
    box.innerHTML += "Uciekać znaj/klan?<br>";

    let inpEscape = d.createElement("input");
    inpEscape.type = "checkbox";
    inpEscape.name = "adison_inpEscape";
    box.appendChild(inpEscape);
    let strEscape = d.createElement("span");
    strEscape.id = "adison_strEscape";
    strEscape.innerHTML = "Uciekanie włączone"
    strEscape.style.fontWeight = "bold";
    box.appendChild(strEscape);

    d.body.appendChild(box);

    let style = d.createElement("style");
    style.innerHTML = "#adisonzawodowiec{position:absolute; z-index: 400; width: 188px; height: 150px; background:#b8b8b8;text-align:center;padding:5px;border:2px solid red}input[id=adison_inpLvl]{border:1px solid #86cdda;border-radius:4px;padding:1px}input[id=adison_inpLvl]:hover{background:#dadada;cursor:auto}input[id=adison_inpLvl]:focus{background:#dadada}input[id=dominik_inpDontRun]{border:1px solid #86cdda;border-radius:4px;padding:1px}input[id=dominik_inpDontRun]:hover{background:#dadada;cursor:auto}input[id=dominik_inpDontRun]:focus{background:#dadada}input[id=dominik_inpRun]{border:1px solid #86cdda;border-radius:4px;padding:1px}input[id=dominik_inpRun]:hover{background:#dadada;cursor:auto}input[id=dominik_inpRun]:focus{background:#dadada}";
    d.head.appendChild(style);

    //zmienne do tp po walce
    let tpAfterFight = false;
    let tpItemId = 0;

    //pozycja okienka
    if (!localStorage.getItem("brutus_position")) localStorage.setItem("brutus_position", "0|0|1");
    (function (pos, element) {
        let position = pos.split("|");
        let x = position[0] + "px";
        let y = position[1] + "px";
        if (position[2] == "1") {
            element.style.display = "block";
        } else if (position[2] == "0") {
            element.style.display = "none";
        } else {
            throw "Error z wyświetlaniem";
        }
        element.style.top = x;
        element.style.left = y;
    })(localStorage.getItem("brutus_position"), d.querySelector("#adisonzawodowiec"))

    //generowanie tipu itemsa
    function generateItem(item) {
        let tip = window.itemTip(item);
        let html = "";
        html += `<div class="item" ctip="t_item" tip="${tip.replace(/"/g, '&quot;')}">`;

        if (item.stat.indexOf("legendary") > -1) html += `<div class="itemHighlighter t_leg"></div>`;
        if (item.stat.indexOf("heroic") > -1) html += `<div class="itemHighlighter t_her"></div>`;
        if (item.stat.indexOf("unique") > -1) html += `<div class="itemHighlighter t_uni"></div>`;
        if (item.stat.indexOf("upgraded") > -1) html += `<div class="itemHighlighter t_upg"></div>`;
        html += `<img src="/obrazki/itemy/${item.icon}">`;

        html += `</div>`;
        return html;
    }
    //localStorage
    window.g.loadQueue.push({
        fun: function () {
            //lvl
            if (!localStorage.getItem(`brutus${window.hero.id}_lvl`)) localStorage.setItem(`brutus${window.hero.id}_lvl`, `-30`);
            d.querySelector("#adison_inpLvl").value = localStorage.getItem(`brutus${window.hero.id}_lvl`);

            //lastPerson
            if (localStorage.getItem(`lastPerson`)) window.log(localStorage.getItem(`lastPerson`));

            //tp
            if (!localStorage.getItem(`brutus${window.hero.id}_tp1`)) {
                localStorage.setItem(`brutus${window.hero.id}_tp1`, JSON.stringify({
                    name: "Zwój teleportacji na Kwieciste Przejście",
                    stat: "amount=14;capacity=15;lvl=70;teleport=344,17,60",
                    icon: "pap/pap44.gif",
                    pr: 42000,
                    cl: 16
                }));
            }
            d.querySelector("#adison_inpTp").innerHTML = generateItem(JSON.parse(localStorage.getItem(`brutus${window.hero.id}_tp1`)));

            //clan/znaj
            if (!localStorage.getItem(`brutus_clanfr`)) localStorage.setItem(`brutus_clanfr`, true);
            d.querySelector("input[name=adison_inpClan]").checked = JSON.parse(localStorage.getItem(`brutus_clanfr`));

            //ogolny przycisk uciekania
            if (!localStorage.getItem(`brutus_escape${window.hero.id}`)) localStorage.setItem(`brutus_escape${window.hero.id}`, true);
            d.querySelector("input[name=adison_inpEscape]").checked = JSON.parse(localStorage.getItem(`brutus_escape${window.hero.id}`));
            if (JSON.parse(localStorage.getItem(`brutus_escape${window.hero.id}`))) {
                d.querySelector("#adison_strEscape").style.color = "green";
                d.querySelector("#adison_strEscape").innerHTML = "Uciekanie włączone";
            } else {
                d.querySelector("#adison_strEscape").style.color = "red";
                d.querySelector("#adison_strEscape").innerHTML = "Uciekanie wyłączone";
            }

            //nicki przed ktorymi nie uciekac
            if (!localStorage.getItem(`brutus${window.hero.id}_nicki`)) localStorage.setItem(`brutus${window.hero.id}_nicki`, "");
            d.querySelector("#dominik_inpDontRun").value = localStorage.getItem(`brutus${window.hero.id}_nicki`);

            //nicki przed ktorymi ma zawsze uciekac
            if (!localStorage.getItem(`brutus${window.hero.id}_nickiRun`)) localStorage.setItem(`brutus${window.hero.id}_nickiRun`, "");
            d.querySelector("#dominik_inpRun").value = localStorage.getItem(`brutus${window.hero.id}_nickiRun`);
        }
    });

    //zapisywanie ustawien
    d.querySelector("#adison_inpTp").addEventListener("keyup", function () {
        localStorage.setItem(`brutus${window.hero.id}_tp1`, this.value);
    });
    d.querySelector("#dominik_inpDontRun").addEventListener("keyup", function () {
         localStorage.setItem(`brutus${window.hero.id}_nicki`, this.value);
    });
    d.querySelector("#dominik_inpRun").addEventListener("keyup", function () {
         localStorage.setItem(`brutus${window.hero.id}_nickiRun`, this.value);
    });
    d.querySelector("#adison_inpLvl").addEventListener("keyup", function () {
        localStorage.setItem(`brutus${window.hero.id}_lvl`, this.value);
    });
    d.querySelector("input[name=adison_inpClan]").addEventListener("change", function () {
        localStorage.setItem(`brutus_clanfr`, this.checked);
    });
    d.querySelector("input[name=adison_inpEscape]").addEventListener("change", function () {
        window.localStorage.setItem(`brutus_escape${window.hero.id}`, this.checked);
        if (this.checked == true) {
            d.querySelector("#adison_strEscape").style.color = "green";
            d.querySelector("#adison_strEscape").innerHTML = "Uciekanie włączone";
        } else {
            d.querySelector("#adison_strEscape").style.color = "red";
            d.querySelector("#adison_strEscape").innerHTML = "Uciekanie wyłączone";
        }
    });

    function savePosition() {
        let x = parseInt(d.querySelector("#adisonzawodowiec").style.top);
        let y = parseInt(d.querySelector("#adisonzawodowiec").style.left);
        localStorage.setItem(`brutus_position`, `${x}|${y}|1`);
    }
    //draggable dla okienka z zapisem pozycji
    window.$("#adisonzawodowiec").draggable({
        start: function () {
            window.g.lock.add("adi_zmiana_pozycji");
        },
        stop: function () {
            window.g.lock.remove("adi_zmiana_pozycji");
            window.message("Zapisano pozycję!");
            savePosition();
        }
    });

    //droppable dla teleporta
    window.$("#adison_inpTp").droppable({
        accept: ".item",
        drop: (e, ui) => {
            let item = window.g.item[ui.draggable.attr("id").replace("item", "")];
            if (item.cl == 16 && item.loc == "g") {
                d.querySelector("#adison_inpTp").innerHTML = generateItem(item);
                localStorage.setItem(`brutus${window.hero.id}_tp1`, JSON.stringify(item));
                window.message("Zapisano");
            } else {
                window.message("To nie teleport wtf");
            }
        }
    });
    //funkcja szukajaca Tp
    function teleport(nazwa, asd) {
        let Person = window.g.other[asd];
        let content = `Ostatnia osoba przed którą próbowałeś uciekać: ${Person.nick} ${Person.lvl}${Person.prof} lvl`;
        localStorage.setItem("lastPerson", content);
        for (let i in window.g.item) {
            if (window.g.item[i].loc == "g" && window.g.item[i].name == nazwa) {
                let item = window.parseItemStat(window.g.item[i].stat);
                if (item.timelimit) {
                    let itemsikTime = item.timelimit.split(",");
                    let ts = window.unix_time();
                    let min = itemsikTime[1];
                    if (min) {
                        if (ts > min) {
                            tpItemId = window.g.item[i].id;
                            break;
                        }
                    } else {
                        tpItemId = window.g.item[i].id;
                        break;
                    }
                } else {
                    tpItemId = window.g.item[i].id;
                    break;
                }
            }
        }
        if (tpItemId != 0) {
            if (!window.g.battle) {
                let t_mapa = window.map.name;
                let t_id = tpItemId;
                window._g(`moveitem&st=1&id=${tpItemId}`);
                tpItemId = 0;
                setTimeout(() => {
                    if (window.map.name == t_mapa) {
                        window._g(`moveitem&st=1&id=${t_id}`);
                    }
                }, 50);
            } else {
                tpAfterFight = true;
                window.message("Teleport zostanie użyty po walce");
            }
        } else {
            window.message("Nie posiadasz teleportu");
        }
    }

    window.newOther = function (e) {
        _n(e);
        if (window.map.pvp == 2) {
            let obj = JSON.parse(localStorage.getItem(`brutus${window.hero.id}_tp1`));
            let tpName = obj.name;
            let leverz = Number(localStorage.getItem(`brutus${window.hero.id}_lvl`));
            let clanFrEscape = JSON.parse(localStorage.getItem(`brutus_clanfr`));
            let uciekaj = JSON.parse(localStorage.getItem(`brutus_escape${window.hero.id}`));
            let hlvl = window.hero.lvl;
            let nickiNieUciekaj = localStorage.getItem(`brutus${window.hero.id}_nicki`).replace(" ", "").toLowerCase().split(",");
            let nickiUciekaj = localStorage.getItem(`brutus${window.hero.id}_nickiRun`).replace(" ", "").toLowerCase().split(",");
            for (let i in e) {
                if (e[i].nick) {
                if (e[i].lvl - hlvl >= leverz && uciekaj && !nickiNieUciekaj.includes(e[i].nick.replace(" ", "").toLowerCase()) || nickiUciekaj.includes(e[i].nick.replace(" ", "").toLowerCase())) {
                    if (clanFrEscape) {
                    teleport(tpName, i);
                    break;
                    } else if (!["cl", "fr"].includes(e[i].relation)) {
                    teleport(tpName, i);
                    break;
                    }
                }
                }
            }
        }
    }


    window.battleMsg = function (a, b) {
        let ret = _b(a, b);
        if (a.includes("winner=")) {
            window._g("fight&a=quit");
            if (tpAfterFight) {
                let t_mapa = window.map.name;
                let t_id = tpItemId;
                window._g(`moveitem&st=1&id=${tpItemId}`);
                tpItemId = 0;
                setTimeout(() => {
                    if (window.map.name == t_mapa) {
                        window._g(`moveitem&st=1&id=${t_id}`);
                    }
                }, 50);
                tpAfterFight = false;
            }
        }
        return ret;
    }
})(document, window.newOther, window.battleMsg)