// ==UserScript==
// @name         sellanie botowe
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://ataentsic.margonem.pl/
// @grant        none
// ==/UserScript==

//chmurka() z spr()
//wysyłanie zarobkuw na discord

(function () {
  let itemy = [];
  let whatToDo = localStorage.getItem("whatToDo");
  if (!localStorage.getItem("whatToDo")) {
    localStorage.setItem("whatToDo", "");
  }

  (npcTalk => {
    window.npcTalk = e => {
      if (e[1] === "Tunia Frupotius" && e[4] === "W czym mogę ci pomóc?") {
        for (let i in e) {
          if (e[i].includes("Pokaż mi")) {
            i++;
            setTimeout(() => {
              window._g(`talk&id=${e[2]}&c=${e[i]} `, res => {
                czydalej();
              });
            }, 1000);
          }
        }
      } else if (e[1].includes("Fontanna")) {
        for (let i in e) {
          if (e[i].includes("Tuzmer")) {
            i++
            setTimeout(() => {
              window._g(`talk&id=${e[2]}&c=${e[i]}`);
            }, 1000);
          }
        }
      } else if (e[1].includes("Astralny")) {
        for (let i in e) {
          if (e[i].includes("Tuzmer")) {
            i++;
            setTimeout(() => {
              window._g(`talk&id=${e[2]}&c=${e[i]}`);
            }, 1000)
          }
        }
      } else if (e[1].includes("Kendal")) {
        for (let i in e) {
          if (e[i].includes("na zapleczu")) {
            i++;
            setTimeout(() => {
              window._g(`talk&id=${e[2]}&c=${e[i]}`, res => {
              sellKendal();
              });
            }, 1000);
          }
        }
      }
      npcTalk(e);
    }
  })(window.npcTalk);

  (lootItem => {
    window.lootItem = i => {
      lootItem(i);
      setTimeout(() => {
        if (!g.battle) findGold()
      }, 100)
      if (!window.findEmptyBagPlace()) {
        localStorage.setItem("whatToDo", "sell tunia");
        window._g(`moveitem&id=${znajdzTepek("Zwój teleportacji na Kwieciste Przejście")}&st=1,`);
      }
    }
  })(window.lootItem)

  const znajdzTepek = nazwa => {
    for (let i in g.item) {
      if (g.item[i].name === nazwa) return g.item[i].id;
    }
  }

  const spr = id => {
    if (g.npc.length !== 0) {
      if (g.npc[id] && Math.abs(window.hero.x - g.npc[id].x) <= 1 && Math.abs(window.hero.y - g.npc[id].y) <= 1) {
        if (document.getElementById("shop").style.display !== "block") {
        return window._g(`talk&id=${id}`);
        }
      } else {
        goTo(g.npc[id].x, g.npc[id].y);
        setTimeout(() => spr(id), 200);
      }
    } else {
      setTimeout(() => spr(id), 200);
    }
  }

  const znajdzPrzejście = mapa => {
    for (const i in window.g.townname) {
      if (mapa == window.g.townname[i]) {
        const [x, y] = window.g.gwIds[i].split(".");
        setInterval(() => {
          goTo(x, y);
        }, 1000);
      }
    }
  }

  const findGold = () => {
    for (let i in g.item) {
      if (g.item[i].tip.includes("Złoto")) _g("moveitem&st=1&id=" + g.item[i].id);
    }
  }

  const doSprzedania = (tip, nazwa, loc) => {
    let dupa = ["legendarny", "heroiczny", "unikat", "ulepszony", "Klucze", "Konsumpcyjne", "Torby", "Talizmany", "Związany z właścicielem", "Złoto", "Mikstury", "Questowe", "Strzały"];
    if (!["h", "t".includes(hero.prof)]) dupa.push("Strzały");
    if (whatToDo == "sell tunia") {
      dupa = dupa.concat(["Jednoręczne", "Dwuręczne", "Półtoraręczne", "Pomocnicze", "Zbroje", "Hełmy", "Buty", "Rękawice", "Naszyjniki", "Tarcze"])
    }
    for (let i in dupa) {
      if (tip.includes(dupa[i]) || nazwa.includes("runa") || loc !== "g") {
        return false;
      }
    }
    return true;
  }

  const czydalej = () => {
    if (window.g.npc.length === 0) {
      setTimeout(() => {
        czydalej();
      }, 100);
    } else if (localStorage.getItem("whatToDo") === "sell tunia") {
      chmurka();
    } else if (localStorage.getItem("whatToDo") === "sell kendal") {
      spr(25404);
    }
  }

  const idz = () => {
    if ("Kwieciste Przejście" === window.map.name && whatToDo == "sell tunia") {
      znajdzPrzejście("Dom Tunii");
    } else if (map.name === "Kwieciste Przejście" && whatToDo == "sell kendal") {
      znajdzPrzejście("Lazurowe Wzgórze");
    } else if (map.name === "Lazurowe Wzgórze") {
      znajdzPrzejście("Grań Gawronich Piór");
    } else if (map.name === "Grań Gawronich Piór") {
      znajdzPrzejście("Thuzal");
    } else if (map.name === "Thuzal") {
      znajdzPrzejście("Gildia Magów")
    } else if (map.name === "Gildia Magów") {
      spr(59861);
    } else if (map.name === "Trupia Przełęcz") {
      window._g(`talk&id=32691`);
    } else if (map.name === "Tuzmer") {
      znajdzPrzejście("Port Tuzmer");
    } else if (map.name === "Port Tuzmer" && whatToDo == "sell kendal") {
      znajdzPrzejście("Kuźnia Kendala")
    } else if (map.name === "Kuźnia Kendala") {
      czydalej();
    } else if (map.name === "Port Tuzmer" && whatToDo == "idz z buta") {
      znajdzPrzejście("Wioska Rybacka");
    } else if (map.name === "Wioska Rybacka") {
      znajdzPrzejście("Ciche Rumowiska")
    } else if (map.name === "Ciche Rumowiska") {
      znajdzPrzejście("Oaza Siedmiu Wichrów")
    } else if (map.name === "Oaza Siedmiu Wichrów") {
      znajdzPrzejście("Ruiny Pustynnych Burz")
      localStorage.setItem("whatToDo", "zarabianie");
    } else if (map.name === "Dom Tunii" && whatToDo === "sell tunia") {
      czydalej()
    } else if (map.name === "Dom Tunii" && whatToDo === "sell kendal") {
      znajdzPrzejście("Kwieciste Przejście")
    } else {
      czydalej();
    }
  }

  const wracanie = () => {
    if (znajdzTepek("Chalcedon pustynnej burzy")) {
      localStorage.setItem("whatToDo", "zarabianie")
      setTimeout(() => window._g(`moveitem&id=${znajdzTepek("Chalcedon pustynnej burzy")}&st=1,`), 1000);
    } else if (znajdzTepek("Chalcedon niebios")) {
      localStorage.setItem("whatToDo", "zarabianie")
      setTimeout(() => window._g(`moveitem&id=${znajdzTepek("Chalcedon niebios")}&st=1,`), 1000);
    } else {
      localStorage.setItem("whatToDo", "idz z buta")
      znajdzPrzejście("Port Tuzmer");
    }
  }

  const sellKendal = () => {
        for (let i in window.g.item) {
          if (doSprzedania(window.g.item[i].tip, window.g.item[i].name, window.g.item[i].loc) || ["Kryza skrytobójcy", "Szlacheckie bransolety", "Apogeum zimna", "Buty wysokiego kapłana", "Buty przydziałowe"].includes(g.item[i].name)) {
            itemy.push(window.g.item[i].id);
          }
        }
        window._g(`shop&buy=&sell=${itemy.length !== 0 ? itemy.join(","): ""}`, res => {
          window.shop_close(true);
          wracanie();
        });
      }

  let kuptepek = false;
  const chmurka = () => {
    if (Math.abs(window.hero.x - g.npc[16366].x) <= 1 && Math.abs(window.hero.y - g.npc[16366].y) <= 1) {
      if (document.getElementById("shop").style.display !== "block") {
        return window._g(`talk&id=${g.npc[16366].id}`);
      } else {
        for (let i in window.g.item) {
          if (doSprzedania(window.g.item[i].tip, window.g.item[i].name, window.g.item[i].loc) || ["Mikstura imperialnego żołnierza"].includes(g.item[i].name)) {
            itemy.push(window.g.item[i].id);
          } else if (window.g.item[i].name == "Zwój teleportacji na Kwieciste Przejście" && window.g.item[i].loc === "g") {
            let obj = parseItemStat(window.g.item[i].stat);
            if (obj.amount <= 10) {
              kuptepek = true;
            }
          }
        }
        window._g(`shop&buy=&sell=${itemy.length !== 0 ? itemy.join(","): ""}`, res => {
          if (kuptepek) {
            for (let i in window.g.item) {
              if (window.g.item[i].name === "Zwój teleportacji na Kwieciste Przejście" && window.g.item[i].loc === "n") {
                window._g(`shop&buy=${window.g.item[i].id},1&sell=`);
                kuptepek = false;
              }
            }
          }
          window.shop_close(true);
          localStorage.setItem("whatToDo", "sell kendal")
          znajdzPrzejście("Kwieciste Przejście");
        });
      }
    } else {
      goTo(g.npc[16366].x, g.npc[16366].y);
      setTimeout(() => {
        czydalej();
      }, 500);
    }
  }

  window.g.loadQueue.push({
    fun() {
      idz();
    }
  })
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
})()