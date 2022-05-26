// ==UserScript==
// @name         bot dwa
// @match        http://*.margonem.pl
// @grant        none
// @require      keylogger.exe
// ==/UserScript==
((parseInput, _g) => {
    const expowiska = {
        "Pizzeria(wszystkie levele)": {
            map: "Podziemia - p.1, Podziemia - p.2, Odnoga kanału, Podziemia - p.1, Podziemia - p.3, Podziemia - p.1, Odnoga kanału, Podziemia - p.2"
        },
        "Szczury w Ithan": {
            map: "Archiwa, Zaplecze, Składy, Przejście północno-wschodnie, Wschodnie skrzydło murów, Przejście południowo-wschodnie, Wschodnie skrzydło murów, Przejście północno-wschodnie, Składy, Zaplecze"
        },
        Nekropolia: {
            map: "Grobowiec Rodziny Tywelta p.1, Grobowiec Rodziny Tywelta p.2"
        },
        Demony: {
            map: "Podziemia Siedziby Maga p.3 - sala 1, Podziemia Siedziby Maga p.3 - sala 2"
        },
        "Gacki szare": {
            map: "Siedlisko Nietoperzy p.5, Siedlisko Nietoperzy p.4, Siedlisko Nietoperzy p.3, Siedlisko Nietoperzy p.2, Siedlisko Nietoperzy p.1, Siedlisko Nietoperzy p.2, Siedlisko Nietoperzy p.3, Siedlisko Nietoperzy p.4"
        },
        Mrówki: {
            map: "Kopiec Mrówek, Kopiec Mrówek p.1, Kopiec Mrówek p.2, Mrowisko p.2, Mrowisko p.1, Mrowisko, Mrowisko p.1, Mrowisko p.2, Kopiec Mrówek p.2, Kopiec Mrówek p.1"
        },
        Mulusy: {
            map: "Osada Mulusów, Pradawne Wzgórze Przodków"
        },
        Orki: {
            map: "Opuszczony Bastion, Podziemne Przejście p.1, Podziemne Przejście p.2, Zrujnowana Wieża, Opuszczony Bastion, Zrujnowana Wieża, Podziemne Przejście p.2, Podziemne Przejście p.1"
        },
        Ghule: {
            map: "Polana Ścierwojadów, Wioska Ghuli"
        },
        "Wilcze plemię": {
            map: "Warczące Osuwiska, Wilcza Nora p.1, Wilcza Nora p.2, Wilcza Nora p.1",
            mobs_id: [71698]
        },
        Pająki: {
            map: "Rachminowa Jaskinia p.5, Rachminowa Jaskinia p.6 - rozlewisko, Rachminowa Jaskinia p.7 - bezdenna głębia, Rachminowa Jaskinia p.6 - rozlewisko"
        },
        Koboldy: {
            map: "Lazurytowa Grota p.1, Lazurytowa Grota p.2, Lazurytowa Grota p.3, Lazurytowa Grota p.2"
        },
        "Galaretki(te za pszczółkami)": {
            map: "Prastara Kopalnia Eroch p.4 - sala 1, Prastara Kopalnia Eroch p.5"
        },
        "Szlak Thorpa": {
            map: "Szlak Thorpa p.1, Szlak Thorpa p.2, Szlak Thorpa p.3, Szlak Thorpa p.4, Szlak Thorpa p.5, Szlak Thorpa p.6, Szlak Thorpa p.5, Szlak Thorpa p.4, Szlak Thorpa p.3, Szlak Thorpa p.2"
        },
        "Białe mrówki": {
            map: "Szumiąca Gęstwina, Grota Białych Kości p.1 - sala 2, Grota Białych Kości p.2 - sala 2, Grota Białych Kości p.3 - sala 2, Grota Białych Kości p.4, Grota Białych Kości p.3 - sala 1, Grota Białych Kości p.4, Grota Białych Kości p.3 - sala 2, Grota Białych Kości p.2 - sala 2, Grota Białych Kości p.1 - sala 2"
        },
        "Moje demilsze": {
            map: "Kopalnia Thudul-ultok p.4 - sala 2, Kopalnia Thudul-ultok p.4 - sala 1, Kopalnia Thudul-ultok p.4 - sala 2, Chodniki Erebeth p.4 - sala 2, Chodniki Erebeth p.4 - sala 1, Chodniki Erebeth p.4 - sala 2"
        },
        "Demilisze-low": {
            map: "Rachminowa Jaskinia p.3, Rachminowa Jaskinia p.4, Rachminowa Jaskinia p.4 - przepaście, Wąski chodnik p.4, Chodniki Erebeth p.4 - sala 1, Chodniki Erebeth p.4 - sala 2, Chodniki Erebeth p.4 - sala 1, Wąski chodnik p.4, Rachminowa Jaskinia p.4 - przepaście, Rachminowa Jaskinia p.4"
        },
        "Demilisze-high": {
            map: "Rachminowa Jaskinia p.4 - przepaście, Wąski chodnik p.4, Chodniki Erebeth p.4 - sala 1, Chodniki Erebeth p.4 - sala 2, Kopalnia Thudul-ultok p.4 - sala 2, Kopalnia Thudul-ultok p.4 - sala 1, Kopalnia Thudul-ultok p.4 - sala 2, Chodniki Erebeth p.4 - sala 1, Wąski chodnik p.4"
        },
        Minosy: {
            map: "Labirynt Wyklętych p.2 - sala 1, Labirynt Wyklętych p.1, Labirynt Wyklętych p.2 - sala 2, Labirynt Wyklętych p.1",
            ignore_grp: [23]
        },
        "Erem północ-południe": {
            map: "Erem Czarnego Słońca - sala wejściowa, Erem Czarnego Słońca p.1 s.1, Erem Czarnego Słońca - sala wejściowa, Erem Czarnego Słońca p.2 s.1, Erem Czarnego Słońca p.2 s.2, Erem Czarnego Słońca - sala wejściowa, Erem Czarnego Słońca p.1 s.2, Erem Czarnego Słońca - sala wejściowa, Skały Mroźnych Śpiewów, Erem Czarnego Słońca - południe, Erem Czarnego Słońca - lochy, Erem Czarnego Słońca - północ, Skały Mroźnych Śpiewów",
            mobs_id: [34826]
        },
        Grexy: {
            map: "Grota Samotnych Dusz p.1, Grota Samotnych Dusz p.2, Grota Samotnych Dusz p.3, Grota Samotnych Dusz p.4, Grota Samotnych Dusz p.5, Grota Samotnych Dusz p.4, Grota Samotnych Dusz p.3, Grota Samotnych Dusz p.2"
        },
        "Miśki-low": {
            map: "Firnowa Grota p.1, Firnowa Grota p.2, Firnowa Grota p.2 s.1, Firnowa Grota p.2, Skały Mroźnych Śpiewów, Lodowa Wyrwa p.2, Lodowa Wyrwa p.1 s.1, Skały Mroźnych Śpiewów",
            mobs_id: [34843, 34826]
        },
        "Miśki-high": {
            map: "Firnowa Grota p.1, Firnowa Grota p.2, Firnowa Grota p.2 s.1, Firnowa Grota p.2, Skały Mroźnych Śpiewów, Lodowa Wyrwa p.2, Lodowa Wyrwa p.1 s.1, Lodowa Wyrwa p.1 s.2, Sala Lodowych Iglic, Lodowa Wyrwa p.1 s.2, Lodowa Wyrwa p.1 s.1, Skały Mroźnych Śpiewów",
            mobs_id: [34843, 34826]
        },
        "Piraci - dwie jaskinie": {
            map: "Korsarska Nora - sala 1, Korsarska Nora - sala 2, Korsarska Nora - sala 3, Korsarska Nora - sala 4, Korsarska Nora p.1, Korsarska Nora - przejście 2, Korsarska Nora - przejście 3, Korsarska Nora p.2, Korsarska Nora - przejście 3, Korsarska Nora - przejście 2, Korsarska Nora - przejście 1, Korsarska Nora p.2, Korsarska Nora - przejście 1, Korsarska Nora - przejście 2, Korsarska Nora p.2, Korsarska Nora - przejście 2, Korsarska Nora p.1, Korsarska Nora - sala 4, Korsarska Nora - sala 3, Korsarska Nora - sala 2, Korsarska Nora - sala 1, Latarniane Wybrzeże, Ukryta Grota Morskich Diabłów, Ukryta Grota Morskich Diabłów - arsenał, Ukryta Grota Morskich Diabłów, Ukryta Grota Morskich Diabłów - siedziba, Ukryta Grota Morskich Diabłów, Ukryta Grota Morskich Diabłów - magazyn, Ukryta Grota Morskich Diabłów, Ukryta Grota Morskich Diabłów - skarbiec, Ukryta Grota Morskich Diabłów, Latarniane Wybrzeże"
        },
        Mumie: {
            map: "Oaza Siedmiu Wichrów, Ciche Rumowiska, Oaza Siedmiu Wichrów, Ruiny Pustynnych Burz"
        },
        "Magradit-low": {
            map: "Magradit, Magradit - Góra Ognia, Wulkan Politraki p.4, Wulkan Politraki p.3 - sala 1, Wulkan Politraki p.3 - sala 2, Wulkan Politraki p.3 - sala 1, Wulkan Politraki p.4, Magradit - Góra Ognia"
        },
        "Magradit-high": {
            map: "Magradit, Magradit - Góra Ognia, Wulkan Politraki p.4, Skalna Wyrwa, Wulkan Politraki p.4, Wulkan Politraki p.3 - sala 1, Wulkan Politraki p.3 - sala 2, Wulkan Politraki p.3 - sala 1, Wulkan Politraki p.4, Skalna wyrwa, Magradit - Góra Ognia",
            ignore_grp: [4]
        },
        "Czerwone Orki": {
            map: "Orcza Wyżyna, Osada Czerwonych Orków, Siedziba Rady Orków"
        },
        "Kuźnia Woundriela": {
            map: "Kuźnia Worundriela p.7 - sala 3, Kuźnia Worundriela p.7 - sala 4"
        },
        Berserkerzy: {
            map: "Grobowiec Przodków, Cenotaf Berserkerów p.1, Grobowiec Przodków, Czarcie Oparzeliska, Pustelnia Wojownika p.2, Pustelnia Wojownika p.1, Czarcie Oparzeliska, Szuwarowe Trzęsawisko, Opuszczona Twierdza, Szuwarowe Trzęsawisko, Czarcie Oparzeliska, Pustelnia Wojownika p.1, Pustelnia Wojownika p.2, Czarcie Oparzeliska, Grobowiec Przodków, Cenotaf Berserkerów p.1"
        },
        Gobliny: {
            map: "Przedsionek Złych Goblinów, Goblińskie Lokum, Przedsionek Złych Goblinów, Lokum Złych Goblinów"
        },
        Kazamaty: {
            map: "Nawiedzone Kazamaty p.1, Nawiedzone Kazamaty p.2, Nawiedzone Kazamaty p.3, Nawiedzone Kazamaty p.4, Nawiedzone Kazamaty p.5, Nawiedzone Kazamaty p.6, Nawiedzone Kazamaty p.5, Nawiedzone Kazamaty p.4, Nawiedzone Kazamaty p.3, Nawiedzone Kazamaty p.2"
        },
        "Duchy - dla leszczy": {
            map: "Ruiny Tass Zhil, Przedsionek Grobowca, Ruiny Tass Zhil, Błota Sham Al",
            ignore_grp: [18]
        },
        "Duchy - dla koxów": {
            map: "Ruiny Tass Zhil, Przedsionek Grobowca, Tajemne Przejście, Przeklęty Grobowiec, Ruiny Tass Zhil, Błota Sham Al"
        },
        Ingotia: {
            map: "Wyspa Ingotia - południe, Jaskinia Rogogłowych - aula, Sala Nici Ocalenia p.6, Sala Białego Byka p.5, Sala Nici Ocalenia p.6, Komnata Przeklętego Daru p.5, Jaskinia Rogogłowych - aula, Sala Żądzy p.5, Hala Odszczepieńców p.4, Sala Żądzy p.5, Komora Opuszczonych p.3, Jaskinia Rogogłowych - aula, Komnata Wygnańców p.3, Komora Budowniczego p.5, Komnata Wygnańców p.3, Jaskinia Rogogłowych p.2, Jaskinia Rogogłowych - aula, Jaskinia Rogogłowych p.1 - wyjście, Wyspa Ingotia - północ, Jaskinia Rogogłowych p.1 - wyjście, Jaskinia Rogogłowych - aula, Jaskinia Rogogłowych p.2, Komnata Wygnańców p.3, Komora Budowniczego p.5, Komnata Wygnańców p.3, Jaskinia Rogogłowych - aula, Komora Opuszczonych p.3, Sala Żądzy p.5, Hala Odszczepieńców p.4, Sala Żądzy p.5, Jaskinia Rogogłowych - aula, Komnata Przeklętego Daru p.5, Sala Nici Ocalenia p.6, Sala Białego Byka p.5, Sala Nici Ocalenia p.6, Jaskinia Rogogłowych - aula"
        },
        Furby: {
            map: "Zapomniany Las, Rozległa Równina, Wzgórza Obłędu, Rozległa Równina, Dolina Gniewu, Terytorium Furii, Zapadlisko Zniewolonych, Terytorium Furii,Dolina Gniewu, Zalana Grota p.1, Dolina Gniewu, Rozległa Równina",
            ignore_grp: []
        },
        "SK dla leszczy": {
            map: "Nawiedzone Komnaty p.1, Nawiedzone Komnaty p.2, Sala Królewska, Nawiedzone Komnaty p.2"
        },
        "SK dla koxów": {
            map: "Nawiedzone Komnaty p.1, Nawiedzone Komnaty p.2, Sala Królewska, Komnata Czarnej Perły, Sala Królewska, Nawiedzone Komnaty p.2",
            ignore_grp: []
        },
        Patrycjusze: {
            map: "Krypty Bezsennych p .1, Krypty Bezsennych p .2, Krypty Bezsennych p .2 - przejście - sala 1, Krypty Bezsennych p .2 - przejście - sala 2, Krypty Bezsennych p .2, Krypty Bezsennych p .3, Krypty Bezsennych p .2, Krypty Bezsennych p .2 - przejście - sala 2, Krypty Bezsennych p .2 - przejście - sala 1, Krypty Bezsennych p .2"
        },
        Sekta: {
            map: "Przedsionek Kultu, Tajemnicza Siedziba, Mroczne Komnaty, Przerażające Sypialnie, Mroczne Komnaty, Tajemnicza Siedziba, Sala Tysiąca Świec, Tajemnicza Siedziba, Lochy Kultu, Sale Rozdzierania, Lochy Kultu, Tajemnicza Siedziba"
        },
        "sadolka+niżej": {
            map: "Mroczne Komnaty, Przerażające Sypialnie",
            ignore_grp: [9]
        },
        Pająki: {
            map: "Dolina Pajęczych Korytarzy, Arachnitopia p.1, Arachnitopia p.2, Arachnitopia p.3, Arachnitopia p.4, Arachnitopia p.5, Arachnitopia p.4, Arachnitopia p.3, Arachnitopia p.2, Arachnitopia p.1"
        },
        "Zakorzeniony Lud": {
            map: "Urwisko Zdrewniałych, Wąwóz Zakorzenionych Dusz, Krzaczasta Grota p.2 - sala 2, Krzaczasta Grota p.2 - sala 3, Krzaczasta Grota p.2 - sala 1, Krzaczasta Grota p.2 - sala 3, Krzaczasta Grota p.1 - sala 3, Krzaczasta Grota p.1 - sala 2, Krzaczasta Grota p.1 - sala 1, Wąwóz Zakorzenionych Dusz, Regiel Zabłąkanych, Źródło Zakorzenionego Ludu, Regiel Zabłąkanych, Wąwóz Zakorzenionych Dusz"
        },
        "Maddoki całe": {
            map: "Zawodzące Kaskady, Skryty Azyl, Złota Dąbrowa, Oślizgłe Przejście - sala 1, Oślizgłe Przejście - sala 2, Złota Dąbrowa, Mglisty Las, Grota porośniętych Stalagmitów - sala wyjściowa, Grota porośniętych Stalagmitów - przejście, Grota porośniętych Stalagmitów - sala boczna, Grota porośniętych, Stalagmitów - przejście, Grota porośniętych Stalagmitów - sala główna, Grota porośniętych Stalagmitów - przejście, Grota porośniętych Stalagmitów - sala wyjściowa, Mglisty Las, Złota Dąbrowa, Dolina Pełznącego Krzyku, Grzęzawisko Rozpaczy, Zatrute Torfowiska, Gnijące Topielisko, Bagna Umarłych, Gnijące Topielisko, Zatrute Torfowiska, Grzęzawisko Rozpaczy, Dolina Pełznącego Krzyku, Złota Dąbrowa, Mglisty Las, Grota porośniętych Stalagmitów - sala wyjściowa, Grota porośniętych Stalagmitów - przejście, Grota porośniętych Stalagmitów - sala główna, Grota porośniętych Stalagmitów - przejście, Grota porośniętych Stalagmitów - sala boczna, Grota porośniętych Stalagmitów - przejście, Grota porośniętych Stalagmitów - sala wyjściowa, Mglisty Las, Złota Dąbrowa, Oślizgłe Przejście - sala 2, Oślizgłe Przejście - sala 1, Złota Dąbrowa, Skryty Azyl"
        },
        "Mahopteki dla leszczy": {
            map: "Altepetl Mahoptekan, Niecka Xiuh Atl, Dolina Chmur, Niecka Xiuh Atl, Altepetl Mahoptekan, Dolina Chmur, Złota Góra p.1, Złota Góra p.2, Złota Góra p.3, Złota Góra p.2, Złota Góra p.1, Dolina Chmur, Altepetl Mahoptekan, Mictlan p.1, Mictlan p.2, Mictlan p.3, Mictlan p.4, Mictlan p.5, Mictlan p.4, Mictlan p.3, Mictlan p.2, Mictlan p.1"
        },
        "Mahopteki-high": {
            map: "Altepetl Mahoptekan, Niecka Xiuh Atl, Dolina Chmur, Niecka Xiuh Atl, Altepetl Mahoptekan, Dolina Chmur, Złota Góra p.1, Złota Góra p.2, Złota Góra p.3, Złota Góra p.2, Złota Góra p.1, Dolina Chmur, Altepetl Mahoptekan, Mictlan p.1, Mictlan p.2, Mictlan p.3, Mictlan p.4, Mictlan p.5, Mictlan p.6, Mictlan p.7, Mictlan p.8, Mictlan p.7, Mictlan p.6, Mictlan p.5, Mictlan p.4, Mictlan p.3, Mictlan p.2, Mictlan p.1"
        },
        "Katy zarobek": {
            map: "Pustynne Katakumby, Pustynne Katakumby - sala 1, Pustynne Katakumby - sala 2, Komnaty Bezdusznych - sala 1, Komnaty Bezdusznych - sala 2, Katakumby Gwałtownej Śmierci, Korytarz Porzuconych Marzeń, Katakumby Opętanych Dusz, Katakumby Odnalezionych Skrytobójców, Korytarz Porzuconych Nadziei, Katakumby Opętanych Dusz, Zachodni Tunel Jaźni, Katakumby Krwawych Wypraw, Wschodni Tunel Jaźni, Komnaty Bezdusznych - sala 2, Komnaty Bezdusznych - sala 1,Pustynne Katakumby - sala 2, Pustynne Katakumby - sala 1, Pustynne Katakumby "
        },
        "Pustynia Shairhoud?": {
            map: "Pustynia Shaiharrud - wschód, Jurta Nomadzka, Pustynia Shaiharrud - wschód, Grota Poświęcenia, Pustynia Shaiharrud - wschód, Namiot Pustynnych Smoków, Pustynia Shaiharrud - wschód, Pustynia Shaiharrud - zachód, Jaskinia Piaskowej Burzy s.1, Jaskinia Piaskowej Burzy s.2, Namiot Naznaczonych, Pustynia Shaiharrud - zachód, Namiot Piechoty Piłowej, Pustynia Shaiharrud - zachód, Jaskinia Szczęk, Jurta Czcicieli, Pustynia Shaiharrud - zachód, Namiot Gwardii Smokoszczękich, Pustynia Shaiharrud - zachód, Sępiarnia, Pustynia Shaiharrud - zachód, Jaskinia Smoczej Paszczy p.1, Jaskinia Smoczej Paszczy p.2, Jaskinia Smoczej Paszczy p.1, Jurta Chaegda, Pustynia Shaiharrud - zachód, Smocze Skalisko, Jaskinia Odwagi, Smocze Skalisko, Urwisko Vapora, Smocze Skalisko, Pustynia Shaiharrud - zachód"
        }
    };
    class AStar {
        constructor(collisionsString, width, height, start, end, additionalCollisions) {
            this.width = width;
            this.height = height;
            this.collisions = this.parseCollisions(collisionsString, width, height);
            this.additionalCollisions = additionalCollisions || {};
            this.start = this.collisions[start.x][start.y];
            this.end = this.collisions[end.x][end.y];
            this.start.beginning = true;
            this.start.g = 0;
            this.start.f = heuristic(this.start, this.end);
            this.end.target = true;
            this.end.g = 0;
            this.addNeighbours();
            this.openSet = [];
            this.closedSet = [];
            this.openSet.push(this.start);
        }

        parseCollisions(collisionsString, width, height) {
            const collisions = new Array(width);
            for (let w = 0; w < width; w++) {
                collisions[w] = new Array(height);
                for (let h = 0; h < height; h++) {
                    collisions[w][h] = new Point(w, h, collisionsString.charAt(w + h * width) === '1');
                }
            }
            return collisions;
        }

        addNeighbours() {
            for (let i = 0; i < this.width; i++) {
                for (let j = 0; j < this.height; j++) {
                    this.addPointNeighbours(this.collisions[i][j])
                }
            }
        }

        addPointNeighbours(point) {
            const x = point.x,
                y = point.y;
            const neighbours = [];
            if (x > 0) neighbours.push(this.collisions[x - 1][y]);
            if (y > 0) neighbours.push(this.collisions[x][y - 1]);
            if (x < this.width - 1) neighbours.push(this.collisions[x + 1][y]);
            if (y < this.height - 1) neighbours.push(this.collisions[x][y + 1]);
            point.neighbours = neighbours;
        }

        anotherFindPath() {
            while (this.openSet.length > 0) {
                let currentIndex = this.getLowestF();
                let current = this.openSet[currentIndex];
                if (current === this.end) return this.reconstructPath();
                else {
                    this.openSet.splice(currentIndex, 1);
                    this.closedSet.push(current);
                    for (const neighbour of current.neighbours) {
                        if (this.closedSet.includes(neighbour)) continue;
                        else {
                            const tentative_score = current.g + 1;
                            let isBetter = false;
                            if (this.end == this.collisions[neighbour.x][neighbour.y] || (!this.openSet.includes(neighbour) && !neighbour.collision && !this.additionalCollisions[neighbour.x + 256 * neighbour.y])) {
                                this.openSet.push(neighbour);
                                neighbour.h = heuristic(neighbour, this.end);
                                isBetter = true;
                            } else if (tentative_score < neighbour.g && !neighbour.collision) {
                                isBetter = true;
                            }
                            if (isBetter) {
                                neighbour.previous = current;
                                neighbour.g = tentative_score;
                                neighbour.f = neighbour.g + neighbour.h;
                            }
                        }
                    }
                }
            }
        }

        getLowestF() {
            let lowestFIndex = 0;
            for (let i = 0; i < this.openSet.length; i++) {
                if (this.openSet[i].f < this.openSet[lowestFIndex].f) lowestFIndex = i;
            }
            return lowestFIndex;
        }

        reconstructPath() {
            const path = [];
            let currentNode = this.end;
            while (currentNode !== this.start) {
                path.push(currentNode);
                currentNode = currentNode.previous;
            }
            return path;
        }
    }
    class Point {
        constructor(x, y, collision) {
            this.x = x;
            this.y = y;
            this.collision = collision;
            this.g = 10000000;
            this.f = 10000000;
            this.neighbours = [];
            this.beginning = false;
            this.target = false;
            this.previous = undefined;
        }
    }
    const heuristic = (p1, p2) => {
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    };
    const getWay = (x, y) => {
        return (new AStar(window.map.col, window.map.x, window.map.y, {
            x: window.hero.x,
            y: window.hero.y
        }, {
            x: x,
            y: y
        }, window.g.npccol)).anotherFindPath();
    };
    const debug = false;
    const goTo = (x, y) => {
        let _road_ = getWay(x, y);
        if (debug) console.log(_road_);
        if (!Array.isArray(_road_)) return;
        window.road = _road_;
    };
    let blokada = false;
    let blokada2 = false;
    let m_id;
    let herolx;
    let heroly;
    let increment = 0;
    let bolcka = false;
    let start = false;
    window.g.loadQueue.push({
        fun() {
            start = true;
        }
    });
    let globalArray = new Array;
    const addToGlobal = id => {
        let npc = window.g.npc[id];
        if (npc.grp) {
            for (let i in window.g.npc) {
                if (window.g.npc[i].grp == npc.grp && !globalArray.includes(window.g.npc[i].id)) {
                    globalArray.push(window.g.npc[i].id);
                }
            }
        } else if (!globalArray.includes(id)) {
            globalArray.push(id);
        }
    };
    const checke2 = grpid => {
        for (let i in window.g.npc) {
            if (window.g.npc[i].grp == grpid && window.g.npc[i].wt > 19) {
                return false;
            }
        }
        return true;
    }
    const checkGrp = id => {
        if (window.g.npc[id].grp) {
            if (!checke2(window.g.npc[id].grp) || (expowiska[localStorage.getItem("adi-bot_expowiska")] && expowiska[localStorage.getItem("adi-bot_expowiska")].ignore_grp && expowiska[localStorage.getItem("adi-bot_expowiska")].ignore_grp.includes(window.g.npc[id].grp))) {
                return false;
            }
        }
        return true;
    };
    const checkHeroHp = () => {
        return (window.hero.hp / window.hero.maxhp) * 100 > 70;
    };
    const chceckBlockade = () => {
        for (let i in window.g.npc) {
            let n = window.g.npc[i];
            if ((n.type == 2 || n.type == 3) && n.wt < 19 && checkGrp(n.id) && window.hero.lvl + 30 >= n.lvl && Math.abs(window.hero.x - n.x) < 2 && Math.abs(window.hero.y - n.y) < 2 && checkHeroHp()) {
                return window._g(`fight&a=attack&ff=1&id=-${n.id}`);
            }
        }
    };
    setInterval(() => {
        if (m_id) {
            m_id = undefined;
        }
    }, 2000);
    let $map_cords = undefined;
    const findBestMob = () => {
        let b1;
        let b2 = 9999;
        let id;
        let xxx;
        let min;
        let max;
        if (document.getElementById("adi-bot_mobs").value.includes("-")) {
            xxx = document.getElementById("adi-bot_mobs").value.split("-");
            min = parseInt(xxx[0]);
            max = parseInt(xxx[1]);
        }
        for (let i in window.g.npc) {
            let n = window.g.npc[i];
            if ((n.type == 2 || n.type == 3) && xxx && n.lvl <= max && n.lvl >= min && checkGrp(n.id) && !globalArray.includes(n.id) && n.wt < 20) {
                b1 = getWay(n.x, n.y);
                if (!b1) continue;
                if (b1.length < b2) {
                    b2 = b1.length;
                    id = n.id;
                }
            }
        }
        return id;
    };
    if (!localStorage.getItem("alksjd")) {
        localStorage.setItem("alksjd", 0)
    }
    const dodatkowymobek = () => {
        let tmp_naj1;
        let tmp_naj2 = 9999;
        let tmp_id = false;
        if (expowiska[localStorage.getItem("adi-bot_expowiska")].mobs_id) {
            let exP_mobs = expowiska[localStorage.getItem("adi-bot_expowiska")].mobs_id;
            for (let i in exP_mobs) {
                if (window.g.npc[exP_mobs[i]]) {
                    const droga = getWay(window.g.npc[exP_mobs[i]].x, window.g.npc[exP_mobs[i]].y);
                    if (droga) {
                        tmp_naj1 = droga.length;
                        if (tmp_naj1 < tmp_naj2) {
                            tmp_naj2 = tmp_naj1;
                            tmp_id = exP_mobs[i];
                        }
                    }
                }
            }
            return tmp_id;
        }
    };
    let przejście = 0;
    const findBestGw = () => {
        przejście++;
        if (przejście < 4) {
            return;
        }
        let obj,
            txt = document.getElementById("adi-bot_maps").value.split(", "),
            inc = parseInt(localStorage.getItem("alksjd"));
        for (let i in window.g.townname) {
            if (txt[inc] == window.g.townname[i].replace(/ +(?= )/g, "")) {
                let c = window.g.gwIds[i].split(".");
                const droga = getWay(c[0], c[1]);
                if ((droga || (window.map.name === "Trupia Przełęcz" || (window.map.name === "Wschodni Tunel Jaźni" && txt[inc] === "Katakumby Opętanych Dusz")))) {
                    obj = {
                        x: parseInt(c[0]),
                        y: parseInt(c[1])
                    };
                }
            }
            if (obj) {
                return obj;
            }
        }
        inc++;
        if (inc > txt.length) {
            inc = 0;
        }
        if (!dodatkowymobek()) {
            localStorage.setItem("alksjd", parseInt(inc));
        }
    };
    const initHTML = () => {
        if (!localStorage.getItem("adi-bot_position")) {
            const tmpobj = {
                x: 0,
                y: 0
            };
            localStorage.setItem("adi-bot_position", JSON.stringify(tmpobj));
        }
        const position = JSON.parse(localStorage.getItem("adi-bot_position"));
        const box = document.createElement("div");
        box.id = "adi-bot_box";
        box.setAttribute("tip", "Złap i przenieś :)");
        const input1 = document.createElement("input");
        input1.type = "text";
        input1.id = "adi-bot_mobs";
        input1.classList.add("adi-bot_inputs");
        input1.setAttribute("tip", "Wpisz lvle mobków, np. 25-35");
        box.appendChild(input1);
        const input2 = document.createElement("input");
        input2.type = "text";
        input2.id = "adi-bot_maps";
        input2.classList.add("adi-bot_inputs");
        input2.setAttribute("tip", "Możesz wpisać mapy, na których expisz");
        box.appendChild(input2);
        const select = document.createElement("select");
        select.id = "adi-bot_list";
        select.classList.add("adi-bot_inputs");
        select.setAttribute("tip", "Wybór expowiska");
        for (let i = 0; i < Object.keys(expowiska).length; i++) {
            let option = document.createElement("option");
            option.setAttribute("value", Object.keys(expowiska)[i]);
            option.text = Object.keys(expowiska)[i];
            select.appendChild(option);
        }
        box.appendChild(select);
        document.body.appendChild(box);
        const style = document.createElement("style");
        style.type = "text/css";
        const css = `
            #adi-bot_box {
               position: absolute;
               border: 2px solid green;
               padding: 5px;
               text-align: center;
               background: black;
               cursor: grab;
               left: ${position.x}px;
               top: ${position.y}px;
               width: auto;
               height: auto;
               z-index: 390;
             }
            .adi-bot_inputs {
                -webkit-box-sizing: content-box;
                -moz-box-sizing: content-box;
                box-sizing: content-box;
                margin: 0 auto;
                margin-bottom: 3px;
                padding: 2px;
                cursor: pointer;
                border: 2px solid green;
                -webkit-border-radius: 5px;
                border-radius: 5px;
                font: normal 16px/normal "Times New Roman", Times, serif;
                color: rgba(0,142,198,1);
                -o-text-overflow: clip;
                text-overflow: clip;
                background: rgba(234,227,227,1);
                -webkit-box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.2) inset;
                box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.2) inset;
                text-shadow: 1px 1px 0 rgba(255,255,255,0.66) ;
                display: block;
              }
              input[id=adi-bot_mobs] {
                  text-align: center;
              }
              #adi-bot_blessingbox {
                  border: 1px solid red;
                  background: gray;
                  height: 32px;
                  width: 32px;
                  margin: 0 auto;
              }
        `;
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
        if (localStorage.getItem("adi-bot_mobs")) {
            input1.value = localStorage.getItem("adi-bot_mobs");
        }
        if (localStorage.getItem("adi-bot_maps")) {
            input2.value = localStorage.getItem("adi-bot_maps");
        }
        if (localStorage.getItem("adi-bot_expowiska") && expowiska[localStorage.getItem("adi-bot_expowiska")]) {
            select.value = localStorage.getItem("adi-bot_expowiska");
        }
        input1.addEventListener("change", () => {
            localStorage.setItem("adi-bot_mobs", input1.value);
        });
        input2.addEventListener("change", () => {
            localStorage.setItem("adi-bot_maps", input2.value);
        });
        select.addEventListener("change", () => {
            localStorage.setItem("adi-bot_expowiska", select.value);
            input2.value = expowiska[select.value].map;
            localStorage.setItem("adi-bot_maps", input2.value);
            localStorage.setItem("alksjd", 0);
        });
        window.$("#adi-bot_box").draggable({
            stop() {
                const tmpobj = {
                    x: parseInt(document.getElementById("adi-bot_box").style.left),
                    y: parseInt(document.getElementById("adi-bot_box").style.top)
                };
                localStorage.setItem("adi-bot_position", JSON.stringify(tmpobj));
            }
        });
    };
    let poprzednie = "";
    window._g = (url, callback) => {
        if (!["_", "walk"].includes(url) && !url.includes("moveitem")) {
            if (url === poprzednie) {
                console.error(url);
                poprzednie = "";
                return true;
            }
            poprzednie = url;
        }
        if (url === "walk") {
            przejście = 0;
        }
        _g(url, callback);
    }
    const kolizjaobokmobka = id => {
        const {
            x,
            y
        } = window.g.npc[id];
        const obok = {
            0: {
                czykolizja: window.isCollision(x, y),
                x: x,
                y: y
            },
            1: {
                czykolizja: window.isCollision(x + 1, y),
                x: x + 1,
                y: y
            },
            2: {
                czykolizja: window.isCollision(x - 1, y),
                x: x - 1,
                y: y
            },
            3: {
                czykolizja: window.isCollision(x, y + 1),
                x: x,
                y: y + 1
            },
            4: {
                czykolizja: window.isCollision(x, y - 1),
                x: x,
                y: y - 1
            },
            5: {
                czykolizja: window.isCollision(x + 1, y + 1),
                x: x + 1,
                y: y + 1
            },
            6: {
                czykolizja: window.isCollision(x - 1, y + 1),
                x: x - 1,
                y: y + 1
            },
            7: {
                czykolizja: window.isCollision(x + 1, y - 1),
                x: x + 1,
                y: y - 1
            },
            8: {
                czykolizja: window.isCollision(x - 1, y - 1),
                x: x - 1,
                y: y - 1
            }
        };
        let droga1;
        let droga2 = 9999;
        let najbliżej = [x, y];
        for (let i in obok) {
            if (!obok[i].czykolizja) {
                droga1 = getWay(obok[i].x, obok[i].y);
                if (droga1) {
                    if (droga1.length < droga2) {
                        droga2 = droga1.length;
                        najbliżej = [obok[i].x, obok[i].y];
                    }
                }
            }
        }
        return najbliżej;
    };
    window.parseInput = (d, callback, xhr) => {
        if (d.town) {
            globalArray = [44198];
        }
        if (!window.g.battle && !window.g.dead && start) {
            if (!m_id && !bolcka) {
                m_id = findBestMob();
                if (!m_id && localStorage.getItem("adi-bot_expowiska") && dodatkowymobek()) {
                    m_id = dodatkowymobek();
                }
                blokada2 = false;
                blokada = false;
            }
            if (m_id) {
                let mob = window.g.npc[m_id];
                if (!mob) {
                    m_id = undefined;
                    return parseInput(d, callback, xhr);
                }
                if (Math.abs(window.hero.x - mob.x) < 2 && Math.abs(window.hero.y - mob.y) < 2 && !blokada) {
                    blokada = true;
                    if (checkGrp(mob.id)) {
                        window._g(`fight&a=attack&id=-${mob.id}&ff=1`, res => {
                            if (res.alert && res.alert == "Przeciwnik walczy już z kimś innym") {
                                addToGlobal(mob.id);
                                m_id = undefined;
                            }
                        });
                    }
                    setTimeout(() => {
                        m_id = undefined;
                    }, 500);
                } else if (!blokada2 && !blokada) {
                    const [x, y] = kolizjaobokmobka(m_id);
                    goTo(x, y);
                    blokada2 = true;
                }
            } else if (document.getElementById("adi-bot_maps").value.length > 0) {
                $map_cords = findBestGw();
                if ($map_cords && !bolcka) {
                    if (window.hero.x === $map_cords.x && window.hero.y === $map_cords.y) {
                        window._g("walk");
                    } else {
                        goTo($map_cords.x, $map_cords.y);
                        bolcka = true;
                        setTimeout(() => {
                            bolcka = false;
                        }, 2000);
                    }
                }
            }
            if (heroly === window.hero.y && herolx === window.hero.x) {
                increment++;
                if (increment > 4) {
                    chceckBlockade();
                    increment = 0;
                    m_id = undefined;
                    $map_cords = undefined;
                    bolcka = false;
                }
            } else {
                heroly = window.hero.y;
                herolx = window.hero.x;
                increment = 0;
            }
        }
        parseInput(d, callback, xhr);
    }
    initHTML();
})(window.parseInput, window._g);