const old = window.newOther;
window.newOther = (players = {}) => {
    const ret = old(players);
    findAndKill(players);
    return ret;
}

const findAndKill = (other = window.g.other) => {
    if (other.length) {
        for (const [id, player] of Object.entries(other)) {
            const { x, y, relation, lvl } = player;
            if (Math.abs(x - window.hero.x) <= 2 && Math.abs(y - window.hero.y) <= 2 && lvl < 300 && !["fr", "cl", "cl-fr"].includes(relation) && !window.g.battle) {
                window._g(`fight&a=attack&id=${id}`);
                return;
            }
        }
    }
}

setInterval(findAndKill, 500);