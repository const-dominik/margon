// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://fobos.margonem.pl/
// @grant        none
// ==/UserScript==


(() => {
    if (!localStorage.getItem("reverse")) localStorage.setItem("reverse", false);
    const rewers = JSON.parse(localStorage.getItem("reverse"));

    const maps = ["Osada Śmiałków", "Samotna Nizina", "Zatopiony Szczyt"];
    if (rewers) maps.reverse();

    const getCoords = name => {
        const [x, y] = window.g.gwIds[getMapId(name)].split(".");
        return [x, y];
    }

    const getMapId = name2 => {
        for (let [id, name] of Object.entries(window.g.townname)) {
            if (name2 === name) return id;
        }
    }
    const sleep = ms => new Promise(res => setTimeout(res, ms));
    
    const nextMap = () => {
        if (window.map.name === maps[maps.length-2]) localStorage.setItem("reverse", !rewers);
        if (window.map.name && maps.includes(window.map.name)) {
            const mapka = maps.indexOf(window.map.name);
            if (maps[mapka + 1]) {
                const [x, y] = getCoords(maps[mapka + 1]);
                if (Number(x) === window.hero.x && Number(y) === window.hero.y) {
                    if ([maps[0], maps[maps.length-1].includes(window.map.name)]) await sleep(2000);
                    window._g("walk");
                } else {
                    goTo(x, y);
                }
                setTimeout(nextMap, 2000);
            }
        } else setTimeout(nextMap, 100);
    }

    window.g.loadQueue.push({
        fun() {
            nextMap();
        }
    })
})()
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