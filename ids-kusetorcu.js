const config = {
    worlds: ["Aequus", "Astraja", "Asylum", "Ataentsic", "Avalon", "Badzior", "Dionizos", "Dream", "Elizjum", "Erebos", "Ertill", "Experimental", "Febris", "Helios", "Hypnos", "Inferno", "Infinity", "Legion", "Majorka", "Mordor", "Narwhals", "Nerthus", "Nexos", "Nubes", "Odysea", "Orchidea", "Orvidia", "Pandora", "Regros", "Riventia", "Stark", "Stoners", "Syberia", "Thantos", "Unia", "Virtus", "Zefira"],
    name: "brylantowe rękawice tolloka"
};
const parser = require("node-html-parser");
const fetch = require("node-fetch");
const fs = require("fs");
if (!fs.existsSync("ids.json")) fs.writeFileSync("ids.json", "{}");

const parseHtml = txt => {
    const html = parser.parse(txt);
    return html;
};
const getHtml = async url => {
    while (true) {
        const request = await fetch(url);
        if (!request.ok) {
            continue;
        }
        const data = await request.text();
        if (typeof data !== "string") {
            continue;
        }
        return data;
    }
};
const getMaxPages = async world => {
    const worldname = world[0].toUpperCase() + world.substring(1).toLowerCase();
    const url = `https://new.margonem.pl/ladder/players,${worldname}`;
    const txt = await getHtml(url);
    const doc = parseHtml(txt);
    return parseInt(doc.querySelector(".total-pages").rawText);
};

const getIds = async () => {
    for (const world of config.worlds) {
        const fileObj = JSON.parse(fs.readFileSync("ids.json", "utf8"));
        if (fileObj.hasOwnProperty(world)) continue;
        const ids = new Set();
        const maxPages = await getMaxPages(world);
        for (let i = 1; i <= maxPages; i++) {
            console.log(world, i);
            const url = `https://new.margonem.pl/ladder/players,${world}?page=${i}`;
            const txt = await getHtml(url);
            const doc = parseHtml(txt);
            const allPlayers = Array.from(doc.querySelectorAll("table tbody tr td.long-clan a"));
            allPlayers.forEach(el => ids.add(parseInt(el.getAttribute("href").match(/(\d+)/)[0]), 10));
        }
        fileObj[world] = Array.from(ids);
        fs.writeFileSync("ids.json", JSON.stringify(fileObj));
    }
}

const hasSearchedItem = async (world) => {
    const allIds = JSON.parse(fs.readFileSync("ids.json", "utf8"));
    const ids = allIds[world];
    for (const id of ids) {
        const url = `https://new.margonem.pl/profile/view,${id}`;
        const request = await getHtml(url);
        const doc = parseHtml(request);
        const chars = Array.from(doc.querySelectorAll(".character-list ul li")).filter(el => el.getAttribute("data-world") === `#${world.toLowerCase()}`).map(el => parseInt(el.getAttribute("data-id"), 10));
        for (const char of chars) {
            const request = await fetch(`http://${world.toLowerCase()}.margonem.pl/engine?t=getvar_eqcache&id=${char}`);
            const eq = await request.json();
            for (const { name } of Object.values(eq)) {
                if (name.trim().toLowerCase() === config.name.toLowerCase()) {
                    console.log(`Znaleziono! - ${url}#char_${char},${world.toLowerCase()}`);
                }
            }
        }
    }
    console.log("done");
    return false;
}

hasSearchedItem("Berufs");