const setCollision = (x, y) => {
    const index = window.map.x * y + x;
    const tab = [...window.map.col];
    tab[index] = "1";
    window.map.col = tab.join("");
}

const getDist = heros => {
    const profki = {
        ht: ["Złodziej", "Baca Bez Łowiec", "Viviana Nandin", "Negthotep Czarny Kapłan"],
        m: ["Karmazynowy Mściciel", "Kochanka Nocy", "Czarująca Atalia", "Demonis Pan Nicości", "Młody Smok"],
        wbp: ["Domina Ecclesiae", "Mietek Żul", "Mroczny Patryk", "Zły Przewodnik", "Piekielny Kościej", "Opętany Paladyn", "Perski Książę", "Lichwiarz Grauhaz", "Obłąkany łowca orków", "Święty Braciszek", "Mulher Ma", "Vapor Veneno", "Dęborożec", "Tepeyollotl"]
    }
    const { ht, m, wbp } = profki;
    const distances = {
        1: wbp,
        2: m,
        3: ht
    }
    for (const [dist, arr] of Object.entries(distances)) {
        if (arr.includes(heros)) {
            return dist;
        }
    }
    return false;
}

const setRectangle = (dist, x, y) => {
    const startPoint = [x - dist, y - dist];
    for (let i = 0; i < 2 * dist + 1; i++) {
        setCollision(startPoint[0], startPoint[1] + i);
        setCollision(startPoint[0] + i, startPoint[1]);
        setCollision(startPoint[0] + 2 * dist, startPoint[1] + 2 * dist - i);
        setCollision(startPoint[0] + 2 * dist - i, startPoint[1] + 2 * dist);
    }
}

const _newNpc = window.newNpc;
window.newNpc = (npcs = {}) => {
    for (const { wt, nick, type, lvl, x, y } of Object.values(npcs)) {
        if ((wt >= 80 && wt < 100) && window.hero.lvl - lvl < 2 && type === 3) {
            setRectangle(getDist(nick) || 3, x, y);
        }
    }
    return _newNpc(npcs);
}