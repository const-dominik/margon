
const przediał = () => {
    if(window.g.party) {
        for(const nick of Object.keys(window.g.party)) {
            if(clan[nick]) {
                console.log(clan[nick].lvl)
            }
        }
    }
}
//jakieś pytanka cos zmieniasz ? chyba nie mamy funkcji gutlvl.......... to moze byc problem ..  tak musis ja zrobić. bede potrzebowal listy klanowiczy z lvlami do tego najpierw.
// zeby ustalic jaki przedzial bo moge pop prostu
// od hero lvl do hero.lvl * 1,4 + 4 ale co jak wiecej osob bedzie ponizej hero lvl i daloby sie zrobic lepszy przedzial ? DOBRA POJEBANE TO!!!!!!!!!!!!!!!!! 
//moze sprawdac lvl chlopow w grp ? i do tego dawac przedzialy.
/*tworzy obiekt nick: {
    info i potek loopa na window.g.paty i od tego przedial. to jak nie bedzie grupy to robi z pierwszym gosciem ktory przyjdzie jesli nie bedzie zanizal
    a jak nie bedzie to pozniej dostosowywac przedzial jakos ..
}*/
//kieyd dodawac do grp const
//if(heros && (!window.g.party || (window.g.party[window.hero.id].r && Object.keys(window.g.party).length < 10)))

///propounje najpier zrobic obiekt clan. ale lagi mam.................. to wysylaj zapytanie do engine bo ja nie umiem ;) a ja 4 przegladary xD
(() => {
    const parseDataClan = members => {
        const members2 = {};
        for(let i = 0; i < members.length; i += 10) {
            members2[members[i + 1]] = {
                id: parseInt(members[i]),
                lvl: parseInt(members[i + 2]),
                prof: members[i + 3],
                map:  members[i + 4],
                x: parseInt(members[i + 5]),
                y: parseInt(members[i + 6]),
                rankId: parseInt(members[i + 7]),
                online: members[i + 8] === "online" ? true : false,
                lastOnline: members[i + 8] === "online" ? members[i + 8] : parseInt(members[i + 8]),
                icon: members[i + 9]
            };
        };
        return members2;
    };
    const clan = async () => {
        if(window.hero.clan) {
            const request = await fetch(`/engine?t=clan&a=members&ev=${window.g.ev}&browser_token=${window.g.browser_token}&aid=${window.g.aid}`);
            const data = await request.json();
            if(data.members2) {
                const clan = parseDataClan(data.members2);
                if(clan) { 
                    console.table(clan)
                    //proszę sobie przerobić
                }
            }
        }
    };
    clan();
})();