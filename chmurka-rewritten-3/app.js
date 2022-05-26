const axios = require("axios");
const cron = require("cron").CronJob;
const jsdom = require("jsdom").JSDOM;
const http = require("http");
const { Client } = require("pg");
const sleep = ms => new Promise(r => setTimeout(r, ms));

const client = new Client();
client.connect();

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end("hello world!");
});

server.listen(process.env.PORT || 3000, () => {
    console.log("server running");
});

const playersData = JSON.parse(fs.readFileSync("ranking2.json", "utf8"));

const getWhatYouNeed = async (index = 0) => {
    const page = await axios.get(`https://new.margonem.pl/ladder/players,Berufs?page=${index}`);
    if (page.status === 200) {
        const { document } = new jsdom(page.data).window;
        return index ? parseInt(document.querySelector(".total-pages a").text, 10) : document;
    } else {
        await sleep(100);
        return getWhatYouNeed(index);
    }
}

const loopThroughRank = async () => {
    const pages = await getWhatYouNeed();
    const dedziory = [];
    for (let page = 1; page <= pages; page++) {
        const document = await getWhatYouNeed(page);
        const allPlayers = Array.from(document.querySelectorAll("table tbody tr"));
        for (const player of allPlayers) {
            const [idAccount, idChar] = player.querySelector("a").getAttribute("href").match(/(\d+)/g).map(x => parseInt(x));
            const lvl = parseInt(player.querySelector(".long-level").textContent.trim());
            const nick = player.querySelector(".long-clan a").textContent.trim();
            if (playersData[idAccount] === undefined) playersData[idAccount] = {};
            if (playersData[idAccount][idChar] === undefined) {
                playersData[idAccount][idChar] = { lvl, nick };
            } else {
                if (playersData[idAccount][idChar].lvl > lvl && playersData[idAccount][idChar].lvl >= 100) {
                    dedziory.push([nick, playersData[idAccount][idChar].lvl]);
                }
                playersData[idAccount][idChar].lvl = lvl;
                playersData[idAccount][idChar].nick = nick;
            }
        }
    }
    fs.writeFileSync("ranking2.json", JSON.stringify(playersData));
    console.log(dedziory, new Date().toLocaleString());
    if (dedziory.length) {
        return sendDedy(dedziory);
    }
    return;
}

const sendDedy = async (dedy) => {
    for (const [nick, lvl] of Object.values(dedy)) {
        const embed = {
            'title': `${nick} dedł na ${lvl} lvl!`,
            'color': ((Math.floor(lvl / 380 * 221) + 32) * 256 + (Math.floor(lvl / 380 * (-112)) + 120)) * 256 + Math.floor(lvl / 380 * (-204)) + 217,
            'description': `${(new Date).toLocaleString()}`,
            'thumbnail': {
                'url': 'https://i.imgur.com/WSmrePb.jpg'
            }
        };
        await axios.post("https://discord.com/api/webhooks/805805700198039562/4SXyrwtYSwCDZyBcIK8oSSlpCYPkeLzZSeWia3X1CYLUKHfbT2vQ4jzmh0Fn9EaOgeRg", {
            embeds: [embed],
            content: `${lvl >= 150 ? "@everyone" : ""}`
        });
    }
    return;
}

const job = new cron('0 */15 * * * *', loopThroughRank);
job.start();