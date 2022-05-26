const doNotAttack = ["fr", "cl"];
let hasSession = false;
const distance = (x1, y1, x2, y2) => Math.ceil(Math.abs(Math.sqrt(Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2))));
const sleep = ms => new Promise(r => setTimeout(r, ms));

const findPlayerToAttack = e => {
    if (hasSession) return;
    if (e.keyCode === 16 && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) { // shift
        if (window.g.other.length) {
            let attackId = 0;
            let attackNick = "";
            let attackClosest = 100;
            for (const [id, { x, y, relation, nick }] of Object.entries(window.g.other)) {
                if (doNotAttack.includes(relation)) continue;
                const dist = distance(x, y, window.hero.x, window.hero.y);
                if (dist < attackClosest) {
                    attackClosest = dist;
                    attackNick = nick;
                    attackId = id;
                }
            }
            if (attackId && attackNick) {
                hasSession = true;
                window.message(`Próbuję atakować ${attackNick}`);
                return attack(attackId, attackNick);    
            }
        }
    }
}

const attack = async (id) => {
    if (window.g.other[id] && window.map.pvp === 2 && !window.g.battle) {
        const player = window.g.other[id];
        if (Math.abs(window.hero.x - player.x) <= 2 && Math.abs(window.hero.y - player.y) <= 2) {
            window._g(`fight&a=attack&id=${id}`);
            await sleep(50);
            if (!window.g.battle) {
                return attack(id);
            }
        }
        await sleep(50);
        return attack(id);
    }
}

document.addEventListener("keydown", findPlayerToAttack);
document.addEventListener("keyup", () => hasSession = false);