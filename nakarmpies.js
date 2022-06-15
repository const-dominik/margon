const Discord = require("discord.js");

const bocisko = new Discord.Client();

bocisko.on('ready', () => {
    bocisko.channels.get("576142829370212354").send("Elo https://www.margonem.pl/?task=forum&show=posts&id=508492&ps=0#post43707928 @everyone");
});

bocisko.login("");
