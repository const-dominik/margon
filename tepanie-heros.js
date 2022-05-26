(newnpc => {
    window.newNpc = a => {
        newnpc(a);
        for (let h in a) {
            if (a[h].wt>79 && a[h].wt<=99) tepek(findTp("nazwa tp"));
        }
    }

    const findTp = nazwa => {
        for (let [id, { name }] of Object.entries(g.item)) {
            if (name === nazwa) return id;
        }
    }

    const tepek = id => {
        if (window.g.battle) {
            return setTimeout(tepek, 1, id);
        } else {
            return window._g(`moveitem&id=${tpId}&st=1`, setTimeout(tepek, 5, id));
        }
    }
})(window.newNpc);
