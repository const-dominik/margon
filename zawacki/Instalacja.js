const axios = require("axios");

class Instalacja {
    constructor(headers) {
        this.instance = axios.create({
            headers
        });
        this.cookies = {};
    }

    parseCookies() {
        const ret = [];

        for (const [name, value] of Object.entries(this.cookies)) {
            ret.push([name, value].join("="));
        }

        return ret.join("; ");
    }
    setCookie(name, value) {
        this.cookies[name] = value;

        this.instance.defaults.headers.Cookie = this.parseCookies();
    }

    setCookies(data) {
        for (const [name, value] of Object.entries(data)) {
            this.setCookie(name, value);
        }
    }

    setReferer(data) {
        this.instance.defaults.headers.Referer = data;
    }

    async post(url, data = {}) {
        try {
            const response = await this.instance.post(url, data);
            if (response.headers["set-cookie"]) {
                if (!response.data) {
                    response.data = {};
                }
                response.data.cookies = response.headers["set-cookie"];
            }
            return response.data;
        } catch(err) {
            console.log(String(err), url);
            return false;
        }
    }

    async get(url) {
        try {
            const response = await this.instance.get(url);
            return response.data;
        } catch(err) {
            console.log(String(err), url);
            return false;
        }
    }
}

module.exports = Instalacja;