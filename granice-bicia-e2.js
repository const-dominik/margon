// ==UserScript==
// @name         fajny dodatek i przydatny
// @version      1
// @author       how to be a paladin
// @match        http://ataentsic.margonem.pl/
// @grant        none
// ==/UserScript==

(() => {
    const respyedwa = {
        "Grota dzikiego kota": {
            1: {
                "x": 23,
                "y": 11
            }
        },
        "Podziemia siedziby maga p.3 - sala 1": {
            1: {
                "x": 38,
                "y": 11
            }
        },
        "Podmokła Dolina": {
            1: {
                "x": 74,
                "y": 38
            }
        },
        "Jaskinia Pogardy": {
            1: {
                "x": 8,
                "y": 6
            }
        },
        "Stary Kupiecki Trakt": {
            1: {
                "x": 8,
                "y": 47
            }
        },
        "Stare Wyrobisko p.3": {
            1: {
                "x": 7,
                "y": 5
            }
        },
        "Pieczara Szaleńców - sala 2": {
            1: {
                "x": 55,
                "y": 42
            }
        },
        "Lazurytowa Grota p.4": {
            1: {
                "x": 22,
                "y": 18
            }
        },
        "Namiot Vari Krugera": {
            1: {
                "x": 6,
                "y": 4
            }
        },
        "Jaskinia Gnollich Szamanów - komnata Kozuga": {
            1: {
                "x": 38,
                "y": 22
            }
        },
        "Gliniana Pieczara p.3": {
            1: {
                "x": 5,
                "y": 23
            }
        },
        "Gliniana Pieczara p.4": {
            1: {
                "x": 7,
                "y": 20
            }
        },
        "Kamienna Strażnica - Sanktuarium": {
            1: {
                "x": 12,
                "y": 7
            }
        },
        "Skalne Cmentarzysko p.1": {
            1: {
                "x": 29,
                "y": 19
            }
        },
        "Skalne Cmentarzysko p.3": {
            1: {
                "x": 20,
                "y": 30
            }
        },
        "Krypta Świątyni Andarum": {
            1: {
                "x": 36,
                "y": 16
            }
        },
        "Zbrojownia Andarum": {
            1: {
                "x": 28,
                "y": 9
            }
        },
        "Opuszczony namiot": {
            1: {
                "x": 8,
                "y": 6
            }
        },
        "Grobowiec Nieznających Spokoju": {
            1: {
                "x": 9,
                "y": 5
            }
        },
        "Margoria Sala Królewska": {
            1: {
                "x": 31,
                "y": 6
            }
        },
        "Grota Samotnych Dusz p.6": {
            1: {
                "x": 53,
                "y": 16
            }
        },
        "Ukryta Grota Morskich Diabłów - magazyn": {
            1: {
                "x": 21,
                "y": 15
            }
        },
        "Góralskie Przejście": {
            1: {
                "x": 56,
                "y": 29
            }
        },
        "Kryształowa Sala Smutku": {
            1: {
                "x": 31,
                "y": 22
            }
        },
        "Babi Wzgórek": {
            1: {
                "x": 26,
                "y": 6
            }
        },
        "Dziki Zagajnik": {
            1: {
                "x": 16,
                "y": 13
            },
            2: {
                "x": 84,
                "y": 16
            }
        },
        "Ukryty Kanion": {
            1: {
                "x": 6,
                "y": 54
            }
        },
        "Sala Dowódcy Orków": {
            1: {
                "x": 8,
                "y": 14
            }
        },
        "Grota Heretyków p.5": {
            1: {
                "x": 8,
                "y": 40
            }
        },
        "Cenotaf Berserkerów p.2": {
            1: {
                "x": 19,
                "y": 6
            }
        },
        "Grota Piaskowej Śmierci": {
            1: {
                "x": 14,
                "y": 8
            }
        },
        "Mała twierdza": {
            1: {
                "x": 15,
                "y": 5
            }
        },
        "Kuźnia Worundriela p.7 - sala 4": {
            1: {
                "x": 54,
                "y": 33
            }
        },
        "Lokum Złych Goblinów": {
            1: {
                "x": 4,
                "y": 5
            }
        },
        "Laboratorium Adariel": {
            1: {
                "x": 23,
                "y": 23
            }
        },
        "Nawiedzone Kazamaty p.5": {
            1: {
                "x": 26,
                "y": 6
            }
        },
        "Sala Królewska": {
            1: {
                "x": 40,
                "y": 4
            },
            2: {
                "x": 11,
                "y": 5
            },
            3: {
                "x": 7,
                "y": 19
            },
            4: {
                "x": 25,
                "y": 5
            }
        },
        "Wyspa Ingotia - północ": {
            1: {
                "x": 43,
                "y": 3
            }
        },
        "Święty Dąb": {
            1: {
                "x": 8,
                "y": 8
            }
        },
        "Zalana Grota p.3": {
            1: {
                "x": 16,
                "y": 12
            }
        },
        "Krypty Bezsennych p.3": {
            1: {
                "x": 19,
                "y": 30
            }
        },
        "Przysiółek Valmirów": {
            1: {
                "x": 17,
                "y": 12
            }
        },
        "Szlamowe Kanały": {
            1: {
                "x": 14,
                "y": 5
            }
        },
        "Mroczne Komnaty": {
            1: {
                "x": 27,
                "y": 24
            }
        },
        "Sale Rozdzierania": {
            1: {
                "x": 53,
                "y": 45
            }
        },
        "Sala Tysiąca Świec": {
            1: {
                "x": 48,
                "y": 28
            },
            2: {
                "x": 71,
                "y": 31
            },
            3: {
                "x": 45,
                "y": 16
            },
            4: {
                "x": 51,
                "y": 16
            }
        },
        "Tajemnicza Siedziba": {
            1: {
                "x": 31,
                "y": 20
            },
            2: {
                "x": 53,
                "y": 23
            }
        },
        "Arachnitopia p.5": {
            1: {
                "x": 22,
                "y": 41
            }
        },
        "Grota Błotnej Magii": {
            1: {
                "x": 9,
                "y": 13
            }
        },
        "Altepetl Mahoptekan": {
            1: {
                "x": 53,
                "y": 6
            }
        },
        "Potępione Zamczysko - pracownia": {
            1: {
                "x": 10,
                "y": 9
            }
        },
        "Mictlan p.9": {
            1: {
                "x": 11,
                "y": 12
            }
        },
        "Grobowiec Seta": {
            1: {
                "x": 48,
                "y": 57
            }
        },
        "Świątynia Hebrehotha - sala ofiary": {
            1: {
                "x": 26,
                "y": 24
            }
        },
        "Świątynia Hebrehotha - sala czciciela": {
            1: {
                "x": 25,
                "y": 21
            }
        },
        "Sala Mroźnych Strzał": {
            1: {
                "x": 32,
                "y": 20
            }
        },
        "Sala Lodowej Magii": {
            1: {
                "x": 35,
                "y": 41
            }
        },
        "Sala Mroźnych Szeptów": {
            1: {
                "x": 20,
                "y": 42
            }
        },
        "Ogrza Kawerna p.3": {
            1: {
                "x": 31,
                "y": 15
            }
        },
        "Piwnica Opętanych Mnichów p.3": {
            1: {
                "x": 23,
                "y": 3
            }
        },
        "Sala Zamarzniętych Kości": {
            1: {
                "x": 15,
                "y": 42
            }
        }
    };
    /*Brak: Mazur, Miłek łowców, Miłek magii, nowa e2 80 */

    let arrOfGreenRectangles = new Array(); 

    const kordy = (x, y) => {
        for (let i = 0; i <= 20; i++) {

            let yd = (y - 10) * window.map.x,
                top = (y - 10) * 32,
                left = (x - 10 + i) * 32,
                pole = (x - 10 + i) + yd;
            doIt(top, left, pole);

            yd = (y - 10 + i) * window.map.x;
            top = (y - 10 + i) * 32;
            left = (x - 10) * 32;
            pole = (x - 10) + yd;
            doIt(top, left, pole);

            yd = (y - 10 + i) * window.map.x;
            top = (y - 10 + i) * 32;
            left = (x + 10) * 32;
            pole = (x + 10) + yd;
            doIt(top, left, pole);

            yd = (y + 10) * window.map.x;
            top = (y + 10) * 32;
            left = (x - 10 + i) * 32;
            pole = (x - 10 + i) + yd;
            doIt(top, left, pole);
        };
    }

    function doIt(top, left, pole) {
        arrOfGreenRectangles.push(pole);
        window.$("#ground").append('<div id="box' + pole + '"></div>');
        window.$("#box" + pole).css({
            top: top,
            left: left,
            position: 'absolute',
            backgroundColor: 'green',
            width: '32px',
            height: '32px',
            zIndex: 1,
            opacity: 0.2
        });
    }
    const gload = () => {
        window.g.loadQueue.push({
            fun() {
                if (respyedwa[window.map.name]) {
                    for (const i in respyedwa[window.map.name]) {
                        kordy(respyedwa[window.map.name][i].x, respyedwa[window.map.name][i].y);
                    }
                }
            }
        })
    };
    (parseInput => {
        window.parseInput = (data, b, c) => {
            if (data.town) {
                for (let i in arrOfGreenRectangles) {
                    $('#box'+arrOfGreenRectangles[i]).remove();
                }
                gload();
            }
            parseInput(data, b, c);
        }
    })(window.parseInput);
})();