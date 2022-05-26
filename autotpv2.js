// ==UserScript==
// @name         autotp test 2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @grant        none
// ==/UserScript==

((oldNewOther, oldParseInput) => {
    //graficzne elementy
    let box = document.createElement("span");
    box.id = "adisonzawodowiec";
    box.innerHTML = "Przeciągnij teleport<br>";

    //chowanie okienka
    let box3 = document.createElement("span");
    box3.id = "asdasdrewwq";
    box3.classList.add("b_buttons");
    box3.tip = "Wyświetl okienko od uciekania";
    let style1 = document.createElement("style");
    style1.innerHTML = "#asdasdrewwq{left:88.5px;top:512px;background-image:none;opacity:.7}#asdasdrewwq:hover{opacity:1}";
    document.querySelector("#panel").appendChild(box3);
    document.head.appendChild(style1);
    box3.addEventListener("click", function () {
        let dane = localStorage.getItem("brutus_position").split("|");
        let x = dane[0];
        let y = dane[1];
        if (dane[2] == 1) {
            document.querySelector("#adisonzawodowiec").style.display = "none";
            localStorage.setItem("brutus_position", `${x}|${y}|0`);
        } else {
            document.querySelector("#adisonzawodowiec").style.display = "block";
            localStorage.setItem("brutus_position", `${x}|${y}|1`);
        };
    });

    //dla itemka
    let inpTp = document.createElement("div");
    inpTp.id = "adison_inpTp";
    inpTp.style = "position: relative; left: 77px; width: 32px; height: 32px; background: rgba(40,40,40,0.5); border: 1px solid #333333; margin-bottom: 5px; margin-top: 2px";
    box.appendChild(inpTp);

    let inpLvl = document.createElement("input");
    inpLvl.type = "text";
    inpLvl.size = "1";
    inpLvl.id = "adison_inpLvl";
    box.appendChild(inpLvl);
    box.innerHTML += "<br>";

    let inpDontRun = document.createElement("input");
    inpDontRun.type = "text";
    inpDontRun.size = "20";
    inpDontRun.id = "dominik_inpDontRun";
    inpDontRun.setAttribute("tip", "nigdy nie uciekaj, oddziel przecinkiem (nick, nick)")
    box.appendChild(inpDontRun);
    box.innerHTML += "<br>";

    let inpRun = document.createElement("input");
    inpRun.type = "text";
    inpRun.size = "20";
    inpRun.id = "dominik_inpRun";
    inpRun.setAttribute("tip", "zawsze uciekaj, oddziel przecinkiem (nick, nick)");
    box.appendChild(inpRun);
    box.innerHTML += "<br>";

    let inpLog = document.createElement("input");
    inpLog.type = "checkbox";
    inpLog.name = "dominik_inpLog";
    box.appendChild(inpLog);
    box.innerHTML += "Logout po tepeku?<br>";

    let inpClan = document.createElement("input");
    inpClan.type = "checkbox";
    inpClan.name = "adison_inpClan";
    box.appendChild(inpClan);
    box.innerHTML += "Uciekać znaj/klan?<br>";

    let inpSoj = document.createElement("input");
    inpSoj.type = "checkbox";
    inpSoj.name = "dominik_inpSoj";
    box.appendChild(inpSoj);
    box.innerHTML += "Uciekać przed clan soj?<br>";

    let inpEscape = document.createElement("input");
    inpEscape.type = "checkbox";
    inpEscape.name = "adison_inpEscape";
    box.appendChild(inpEscape);

    let strEscape = document.createElement("span");
    strEscape.id = "adison_strEscape";
    strEscape.innerHTML = "Uciekanie włączone"
    strEscape.style.fontWeight = "bold";
    box.appendChild(strEscape);

    document.body.appendChild(box);

    let style = document.createElement("style");
    style.innerHTML = "#adisonzawodowiec{position:absolute; z-index: 400; width: 188px; height: 190px; background:#b8b8b8;text-align:center;padding:5px;border:2px solid red}input[id=adison_inpLvl]{border:1px solid #86cdda;border-radius:4px;padding:1px}input[id=adison_inpLvl]:hover{background:#dadada;cursor:auto}input[id=adison_inpLvl]:focus{background:#dadada}input[id=dominik_inpDontRun]{border:1px solid #86cdda;border-radius:4px;padding:1px}input[id=dominik_inpDontRun]:hover{background:#dadada;cursor:auto}input[id=dominik_inpDontRun]:focus{background:#dadada}input[id=dominik_inpRun]{border:1px solid #86cdda;border-radius:4px;padding:1px}input[id=dominik_inpRun]:hover{background:#dadada;cursor:auto}input[id=dominik_inpRun]:focus{background:#dadada}";
    document.head.appendChild(style);

    //pozycja okienka
    if (!localStorage.getItem("brutus_position")) localStorage.setItem("brutus_position", "0|0|1");
    ((pos, element) => {
        let position = pos.split("|");
        let x = position[0] + "px";
        let y = position[1] + "px";
        if (Number(position[2]) === 1) {
            element.style.display = "block";
        } else if (Number(position[2]) === 0) {
            element.style.display = "none";
        } else {
            throw "Error z wyświetlaniem";
        }
        element.style.top = x;
        element.style.left = y;
    })(localStorage.getItem("brutus_position"), document.querySelector("#adisonzawodowiec"))

    //generowanie tipu itemsa
    const generateItem = item => {
        let tip = window.itemTip(item);
        let html = "";
        html += `<div class="item" ctip="t_item" tip="${tip.replace(/"/g, '&quot;')}">`;
        if (item.stat.includes("legendary")) html += `<div class="itemHighlighter t_leg"></div>`;
        if (item.stat.includes("heroic")) html += `<div class="itemHighlighter t_her"></div>`;
        if (item.stat.includes("unique")) html += `<div class="itemHighlighter t_uni"></div>`;
        if (item.stat.includes("upgraded")) html += `<div class="itemHighlighter t_upg"></div>`;
        html += `<img src="/obrazki/itemy/${item.icon}">`;
        html += `</div>`;
        return html;
    }

    window.g.loadQueue.push({
        fun() {
            if (!localStorage.getItem(`itemek${window.hero.id}`)) localStorage.setItem(`itemek${window.hero.id}`, JSON.stringify({
                name: "Zwój teleportacji na Kwieciste Przejście",
                stat: "amount=14;capacity=15;lvl=70;teleport=344,17,60",
                icon: "pap/pap44.gif",
                pr: 42000,
                cl: 16
            }));
            document.querySelector("#adison_inpTp").innerHTML = generateItem(JSON.parse(localStorage.getItem(`itemek${window.hero.id}`)));
            if (!localStorage.getItem(`lvl${window.hero.id}`)) localStorage.setItem(`lvl${window.hero.id}`, `-${hero.lvl}`);
            document.querySelector("#adison_inpLvl").value = localStorage.getItem(`lvl${window.hero.id}`);
            if (!localStorage.getItem(`neverrun${window.hero.id}`)) localStorage.setItem(`neverrun${window.hero.id}`, "");
            document.querySelector("#dominik_inpDontRun").value = localStorage.getItem(`neverrun${window.hero.id}`);
            if (!localStorage.getItem(`alwaysrun${window.hero.id}`)) localStorage.setItem(`alwaysrun${window.hero.id}`, "");
            document.querySelector("#dominik_inpRun").value = localStorage.getItem(`alwaysrun${window.hero.id}`);
            if (!localStorage.getItem(`logout${window.hero.id}`)) localStorage.setItem(`logout${window.hero.id}`, 0);
            document.querySelector("input[name=dominik_inpLog]").checked = JSON.parse(localStorage.getItem(`logout${window.hero.id}`));
            if (!localStorage.getItem(`runclfr${window.hero.id}`)) localStorage.setItem(`runclfr${window.hero.id}`, 0);
            document.querySelector("input[name=adison_inpClan]").checked = JSON.parse(localStorage.getItem(`runclfr${window.hero.id}`));
            if (!localStorage.getItem(`runclallies${window.hero.id}`)) localStorage.setItem(`runclallies${window.hero.id}`, 1);
            document.querySelector("input[name=dominik_inpSoj]").checked = JSON.parse(localStorage.getItem(`runclallies${window.hero.id}`));
            if (!localStorage.getItem(`escape${window.hero.id}`)) localStorage.setItem(`escape${window.hero.id}`, 1);
            document.querySelector("input[name=adison_inpEscape]").checked = JSON.parse(localStorage.getItem(`escape${window.hero.id}`));
            if (JSON.parse(localStorage.getItem(`escape${window.hero.id}`))) {
                document.querySelector("#adison_strEscape").style.color = "green";
                document.querySelector("#adison_strEscape").innerHTML = "Uciekanie włączone";
            } else {
                document.querySelector("#adison_strEscape").style.color = "red";
                document.querySelector("#adison_strEscape").innerHTML = "Uciekanie wyłączone";
            };
            if (localStorage.getItem(`lastPerson${window.hero.id}`)) window.log(localStorage.getItem(`lastPerson${window.hero.id}`));
        }
    });
    let useTpAfterFight = false;
    let idtepeka;

    document.querySelector("#adison_inpTp").addEventListener("keyup", function () {
        localStorage.setItem(`itemek${window.hero.id}`, this.value);
    });
    document.querySelector("#dominik_inpDontRun").addEventListener("keyup", function () {
        localStorage.setItem(`neverrun${window.hero.id}`, this.value);
    });
    document.querySelector("#dominik_inpRun").addEventListener("keyup", function () {
        localStorage.setItem(`alwaysrun${window.hero.id}`, this.value);
    });
    document.querySelector("#adison_inpLvl").addEventListener("keyup", function () {
        localStorage.setItem(`lvl${window.hero.id}`, this.value);
    });
    document.querySelector("input[name=adison_inpClan]").addEventListener("change", function () {
        localStorage.setItem(`runclfr${window.hero.id}`, this.checked);
    });
    document.querySelector("input[name=dominik_inpSoj]").addEventListener("change", function () {
        localStorage.setItem(`runclallies${window.hero.id}`, this.checked);
    });
    document.querySelector("input[name=dominik_inpLog]").addEventListener("change", function () {
        localStorage.setItem(`logout${window.hero.id}`, this.checked);
    });
    document.querySelector("input[name=adison_inpEscape]").addEventListener("change", function () {
        window.localStorage.setItem(`escape${window.hero.id}`, this.checked);
        if (this.checked === true) {
            document.querySelector("#adison_strEscape").style.color = "green";
            document.querySelector("#adison_strEscape").innerHTML = "Uciekanie włączone";
        } else {
            document.querySelector("#adison_strEscape").style.color = "red";
            document.querySelector("#adison_strEscape").innerHTML = "Uciekanie wyłączone";
        };
    });

    const savePosition = () => {
        let x = parseInt(document.querySelector("#adisonzawodowiec").style.top);
        let y = parseInt(document.querySelector("#adisonzawodowiec").style.left);
        localStorage.setItem(`brutus_position`, `${x}|${y}|1`);
    };

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

    window.$("#adison_inpTp").droppable({
        accept: ".item",
        drop: (e, ui) => {
            let item = window.g.item[ui.draggable.attr("id").replace("item", "")];
            if (item.cl === 16 && item.loc === "g") {
                document.querySelector("#adison_inpTp").innerHTML = generateItem(item);
                localStorage.setItem(`itemek${window.hero.id}`, JSON.stringify(item));
                haveTpReady();
                window.message("Zapisano");
            } else {
                window.message("To nie teleport wtf");
            }
        }
    });

    const checkRelation = (rel, clfr, clall) => {
        switch (rel) {
            case "cl":
            case "fr":
                return clfr ? true : false;
            case "cl-fr":
                return clall ? true : false;
            default:
                return true;
        };
    };

    const logout = () => {
        const tepek = JSON.parse(localStorage.getItem(`itemek${window.hero.id}`));
        const id = window.parseItemStat(tepek.stat).teleport.split(",")[0];
        if (window.map.id === id && Number(localStorage.getItem(`logout${window.hero.id}`))) {
            localStorage.setItem(`logout${window.hero.id}`, 0);
            fetch("https://discordapp.com/api/webhooks/554768951511613471/909QFuGF3sZoXnrsOt2nsukiul_dr3r0EcDs7NbWIG7v3B6JOzCku7pExxuU1to7XUft", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    embeds: [{
                        title: "tepnelo cie",
                        description: localStorage.getItem(`lastPerson${window.hero.id}`)
                    }]
                })
            });
            window.location.href = "http://margonem.pl";
        };
    };

    const haveTpReady = () => {
        const tepek = JSON.parse(localStorage.getItem(`itemek${window.hero.id}`));
        const {
            name,
            id
        } = tepek;
        if (!window.g.item[id]) {
            for (const [id2, item] of Object.entries(g.item)) {
                if (item.name === name && item.loc === "g") {
                    if (!item.timelimit) {
                        localStorage.setItem(`itemek${window.hero.id}`, JSON.stringify(item));
                        idtepeka = id2;
                    } else {
                        const min = item.timelimit.split(',')[1];
                        const ts = window.unix_time();
                        if (min) {
                            if (ts > min) {
                                idtepeka = window.g.item[i].id;
                                break;
                            }
                        } else {
                            idtepeka = window.g.item[i].id;
                            break;
                        }
                    };
                };
            };
            !idtepeka ? window.message("Nie masz tepeka!") : "";
        } else {
            idtepeka = id;
        };
    };

    const teleport = () => {
        if (!window.g.battle) {
            window._g(`moveitem&st=1&id=${idtepeka}`);
        } else {
            window.message("Teleport zostanie użyty po zakończeniu walki.");
            useTpAfterFight = true;
        };
    };

    const checkItems = () => {
        if (window.g.item.length < 1) {
            return setTimeout(checkItems, 200);
        } else {
            haveTpReady();
        };
    };
    checkItems();

    window.newOther = players => {
        oldNewOther(players);
        if (window.map.pvp === 2) {
            const poziom = Number(localStorage.getItem(`lvl${window.hero.id}`));
            const nickiNeverEscape = localStorage.getItem(`neverrun${window.hero.id}`).toLowerCase().split(", ");
            const nickiAlwaysEscape = localStorage.getItem(`alwaysrun${window.hero.id}`).toLowerCase().split(", ");
            const escapeClFr = Number(localStorage.getItem(`runclfr${window.hero.id}`));
            const escapeClAllies = Number(localStorage.getItem(`runclallies${window.hero.id}`));
            const ESCAPE = Number(localStorage.getItem(`escape${window.hero.id}`));
            for (const player of Object.values(players)) {
                if ((player.lvl >= hero.lvl + poziom && checkRelation(player.relation, escapeClFr, escapeClAllies) && !nickiNeverEscape.includes(player.nick.toLowerCase()) || nickiAlwaysEscape.includes(player.nick.toLowerCase())) && ESCAPE) {
                    localStorage.setItem(`lastPerson${window.hero.id}`, `Ostatni raz próbowałeś uciekać przed ${player.nick} ${player.lvl}${player.prof}.`)
                    teleport();
                    break;
                };
            };
        };
    };

    window.parseInput = (d, callback, xhr) => {
        if (d.f && d.f.move && d.f.move === -1) {
            window._g("fight&a=quit");
        } else if (d.f && d.f.close && d.f.close === 1 && useTpAfterFight) {
            window._g(`moveitem&st=1&id=${idtepeka}`);
        } else if (d.town) {
            logout();
        };
        oldParseInput(d, callback, xhr);
    };
})(window.newOther, window.parseInput);