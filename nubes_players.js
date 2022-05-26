const fetch = require("node-fetch");
const parser = require("node-html-parser")
const fs = require('fs');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const sitesNumber = async () => {
    try {
        const request = await fetch("https://new.margonem.pl/ladder/players,Nubes?page=1");
        const data = await request.text();
        const document = parser.parse(data);
        const sites = parseInt(document.querySelector(".total-pages a").text, 10);
        return czlenie(sites);
    } catch (err) {
        console.log(err);
        return setTimeout(sitesNumber, 100);
    }
}

const czlenie = async strony => {
    const ids = fs.readFileSync("nubes", 'utf8').split(",");
    const newCzlenie = [];
    try {
        for (let i = 1; i <= strony; i++) {
            console.log(`Strona: ${i}`);
            const site = await fetch(`https://new.margonem.pl/ladder/players,Nubes?page=${i}`);
            const data = await site.text();
            const document = parser.parse(data);
            const allPlayers = Array.from(document.querySelectorAll("table tbody tr"));
            for (let player of allPlayers) {
                const [idConta, ] = player.childNodes[3].childNodes[1].rawAttrs.match(/(\d+)/g);
                if (!ids.includes(idConta)) {
          //          newCzlenie.push(idConta);
                    ids.push(idConta);
                }
            }
        }
    } catch (err) {
        console.log(err);
    } finally {
        fs.writeFileSync("nubes", ids);
        //if (newCzlenie.length) await sendCzlenie(newCzlenie);
        //sitesNumber();
        console.log(ids.length-1);
    }
}

const sendCzlenie = async czlenie => {
    const wh = "https://discordapp.com/api/webhooks/696732265920593921/UfHxYF3p9bRt_3PTk3MpQbbUSfZSnfhGlbJP5ze2BcCiEKYo6HT6N266l57y7xL7IxIX";
    for (let czlen of czlenie) {
        try {
        await fetch(wh, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                content: `https://www.margonem.pl/?task=profile&id=${czlen}`
            })
        })
    } catch(err) {
        console.log("Nie wysłałem człenia");
    }
    }
}

sitesNumber();