(() => {
    (battleMsg => {
        if (!localStorage.getItem("deduwa")) {
            localStorage.setItem("deduwa", JSON.stringify(new Object()));
        }
        const dedanko = ["Duch arystokraty", "Antyczny skrytobójca", "Starożytny legionista", "Imperialny oszczepnik", "Nekrolord Wernoradu", "Imperialny gwardzista"];
        window.battleMsg = (a, b) => {
            if (a.includes("loser=")) {
                let x = unix_time();
                const licznikdedania = JSON.parse(localStorage.getItem("deduwa"));
                const nicki = a.split("loser=")[1].split(", ");
                for (const i in nicki) {
                    if (dedanko.includes(nicki[i])) {
                        if (licznikdedania[nicki[i]]) {
                            licznikdedania[nicki[i]].val = licznikdedania[nicki[i]].val + 1;
                        } else {
                            licznikdedania[nicki[i]] = {
                                val: 1
                            }
                        }
                        localStorage.setItem("deduwa", JSON.stringify(licznikdedania));
                    }
                }
            }
            return battleMsg(a, b);
        }
    })(window.battleMsg);
    document.querySelector('#lagmeter').addEventListener('click', () => {
        const licznikdedania = JSON.parse(localStorage.getItem("deduwa"));
        const puszek = new Array;
        for (const i in licznikdedania) {
            puszek.push(i);
        }
        const playerContainter = document.createElement('div');
        playerContainter.id = 'player_container';

        puszek.forEach(nick => {
            const player = document.createElement('div');
            player.classList.add('online_player');
            player.textContent = `${nick}: ${licznikdedania[nick].val}`;
            playerContainter.appendChild(player);
        });

        window.mAlert(playerContainter.outerHTML, 0, () => document.querySelector('#player_container').remove());
    });

    const style = document.createElement('style');
    const css = `
#player_container {
width: 370px;
min-height: 100px;
max-height: 400px;
display: inline-block;
text-align: center;
overflow: hidden;
overflow-y: scroll;
}
.online_player { 
border: 1px solid #694b0e;
padding: 3px 8px 3px;
display: inline-block;
width: 250px;
margin: 1px;
background: #1b1717;
font-size: 13px;
line-height: 13px;
cursor: pointer;
color: orange;
box-sizing: border-box;
text-decoration: none;
text-align: center;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
}
`;
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
})();