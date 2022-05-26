const axios = require('axios');
const fs = require('fs');
const { JSDOM } = require('jsdom');

const worlds = ["Zorza"];
const sleep = () => new Promise(resolve => setTimeout(resolve, 50));

const getHtml = async (world, page) => {
    const URL = `https://new.margonem.pl/ladder/players,${world}?page=${page}`;
    while (true) {
        try {
            const request = await axios.get(URL);
            const data = request.data;
            const document = new JSDOM(data).window.document;
            const pages = parseInt(document.querySelector(".total-pages").textContent);
            return [pages, document];
        } catch (e) {
            console.log(e);
            await sleep();
        }
    }
}

const parseHref = href => href.match(/(\d+)/g);

const getIds = async () => {
    const ids = JSON.parse(fs.readFileSync("ids.json"));
    for (const world of worlds) {
        console.log(world)
        const [pages] = await getHtml(world, 1);
        ids[world] = {}
        for (let page = 1; page <= pages; page++) {
            console.log(page);
            const [, document] = await getHtml(world, page);
            const players = document.querySelectorAll('.long-clan a[href]');
            for (const player of players) {
                const href = player.getAttribute("href");
                const nick = player.textContent.trim();
                const [profileId, playerId] = parseHref(href);
                console.log(profileId, playerId, nick);
                if (!ids[world][profileId]) {
                    ids[world][profileId] = {};
                }
                ids[world][profileId][playerId] = nick;
            }
        }
        fs.writeFileSync("ids.json", JSON.stringify(ids));
    }
}

getIds();