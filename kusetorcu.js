const fetch = require('node-fetch');

const config = {
    world: "aldous",
    name: "Serce bestii"
}

const hasSearchedItem = async (accId) => {
    const parser = new DOMParser();
    const url = `https://new.margonem.pl/profile/view,${accId}`;
    const request = await fetch(url);
    if (request.ok) {
        const response = await request.text();
        const doc = parser.parseFromString(response, "text/html");
        const chars = Array.from(doc.querySelectorAll(`.character-list ul li[data-world="#${config.world}"] .chitems`)).map(el => JSON.parse(el.getAttribute("value")));
        for (const char of chars) {
            for (const { name, stat } of char) {
                const parsed = window.parseItemStat(stat);
                if (name.trim() === config.name || (parsed.lvl && parsed.lvl === "300" && parsed.legbon && parsed.legbon === "critred,300")) {
                    return true;
                }
            }
        }
    }
    return false;
}

hasSearchedItem(3332309);