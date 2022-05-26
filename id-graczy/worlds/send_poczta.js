const talkTo = name => {
    for (const [id, { nick }] of Object.entries(window.g.npc)) {
        if (nick === name) {
            return window._g("talk&id=" + id, res => {
                if (res.e === "ok" && !res.w) {
                    
                } else {
                    talkTo(name);
                }
            });
        }
    };
}