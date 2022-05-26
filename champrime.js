const {
    Client,
    MessageAttachment
} = require('discord.js');
const axios = require("axios");

const bot = new Client();

const correctize = async (text) => {
    const url = "https://api.ikorektor.pl";
    try {
        const response = await axios(url, {
            method: "POST",
            data: `text=${text.replace(/\s+/g, "+")}&key=4e6430bed5&info=1`
        })
        const data = response.data;
        if (data.fails?.suggs) {
            for (const {
                error,
                suggs
            } of Object.values(data.fails)) {
                const regex = new RegExp(error, "g");
                data.text = data.text.replace(regex, suggs[suggs.length - 1]);
            }
        }
        text = data.text.replace(/<[@#]! \d+>/g, a => a.replace(/ /, ""));
        return text;
    } catch (err) {
        console.log(err);
        return false;
    }
}

bot.on('ready', () => {
    console.log('dzialam');
    bot.user.setStatus('invisible');
});

bot.on('message', async (message) => {
    if (message.author.id === "590557143019814924") {
        let text, attachment;
        if (message.attachments.array().length) {
            attachment = new MessageAttachment(message.attachments.first().attachment);
        }
        if (message.content.length) {
            const content = message.content.toLowerCase()
            text = await correctize(content) || content;
        }
        message.channel.send(text, attachment ? attachment : {});
        message.delete();
    }
});


bot.login('NjE0NzkwMzg3NjY3NTY2NTky.XWEmKg.D36EzGz7QwQgW0vCFv3PaLN9ISE');

