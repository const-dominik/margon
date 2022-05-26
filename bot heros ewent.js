// ==UserScript==
// @name         bot na ewenciakow2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       You
// @match        https://*.margonem.pl/
// @grant        none
// ==/UserScript==

/*TODO:
- okienko
- co jak smierc
*/

((_newNpc, li) => {
	const respy = {
		nyras: {
			"Tygrelion": ["Porzucone Pasieki", "Kopalnia Kapiącego Miodu p.1 sala 2", "Kopalnia Kapiącego Miodu p.2 sala 2", "Kopalnia Kapiącego Miodu p.3", "Kopalnia Kapiącego Miodu p.2 sala 1", "Kopalnia Kapiącego Miodu p.1 sala 1"],
			"Tygryt": ["Radosna Polana", "Wioska Gnolli", "Czeluść Ognistej Pożogi"],
			"Migraine": ["Pieczara Kwiku - sala 1", "Racicowy Matecznik", "Zbójecka Skarpa", "Racicowy Matecznik", "Gościniec Bardów"],
			"The Judge": ["Gliniana Pieczara p.3", "Gliniana Pieczara p.2", "Gliniana Pieczara p.1", "Las Dziwów", "Liściaste Rozstaje", "Niedźwiedzie Urwisko", "Liściaste Rozstaje", "Zapomniana Ścieżyna", "Skarpa Trzech Słów", "Zapomniana Ścieżyna", "Liściaste Rozstaje", "Sosnowe Odludzie", "Księżycowe Wzniesienie", "Mglista Polana Vesy", "Wzgórze Płaczek", "Płacząca Grota p.1 - sala 1", "Płacząca Grota p.2", "Płacząca Grota p.3", "Płacząca Grota - sala Lamentu", "Płacząca Grota p.3", "Płacząca Grota p.2", "Płacząca Grota p.1 - sala 2", "Wzgórze Płaczek", "Trupia Przełęcz"]
		}
	};
	window.mAlert = () => {};
	const checkDistance = (x, y) => Math.abs(hero.x - x) <= 1 && Math.abs(hero.y - y) <= 1;
	const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
	const createEmbed = (ranga, nazwa, lvl, grafika) => {
        const color = ["2082580", "1598706", "16770340"][ranga];
        const embed = {
            'title': `${window.hero.nick} zdobył itemek!`,
            'color': color,
            'description': `${nazwa} (${lvl} lvl)`,
            'thumbnail': {
                'url': `http://nubes.margonem.pl/obrazki/itemy/${grafika}`
            }
        };
        return embed;
    }

    const sendToDiscord = embed => {
        fetch("https://discordapp.com/api/webhooks/697930239430623333/o3Gw8ND9QiAWqrY_5Rm-z7lwrG9LUlXeTNyrnqLzy1OnuqovVasSDVF7ZP_eLq8Xer2F", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "embeds": [embed]
            })
        })
    }

    window.lootItem = item => {
        const ret = li(item);
        const {name, icon, stat} = item;
        const stats = window.parseItemStat(stat);
        const lvl = stats.lvl;
        const ranga = stats.hasOwnProperty("unique") ? 0 : stats.hasOwnProperty("heroic") ? 1 : 2;
		sendToDiscord(createEmbed(ranga, name, lvl, icon));
		return ret;
	}

	//wykrywanie herosa
	let heros;
	window.newNpc = async (mobs = {}) => {
		_newNpc(mobs);
		for (let [id, { nick }] of Object.entries(mobs)) {
			if (nick && nick.toLowerCase() === "Ahuizotl".toLowerCase()) {
				heros = id;
				await killMob(id);
				return await nextMapOrKillHeros();
			};
		};
	};

	const killMob = async id => {
		while (true) {
			if (!id || !window.g.npc[id]) {
				return;
			}
			const { x, y } = window.g.npc[id];
			if (checkDistance(x, y)) {
				if (window.g.other.length === 0) window._g(`fight&a=attack&ff=1&id=-${id}`);
				await sleep(300);
				break;
			}
			const way = getWay(x, y) || getWay(x, y, true);
			if (!way) {
				return;
			}
			window.road = way;
			await sleep(Object.values(way).length * 100);
		}
		currentCharacterRoad();
	};

	//ogarnianie localStorage
	const updateCharacters = () => {
		if (!localStorage.getItem("characters")) localStorage.setItem("characters", JSON.stringify(Object.keys(respy[g.worldname])));
		const characters = JSON.parse(localStorage.getItem("characters")).sort();
		const respyCharacters = Object.keys(respy[g.worldname]).sort();
		if (!characters.every((postac, index) => postac === respyCharacters[index])) {
			respyCharacters[0] = window.hero.nick;
			respyCharacters[respyCharacters.indexOf(window.hero.nick)] = characters[0];
			localStorage.setItem("characters", JSON.stringify(respyCharacters));
		}
		currentCharacterRoad();
	}

	const currentCharacterRoad = async () => {
		if (Object.keys(respy[window.g.worldname]).includes(hero.nick)) {
			const mapy = respy[window.g.worldname][window.hero.nick];
			if (mapy.includes(window.map.name)) {
				if (!localStorage.getItem("reverse")) localStorage.setItem("reverse", Boolean(map.name === mapy[mapy.length - 1]));
			} else {
				for (let [id, name] of Object.entries(window.g.townname)) {
					if (mapy.includes(name)) {
						const [x, y] = g.gwIds[id].split(".");
						const way = getWay(x, y);
						if (way) {
							window.road = way;
							return setTimeout(currentCharacterRoad, 2000);
						}
						const mobToKill = getWay(x, y, true);
						if (mobToKill) {
							await killMob(mobToKill);
							currentCharacterRoad();
						}
					}
				}
				nextCharacter();
			}
			nextMapOrKillHeros();
		} else {
			nextCharacter();
		}
	};

	const nextMapOrKillHeros = async () => {
		const mapy = respy[window.g.worldname][window.hero.nick];
		const currentRoad = JSON.parse(localStorage.getItem("reverse")) ? [...mapy].reverse() : mapy;
		if (!localStorage.getItem("index")) localStorage.setItem("index", currentRoad.indexOf(window.map.name) === -1 ? 0 : currentRoad.indexOf(window.map.name));
		let index = Number(localStorage.getItem("index"));
		if (currentRoad[index] === window.map.name) {
			localStorage.setItem("index", index + 1);
			index++;
		}
		console.log(index, currentRoad);
        if (index >= mapy.length) {
				await sleep(2000);
				return nextCharacter();
			} else if (index === 1) {
                await sleep(2000);
            }
		if (!g.npc[heros]) {
			const nextMapName = currentRoad[index];
			for (let [id, nazwa] of Object.entries(window.g.townname)) {
				if (nazwa.toLowerCase() === nextMapName.replace(/ +(?= )/g, "").toLowerCase()) {
					const [x, y] = window.g.gwIds[id].split(".");
					if (window.hero.x !== Number(x) || window.hero.y !== Number(y)) {
						const way = getWay(x, y);
						if (way) {
							window.road = way;
							return setTimeout(nextMapOrKillHeros, 2000);
						}
						const mobToKill = getWay(x, y, true);
						if (mobToKill) {
							await killMob(mobToKill);
							nextMapOrKillHeros();
						}
					} else {
						setInterval(() => window._g("walk"), 1000);
					}
				};
			};
		} else {
			await killMob(heros);
		};
	};

	const nextCharacter = () => {
		const characters = JSON.parse(localStorage.getItem("characters"));
		if (Object.keys(respy[window.g.worldname]).length === 1) {
			localStorage.removeItem("reverse");
			localStorage.removeItem("index");
			return currentCharacterRoad();
		}
		characters.push(characters.shift());
		localStorage.setItem("characters", JSON.stringify(characters));
		localStorage.removeItem("reverse");
		localStorage.removeItem("index");
		loganie(characters[0]);
	};

	//pobieranie danych o postaciach
	const getCharacters = async () => {
		const request = await fetch(`https://public-api.margonem.pl/account/charlist?hs3=${window.getCookie("hs3")}`, {
			method: 'GET',
			credentials: 'include'
		});
		const data = await request.json();
		return data;
	}

	const loganie = async (nickname) => {
		const characters = await getCharacters();
		console.log(characters);
		for (const {
				nick,
				id,
				world
			} of Object.values(characters)) {
			if (nickname === nick && world === window.g.worldname && !heros) {
				const dd = new Date();
				dd.setTime(dd.getTime() + 3600000 * 24 * 30);
				window.setCookie("mchar_id", id, dd, '/', 'margonem.pl');
				location.href = `http://${world}.margonem.pl`;
			} else if (heros) {
                killMob(heros);
            };
		};
	};
	
	setTimeout(() => {
		window.g.loadQueue.push({
			fun: updateCharacters
		});
	})
})(window.newNpc, window.lootItem);

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

