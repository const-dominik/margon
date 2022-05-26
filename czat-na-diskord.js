const sendToDiscord = (descr) => {
    fetch("https://discordapp.com/api/webhooks/680530273577730082/miMwfY2ZEz4DpA6Om9P_b9IeIXj7byCHHYQuX0xd-IlspIvkONjA9B-injIiCi7i60QQ", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: `${descr}`
        }),
    });
}

const parser = ch => {
    const {
        k,
        n,
        s,
        t,
        ts
    } = ch;
    if (n && n !== window.hero.nick && !s && window.g.ev - ts <= 4) {
        const toSend = `${["O", "K", "G", "P"][k]} **${n}**: (${(new Date).toLocaleTimeString()}) ${t}`;
        sendToDiscord(toSend);
    }
}
window.g.chat.parsers.push(parser);