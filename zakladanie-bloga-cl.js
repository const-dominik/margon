(pi => {
    window.parseInput = (a, b, c) => {
        shouldUseBless();
        pi(a, b, c);
    }

    const shouldUseBless = () => {
        if (hero.nick === "rzuczek wruc blagam" && hero.gold >= 400000 && window.g.eqItems && !window.g.eqItems[25] && !window.g.battle) {
            window._g("clan&a=skills_use&name=blessing&opt=4&ans=1");
        }
    }
})(window.parseInput)