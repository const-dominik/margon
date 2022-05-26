(newOther => {
    g.loadQueue.push({ fun () {
    if (!localStorage.getItem(`uciekanko-${window.hero.nick}`)) {
        localStorage.setItem(`uciekanko-${window.hero.nick}`, JSON.stringify({
            nicks: {
                escape: [],
                stay: []
            },
            lvlTp: -window.hero.lvl,
            escape: true,
            escapeAll: false,
            escapeFriends: false,
            leaveAfterTp: false,
            tp: "Kamień teleportujący do Ithan",
            emergencyTp: "Zwój teleportacji na Kwieciste Przejście"
        }))
    };
    }});

    const sendToDiszkort = (title, description, webhook_url) => {
        fetch(webhook_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                embeds: [{
                    title: title,
                    description: description,
                }],
            })
        })
    };
    const uciekanko = (tp, emergency) => {
        const teleport = findTp(tp) || findTp(emergency);
        if (teleport) {
            const [tpId, tpMapId] = teleport;
            return tepaj(tpId, tpMapId);
        }
    };
    const tepaj = (id, mapId) => {
        if (window.g.battle) {
            return setTimeout(tepaj, 5, id, mapId);
        }
        if (window.map.id !== parseInt(mapId)) {
            if (!window.g.item[id]) {
                return uciekanko();
            }
            return window._g(`moveitem&id=${id}&st=1`, setTimeout(tepaj, 5, id, mapId));
        }
    };
    const findTp = itemName => {
        if (window.g.item.length > 0) {
            for (const [id, {name, loc}] of Object.entries(window.g.item)) if (loc === "g" && name === itemName) return checkTpAvailability(id);
        } else {
            setTimeout(uciekanko, 50, itemName);
        }
    };
    const checkTpAvailability = id => {
        const staty = window.parseItemStat(window.g.item[id].stat);
        if (staty.teleport) {
            const mapId = staty.teleport.split(",")[0];
            if (staty.timelimit) {
                let ts = window.unix_time();
                let min = staty.timelimit.split(",")[1];
                if (min && ts > min) return [id, mapId];
            } else {
                return [id, mapId];
            }
        } else {
            return;
        }
    };

    window.newOther = (players = {}) => {
        const uciekanie = JSON.parse(localStorage.getItem(`uciekanko-${window.hero.nick}`));
        for (const [id, {
                del,
                nick,
                lvl,
                relation
            }] of Object.entries(players)) {
            if (!del && nick && lvl && relation) {
                if (uciekanie.escape && window.map.pvp === 2 &&
                    (lvl >= window.hero.lvl + uciekanie.lvlTp &&
                        !uciekanie.nicks.stay.includes(nick) || uciekanie.nicks.escape.inludes(nick) || uciekanie.escapeAll)) {
                    window.g.delays.limit = 100;
                    uciekanko(uciekanie.tp, uciekanie.emergencyTp);
                    sendToDiszkort("Uciekańsko", `Próbowałem uciec przed ${nick} ${lvl} na mapie ${window.map.name}`, "https://discordapp.com/api/webhooks/643534103928373269/7ehFTBULCEQq73fuV6bkXiEpSD_QCHLyuO8PcF8kbkoiuas_E4XR5wffta7wrSP-xYo-");
                }
            }
        }
        newOther(players);
    }
})(window.newOther);