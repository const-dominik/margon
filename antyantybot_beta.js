(newOther => {
    const isPossiblyAdmin = nick => {
        const arr = ["morv", "morry", "rherra", "ban", "kyla", "achaja", "varath"];
        for (let i = 0; i < arr.length; i++) {
            if (nick.toLowerCase().includes(arr[i])) {
                return true;
            }
        }
    };

    const ikonka = icon => {
        const arr = ["morry", "unia_106m", "127759.gif", "morv"]
        for (let i = 0; i < arr.length; i++) {
            if (icon.toLowerCase().includes(arr[i])) {
                return true;
            }
        }
    };

    const sendToDiszkort = (tytuł, napis) => {
        window.$.ajax({
            url: 'https://discordapp.com/api/webhooks/572121812981252097/ywdEtRzVEjtesEFQ6t7AQzyq6KHBnTlufMfhpNv4ZIwVAlMVnvzz3GG9oeKWXR2WQTE-',
            type: 'POST',
            data: JSON.stringify({
                'embeds': [{
                    'title': tytuł,
                    'description': napis
                }]
            }),
            contentType: "application/json"
        });
    };
// od 5 do 12, od 12 do 18, od 18 do 22 i od 22 do 5
    const losujwiadomosc = godzina => {
        if (godzina >= 22 && godzina <= 5) {
            let wiadnadobranoc = ["dobranoc", "papa, miłych snów", "narka, dobranoc", "ja lecę, mama każe mi wyłącząć xD"];
            return wiadnadobranoc[Math.floor(Math.random() * wiadnadobranoc.length)];
        } else if (godzina >= 6 && godzina <= 12) {
            let wiadmoscirano = ["hej, idem na sniadanko", "hej, lecę pobiegać", "hej jadę na wakacje, papatki"];
            return wiadmoscirano[Math.floor(Math.random() * wiadmoscirano.length)];
        } else if (godzina >= 13 && godzina <= 18){
            let wiadpopoludniu = ["heej, ja lecę pobiegać", "hejo ide na rower", "o witam, tata każe kosić trawę więc też żegnam :[", "idę do kościoła, amen", "hej, idem na obiadek"];
            return wiadpopoludniu[Math.floor(Math.random() * wiadpopoludniu.length)];
        } else { 
            let wiadwieczorem = ["hej, idem na kolacje", "hej, ide na trening"];
            return wiadwieczorem[Math.floor(Math.random() * wiadwieczorem.length)];
        }
    }

    const morryuciekaj = nick => {
        window.g.lock.add("morry");
        setTimeout(() => {
            window.chatSend(`@${nick.split(" ").join("_")} ${losujwiadomosc(new Date().getHours())}`);
            setTimeout(() => window.location.href = "http://margonem.pl/", 200);
        }, 1500)
    }

    let zawiera = false;
    const checkMessage = (wiad, nick) => {
        for (let i in wiad.split(" ")) {
            if (hero.nick.includes(wiad[i]) && wiad.length > 3) { 
            sendToDiszkort("ktos napisal twoj nick", `${nick}: "${wiad}"`);
            zawiera = true;
            setTimeout(() => {
                window.chatSend('a dajcie mi w koncu spokój wszyscy -,-');
                setTimeout(() => window.location.href = "http://margonem.pl/", 200);
            }, 2000)
            }
        }
    }

    window.newOther = players => {
        if (players) {
            for (const [id, player] of Object.entries(players)) {
                if (!window.g.other[id]) {
                    const {
                        nick,
                        icon,
                        lvl,
                        rights
                        } = player;
                    if (nick) {
                        if (ikonka(icon) || isPossiblyAdmin(nick) || lvl === 0 || ![0, 4, 32].includes(rights)) { // || document.getElementById(`other${id}`).getAttribute("tip").includes("Mistrz Gry")
                            return morryuciekaj(nick);
                        }
                    }
                }
            }
        }
        newOther(players);
    }

    (wiadomosc => {
        const msgIncludesObj = msg => {
            for (const [objMsg, msgToSend] of Object.entries(wiadomosc)) {
                if (msg.toLowerCase().includes(objMsg)) {
                    return msgToSend;
                }
            }
        }
        window.g.chat.parsers.push(ch => {
            const {
                k,
                n,
                ts,
                t,
                s
            } = ch;
            if (n !== window.hero.nick && window.g.ev - parseInt(ts) < 2) {
                checkMessage(t, n);
                if (!zawiera) {
                switch (k) {
                    case 3:
                        if (msgIncludesObj(t)) odpiszWon(`@${n.split(" ").join("_")}`, msgIncludesObj(t), n, t);
                        break;
                    case 0:
                        if (msgIncludesObj(t)) odpiszWon("", msgIncludesObj(t), n, t);
                        break;
                }
            }
        }
        });
    })({
        'jestes': 'jestem',
        'jesteś': 'jestem',
        'bot': 'co wyzywasz hamie!!!',
        'odp': 'odpisuje ?',
        'nagrywa': 'czy mozna przesylac pozdrowienia do filmu ?',
        'panel': 'na panel to ja cb zglaszam za nekanie',
        'zglasza': 'ja cb zglaszam za nekanie mnie',
        'zgłasza': 'ja cb zgłaszam za nękanie mnie',
        'zglosz': 'ja cb zgłaszam za nękanie mnie',
        'zgłosz': 'ja cb zgłaszam za nękanie mnie',
        'boci': 'ty sam bocisz czemu wyzywasz ;)',
        'siema': 'siema',
        'co tam': 'dobrze',
        'bocisz': 'sam bocisz ja nie bot',
        'siemka': 'siemka'
    });

    const odpiszWon = (prefix, whatToSend, nick, fullMessage) => {
       window.g.lock.add('daun');
       sendToDiszkort("Napisali do ciebie...", `${nick}: "${fullMessage}"`);
    setTimeout(() => {
        window.chatSend(`${prefix} ${whatToSend}`);
        setTimeout(() => window.location.href = "http://margonem.pl/", 200);
    }, 2000);
    }

    window.g.loadQueue.push({
        fun() {
            window.mAlert = txt => {
                if (!["Przeciwnik walczy już z kimś innym", "Jesteś zbyt daleko od postaci, by z nią rozmawiać!"].includes(txt)) {
                    if (txt.includes("Otrzymałeś przypomnienie")) {
                        window.g.lock.add("malercik");
                        const a = txt.split("</strong><br><br>"),
                              co_chciał = a[1].split("/<strong>"),
                              od_kogo = co_chciał[1].split("</strong><br>"),
                              nick = od_kogo[0],
                              pytanie = co_chciał[0],
                              nickDoWysłania = nick.split(" ").join("_"),
                              całość = `${nickDoWysłania} dał przypomnienie(?XD): ${pytanie}`;
                        sendToDiszkort("morry chuj", całość);
                        return morryuciekaj(nick);
                    }
                    setTimeout(() => {
                        window.g.lock.remove("malercik");
                    }, 3000);
                }
            }
        }
    })
})(window.newOther);