// ==UserScript==
// @name         `ANTYANTYBOT v2.0
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*.margonem.pl/
// @grant        none
// ==/UserScript==

/*
    ==== PART 1 - MORRY ====
    a) newOther - zrobione
    b) wiadomosc - zrobione
    c) alert - zrobione, przetestowane
    ==== PART 2 - CWELE ====
    a) wiadomosci - zrobione
    b) odrzucanie zaproszeń - zrobione, przetestowane
    c) dodawanie do wrogow jak ktos spamuje zapami - do zrobienia
*/

((newother, pi) => {
    window.g.loadQueue.push({
        fun: () => {
            if (map.name === "Kwieciste Przejście" && localStorage.getItem("morry") === 1) window.location.href = "http://margonem.pl";
        }
    })
    //utilitki
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const checkNick = nick => {
        const arr = ["morv", "morry", "rherra", "bano", "kyla", "achaja", "varath", "gretoin", "dirmomus", "lejdi"];
        return arr.some(part => nick.toLowerCase().includes(part));
    }

    const checkOutfit = icon => {
        const arr = ["morry", "unia_106m", "127759.gif", "morv"];
        return arr.some(part => icon.includes(part));
    }

    const checkOtherProperties = (lvl, rights, id) => {
        const postac = document.querySelector(`#other${id}`);
        const tip2 = postac.getAttribute("tip");
        return lvl === 0 || ![0, 4, 32].includes(rights) || (tip2 && tip2.includes("Mistrz Gry"));
    }

    const findTp = nazwa => {
        for (let [id, {
                name
            }] of Object.entries(g.item)) {
            if (name === nazwa) return id;
        }
    }

    const useTp = id => {
        if (window.g.battle) {
            return setTimeout(useTp, 1, id);
        } else {
            return window._g(`moveitem&id=${tpId}&st=1`, setTimeout(useTp, 5, id));
        }
    }

    const checkIfEnemy = async nick => {
        const URL = `http://${window.g.worldname}.margonem.pl/engine?t=friends&a=show&ev=${window.g.ev + 0.01}&browser_token=${window.g.browser_token}&aid=${window.g.aid}`;
        const request = await fetch(URL);
        const data = await request.json();
        return data.enemies.includes(nick);
    }

    const addToEnemy = nick => {
        nick = nick.replace(/ /g, "%20");
        _g(`friends&a=eadd&nick=${nick}`);
    }

    const getRandomResponseTime = () => {
        return Math.floor(Math.random() * 3000 + 3000);
    }

    const sendToDiscord = (descr) => {
        fetch("https://discordapp.com/api/webhooks/572121812981252097/ywdEtRzVEjtesEFQ6t7AQzyq6KHBnTlufMfhpNv4ZIwVAlMVnvzz3GG9oeKWXR2WQTE-", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                embeds: [{
                    title: "MORRY!",
                    description: descr
                }],
                username: `sprawdzanko`
            }),
        });
    }
    //funkcje do uciekania
    const chatsend = async (gdz, message, morry = false) => {
        window.g.lock.add("pisze");
        await sleep(getRandomResponseTime());
        const url = `http://${window.g.worldname}.margonem.pl/engine?t=chat&ev=${window.g.ev + 0.01}&browser_token=${window.g.browser_token}&aid=${window.g.aid}`;
        const request = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                c: `${gdz} ${message}`
            })
        });
        const data = await request.json();
        if (data.e !== "ok" || data.w) {
            return chatsend(gdz, message, morry);
        }
        window.g.lock.remove("pisze");
        if (morry) window.location.href = "http://margonem.pl/"
    }

    const adminRun = () => {
        if (window.map.pvp === 2) {
            localStorage.setItem("morry", "1");
            setTimeout(useTp, 300, findTp("Zwój teleportacji na Kwieciste Przejście"));
        } else {
            chatsend("/k", messagesMorry(false), true);
        }
    }

    const messagesMorry = (other = true) => {
        const hours = new Date().getHours();
        const msgMorning = other ? ["ide na sniadanie, zw", "lece na autobus, bede potem", "dobra bo sie spoznie do szkoly, lece"] : ["witam, niestety bardzo sie spiesze na autobus xD"];
        const msgAfternoon = other ? ["lece, bede potem", "ja zw, musze tacie w czyms pomoc", "ja lece, bede na kolosów"] : ["siema, tato chce zebym mu w czyms pomogl wiec zw"];
        const msgNight = other ? ["matka mnie goni do spania, siemanko xD", "ja lecę, do jutra :D", "dobra bo robota rano, siema"] : ["witam, matka mnie goni do spania więc spadam xD"];
        if (hours >= 6 && hours <= 12) {
            return msgMorning[Math.floor(Math.random() * msgMorning.length)];
        } else if (hours >= 13 && hours <= 21) {
            return msgAfternoon[Math.floor(Math.random() * msgAfternoon.length)];
        } else {
            return msgNight[Math.floor(Math.random() * msgNight.length)];
        }
    }

    const responses = {
        bot: 'prosze bez wyzwisk',
        obecnosc: 'jestem',
        zgloszenie: 'ja cb zglaszam za nekanie mnie',
        przywitanie: 'hej',
        odpisz: "co",
        pozdrowienia: "pozdrawiam",
        pytanko1: 'nie',
        pytanko2: 'nic',
        pytanko3: 'dobrze',
        pytanko4: 'bo tak',
        pytanko5: 'nie wiem',
        wrog: ["narka", "zegnam", "dodaje cie do wrogow", "nekanie === wrog", "dobra nara kolo"],
        defaulty: ["kto ty -.-", "nie pisz do mnie", "odczep sie", "nie pisze z toba", "co", "?????"],
    }

    const getResponse = (message, k) => {
        if (["bot", "boci"].some(elem => message.includes(elem))) {
            return responses["bot"];
        } else if (["zglosz", "zgłosz", "zgłasza", "zglasza", "panel"].some(elem => message.includes(elem))) {
            return responses["zgloszenie"];
        } else if (["nagrywa", "nagra", "pozdro"].some(elem => message.includes(elem))) {
            return responses["pozdrowienia"];
        } else if (["jestes", "jesteś"].some(elem => message.includes(elem))) {
            return responses["obecnosc"];
        } else if (["ej", "odp", "halo", "ban"].some(elem => message.includes(elem))) {
            return responses["odpisz"];
        } else if (["hej", "siem", "elo", "czesc", "cześć"].some(elem => message.includes(elem))) {
            return responses["przywitanie"];
        } else if (["idzie", "chcesz", "pomożesz", "pomozesz", "dasz dobic", "dasz dobić", "zwolnisz"].some(elem => message.includes(elem))) {
            return responses["pytanko1"];
        } else if (["co u ciebie", "co rb", "co robisz"].some(elem => message.includes(elem))) {
            return responses["pytanko2"];
        } else if (["co tam", "jak tam"].some(elem => message.includes(elem))) {
            return responses["pytanko3"];
        } else if (["czemu"].some(elem => message.includes(elem))) {
            return responses["pytanko4"];
        } else if (message.endsWith("?")) {
            return responses["pytanko5"];
        } else {
            return responses["defaulty"][Math.floor(Math.random() * responses["defaulty"].length)];
        }
    }

    const handleRandomMessages = async (nick, mess, zakl) => {
        if (await checkIfEnemy(nick)) return;
        if (!localStorage.getItem("randy")) localStorage.setItem("randy", "{}");
        const randy = JSON.parse(localStorage.getItem("randy"));
        if (!randy[nick]) randy[nick] = 1;
        else randy[nick]++;
        localStorage.setItem("randy", JSON.stringify(randy)); 
        if (randy[nick] <= 3) {
            chatsend(zakl === 0 ? "" : `@${nick.replace(/ /g, "_")}`, getResponse(mess.toLowerCase(), 3), false); //co jesli wiadomosc nie pasuje do zadnego z getResponse? sprawdzaj zakładkę dałnie
        } else {
            await chatsend(zakl === 0 ? "" : `@${nick.replace(/ /g, "_")}`, responses["wrog"][Math.floor(Math.random() * responses["wrog"].length)], false);
            addToEnemy(nick);
        }
    }

    const parser = ch => {
        const {
            k,
            n,
            i,
            s,
            t,
            ts
        } = ch;
        if (n && n !== window.hero.nick && !s && window.g.ev - ts <= 4 && [0, 3].includes(k)) {
            if (checkNick(n) || (i && checkOutfit(i))) {
                window.g.lock.add('morry');
                const toSendDiscord = `${["O", "K", "G", "P"][k]} **${n}**: (${new Date().toLocaleTimeString()}) ${t}`;
                sendToDiscord(toSendDiscord);
                setTimeout(() => {
                    chatsend(k === 3 ? `@${n.replace(/ /g, "_")} ` : '', messagesMorry(false), true);
                }, getRandomResponseTime());
            } else {
                handleRandomMessages(n, t, k);
            }
        }
    }
    window.g.chat.parsers.push(parser);

    window.newOther = a => {
        newother(a);
        for (let [id, {
                nick,
                icon,
                lvl,
                rights
            }] of Object.entries(a)) {
            if ((nick && checkNick(nick)) || (icon && checkOutfit(icon)) || (lvl && rights && id && checkOtherProperties(lvl, rights, id))) {
                window.g.lock.add("morry");
                const toSendDiscord = `nick: ${nick}, icon: ${icon}, lvl: ${lvl}, rights: ${rights}, mapa: ${window.map.name}`
                sendToDiscord(toSendDiscord);
                return adminRun();
            };
        };
    };

    window.mAlert = txt => {
        if (txt.includes("Otrzymałeś przypomnienie")) {
            window.g.lock.add("alercik");
            const parser = new DOMParser();
            const html = parser.parseFromString(txt, "text/html");
            const [co, nick] = html.querySelectorAll("strong");
            html.querySelector("body").querySelectorAll("br, strong, center").forEach(el => el.remove())
            const pytanko = html.querySelector("body");
            const toSendDiscord = `${co.innerText}\nFull: ${txt}\n${nick.innerText}: ${pytanko.innerText}`;
            sendToDiscord(toSendDiscord);
            chatsend(`@${nick.replace(/ /g, "_")}`, messagesMorry(false), true);
        }
    };

    window.parseInput = async (a, b, c) => {
        const ret = pi(a, b, c);
        if (a.ask) {
            window.g.lock.add("zapek");
            setTimeout(() => {
                window._g(`${a.ask.re}0`);
                setTimeout(() => window.g.lock.remove("zapek"), 500);
            }, 1000);
        }
        return ret;
    }
})(window.newOther, window.parseInput)