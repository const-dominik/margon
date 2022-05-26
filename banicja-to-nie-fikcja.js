const fetch = require('node-fetch');
const parser = require('node-html-parser');
const fs = require('fs');
if (!fs.existsSync("banicja2.json")) fs.writeFileSync("banicja2.json", "{}");

const sendToDiscord = (id) => {
    fetch("https://discordapp.com/api/webhooks/714919117743849531/WcEVNtjidYxp81Of-EdlPYxv5MzkeDPfKH7UX7lUZIKDV2ejbWVsQaDxw2Sprq7zQG_0", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: `https://new.margonem.pl/profile/view,${id}`
        }),
    });
}

const worlds = ["Febris", "Helios", "Hypnos", "Inferno", "Infinity", "Legion", "Majorka", "Mordor", "Narwhals", "Nerthus", "Nexos", "Nubes", "Odysea", "Orchidea", "Orvidia", "Regros", "Riventia", "Stark", "Stoners", "Thantos", "Virtus", "Zefira"]; // unia syba panda exper

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
    const isBanned = Array.from(document.querySelectorAll(".profile-header h2 span"))[1]?.text === "(Konto zablokowane)";
    const when = document.querySelector(".profile-header-data-container .profile-header-multiple-lines .value")?.text.match(/{\d\d-\d\d-\d\d\d\d/)[0];
    if (["07-07-2020"].includes(when) && isBanned) {
        return true;
    }
    return false;
}

const getBannedAccountIds = async (worlds) => {
    for (const world of worlds) {
        const fileObj = JSON.parse(fs.readFileSync("banicja2.json", "utf8"));
        if (fileObj.hasOwnProperty(world)) {
            continue;
        }
        const ids = new Set();
        const pageNumber = await getMaxPages(world);
        for (let i = 1; i <= pageNumber; i++) {
            console.log(world, i);
            const url = `https://new.margonem.pl/ladder/players,${world}?page=${i}`;
            const txt = await getHtml(url);
            const doc = parser.parse(txt);
            let allPlayers = Array.from(doc.querySelectorAll("table tbody tr td.long-clan a"));
            allPlayers = allPlayers.map(el => parseInt(el.getAttribute("href").match(/(\d+)/)[0]), 10);
            console.log(allPlayers)
            for (const id of allPlayers) {
                const isBanned = await checkIfBanned(id);
                if (isBanned) {
                    sendToDiscord(id);
                    ids.add(id);
                }
            }
        }
        console.log(ids);
        fileObj[world] = Array.from(ids);
        fs.writeFileSync("banicja2.json", JSON.stringify(fileObj));
    }
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

getBannedAccountIds(["Berufs"]);