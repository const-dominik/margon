const AUDIO = new Audio("http://soundbible.com/grab.php?id=2207&type=mp3");

const _oldNpc = window.newNpc;
window.newNpc = (npcs = {}) => {
    const ret = _oldNpc(npcs);
    for (const { wt, lvl, nick } of Object.values(npcs)) {
        if (lvl && nick && wt > 100) {
            if (window.hero.clan) {
                window.chatSend(`/k ${nick} - ${lvl} na mapie ${window.map.name}.`);
            }
            AUDIO.play();
        }
    }
    return ret;
}