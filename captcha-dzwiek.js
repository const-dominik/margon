const sendToDiscord = async (nick) => {
    await fetch("WH", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: `captcha na ${nick}`
        })
    })
}

const _old = window.parseInput;
window.parseInput = async (data, ...args) => {
    if ((data.captcha && !data.captcha.done) || (data.captcha && data.captcha.autostart_time_left === 60)) {
        await sendToDiscord(window.hero.nick);
        window.location.href = "http://margonem.pl/";
    }
    return _old(data, ...args);
}