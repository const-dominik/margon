// ==UserScript==
// @name         sellanie botowe zwuj sklepu
// @version      1
// @author       ja
// @match        http://ataentsic.margonem.pl/
// @grant        none
// ==/UserScript==

(btlmsg => {
  let itemy = [];
  let sprzedaj = ["Mikstura imperialnego żołnierza", "Kryza skrytobójcy", "Szlacheckie bransolety", "Apogeum zimna", "Buty wysokiego kapłana", "Buty przydziałowe"];

  window.battleMsg = (a, b) => {
    if (a.includes("winner=")) {
      if (!window.findEmptyBagPlace() && !window.g.battle) {
        g.lock.add('sellanko');
        window._g(`moveitem&id=${znajdzZwuj("Pomoc w interesach")}&st=1,`);
        setTimeout(() => sell(), 500);
      }
    }
    btlmsg(a, b);
  }

  const znajdzZwuj = nazwa => {
    for (let i in g.item) {
      if (g.item[i].name === nazwa) return g.item[i].id;
    }
  }

  const doSprzedania = (tip, nazwa, loc) => {
    let dupa = ["legendarny", "heroiczny", "unikat", "ulepszony", "Klucze", "Konsumpcyjne", "Torby", "Talizmany", "Związany z właścicielem", "Złoto", "Mikstury", "Questowe"];
    if (!["h", "t".includes(hero.prof)]) dupa.push("Strzały");
    for (let i in dupa) {
      if (tip.includes(dupa[i]) || nazwa.includes("runa") || loc !== "g") {
        return false;
      }
    }
    return true;
  }

  const sell = () => {
    for (let item of Object.values(window.g.item)) {
      if (document.getElementById("shop").style.display !== "block" && doSprzedania(item.tip, item.name, item.loc) || sprzedaj.includes(item.name)) {
        itemy.push(item.id);
      } else if (item.name === "Pomoc w interesach") {
        let obj = parseItemStat(item);
        if (obj.amount <= 15) window._g(`shop&buy=${item.id},1&sell=`);
      } else if (item.name === "Błogo na lot") {
        let obj2 = parseItemStat(item);
        if (obj2.amount < 5) window._g(`shop&buy=${item.id},1&sell=`);
      }
    }
    window._g(`shop&buy=&sell=${itemy.length !== 0 ? itemy.join(","): ""}`, res => {
      window.shop_close(true);
      g.lock.remove('sellanko');
    });
  }
})(window.battleMsg)