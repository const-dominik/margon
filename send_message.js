const rp = require("request-promise");
const tough = require("tough-cookie");
const querystring = require("querystring");
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

const cookie = new tough.Cookie({
    key: "PHPSESSID",
    value: "43tccu5aipabde51khu02fuol9",
    domain: "support.garmory.pl",
    httpOnly: true,
    maxAge: 31536000
});

const cookiejar = rp.jar();
cookiejar.setCookie(cookie, "http://support.garmory.pl");

const options = {
    method: "POST",
    uri: "https://support.garmory.pl/a/margonem.pl/pl/ticket/new?category=38",
    jar: cookiejar,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
};

const form = {
    "CSRFName": "csrf",
    "CSRFToken": "support_a1bc97732d97b1e88ce8396c216",
    "form[world]": ""
};

const sendEmail = async answer => {
    console.time("requestTime");
    form["form[custom]"] = `Cześć, zajmuję slota na świat prywatny, odpowiedź to ${answer}`;
    options.body = querystring.stringify(form);
    try {
        const data = await rp(options);
        console.log("success");
        const ticketId = getTicketId(data);
        if(!ticketId) {
            console.log("BAGGGGGGGGGGGG");
        } else {
            console.log(`TicketId: ${ticketId}`);
        }
        console.timeEnd("requestTime");
    } catch(err) {
        console.log(`StatusCode: ${err.statusCode}`);
        console.log("If its 302 it works!");
        const ticketId = getTicketId(err);
        if(!ticketId) {
            console.log("BAGGGGGGGGGGGG");
        } else {
            console.log(`TicketId: ${ticketId}`);
        }
        console.timeEnd("requestTime");
    }
};
const getTicketId = (data = {}) => {
    if(!data.response || !data.response.headers || !data.response.headers.location) {
        return;
    }
    const location = String(data.response.headers.location);
    if(!location.startsWith("/a/margonem.pl/pl/ticket/show?id=")) {
        return;
    }
    const regex = /(\d+)/g;
    if(regex.test(location)) {
        const [id] = location.match(regex);
        return parseInt(id, 10);
    }
};

readline.question("Jaka odp na pytanie? ", answer => {
    sendEmail(answer);
    readline.close();
})