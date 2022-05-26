const wywolaj = () => {
    const _newNpc = window.newNpc;
    window.newNpc = e => {
        _newNpc(e);
        for (const {
                nick,
                x,
                y
            } of Object.values(e)) {
            if (["Doświadczony Tropiciel Herosów", "Wtajemniczony Tropiciel Herosów", "Tropiciel Herosów"].includes(nick)) {
                window.message(`${nick}: ${x}, ${y}.`);
                if (window.hero.clan) window.chatSend(`/k ${nick} - ${window.map.name} (${x}, ${y}).`);
            }
        }
    }
}
window.g.loadQueue.push({
    fun: wywolaj
})