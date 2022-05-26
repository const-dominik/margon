const _oldTalk = window.npcTalk;
const _oldParseInput = window.parseInput;

window.npcTalk = t => {
    _oldTalk(t);
    if (t[1] === "Skrzat Lirek" && t[13].startsWith("Zaprowadź mnie do")) {
        window._g(`talk&id=${t[2]}&c=${t[14]}`, res => {
            if (!res || res.e !== "ok" || res.w) {
                setTimeout(window.npcTalk, 100, t);
            }
        });
    }
}

window.parseInput = (data, ...args) => {
    _oldParseInput(data, ...args);
    if (data.town) {
        controller();
    }
}

const talkTo = nick => window._g(`talk&id=${getNpcId(nick)}`);
const getNpcId = name => {
    for (const [id, { nick }] of Object.entries(window.g.npc)) {
        if (nick === name) return id;
    }
}
const getMapId = name2 => {
    for (let [id, name] of Object.entries(window.g.townname)) {
        if (name2 === name) return id;
    }
}
const getCoords = name => {
    const [x, y] = window.g.gwIds[getMapId(name)].split(".");
    return [x, y];
}

const goToMap = map => {
    const [x, y] = window.map.name === "Rozlewisko Kai" ? [15, 4] : getCoords(map);
    if (parseInt(x) === window.hero.x && parseInt(y) === window.hero.y) {
        window.map.name === "Rozlewisko Kai" ? talkTo("Skrzat Lirek"): window._g("walk");
    } else {
        goTo(x, y);
    }
    setTimeout(goToMap, 2000, map);
}

const controller = () => {
    const maps = ["Kwieciste Przejście", "Lazurowe Wzgórze", "Grań Gawronich Piór", "Gvar Hamryd", "Rozlewisko Kai", "Korytarz Zagubionych Marzeń", "Przejście Władców Mrozu"];
    if (maps.includes(window.map.name)) {
        const mapka = maps.indexOf(window.map.name);
        if (mapka !== maps.length) {
            goToMap(maps[mapka + 1]);
        } else return;
    }
    setTimeout(controller, 5000);
}
