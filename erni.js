const { Client, MessageAttachment } = require('discord.js');
const axios = require("axios");

const bot = new Client();

bot.on('ready', () => {
    console.log('dzialam');
});

bot.on('message', async (message) => {
    if (message.content.startsWith("!popraw")) {
        const text = message.content.match("!popraw (.+)")?.[1];
        const url = "https://api.ikorektor.pl";
        try {
            const response = await axios(url, {
                method: "POST",
                data: `text=${text.replace(/\s+/g, "+")}&key=4e6430bed5&info=1`
            })
            const data = response.data;
            if (data.fails?.suggs) {
                for (const {error, suggs} of Object.values(data.fails)) {
                    const regex = new RegExp(error, "g");
                    data.text = data.text.replace(regex, suggs[suggs.length - 1]);
                }
            }
            data.text = data.text.replace(/<[@#]! \d+>/g, a => a.replace(/ /, ""));
            message.channel.send(data.text);
        } catch (err) {
            console.log(err);
        }
    }
});

bot.login('NjE0NzkwMzg3NjY3NTY2NTky.XWEmKg.D36EzGz7QwQgW0vCFv3PaLN9ISE');