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
        if (postep && postep.includes("Nawróć mieszkańców Karka-han.")) nawracanie();
        switch (postep) {
            case false:
                canTalkOrWalkAndTalk("Fedrille", "Przedmieścia Karka-han");
                break;
            case "Porozmawiaj z Fedrille.":
                setTimeout(canTalkOrWalkAndTalk, (2 * 60 * 1000), "Fedrille"); // czas do localStorage
                break;
            case "Zdobądź gęsie pióro i wróć do kapłanki.":
                if (!pioro) {
                    if (mapa === "Przedmieścia Karka-han") {
                        goToNextMap("Karka-han");
                    } else if (mapa === "Karka-han") {
                        canTalkOrWalkAndTalk("Zakon Planu Astralnego");
                    } else if (mapa === "Nithal") {
                        goToNextMap("Podgrodzie Nithal");
                    } else if (mapa === "Podgrodzie Nithal") {
                        goToNextMap("Stodoła");
                    } else if (mapa === "Stodoła") {
                        goToNextMap("Stodoła p.1");
                    } else if (mapa === "Stodoła p.1") {
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
                    if (mapa === "Stodoła p.1") {
                        goToNextMap("Stodoła");
                    } else if (mapa === "Stodoła") {
                        goToNextMap("Podgrodzie Nithal");
                    } else if (mapa === "Podgrodzie Nithal") {
                        goToNextMap("Nithal");
                    } else if (mapa === "Nithal") {
                        canTalkOrWalkAndTalk("Portal");
                    } else if (mapa === "Karka-han") {
                        goToNextMap("Przedmieścia Karka-han");
                    } else if (mapa === "Przedmieścia Karka-han") {
                        console.log(pioro);
                        canTalkOrWalkAndTalk("Fedrille");
                    }
                }
                break;
            case "Idź do Jalena dowiedzieć się więcej w sprawie jagniątka.":
                if (mapa === "Przedmieścia Karka-han") {
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
            case "Idź do czarnej owcy z Mythar.":
                if (window.g.item.length) {
                    if (checkRequiredItems()) {
                        if (mapa !== "Mythar") {
                            const kamyk = findItem("Kamień teleportujący do Mythar");
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
            case "Podejdź do jagniątka ukrytego w krzakach i zachęć je pietruszką.":
                canTalkOrWalkAndTalk("Gęste krzaki");
                break;
            case "Weź jagniątko do rzeźnika i poproś o wygarbowanie jego skóry.":
                if (mapa === "Mythar") {
                    const kamyk = findItem("Kamień teleportujący do Ithan");
                    window._g(`moveitem&id=${kamyk}&st=1`);
                } else if (mapa === "Ithan") {
                    canTalkOrWalkAndTalk("Zakon Planu Astralnego");
                } else if (mapa === "Karka-han") {
                    goToNextMap("Dom rzeźnika");
                } else if (mapa === "Dom rzeźnika") {
                    canTalkOrWalkAndTalk("Rzeźnik Sully");
                }
                break;
            case "Znajdź Gared na przedmieściach.":
                if (mapa === "Dom rzeźnika") {
                    goToNextMap("Karka-han");
                } else if (mapa === "Karka-han") {
                    goToNextMap("Przedmieścia Karka-han");
                } else if (mapa === "Przedmieścia Karka-han") {
                    canTalkOrWalkAndTalk("Gared");
                }
                break;
            case "Porozmawiaj z Gared i znajdź Shailin. Po znalezieniu wracaj do Gared.":
                if (kontroler === 0) {
                    canTalkOrWalkAndTalk("Gared");
                } else if (kontroler === 1) {
                    canTalkOrWalkAndTalk("Shailin");
                    setTimeout(() => {
                    if (findItem("Żebro Shailin")) canTalkOrWalkAndTalk("Gared");
                    }, 60000);
                }
                break;
            case "Zanieś żebro Shailin Sullemu.":
                if (mapa === "Przedmieścia Karka-han") {
                    goToNextMap("Karka-han");
                } else if (mapa === "Karka-han") {
                    goToNextMap("Dom rzeźnika");
                } else if (mapa === "Dom rzeźnika") {
                    canTalkOrWalkAndTalk("Rzeźnik Sully");
                }
                break;
            case "Odbierz skórę od rzeźnika i zanieś Fedrille.":
                canTalkOrWalkAndTalk("Rzeźnik Sully");
                break;
            case "Wróć do Fedrille.":
                if (mapa === "Dom rzeźnika") {
                    goToNextMap("Karka-han");
                } else if (mapa === "Karka-han") {
                    goToNextMap("Przedmieścia Karka-han");
                } else if (mapa === "Przedmieścia Karka-han") {
                    canTalkOrWalkAndTalk("Fedrille");
                }
                break;
            case "Jeśli już czas, wróć do Fedrille po proroctwa.":
                setTimeout(talk, (60 * 2 * 1000), getNpcId("Fedrille"));
                break;
            case "Nawróciłeś wystarczającą ilość osób, wróć do Fedrille.":
                if (mapa === "Karka-han") {
                    goToNextMap("Przedmieścia Karka-han");
                } else if (mapa !== "Karka-han") {
                    goToNextMap("Karka-han")
                } else if (mapa === "Przedmieścia Karka-han") {
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
            if (dial.includes("Wyglądasz na zasępioną. Czy to co mówisz, to jakieś modły? ")) return cTalk(dial, "Wyglądasz na zasępioną. Czy to co mówisz, to jakieś modły? ");
            if (dial.includes("A jednak słyszę pewne znane mi słowa. ")) return cTalk(dial, "A jednak słyszę pewne znane mi słowa. ");
            if (dial.includes("Co mianowicie miałbym zrobić? ")) return cTalk(dial, "Co mianowicie miałbym zrobić? ");
            if (dial.includes("Dobrze, pomogę ci, o ile będzie słuszna nagroda. ")) return cTalk(dial, "Dobrze, pomogę ci, o ile będzie słuszna nagroda. ");
            if (dial.includes("Jeśli chodzi o to piórko, to musisz je zdobyć. Już ci mówiłam, że znajdziesz je gdzieś na przedmieściach dużych miast. Pamiętaj też, że gęś musi być chowana pod dachem - to bardzo ważne! ")) return cTalk(dial, "Jeśli chodzi o to piórko, to musisz je zdobyć. Już ci mówiłam, że znajdziesz je gdzieś na przedmieściach dużych miast. Pamiętaj też, że gęś musi być chowana pod dachem - to bardzo ważne! ");
            if (dial.includes("Nie myśl o nagrodzie, chłopcze. Nagrodą jest łaska bogini. Muszę teraz skupić się na modlitwach do Akh-Mater, by ona oczyściła mą przeklętą duszę i powiedziała mi, co ty masz dla niej zrobić. ")) return cTalk(dial, "Nie myśl o nagrodzie, chłopcze. Nagrodą jest łaska bogini. Muszę teraz skupić się na modlitwach do Akh-Mater, by ona oczyściła mą przeklętą duszę i powiedziała mi, co ty masz dla niej zrobić. ");
            if (dial.includes("Daj mi kilka chwil. ")) {
                cTalk(dial, "Daj mi kilka chwil. ");
                return setTimeout(whatToDo, 1500);
            }
            // druga czensc
            if (dial.includes("Pani? Czy już czas? ")) return cTalk(dial, "Pani? Czy już czas? ");
            if (dial.includes("Rozumiem. Skąd mam wiedzieć jaka jest ta nowina? ")) return cTalk(dial, "Rozumiem. Skąd mam wiedzieć jaka jest ta nowina? ");
            if (dial.includes("Skąd mogę wziąć gęsie pióro? ")) return cTalk(dial, "Skąd mogę wziąć gęsie pióro? ");
            if (dial.includes("Tak zrobię! ")) return cTalk(dial, "Tak zrobię! ");
            if (dial.includes("Bywaj! ")) {
                cTalk(dial, "Bywaj! ");
                return setTimeout(whatToDo, 1500);
            }
            //trzecia czesc
            if (dial.includes("Jeśli chodzi o to pióro... ")) return cTalk(dial, "Jeśli chodzi o to pióro... ");
            if (dial.includes("Tak, wiem co robić, nie musisz mi mówić. ")) return cTalk(dial, "Tak, wiem co robić, nie musisz mi mówić. ");
            if (dial.includes("Tak jest! ")) {
                cTalk(dial, "Tak jest! ");
                return setTimeout(whatToDo, 1500);
            }
            // czwarta czesc
            if (dial.includes("Pani? Mam to, o co prosiłaś. ")) return cTalk(dial, "Pani? Mam to, o co prosiłaś. ");
            if (dial.includes("Zaczynam mieć nieodparte wrażenie, że ta religia nie jest jakaś szczególnie dobra... ")) return cTalk(dial, "Zaczynam mieć nieodparte wrażenie, że ta religia nie jest jakaś szczególnie dobra... ");
            if (dial.includes("Rozumiem. Już milczę. ")) return cTalk(dial, "Rozumiem. Już milczę. ");
            if (dial.includes("Odejdź teraz i wróć do mnie za jakiś czas! ")) {
                cTalk(dial, "Odejdź teraz i wróć do mnie za jakiś czas! ");
                return setTimeout(whatToDo, 1500);
            }
            //czesc piata
            if (dial.includes("Jestem już. Masz już proroctwa? ")) return cTalk(dial, "Jestem już. Masz już proroctwa? ");
            if (dial.includes("Dobrze więc. Pójdę szukać nowych wyznawców. ")) return cTalk(dial, "Dobrze więc. Pójdę szukać nowych wyznawców. ");
            if (dial.includes("Tak, pani. ")) {
                cTalk(dial, "Tak, pani. ");
                return setTimeout(whatToDo, 1500);
            }
            //koniec quest
            if (dial.includes("Tak, dzięki słowom boskiej Akh-Mater wielu pogan nawróciło się na wiarę Czarnej Pani. ")) return cTalk(dial, "Tak, dzięki słowom boskiej Akh-Mater wielu pogan nawróciło się na wiarę Czarnej Pani. ");
            if (dial.includes("Wnoszę więc ręce do Akh-Mater! Czy jesteś pani zadowolona z rezultatu?! ")) return cTalk(dial, "Wnoszę więc ręce do Akh-Mater! Czy jesteś pani zadowolona z rezultatu?! ");
            if (dial.includes("Tak się cieszę, że mogłem mieć w tym swój udział! ")) return cTalk(dial, "Tak się cieszę, że mogłem mieć w tym swój udział! ");
            if (dial.includes("Tak, wiem o co chodzi. Dziękuję i do jutra. ")) {
                cTalk(dial, "Tak, wiem o co chodzi. Dziękuję i do jutra. ");
                localStorage.setItem("npcety", JSON.stringify(npcty));
                localStorage.setItem(`pioro`, false);
            }
        }
        //zakon
        else if (dial[1] === "Zakon Planu Astralnego") {
            if (dial.includes("Chciałem się teleportować. ")) return cTalk(dial, "Chciałem się teleportować. ");
            switch (postepQuesta()) {
                case "Zdobądź gęsie pióro i wróć do kapłanki.":
                    return cTalk(dial, "Nithal (5000 sztuk złota). ");
                case "Idź do Jalena dowiedzieć się więcej w sprawie jagniątka.":
                    return cTalk(dial, "Werbin (500 sztuk złota). ");
                case "Weź jagniątko do rzeźnika i poproś o wygarbowanie jego skóry.":
                    return cTalk(dial, "Karka-han (500 sztuk złota). ");
            }
        }
        //gęś
        else if (dial[1] === "Gęś") {
            if (dial.includes("[ Podchodzę i chcę wyrwać piórko. ] ")) return cTalk(dial, "[ Podchodzę i chcę wyrwać piórko. ] ");
            if (dial.includes("[ Ptak zrywa się jak oszalały! Gdacze. Nie! Nawet gęga! Zrywa się do lotu i macha zajadle skrzydłami. Jednak o dziwo, nie gubi żadnego pióra! Teraz musisz poczekać aż znowu grzecznie usiądzie na swym gęsim ogromnym kuperku. ] ")) {
                cTalk(dial, "[ Ptak zrywa się jak oszalały! Gdacze. Nie! Nawet gęga! Zrywa się do lotu i macha zajadle skrzydłami. Jednak o dziwo, nie gubi żadnego pióra! Teraz musisz poczekać aż znowu grzecznie usiądzie na swym gęsim ogromnym kuperku. ] ");
                return setTimeout(whatToDo, 1500, 1); // nie zamknal ci sie dialog
            }
            if (dial.includes("[ Łapiesz gąsiora za jego monstrualny wręcz kuper, a gęsi potrafią mieć naprawdę ogromne kupry, i wyrywasz z nich piórko. Zdziwiony gąsior zaczyna szaleć po całej drewutni. ] ")) {
                cTalk(dial, "[ Łapiesz gąsiora za jego monstrualny wręcz kuper, a gęsi potrafią mieć naprawdę ogromne kupry, i wyrywasz z nich piórko. Zdziwiony gąsior zaczyna szaleć po całej drewutni. ] ");
                localStorage.setItem(`pioro`, 1);
                return setTimeout(whatToDo, 1500);
            }
        }
        //portal nithal
        else if (dial[1] === "Portal") {
            if (dial.includes("Teleportuj. ")) return cTalk(dial, "Teleportuj. ");
            if (dial.includes("Karka-han (500 sztuk złota). ")) return cTalk(dial, "Karka-han (500 sztuk złota). ");
        }
        //Jalen
        else if (dial[1] === "Jalen") {
            if (dial.includes("Przepraszam cię, panie, ale przysyła mnie kapłanka Fedr... ")) return cTalk(dial, "Przepraszam cię, panie, ale przysyła mnie kapłanka Fedr... ");
            if (dial.includes('[ Z górnego piętra daje się słyszeć kobiecy, nieco zrzędliwy głos: <i>"Ktoś przyszedł, kochanie? Słyszałam dźwięk otwieranych drzwi."</i> ] ')) return cTalk(dial, '[ Z górnego piętra daje się słyszeć kobiecy, nieco zrzędliwy głos: <i>"Ktoś przyszedł, kochanie? Słyszałam dźwięk otwieranych drzwi."</i> ] ');
            if (dial.includes('[ Schodzisz do piwnicy. ] ')) return cTalk(dial, '[ Schodzisz do piwnicy. ] ');
            if (dial.includes('Jalenie, ta piwnica... Czy ty? ')) return cTalk(dial, 'Jalenie, ta piwnica... Czy ty? ');
            if (dial.includes('Tak, przychodzę od tej dziwnej kapłanki. Mam nieść słowo Akh-Mater. ')) return cTalk(dial, 'Tak, przychodzę od tej dziwnej kapłanki. Mam nieść słowo Akh-Mater. ');
            if (dial.includes('Mam znaleźć czarne jagniątko i poprosić go, by zdjęło z siebie skórę, bo na niej Fedrille musi napisać swoje proroctwa. ')) return cTalk(dial, 'Mam znaleźć czarne jagniątko i poprosić go, by zdjęło z siebie skórę, bo na niej Fedrille musi napisać swoje proroctwa. ');
            if (dial.includes('Skoro tak trzeba, trudno. Jak to zrobić? ')) return cTalk(dial, 'Skoro tak trzeba, trudno. Jak to zrobić? ');
            if (dial.includes('Co potem? ')) return cTalk(dial, 'Co potem? ');
            if (dial.includes('Rozumiem, idę więc. ')) return cTalk(dial, 'Rozumiem, idę więc. ');
            if (dial.includes('Masz już wiadro! ')) return cTalk(dial, 'Masz już wiadro! ');
        }
        // black owca
        else if (dial[1] === "Czarna owca") {
            if (dial.includes("[ Próbujesz dostać się tuż za owczym zadem w kierunku beczących maleństw. ] ")) return cTalk(dial, "[ Próbujesz dostać się tuż za owczym zadem w kierunku beczących maleństw. ] ");
            if (dial.includes("[ Dajesz wisienki czarnej owcy. ] ")) return cTalk(dial, "[ Dajesz wisienki czarnej owcy. ] ");
            if (dial.includes("[ Owca zjada cukierki, ty zaś mijasz ją i przedostajesz się w kierunku krzaków. ] ")) {
                cTalk(dial, "[ Owca zjada cukierki, ty zaś mijasz ją i przedostajesz się w kierunku krzaków. ] ");
                return setTimeout(whatToDo, 1500);
            }
        }
        //krzaki
        else if (dial[1] === "Gęste krzaki") {
            if (dial.includes("[ Wkładasz zieloną pietruszkę do wiaderka i nęcisz małe jagniątka. ] ")) return cTalk(dial, "[ Wkładasz zieloną pietruszkę do wiaderka i nęcisz małe jagniątka. ] ");
            if (dial.includes("[ Chwytasz jagniątko do wiaderka i odchodzisz. ] ")) return cTalk(dial, "[ Chwytasz jagniątko do wiaderka i odchodzisz. ] ");
            if (dial.includes("[ Przedzierasz się znowu za plecami czarnej owcy. ] ")) {
                cTalk(dial, "[ Przedzierasz się znowu za plecami czarnej owcy. ] ");
                return setTimeout(whatToDo, 1500);
            }
            if (dial.includes("Ech, nie da się ukryć. ")) return cTalk(dial, "Ech, nie da się ukryć. ");
            if (dial.includes("No dobrze, to wrócę za chwilę. ")) {
                cTalk(dial, "No dobrze, to wrócę za chwilę. ");
                return setTimeout(whatToDo, 1500);
            }
        }
        //sully
        else if (dial[1] === "Rzeźnik Sully") {
            if (dial.includes("Panie rzeźniku? Mam sprawę. ")) return cTalk(dial, "Panie rzeźniku? Mam sprawę. ");
            if (dial.includes("No właśnie potrzebuję jagnięcej skóry i przyniosłem jagniątko. ")) return cTalk(dial, "No właśnie potrzebuję jagnięcej skóry i przyniosłem jagniątko. ");
            if (dial.includes("Tak. ")) return cTalk(dial, "Tak. ");
            if (dial.includes("Rozumiem, lecę więc. ")) {
                cTalk(dial, "Rozumiem, lecę więc. ");
                return setTimeout(whatToDo, 1500);
            }
            if (dial.includes("Ech, nie da się ukryć. ")) return cTalk(dial, "Ech, nie da się ukryć. ");
            if (dial.includes("No dobrze, to wrócę za chwilę. ")) return cTalk(dial, "No dobrze, to wrócę za chwilę. ");
            if (dial.includes("Dzięki ci, rzeźniku. ")) {
                cTalk(dial, "Dzięki ci, rzeźniku. ");
                return setTimeout(whatToDo, 1500);
            }
        }
        //dżared
        else if (dial[1] === "Gared") {
            if (dial.includes("Witaj! Przybywam do ciebie od rzeźnika Sullego... ")) return cTalk(dial, "Witaj! Przybywam do ciebie od rzeźnika Sullego... ");
            if (dial.includes("Pani? ")) return cTalk(dial, "Pani? ");
            if (dial.includes("No to chodźmy poszukać tego nożyka. ")) return cTalk(dial, "No to chodźmy poszukać tego nożyka. ");
            if (dial.includes("Cokolwiek zechcesz. Ruszajmy. ")) return cTalk(dial, "Cokolwiek zechcesz. Ruszajmy. ");
            if (dial.includes("Tak, tak, wiem przecież co robić. ")) return cTalk(dial, "Tak, tak, wiem przecież co robić. ");
            if (dial.includes("Powodzenia, człowieku. ")) {
                cTalk(dial, "Powodzenia, człowieku. ");
                return setTimeout(whatToDo, 1500, 1);
            }
            if (dial.includes("Tak jest. ")) return cTalk(dial, "Tak jest. ");
        } else if (dial[1] && Object.keys(lsNpcety).includes(dial[1])) { // malii ci brakuje
            if (dial[1] && dial[1] === "Johan" && dial[10] === "Ekhm... ") return cTalk(dial, null, 8);
            if (dial[1] && dial[1] === "Malia" && dial[13] === "Chciałbym z tobą") return cTalk(dial, null, 14);
            if (dial[7] && dial[7].includes("czy życie duchowe jest dla ciebie wartością? ")) return cTalk(dial, null, 8);
            if (dial[7] && dial[7].includes("[ Nawracaj! ]")) return cTalk(dial, null, 8);
            if (dial[4] && dial[4].includes("[ Czytasz jeszcze parę złowrogich przepowiedni bogini Akh-Mater.")) return cTalk(dial, null, 5);
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