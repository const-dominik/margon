const ESCAPE_LOW = true; //czy uciekac jak masz mniej niz 18% ?? true lub false
const LOW_CAP = 18; // uciekaj jak masz mniej niz.........procent
const ALWAYS_ESCAPE = ["Losarenci", "Zawada"]; //nicki przed ktorymi ma zawsze dawac ucieczke
const LVL = 10; // ile leweli wiecej zeby uciekalo
const TP_NAME = "nazwa tepeka"; // nazwa tepeka

const _oldParseInput = window.parseInput;
window.parseInput = (data, ...rest) => {
    const ret = _oldParseInput(data, ...rest);
    if (data && data.f) {
        if (shouldEscape(data.f)) {
            flee();
        }
    }
    return ret;
}

const shouldEscape = data => {
    if (data.w) {
        const isMob = Object.keys(data.w).some(id => id < 0);
        if (!isMob) {
            if (ESCAPE_LOW && data.w[window.hero.id].hpp < LOW_CAP) return true;
            const myTeam = [];
            const enemyTeam = [];
            for (const { lvl, team, name } of Object.values(data.w)) {
                team === data.myteam ? myTeam.push(lvl) : enemyTeam.push(lvl);
                if (ALWAYS_ESCAPE.includes(name)) return true;
            }
            if (data.myteam && data.myteam !== 1 && enemyTeam.some(lvl => (lvl - window.hero.lvl) >= LVL)) return true;
        }
    }
}

const flee = () => {
    const id = localStorage.getItem(`ucieczka${window.hero.id}`);
    window._g(`moveitem&id=${id}&st=1`, res => {
        if (res.e === "ok" && res.f && res.f.close === 1) tepek();
        else setTimeout(flee, 100);
    })
}

const tepek = () => {
    const id = localStorage.getItem(`ucieczkatepek${window.hero.id}`);
    if (window.map.pvp === 2 && window.map.id !== parseInt(window.parseItemStat(window.g.item[id].stat).teleport.split(",")[0])) {
        window._g(`moveitem&id=${id}&st=1`, setTimeout(tepek, 5));
    }
}

const isReadyToUse = timelimit => {
    const limit = timelimit.split(",");
    if (!limit[1]) return true;
    if (limit[1] < window.unix_time()) return true; // jak zmieniom unix time to bedzie przejebane
    return false;
};

const updateItems = () => {
    if (Object.keys(window.g.item).length) {
        const ucieczka = localStorage.getItem(`ucieczka${window.hero.id}`);
        const tepek = localStorage.getItem(`ucieczkatepek${window.hero.id}`);
        const fleeStat = window.g.item[ucieczka] ? window.parseItemStat(window.g.item[ucieczka].stat) : true;
        const tepekStat = window.g.item[tepek] ? window.parseItemStat(window.g.item[tepek].stat) : true;
        if (!ucieczka || !window.g.item[ucieczka] || (fleeStat.timelimit ? !isReadyToUse(fleeStat.timelimit) : false)) {
            for (let {
                    id,
                    stat,
                    loc
                } of Object.values(window.g.item)) {
                const staty = window.parseItemStat(stat);
                if (staty.action === "flee" && (staty.timelimit ? isReadyToUse(staty.timelimit) : true) && loc === "g") {
                    return localStorage.setItem(`ucieczka${window.hero.id}`, id);
                }
            }
        }
        if (!tepek || !window.g.item[tepek] || (tepekStat.timelimit ? !isReadyToUse(tepekStat.timelimit) : false)) {
            for (let {
                    id,
                    name,
                    stat,
                    loc
                } of Object.values(window.g.item)) {
                const staty = window.parseItemStat(stat);
                if (name === TP_NAME && loc === "g" && !!staty.teleport && (staty.timelimit ? isReadyToUse(staty.timelimit) : true)) {
                    localStorage.setItem(`ucieczkatepek${window.hero.id}`, id);
                    break;
                }
            }
        }
    } else {
        setTimeout(updateItems, 200);
    }
}

window.g.loadQueue.push({
    fun: updateItems
})