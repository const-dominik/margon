/* (fight => {
    window.fight = e => {
        fight(e);
        if (e.w) {
            if (Object.keys(e.w).some(id => id < 0)) {
                for (let [id, {wt}] of Object.entries(e.w)) {
                    if (id < 0 && wt > 79) return;
                    window._g("fight&a=f");
                }
            } else {
                return;
            }
        }
    }
})(window.fight)*/

(fight => {
    window.fight = e => {
        fight(e);
        if (e.w) {
            let pvp = true, specialMob = false;
            for (let fighter of Object.values(e.w)) {
                if (parseInt(fighter.id) < 0) {
                    pvp = false;
                    if (fighter.wt > 79) specialMob = true;
                }
            }
            if (!pvp && !specialMob) {
                window._g("fight&a=f");
                document.querySelector("#autobattleButton").style.display = none;
            }
        }
    }
})(window.fight)