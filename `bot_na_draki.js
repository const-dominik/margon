// ==UserScript==
// @name         `draki
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://nubes.margonem.pl/
// @grant        none
// ==/UserScript==

((parseInput, _g, npctalk) => {
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
    };
    const getWay = (x, y) => {
        return (new AStar(window.map.col, window.map.x, window.map.y, {
            x: window.hero.x,
            y: window.hero.y
        }, {
            x: x,
            y: y
        }, window.g.npccol)).anotherFindPath();
    };
    const debug = false;
    const goTo = (x, y) => {
        let _road_ = getWay(x, y);
        if (debug) console.log(_road_);
        if (!Array.isArray(_road_)) return;
        window.road = _road_;
    };

    // ZABIJANIE KATAKUMBUW
    let blokada = false;
    let blokada2 = false;
    let m_id;
    let herolx;
    let heroly;
    let increment = 0;
    let bolcka = false;
    let start = false;
    window.bB = Function.prototype;
    const MAPKI = ["Przysiółek Valmirów", "Szczerba Samobójców", "Przysiółek Valmirów", "Śnieżycowy Las"];
    window.g.loadQueue.push({
        fun() {
            start = true;
            controller();
        }
    });
    let globalArray = new Array;
    const addToGlobal = id => {
        let npc = window.g.npc[id];
        if (npc.grp) {
            for (let i in window.g.npc) {
                if (window.g.npc[i].grp == npc.grp && !globalArray.includes(window.g.npc[i].id)) {
                    globalArray.push(window.g.npc[i].id);
                }
            }
        } else if (!globalArray.includes(id)) {
            globalArray.push(id);
        }
    };

    const checke2 = id => {
        if (window.g.npc[id].grp) {
            const GRP = window.g.npc[id].grp;
            for (let i in window.g.npc) {
                if (window.g.npc[i].grp === GRP && window.g.npc[i].wt > 19) {
                    return false;
                }
            }
        }
        return true;
    }

    const checkHeroHp = () => (window.hero.hp / window.hero.maxhp) * 100 > 70;

    const chceckBlockade = () => {
        for (let i in window.g.npc) {
            let n = window.g.npc[i];
            if ((n.type == 2 || n.type == 3) && n.wt < 19 && window.hero.lvl + 30 >= n.lvl && Math.abs(window.hero.x - n.x) < 2 && Math.abs(window.hero.y - n.y) < 2 && g.worldname === "berufs" ? checkHeroHp() : "") {
                return window._g(`fight&a=attack&ff=1&id=-${n.id}`);
            }
        }
    };
    setInterval(() => {
        if (m_id) {
            m_id = undefined;
        }
    }, 2000);
    let $map_cords = undefined;

    const findBestMob = () => {
        let droga1;
        let droga2 = 9999;
        let mobId = false;
        if (window.g.npc) {
            for (const npc in window.g.npc) {
                if ([2, 3].includes(window.g.npc[npc].type) && checke2(npc) && window.g.npc[npc].lvl > 150 && window.g.npc[npc].lvl < 200 && (window.g.npc[npc].wt <= 19 || (window.g.npc[npc].wt > 79 && window.g.npc[npc].wt < 100)) && heuristic(window.hero, window.g.npc[npc]) < droga2) {
                    droga1 = getWay(window.g.npc[npc].x, window.g.npc[npc].y);
                    if (droga1 && droga1.length < droga2) {
                        droga2 = droga1.length;
                        mobId = window.g.npc[npc].id;
                    }
                }
            }
            return mobId;
        }
    };
    if (!localStorage.getItem("alksjd")) {
        localStorage.setItem("alksjd", 0)
    }
    const findBestGw = () => {
        let obj,
            inc = parseInt(localStorage.getItem("alksjd"));
        for (let i in window.g.townname) {
            if (MAPKI[inc] == window.g.townname[i].replace(/ +(?= )/g, "")) {
                let c = window.g.gwIds[i].split(".");
                const droga = getWay(c[0], c[1]);
                if (droga) {
                    obj = {
                        x: parseInt(c[0]),
                        y: parseInt(c[1])
                    };
                }
            }
            if (obj) {
                return obj;
            }
        }
        inc++;
        if (inc > MAPKI.length) {
            inc = 0;
        }
        localStorage.setItem("alksjd", parseInt(inc));
    };

    const kolizjaobokmobka = id => {
        const {
            x,
            y
        } = window.g.npc[id];
        const obok = {
            0: {
                czykolizja: window.isCollision(x, y),
                x: x,
                y: y
            },
            1: {
                czykolizja: window.isCollision(x + 1, y),
                x: x + 1,
                y: y
            },
            2: {
                czykolizja: window.isCollision(x - 1, y),
                x: x - 1,
                y: y
            },
            3: {
                czykolizja: window.isCollision(x, y + 1),
                x: x,
                y: y + 1
            },
            4: {
                czykolizja: window.isCollision(x, y - 1),
                x: x,
                y: y - 1
            },
            5: {
                czykolizja: window.isCollision(x + 1, y + 1),
                x: x + 1,
                y: y + 1
            },
            6: {
                czykolizja: window.isCollision(x - 1, y + 1),
                x: x - 1,
                y: y + 1
            },
            7: {
                czykolizja: window.isCollision(x + 1, y - 1),
                x: x + 1,
                y: y - 1
            },
            8: {
                czykolizja: window.isCollision(x - 1, y - 1),
                x: x - 1,
                y: y - 1
            }
        };
        let droga1;
        let droga2 = 9999;
        let najbliżej = [x, y];
        for (let i in obok) {
            if (!obok[i].czykolizja) {
                droga1 = getWay(obok[i].x, obok[i].y);
                if (droga1) {
                    if (droga1.length < droga2) {
                        droga2 = droga1.length;
                        najbliżej = [obok[i].x, obok[i].y];
                    }
                }
            }
        }
        return najbliżej;
    };

    // SELLANIE + FUNKCJE MARGONEMSKIE

    //utilities
    const useItem = id => window._g(`moveitem&id=${id}&st=1`);
    const checkDistance = (x, y) => Math.abs(hero.x - x) <= 1 && Math.abs(hero.y - y) <= 1;
    const talk = id => window._g(`talk&id=${id}`);
    const cTalk = (dialog, index, callback) => setTimeout(() => window._g(`talk&id=${dialog[2]}&c=${dialog[index]}`, callback ? callback : () => {}), 500);
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
    const getItemId = itemName => {
        if (window.g.item.length) {
            for (let [id, {
                    name
                }] of Object.entries(window.g.item)) {
                if (itemName === name) return id;
            }
            return false;
        } else {
            setTimeout(getItemId, 1000, itemName);
        }
    }
    const enterLocation = (name, id2 = false) => {
        if (!id2) {
            for (let [id, mapa] of Object.entries(window.g.townname)) {
                if (mapa === name) {
                    id2 = id;
                    break;
                }
            }
        }
        const [x, y] = g.gwIds[id2].split(".").map(elem => Number(elem));
        console.log(x, y);
        if (x === window.hero.x && y === window.hero.y) {
            window._g("walk");
        } else {
            goTo(x, y);
            setTimeout(enterLocation, 2000, name, id2);
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

    //sellanko
    const toSell = id => {
        const item = window.g.item[id];
        let nieSell = ["legendarny", "heroiczny", "unikat", "ulepszony", "Klucze", "Konsumpcyjne", "Torby", "Talizmany", "Związany z właścicielem", "Złoto", "Mikstury", "Questowe"];
        // if (window.map.name === "Dom Tunii") nieSell = nieSell.concat(["Jednoręczne", "Dwuręczne", "Półtoraręczne", "Pomocnicze", "Zbroje", "Hełmy", "Buty", "Rękawice", "Naszyjniki", "Tarcze"]);
        if (!item || item.loc !== "g" || nieSell.some(ranga => item.tip.includes(ranga))) return false;
        return true;
    };

    const sellanie = () => {
        if (document.querySelector("#shop")) {
            let itemy = [];
            let tpId, tpAmount;
            for (let [id, {
                    name,
                    loc,
                    stat
                }] of Object.entries(window.g.item)) {
                if (toSell(id)) itemy.push(id);
                if (loc === "g") {
                    if (name === "Zwój teleportacji na Kwieciste Przejście") {
                        tpAmount = parseItemStat(stat).amount;
                    }
                }
            }
            setTimeout(() => {
                window._g(`shop&buy=&sell=${itemy.length ? itemy.join(",") : ""}`, res => {
                    for (let [id, {
                            name,
                            loc
                        }] of Object.entries(g.item))
                        if (name === "Zwój teleportacji na Kwieciste Przejście" && loc === "n") tpId = id;
                    const toBuy = [];
                    if (tpAmount <= 10) toBuy.push(`${tpId},1`);
                    setTimeout(() => {
                        window._g(`shop&buy=${toBuy.join(";")}&sell=`, res => {
                            window.shop_close(true);
                            localStorage.setItem("job", "wracanie");
                            controller();
                        });
                    }, 500);
                });
            }, 500);
        } else {
            canTalkOrWalkAndTalk(getNpcId("Tunia Frupotius"));
        }
    }

    //co robic kurwa co robic
    if (!localStorage.getItem("job")) localStorage.setItem("job", "wracanie");
    const controller = () => {
        if (g.dead) {
            localStorage.setItem("job", "wracanie");
            setTimeout(controller, 30000);
        }

        const KATY = ["Dom Tunii", "Kwieciste Przejście", "Lazurowe Wzgórze", "Grań Gawronich Piór", "Thuzal", "Rozlewisko Kai", "Przysiółek Valmirów"]
        if (KATY.includes(window.map.name)) {
            const job = localStorage.getItem("job");
            if (job === "tunia") {
                switch (map.name) {
                    case "Kwieciste Przejście":
                        enterLocation("Dom Tunii");
                        break;
                    case "Dom Tunii":
                        canTalkOrWalkAndTalk("Tunia Frupotius");
                        break;
                }
            } else if (job === "wracanie") {
                if (KATY.includes(window.map.name)) {
                    const mapka = KATY.indexOf(window.map.name);
                    if (KATY[mapka + 1]) enterLocation(KATY[mapka + 1]);
                }
            }
        }
        setTimeout(controller, 120000);
    }

    window.npcTalk = d => {
        npctalk(d);
        switch (d[1]) {
            case "Tunia Frupotius":
                if (d.includes("Pokaż mi, co masz na sprzedaż. ")) return cTalk(d, 8, setTimeout(sellanie, 500));
                break;
        }
    }

    let poprzednie = "";
    window._g = (url, callback) => {
        if (!["_", "walk"].includes(url) && !url.includes("moveitem")) {
            if (url === poprzednie) {
                poprzednie = "";
                return true;
            }
            poprzednie = url;
        }
        _g(url, callback);
    }

    window.parseInput = (d, callback, xhr) => {
        if (d.f && d.f.move && d.f.move === -1) {
            window._g("fight&a=quit", res => {
                if (res.e === 'ok') {
                    if (!window.findEmptyBagPlace()) {
                        localStorage.setItem("job", "tunia");
                        useItem(getItemId("Zwój teleportacji na Kwieciste Przejście"));
                    }
                }
            });
        }
        if (d.town) {
            globalArray = [44198];
        }
        if (!window.g.battle && !window.g.dead && start) {
            if (!m_id && !bolcka) {
                m_id = findBestMob();
                blokada2 = false;
                blokada = false;
            }
            if (m_id && MAPKI.includes(window.map.name)) {
                let mob = window.g.npc[m_id];
                if (!mob) {
                    m_id = undefined;
                    return parseInput(d, callback, xhr);
                }
                if (Math.abs(window.hero.x - mob.x) < 2 && Math.abs(window.hero.y - mob.y) < 2 && !blokada) {
                    blokada = true;
                    window._g(`fight&a=attack&id=-${mob.id}&ff=1`, res => {
                        if (res.alert && res.alert == "Przeciwnik walczy już z kimś innym") {
                            addToGlobal(mob.id);
                            m_id = undefined;
                        }
                    });
                    setTimeout(() => {
                        m_id = undefined;
                    }, 500);
                } else if (!blokada2 && !blokada) {
                    const [x, y] = kolizjaobokmobka(m_id);
                    goTo(x, y);
                    blokada2 = true;
                }
            } else if (MAPKI.length > 0) {
                $map_cords = findBestGw();
                if ($map_cords && !bolcka) {
                    if (window.hero.x === $map_cords.x && window.hero.y === $map_cords.y) {
                        window._g("walk");
                    } else {
                        goTo($map_cords.x, $map_cords.y);
                        bolcka = true;
                        setTimeout(() => {
                            bolcka = false;
                        }, 2000);
                    }
                }
            }
            if (heroly === window.hero.y && herolx === window.hero.x) {
                increment++;
                if (increment > 4) {
                    chceckBlockade();
                    increment = 0;
                    m_id = undefined;
                    $map_cords = undefined;
                    bolcka = false;
                }
            } else {
                heroly = window.hero.y;
                herolx = window.hero.x;
                increment = 0;
            }
        }
        parseInput(d, callback, xhr);
    }
})(window.parseInput, window._g, window.npcTalk);