const axios = require("axios");
const Discord = require("discord.js");
const client = new Discord.Client();

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const sleep = () => new Promise(resolve => setTimeout(resolve, random(5, 15) * 1000));
const LOGIN_URL = "https://new.margonem.pl/ajax/login";
const INV_URL = "https://www.margonem.pl/ajax/forum.php";

class Credentials {
    constructor(login, password) {
        this.login = login;
        this.password = password;
    }

    get toString() {
        return `l=${this.login}&p=${this.password}&h2=&security=true`;
    }
}

class Config {
    constructor() {
        this.world = "hestia";
        this.channelID = "743604681716269079";
    }
}

class Account {
    constructor(credentials) {
        this.credentials = credentials;
        this.cookies = {};
        this.config = new Config();
    }

    async sign_in(author_id) {
        this.cookies = {};
        try {
            const response = await axios(LOGIN_URL, {
                method: "POST",
                data: this.credentials.toString,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36"
                }
            });
            const data = response.data;
            await this.send_message(author_id, " ```js\n" + JSON.stringify(data, null, 2) + "\n``` ");

            if (data.ok !== 1) {
                return false;
            }

            const getCookieValue = (name, string) => {
                const regExp = new regExp(`${name}=([\w\d]+);`);
                const [, value] = string.match(regExp);
                return value;
            }

            const getCookies = () => {
                const [, chash, hs3, user_id] = response.headers["set-cookie"];
                const cookies = {
                    chash: getCookieValue("chash", chash),
                    user_id: getCookieValue("user_id", user_id),
                    hs3: getCookieValue("hs3", hs3)
                }
                return cookies;
            };

            this.cookies = getCookies();
            return true;
        } catch {
            return false;
        }
    }
    async send_invite(id = 0, author_id) {
        if (Object.values(this.cookies).length === 0) {
            await this.send_message(author_id, "najpierw się zaloguj..");
            return false;
        }

        try {
            const response = await axios(INV_URL, {
                method: "POST",
                data: `t=sendinvite&w=${this.config.world}&id=${id}&h2=${this.cookies.hs3}&security=true`,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36",
                    Cookie: `user_id=${this.cookies.user_id}; chash=${this.cookies.chash}; hs3=${this.cookies.hs3};`,
                    referer: `https://www.margonem.pl/?task=profile&id=${id}`
                }
            });
            const data = response.data;
            await this.send_message(author_id, `\n${id}: ${JSON.stringify(data)}`);
            if (data.ok !== 1) {
                return false;
            }
            return true;
        } catch {
            return false;
        }
    }

    async send_message(author_id, data) {
        const message = `<@${author_id}> ${data}`;
        const channel = client.channels.cache.get(this.config.channelID);
        await channel.send(message);
    }

}

client.on("message", async msg => {
    const [, command] = msg.content.match(/!(\w+)/) || [];

    if (msg.channel.id !== "743604681716269079") return;
    if (msg.author.bot) return;
    if (!["zap", "login"].includes(command)) return;

    if (command === "login") {
        await user.sign_in(msg.author.id);
    }
    if (command === "zap") {
        const ids = msg.content.match(/(\d+)/g) || [];
        for (const id of ids) {
            const zap = await user.send_invite(id, msg.author.id);
            if (!zap) return;
            await sleep();
        }
    }
    return;
})

const userCredentials = new Credentials("wwebpx4ore", "9yl9w1l525c")
const user = new Account(userCredentials);
client.login("NzQzNTg5NTA4MTM3NjE1NDEx.XzW3sQ.J-CZg9HT_cGSDBtSEjno_2grf60");