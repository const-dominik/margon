((mapy, pi) => {
    window.g.loadQueue.push({
        fun() {
            if (Object.keys(mapy).includes(window.map.name)) {
                document.getElementById("ground").style["background-image"] = `url(${mapy[window.map.name]})`;
            }
        }
    })
    window.parseInput = (d, callback, xhr) => {
        if (d.town) zmienMape();
        pi(d, callback, xhr);
    }
})({
    "Karka-han": "link",
    "Ithan": "link",
    "Ruiny Tass Zhil": "/obrazki/miasta/karka-han.4.png"
}, window.parseInput)