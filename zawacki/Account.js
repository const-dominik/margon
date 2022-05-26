const Credentials = require("./Credentials");
const Instalacja = require("./Instalacja");

class Account {
    constructor(login, password) {
        this.instance = new Instalacja({
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36"
        });
        this.credentials = new Credentials(login, password);
    }

    async sign_in() {
        const url = "https://new.margonem.pl/ajax/login";
        
        const response = await this.instance.post(url, this.credentials.toString);
        
        if (!response || response.ok !== 1) {
            return false;
        }

        const getCookieValue = (name, string) => {
            const regExp = new RegExp(String.raw`${name}=([\w\d]+);`);
            const [, value] = string.match(regExp);
            return value;
        };

        const getCookies = () => {
            const [, chash, hs3, user_id] = response.cookies;
            const cookies = {
                chash: getCookieValue("chash", chash),
                hs3: getCookieValue("hs3", hs3),
                user_id: getCookieValue("user_id", user_id)
            };
            return cookies;
        };

        const cookies = getCookies();
        this.instance.setCookies(cookies);

        return true;
    }

    async create_character(worldname, nick) {
        const url = "https://new.margonem.pl/ajax/createchar";
        const data = `n=${nick}&g=m&p=w&w=#${worldname}&h2=${this.instance.cookies.hs3}&security=true`;
        const response = await this.instance.post(url, data);
        if (response?.msg !== 'Ten pseudonim jest już zajęty.') {
            console.log(response);
        }
        return response && response.ok === 1;
    }
}

module.exports = Account;