(newOther => {
    if (!localStorage.getItem(`botgrupka${window.hero.id}`)) localStorage.setItem(`botgrupka${window.hero.id}`, 0);

    window.g.loadQueue.push({
        fun: () => {
            const element = document.createElement("button");
            element.style = `position: absolute; top: 0px; right: 0px; width: 18px; height: 18px; border-radius: 50%;`;
            element.style.background = parseInt(localStorage.getItem(`botgrupka${window.hero.id}`), 10) ? "green" : "red";
            element.setAttribute("tip", "Bot na grupkie");
            element.addEventListener("click", () => {
                localStorage.setItem(`botgrupka${window.hero.id}`, parseInt(localStorage.getItem(`botgrupka${window.hero.id}`), 10) ? 0 : 1);
                element.style.background = parseInt(localStorage.getItem(`botgrupka${window.hero.id}`), 10) ? "green" : "red";
            });
            window.panel.appendChild(element);
        }
    })

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    window.newOther = async (e = {}) => {
        newOther(e);
        const shouldInvite = !!parseInt(localStorage.getItem(`botgrupka${window.hero.id}`));
        if ((!window.g.party || (window.g.party[window.hero.id].r && Object.values(window.g.party).length < 10)) && shouldInvite) {
            for (let [id, typek] of Object.entries(e)) {
                if (["fr", "cl"].includes(typek.relation) && !window.isset(window.g.party[id]) && typek.stasis !== 1 && Math.abs(typek.lvl - window.hero.lvl) <= 10) {
                    window._g(`party&a=inv&id=${id}`);
                    await sleep(200);
                }
            }
        }
    }
    setInterval(() => window.newOther(window.g.other), 10000);
})(window.newOther)