(() => {
    let butt = document.createElement("button");
    butt.id = "idguziorka";
    butt.style = "position: absolute; background-color: blue; top: 140px; left: 126px; width: 18px; height: 18px; z-index: 30000; border-radius: 50%";
    window.panel.appendChild(butt);

    butt.addEventListener("click", function () {
        for (let i in window.g.other) {
            if (["fr", "cl"].includes(window.g.other[i].relation) && !window.isset(window.g.party[i]) && window.g.other[i].stasis !== 1) window._g(`party&a=inv&id=${window.g.other[i].id}`);
        }
    })
})()