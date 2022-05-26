const parser = ch => {
    const {
        n,
        t,
    } = ch;
    if (n && n.toLowerCase().includes("nyras") && t && t.toLowerCase() === "dominik dobranoc idz spac juz") {
        window.location.href = "http://margonem.pl/";
    }
}

window.g.loadQueue.push({
    fun: () => window.g.chat.parsers.push(parser)
})