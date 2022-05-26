const throwItem = e => {
    if (e.key === "g" && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        if (window.g.item.length) {
            for (let [id, {name, loc}] of Object.entries(window.g.item)) {
                if (loc === "g" && name === "Jajo olbrzymiego pająka") return window._g(`moveitem&id=${id}&st=-1`);
            }
        }
    }
}
document.addEventListener("keypress", throwItem);