const generateCol = () => {
	const col = [];
	for (const {
			type,
			x,
			y
		} of Object.values(window.g.npc)) {
		if (![2, 3].includes(type)) {
			col[x + 256 * y] = true;
		}
	}
	return col;
};

const checkMob = (x, y) => {
	for (const [id, mob] of Object.entries(window.g.npc)) {
		if ([2, 3].includes(mob.type) && mob.x === x && mob.y === y) {
			return id;
		}
	}
};

const generateRoad = (x, y, col) => {
	return (new AStar(window.map.col, window.map.x, window.map.y, {
		x: window.hero.x,
		y: window.hero.y
	}, {
		x: x,
		y: y
	}, col)).anotherFindPath();
};

const getWay = (x, y, bezMobow = false) => {
	const col = bezMobow ? generateCol() : window.g.npccol;
	const road = generateRoad(x, y, col);
	if (!bezMobow) {
		return road;
	}
	if (!Array.isArray(road)) {
		return;
	}
	for (const {
			x,
			y
		} of Object.values(road)) {
		const mob = checkMob(x, y);
		if (window.g.npccol[x + 256 * y] && mob) {
			return mob;
		}
	}
};

const goTo = (x, y) => {
	let _road_ = getWay(x, y);
	if (typeof _road_ !== "object") return;
	window.road = _road_;
}