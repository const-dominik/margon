const fs = require('fs');
const allIds = JSON.parse(fs.readFileSync("ids.json"));

for (const [world, ids] of Object.entries(allIds)) {
    fs.writeFileSync(`${world}.json`, JSON.stringify(ids));
}