const axios = require("axios");
const parser = require("node-html-parser");
const fs = require("fs");

const getUserData = async id => {
    const url = `https://new.margonem.pl/profile/view,${id}`;
    try {
        const response = await axios(url);
        return response.data;
    } catch(err) {
        const {status, statusText} = err.response;
        if(status !== 404 && statusText !== "Not Found") {
            console.log(status, statusText, id);
        }
    }
};

const parseData = async id => {
    const data = await getUserData(id);
    if(!data) {
        return false;
    }
    const doc = parser.parse(data);
    const banned = doc.querySelectorAll("div.brown-box.profile-header h2 span");
    const rank = doc.querySelector("div.profile-header-data-container div.profile-header-data.profile-header-capitalized div.value span");
    const lastLogin = doc.querySelector("div.profile-header-data-container div.profile-header-data.profile-header-multiple-lines div.value");
    const worlds = doc.querySelectorAll("div.character-list ul li");
    if([banned, rank, lastLogin, worlds].some(el => !el)) {
        return false;
    }
    const [,lastLoginYear] = lastLogin.rawText.trim().match(/-(\d+)$/);
    const nubes = worlds.some(elem => elem.getAttribute("data-world").substr(1) === "nubes"); 
    return rank.rawText.trim() === "gracz" && parseInt(lastLoginYear) === 2020 && !nubes && (!banned[1] || banned[1].rawText !== "(Konto zablokowane)");
};
const saveInFile = id => {
    const fileName = "id.txt";
    fs.readFile(fileName, (err, data) => {
        if(!err) {
            const text = data.toString().split(",");
            if(!text.includes(id)) {
                text.push(id);
            }
            const txt = new Uint8Array(Buffer.from(text.join(",")));
            fs.writeFile(fileName, txt, err => {});
        }
    })
};
const scanUser = async () => {
    console.log("Start:", (new Date).toLocaleString())
    for(let id = 0; id < 9246204; id++) {
        console.log(id)
        if(await parseData(id)) {
            saveInFile(id);
        }
    }
    console.log("End:", (new Date).toLocaleString())
};
scanUser();