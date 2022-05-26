soundManager.url = "js/", soundManager.flashVersion = 9, soundManager.useFlashBlock = !1;
var sound = {
    manager: new MargoSound
};

function MargoSound() {
    var t = this;
    this.data = {
        position: 0,
        file: null,
        play: 0,
        shuffle: 1,
        quality: "lq",
        volume: 100
    }, this.synchro = {
        game: !1,
        map: !1,
        manager: !1,
        activated: !1
    }, this.playing = null, this.tmpPlaying = null, this.activeFile = null, this.fadeLength = 2e3, this.intervalCounter = 0, this.id = 0, this.passingThrough = !1, this.volumeMarkerDraggable = !1, this.init = function () {
        null != this.data.file && this.groupCompare(this.data.file, this.getMapFile()) ? this.playing = this.getNextSound(this.data.position, !1, this.data.file) : this.playing = this.getNextSound(0, !1, this.getMapFile()), 1 == parseInt(this.data.play) && this.playing.play()
    }, this.getMapFile = function () {
        var t = /(.*?)\.jpg/.exec(map.bg);
        return isset(sound.bgList[t[1]]) ? sound.bgList[t[1]] : "l.mp3"
    }, this.groupCompare = function (t, i) {
        return !t && !i && (void 0 !== sound.fileList[t][0] && void 0 !== sound.fileList[i][0] && sound.fileList[t][0] == sound.fileList[i][0])
    }, this.getNextSound = function (i, a, s) {
        return this.activeFile = s, soundManager.createSound({
            id: "sound" + t.id++,
            position: i,
            volume: a ? 0 : t.data.volume,
            url: "https://micc.garmory-cdn.cloud/music/" + t.data.quality + "/" + s,
            whileplaying: function () {
                var i = this.duration - this.position;
                if (i < t.fadeLength && 3 == this.readyState ? (0 == t.passingThrough && (t.passingThrough = !0, t.tmpPlaying = t.getNextSound(0, !!t.data.shuffle, t.getNextFile()), t.tmpPlaying.play()), this.setVolume(i / t.fadeLength * 100 * (t.data.volume / 100))) : t.intervalCounter >= 10 ? (t.saveSettings(), t.intervalCounter = 0) : t.intervalCounter++, this.volume < t.data.volume)
                    if (this.position < t.fadeLength) {
                        var a = this.position / t.fadeLength * 100 * (t.data.volume / 100);
                        this.setVolume(a > 100 ? 100 : a)
                    } else this.setVolume(t.data.volume)
            },
            onfinish: function () {
                t.playing.destruct(), t.playing = t.tmpPlaying, t.passingThrough = !1
            }
        })
    }, this.attachVolumeMarkerDrag = function () {
        this.volumeMarkerDraggable || ($("#volumeSlider .marker").draggable({
            axis: "y",
            containment: "parent",
            stop: function () {
                sound.manager.setVolume(2 * Math.abs(parseInt($("#volumeSlider .marker").css("top")) - 50))
            },
            drag: function () {
                sound.manager.setVolume(2 * Math.abs(parseInt($("#volumeSlider .marker").css("top")) - 50))
            }
        }), this.volumeMarkerDraggable = !0)
    }, this.setVolume = function (t) {
        t = parseInt(t < 0 ? 0 : t > 100 ? 100 : t), this.data.volume = t, this.saveSettings(), this.playing && this.playing.setVolume(t)
    }, this.volumeDown = function () {
        this.setVolume(this.data.volume - 5)
    }, this.volumeUp = function () {
        this.setVolume(this.data.volume + 5)
    }, this.getNextFile = function () {
        var t = this.getMapFile(),
            i = sound.fileList[this.activeFile][0];
        if (this.data.shuffle && 0 != i) {
            var a = this.getActiveGroup();
            if (a.length > 0)
                do {
                    t = a[Math.floor(Math.random() * (a.length - 1 - 0 + 1))]
                } while (t == this.activeFile)
        }
        return t
    }, this.getActiveGroup = function () {
        var t = sound.fileList[this.activeFile][0],
            i = [];
        for (var a in sound.fileList) sound.fileList[a][0] == t && i.push(a);
        return i
    }, this.initSettings = function () {
        var t = getCookie("margoSound");
        if (t) {
            var i = t.split(",");
            if (void 0 !== i[0] && void 0 !== i[1] && !isNaN(parseInt(i[1])) && void 0 !== i[2] && void 0 !== i[3] && void 0 !== i[4] && void 0 !== i[5]) return this.data.position = i[1], this.data.file = i[0], this.data.play = i[2], this.data.shuffle = i[3], this.data.quality = i[4], this.data.volume = parseInt(i[5]), this.data.volume = this.data.volume < 0 ? 0 : this.data.volume > 100 ? 100 : this.data.volume, !0
        }
    }, this.saveSettings = function () {
        var t = new Date;
        t.setTime(t.getTime() + 31104e7);
        var i = 0;
        this.playing && null != this.playing.position && (i = this.playing.position), setCookie("margoSound", this.activeFile + "," + i + "," + this.data.play + "," + this.data.shuffle + "," + this.data.quality + "," + this.data.volume, t, !1, !1, !1)
    }, this.synchroStart = function (t) {
        this.synchro[t] = !0, this.synchro.map && this.synchro.manager && this.synchro.game && !this.synchro.activated && (this.init(), this.synchro.activated = !0)
    }, this.start = function () {
        this.stop(), this.playing = this.getNextSound(0, !1, this.getMapFile()), this.playing && this.playing.play(), this.data.play = 1, 1 == this.data.play ? $("#startbutton").addClass("active") : $("#startbutton").removeClass("active")
    }, this.stop = function () {
        this.data.play = 0, this.saveSettings(), this.playing && this.playing.destruct(), 1 == this.data.play ? $("#startbutton").addClass("active") : $("#startbutton").removeClass("active")
    }, this.toggleStart = function () {
        1 == this.data.play ? this.stop() : this.start()
    }, this.toggleShuffle = function () {
        this.data.shuffle = 1 == this.data.shuffle ? 0 : 1, this.saveSettings(), 1 == this.data.shuffle ? $("#shufflebutton").addClass("active") : $("#shufflebutton").removeClass("active")
    }, this.toggleQuality = function () {
        this.data.quality = "lq" == this.data.quality ? "hq" : "lq", "hq" == this.data.quality ? $("#hdbutton").addClass("active") : $("#hdbutton").removeClass("active"), this.saveSettings(), this.data.play && (this.engineStop(), this.initSettings(), this.init())
    }, this.engineStop = function () {
        this.playing && this.playing.destruct(), this.tmpPlaying && this.tmpPlaying.destruct()
    }, this.generateMenu = function () {
        var t = '<div id=soundInterface>\n               <div onclick="sound.manager.toggleStart(); return false;" tip="' + _t("start_stop", null, "music_interface") + '" id=startbutton class=' + (1 == sound.manager.data.play ? "active" : "") + '></div>\n               <div onclick="sound.manager.toggleShuffle(); return false;" tip="' + _t("on_off", null, "music_interface") + '" id=shufflebutton class=' + (1 == sound.manager.data.shuffle ? "active" : "") + '></div>\n               <div onclick="sound.manager.toggleQuality();return false;" tip="' + _t("quality_change", null, "music_interface") + '" id=hdbutton class=' + ("hq" == sound.manager.data.quality ? "active" : "") + '></div>\n               <div id=volumeSlider><div tip="' + _t("volume_change", null, "music_interface") + '" onmouseover="sound.manager.attachVolumeMarkerDrag()" class=marker style="top:' + (50 - this.data.volume / 100 * 50) + 'px"></div></div>\n               </div>';
        return this.volumeMarkerDraggable = !1, t
    }, this.initSettings()
}
soundManager.onready((function () {
    sound.manager.synchroStart("manager")
})), sound.bgList = {
    "002": "002.mp3",
    "003": "003.mp3",
    "004": "004.mp3",
    "006": "006.mp3",
    "013": "013.mp3",
    "014": "014.mp3",
    "015": "015.mp3",
    "027": "027.mp3",
    "27n": "027.mp3",
    "032": "032.mp3",
    "007": "007.mp3",
    "07n": "007.mp3",
    "018": "018.mp3",
    "019": "019.mp3",
    "19n": "019.mp3",
    "035": "035.mp3",
    "35n": "035.mp3",
    "005": "005.mp3",
    "008": "008.mp3",
    "009": "009.mp3",
    "010": "010.mp3",
    "011": "011.mp3",
    "012": "012.mp3",
    "021": "021.mp3",
    "033": "033.mp3",
    "034": "034.mp3",
    aa1: "a.mp3",
    aa2: "a.mp3",
    bb: "b.mp3",
    cc1: "c.mp3",
    cc2: "c.mp3",
    dd1: "d.mp3",
    dd2: "d.mp3",
    dd3: "d.mp3",
    dd4: "d.mp3",
    ee: "e.mp3",
    f: "f.mp3",
    g: "g.mp3",
    h: "h.mp3",
    i: "i.mp3",
    j: "j.mp3",
    k: "k.mp3",
    l: "l.mp3"
}, sound.fileList = {
    "002.mp3": [1],
    "003.mp3": [2],
    "004.mp3": [1],
    "006.mp3": [1],
    "013.mp3": [2],
    "014.mp3": [2],
    "015.mp3": [2],
    "027.mp3": [1],
    "032.mp3": [3],
    "007.mp3": [4],
    "018.mp3": [8],
    "019.mp3": [7],
    "035.mp3": [4],
    "005.mp3": [3],
    "008.mp3": [3],
    "009.mp3": [3],
    "010.mp3": [4],
    "011.mp3": [4],
    "012.mp3": [3],
    "021.mp3": [4],
    "033.mp3": [8],
    "034.mp3": [7],
    "a.mp3": [0],
    "b.mp3": [0],
    "c.mp3": [6],
    "d.mp3": [6],
    "e.mp3": [5],
    "f.mp3": [0],
    "g.mp3": [0],
    "h.mp3": [0],
    "i.mp3": [6],
    "j.mp3": [5],
    "k.mp3": [5],
    "l.mp3": [5]
}, sound.groups = {
    0: "no_group",
    1: "bad_caves",
    2: "caves",
    3: "bad_fields",
    4: "fields",
    5: "insides",
    6: "bad_insides",
    7: "sea",
    8: "desert"
};