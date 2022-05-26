(newnpc => {
    const checkDistance = (x, y) => Math.abs(hero.x - x) <= 1 && Math.abs(hero.y - y) <= 1;
	const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
	

    window.newNpc = (moby = {}) => {
        newnpc(moby);
        for (let [id, {nick, icon}] of Object.entries(moby)) {
            if (nick === "Tolypeutes") return isFake(icon, id, findClosestMob);
        }
    }

    const isFake = (icon, id, callback) => {
        const img = new Image();
        const canvas = document.createElement("canvas").getContext("2d");
        const checkData = () => {
            const canvasData = canvas.getImageData(Math.floor(canvas.width / 2), 0, 1, canvas.height).data;
            for (let i = 3; i < canvasData.length; i += 4) {
                if (canvasData[i] > 0) return callback(id);
            }
            return;
        }
    
        img.onload = function () {
            canvas.width = this.width;
            canvas.height = this.height;
            canvas.drawImage(img, 0, 0);
            checkData();
        }
        img.src = icon;
    }

    const findClosestMob = id => {
        const grupa = window.g.npc[id].grp;
        let mob = id;
        for (let [id2, {x, y, grp}] of Object.entries(window.g.npc)) {
            if (grp === grupa) {
                const way = getWay(x, y);
                if (way && way.length < getWay(window.g.npc[mob].x, window.g.npc[mob].y).length) mob = id2;
            }
        }
        return killMob(mob);
    }

    const killMob = async id => {
		while (true) {
			if (!id || !window.g.npc[id]) {
				return;
			}
			const {
				x,
				y
			} = window.g.npc[id];
			if (checkDistance(x, y)) {
				window._g(`fight&a=attack&ff=1&id=-${id}`);
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
	};

})(window.newNpc)

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