const fetch = require('node-fetch');
const parser = require('node-html-parser');
const fs = require('fs');

const worlds = ["Aldous", "Berufs", "Brutal", "Classic", "Fobos", "Gefion", "Hutena", "Jaruna", "Katahha", "Lelwani", "Majuna", "Nomada", "Perkun", "Tarhuna", "Telawel", "Tempest", "Zemyna", "Zorza", "Aequus", "Astraja", "Asylum", "Ataentsic", "Badzior", "Dionizos", "Dream", "Elizjum", "Erebos", "Ertill", "Experimental", "Febris", "Helios", "Hypnos", "Inferno", "Infinity", "Legion", "Majorka", "Mordor", "Narwhals", "Nerthus", "Nexos", "Nubes", "Nyras", "Odysea", "Orchidea", "Orvidia", "Pandora", "Regros", "Riventia", "Stark", "Stoners", "Syberia", "Thantos", "Unia", "Virtus", "Zefira"];

const getMaxPages = async world => {
    const worldname = world[0].toUpperCase() + world.substring(1).toLowerCase();
    const url = `https://new.margonem.pl/ladder/players,${worldname}`;
    const txt = await getHtml(url);
    const doc = parser.parse(txt);
    return parseInt(doc.querySelector(".total-pages").rawText);
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

const checkIfBanned = async id => {
    const URL = `https://new.margonem.pl/profile/view,${id}`;
    const data = await getHtml(URL);
    const document = parser.parse(data);
    const isBanned =  document.querySelectorAll(".profile-header h2 span")[1]?.text === "(Konto zablokowane)";
    const when = document.querySelector(".profile-header-data-container .profile-header-multiple-lines .value")?.text.match(/\d\d-\d\d-\d\d\d\d/)[0];
    if (["26-10-2020", "25-10-2020"].includes(when) && isBanned) {
        return true;
    }
    return false;
}

const getBannedAccountIds = async (world) => {
    const ids = new Set();
    const pageNumber = await getMaxPages(world);
    for (let i = 1; i <= pageNumber; i++) {
        console.log(world, i);
        const url = `https://new.margonem.pl/ladder/players,${world}?page=${i}`;
        const txt = await getHtml(url);
        const doc = parser.parse(txt);
        let allPlayers = Array.from(doc.querySelectorAll("table tbody tr td.long-clan a"));
        allPlayers = allPlayers.map(el => parseInt(el.getAttribute("href").match(/(\d+)/)[0]), 10);
        for (const id of allPlayers) {
            const isBanned = await checkIfBanned(id);
            if (isBanned) {
                ids.add(id);
            }
        }
    }
    fs.writeFileSync(`${world}.json`, JSON.stringify([...ids]));
}

const getNiceString = async id => {
    const URL = `https://new.margonem.pl/profile/view,${id}`;
    const data = await getHtml(URL);
    const document = parser.parse(data);
    const when = document.querySelector(".profile-header-data-container .profile-header-multiple-lines .value")?.text.match(/\d\d-\d\d-\d\d\d\d/)[0];
    const nick = document.querySelector(".profile-header h2 span")?.text?.trim();
    return `${nick}: ${URL} [${when}]`
}

const parseBannedAccounts = async () => {
    const fileObj = JSON.parse(fs.readFileSync("banicja2.json", "utf8"));
    let str = '';
    for (const [world, arr] of Object.entries(fileObj)) {
        if (["Syberia", "Unia", "Pandora", "Experimental"].includes(world)) {
            str += (world + '\n');
            if (arr.length) {
                for (let i = 0; i < arr.length; i++) {
                    console.log(world, i);
                    const niceString = await getNiceString(arr[i]);
                    str += (`${i+1}. ${niceString}\n`);
                }
            } else {
                str += "nikt\n";
            }
        }
    }
    fs.writeFileSync("banicja.txt", str);
}

// worlds.forEach(getBannedAccountIds)
