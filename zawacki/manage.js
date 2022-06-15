const Account = require("./Account");

const sleep = ms => new Promise(r => setTimeout(r, ms));
const hammer = async (logpass, nick) => {
    const acc = new Account(...logpass);
    const log = await acc.sign_in();
    if (log) {
        while (true) {
            console.log(nick, new Date)
            const character = await acc.create_character("fobos", nick);
            if (character) {
                console.log(`Zajęto nick ${nick} na koncie ${logpass}`);
                break;
            }
            await sleep(100);
        }
    } else {
        await sleep(50);
        return hammer(logpass, nick);
    }
}

const hammers = {
    //nothing to see here!
}

for (const [nick, passy] of Object.entries(hammers)) {
    hammer(passy, nick);
}
