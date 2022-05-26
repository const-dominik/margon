const fs = require("fs");

const worlds = ["Aldous", "Berufs", "Brutal", "Classic", "Fobos", "Gefion", "Hutena", "Jaruna", "Katahha", "Lelwani", "Majuna", "Nomada", "Perkun", "Tarhuna", "Telawel", "Tempest", "Zemyna", "Zorza"];
for (const world of worlds) {
    const file = JSON.parse(fs.readFileSync(`${world}.json`));
    const nicki = [];
    for (const player of Object.values(file)) {
        Object.values(player).forEach(nick => nicki.push(nick));
    }
    fs.writeFileSync(`../NICKI/${world}.json`, JSON.stringify(nicki));
}