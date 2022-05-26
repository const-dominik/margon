const Discord = require("discord.js");
const bocisko = new Discord.Client({
    disableEveryone: false
});

bocisko.on("ready", () => {
    bocisko.channels.get("629735092365033493").send(`@everyone`);
})

bocisko.login("NjE0NzkwMzg3NjY3NTY2NTky.Xc9GjA.I3ERyG_M8VDxOtkyqJnFOstSCAM");