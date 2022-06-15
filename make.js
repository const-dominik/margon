const _oldParseInput = window.parseInput;
window.parseInput = async (data, ...args) => {
    const ret = _oldParseInput(data, ...args);
    if (data.t === "stop" && /^Nie jesteś zalogowany/.test(data.alert)) {
        const req = await fetch("https://new.margonem.pl/ajax/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Referer": "https://new.margonem.pl/"
            },
            data: "l=kontonakolos1&p=biologia123&h2=&security=true"
        });
        const resp = await req.json();
        console.log(resp);
    }
    return ret;
}
