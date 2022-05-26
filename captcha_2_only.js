const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getRandomTime = () => Math.floor((Math.random() * 7000).toFixed(3)) + 5000;

const _old = window.parseInput;
window.parseInput = async (data, b, c) => {
    if (data.captcha && data.captcha.content && !data.captcha.done) {
        resolveCaptcha(data.captcha.content);
    } else if (data.captcha && data.captcha.autostart_time_left === 60) {
        await sleep(getRandomTime());
        window._g("captcha&start=1");
        const cap = document.querySelector("#pre-captcha");
        if (cap) cap.style.display = "none";
    }
    return _old(data, b, c);
};

const resolveCaptcha = async (captcha) => {
    const answers = captcha.question.options;
    const question = captcha.question.text;
    if (!Array.isArray(answers)) {
        return;
    }
    if (/Zaznacz odpowiedź '(.*)' aby grać dalej/.test(question)) {
        const [, answer] = question.match(/Zaznacz odpowiedź '(.*)' aby grać dalej/);
        if (answer) {
            const urlAnswer = `captcha&answerId=${answers.findIndex((el) => el === answer)}`;
            await sleep(getRandomTime());
            if (window.g.init <= 4) {
                window.sendFirstInit(`&${urlAnswer}`);
            } else {
                odp(urlAnswer);
            }
        }
    }
};

const odp = (url) => {
    window._g(url, (res) => {
        if (!res || res.e !== "ok" || res.w || (res.captcha && !res.captcha.done)) {
            setTimeout(odp, 300, url);
        }
    });
};