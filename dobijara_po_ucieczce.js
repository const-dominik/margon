let enemiesIds;
let dobijac = true;
let ucieczka = false;
window.g.delays.limit = 150;

const _parseInput = window.parseInput;
window.parseInput = (data, ...args) => {
    const ret = _parseInput(data, ...args);
    if (data.f) {
        if (data.f.w) {
            enemiesIds = Object.keys(data.f.w).filter(id => parseInt(id, 10) !== window.hero.id);
        }
        if (data.f.m) {
            if (Object.values(data.f.m).some(message => message.includes("Walka przerwana! Użyta mikstura ucieczki!")) && data.f.move === -1 && !data.f.close) {
                ucieczka = true;
                execute("fight&a=quit");
            }
        }
        if (data.f.close === 1 && dobijac && ucieczka) {
            if (enemiesIds.length) {
                for (const id of enemiesIds) {
                    if (window.g.other[id]) {
                        const { x, y } = window.g.other[id];
                        if (checkDistance(x, y)) {
                            execute(`fight&a=attack&id=${id}`);
                        }
                    }
                }
            }
        }
    }
    return ret;
}

const checkDistance = (x, y) => Math.abs(window.hero.x - x) <= 2 && Math.abs(window.hero.y - y) <= 2;

const execute = (url) => {
    window._g(url, res => {
        if ((!res || res.e !== "ok" || res.w)) {
            setTimeout(execute, 50, url);
        }
    });
}