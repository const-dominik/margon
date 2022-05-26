const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({
    port: 3000
});
const Discord = require("discord.js");
const bocisko = new Discord.Client({
    disableEveryone: true
});
const editJsonFile = require("edit-json-file");
const cleverbot = require("cleverbot.io");
const bot = new cleverbot("2upcNmGOc1R8LaWe", "GmvNJ9jJj1aNuGOO102OGajHSSZmaWD8");
bot.setNick("sessionname");
const file = editJsonFile(`${__dirname}/typki.json`);
const users = ["6020168", "1", "0"];

bocisko.on("ready", () => {
    console.log(`${bocisko.user.username} is online!`);
    bocisko.user.setPresence({
        game: {
            name: "Boci na Thantos",
            type: "STREAMING"
        },
        status: "CONNECTING"
    })
});

wss.on("connection", ws => {
    ws.on("message", message => {
        const msg = JSON.parse(message);
        if (msg.type === "connection") {
            console.log(msg)
            ws.send(JSON.stringify({
                type: "connection",
                connect: users.includes(msg.aid) ? true : false
            }));
        } else if (msg.type === "message") {
            bocisko.channels.get("563011876250845184").send(msg.text);
        } else if (msg.type === "cleverbot") {
            bocisko.channels.get("563011876250845184").send(msg.text[0]);
            bot.ask(msg.text[2], (err, response) => {
                if (err) {
                    return console.log(`error: ${err}`);
                }
                if (!file.get(msg.text[1])) {
                    file.set(msg.text[1], {
                        liczba: 1,
                        maxliczba: Math.floor(Math.random() * (6 - 3 + 1)) + 3
                    });
                    file.save();
                    ws.send(JSON.stringify({
                        type: "message",
                        text: `@${msg.text[1].split(" ").join("_")} ${response.toLowerCase().split(".").join("")}`
                    }));
                } else {
                    if (file.get(msg.text[1]).liczba >= file.get(msg.text[1]).maxliczba) {
                        const msggggg = ["narka ci kot", "jesteś nara", "nie opowiem ci kaczych opowieści :P", "dodaje cie do wrogow raz 1", "lecę robić kwit", "narka nie słuchać", "co tam piszesz ? : D", "masz bez ponowy", "nie pisz do mnie", "asihfashfaosifaisho", "spróbuj jeszcze raz"];
                        ws.send(JSON.stringify({
                            type: "wrug",
                            text: [`${msg.text[1].split(" ").join("_")}`, `@${msg.text[1].split(" ").join("_")} ${msggggg[Math.floor(Math.random() * msggggg.length)]}`]
                        }));
                    } else {
                        file.set(msg.text[1].liczba, file.get(msg.text[1]).liczba = file.get(msg.text[1]).liczba + 1);
                        file.save();
                        ws.send(JSON.stringify({
                            type: "message",
                            text: `@${msg.text[1].split(" ").join("_")} ${response.toLowerCase().split(".").join("")}`
                        }));
                    }
                }
            });
        }
    })
    bocisko.on("message", message => {
        if (["450686367312248833", "277493557613297675", "241306318290288650"].includes(message.author.id)) {
            const msg = message.content;
            if (msg.slice(0, 5) === "!send") {
                ws.send(JSON.stringify({
                    type: "message",
                    text: msg.slice(6)
                }));
                message.delete(1);
            } else if (msg === "!wyloguj") {
                ws.send(JSON.stringify({
                    type: "logoff",
                    text: msg
                }));
            } else if (msg.slice(0, 8) === "!zaloguj") {
                ws.send(JSON.stringify({
                    type: "logon",
                    text: msg.split("!zaloguj ")[1].split(" ")
                }));
            } else if (msg === "!pozycja") {
                ws.send(JSON.stringify({
                    type: "pozycja",
                    text: msg
                }));
            }
        }
    });
});
bocisko.login("NTU4MzUwOTQ5MzU0MTc2NTEy.XKTLSA.kJ11Xgs2PQ2qEkDkCXVN4VBHlhY");