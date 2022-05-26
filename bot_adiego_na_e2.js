// ==UserScript==
// @name         Bot na e2 test!!!
// @version      1.54
// @description  bot na e2 w trakcie rozbudowy, dziala na NI i SI
// @author       Adi Wilk
// @match        http://*.margonem.pl/
// @match        https://*.margonem.pl/
// @grant        none
// ==/UserScript==

function _instanceof(left, right) {
    if (
      right != null &&
      typeof Symbol !== "undefined" &&
      right[Symbol.hasInstance]
    ) {
      return right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }
  
  function _slicedToArray(arr, i) {
    return (
      _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
    );
  }
  
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
  
  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  
  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };
    }
    return _typeof(obj);
  }
  
  function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  
  (function() {
    var a =
      /*#__PURE__*/
      (function() {
        "use strict";
  
        function a(_a, b, c, d, e, f) {
          _classCallCheck(this, a);
  
          (this.width = b),
            (this.height = c),
            (this.collisions = this.parseCollisions(_a, b, c)),
            (this.additionalCollisions = f || {}),
            (this.start = this.collisions[d.x][d.y]),
            (this.end = this.collisions[e.x][e.y]),
            (this.start.beginning = !0),
            (this.start.g = 0),
            (this.start.f = this.heuristic(this.start, this.end)),
            (this.end.target = !0),
            (this.end.g = 0),
            this.addNeighbours(),
            (this.openSet = []),
            (this.closedSet = []),
            this.openSet.push(this.start);
        }
  
        _createClass(a, [
          {
            key: "parseCollisions",
            value: function parseCollisions(a, c, d) {
              var e = Array(c);
  
              for (var f = 0; f < c; f++) {
                e[f] = Array(d);
  
                for (var g = 0; g < d; g++) {
                  e[f][g] = new b(f, g, "0" !== a.charAt(f + g * c));
                }
              }
  
              return e;
            }
          },
          {
            key: "addNeighbours",
            value: function addNeighbours() {
              for (var _a2 = 0; _a2 < this.width; _a2++) {
                for (var _b = 0; _b < this.height; _b++) {
                  this.addPointNeighbours(this.collisions[_a2][_b]);
                }
              }
            }
          },
          {
            key: "addPointNeighbours",
            value: function addPointNeighbours(a) {
              var _ref = [a.x, a.y],
                b = _ref[0],
                c = _ref[1],
                d = [];
              0 < b && d.push(this.collisions[b - 1][c]),
                0 < c && d.push(this.collisions[b][c - 1]),
                b < this.width - 1 && d.push(this.collisions[b + 1][c]),
                c < this.height - 1 && d.push(this.collisions[b][c + 1]),
                (a.neighbours = d);
            }
          },
          {
            key: "anotherFindPath",
            value: function anotherFindPath() {
              for (; 0 < this.openSet.length; ) {
                var _a3 = this.getLowestF(),
                  _b2 = this.openSet[_a3];
  
                if (_b2 === this.end) return this.reconstructPath();
                this.openSet.splice(_a3, 1), this.closedSet.push(_b2);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;
  
                try {
                  for (
                    var _iterator = _b2.neighbours[Symbol.iterator](), _step;
                    !(_iteratorNormalCompletion = (_step = _iterator.next())
                      .done);
                    _iteratorNormalCompletion = true
                  ) {
                    var _a4 = _step.value;
                    if (this.closedSet.includes(_a4)) continue;
                    else {
                      var c = _b2.g + 1;
                      var d = !1;
                      this.end != this.collisions[_a4.x][_a4.y] &&
                      (this.openSet.includes(_a4) ||
                        _a4.collision ||
                        this.additionalCollisions[_a4.x + 256 * _a4.y])
                        ? c < _a4.g && !_a4.collision && (d = !0)
                        : (this.openSet.push(_a4),
                          (_a4.h = this.heuristic(_a4, this.end)),
                          (d = !0)),
                        d &&
                          ((_a4.previous = _b2),
                          (_a4.g = c),
                          (_a4.f = _a4.g + _a4.h));
                    }
                  }
                } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                      _iterator.return();
                    }
                  } finally {
                    if (_didIteratorError) {
                      throw _iteratorError;
                    }
                  }
                }
              }
            }
          },
          {
            key: "getLowestF",
            value: function getLowestF() {
              var a = 0;
  
              for (var _b3 = 0; _b3 < this.openSet.length; _b3++) {
                this.openSet[_b3].f < this.openSet[a].f && (a = _b3);
              }
  
              return a;
            }
          },
          {
            key: "reconstructPath",
            value: function reconstructPath() {
              var a = [];
  
              for (var _b4 = this.end; _b4 !== this.start; ) {
                a.push(_b4), (_b4 = _b4.previous);
              }
  
              return a;
            }
          },
          {
            key: "heuristic",
            value: function heuristic(a, b) {
              return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
            }
          }
        ]);
  
        return a;
      })();
  
    var b = function b(a, _b5, c) {
      "use strict";
  
      _classCallCheck(this, b);
  
      (this.x = a),
        (this.y = _b5),
        (this.collision = c),
        (this.g = 1e7),
        (this.f = 1e7),
        (this.neighbours = []),
        (this.beginning = !1),
        (this.target = !1),
        (this.previous = void 0);
    };
  
    new /*#__PURE__*/
    ((function() {
      "use strict";
  
      function _class() {
        _classCallCheck(this, _class);
  
        (this.storage = JSON.parse(localStorage.getItem("adi-bot-storage")) || {
          x: 0,
          y: 0,
          name: "",
          minimalized: !1
        }),
          (this.interface =
            "object" == _typeof(window.Engine)
              ? "ni"
              : "object" == _typeof(window.g)
                ? "si"
                : "none"),
          (this.lootfilterSettings = JSON.parse(
            localStorage.getItem("adi-bot-lootfilterSettings123")
          ) || {
            stat: {
              all: {
                translation: "\u0141ap wszystkie itemki",
                active: !0
              },
              gold: {
                translation: "Z\u0142oto",
                active: !0
              },
              quest: {
                translation: "Questowe",
                active: !0
              },
              runes: {
                translation: "Runy",
                active: !0
              },
              unique: {
                translation: "Unikaty",
                active: !0
              },
              heroic: {
                translation: "Heroiki",
                active: !0
              },
              legendary: {
                translation: "Legendy",
                active: !0
              }
            },
            names: []
          }),
          (this.QuickGroupSettings = JSON.parse(
            localStorage.getItem("adi-bot-QuickGroupSettings12")
          ) || {
            adding: {
              translation: "Automatycznie dodawaj do grupy znaj/klan",
              active: !0
            },
            accepting: {
              translation: "Automatycznie przyjmuj zaproszenia do grupy",
              active: !0
            },
            reSendingMessage: {
              translation: "Automatycznie odpisuj innym graczom",
              active: !0
            }
          }),
          (this.npcToKillId = void 0),
          (this.lastAttackTimestamp = this.timeStamp),
          (this.timerData = JSON.parse(this.getCookie("autoheal")) || {}),
          (this.refreshTime = [3, 6]),
          (this.delayToRelog = 40),
          (this.waitForNpcRespawn = 120),
          (this.randomAnswers = [
            "hej -,-",
            "czerwone korale .. czerwone .. niczym . .. wino",
            "kk",
            "nom",
            "tak",
            "exstra -.-",
            "co ?",
            "spadaj kolo ;)",
            "nie pisz do mnie . ",
            "oczczep sie odemnie xd ;p",
            "Xd",
            "czy ma pan ochote popisac o Jezusie?",
            "co",
            "uprzejmie informuje ze nasza konwersacja jest nagrywana prosze nie probowac zadnych nielegalnych sztuczek",
            "co.?",
            "nie mam czasu na rozmowy !!",
            "co?",
            "xD",
            "xd",
            "eh .",
            "hej :)",
            "milego dnia !",
            "oh she's sweet but a psycho .. a little bit psycho .. ",
            "Ziomus",
            "all the other kids with the pumped up kicks  . . ^,^",
            "ha ha czleniu chyba tb do kanapek w sql pluli ;D",
            "parli italiano ? ",
            "MAMMA MIA, HERE I GO AGAIN",
            "Witam z Tej Strony Automatyczna Sekretarka Prosze Zostawic Wiadomosc",
            "w jakiej sprawie pan pisze ?  ?",
            "nie pisze ze slabiakami.",
            "moim zdaniem to nie ma tak, ze dobrze, albo ze niedobrze",
            "Sono italiano io non parlo polonese",
            "English ?",
            "grrr jestem teraz zajety nie mam czasu na pogaduszki -.-",
            "zycie to nie bajka nie moge caly czas pisac trzeba isc do przodu przed siebie",
            "hej?"
          ]),
          (this.answersBeforeAddingToEnemies = [
            "saam tego chcialęs kolo",
            "Milego Dnia Dzieki Za Konwersacje",
            "nara .",
            "pdw",
            "dodaje cie do wrogow za to wypisywanie ciagle i nie dawanie mi spokoju gosciu ogarnij sie w koncu bo to co ty wypisujesz to sa zarty jakies -.- zegnam .",
            "hello darkness my old friend.. .. i've come to talk with you again .. :(",
            "lecisz do wrogow :P",
            "Zegnam nekanie gracza = ban",
            "sam tego chciales =.=",
            "ha ha ",
            "say goodbye to the ones that we love .. ;( ",
            "spadaj na drzewo prostować banany :P ",
            "to koniec . przykro mi . zegnaj .",
            "sayonara nii - chan",
            "knowing me knowing you, adding you to enemies is the best i can do",
            "here is where the story ends, this is goodbye"
          ]),
          (this.messagesInc =
            JSON.parse(localStorage.getItem("adi-bot-messages")) || {}),
          (this.isHealing = !1),
          (this.isActuallySendingMessage = !1),
          (this.startInctementingLagRefresher = !1),
          (this.incrementValue = 0),
          this.init();
      }
  
      _createClass(_class, [
        {
          key: "getNpcColsNI",
          value: function getNpcColsNI() {
            var a = {};
  
            var _arr = Object.values(this.npcs);
  
            for (var _i = 0; _i < _arr.length; _i++) {
              var _arr$_i = _arr[_i],
                _b6 = _arr$_i.x,
                c = _arr$_i.y;
              a[_b6 + 256 * c] = !0;
            }
  
            return a;
          }
        },
        {
          key: "chatParser",
          value: function chatParser() {
            var _this = this;
  
            "ni" === this.interface &&
              window.API.addCallbackToEvent("newMsg", function(_ref2) {
                var _ref3 = _slicedToArray(_ref2, 2),
                  a = _ref3[0],
                  b = _ref3[1];
  
                _this.chatFilter(b);
              }),
              "si" === this.interface &&
                window.g.chat.parsers.push(function(a) {
                  _this.chatFilter(a);
                });
          }
        },
        {
          key: "chatFilter",
          value: function chatFilter(a) {
            var b = a.n,
              c = a.t,
              d = a.ts,
              e = a.k;
  
            if (
              "" !== b &&
              b !== this.hero.nick &&
              "System" !== b &&
              !1 !== this.QuickGroupSettings.reSendingMessage.active &&
              5 >= window.unix_time(!0) - d &&
              !this.isActuallySendingMessage
            ) {
              if (
                void 0 !== this.messagesInc[b + this.world] &&
                3 < this.messagesInc[b + this.world]
              )
                return;
              c.toLowerCase().includes(this.hero.nick.toLowerCase()) &&
                0 === e &&
                this.sendMessage(b, e),
                3 === e && this.sendMessage(b, e);
            }
          }
        },
        {
          key: "sendMessage",
          value: function sendMessage(a, b) {
            var _this2 = this;
  
            var c =
              arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : !1;
            var d = arguments.length > 3 ? arguments[3] : undefined;
            (this.isActuallySendingMessage = !0),
              this.messagesInc[a + this.world] === void 0
                ? (this.messagesInc[a + this.world] = 1)
                : this.messagesInc[a + this.world]++,
              this.saveMessages(),
              3 < this.messagesInc[a + this.world] && (c = !0),
              (d = c
                ? this.answersBeforeAddingToEnemies[
                    Math.floor(
                      Math.random() * this.answersBeforeAddingToEnemies.length
                    )
                  ]
                : this.randomAnswers[
                    Math.floor(Math.random() * this.randomAnswers.length)
                  ]),
              3 === b && (d = "@".concat(a.split(" ").join("_"), " ").concat(d)),
              this.Sleep(1e3 * (Math.floor(11 * Math.random()) + 5)).then(
                function() {
                  window._g("chat", {
                    c: d
                  }),
                    !0 === c && _this2.addToEnemy(a),
                    (_this2.isActuallySendingMessage = !1);
                }
              );
          }
        },
        {
          key: "Sleep",
          value: function Sleep(a) {
            return new Promise(function(b) {
              setTimeout(function() {
                b(null);
              }, a);
            });
          }
        },
        {
          key: "saveMessages",
          value: function saveMessages() {
            localStorage.setItem(
              "adi-bot-messages",
              JSON.stringify(this.messagesInc)
            );
          }
        },
        {
          key: "addToEnemy",
          value: function addToEnemy(a) {
            window._g("friends&a=eadd&nick=".concat(a));
          }
        },
        {
          key: "getWay",
          value: function getWay(b, c) {
            return new a(
              this.collisions,
              this.map.x,
              this.map.y,
              {
                x: this.hero.x,
                y: this.hero.y
              },
              {
                x: b,
                y: c
              },
              this.npccol
            ).anotherFindPath();
          }
        },
        {
          key: "goTo",
          value: function goTo(a, b) {
            var c = this.getWay(a, b);
            Array.isArray(c) &&
              ("ni" === this.interface
                ? (window.Engine.hero.autoPath = c)
                : (window.road = c));
          }
        },
        {
          key: "getDistanceToNpc",
          value: function getDistanceToNpc(a, b) {
            var c = this.getWay(a, b);
            return Array.isArray(c) ? c.length : void 0;
          }
        },
        {
          key: "updateCollisions",
          value: function updateCollisions() {
            var a = [],
              _this$map = this.map,
              b = _this$map.x,
              c = _this$map.y;
  
            for (var d = 0; d < c; d++) {
              for (var _c = 0; _c < b; _c++) {
                a.push(window.Engine.map.col.check(_c, d));
              }
            }
  
            return a.join("");
          }
        },
        {
          key: "initBox",
          value: function initBox() {
            var _this3 = this;
  
            var a = document.createElement("div");
            a.classList.add("adi-bot-box"),
              this.appendText(a, "Wprowad\u017A nazwy elit II:");
            var b = document.createElement("input");
            (b.type = "text"),
              b.classList.add("adi-bot-input-text"),
              (b.value = this.storage.name),
              b.addEventListener("keyup", function() {
                (_this3.storage.name = b.value), _this3.saveStorage();
              }),
              a.appendChild(b),
              this.appendText(a, "Lootfilter:");
  
            var _arr2 = Object.entries(this.lootfilterSettings.stat);
  
            var _loop = function _loop() {
              var _arr2$_i = _slicedToArray(_arr2[_i2], 2),
                b = _arr2$_i[0],
                _arr2$_i$ = _arr2$_i[1],
                c = _arr2$_i$.translation,
                d = _arr2$_i$.active;
  
              _this3.createCheckBox(a, c, d, function(a) {
                (_this3.lootfilterSettings.stat[b].active = a),
                  localStorage.setItem(
                    "adi-bot-lootfilterSettings123",
                    JSON.stringify(_this3.lootfilterSettings)
                  );
              });
            };
  
            for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
              _loop();
            }
  
            this.appendText(a, "\u0141ap itemki po nazwie:");
            var c = document.createElement("input");
            c.classList.add("adi-bot-input-text"),
              (c.tip = "Oddzielaj przecinkiem!"),
              (c.type = "text"),
              (c.value = this.lootfilterSettings.names.join(", ")),
              c.addEventListener("keyup", function() {
                var a = c.value.split(",");
  
                for (var _b7 = 0; _b7 < a.length; _b7++) {
                  a[_b7] = a[_b7].trim();
                }
  
                (_this3.lootfilterSettings.names = a),
                  localStorage.setItem(
                    "adi-bot-lootfilterSettings123",
                    JSON.stringify(_this3.lootfilterSettings)
                  );
              }),
              a.appendChild(c),
              this.appendText(a, "Ustawienia QG:");
  
            var _arr3 = Object.entries(this.QuickGroupSettings);
  
            var _loop2 = function _loop2() {
              var _arr3$_i = _slicedToArray(_arr3[_i3], 2),
                b = _arr3$_i[0],
                _arr3$_i$ = _arr3$_i[1],
                c = _arr3$_i$.translation,
                d = _arr3$_i$.active;
  
              _this3.createCheckBox(a, c, d, function(a) {
                (_this3.QuickGroupSettings[b].active = a),
                  localStorage.setItem(
                    "adi-bot-QuickGroupSettings12",
                    JSON.stringify(_this3.QuickGroupSettings)
                  );
              });
            };
  
            for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
              _loop2();
            }
  
            this.makeBoxDraggable(a, function() {
              (_this3.storage.x = parseInt(a.style.left)),
                (_this3.storage.y = parseInt(a.style.top)),
                _this3.saveStorage(),
                window.message(
                  '<span style="color: red">Zapisano pozycj\u0119 okienka :)</span>'
                );
            }),
              this.storage.hasOwnProperty("minimalized") ||
                ((this.storage.minimalized = !1), this.saveStorage()),
              a.addEventListener("dblclick", function(_ref4) {
                var b = _ref4.x,
                  c = _ref4.y;
                !1 === _this3.storage.minimalized
                  ? ((a.style.width = "10px"),
                    (a.style.height = "10px"),
                    (_this3.storage.minimalized = !0),
                    _this3.changeVisibility(a, !0))
                  : ((a.style.width = "360px"),
                    (a.style.height = "290px"),
                    (_this3.storage.minimalized = !1),
                    _this3.changeVisibility(a, !1)),
                  (a.style.left = b - parseInt(a.style.width) / 2 + "px"),
                  (a.style.top = c - parseInt(a.style.height) / 2 + "px"),
                  (_this3.storage.x = parseInt(a.style.left)),
                  (_this3.storage.y = parseInt(a.style.top)),
                  _this3.saveStorage();
              }),
              "ni" === this.interface
                ? document.querySelector(".game-window-positioner").appendChild(a)
                : document.body.appendChild(a),
              this.initStyle(),
              !0 === this.storage.minimalized &&
                ((a.style.width = "10px"),
                (a.style.height = "10px"),
                this.changeVisibility(a, !0));
          }
        },
        {
          key: "changeVisibility",
          value: function changeVisibility(a, b) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;
  
            try {
              for (
                var _iterator2 = a.childNodes[Symbol.iterator](), _step2;
                !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
                _iteratorNormalCompletion2 = true
              ) {
                var c = _step2.value;
                c.style.display = !0 === b ? "none" : "";
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        },
        {
          key: "appendText",
          value: function appendText(a, b) {
            var c = document.createElement("div");
            c.appendChild(document.createTextNode(b)), a.appendChild(c);
          }
        },
        {
          key: "createCheckBox",
          value: function createCheckBox(a, b, c, d) {
            var e = document.createElement("div"),
              f = document.createElement("input");
            (f.type = "checkbox"),
              (f.name = b + "adi-bot"),
              (f.id = b + "adi-bot"),
              (f.checked = c),
              e.appendChild(f);
            var g = document.createElement("label");
            g.setAttribute("for", b + "adi-bot"),
              (g.innerHTML = b),
              f.addEventListener("change", function() {
                d(f.checked);
              }),
              e.appendChild(g),
              a.appendChild(e);
          }
        },
        {
          key: "makeBoxDraggable",
          value: function makeBoxDraggable(a, b) {
            $(a).draggable({
              containment: "window",
              stop: b
            });
          }
        },
        {
          key: "saveStorage",
          value: function saveStorage() {
            localStorage.setItem("adi-bot-storage", JSON.stringify(this.storage));
          }
        },
        {
          key: "initStyle",
          value: function initStyle() {
            var a = document.createElement("style"),
              b = "\n            .adi-bot-box {\n                position: absolute;\n                text-align: center;\n                padding: 10px;\n                height: 290px;\n                width: 360px;\n                left: "
                .concat(this.storage.x, "px;\n                top: ")
                .concat(
                  this.storage.y,
                  "px;\n                background: #975b83;\n                border: 2px solid white;\n                border-radius: 8px;\n                color: black;\n                z-index: 999;\n            }\n            .adi-bot-input-text {\n                text-align: center;\n                border: 2px solid lightblue;\n                border-radius: 3px;\n                color: black;\n                cursor: text;\n            }\n            "
                );
            (a.type = "text/css"),
              a.appendChild(document.createTextNode(b)),
              document.head.appendChild(a);
          }
        },
        {
          key: "initNewNpc",
          value: function initNewNpc() {
            var _this4 = this;
  
            if (
              ("ni" === this.interface &&
                (window.API.addCallbackToEvent("newNpc", function(a) {
                  void 0 !== a && _this4.addNpcs(a.d);
                }),
                window.API.addCallbackToEvent("removeNpc", function(a) {
                  void 0 !== a && _this4.removeNpcs(a.d);
                })),
              "si" === this.interface)
            ) {
              var _a5 = window.newNpc;
  
              window.newNpc = function(b) {
                if (void 0 !== b) {
                  var _arr4 = Object.entries(b);
  
                  for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
                    var _arr4$_i = _slicedToArray(_arr4[_i4], 2),
                      _a6 = _arr4$_i[0],
                      c = _arr4$_i[1];
  
                    void 0 !== c.del && void 0 !== window.g.npc[_a6]
                      ? _this4.removeNpcs(window.g.npc[_a6], _a6)
                      : void 0 !== c && _this4.addNpcs(c, _a6);
                  }
                }
  
                _a5(b);
              };
            }
          }
        },
        {
          key: "initNewOther",
          value: function initNewOther() {
            var _this5 = this;
  
            if (
              ("ni" === this.interface &&
                (this.makeParty(),
                window.API.addCallbackToEvent("newOther", function(a) {
                  _this5.filterOther(a.d);
                })),
              "si" === this.interface)
            ) {
              this.makeParty();
              var _a7 = window.newOther;
  
              window.newOther = function(b) {
                if ((_a7(b), void 0 !== b)) {
                  var _arr5 = Object.values(b);
  
                  for (var _i5 = 0; _i5 < _arr5.length; _i5++) {
                    var _a8 = _arr5[_i5];
  
                    _this5.filterOther(_a8);
                  }
                }
              };
            }
          }
        },
        {
          key: "filterOther",
          value: function filterOther(a) {
            if (a !== void 0) {
              var _b8 = a.relation,
                c = a.id;
              !0 === this.canHeroTryToAttack() &&
                ["cl", "fr"].includes(_b8) &&
                !0 === this.QuickGroupSettings.adding.active &&
                this.sendInviteToParty(c);
            }
          }
        },
        {
          key: "makeParty",
          value: function makeParty() {
            if ("object" != _typeof(this.party)) return this.sendInvites();
            var a =
              "ni" === this.interface
                ? this.party.getLeaderId() === this.hero.id
                : 1 === this.party[this.hero.id].r;
            !0 == a && this.sendInvites();
          }
        },
        {
          key: "sendInvites",
          value: function sendInvites() {
            if (this.others !== void 0) {
              var _arr6 = Object.values(this.others);
  
              for (var _i6 = 0; _i6 < _arr6.length; _i6++) {
                var _a9 = _arr6[_i6];
                this.filterOther(_a9);
              }
            }
          }
        },
        {
          key: "sendInviteToParty",
          value: function sendInviteToParty(a) {
            window._g("party&a=inv&id=".concat(a));
          }
        },
        {
          key: "initChecker",
          value: function initChecker() {
            var _this6 = this;
  
            if (
              (setTimeout(function() {
                _this6.initChecker();
              }, 500),
              !0 === this.dead &&
                (this.removeNpcsFromThisCharId(this.hero.id), this.logout()),
              !0 === this.canHeroTryToAttack())
            )
              try {
                if (void 0 !== this.npcToKillId) {
                  var _this$npcs$this$npcTo = this.npcs[this.npcToKillId],
                    _a10 = _this$npcs$this$npcTo.x,
                    _b9 = _this$npcs$this$npcTo.y;
                  1 >= Math.abs(this.hero.x - _a10) &&
                  1 >= Math.abs(this.hero.y - _b9)
                    ? 0 < this.timeStamp - this.lastAttackTimestamp &&
                      window._g(
                        "fight&a=attack&ff=1&id=-".concat(this.npcToKillId),
                        function(a) {
                          return a.hasOwnProperty("alert") &&
                            a.alert.includes(
                              "Przeciwnik walczy ju\u017C z kim\u015B innym"
                            )
                            ? void (_this6.lastAttackTimestamp =
                                _this6.timeStamp + 2)
                            : void (_this6.lastAttackTimestamp =
                                _this6.timeStamp + 1);
                        }
                      )
                    : this.goTo(_a10, _b9);
                } else this.reFindNpcs();
              } catch (a) {
                this.npcToKillId = void 0;
              }
          }
        },
        {
          key: "canHeroTryToAttack",
          value: function canHeroTryToAttack() {
            return !(this.battle || this.dead);
          }
        },
        {
          key: "removeNpcs",
          value: function removeNpcs(a) {
            var b = a.x,
              c = a.y,
              d = a.nick,
              e = a.lvl;
            "ni" === this.interface
              ? window.Engine.map.col.unset(
                  b,
                  c,
                  window.Engine.map.col.check(b, c)
                )
              : window.map.nodes.changeCollision(b, c, 0),
              this.storage.name !== void 0 &&
                this.storage.name.toLowerCase().includes(d.toLowerCase()) &&
                (this.addNpcToTimer(d, e),
                (this.npcToKillId = void 0),
                this.reFindNpcs());
          }
        },
        {
          key: "findEilteIIName",
          value: function findEilteIIName(a) {
            var _arr7 = Object.values(this.npcs);
  
            for (var _i7 = 0; _i7 < _arr7.length; _i7++) {
              var _b10 = _arr7[_i7];
              var c = _b10.nick,
                d = _b10.lvl,
                e = _b10.grp,
                f = _b10.wt;
              if (e === a && 19 < f) return [c, d];
            }
          }
        },
        {
          key: "addNpcs",
          value: function addNpcs(a, b) {
            "ni" === this.interface && (b = a.id), this.filterNpc(a, b);
          }
        },
        {
          key: "isNpcFake",
          value: function isNpcFake(a, b) {
            var c = new Image(),
              d = document.createElement("canvas").getContext("2d"),
              e = function e() {
                var a = d.getImageData(Math.floor(d.width / 2), 0, 1, d.height)
                  .data;
  
                for (var _c2 = 3; _c2 < a.length; _c2 += 4) {
                  if (0 < a[_c2]) return b(!1);
                }
  
                return b(!0);
              };
  
            (c.onload = function() {
              (d.width = this.width),
                (d.height = this.height),
                d.drawImage(c, 0, 0),
                e();
            }),
              (c.src = a);
          }
        },
        {
          key: "filterNpc",
          value: function filterNpc(a, b) {
            var _this7 = this;
  
            var c = a.nick,
              d = a.icon,
              e = a.type,
              f = a.wt,
              g = a.grp;
  
            if (
              !((2 !== e && 3 !== e) || 10 > f || void 0 === c) &&
              void 0 === this.npcToKillId &&
              this.storage.name.toLowerCase().includes(c.toLowerCase()) &&
              "" !== this.storage.name &&
              null !== this.storage.name
            ) {
              var _a11 = d.includes("/obrazki/npc/")
                ? d
                : "/obrazki/npc/".concat(d);
  
              this.isNpcFake(_a11, function(a) {
                !1 === a &&
                  ((_this7.npcToKillId =
                    0 === g
                      ? parseInt(b)
                      : parseInt(_this7.findBestNpcFromGrp(g))),
                  _this7.makeParty());
              });
            }
          }
        },
        {
          key: "findBestNpcFromGrp",
          value: function findBestNpcFromGrp(a) {
            var b,
              c = 999999;
  
            var _arr8 = Object.entries(this.npcs);
  
            for (var _i8 = 0; _i8 < _arr8.length; _i8++) {
              var _arr8$_i = _slicedToArray(_arr8[_i8], 2),
                d = _arr8$_i[0],
                e = _arr8$_i[1];
  
              var f = e.x,
                g = e.y,
                h = e.grp;
  
              if (a === h) {
                var _a12 = this.getDistanceToNpc(f, g);
  
                _a12 < c && ((b = d), (c = _a12));
              }
            }
  
            return b;
          }
        },
        {
          key: "reFindNpcs",
          value: function reFindNpcs() {
            var _arr9 = Object.entries(this.npcs);
  
            for (var _i9 = 0; _i9 < _arr9.length; _i9++) {
              var _arr9$_i = _slicedToArray(_arr9[_i9], 2),
                _a13 = _arr9$_i[0],
                _b11 = _arr9$_i[1];
  
              this.filterNpc(_b11, _a13);
            }
          }
        },
        {
          key: "logout",
          value: function logout() {
            this.battle ||
              this.loots ||
              this.issetMyNpcOnMap ||
              this.isHealing ||
              (window.logout());
          }
        },
        {
          key: "logIn",
          value: function logIn(a, b) {
            if (
              ("none" === this.interface ||
                void 0 === this.hero.id ||
                this.hero.id != a) &&
              !(
                "none" !== this.interface &&
                (this.battle ||
                  this.loots ||
                  this.issetMyNpcOnMap ||
                  this.isHealing)
              )
            )
              try {
                var c = new Date();
                c.setTime(c.getTime() + 259200000),
                  (document.cookie = "mchar_id="
                    .concat(a, "; path=/; expires=")
                    .concat(c.toGMTString(), "; domain=.margonem.pl")),
                  (window.location.href = "http://".concat(
                    b.toLowerCase(),
                    ".margonem.pl"
                  ));
              } catch (a) {}
          }
        },
        {
          key: "getNewRespawnTime",
          value: function getNewRespawnTime(a) {
            return Math.round(
              (1 *
                (60 *
                  (200 < a
                    ? 18
                    : Math.min(18, 0.7 + 0.18 * a - 45e-5 * a * a)))) /
                parseInt(this.serverTimerSpeed)
            );
          }
        },
        {
          key: "addNpcToTimer",
          value: function addNpcToTimer(a, b) {
            var c = this.mapName;
            (this.timerData[a + this.world] = {
              name: a,
              lvl: b,
              mapName: c,
              nextRespawn: this.timeStamp + this.getNewRespawnTime(b),
              charId: this.hero.id,
              world: this.world
            }),
              this.saveTimersCookies();
          }
        },
        {
          key: "deleteNpcFromTimer",
          value: function deleteNpcFromTimer(a) {
            this.timerData[a] !== void 0 &&
              (delete this.timerData[a], this.saveTimersCookies());
          }
        },
        {
          key: "removeNpcsFromThisCharId",
          value: function removeNpcsFromThisCharId(a) {
            if (void 0 !== a) {
              var _arr10 = Object.entries(this.timerData);
  
              for (var _i10 = 0; _i10 < _arr10.length; _i10++) {
                var _arr10$_i = _slicedToArray(_arr10[_i10], 2),
                  _b12 = _arr10$_i[0],
                  c = _arr10$_i[1];
  
                c.charId == a && this.deleteNpcFromTimer(_b12);
              }
            }
          }
        },
        {
          key: "checkTimers",
          value: function checkTimers() {
            var _arr11 = Object.entries(this.timerData);
  
            for (var _i11 = 0; _i11 < _arr11.length; _i11++) {
              var _arr11$_i = _slicedToArray(_arr11[_i11], 2),
                _a14 = _arr11$_i[0],
                _b13 = _arr11$_i[1];
  
              _b13.nextRespawn + this.waitForNpcRespawn < this.timeStamp &&
                this.createNewRespawnTime(_a14);
            }
          }
        },
        {
          key: "createNewRespawnTime",
          value: function createNewRespawnTime(a) {
            var _this8 = this;
  
            if (
              !(
                Object.values(this.npcs).some(function(b) {
                  return b.nick == _this8.timerData[a].name;
                }) || this.timerData[a].charId !== this.hero.id
              )
            ) {
              for (; this.timeStamp > this.timerData[a].nextRespawn; ) {
                this.timerData[a].nextRespawn += this.getNewRespawnTime(
                  this.timerData[a].lvl
                );
              }
  
              this.saveTimersCookies();
            }
          }
        },
        {
          key: "isThisHeroIssetInTimer",
          value: function isThisHeroIssetInTimer(b) {
            return (
              void 0 !== b &&
              Object.values(this.timerData).some(function(c) {
                return c.charId == b;
              })
            );
          }
        },
        {
          key: "isntTimersInRange",
          value: function isntTimersInRange() {
            var _this9 = this;
  
            return Object.values(this.timerData).every(function(b) {
              return b.nextRespawn - _this9.timeStamp > _this9.delayToRelog;
            });
          }
        },
        {
          key: "checkHeroOnGoodMap",
          value: function checkHeroOnGoodMap(a) {
            var _arr12 = Object.entries(this.timerData);
  
            for (var _i12 = 0; _i12 < _arr12.length; _i12++) {
              var _arr12$_i = _slicedToArray(_arr12[_i12], 2),
                _b14 = _arr12$_i[0],
                c = _arr12$_i[1];
  
              var d = c.mapName,
                e = c.charId;
              e == a &&
                this.mapName !== void 0 &&
                d !== void 0 &&
                d !== this.mapName &&
                this.deleteNpcFromTimer(_b14);
            }
          }
        },
        {
          key: "initTimer",
          value: function initTimer() {
            var _this10 = this;
  
            if (0 < Object.keys(this.timerData).length)
              if ("none" === this.interface) {
                if (
                  Object.values(this.timerData).some(function(b) {
                    return (
                      b.nextRespawn - _this10.timeStamp <= _this10.delayToRelog
                    );
                  })
                ) {
                  var _Object$values$reduce = Object.values(
                      this.timerData
                    ).reduce(function(c, a) {
                      return c.nextRespawn <= a.nextRespawn ? c : a;
                    }),
                    _a15 = _Object$values$reduce.world,
                    _b15 = _Object$values$reduce.charId;
  
                  void 0 !== _b15 && this.logIn(_b15, _a15);
                }
              } else if (
                this.isntTimersInRange() &&
                this.isThisHeroIssetInTimer(this.hero.id)
              )
                this.logout();
              else {
                this.checkHeroOnGoodMap(this.hero.id);
  
                var _a16 = Object.values(this.timerData).filter(function(b) {
                  return (
                    b.nextRespawn - _this10.timeStamp <= _this10.delayToRelog
                  );
                });
  
                if (0 < _a16.length) {
                  var _a16$reduce = _a16.reduce(function(c, a) {
                      return c.nextRespawn <= a.nextRespawn ? c : a;
                    }),
                    _b16 = _a16$reduce.charId,
                    c = _a16$reduce.world;
  
                  void 0 !== this.hero.id &&
                    parseInt(_b16) !== this.hero.id &&
                    this.logIn(_b16, c);
                }
              }
            this.checkTimers(),
              setTimeout(function() {
                _this10.initTimer();
              }, 500);
          }
        },
        {
          key: "saveTimersCookies",
          value: function saveTimersCookies() {
            var a = new Date();
            a.setMonth(a.getMonth() + 1),
              this.setCookie(
                "autoheal",
                JSON.stringify(this.timerData),
                a,
                "/",
                "margonem.pl"
              );
          }
        },
        {
          key: "randomSeconds",
          value: function randomSeconds(a, b) {
            return (
              (a *= 60), (b *= 60), Math.floor(Math.random() * (b - a + 1)) + a
            );
          }
        },
        {
          key: "randomRefresh",
          value: function randomRefresh() {
            var _this$refreshTime = _slicedToArray(this.refreshTime, 2),
              a = _this$refreshTime[0],
              b = _this$refreshTime[1];
  
            setTimeout(function() {
              location.href = location.href;
            }, 1e3 * this.randomSeconds(a, b));
          }
        },
        {
          key: "getCookie",
          value: function getCookie(a) {
            var b = document.cookie,
              c = a + "=";
            var d = b.indexOf("; " + c);
            if (-1 != d) d += 2;
            else if (((d = b.indexOf(c)), 0 != d)) return null;
            var e = document.cookie.indexOf(";", d);
            return (
              -1 == e && (e = b.length), unescape(b.substring(d + c.length, e))
            );
          }
        },
        {
          key: "setCookie",
          value: function setCookie(a, b, c, d, e, f) {
            var g =
              a +
              "=" +
              escape(b) +
              (c ? "; expires=" + c.toGMTString() : "") +
              (d ? "; path=" + d : "") +
              (e ? "; domain=" + e : "") +
              (f ? "; secure" : "");
            document.cookie = g;
          }
        },
        {
          key: "createTimerOnMainPage",
          value: function createTimerOnMainPage() {
            var _this11 = this;
  
            if (0 === Object.keys(this.timerData).length) return;
            var a = document.createElement("div");
            a.classList.add("autoheal-strona-glowna"),
              document.querySelector(".rmenu").appendChild(a);
            var b = document.createElement("style");
            (b.type = "text/css"),
              b.appendChild(
                document.createTextNode(
                  "\n            .autoheal-strona-glowna {\n                color: white;\n                font-size: 14px;\n                text-align: left;\n            }\n\n            .timer_data {\n                font-weight: bold;\n                float: right;\n                cursor: pointer;\n            }\n\n            .timer_data:hover {\n                color: gray;\n            }\n\n            .autoheal-konfiguracja {\n\n            }\n        "
                )
              ),
              document.head.appendChild(b),
              this.addNpcsToTimerBox(a),
              document.addEventListener("click", function(a) {
                try {
                  if ("timer_data" === a.target.className) {
                    var _a$target$getAttribut = a.target
                        .getAttribute("timer-data")
                        .split("|"),
                      _a$target$getAttribut2 = _slicedToArray(
                        _a$target$getAttribut,
                        2
                      ),
                      _b17 = _a$target$getAttribut2[0],
                      c = _a$target$getAttribut2[1];
  
                    c !== void 0 &&
                      _b17 !== void 0 &&
                      (_this11.deleteNpcFromTimer(_b17 + c),
                      window.showMsg(
                        "Usuni\u0119to "
                          .concat(_b17, " ze \u015Bwiata ")
                          .concat(c.charAt(0).toUpperCase() + c.slice(1), ".")
                      ));
                  }
                } catch (a) {}
              });
          }
        },
        {
          key: "addNpcsToTimerBox",
          value: function addNpcsToTimerBox(a) {
            var _this12 = this;
  
            var b = {};
  
            var _arr13 = Object.values(this.timerData);
  
            for (var _i13 = 0; _i13 < _arr13.length; _i13++) {
              var _c3 = _arr13[_i13];
              var _a17 = _c3.name,
                d = _c3.nextRespawn,
                e = _c3.world;
              b[e] === void 0
                ? (b[e] = [
                    {
                      name: _a17,
                      nextRespawn: d
                    }
                  ])
                : b[e].push({
                    name: _a17,
                    nextRespawn: d
                  });
            }
  
            var c = "";
  
            var _arr14 = Object.entries(b);
  
            for (var _i14 = 0; _i14 < _arr14.length; _i14++) {
              var _arr14$_i = _slicedToArray(_arr14[_i14], 2),
                d = _arr14$_i[0],
                e = _arr14$_i[1];
  
              (c += '<br><div style="text-align: center; font-weight: bold; text-decoration: underline">'.concat(
                this.capitalizeWorld(d),
                "</div>"
              )),
                e.sort(function(a, b) {
                  return a.nextRespawn - b.nextRespawn;
                });
              var _a18 = [];
  
              _a18.push("");
  
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;
  
              try {
                for (
                  var _iterator3 = e[Symbol.iterator](), _step3;
                  !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next())
                    .done);
                  _iteratorNormalCompletion3 = true
                ) {
                  var _b18 = _step3.value;
                  var _c4 = _b18.name,
                    _e2 = _b18.nextRespawn;
  
                  _a18.push(
                    "<span>"
                      .concat(
                        this.getTimeToRespawn(_c4, _e2),
                        '</span><span class="timer_data" tip="Kliknij, aby usun\u0105\u0107 z timera." timer-data="'
                      )
                      .concat(_c4, "|")
                      .concat(d, '">---</span>')
                  );
                }
              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                    _iterator3.return();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
              }
  
              _a18.push(""), (c += _a18.join("<hr>"));
            }
  
            (a.innerHTML = c),
              setTimeout(function() {
                _this12.addNpcsToTimerBox(a);
              }, 1e3);
          }
        },
        {
          key: "capitalizeWorld",
          value: function capitalizeWorld(a) {
            return a.charAt(0).toUpperCase() + a.slice(1) + ":";
          }
        },
        {
          key: "getTimeToRespawn",
          value: function getTimeToRespawn(a, b) {
            var c = b - this.timeStamp,
              d =
                10 > parseInt(c / 60)
                  ? "0".concat(parseInt(c / 60))
                  : parseInt(c / 60),
              e = 10 > c % 60 ? "0".concat(c % 60) : c % 60;
            return ""
              .concat(a, ": ")
              .concat(d, ":")
              .concat(e);
          }
        },
        {
          key: "removeLockAdding",
          value: function removeLockAdding() {
            "ni" === this.interface &&
              (window.Engine.lock.add = Function.prototype),
              "si" === this.interface && (window.g.lock.add = Function.prototype);
          }
        },
        {
          key: "initLagRefresher",
          value: function initLagRefresher() {
            var _this13 = this;
  
            !1 === this.startInctementingLagRefresher &&
              ((this.startInctementingLagRefresher = !0),
              setInterval(function() {
                _this13.incrementValue++,
                  8 < _this13.incrementValue && (location.href = location.href);
              }, 500));
            var a = this,
              b = window.$.ajax;
  
            window.$.ajax = function() {
              for (
                var _len = arguments.length, c = new Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                c[_key] = arguments[_key];
              }
  
              if (c[0].url.includes("engine?t=")) {
                var _b19 = c[0].success;
  
                c[0].success = function() {
                  for (
                    var _len2 = arguments.length, c = new Array(_len2), _key2 = 0;
                    _key2 < _len2;
                    _key2++
                  ) {
                    c[_key2] = arguments[_key2];
                  }
  
                  var d =
                      "object" == _typeof(c[0]) &&
                      null !== c[0] &&
                      "ok" === c[0].e,
                    e = _b19.apply(_this13, c);
  
                  return d && a.parseAjaxData(c[0]), e;
                };
              }
  
              return b.apply(_this13, c);
            };
          }
        },
        {
          key: "parseAjaxData",
          value: function parseAjaxData(a) {
            if (
              (((a.hasOwnProperty("d") && "stop" === a.d) ||
                (a.hasOwnProperty("t") && "stop" === a.t)) &&
                this.Sleep(2500).then(function() {
                  location.href = location.href;
                }),
              (this.incrementValue = 0),
              a.hasOwnProperty("loot") &&
                a.hasOwnProperty("item") &&
                a.loot.hasOwnProperty("init") &&
                a.loot.hasOwnProperty("source") &&
                0 < a.loot.init &&
                "fight" === a.loot.source)
            ) {
              var _b20 = [],
                c = [];
  
              var _arr15 = Object.entries(a.item);
  
              for (var _i15 = 0; _i15 < _arr15.length; _i15++) {
                var _arr15$_i = _slicedToArray(_arr15[_i15], 2),
                  d = _arr15$_i[0],
                  e = _arr15$_i[1];
  
                var _a19 = e.stat,
                  f = e.name;
                !0 === this.isGoodItem(_a19, f) ? _b20.push(d) : c.push(d);
              }
  
              this.sendLoots(_b20, c);
            }
  
            a.hasOwnProperty("f") &&
              a.f.hasOwnProperty("move") &&
              a.f.hasOwnProperty("current") &&
              0 === a.f.current &&
              -1 === a.f.move &&
              (this.closeBattle(), a.f.hasOwnProperty("w") && this.autoHeal()),
              a.hasOwnProperty("event_done") && this.autoHeal(),
              a.hasOwnProperty("ask") &&
                a.ask.hasOwnProperty("re") &&
                "party&a=accept&answer=" === a.ask.re &&
                !0 === this.QuickGroupSettings.accepting.active &&
                window._g("party&a=accept&answer=1");
          }
        },
        {
          key: "isGoodItem",
          value: function isGoodItem(a, b) {
            if (!0 === this.lootfilterSettings.stat.all.active) return !0;
            var c = [];
  
            var _arr16 = Object.entries(this.lootfilterSettings.stat);
  
            for (var _i16 = 0; _i16 < _arr16.length; _i16++) {
              var _arr16$_i = _slicedToArray(_arr16[_i16], 2),
                _d2 = _arr16$_i[0],
                e = _arr16$_i[1].active;
  
              !0 === e && c.push(_d2);
            }
  
            var d = this.lootfilterSettings.names;
  
            for (var _i17 = 0; _i17 < c.length; _i17++) {
              var _d3 = c[_i17];
              if (a.includes(_d3)) return !0;
            }
  
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;
  
            try {
              for (
                var _iterator4 = d[Symbol.iterator](), _step4;
                !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
                _iteratorNormalCompletion4 = true
              ) {
                var _c5 = _step4.value;
                if (b.toLowerCase() === _c5.toLowerCase()) return !0;
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
  
            return !1;
          }
        },
        {
          key: "sendLoots",
          value: function sendLoots(a, b) {
            window._g(
              "loot&not="
                .concat(b.join(","), "&want=&must=")
                .concat(a.join(","), "&final=1")
            ),
              "si" === this.interface &&
                (document.querySelector("#loots").style.display = "none");
          }
        },
        {
          key: "closeBattle",
          value: function closeBattle() {
            window._g("fight&a=quit"),
              "si" === this.interface &&
                (document.querySelector("#battle").style.display = "none");
          }
        },
        {
          key: "autoHeal",
          value: function autoHeal() {
            var _this14 = this;
  
            if (this.dead) return;
            var a =
              "ni" === this.interface
                ? window.Engine.hero.d.warrior_stats
                : window.hero;
            if (a.hp === a.maxhp) return (this.isHealing = !1);
            this.isHealing = !0;
            var b = [],
              c = [];
            var d = !1;
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;
  
            try {
              for (
                var _iterator5 = this.items[Symbol.iterator](), _step5;
                !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
                _iteratorNormalCompletion5 = true
              ) {
                var e = _step5.value;
                var f = e.stat,
                  g = e.loc,
                  h = e.name;
  
                if ("g" === g) {
                  var _this$parseItemStat = this.parseItemStat(f),
                    _g = _this$parseItemStat.timelimit,
                    i = _this$parseItemStat.lvl,
                    j = _this$parseItemStat.leczy,
                    k = _this$parseItemStat.fullheal;
  
                  if (_g !== void 0 && _g.includes(",")) continue;
                  if (void 0 !== i && i > a.lvl) continue;
                  j !== void 0 && (j <= a.maxhp - a.hp ? c.push(e) : (d = !0)),
                    "Czarna per\u0142a \u017Cycia" === h &&
                      (16e3 <= a.maxhp - a.hp ? c.push(e) : (d = !0)),
                    k !== void 0 && b.push(e);
                }
              }
            } catch (err) {
              _didIteratorError5 = true;
              _iteratorError5 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                  _iterator5.return();
                }
              } finally {
                if (_didIteratorError5) {
                  throw _iteratorError5;
                }
              }
            }
  
            if (0 < c.length) {
              var _a20 = c.sort(function(a, b) {
                return (
                  _this14.parseItemStat(b.stat).leczy -
                  _this14.parseItemStat(a.stat).leczy
                );
              });
  
              this.useItem(_a20[0].id, function() {
                _this14.Sleep(100).then(function() {
                  _this14.autoHeal();
                });
              });
            } else
              0 < b.length
                ? this.useItem(b[0].id, function() {
                    _this14.Sleep(100).then(function() {
                      _this14.autoHeal();
                    });
                  })
                : !1 == d &&
                  window.message(
                    '<span style="color: red">Brakuje Ci potek!</span>'
                  );
  
            this.isHealing = !1;
          }
        },
        {
          key: "parseItemStat",
          value: function parseItemStat(a) {
            var b = {},
              c = a.split(";");
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;
  
            try {
              for (
                var _iterator6 = c[Symbol.iterator](), _step6;
                !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);
                _iteratorNormalCompletion6 = true
              ) {
                var d = _step6.value;
  
                var _d$split = d.split("="),
                  _d$split2 = _slicedToArray(_d$split, 2),
                  _a21 = _d$split2[0],
                  _c6 = _d$split2[1];
  
                b[_a21] = _c6;
              }
            } catch (err) {
              _didIteratorError6 = true;
              _iteratorError6 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
                  _iterator6.return();
                }
              } finally {
                if (_didIteratorError6) {
                  throw _iteratorError6;
                }
              }
            }
  
            return b;
          }
        },
        {
          key: "useItem",
          value: function useItem(a, b) {
            window._g("moveitem&id=".concat(a, "&st=1"), b);
          }
        },
        {
          key: "init",
          value: function init() {
            if ((this.initTimer(), "none" === this.interface))
              return this.createTimerOnMainPage();
  
            if ("ni" === this.interface) {
              var _a22 = window.Storage.prototype.setItem;
  
              window.Storage.prototype.setItem = function(b, c) {
                if ("Margonem" === b) {
                  var _a23 = JSON.parse(c);
  
                  (_a23.f = 0), (c = JSON.stringify(_a23));
                }
  
                _a22.apply(this, [b, c]);
              };
            } else window.bB = Function.prototype;
  
            this.initBox(),
              this.initNewNpc(),
              this.initNewOther(),
              this.removeLockAdding(),
              this.initChecker(),
              this.randomRefresh(),
              this.initLagRefresher(),
              this.chatParser();
          }
        },
        {
          key: "collisions",
          get: function get() {
            return "ni" === this.interface
              ? this.updateCollisions()
              : window.map.col;
          }
        },
        {
          key: "npccol",
          get: function get() {
            return "ni" === this.interface
              ? this.getNpcColsNI()
              : window.g.npccol;
          }
        },
        {
          key: "timeStamp",
          get: function get() {
            return Math.floor(new Date().getTime() / 1e3);
          }
        },
        {
          key: "hero",
          get: function get() {
            return "ni" === this.interface ? window.Engine.hero.d : window.hero;
          }
        },
        {
          key: "map",
          get: function get() {
            return "ni" === this.interface ? window.Engine.map.size : window.map;
          }
        },
        {
          key: "mapName",
          get: function get() {
            return "ni" === this.interface
              ? window.Engine.map.d.name
              : window.map.name;
          }
        },
        {
          key: "npcs",
          get: function get() {
            return "ni" === this.interface
              ? this.npcsOnNewInterface
              : window.g.npc;
          }
        },
        {
          key: "others",
          get: function get() {
            return "ni" === this.interface
              ? this.othersOnNewInterface
              : window.g.other;
          }
        },
        {
          key: "world",
          get: function get() {
            return "ni" === this.interface
              ? window.Engine.worldName
              : window.g.worldname;
          }
        },
        {
          key: "serverTimerSpeed",
          get: function get() {
            return "none" !== this.interface &&
              [
                "nerthus",
                "aldous",
                "berufs",
                "brutal",
                "classic",
                "gefion",
                "hutena",
                "jaruna",
                "katahha",
                "lelwani",
                "majuna",
                "nomada",
                "perkun",
                "tarhuna",
                "telawel",
                "tempest",
                "zemyna",
                "zorza"
              ].includes(this.world.toLowerCase())
              ? 1
              : "none" !== this.interface &&
                "syberia" === this.world.toLowerCase()
                ? 2
                : 3;
          }
        },
        {
          key: "battle",
          get: function get() {
            return "ni" === this.interface
              ? !!window.Engine.battle && !window.Engine.battle.endBattle
              : window.g.battle;
          }
        },
        {
          key: "dead",
          get: function get() {
            return "ni" === this.interface ? window.Engine.dead : window.g.dead;
          }
        },
        {
          key: "party",
          get: function get() {
            return "ni" === this.interface ? Engine.party : window.g.party;
          }
        },
        {
          key: "loots",
          get: function get() {
            return "ni" === this.interface
              ? window.Engine.loots !== void 0 &&
                  !!(0 < Object.keys(window.Engine.loots.items).length)
              : !1 !== window.g.loots;
          }
        },
        {
          key: "issetMyNpcOnMap",
          get: function get() {
            var _this15 = this;
  
            return Object.values(this.npcs).some(function(a) {
              return _this15.storage.name
                .toLowerCase()
                .includes(a.nick.toLowerCase());
            });
          }
        },
        {
          key: "items",
          get: function get() {
            return "ni" === this.interface
              ? window.Engine.items.fetchLocationItems("g")
              : Object.values(window.g.item);
          }
        },
        {
          key: "npcsOnNewInterface",
          get: function get() {
            var a = window.Engine.npcs.check(),
              b = {};
  
            var _arr17 = Object.entries(a);
  
            for (var _i18 = 0; _i18 < _arr17.length; _i18++) {
              var _arr17$_i = _slicedToArray(_arr17[_i18], 2),
                c = _arr17$_i[0],
                d = _arr17$_i[1];
  
              b[c] = d.d;
            }
  
            return b;
          }
        },
        {
          key: "othersOnNewInterface",
          get: function get() {
            var a = window.Engine.others.check(),
              b = {};
  
            var _arr18 = Object.entries(a);
  
            for (var _i19 = 0; _i19 < _arr18.length; _i19++) {
              var _arr18$_i = _slicedToArray(_arr18[_i19], 2),
                c = _arr18$_i[0],
                d = _arr18$_i[1];
  
              b[c] = d.d;
            }
  
            return b;
          }
        }
      ]);
  
      return _class;
    })())();
  })();
  