const querystring = require("querystring");

class Credentials {
    constructor(login, password) {
        this.data = {
            l: login,
            p: password,
            h2: "",
            security: "true"
        };
    }

    get toString() {
        return querystring.stringify(this.data);
    }
}

module.exports = Credentials;