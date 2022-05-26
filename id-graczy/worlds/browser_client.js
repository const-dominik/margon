const socket = new WebSocket("ws://localhost:8080/");

socket.onclose = () => console.log("Connection closed");
socket.onerror = err => console.log(err);
socket.onmessage = async message => {
    const data = JSON.parse(message.data);
    if (data.type !== "error") {
        const file = JSON.parse(data.file);
        await talkTo("Skrzynka pocztowa");
        sendMail(file);
    }
}
socket.onopen = () => {
    getData(capitalize(window.g.worldname));
}

const capitalize = str => str[0].toUpperCase() + str.slice(1);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const getData = world => {
    const request = {
        type: "world",
        data: world
    };
    socket.send(JSON.stringify(request));
}
const talkTo = async name => {
    return new Promise(resolve => {
        for (const [id, {
                nick
            }] of Object.entries(window.g.npc)) {
            if (nick === name) {
                return window._g("talk&id=" + id, res => {
                    if (res.e === "ok" && !res.w) {
                        resolve();
                    } else {
                        return talkTo(name);
                    }
                });
            }
        };
    })
}

const sendMail = async nicks => {
    let i = parseInt(localStorage.getItem("mailLastIndex")) || 0;
    while (i < nicks.length) {
        const nick = nicks[i];
        const message = "Elo elo zapraszam na kanal nysia pozdrawaiam".replace(/\s/g, "%20");
        window._g(`mail&a=send&r=${nick}&gold=&iid=&msg=${message}`, async res => {
            if (res.mailsent === "1" || res.alert && res.alert.startsWith("Ten gracz nie życzy")) {
                console.log("wyslano wiadke")
                i++;
                localStorage.setItem("mailLastIndex", i);
                await sleep(3000 + Math.floor(Math.random() * 789)); 
            } else if (res.e !== "ok" || (res.alert && ["Przed wysłaniem", "Ten gracz ma pełną"].some(str => res.alert.startsWith(str)) || res.w)) {
                continue;
            } else if (res.alert && res.alert.startsWith("Koszt wysłania")) {
                break;
            }
        }); // nie mozesz z funkcji w callbacku przerwac loopa, sprawdzaj zloto przed wyslaniem wiadomosci, napisz se po prostu fetchem to wysylanie
    }
}


const sendMail = async nicks => {
    let i = parseInt(localStorage.getItem("mailLastIndex")) || 0;
    while (i < nicks.length) {
        if (window.hero.gold < 100) break;
        const nick = nicks[i];
        const message = "Elo elo zapraszam na kanal nysia pozdrawaiam".replace(/\s/g, "%20");
        const request = await fetch(`http://${g.worldname}.margonem.pl/engine?t=mail&a=send&r=${nick}&gold=&iid=&msg=${message}&ev=${g.ev + 0.1}&browser_token=${g.browser_token}`);
        const res = await request.json();
        if (res.mailsent === "1" || (res.alert && ["Ten gracz ma pełną", "Ten gracz nie życzy"].some(str => res.alert.startsWith(str)))) {
            i++;
            localStorage.setItem("mailLastIndex", i);
            await sleep(3000 + Math.floor(Math.random() * 789)); 
        } else if (res.e !== "ok" || res.alert || res.w) {
            if (res.alert && res.alert.startsWith("Przed wysłaniem")) {
                await sleep(1000);
            }
            continue;
        }
    }
}