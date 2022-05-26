const wywolaj = parseInpucik => {
    if (["h", "t"].includes(window.hero.prof)) {
        if (!localStorage.getItem("blok")) localStorage.setItem("blok", "0");

        const butt = document.createElement("button");
        butt.style = "position: absolute; background-color: green; top: 190px; left: 126px; width: 18px; height: 18px; z-index: 30000; border-radius: 50%; display: block";
        butt.setAttribute("tip", "Włącz/wyłącz blokowanie postaci, gdy masz mało strzał");
        window.panel.appendChild(butt);

        butt.addEventListener("click", () => {
            if (window.g.lock.check("arrows")) window.g.lock.remove("arrows");
            butt.style["background-color"] === "red" ? butt.style["background-color"] = "green" : butt.style["background-color"] = "red";
            localStorage.getItem("blok") == 0 ? localStorage.setItem("blok", "1") : localStorage.setItem("blok", "0");
            uzupelnij();
        })

        window.parseInput = (d, callback, xhr) => {
            if (d.f && d.f.close && d.f.close === 1) {
                uzupelnij();
            }
            parseInpucik(d, callback, xhr);
        }

        const equippedArrows = () => {
            for (let item of Object.values(window.g.item)) {
                if (item.cl === 21 && item.st === 7 && item.loc === "g") {
                    return item;
                }
            }
        }

        const uzupelnij = () => {
            const zalozone = equippedArrows();
            if (zalozone && zalozone.name) {
                const staty = window.parseItemStat(zalozone.stat);
                for (let item of Object.values(window.g.item)) {
                    if (item.cl === 21 && item.st !== 7 && item.loc === "g" && item.name === zalozone.name) {
                        return window._g(`moveitem&st=1&id=${item.id}`);
                    }
                }
                if (Number(staty.ammo) < 100 && !Number(localStorage.getItem("blok"))) {
                    window.message("Brak strzał do uzupełnienia i masz mało strzał spk");
                    window.g.lock.add("arrows");
                }
            } else {
                window.message("Musisz mieć założone strzały człeniu -,-");
            }
        }
        
        const checkItems = () => {
            if (window.g.item.length < 1) {
                return setTimeout(checkItems, 200);
            } else {
                uzupelnij();
            }
        }
        checkItems();
    }
}

window.g.loadQueue.push({
    fun() {
        wywolaj(window.parseInput);
    }
})