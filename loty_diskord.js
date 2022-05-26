(li => {
    const createEmbed = (ranga, nazwa, lvl, grafika) => {
        const color = ["2082580", "1598706", "16770340"][ranga];
        const embed = {
            'title': `${window.hero.nick} zdobył itemek!`,
            'color': color,
            'description': `${nazwa} (${lvl} lvl)`,
            'thumbnail': {
                'url': `http://nubes.margonem.pl/obrazki/itemy/${grafika}`
            }
        };
        return embed;
    }

    const sendToDiscord = embed => {
        fetch("https://discordapp.com/api/webhooks/708718718380671096/FMB-FPqzDWbuJ2t1QEcB-VYBXCB-UGY4x1L7A0oh01ye4L-qIpsNHAdROdITLPp76pZh", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "embeds": [embed]
            })
        })
    }

    window.lootItem = item => {
        li(item);
        const {name, icon, stat} = item;
        const stats = window.parseItemStat(stat);
        const lvl = stats.lvl;
        const ranga = stats.hasOwnProperty("unique") ? 0 : stats.hasOwnProperty("heroic") ? 1 : stats.hasOwnProperty("legendary") ? 2 : null;
        if (ranga !== null) sendToDiscord(createEmbed(ranga, name, lvl, icon));
    }
})(window.lootItem)