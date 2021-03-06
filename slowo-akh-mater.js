// ==UserScript==
// @name         bot slowo akh mater
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://berufs.margonem.pl/
// @grant        none
// ==/UserScript==

(oldNpcTalk => {
    window.g.loadQueue.push({
        fun: () => {
            whatToDo();
        }
    })

    const npcty = {
        "Mag Magus": {
            map: "Karka-han",
            time: 0,
            nawrut: false
        },
        "Rachmistrz Newald": {
            map: "Kamienica Newalda",
            time: 0,
            nawrut: false
        },
        "Kleofas": {
            map: "Kamienica Kleofasa",
            time: 0,
            nawrut: false
        },
        /*"Lifiana": {
            map: "Kamienica Kleofasa p.1",
            time: 0,
            nawrut: false
        },*/
        "Aurelia": {
            map: "Karka-han",
            time: 0,
            nawrut: false
        },
        "Dionizy": {
            map: "Dom Aurelii i Dionizego ",
            time: 0,
            nawrut: false
        },
        "Apoks": {
            map: "Karka-han",
            time: 0,
            nawrut: false
        },
        "Kalicja": {
            map: "Dom Kalicji i Apoksa",
            time: 0,
            nawrut: false
        },
        "Zeina": {
            map: "Dom Zeiny",
            time: 0,
            nawrut: false
        },
        "Lenka": {
            map: "Karka-han",
            time: 0,
            nawrut: false
        },
        "Nufrex": {
            map: "Dom Nufrexa",
            time: 0,
            nawrut: false
        },
        "Mistrz Johan": {
            map: "Karka-han",
            time: 0,
            nawrut: false
        },
        "Stary Remiusz": {
            map: "Dom Remiusza",
            time: 0,
            nawrut: false
        },
        "Uzdrowicielka Halfinia": {
            map: "Karka-han",
            time: 0,
            nawrut: false
        },
        "Malia": {
            map: "Karka-han",
            time: 0,
            nawrut: false
        }
    }
    if (!localStorage.getItem("npcety")) localStorage.setItem("npcety", JSON.stringify(npcty));
    //todo: kontroler w ls
    const postepQuesta = () => {
        const element = document.querySelector("#quest-log-window .quest-log-content p.quest-log-id-382 .q_doit");
        return element ? element.innerHTML : false;
    }
 // skonczyles na nawracaniu, getEntranceCords zwraca ci false z jakiegos powodu, jakies jakby while(true) podczas nawracanska
    const nawracanie = () => {
        const lsNpcety = JSON.parse(localStorage.getItem("npcety"));
        console.log("nawracanie");
        for (let [name, {
                map,
                time,
                nawrut
            }] of Object.entries(lsNpcety)) {
            if (window.g.ev - time >= 5 * 60 * 1000) {
                if (map === window.map.name) {
                    console.log(map === window.map.name);
                    return canTalkOrWalkAndTalk(name);
                } else if (window.map.name === "Karka-han") {
                    return goToNextMap(map);
                } else if (window.map.name !== "Karka-han") {
                    return goToNextMap("Karka-han");
                }
            }
        }
        return setTimeout(whatToDo, 60 * 1000);
    }

    const getEntranceCords = name => {
        for (let [id, mapa] of Object.entries(window.g.townname)) {
            if (name === mapa) {
                console.log(g.gwIds[id]);
                return g.gwIds[id].split(".");
            }
        }
        return false;
    }

    const goToNextMap = name => {
        const [x, y] = getEntranceCords(name);
        if (Number(x) === window.hero.x && Number(y) === window.hero.y) window._g("walk");
        else {
            goTo(x, y);
            setTimeout(whatToDo, 1500);
        }
    }

    const canTalkOrWalkAndTalk = (npcNick) => {
        if (g.npc.length) {
            const npct = g.npc[getNpcId(npcNick)];
            if (checkDistance(npct.x, npct.y)) {
                return talk(npct.id);
            } else {
                goTo(npct.x, npct.y);
            }
        }
        setTimeout(canTalkOrWalkAndTalk, 1000, npcNick);
    }

    const findItem = itemName => {
        if (window.g.item.length) {
            for (let [id, {
                    name
                }] of Object.entries(window.g.item)) {
                if (itemName === name) return id;
            }
            return false;
        } else {
            setTimeout(findItem, 1000, itemName);
        }
    }

    const talk = id => window._g(`talk&id=${id}`);

    const cTalk = (dialog, opcja, index = 0) => {
        if (!index) {
            for (let i = 0; i <= dialog.length; i++) {
                if (dialog[i] === opcja) return setTimeout(() => window._g(`talk&id=${dialog[2]}&c=${dialog[++i]}`), 500);
            }
        } else {
            return setTimeout(() => window._g(`talk&id=${dialog[2]}&c=${dialog[index]}`), 500);
        }
    }

    const getNpcId = npcName => {
        if (window.g.npc.length) {
            for (let [id, {
                    nick
                }] of Object.entries(window.g.npc))
                if (nick === npcName) return id;
        } else {
            setTimeout(getNpcId, 1000, npcName);
        }
    }

    const checkDistance = (x, y) => Math.abs(hero.x - x) <= 1 && Math.abs(hero.y - y) <= 1;

    const checkRequiredItems = () => {
        let pietrucha, wisienki;
        for (let {
                name
            } of Object.values(window.g.item)) {
            if (name === "Zielona pietruszka") pietrucha = true;
            else if (name === "Kandyzowane wisienki w cukrze") wisienki = true;
        }
        return pietrucha && wisienki;
    }
    //dialog sie zatrzymuje czasem :(
    const whatToDo = (kontroler = 0) => {
        const postep = postepQuesta();
        const mapa = window.map.name;
        const pioro = Number(localStorage.getItem(`pioro`));
        console.log(postep, "abc");
        if (postep && postep.includes("Nawr???? mieszka??c??w Karka-han.")) nawracanie();
        switch (postep) {
            case false:
                canTalkOrWalkAndTalk("Fedrille", "Przedmie??cia Karka-han");
                break;
            case "Porozmawiaj z Fedrille.":
                setTimeout(canTalkOrWalkAndTalk, (2 * 60 * 1000), "Fedrille"); // czas do localStorage
                break;
            case "Zdob??d?? g??sie pi??ro i wr???? do kap??anki.":
                if (!pioro) {
                    if (mapa === "Przedmie??cia Karka-han") {
                        goToNextMap("Karka-han");
                    } else if (mapa === "Karka-han") {
                        canTalkOrWalkAndTalk("Zakon Planu Astralnego");
                    } else if (mapa === "Nithal") {
                        goToNextMap("Podgrodzie Nithal");
                    } else if (mapa === "Podgrodzie Nithal") {
                        goToNextMap("Stodo??a");
                    } else if (mapa === "Stodo??a") {
                        goToNextMap("Stodo??a p.1");
                    } else if (mapa === "Stodo??a p.1") {
                        if (!checkDistance(9, 8)) {
                            goTo(9, 8);
                            setTimeout(whatToDo, 1500);
                        } else if (kontroler === 0) {
                            talk(27165);
                        } else if (kontroler === 1) {
                            setTimeout(talk, (60 * 1000), 27165);
                        }
                    }
                } else if (pioro) {
                    if (mapa === "Stodo??a p.1") {
                        goToNextMap("Stodo??a");
                    } else if (mapa === "Stodo??a") {
                        goToNextMap("Podgrodzie Nithal");
                    } else if (mapa === "Podgrodzie Nithal") {
                        goToNextMap("Nithal");
                    } else if (mapa === "Nithal") {
                        canTalkOrWalkAndTalk("Portal");
                    } else if (mapa === "Karka-han") {
                        goToNextMap("Przedmie??cia Karka-han");
                    } else if (mapa === "Przedmie??cia Karka-han") {
                        console.log(pioro);
                        canTalkOrWalkAndTalk("Fedrille");
                    }
                }
                break;
            case "Id?? do Jalena dowiedzie?? si?? wi??cej w sprawie jagni??tka.":
                if (mapa === "Przedmie??cia Karka-han") {
                    goToNextMap("Karka-han")
                } else if (mapa === "Karka-han") {
                    canTalkOrWalkAndTalk("Zakon Planu Astralnego");
                } else if (mapa === "Werbin") {
                    goToNextMap("Dom Jalena i Tafii");
                } else if (mapa === "Dom Jalena i Tafii" || mapa === "Dom Jalena i Tafii - piwnica") {
                    canTalkOrWalkAndTalk("Jalen");
                }
                break;
            case "Porozmawiaj z Jalenem.":
                canTalkOrWalkAndTalk("Jalen");
                break;
            case "Id?? do czarnej owcy z Mythar.":
                if (window.g.item.length) {
                    if (checkRequiredItems()) {
                        if (mapa !== "Mythar") {
                            const kamyk = findItem("Kamie?? teleportuj??cy do Mythar");
                            window._g(`moveitem&id=${kamyk}&st=1`);
                        } else {
                            canTalkOrWalkAndTalk("Czarna owca");
                        }
                    } else {
                        console.log("asd");
                        message("ogarnij se wisnie i pietruche");
                    }
                } else {
                    setTimeout(whatToDo, 1500);
                }
                break;
            case "Podejd?? do jagni??tka ukrytego w krzakach i zach???? je pietruszk??.":
                canTalkOrWalkAndTalk("G??ste krzaki");
                break;
            case "We?? jagni??tko do rze??nika i popro?? o wygarbowanie jego sk??ry.":
                if (mapa === "Mythar") {
                    const kamyk = findItem("Kamie?? teleportuj??cy do Ithan");
                    window._g(`moveitem&id=${kamyk}&st=1`);
                } else if (mapa === "Ithan") {
                    canTalkOrWalkAndTalk("Zakon Planu Astralnego");
                } else if (mapa === "Karka-han") {
                    goToNextMap("Dom rze??nika");
                } else if (mapa === "Dom rze??nika") {
                    canTalkOrWalkAndTalk("Rze??nik Sully");
                }
                break;
            case "Znajd?? Gared na przedmie??ciach.":
                if (mapa === "Dom rze??nika") {
                    goToNextMap("Karka-han");
                } else if (mapa === "Karka-han") {
                    goToNextMap("Przedmie??cia Karka-han");
                } else if (mapa === "Przedmie??cia Karka-han") {
                    canTalkOrWalkAndTalk("Gared");
                }
                break;
            case "Porozmawiaj z Gared i znajd?? Shailin. Po znalezieniu wracaj do Gared.":
                if (kontroler === 0) {
                    canTalkOrWalkAndTalk("Gared");
                } else if (kontroler === 1) {
                    canTalkOrWalkAndTalk("Shailin");
                    setTimeout(() => {
                    if (findItem("??ebro Shailin")) canTalkOrWalkAndTalk("Gared");
                    }, 60000);
                }
                break;
            case "Zanie?? ??ebro Shailin Sullemu.":
                if (mapa === "Przedmie??cia Karka-han") {
                    goToNextMap("Karka-han");
                } else if (mapa === "Karka-han") {
                    goToNextMap("Dom rze??nika");
                } else if (mapa === "Dom rze??nika") {
                    canTalkOrWalkAndTalk("Rze??nik Sully");
                }
                break;
            case "Odbierz sk??r?? od rze??nika i zanie?? Fedrille.":
                canTalkOrWalkAndTalk("Rze??nik Sully");
                break;
            case "Wr???? do Fedrille.":
                if (mapa === "Dom rze??nika") {
                    goToNextMap("Karka-han");
                } else if (mapa === "Karka-han") {
                    goToNextMap("Przedmie??cia Karka-han");
                } else if (mapa === "Przedmie??cia Karka-han") {
                    canTalkOrWalkAndTalk("Fedrille");
                }
                break;
            case "Je??li ju?? czas, wr???? do Fedrille po proroctwa.":
                setTimeout(talk, (60 * 2 * 1000), getNpcId("Fedrille"));
                break;
            case "Nawr??ci??e?? wystarczaj??c?? ilo???? os??b, wr???? do Fedrille.":
                if (mapa === "Karka-han") {
                    goToNextMap("Przedmie??cia Karka-han");
                } else if (mapa !== "Karka-han") {
                    goToNextMap("Karka-han")
                } else if (mapa === "Przedmie??cia Karka-han") {
                   canTalkOrWalkAndTalk("Fedrille");
                }
                break;
        }
    }

    window.npcTalk = dial => {
        oldNpcTalk(dial);
        const lsNpcety = JSON.parse(localStorage.getItem("npcety"));
        //fedrille
        if (dial[1] === "Fedrille") {
            //rozpoczecie kwesta
            if (dial.includes("Wygl??dasz na zas??pion??. Czy to co m??wisz, to jakie?? mod??y? ")) return cTalk(dial, "Wygl??dasz na zas??pion??. Czy to co m??wisz, to jakie?? mod??y? ");
            if (dial.includes("A jednak s??ysz?? pewne znane mi s??owa. ")) return cTalk(dial, "A jednak s??ysz?? pewne znane mi s??owa. ");
            if (dial.includes("Co mianowicie mia??bym zrobi??? ")) return cTalk(dial, "Co mianowicie mia??bym zrobi??? ");
            if (dial.includes("Dobrze, pomog?? ci, o ile b??dzie s??uszna nagroda. ")) return cTalk(dial, "Dobrze, pomog?? ci, o ile b??dzie s??uszna nagroda. ");
            if (dial.includes("Je??li chodzi o to pi??rko, to musisz je zdoby??. Ju?? ci m??wi??am, ??e znajdziesz je gdzie?? na przedmie??ciach du??ych miast. Pami??taj te??, ??e g???? musi by?? chowana pod dachem - to bardzo wa??ne! ")) return cTalk(dial, "Je??li chodzi o to pi??rko, to musisz je zdoby??. Ju?? ci m??wi??am, ??e znajdziesz je gdzie?? na przedmie??ciach du??ych miast. Pami??taj te??, ??e g???? musi by?? chowana pod dachem - to bardzo wa??ne! ");
            if (dial.includes("Nie my??l o nagrodzie, ch??opcze. Nagrod?? jest ??aska bogini. Musz?? teraz skupi?? si?? na modlitwach do Akh-Mater, by ona oczy??ci??a m?? przekl??t?? dusz?? i powiedzia??a mi, co ty masz dla niej zrobi??. ")) return cTalk(dial, "Nie my??l o nagrodzie, ch??opcze. Nagrod?? jest ??aska bogini. Musz?? teraz skupi?? si?? na modlitwach do Akh-Mater, by ona oczy??ci??a m?? przekl??t?? dusz?? i powiedzia??a mi, co ty masz dla niej zrobi??. ");
            if (dial.includes("Daj mi kilka chwil. ")) {
                cTalk(dial, "Daj mi kilka chwil. ");
                return setTimeout(whatToDo, 1500);
            }
            // druga czensc
            if (dial.includes("Pani? Czy ju?? czas? ")) return cTalk(dial, "Pani? Czy ju?? czas? ");
            if (dial.includes("Rozumiem. Sk??d mam wiedzie?? jaka jest ta nowina? ")) return cTalk(dial, "Rozumiem. Sk??d mam wiedzie?? jaka jest ta nowina? ");
            if (dial.includes("Sk??d mog?? wzi???? g??sie pi??ro? ")) return cTalk(dial, "Sk??d mog?? wzi???? g??sie pi??ro? ");
            if (dial.includes("Tak zrobi??! ")) return cTalk(dial, "Tak zrobi??! ");
            if (dial.includes("Bywaj! ")) {
                cTalk(dial, "Bywaj! ");
                return setTimeout(whatToDo, 1500);
            }
            //trzecia czesc
            if (dial.includes("Je??li chodzi o to pi??ro... ")) return cTalk(dial, "Je??li chodzi o to pi??ro... ");
            if (dial.includes("Tak, wiem co robi??, nie musisz mi m??wi??. ")) return cTalk(dial, "Tak, wiem co robi??, nie musisz mi m??wi??. ");
            if (dial.includes("Tak jest! ")) {
                cTalk(dial, "Tak jest! ");
                return setTimeout(whatToDo, 1500);
            }
            // czwarta czesc
            if (dial.includes("Pani? Mam to, o co prosi??a??. ")) return cTalk(dial, "Pani? Mam to, o co prosi??a??. ");
            if (dial.includes("Zaczynam mie?? nieodparte wra??enie, ??e ta religia nie jest jaka?? szczeg??lnie dobra... ")) return cTalk(dial, "Zaczynam mie?? nieodparte wra??enie, ??e ta religia nie jest jaka?? szczeg??lnie dobra... ");
            if (dial.includes("Rozumiem. Ju?? milcz??. ")) return cTalk(dial, "Rozumiem. Ju?? milcz??. ");
            if (dial.includes("Odejd?? teraz i wr???? do mnie za jaki?? czas! ")) {
                cTalk(dial, "Odejd?? teraz i wr???? do mnie za jaki?? czas! ");
                return setTimeout(whatToDo, 1500);
            }
            //czesc piata
            if (dial.includes("Jestem ju??. Masz ju?? proroctwa? ")) return cTalk(dial, "Jestem ju??. Masz ju?? proroctwa? ");
            if (dial.includes("Dobrze wi??c. P??jd?? szuka?? nowych wyznawc??w. ")) return cTalk(dial, "Dobrze wi??c. P??jd?? szuka?? nowych wyznawc??w. ");
            if (dial.includes("Tak, pani. ")) {
                cTalk(dial, "Tak, pani. ");
                return setTimeout(whatToDo, 1500);
            }
            //koniec quest
            if (dial.includes("Tak, dzi??ki s??owom boskiej Akh-Mater wielu pogan nawr??ci??o si?? na wiar?? Czarnej Pani. ")) return cTalk(dial, "Tak, dzi??ki s??owom boskiej Akh-Mater wielu pogan nawr??ci??o si?? na wiar?? Czarnej Pani. ");
            if (dial.includes("Wnosz?? wi??c r??ce do Akh-Mater! Czy jeste?? pani zadowolona z rezultatu?! ")) return cTalk(dial, "Wnosz?? wi??c r??ce do Akh-Mater! Czy jeste?? pani zadowolona z rezultatu?! ");
            if (dial.includes("Tak si?? ciesz??, ??e mog??em mie?? w tym sw??j udzia??! ")) return cTalk(dial, "Tak si?? ciesz??, ??e mog??em mie?? w tym sw??j udzia??! ");
            if (dial.includes("Tak, wiem o co chodzi. Dzi??kuj?? i do jutra. ")) {
                cTalk(dial, "Tak, wiem o co chodzi. Dzi??kuj?? i do jutra. ");
                localStorage.setItem("npcety", JSON.stringify(npcty));
                localStorage.setItem(`pioro`, false);
            }
        }
        //zakon
        else if (dial[1] === "Zakon Planu Astralnego") {
            if (dial.includes("Chcia??em si?? teleportowa??. ")) return cTalk(dial, "Chcia??em si?? teleportowa??. ");
            switch (postepQuesta()) {
                case "Zdob??d?? g??sie pi??ro i wr???? do kap??anki.":
                    return cTalk(dial, "Nithal (5000 sztuk z??ota). ");
                case "Id?? do Jalena dowiedzie?? si?? wi??cej w sprawie jagni??tka.":
                    return cTalk(dial, "Werbin (500 sztuk z??ota). ");
                case "We?? jagni??tko do rze??nika i popro?? o wygarbowanie jego sk??ry.":
                    return cTalk(dial, "Karka-han (500 sztuk z??ota). ");
            }
        }
        //g????
        else if (dial[1] === "G????") {
            if (dial.includes("[ Podchodz?? i chc?? wyrwa?? pi??rko. ] ")) return cTalk(dial, "[ Podchodz?? i chc?? wyrwa?? pi??rko. ] ");
            if (dial.includes("[ Ptak zrywa si?? jak oszala??y! Gdacze. Nie! Nawet g??ga! Zrywa si?? do lotu i macha zajadle skrzyd??ami. Jednak o dziwo, nie gubi ??adnego pi??ra! Teraz musisz poczeka?? a?? znowu grzecznie usi??dzie na swym g??sim ogromnym kuperku. ] ")) {
                cTalk(dial, "[ Ptak zrywa si?? jak oszala??y! Gdacze. Nie! Nawet g??ga! Zrywa si?? do lotu i macha zajadle skrzyd??ami. Jednak o dziwo, nie gubi ??adnego pi??ra! Teraz musisz poczeka?? a?? znowu grzecznie usi??dzie na swym g??sim ogromnym kuperku. ] ");
                return setTimeout(whatToDo, 1500, 1); // nie zamknal ci sie dialog
            }
            if (dial.includes("[ ??apiesz g??siora za jego monstrualny wr??cz kuper, a g??si potrafi?? mie?? naprawd?? ogromne kupry, i wyrywasz z nich pi??rko. Zdziwiony g??sior zaczyna szale?? po ca??ej drewutni. ] ")) {
                cTalk(dial, "[ ??apiesz g??siora za jego monstrualny wr??cz kuper, a g??si potrafi?? mie?? naprawd?? ogromne kupry, i wyrywasz z nich pi??rko. Zdziwiony g??sior zaczyna szale?? po ca??ej drewutni. ] ");
                localStorage.setItem(`pioro`, 1);
                return setTimeout(whatToDo, 1500);
            }
        }
        //portal nithal
        else if (dial[1] === "Portal") {
            if (dial.includes("Teleportuj. ")) return cTalk(dial, "Teleportuj. ");
            if (dial.includes("Karka-han (500 sztuk z??ota). ")) return cTalk(dial, "Karka-han (500 sztuk z??ota). ");
        }
        //Jalen
        else if (dial[1] === "Jalen") {
            if (dial.includes("Przepraszam ci??, panie, ale przysy??a mnie kap??anka Fedr... ")) return cTalk(dial, "Przepraszam ci??, panie, ale przysy??a mnie kap??anka Fedr... ");
            if (dial.includes('[ Z g??rnego pi??tra daje si?? s??ysze?? kobiecy, nieco zrz??dliwy g??os: <i>"Kto?? przyszed??, kochanie? S??ysza??am d??wi??k otwieranych drzwi."</i> ] ')) return cTalk(dial, '[ Z g??rnego pi??tra daje si?? s??ysze?? kobiecy, nieco zrz??dliwy g??os: <i>"Kto?? przyszed??, kochanie? S??ysza??am d??wi??k otwieranych drzwi."</i> ] ');
            if (dial.includes('[ Schodzisz do piwnicy. ] ')) return cTalk(dial, '[ Schodzisz do piwnicy. ] ');
            if (dial.includes('Jalenie, ta piwnica... Czy ty? ')) return cTalk(dial, 'Jalenie, ta piwnica... Czy ty? ');
            if (dial.includes('Tak, przychodz?? od tej dziwnej kap??anki. Mam nie???? s??owo Akh-Mater. ')) return cTalk(dial, 'Tak, przychodz?? od tej dziwnej kap??anki. Mam nie???? s??owo Akh-Mater. ');
            if (dial.includes('Mam znale???? czarne jagni??tko i poprosi?? go, by zdj????o z siebie sk??r??, bo na niej Fedrille musi napisa?? swoje proroctwa. ')) return cTalk(dial, 'Mam znale???? czarne jagni??tko i poprosi?? go, by zdj????o z siebie sk??r??, bo na niej Fedrille musi napisa?? swoje proroctwa. ');
            if (dial.includes('Skoro tak trzeba, trudno. Jak to zrobi??? ')) return cTalk(dial, 'Skoro tak trzeba, trudno. Jak to zrobi??? ');
            if (dial.includes('Co potem? ')) return cTalk(dial, 'Co potem? ');
            if (dial.includes('Rozumiem, id?? wi??c. ')) return cTalk(dial, 'Rozumiem, id?? wi??c. ');
            if (dial.includes('Masz ju?? wiadro! ')) return cTalk(dial, 'Masz ju?? wiadro! ');
        }
        // black owca
        else if (dial[1] === "Czarna owca") {
            if (dial.includes("[ Pr??bujesz dosta?? si?? tu?? za owczym zadem w kierunku becz??cych male??stw. ] ")) return cTalk(dial, "[ Pr??bujesz dosta?? si?? tu?? za owczym zadem w kierunku becz??cych male??stw. ] ");
            if (dial.includes("[ Dajesz wisienki czarnej owcy. ] ")) return cTalk(dial, "[ Dajesz wisienki czarnej owcy. ] ");
            if (dial.includes("[ Owca zjada cukierki, ty za?? mijasz j?? i przedostajesz si?? w kierunku krzak??w. ] ")) {
                cTalk(dial, "[ Owca zjada cukierki, ty za?? mijasz j?? i przedostajesz si?? w kierunku krzak??w. ] ");
                return setTimeout(whatToDo, 1500);
            }
        }
        //krzaki
        else if (dial[1] === "G??ste krzaki") {
            if (dial.includes("[ Wk??adasz zielon?? pietruszk?? do wiaderka i n??cisz ma??e jagni??tka. ] ")) return cTalk(dial, "[ Wk??adasz zielon?? pietruszk?? do wiaderka i n??cisz ma??e jagni??tka. ] ");
            if (dial.includes("[ Chwytasz jagni??tko do wiaderka i odchodzisz. ] ")) return cTalk(dial, "[ Chwytasz jagni??tko do wiaderka i odchodzisz. ] ");
            if (dial.includes("[ Przedzierasz si?? znowu za plecami czarnej owcy. ] ")) {
                cTalk(dial, "[ Przedzierasz si?? znowu za plecami czarnej owcy. ] ");
                return setTimeout(whatToDo, 1500);
            }
            if (dial.includes("Ech, nie da si?? ukry??. ")) return cTalk(dial, "Ech, nie da si?? ukry??. ");
            if (dial.includes("No dobrze, to wr??c?? za chwil??. ")) {
                cTalk(dial, "No dobrze, to wr??c?? za chwil??. ");
                return setTimeout(whatToDo, 1500);
            }
        }
        //sully
        else if (dial[1] === "Rze??nik Sully") {
            if (dial.includes("Panie rze??niku? Mam spraw??. ")) return cTalk(dial, "Panie rze??niku? Mam spraw??. ");
            if (dial.includes("No w??a??nie potrzebuj?? jagni??cej sk??ry i przynios??em jagni??tko. ")) return cTalk(dial, "No w??a??nie potrzebuj?? jagni??cej sk??ry i przynios??em jagni??tko. ");
            if (dial.includes("Tak. ")) return cTalk(dial, "Tak. ");
            if (dial.includes("Rozumiem, lec?? wi??c. ")) {
                cTalk(dial, "Rozumiem, lec?? wi??c. ");
                return setTimeout(whatToDo, 1500);
            }
            if (dial.includes("Ech, nie da si?? ukry??. ")) return cTalk(dial, "Ech, nie da si?? ukry??. ");
            if (dial.includes("No dobrze, to wr??c?? za chwil??. ")) return cTalk(dial, "No dobrze, to wr??c?? za chwil??. ");
            if (dial.includes("Dzi??ki ci, rze??niku. ")) {
                cTalk(dial, "Dzi??ki ci, rze??niku. ");
                return setTimeout(whatToDo, 1500);
            }
        }
        //d??ared
        else if (dial[1] === "Gared") {
            if (dial.includes("Witaj! Przybywam do ciebie od rze??nika Sullego... ")) return cTalk(dial, "Witaj! Przybywam do ciebie od rze??nika Sullego... ");
            if (dial.includes("Pani? ")) return cTalk(dial, "Pani? ");
            if (dial.includes("No to chod??my poszuka?? tego no??yka. ")) return cTalk(dial, "No to chod??my poszuka?? tego no??yka. ");
            if (dial.includes("Cokolwiek zechcesz. Ruszajmy. ")) return cTalk(dial, "Cokolwiek zechcesz. Ruszajmy. ");
            if (dial.includes("Tak, tak, wiem przecie?? co robi??. ")) return cTalk(dial, "Tak, tak, wiem przecie?? co robi??. ");
            if (dial.includes("Powodzenia, cz??owieku. ")) {
                cTalk(dial, "Powodzenia, cz??owieku. ");
                return setTimeout(whatToDo, 1500, 1);
            }
            if (dial.includes("Tak jest. ")) return cTalk(dial, "Tak jest. ");
        } else if (dial[1] && Object.keys(lsNpcety).includes(dial[1])) { // malii ci brakuje
            if (dial[1] && dial[1] === "Johan" && dial[10] === "Ekhm... ") return cTalk(dial, null, 8);
            if (dial[1] && dial[1] === "Malia" && dial[13] === "Chcia??bym z tob??") return cTalk(dial, null, 14);
            if (dial[7] && dial[7].includes("czy ??ycie duchowe jest dla ciebie warto??ci??? ")) return cTalk(dial, null, 8);
            if (dial[7] && dial[7].includes("[ Nawracaj! ]")) return cTalk(dial, null, 8);
            if (dial[4] && dial[4].includes("[ Czytasz jeszcze par?? z??owrogich przepowiedni bogini Akh-Mater.")) return cTalk(dial, null, 5);
            //sukces
            if (dial[4] && dial[4].includes("[ Sukces! ]")) {
                lsNpcety[dial[1]].nawrut = true;
                lsNpcety[dial[1]].time = window.g.ev;
                localStorage.setItem("npcety", JSON.stringify(lsNpcety));
                cTalk(dial, null, 5);
                return setTimeout(whatToDo, 1500);
            }
            //niesukces
            if (dial[4] && dial[4].includes("[ Niepowodzenie! ]")) {
                lsNpcety[dial[1]].nawrut = false;
                lsNpcety[dial[1]].time = window.g.ev;
                localStorage.setItem("npcety", JSON.stringify(lsNpcety));
                cTalk(dial, null, 5);
                return setTimeout(whatToDo, 1500);
            }
        }
    }
    //  alogrytm AStar
    class AStar {
        constructor(collisionsString, width, height, start, end, additionalCollisions) {
            this.width = width;
            this.height = height;
            this.collisions = this.parseCollisions(collisionsString, width, height);
            this.additionalCollisions = additionalCollisions || {};
            this.start = this.collisions[start.x][start.y];
            this.end = this.collisions[end.x][end.y];
            this.start.beginning = true;
            this.start.g = 0;
            this.start.f = heuristic(this.start, this.end);
            this.end.target = true;
            this.end.g = 0;
            this.addNeighbours();
            this.openSet = [];
            this.closedSet = [];
            this.openSet.push(this.start);
        }

        parseCollisions(collisionsString, width, height) {
            const collisions = new Array(width);
            for (let w = 0; w < width; w++) {
                collisions[w] = new Array(height);
                for (let h = 0; h < height; h++) {
                    collisions[w][h] = new Point(w, h, collisionsString.charAt(w + h * width) === '1');
                }
            }
            return collisions;
        }

        addNeighbours() {
            for (let i = 0; i < this.width; i++) {
                for (let j = 0; j < this.height; j++) {
                    this.addPointNeighbours(this.collisions[i][j])
                }
            }
        }

        addPointNeighbours(point) {
            const x = point.x,
                y = point.y;
            const neighbours = [];
            if (x > 0) neighbours.push(this.collisions[x - 1][y]);
            if (y > 0) neighbours.push(this.collisions[x][y - 1]);
            if (x < this.width - 1) neighbours.push(this.collisions[x + 1][y]);
            if (y < this.height - 1) neighbours.push(this.collisions[x][y + 1]);
            point.neighbours = neighbours;
        }

        anotherFindPath() {
            while (this.openSet.length > 0) {
                let currentIndex = this.getLowestF();
                let current = this.openSet[currentIndex];
                if (current === this.end) return this.reconstructPath();
                else {
                    this.openSet.splice(currentIndex, 1);
                    this.closedSet.push(current);
                    for (const neighbour of current.neighbours) {
                        if (this.closedSet.includes(neighbour)) continue;
                        else {
                            const tentative_score = current.g + 1;
                            let isBetter = false;
                            if (this.end == this.collisions[neighbour.x][neighbour.y] || (!this.openSet.includes(neighbour) && !neighbour.collision && !this.additionalCollisions[neighbour.x + 256 * neighbour.y])) {
                                this.openSet.push(neighbour);
                                neighbour.h = heuristic(neighbour, this.end);
                                isBetter = true;
                            } else if (tentative_score < neighbour.g && !neighbour.collision) {
                                isBetter = true;
                            }
                            if (isBetter) {
                                neighbour.previous = current;
                                neighbour.g = tentative_score;
                                neighbour.f = neighbour.g + neighbour.h;
                            }
                        }
                    }
                }
            }
        }

        getLowestF() {
            let lowestFIndex = 0;
            for (let i = 0; i < this.openSet.length; i++) {
                if (this.openSet[i].f < this.openSet[lowestFIndex].f) lowestFIndex = i;
            }
            return lowestFIndex;
        }

        reconstructPath() {
            const path = [];
            let currentNode = this.end;
            while (currentNode !== this.start) {
                path.push(currentNode);
                currentNode = currentNode.previous;
            }
            return path;
        }
    }
    class Point {
        constructor(x, y, collision) {
            this.x = x;
            this.y = y;
            this.collision = collision;
            this.g = 10000000;
            this.f = 10000000;
            this.neighbours = [];
            this.beginning = false;
            this.target = false;
            this.previous = undefined;
        }
    }
    const heuristic = (p1, p2) => {
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }
    const getWay = (x, y) => {
        return (new AStar(window.map.col, window.map.x, window.map.y, {
            x: window.hero.x,
            y: window.hero.y
        }, {
            x: x,
            y: y
        }, window.g.npccol)).anotherFindPath();
    }
    const debug = false;
    const goTo = (x, y) => {
        let _road_ = getWay(x, y);
        if (debug) console.log(_road_);
        if (!Array.isArray(_road_)) return;
        window.road = _road_;
    }
})(window.npcTalk)