const _oldOther = window.newOther;
const _oldG = window._g;
const nicki = ["Sentesys Pog", "Raldil", "Ulfareczek"];

let spr = false;

const checkUrl = url => {
    const attack = ["fight", "a=attack", "id="].every(el => url.includes(el))
    const move = url.includes("ml");
    return attack || move;
}

const sendDiscordInfo = nick => {
    fetch("WH", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: `Sprawdzanko, ${nick}`
        })
    })
}

window.newOther = (players = {}) => {
    const ret = _oldOther(players);
    for (const { nick } of Object.values(players)) {
        if (nicki.includes(nick)) {
            spr = true;
            if (!window.g.lock.check("add")) {
                window.g.lock.add("spr");
            }
        }
    }
    return ret;
}

window._g = (url, cb) => {
    if (spr && checkUrl(url)) url = "_";
    return _oldG(url, cb);
}