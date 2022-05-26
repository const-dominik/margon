(fight => {

    window.fight = log => {
        fight(log);
        if (shouldEscape(log)) ucieczka();
    }
    //// data.myteam jest tylko w pierwszym logu, po f5 zawsze przez fight przechodza wszystkie logi z walki
    // ta funkcja jest zjebana jakas !!!!!! napisz ladna
    const shouldEscape = data => {
        if (data.w) {
            if (data.w[hero.id].hpp < 18) return true;
            const isMob = Object.keys(data.w).some(id => id < 0);
            let myTeam = [];
            let enemyTeam = [];
            const alwaysEscape = ["Bugha", "Zdanio"];
            for (let {
                    lvl,
                    team,
                    name
                } of Object.values(data.w)) {
                team === data.myteam ? myTeam.push(lvl) : enemyTeam.push(lvl);
                if (alwaysEscape.includes(name)) return true;
            }
            if (!isMob) {
                //if (enemyTeam.some(lvl => Math.abs(lvl - window.hero.lvl) >= 15)) return true; - jesli ktorys z enemy ma wiecje niz 15 lvli przewagi
                if (data.myteam !== 1) return true; // jesli tylko ktos mnie zaatakuje
            } else {
                if (data.myteam !== 1 && enemyTeam.some(lvl => lvl - window.hero.lvl >= 20)) return true; // ktorys z enemy ma wiecej niz 20 lvli przewagi
            }
        }
    }

    const ucieczka = () => {
        const id = localStorage.getItem(`ucieczka${hero.id}`);
        window._g(`moveitem&id=${id}&st=1`, res => {
            if (res.e === "ok" && res.f && res.f.close === 1) tepek()
            else setTimeout(ucieczka, 100);
        })
    }

    const tepek = () => {
        const id = localStorage.getItem(`ucieczkatepek${hero.id}`);
        window._g(`moveitem&id=${id}&st=1`, res => {
            if (res.e !== "ok" || res.f.close !== 1) setTimeout(tepek, 5);
        })
    }

    const isReadyToUse = timelimit => {
        const limit = timelimit.split(",");
        if (!limit[1]) return true;
        if (limit[1] < window.unix_time()) return true;
        return false;
    };

    const updateItems = () => {
        if (window.g.item.length) {
            const ucieczka = localStorage.getItem(`ucieczka${window.hero.id}`);
            const tepek = localStorage.getItem(`ucieczkatepek${window.hero.id}`);
            if (!ucieczka || !window.g.item[ucieczka] || !isReadyToUse(window.parseItemStat(window.g.item[ucieczka].stat).timelimit)) {
                for (let {
                        id,
                        stat,
                        loc
                    } of Object.values(window.g.item)) {
                    if (window.parseItemStat(stat).action === "flee" && isReadyToUse(stat.timelimit) && loc === "g") {
                        return localStorage.setItem(`ucieczka${window.hero.id}`, id);
                    }
                }
            }
            if (!tepek || !window.g.item[tepek]) {
                for (let {
                        id,
                        name,
                        stat,
                        loc
                    } of Object.values(window.g.item)) {
                    const staty = window.parseItemStat(stat);
                    if (name === "Zwój teleportacji Karka-han" && loc === "g" && !!staty.teleport && (staty.timelimit ? isReadyToUse(staty.timelimit) : true)) {
                        localStorage.setItem(`ucieczkatepek${window.hero.id}`, id);
                        break;
                    }
                }
            }
        } else {
            setTimeout(updateItems, 200);
        }
    }

    window.g.loadQueue.push({
        fun() {
            updateItems();
        }
    })

})(window.fight)



/*
nicki always escape - zrb
jesli ktos z enemy ma 15/20 lvli wiecej od ciebie to ucieczka
jesli jestes solo w walce z mobem i mob zaatakowal ciebie sam i ma z 30 albo huj wie ile lvli wiecej to ucieczka
jesli jestes w grupie i mob cb zaatakowal i rzonica lvli miedzy tw teammate z najwiekszym lvlem a mobem jest mniejsza niz idk z 40 to nie ucieczka, tu tez trzeba jeszcze pomyslec
ucieczka jak masz mniej niz 18%
*/