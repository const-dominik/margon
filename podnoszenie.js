const pickItem = e => {
    if (e.key === "f" && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        if (window.g.item.length) {
            for (let [id, {x, y, loc}] of Object.entries(window.g.item)) {
                if (window.hero.x === x && window.hero.y === y && loc === "m") return window._g(`takeitem&id=${id}`);
            }
        }
    }
}
document.addEventListener("keypress", pickItem);