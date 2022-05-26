(li => {
    const nasior = {
        "icon": "nas/mad_n3.gif",
        "stat": "crit=3;critmval=6;critval=6;da=172;evade=44;heal=486;hp=3237;legbon=holytouch,218;legendary;lowevade=22;lvl=218;opis=Legenda głosi, iż najsilniejszy ze wszystkich<br>maddoków zwał się Mocny Maddoks. Jedni<br>mówią, że to wszystko przez hektolitry<br>nektaru, który ciągle pił. Inni, że to przez ten<br>naszyjnik...;sa=172;slow=70;soulbound",
        "tip": "<b>Legendarna moc Maddoksa</b><b class=legendary>* legendarny *</b><span class=\"type-text\">Typ:  Naszyjniki</span><br />Cios krytyczny +3%<br>Siła krytyka magicznego +6%<br>Siła krytyka fizycznego +6%<br>Wszystkie cechy +172<br>Unik +44<br>Przywraca 486 punktów życia podczas walki<br>Życie +3237<br>Podczas ataku unik przeciwnika jest mniejszy o 22<br>SA +1.72<br>Obniża SA przeciwnika o 0.7<br><i class=legbon>Dotyk anioła: podczas ataku 7% szansy na leczenie ran w ciągu trzech najbliższych tur.</i><i class=idesc>Legenda głosi, iż najsilniejszy ze wszystkich<br>maddoków zwał się Mocny Maddoks. Jedni<br>mówią, że to wszystko przez hektolitry<br>nektaru, który ciągle pił. Inni, że to przez ten<br>naszyjnik...</i>Wiąże po założeniu<br><b class=\"att\">Wymagany poziom: 218</b><br>Wartość: 399.73k"
    }
    window.lootItem = i => {
        i.stat = nasior.stat;
        i.tip = nasior.tip;
        i.icon = nasior.icon;
        return li(i);
    }
})(window.lootItem)