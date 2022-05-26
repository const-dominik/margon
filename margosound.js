! function (t, e) {
    function n(n, i) {
        function o(t) {
            return dt.preferFlash && it && !dt.ignoreFlash && dt.flash[t] !== e && dt.flash[t]
        }

        function a(t) {
            return function (e) {
                var n = this._s;
                return n && n._a ? t.call(this, e) : null
            }
        }
        this.setupOptions = {
                url: n || null,
                flashVersion: 8,
                debugMode: !0,
                debugFlash: !1,
                useConsole: !0,
                consoleOnly: !0,
                waitForWindowLoad: !1,
                bgColor: "#ffffff",
                useHighPerformance: !1,
                flashPollingInterval: null,
                html5PollingInterval: null,
                flashLoadTimeout: 1e3,
                wmode: null,
                allowScriptAccess: "always",
                useFlashBlock: !1,
                useHTML5Audio: !0,
                forceUseGlobalHTML5Audio: !1,
                ignoreMobileRestrictions: !1,
                html5Test: /^(probably|maybe)$/i,
                preferFlash: !1,
                noSWFCache: !1,
                idPrefix: "sound"
            },
            this.defaultOptions = {
                autoLoad: !1,
                autoPlay: !1,
                from: null,
                loops: 1,
                onid3: null,
                onerror: null,
                onload: null,
                whileloading: null,
                onplay: null,
                onpause: null,
                onresume: null,
                whileplaying: null,
                onposition: null,
                onstop: null,
                onfinish: null,
                multiShot: !0,
                multiShotEvents: !1,
                position: null,
                pan: 0,
                playbackRate: 1,
                stream: !0,
                to: null,
                type: null,
                usePolicyFile: !1,
                volume: 100
            },
            this.flash9Options = {
                onfailure: null,
                isMovieStar: null,
                usePeakData: !1,
                useWaveformData: !1,
                useEQData: !1,
                onbufferchange: null,
                ondataerror: null
            },
            this.movieStarOptions = {
                bufferTime: 3,
                serverURL: null,
                onconnect: null,
                duration: null
            },
            this.audioFormats = {
                mp3: {
                    type: ['audio/mpeg; codecs="mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust"],
                    required: !0
                },
                mp4: {
                    related: ["aac", "m4a", "m4b"],
                    type: ['audio/mp4; codecs="mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM", "audio/mpeg4-generic"],
                    required: !1
                },
                ogg: {
                    type: ["audio/ogg; codecs=vorbis"],
                    required: !1
                },
                opus: {
                    type: ["audio/ogg; codecs=opus", "audio/opus"],
                    required: !1
                },
                wav: {
                    type: ['audio/wav; codecs="1"', "audio/wav", "audio/wave", "audio/x-wav"],
                    required: !1
                },
                flac: {
                    type: ["audio/flac"],
                    required: !1
                }
            },
            this.movieID = "sm2-container",
            this.id = i || "sm2movie",
            this.debugID = "soundmanager-debug",
            this.debugURLParam = /([#?&])debug=1/i,
            this.versionNumber = "V2.97a.20170601",
            this.altURL = this.movieURL = this.version = null,
            this.enabled = this.swfLoaded = !1,
            this.oMC = null,
            this.sounds = {},
            this.soundIDs = [],
            this.didFlashBlock = this.muted = !1,
            this.filePattern = null,
            this.filePatterns = {
                flash8: /\.mp3(\?.*)?$/i,
                flash9: /\.mp3(\?.*)?$/i
            },
            this.features = {
                buffering: !1,
                peakData: !1,
                waveformData: !1,
                eqData: !1,
                movieStar: !1
            },
            this.sandbox = {},
            this.html5 = {
                usingFlash: null
            },
            this.flash = {},
            this.ignoreFlash = this.html5Only = !1;
        var s, r, u, l, d, f, c, h, p, m, _, y, g, O, v, M, b, T, P, L, w, S, I, A, D, H, F, E, C, k, R, x, N, U, B, q, j, V, Q, W, $, G, K, X, J, Y, Z, z, tt, et, nt, it, ot, at, st, rt, ut, lt, dt = this,
            ft = null,
            ct = null,
            ht = navigator.userAgent,
            pt = t.location.href.toString(),
            mt = document,
            _t = [],
            yt = !1,
            gt = !1,
            Ot = !1,
            vt = !1,
            Mt = !1,
            bt = null,
            Tt = null,
            Pt = !1,
            Lt = !1,
            wt = 0,
            St = null,
            It = [],
            At = null,
            Dt = Array.prototype.slice,
            Ht = !1,
            Ft = 0,
            Et = ht.match(/(ipad|iphone|ipod)/i),
            Ct = ht.match(/android/i),
            kt = ht.match(/msie|trident/i),
            Rt = ht.match(/webkit/i),
            xt = ht.match(/safari/i) && !ht.match(/chrome/i),
            Nt = ht.match(/opera/i),
            Ut = ht.match(/(mobile|pre\/|xoom)/i) || Et || Ct,
            Bt = !pt.match(/usehtml5audio/i) && !pt.match(/sm2-ignorebadua/i) && xt && !ht.match(/silk/i) && ht.match(/OS\sX\s10_6_([3-7])/i),
            qt = mt.hasFocus !== e ? mt.hasFocus() : null,
            jt = xt && (mt.hasFocus === e || !mt.hasFocus()),
            Vt = !jt,
            Qt = /(mp3|mp4|mpa|m4a|m4b)/i,
            Wt = mt.location ? mt.location.protocol.match(/http/i) : null,
            $t = Wt ? "" : "//",
            Gt = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4|m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,
            Kt = "mpeg4 aac flv mov mp4 m4v f4v m4a m4b mp4v 3gp 3g2".split(" "),
            Xt = new RegExp("\\.(" + Kt.join("|") + ")(\\?.*)?$", "i");
        this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i,
            this.useAltURL = !Wt,
            J = [null, "MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR_DECODE", "MEDIA_ERR_SRC_NOT_SUPPORTED"];
        try {
            lt = Audio !== e && (Nt && opera !== e && 10 > opera.version() ? new Audio(null) : new Audio).canPlayType !== e
        } catch (t) {
            lt = !1
        }
        this.hasHTML5 = lt,
            this.setup = function (t) {
                var n = !dt.url;
                return t !== e && Ot && At && dt.ok(),
                    p(t),
                    Ht || (Ut ? dt.setupOptions.ignoreMobileRestrictions && !dt.setupOptions.forceUseGlobalHTML5Audio || (It.push(P.globalHTML5),
                        Ht = !0) : dt.setupOptions.forceUseGlobalHTML5Audio && (It.push(P.globalHTML5),
                        Ht = !0)),
                    !ut && Ut && (dt.setupOptions.ignoreMobileRestrictions ? It.push(P.ignoreMobile) : (dt.setupOptions.useHTML5Audio = !0,
                        dt.setupOptions.preferFlash = !1,
                        Et ? dt.ignoreFlash = !0 : (Ct && !ht.match(/android\s2\.3/i) || !Ct) && (Ht = !0))),
                    t && (n && I && t.url !== e && dt.beginDelayedInit(),
                        I || t.url === e || "complete" !== mt.readyState || setTimeout(w, 1)),
                    ut = !0,
                    dt
            },
            this.supported = this.ok = function () {
                return At ? Ot && !vt : dt.useHTML5Audio && dt.hasHTML5
            },
            this.getMovie = function (e) {
                return r(e) || mt[e] || t[e]
            },
            this.createSound = function (t, n) {
                function i() {
                    return o = U(o),
                        dt.sounds[o.id] = new s(o),
                        dt.soundIDs.push(o.id),
                        dt.sounds[o.id]
                }
                var o, a = null;
                if (!Ot || !dt.ok())
                    return !1;
                if (n !== e && (t = {
                        id: t,
                        url: n
                    }),
                    (o = h(t)).url = W(o.url),
                    o.id === e && (o.id = dt.setupOptions.idPrefix + Ft++),
                    q(o.id, !0))
                    return dt.sounds[o.id];
                if (K(o))
                    (a = i())._setup_html5(o);
                else {
                    if (dt.html5Only || dt.html5.usingFlash && o.url && o.url.match(/data:/i))
                        return i();
                    8 < f && null === o.isMovieStar && (o.isMovieStar = !!(o.serverURL || o.type && o.type.match(Gt) || o.url && o.url.match(Xt))),
                        o = B(o, void 0),
                        a = i(),
                        8 === f ? ct._createSound(o.id, o.loops || 1, o.usePolicyFile) : (ct._createSound(o.id, o.url, o.usePeakData, o.useWaveformData, o.useEQData, o.isMovieStar, !!o.isMovieStar && o.bufferTime, o.loops || 1, o.serverURL, o.duration || null, o.autoPlay, !0, o.autoLoad, o.usePolicyFile),
                            o.serverURL || (a.connected = !0,
                                o.onconnect && o.onconnect.apply(a))),
                        o.serverURL || !o.autoLoad && !o.autoPlay || a.load(o)
                }
                return !o.serverURL && o.autoPlay && a.play(),
                    a
            },
            this.destroySound = function (t, e) {
                if (!q(t))
                    return !1;
                var n, i = dt.sounds[t];
                for (i.stop(),
                    i._iO = {},
                    i.unload(),
                    n = 0; n < dt.soundIDs.length; n++)
                    if (dt.soundIDs[n] === t) {
                        dt.soundIDs.splice(n, 1);
                        break
                    }
                return e || i.destruct(!0),
                    delete dt.sounds[t],
                    !0
            },
            this.load = function (t, e) {
                return !!q(t) && dt.sounds[t].load(e)
            },
            this.unload = function (t) {
                return !!q(t) && dt.sounds[t].unload()
            },
            this.onposition = this.onPosition = function (t, e, n, i) {
                return !!q(t) && dt.sounds[t].onposition(e, n, i)
            },
            this.clearOnPosition = function (t, e, n) {
                return !!q(t) && dt.sounds[t].clearOnPosition(e, n)
            },
            this.start = this.play = function (t, e) {
                var n = null,
                    i = e && !(e instanceof Object);
                if (!Ot || !dt.ok())
                    return !1;
                if (q(t, i))
                    i && (e = {
                        url: e
                    });
                else {
                    if (!i)
                        return !1;
                    i && (e = {
                            url: e
                        }),
                        e && e.url && (e.id = t,
                            n = dt.createSound(e).play())
                }
                return null === n && (n = dt.sounds[t].play(e)),
                    n
            },
            this.setPlaybackRate = function (t, e, n) {
                return !!q(t) && dt.sounds[t].setPlaybackRate(e, n)
            },
            this.setPosition = function (t, e) {
                return !!q(t) && dt.sounds[t].setPosition(e)
            },
            this.stop = function (t) {
                return !!q(t) && dt.sounds[t].stop()
            },
            this.stopAll = function () {
                for (var t in dt.sounds)
                    dt.sounds.hasOwnProperty(t) && dt.sounds[t].stop()
            },
            this.pause = function (t) {
                return !!q(t) && dt.sounds[t].pause()
            },
            this.pauseAll = function () {
                var t;
                for (t = dt.soundIDs.length - 1; 0 <= t; t--)
                    dt.sounds[dt.soundIDs[t]].pause()
            },
            this.resume = function (t) {
                return !!q(t) && dt.sounds[t].resume()
            },
            this.resumeAll = function () {
                var t;
                for (t = dt.soundIDs.length - 1; 0 <= t; t--)
                    dt.sounds[dt.soundIDs[t]].resume()
            },
            this.togglePause = function (t) {
                return !!q(t) && dt.sounds[t].togglePause()
            },
            this.setPan = function (t, e) {
                return !!q(t) && dt.sounds[t].setPan(e)
            },
            this.setVolume = function (t, n) {
                var i, o;
                if (t !== e && !isNaN(t) && n === e) {
                    for (i = 0,
                        o = dt.soundIDs.length; i < o; i++)
                        dt.sounds[dt.soundIDs[i]].setVolume(t);
                    return !1
                }
                return !!q(t) && dt.sounds[t].setVolume(n)
            },
            this.mute = function (t) {
                var e = 0;
                if (t instanceof String && (t = null),
                    t)
                    return !!q(t) && dt.sounds[t].mute();
                for (e = dt.soundIDs.length - 1; 0 <= e; e--)
                    dt.sounds[dt.soundIDs[e]].mute();
                return dt.muted = !0
            },
            this.muteAll = function () {
                dt.mute()
            },
            this.unmute = function (t) {
                if (t instanceof String && (t = null),
                    t)
                    return !!q(t) && dt.sounds[t].unmute();
                for (t = dt.soundIDs.length - 1; 0 <= t; t--)
                    dt.sounds[dt.soundIDs[t]].unmute();
                return dt.muted = !1,
                    !0
            },
            this.unmuteAll = function () {
                dt.unmute()
            },
            this.toggleMute = function (t) {
                return !!q(t) && dt.sounds[t].toggleMute()
            },
            this.getMemoryUse = function () {
                var t = 0;
                return ct && 8 !== f && (t = parseInt(ct._getMemoryUse(), 10)),
                    t
            },
            this.disable = function (n) {
                var i;
                if (n === e && (n = !1),
                    vt)
                    return !1;
                for (vt = !0,
                    i = dt.soundIDs.length - 1; 0 <= i; i--)
                    E(dt.sounds[dt.soundIDs[i]]);
                return E(dt),
                    c(n),
                    et.remove(t, "load", g),
                    !0
            },
            this.canPlayMIME = function (t) {
                var e;
                return dt.hasHTML5 && (e = X({
                        type: t
                    })),
                    !e && At && (e = t && dt.ok() ? !!(8 < f && t.match(Gt) || t.match(dt.mimePattern)) : null),
                    e
            },
            this.canPlayURL = function (t) {
                var e;
                return dt.hasHTML5 && (e = X({
                        url: t
                    })),
                    !e && At && (e = t && dt.ok() ? !!t.match(dt.filePattern) : null),
                    e
            },
            this.canPlayLink = function (t) {
                return !(t.type === e || !t.type || !dt.canPlayMIME(t.type)) || dt.canPlayURL(t.href)
            },
            this.getSoundById = function (t, e) {
                return t ? dt.sounds[t] : null
            },
            this.onready = function (e, n) {
                if ("function" != typeof e)
                    throw R("needFunction", "onready");
                return n || (n = t),
                    _("onready", e, n),
                    y(),
                    !0
            },
            this.ontimeout = function (e, n) {
                if ("function" != typeof e)
                    throw R("needFunction", "ontimeout");
                return n || (n = t),
                    _("ontimeout", e, n),
                    y({
                        type: "ontimeout"
                    }),
                    !0
            },
            this._wD = this._writeDebug = function (t, e) {
                return !0
            },
            this._debug = function () {},
            this.reboot = function (e, n) {
                var i, o, a;
                for (i = dt.soundIDs.length - 1; 0 <= i; i--)
                    dt.sounds[dt.soundIDs[i]].destruct();
                if (ct)
                    try {
                        kt && (Tt = ct.innerHTML),
                            bt = ct.parentNode.removeChild(ct)
                    } catch (t) {}
                if (Tt = bt = At = ct = null,
                    dt.enabled = I = Ot = Pt = Lt = yt = gt = vt = Ht = dt.swfLoaded = !1,
                    dt.soundIDs = [],
                    dt.sounds = {},
                    Ft = 0,
                    ut = !1,
                    e)
                    _t = [];
                else
                    for (i in _t)
                        if (_t.hasOwnProperty(i))
                            for (o = 0,
                                a = _t[i].length; o < a; o++)
                                _t[i][o].fired = !1;
                return dt.html5 = {
                        usingFlash: null
                    },
                    dt.flash = {},
                    dt.html5Only = !1,
                    dt.ignoreFlash = !1,
                    t.setTimeout((function () {
                        n || dt.beginDelayedInit()
                    }), 20),
                    dt
            },
            this.reset = function () {
                return dt.reboot(!0, !0)
            },
            this.getMoviePercent = function () {
                return ct && "PercentLoaded" in ct ? ct.PercentLoaded() : null
            },
            this.beginDelayedInit = function () {
                Mt = !0,
                    w(),
                    setTimeout((function () {
                        return !Lt && (D(),
                            L(),
                            Lt = !0)
                    }), 20),
                    O()
            },
            this.destruct = function () {
                dt.disable(!0)
            },
            s = function (t) {
                var n, i, o, a, s, r, u, l, d, c, p, m = this,
                    _ = !1,
                    y = [],
                    g = 0,
                    O = null;
                i = n = null,
                    this.sID = this.id = t.id,
                    this.url = t.url,
                    this._iO = this.instanceOptions = this.options = h(t),
                    this.pan = this.options.pan,
                    this.volume = this.options.volume,
                    this.isHTML5 = !1,
                    this._a = null,
                    p = !this.url,
                    this.id3 = {},
                    this._debug = function () {},
                    this.load = function (t) {
                        var n;
                        if (t !== e ? m._iO = h(t, m.options) : (t = m.options,
                                m._iO = t,
                                O && O !== m.url && (m._iO.url = m.url,
                                    m.url = null)),
                            m._iO.url || (m._iO.url = m.url),
                            m._iO.url = W(m._iO.url),
                            !(n = m.instanceOptions = m._iO).url && !m.url)
                            return m;
                        if (n.url === m.url && 0 !== m.readyState && 2 !== m.readyState)
                            return 3 === m.readyState && n.onload && rt(m, (function () {
                                    n.onload.apply(m, [!!m.duration])
                                })),
                                m;
                        if (m.loaded = !1,
                            m.readyState = 1,
                            m.playState = 0,
                            m.id3 = {},
                            K(n))
                            m._setup_html5(n)._called_load || (m._html5_canplay = !1,
                                m.url !== n.url && (m._a.src = n.url,
                                    m.setPosition(0)),
                                m._a.autobuffer = "auto",
                                m._a.preload = "auto",
                                m._a._called_load = !0);
                        else {
                            if (dt.html5Only || m._iO.url && m._iO.url.match(/data:/i))
                                return m;
                            try {
                                m.isHTML5 = !1,
                                    m._iO = B(U(n)),
                                    m._iO.autoPlay && (m._iO.position || m._iO.from) && (m._iO.autoPlay = !1),
                                    n = m._iO,
                                    8 === f ? ct._load(m.id, n.url, n.stream, n.autoPlay, n.usePolicyFile) : ct._load(m.id, n.url, !!n.stream, !!n.autoPlay, n.loops || 1, !!n.autoLoad, n.usePolicyFile)
                            } catch (t) {
                                H({
                                    type: "SMSOUND_LOAD_JS_EXCEPTION",
                                    fatal: !0
                                })
                            }
                        }
                        return m.url = n.url,
                            m
                    },
                    this.unload = function () {
                        return 0 !== m.readyState && (m.isHTML5 ? (r(),
                                    m._a && (m._a.pause(),
                                        O = Z(m._a))) : 8 === f ? ct._unload(m.id, "about:blank") : ct._unload(m.id),
                                o()),
                            m
                    },
                    this.destruct = function (t) {
                        m.isHTML5 ? (r(),
                                m._a && (m._a.pause(),
                                    Z(m._a),
                                    Ht || s(),
                                    m._a._s = null,
                                    m._a = null)) : (m._iO.onfailure = null,
                                ct._destroySound(m.id)),
                            t || dt.destroySound(m.id, !0)
                    },
                    this.start = this.play = function (t, n) {
                        var i, o, a, s;
                        if (i = !0,
                            n = n === e || n,
                            t || (t = {}),
                            m.url && (m._iO.url = m.url),
                            m._iO = h(m._iO, m.options),
                            m._iO = h(t, m._iO),
                            m._iO.url = W(m._iO.url),
                            m.instanceOptions = m._iO,
                            !m.isHTML5 && m._iO.serverURL && !m.connected)
                            return m.getAutoPlay() || m.setAutoPlay(!0),
                                m;
                        if (K(m._iO) && (m._setup_html5(m._iO),
                                u()),
                            1 === m.playState && !m.paused && !(i = m._iO.multiShot))
                            return m.isHTML5 && m.setPosition(m._iO.position),
                                m;
                        if (t.url && t.url !== m.url && (m.readyState || m.isHTML5 || 8 !== f || !p ? m.load(m._iO) : p = !1),
                            !m.loaded)
                            if (0 === m.readyState) {
                                if (m.isHTML5 || dt.html5Only) {
                                    if (!m.isHTML5)
                                        return m;
                                    m.load(m._iO)
                                } else
                                    m._iO.autoPlay = !0,
                                    m.load(m._iO);
                                m.instanceOptions = m._iO
                            } else if (2 === m.readyState)
                            return m;
                        return !m.isHTML5 && 9 === f && 0 < m.position && m.position === m.duration && (t.position = 0),
                            m.paused && 0 <= m.position && (!m._iO.serverURL || 0 < m.position) ? m.resume() : (m._iO = h(t, m._iO),
                                (!m.isHTML5 && null !== m._iO.position && 0 < m._iO.position || null !== m._iO.from && 0 < m._iO.from || null !== m._iO.to) && 0 === m.instanceCount && 0 === m.playState && !m._iO.serverURL && (i = function () {
                                        m._iO = h(t, m._iO),
                                            m.play(m._iO)
                                    },
                                    m.isHTML5 && !m._html5_canplay ? m.load({
                                        _oncanplay: i
                                    }) : m.isHTML5 || m.loaded || m.readyState && 2 === m.readyState || m.load({
                                        onload: i
                                    }),
                                    m._iO = c()),
                                (!m.instanceCount || m._iO.multiShotEvents || m.isHTML5 && m._iO.multiShot && !Ht || !m.isHTML5 && 8 < f && !m.getAutoPlay()) && m.instanceCount++,
                                m._iO.onposition && 0 === m.playState && l(m),
                                m.playState = 1,
                                m.paused = !1,
                                m.position = m._iO.position === e || isNaN(m._iO.position) ? 0 : m._iO.position,
                                m.isHTML5 || (m._iO = B(U(m._iO))),
                                m._iO.onplay && n && (m._iO.onplay.apply(m),
                                    _ = !0),
                                m.setVolume(m._iO.volume, !0),
                                m.setPan(m._iO.pan, !0),
                                1 !== m._iO.playbackRate && m.setPlaybackRate(m._iO.playbackRate),
                                m.isHTML5 ? 2 > m.instanceCount ? (u(),
                                    i = m._setup_html5(),
                                    m.setPosition(m._iO.position),
                                    i.play()) : (o = new Audio(m._iO.url),
                                    a = function () {
                                        et.remove(o, "ended", a),
                                            m._onfinish(m),
                                            Z(o),
                                            o = null
                                    },
                                    s = function () {
                                        et.remove(o, "canplay", s);
                                        try {
                                            o.currentTime = m._iO.position / 1e3
                                        } catch (t) {}
                                        o.play()
                                    },
                                    et.add(o, "ended", a),
                                    m._iO.volume !== e && (o.volume = Math.max(0, Math.min(1, m._iO.volume / 100))),
                                    m.muted && (o.muted = !0),
                                    m._iO.position ? et.add(o, "canplay", s) : o.play()) : (i = ct._start(m.id, m._iO.loops || 1, 9 === f ? m.position : m.position / 1e3, m._iO.multiShot || !1),
                                    9 !== f || i || m._iO.onplayerror && m._iO.onplayerror.apply(m))),
                            m
                    },
                    this.stop = function (t) {
                        var e = m._iO;
                        return 1 === m.playState && (m._onbufferchange(0),
                                m._resetOnPosition(0),
                                m.paused = !1,
                                m.isHTML5 || (m.playState = 0),
                                d(),
                                e.to && m.clearOnPosition(e.to),
                                m.isHTML5 ? m._a && (t = m.position,
                                    m.setPosition(0),
                                    m.position = t,
                                    m._a.pause(),
                                    m.playState = 0,
                                    m._onTimer(),
                                    r()) : (ct._stop(m.id, t),
                                    e.serverURL && m.unload()),
                                m.instanceCount = 0,
                                m._iO = {},
                                e.onstop && e.onstop.apply(m)),
                            m
                    },
                    this.setAutoPlay = function (t) {
                        m._iO.autoPlay = t,
                            m.isHTML5 || (ct._setAutoPlay(m.id, t),
                                t && (m.instanceCount || 1 !== m.readyState || m.instanceCount++))
                    },
                    this.getAutoPlay = function () {
                        return m._iO.autoPlay
                    },
                    this.setPlaybackRate = function (t) {
                        if (t = Math.max(.5, Math.min(4, t)),
                            m.isHTML5)
                            try {
                                m._iO.playbackRate = t,
                                    m._a.playbackRate = t
                            } catch (t) {}
                        return m
                    },
                    this.setPosition = function (t) {
                        t === e && (t = 0);
                        var n = m.isHTML5 ? Math.max(t, 0) : Math.min(m.duration || m._iO.duration, Math.max(t, 0));
                        if (m.position = n,
                            t = m.position / 1e3,
                            m._resetOnPosition(m.position),
                            m._iO.position = n,
                            m.isHTML5) {
                            if (m._a) {
                                if (m._html5_canplay) {
                                    if (m._a.currentTime.toFixed(3) !== t.toFixed(3))
                                        try {
                                            m._a.currentTime = t,
                                                (0 === m.playState || m.paused) && m._a.pause()
                                        } catch (t) {}
                                } else if (t)
                                    return m;
                                m.paused && m._onTimer(!0)
                            }
                        } else
                            t = 9 === f ? m.position : t,
                            m.readyState && 2 !== m.readyState && ct._setPosition(m.id, t, m.paused || !m.playState, m._iO.multiShot);
                        return m
                    },
                    this.pause = function (t) {
                        return m.paused || 0 === m.playState && 1 !== m.readyState || (m.paused = !0,
                                m.isHTML5 ? (m._setup_html5().pause(),
                                    r()) : (t || t === e) && ct._pause(m.id, m._iO.multiShot),
                                m._iO.onpause && m._iO.onpause.apply(m)),
                            m
                    },
                    this.resume = function () {
                        var t = m._iO;
                        return m.paused ? (m.paused = !1,
                            m.playState = 1,
                            m.isHTML5 ? (m._setup_html5().play(),
                                u()) : (t.isMovieStar && !t.serverURL && m.setPosition(m.position),
                                ct._pause(m.id, t.multiShot)),
                            !_ && t.onplay ? (t.onplay.apply(m),
                                _ = !0) : t.onresume && t.onresume.apply(m),
                            m) : m
                    },
                    this.togglePause = function () {
                        return 0 === m.playState ? (m.play({
                                position: 9 !== f || m.isHTML5 ? m.position / 1e3 : m.position
                            }),
                            m) : (m.paused ? m.resume() : m.pause(),
                            m)
                    },
                    this.setPan = function (t, n) {
                        return t === e && (t = 0),
                            n === e && (n = !1),
                            m.isHTML5 || ct._setPan(m.id, t),
                            m._iO.pan = t,
                            n || (m.pan = t,
                                m.options.pan = t),
                            m
                    },
                    this.setVolume = function (t, n) {
                        return t === e && (t = 100),
                            n === e && (n = !1),
                            m.isHTML5 ? m._a && (dt.muted && !m.muted && (m.muted = !0,
                                    m._a.muted = !0),
                                m._a.volume = Math.max(0, Math.min(1, t / 100))) : ct._setVolume(m.id, dt.muted && !m.muted || m.muted ? 0 : t),
                            m._iO.volume = t,
                            n || (m.volume = t,
                                m.options.volume = t),
                            m
                    },
                    this.mute = function () {
                        return m.muted = !0,
                            m.isHTML5 ? m._a && (m._a.muted = !0) : ct._setVolume(m.id, 0),
                            m
                    },
                    this.unmute = function () {
                        m.muted = !1;
                        var t = m._iO.volume !== e;
                        return m.isHTML5 ? m._a && (m._a.muted = !1) : ct._setVolume(m.id, t ? m._iO.volume : m.options.volume),
                            m
                    },
                    this.toggleMute = function () {
                        return m.muted ? m.unmute() : m.mute()
                    },
                    this.onposition = this.onPosition = function (t, n, i) {
                        return y.push({
                                position: parseInt(t, 10),
                                method: n,
                                scope: i !== e ? i : m,
                                fired: !1
                            }),
                            m
                    },
                    this.clearOnPosition = function (t, e) {
                        var n;
                        if (t = parseInt(t, 10),
                            !isNaN(t))
                            for (n = 0; n < y.length; n++)
                                t !== y[n].position || e && e !== y[n].method || (y[n].fired && g--,
                                    y.splice(n, 1))
                    },
                    this._processOnPosition = function () {
                        var t, e;
                        if (!(t = y.length) || !m.playState || g >= t)
                            return !1;
                        for (--t; 0 <= t; t--)
                            !(e = y[t]).fired && m.position >= e.position && (e.fired = !0,
                                g++,
                                e.method.apply(e.scope, [e.position]));
                        return !0
                    },
                    this._resetOnPosition = function (t) {
                        var e, n;
                        if (!(e = y.length))
                            return !1;
                        for (--e; 0 <= e; e--)
                            (n = y[e]).fired && t <= n.position && (n.fired = !1,
                                g--);
                        return !0
                    },
                    c = function () {
                        var t, e, n = m._iO,
                            i = n.from,
                            o = n.to;
                        return e = function () {
                                m.clearOnPosition(o, e),
                                    m.stop()
                            },
                            t = function () {
                                null === o || isNaN(o) || m.onPosition(o, e)
                            },
                            null === i || isNaN(i) || (n.position = i,
                                n.multiShot = !1,
                                t()),
                            n
                    },
                    l = function () {
                        var t, e = m._iO.onposition;
                        if (e)
                            for (t in e)
                                e.hasOwnProperty(t) && m.onPosition(parseInt(t, 10), e[t])
                    },
                    d = function () {
                        var t, e = m._iO.onposition;
                        if (e)
                            for (t in e)
                                e.hasOwnProperty(t) && m.clearOnPosition(parseInt(t, 10))
                    },
                    u = function () {
                        m.isHTML5 && j(m)
                    },
                    r = function () {
                        m.isHTML5 && V(m)
                    },
                    (o = function (t) {
                        t || (y = [],
                                g = 0),
                            _ = !1,
                            m._hasTimer = null,
                            m._a = null,
                            m._html5_canplay = !1,
                            m.bytesLoaded = null,
                            m.bytesTotal = null,
                            m.duration = m._iO && m._iO.duration ? m._iO.duration : null,
                            m.durationEstimate = null,
                            m.buffered = [],
                            m.eqData = [],
                            m.eqData.left = [],
                            m.eqData.right = [],
                            m.failures = 0,
                            m.isBuffering = !1,
                            m.instanceOptions = {},
                            m.instanceCount = 0,
                            m.loaded = !1,
                            m.metadata = {},
                            m.readyState = 0,
                            m.muted = !1,
                            m.paused = !1,
                            m.peakData = {
                                left: 0,
                                right: 0
                            },
                            m.waveformData = {
                                left: [],
                                right: []
                            },
                            m.playState = 0,
                            m.position = null,
                            m.id3 = {}
                    })(),
                    this._onTimer = function (t) {
                        var e, o = !1,
                            a = {};
                        return (m._hasTimer || t) && m._a && (t || (0 < m.playState || 1 === m.readyState) && !m.paused) && ((e = m._get_html5_duration()) !== n && (n = e,
                                    m.duration = e,
                                    o = !0),
                                m.durationEstimate = m.duration,
                                (e = 1e3 * m._a.currentTime || 0) !== i && (i = e,
                                    o = !0),
                                (o || t) && m._whileplaying(e, a, a, a, a)),
                            o
                    },
                    this._get_html5_duration = function () {
                        var t = m._iO;
                        return (t = m._a && m._a.duration ? 1e3 * m._a.duration : t && t.duration ? t.duration : null) && !isNaN(t) && 1 / 0 !== t ? t : null
                    },
                    this._apply_loop = function (t, e) {
                        t.loop = 1 < e ? "loop" : ""
                    },
                    this._setup_html5 = function (t) {
                        t = h(m._iO, t);
                        var e, n = Ht ? ft : m._a,
                            i = decodeURI(t.url);
                        if (Ht ? i === decodeURI(nt) && (e = !0) : i === decodeURI(O) && (e = !0),
                            n) {
                            if (n._s)
                                if (Ht)
                                    n._s && n._s.playState && !e && n._s.stop();
                                else if (!Ht && i === decodeURI(O))
                                return m._apply_loop(n, t.loops),
                                    n;
                            e || (O && o(!1),
                                n.src = t.url,
                                nt = O = m.url = t.url,
                                n._called_load = !1)
                        } else
                            t.autoLoad || t.autoPlay ? (m._a = new Audio(t.url),
                                m._a.load()) : m._a = Nt && 10 > opera.version() ? new Audio(null) : new Audio,
                            (n = m._a)._called_load = !1,
                            Ht && (ft = n);
                        return m.isHTML5 = !0,
                            m._a = n,
                            n._s = m,
                            a(),
                            m._apply_loop(n, t.loops),
                            t.autoLoad || t.autoPlay ? m.load() : (n.autobuffer = !1,
                                n.preload = "auto"),
                            n
                    },
                    a = function () {
                        if (m._a._added_events)
                            return !1;
                        var t;
                        for (t in m._a._added_events = !0,
                            st)
                            st.hasOwnProperty(t) && m._a && m._a.addEventListener(t, st[t], !1);
                        return !0
                    },
                    s = function () {
                        var t;
                        for (t in m._a._added_events = !1,
                            st)
                            st.hasOwnProperty(t) && m._a && m._a.removeEventListener(t, st[t], !1)
                    },
                    this._onload = function (t) {
                        var e = !!t || !m.isHTML5 && 8 === f && m.duration;
                        return m.loaded = e,
                            m.readyState = e ? 3 : 2,
                            m._onbufferchange(0),
                            e || m.isHTML5 || m._onerror(),
                            m._iO.onload && rt(m, (function () {
                                m._iO.onload.apply(m, [e])
                            })),
                            !0
                    },
                    this._onerror = function (t, e) {
                        m._iO.onerror && rt(m, (function () {
                            m._iO.onerror.apply(m, [t, e])
                        }))
                    },
                    this._onbufferchange = function (t) {
                        return !(0 === m.playState || t && m.isBuffering || !t && !m.isBuffering) && (m.isBuffering = 1 === t,
                            m._iO.onbufferchange && m._iO.onbufferchange.apply(m, [t]),
                            !0)
                    },
                    this._onsuspend = function () {
                        return m._iO.onsuspend && m._iO.onsuspend.apply(m),
                            !0
                    },
                    this._onfailure = function (t, e, n) {
                        m.failures++,
                            m._iO.onfailure && 1 === m.failures && m._iO.onfailure(t, e, n)
                    },
                    this._onwarning = function (t, e, n) {
                        m._iO.onwarning && m._iO.onwarning(t, e, n)
                    },
                    this._onfinish = function () {
                        var t = m._iO.onfinish;
                        m._onbufferchange(0),
                            m._resetOnPosition(0),
                            m.instanceCount && (m.instanceCount--,
                                m.instanceCount || (d(),
                                    m.playState = 0,
                                    m.paused = !1,
                                    m.instanceCount = 0,
                                    m.instanceOptions = {},
                                    m._iO = {},
                                    r(),
                                    m.isHTML5 && (m.position = 0)),
                                (!m.instanceCount || m._iO.multiShotEvents) && t && rt(m, (function () {
                                    t.apply(m)
                                })))
                    },
                    this._whileloading = function (t, e, n, i) {
                        var o = m._iO;
                        m.bytesLoaded = t,
                            m.bytesTotal = e,
                            m.duration = Math.floor(n),
                            m.bufferLength = i,
                            m.durationEstimate = m.isHTML5 || o.isMovieStar ? m.duration : o.duration ? m.duration > o.duration ? m.duration : o.duration : parseInt(m.bytesTotal / m.bytesLoaded * m.duration, 10),
                            m.isHTML5 || (m.buffered = [{
                                start: 0,
                                end: m.duration
                            }]),
                            (3 !== m.readyState || m.isHTML5) && o.whileloading && o.whileloading.apply(m)
                    },
                    this._whileplaying = function (t, n, i, o, a) {
                        var s = m._iO;
                        return !isNaN(t) && null !== t && (m.position = Math.max(0, t),
                            m._processOnPosition(),
                            !m.isHTML5 && 8 < f && (s.usePeakData && n !== e && n && (m.peakData = {
                                    left: n.leftPeak,
                                    right: n.rightPeak
                                }),
                                s.useWaveformData && i !== e && i && (m.waveformData = {
                                    left: i.split(","),
                                    right: o.split(",")
                                }),
                                s.useEQData && a !== e && a && a.leftEQ && (t = a.leftEQ.split(","),
                                    m.eqData = t,
                                    m.eqData.left = t,
                                    a.rightEQ !== e && a.rightEQ && (m.eqData.right = a.rightEQ.split(",")))),
                            1 === m.playState && (m.isHTML5 || 8 !== f || m.position || !m.isBuffering || m._onbufferchange(0),
                                s.whileplaying && s.whileplaying.apply(m)),
                            !0)
                    },
                    this._oncaptiondata = function (t) {
                        m.captiondata = t,
                            m._iO.oncaptiondata && m._iO.oncaptiondata.apply(m, [t])
                    },
                    this._onmetadata = function (t, e) {
                        var n, i, o = {};
                        for (n = 0,
                            i = t.length; n < i; n++)
                            o[t[n]] = e[n];
                        m.metadata = o,
                            m._iO.onmetadata && m._iO.onmetadata.call(m, m.metadata)
                    },
                    this._onid3 = function (t, e) {
                        var n, i, o = [];
                        for (n = 0,
                            i = t.length; n < i; n++)
                            o[t[n]] = e[n];
                        m.id3 = h(m.id3, o),
                            m._iO.onid3 && m._iO.onid3.apply(m)
                    },
                    this._onconnect = function (t) {
                        t = 1 === t,
                            (m.connected = t) && (m.failures = 0,
                                q(m.id) && (m.getAutoPlay() ? m.play(e, m.getAutoPlay()) : m._iO.autoLoad && m.load()),
                                m._iO.onconnect && m._iO.onconnect.apply(m, [t]))
                    },
                    this._ondataerror = function (t) {
                        0 < m.playState && m._iO.ondataerror && m._iO.ondataerror.apply(m)
                    }
            },
            A = function () {
                return mt.body || mt.getElementsByTagName("div")[0]
            },
            r = function (t) {
                return mt.getElementById(t)
            },
            h = function (t, n) {
                var i, o, a = t || {};
                for (o in i = n === e ? dt.defaultOptions : n)
                    i.hasOwnProperty(o) && a[o] === e && (a[o] = "object" != typeof i[o] || null === i[o] ? i[o] : h(a[o], i[o]));
                return a
            },
            rt = function (e, n) {
                e.isHTML5 || 8 !== f ? n() : t.setTimeout(n, 0)
            },
            m = {
                onready: 1,
                ontimeout: 1,
                defaultOptions: 1,
                flash9Options: 1,
                movieStarOptions: 1
            },
            p = function (t, n) {
                var i, o = !0,
                    a = n !== e,
                    s = dt.setupOptions;
                for (i in t)
                    if (t.hasOwnProperty(i))
                        if ("object" != typeof t[i] || null === t[i] || t[i] instanceof Array || t[i] instanceof RegExp)
                            a && m[n] !== e ? dt[n][i] = t[i] : s[i] !== e ? (dt.setupOptions[i] = t[i],
                                dt[i] = t[i]) : m[i] === e ? o = !1 : dt[i] instanceof Function ? dt[i].apply(dt, t[i] instanceof Array ? t[i] : [t[i]]) : dt[i] = t[i];
                        else {
                            if (m[i] !== e)
                                return p(t[i], i);
                            o = !1
                        }
                return o
            },
            et = function () {
                function e(t) {
                    var e = (t = Dt.call(t)).length;
                    return i ? (t[1] = "on" + t[1],
                            3 < e && t.pop()) : 3 === e && t.push(!1),
                        t
                }

                function n(t, e) {
                    var n = t.shift(),
                        a = [o[e]];
                    i ? n[a](t[0], t[1]) : n[a].apply(n, t)
                }
                var i = t.attachEvent,
                    o = {
                        add: i ? "attachEvent" : "addEventListener",
                        remove: i ? "detachEvent" : "removeEventListener"
                    };
                return {
                    add: function () {
                        n(e(arguments), "add")
                    },
                    remove: function () {
                        n(e(arguments), "remove")
                    }
                }
            }(),
            st = {
                abort: a((function () {})),
                canplay: a((function () {
                    var t, n = this._s;
                    if (!n._html5_canplay) {
                        if (n._html5_canplay = !0,
                            n._onbufferchange(0),
                            t = n._iO.position === e || isNaN(n._iO.position) ? null : n._iO.position / 1e3,
                            this.currentTime !== t)
                            try {
                                this.currentTime = t
                            } catch (t) {}
                        n._iO._oncanplay && n._iO._oncanplay()
                    }
                })),
                canplaythrough: a((function () {
                    var t = this._s;
                    t.loaded || (t._onbufferchange(0),
                        t._whileloading(t.bytesLoaded, t.bytesTotal, t._get_html5_duration()),
                        t._onload(!0))
                })),
                durationchange: a((function () {
                    var t, e = this._s;
                    t = e._get_html5_duration(),
                        isNaN(t) || t === e.duration || (e.durationEstimate = e.duration = t)
                })),
                ended: a((function () {
                    this._s._onfinish()
                })),
                error: a((function () {
                    var t = J[this.error.code] || null;
                    this._s._onload(!1),
                        this._s._onerror(this.error.code, t)
                })),
                loadeddata: a((function () {
                    var t = this._s;
                    t._loaded || xt || (t.duration = t._get_html5_duration())
                })),
                loadedmetadata: a((function () {})),
                loadstart: a((function () {
                    this._s._onbufferchange(1)
                })),
                play: a((function () {
                    this._s._onbufferchange(0)
                })),
                playing: a((function () {
                    this._s._onbufferchange(0)
                })),
                progress: a((function (t) {
                    var e, n, i = this._s,
                        o = 0;
                    o = t.target.buffered;
                    e = t.loaded || 0;
                    var a = t.total || 1;
                    if (i.buffered = [],
                        o && o.length) {
                        for (e = 0,
                            n = o.length; e < n; e++)
                            i.buffered.push({
                                start: 1e3 * o.start(e),
                                end: 1e3 * o.end(e)
                            });
                        o = 1e3 * (o.end(0) - o.start(0)),
                            e = Math.min(1, o / (1e3 * t.target.duration))
                    }
                    isNaN(e) || (i._whileloading(e, a, i._get_html5_duration()),
                        e && a && e === a && st.canplaythrough.call(this, t))
                })),
                ratechange: a((function () {})),
                suspend: a((function (t) {
                    var e = this._s;
                    st.progress.call(this, t),
                        e._onsuspend()
                })),
                stalled: a((function () {})),
                timeupdate: a((function () {
                    this._s._onTimer()
                })),
                waiting: a((function () {
                    this._s._onbufferchange(1)
                }))
            },
            K = function (t) {
                return !(!t || !(t.type || t.url || t.serverURL)) && (!(t.serverURL || t.type && o(t.type)) && (t.type ? X({
                    type: t.type
                }) : X({
                    url: t.url
                }) || dt.html5Only || t.url.match(/data:/i)))
            },
            Z = function (t) {
                var n;
                return t && (n = xt ? "about:blank" : dt.html5.canPlayType("audio/wav") ? "data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w==" : "about:blank",
                        t.src = n,
                        t._called_unload !== e && (t._called_load = !1)),
                    Ht && (nt = null),
                    n
            },
            X = function (t) {
                if (!dt.useHTML5Audio || !dt.hasHTML5)
                    return !1;
                var n = t.url || null;
                t = t.type || null;
                var i, a = dt.audioFormats;
                if (t && dt.html5[t] !== e)
                    return dt.html5[t] && !o(t);
                if (!Y) {
                    for (i in Y = [],
                        a)
                        a.hasOwnProperty(i) && (Y.push(i),
                            a[i].related && (Y = Y.concat(a[i].related)));
                    Y = new RegExp("\\.(" + Y.join("|") + ")(\\?.*)?$", "i")
                }
                return (i = n ? n.toLowerCase().match(Y) : null) && i.length ? i = i[1] : t && (i = (-1 !== (n = t.indexOf(";")) ? t.substr(0, n) : t).substr(6)),
                    i && dt.html5[i] !== e ? n = dt.html5[i] && !o(i) : (t = "audio/" + i,
                        n = dt.html5.canPlayType({
                            type: t
                        }),
                        n = (dt.html5[i] = n) && dt.html5[t] && !o(t)),
                    n
            },
            tt = function () {
                function t(t) {
                    var e, n = e = !1;
                    if (!s || "function" != typeof s.canPlayType)
                        return e;
                    if (t instanceof Array) {
                        for (a = 0,
                            e = t.length; a < e; a++)
                            (dt.html5[t[a]] || s.canPlayType(t[a]).match(dt.html5Test)) && (n = !0,
                                dt.html5[t[a]] = !0,
                                dt.flash[t[a]] = !!t[a].match(Qt));
                        e = n
                    } else
                        e = !(!(t = !(!s || "function" != typeof s.canPlayType) && s.canPlayType(t)) || !t.match(dt.html5Test));
                    return e
                }
                if (!dt.useHTML5Audio || !dt.hasHTML5)
                    return At = dt.html5.usingFlash = !0,
                        !1;
                var n, i, o, a, s = Audio !== e ? Nt && 10 > opera.version() ? new Audio(null) : new Audio : null,
                    r = {};
                for (n in o = dt.audioFormats)
                    if (o.hasOwnProperty(n) && (i = "audio/" + n,
                            r[n] = t(o[n].type),
                            r[i] = r[n],
                            n.match(Qt) ? (dt.flash[n] = !0,
                                dt.flash[i] = !0) : (dt.flash[n] = !1,
                                dt.flash[i] = !1),
                            o[n] && o[n].related))
                        for (a = o[n].related.length - 1; 0 <= a; a--)
                            r["audio/" + o[n].related[a]] = r[n],
                            dt.html5[o[n].related[a]] = r[n],
                            dt.flash[o[n].related[a]] = r[n];
                return r.canPlayType = s ? t : null,
                    dt.html5 = h(dt.html5, r),
                    dt.html5.usingFlash = G(),
                    At = dt.html5.usingFlash,
                    !0
            },
            P = {},
            R = function () {},
            U = function (t) {
                return 8 === f && 1 < t.loops && t.stream && (t.stream = !1),
                    t
            },
            B = function (t, e) {
                return t && !t.usePolicyFile && (t.onid3 || t.usePeakData || t.useWaveformData || t.useEQData) && (t.usePolicyFile = !0),
                    t
            },
            u = function () {
                return !1
            },
            E = function (t) {
                for (var e in t)
                    t.hasOwnProperty(e) && "function" == typeof t[e] && (t[e] = u)
            },
            C = function (t) {
                t === e && (t = !1),
                    (vt || t) && dt.disable(t)
            },
            k = function (t) {
                if (t)
                    if (t.match(/\.swf(\?.*)?$/i)) {
                        if (t.substr(t.toLowerCase().lastIndexOf(".swf?") + 4))
                            return t
                    } else
                        t.lastIndexOf("/") !== t.length - 1 && (t += "/");
                return t = (t && -1 !== t.lastIndexOf("/") ? t.substr(0, t.lastIndexOf("/") + 1) : "./") + dt.movieURL,
                    dt.noSWFCache && (t += "?ts=" + (new Date).getTime()),
                    t
            },
            b = function () {
                8 !== (f = parseInt(dt.flashVersion, 10)) && 9 !== f && (dt.flashVersion = f = 8);
                var t = dt.debugMode || dt.debugFlash ? "_debug.swf" : ".swf";
                dt.useHTML5Audio && !dt.html5Only && dt.audioFormats.mp4.required && 9 > f && (dt.flashVersion = f = 9),
                    dt.version = dt.versionNumber + (dt.html5Only ? " (HTML5-only mode)" : 9 === f ? " (AS3/Flash 9)" : " (AS2/Flash 8)"),
                    8 < f ? (dt.defaultOptions = h(dt.defaultOptions, dt.flash9Options),
                        dt.features.buffering = !0,
                        dt.defaultOptions = h(dt.defaultOptions, dt.movieStarOptions),
                        dt.filePatterns.flash9 = new RegExp("\\.(mp3|" + Kt.join("|") + ")(\\?.*)?$", "i"),
                        dt.features.movieStar = !0) : dt.features.movieStar = !1,
                    dt.filePattern = dt.filePatterns[8 !== f ? "flash9" : "flash8"],
                    dt.movieURL = (8 === f ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", t),
                    dt.features.peakData = dt.features.waveformData = dt.features.eqData = 8 < f
            },
            F = function (t, e) {
                ct && ct._setPolling(t, e)
            },
            q = this.getSoundById,
            N = function () {
                var t = [];
                return dt.debugMode && t.push("sm2_debug"),
                    dt.debugFlash && t.push("flash_debug"),
                    dt.useHighPerformance && t.push("high_performance"),
                    t.join(" ")
            },
            x = function () {
                R("fbHandler");
                var t = dt.getMoviePercent(),
                    e = {
                        type: "FLASHBLOCK"
                    };
                dt.html5Only || (dt.ok() ? dt.oMC && (dt.oMC.className = [N(), "movieContainer", "swf_loaded" + (dt.didFlashBlock ? " swf_unblocked" : "")].join(" ")) : (At && (dt.oMC.className = N() + " movieContainer " + (null === t ? "swf_timedout" : "swf_error")),
                    dt.didFlashBlock = !0,
                    y({
                        type: "ontimeout",
                        ignoreInit: !0,
                        error: e
                    }),
                    H(e)))
            },
            _ = function (t, n, i) {
                _t[t] === e && (_t[t] = []),
                    _t[t].push({
                        method: n,
                        scope: i || null,
                        fired: !1
                    })
            },
            y = function (t) {
                if (t || (t = {
                        type: dt.ok() ? "onready" : "ontimeout"
                    }),
                    !Ot && t && !t.ignoreInit || "ontimeout" === t.type && (dt.ok() || vt && !t.ignoreInit))
                    return !1;
                var e, n = {
                        success: t && t.ignoreInit ? dt.ok() : !vt
                    },
                    i = t && t.type && _t[t.type] || [],
                    o = [],
                    a = (n = [n],
                        At && !dt.ok());
                for (t.error && (n[0].error = t.error),
                    t = 0,
                    e = i.length; t < e; t++)
                    !0 !== i[t].fired && o.push(i[t]);
                if (o.length)
                    for (t = 0,
                        e = o.length; t < e; t++)
                        o[t].scope ? o[t].method.apply(o[t].scope, n) : o[t].method.apply(this, n),
                        a || (o[t].fired = !0);
                return !0
            },
            g = function () {
                t.setTimeout((function () {
                    dt.useFlashBlock && x(),
                        y(),
                        "function" == typeof dt.onload && dt.onload.apply(t),
                        dt.waitForWindowLoad && et.add(t, "load", g)
                }), 1)
            },
            ot = function () {
                if (it !== e)
                    return it;
                var n, i, o = !1,
                    a = navigator,
                    s = t.ActiveXObject;
                try {
                    i = a.plugins
                } catch (t) {
                    i = void 0
                }
                if (i && i.length)
                    (a = a.mimeTypes) && a["application/x-shockwave-flash"] && a["application/x-shockwave-flash"].enabledPlugin && a["application/x-shockwave-flash"].enabledPlugin.description && (o = !0);
                else if (s !== e && !ht.match(/MSAppHost/i)) {
                    try {
                        n = new s("ShockwaveFlash.ShockwaveFlash")
                    } catch (t) {
                        n = null
                    }
                    o = !!n
                }
                return it = o
            },
            G = function () {
                var t, e, n = dt.audioFormats;
                if (Et && ht.match(/os (1|2|3_0|3_1)\s/i) ? (dt.hasHTML5 = !1,
                        dt.html5Only = !0,
                        dt.oMC && (dt.oMC.style.display = "none")) : !dt.useHTML5Audio || dt.html5 && dt.html5.canPlayType || (dt.hasHTML5 = !1),
                    dt.useHTML5Audio && dt.hasHTML5)
                    for (e in $ = !0,
                        n)
                        n.hasOwnProperty(e) && n[e].required && (dt.html5.canPlayType(n[e].type) ? dt.preferFlash && (dt.flash[e] || dt.flash[n[e].type]) && (t = !0) : ($ = !1,
                            t = !0));
                return dt.ignoreFlash && (t = !1,
                        $ = !0),
                    dt.html5Only = dt.hasHTML5 && dt.useHTML5Audio && !t,
                    !dt.html5Only
            },
            W = function (t) {
                var e, n, i = 0;
                if (t instanceof Array) {
                    for (e = 0,
                        n = t.length; e < n; e++)
                        if (t[e] instanceof Object) {
                            if (dt.canPlayMIME(t[e].type)) {
                                i = e;
                                break
                            }
                        } else if (dt.canPlayURL(t[e])) {
                        i = e;
                        break
                    }
                    t[i].url && (t[i] = t[i].url),
                        t = t[i]
                }
                return t
            },
            j = function (t) {
                t._hasTimer || (t._hasTimer = !0,
                    !Ut && dt.html5PollingInterval && (null === St && 0 === wt && (St = setInterval(Q, dt.html5PollingInterval)),
                        wt++))
            },
            V = function (t) {
                t._hasTimer && (t._hasTimer = !1,
                    !Ut && dt.html5PollingInterval && wt--)
            },
            Q = function () {
                var t;
                if (null === St || wt)
                    for (t = dt.soundIDs.length - 1; 0 <= t; t--)
                        dt.sounds[dt.soundIDs[t]].isHTML5 && dt.sounds[dt.soundIDs[t]]._hasTimer && dt.sounds[dt.soundIDs[t]]._onTimer();
                else
                    clearInterval(St),
                    St = null
            },
            H = function (n) {
                n = n !== e ? n : {},
                    "function" == typeof dt.onerror && dt.onerror.apply(t, [{
                        type: n.type !== e ? n.type : null
                    }]),
                    n.fatal !== e && n.fatal && dt.disable()
            },
            at = function () {
                if (Bt && ot()) {
                    var t, e, n = dt.audioFormats;
                    for (e in n)
                        if (n.hasOwnProperty(e) && ("mp3" === e || "mp4" === e) && (dt.html5[e] = !1,
                                n[e] && n[e].related))
                            for (t = n[e].related.length - 1; 0 <= t; t--)
                                dt.html5[n[e].related[t]] = !1
                }
            },
            this._setSandboxType = function (t) {},
            this._externalInterfaceOK = function (t) {
                dt.swfLoaded || (dt.swfLoaded = !0,
                    jt = !1,
                    Bt && at(),
                    setTimeout(d, kt ? 100 : 1))
            },
            D = function (t, n) {
                function i(t, e) {
                    return '<param name="' + t + '" value="' + e + '" />'
                }
                if (yt && gt)
                    return !1;
                if (dt.html5Only)
                    return b(),
                        dt.oMC = r(dt.movieID),
                        d(),
                        gt = yt = !0,
                        !1;
                var o, a, s, u = n || dt.url,
                    l = dt.altURL || u,
                    f = A(),
                    c = N(),
                    h = null;
                h = (h = mt.getElementsByTagName("html")[0]) && h.dir && h.dir.match(/rtl/i);
                if (t = t === e ? dt.id : t,
                    b(),
                    dt.url = k(Wt ? u : l),
                    n = dt.url,
                    dt.wmode = !dt.wmode && dt.useHighPerformance ? "transparent" : dt.wmode,
                    null !== dt.wmode && (ht.match(/msie 8/i) || !kt && !dt.useHighPerformance) && navigator.platform.match(/win32|win64/i) && (It.push(P.spcWmode),
                        dt.wmode = null),
                    f = {
                        name: t,
                        id: t,
                        src: n,
                        quality: "high",
                        allowScriptAccess: dt.allowScriptAccess,
                        bgcolor: dt.bgColor,
                        pluginspage: $t + "www.macromedia.com/go/getflashplayer",
                        title: "JS/Flash audio component (SoundManager 2)",
                        type: "application/x-shockwave-flash",
                        wmode: dt.wmode,
                        hasPriority: "true"
                    },
                    dt.debugFlash && (f.FlashVars = "debug=1"),
                    dt.wmode || delete f.wmode,
                    kt)
                    u = mt.createElement("div"),
                    a = ['<object id="' + t + '" data="' + n + '" type="' + f.type + '" title="' + f.title + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">', i("movie", n), i("AllowScriptAccess", dt.allowScriptAccess), i("quality", f.quality), dt.wmode ? i("wmode", dt.wmode) : "", i("bgcolor", dt.bgColor), i("hasPriority", "true"), dt.debugFlash ? i("FlashVars", f.FlashVars) : "", "</object>"].join("");
                else
                    for (o in u = mt.createElement("embed"),
                        f)
                        f.hasOwnProperty(o) && u.setAttribute(o, f[o]);
                if (c = N(),
                    f = A())
                    if (dt.oMC = r(dt.movieID) || mt.createElement("div"),
                        dt.oMC.id)
                        s = dt.oMC.className,
                        dt.oMC.className = (s ? s + " " : "movieContainer") + (c ? " " + c : ""),
                        dt.oMC.appendChild(u),
                        kt && ((o = dt.oMC.appendChild(mt.createElement("div"))).className = "sm2-object-box",
                            o.innerHTML = a),
                        gt = !0;
                    else {
                        if (dt.oMC.id = dt.movieID,
                            dt.oMC.className = "movieContainer " + c,
                            o = c = null,
                            dt.useFlashBlock || (dt.useHighPerformance ? c = {
                                position: "fixed",
                                width: "8px",
                                height: "8px",
                                bottom: "0px",
                                left: "0px",
                                overflow: "hidden"
                            } : (c = {
                                    position: "absolute",
                                    width: "6px",
                                    height: "6px",
                                    top: "-9999px",
                                    left: "-9999px"
                                },
                                h && (c.left = Math.abs(parseInt(c.left, 10)) + "px"))),
                            Rt && (dt.oMC.style.zIndex = 1e4),
                            !dt.debugFlash)
                            for (s in c)
                                c.hasOwnProperty(s) && (dt.oMC.style[s] = c[s]);
                        try {
                            kt || dt.oMC.appendChild(u),
                                f.appendChild(dt.oMC),
                                kt && ((o = dt.oMC.appendChild(mt.createElement("div"))).className = "sm2-object-box",
                                    o.innerHTML = a),
                                gt = !0
                        } catch (t) {
                            throw Error(R("domError") + " \n" + t.toString())
                        }
                    }
                return yt = !0
            },
            L = function () {
                return dt.html5Only ? (D(),
                    !1) : !(ct || !dt.url) && ((ct = dt.getMovie(dt.id)) || (bt ? (kt ? dt.oMC.innerHTML = Tt : dt.oMC.appendChild(bt),
                            bt = null,
                            yt = !0) : D(dt.id, dt.url),
                        ct = dt.getMovie(dt.id)),
                    "function" == typeof dt.oninitmovie && setTimeout(dt.oninitmovie, 1),
                    !0)
            },
            O = function () {
                setTimeout(v, 1e3)
            },
            M = function () {
                t.setTimeout((function () {
                    dt.setup({
                            preferFlash: !1
                        }).reboot(),
                        dt.didFlashBlock = !0,
                        dt.beginDelayedInit()
                }), 1)
            },
            v = function () {
                var e, n = !1;
                dt.url && !Pt && (Pt = !0,
                    et.remove(t, "load", O),
                    it && jt && !qt || (Ot || 0 < (e = dt.getMoviePercent()) && 100 > e && (n = !0),
                        setTimeout((function () {
                            e = dt.getMoviePercent(),
                                n ? (Pt = !1,
                                    t.setTimeout(O, 1)) : !Ot && Vt && (null === e ? dt.useFlashBlock || 0 === dt.flashLoadTimeout ? dt.useFlashBlock && x() : !dt.useFlashBlock && $ ? M() : y({
                                    type: "ontimeout",
                                    ignoreInit: !0,
                                    error: {
                                        type: "INIT_FLASHBLOCK"
                                    }
                                }) : 0 !== dt.flashLoadTimeout && (!dt.useFlashBlock && $ ? M() : C(!0)))
                        }), dt.flashLoadTimeout)))
            },
            T = function () {
                return qt || !jt ? (et.remove(t, "focus", T),
                    !0) : (qt = Vt = !0,
                    Pt = !1,
                    O(),
                    et.remove(t, "focus", T),
                    !0)
            },
            c = function (e) {
                if (Ot)
                    return !1;
                if (dt.html5Only)
                    return Ot = !0,
                        g(),
                        !0;
                var n, i = !0;
                return dt.useFlashBlock && dt.flashLoadTimeout && !dt.getMoviePercent() || (Ot = !0),
                    n = {
                        type: !it && At ? "NO_FLASH" : "INIT_TIMEOUT"
                    },
                    (vt || e) && (dt.useFlashBlock && dt.oMC && (dt.oMC.className = N() + " " + (null === dt.getMoviePercent() ? "swf_timedout" : "swf_error")),
                        y({
                            type: "ontimeout",
                            error: n,
                            ignoreInit: !0
                        }),
                        H(n),
                        i = !1),
                    vt || (dt.waitForWindowLoad && !Mt ? et.add(t, "load", g) : g()),
                    i
            },
            l = function () {
                var t, n = dt.setupOptions;
                for (t in n)
                    n.hasOwnProperty(t) && (dt[t] === e ? dt[t] = n[t] : dt[t] !== n[t] && (dt.setupOptions[t] = dt[t]))
            },
            d = function () {
                if (Ot)
                    return !1;
                if (dt.html5Only)
                    return Ot || (et.remove(t, "load", dt.beginDelayedInit),
                            dt.enabled = !0,
                            c()),
                        !0;
                L();
                try {
                    ct._externalInterfaceTest(!1),
                        F(!0, dt.flashPollingInterval || (dt.useHighPerformance ? 10 : 50)),
                        dt.debugMode || ct._disableDebug(),
                        dt.enabled = !0,
                        dt.html5Only || et.add(t, "unload", u)
                } catch (t) {
                    return H({
                            type: "JS_TO_FLASH_EXCEPTION",
                            fatal: !0
                        }),
                        C(!0),
                        c(),
                        !1
                }
                return c(),
                    et.remove(t, "load", dt.beginDelayedInit),
                    !0
            },
            w = function () {
                return !I && (I = !0,
                    l(),
                    !it && dt.hasHTML5 && dt.setup({
                        useHTML5Audio: !0,
                        preferFlash: !1
                    }),
                    tt(),
                    !it && At && (It.push(P.needFlash),
                        dt.setup({
                            flashLoadTimeout: 1
                        })),
                    mt.removeEventListener && mt.removeEventListener("DOMContentLoaded", w, !1),
                    L(),
                    !0)
            },
            z = function () {
                return "complete" === mt.readyState && (w(),
                        mt.detachEvent("onreadystatechange", z)),
                    !0
            },
            S = function () {
                Mt = !0,
                    w(),
                    et.remove(t, "load", S)
            },
            ot(),
            et.add(t, "focus", T),
            et.add(t, "load", O),
            et.add(t, "load", S),
            mt.addEventListener ? mt.addEventListener("DOMContentLoaded", w, !1) : mt.attachEvent ? mt.attachEvent("onreadystatechange", z) : H({
                type: "NO_DOM2_EVENTS",
                fatal: !0
            })
    }
    if (!t || !t.document)
        throw Error("SoundManager requires a browser with window and document objects.");
    var i = null;
    t.SM2_DEFER !== e && SM2_DEFER || (i = new n),
        "object" == typeof module && module && "object" == typeof module.exports ? (module.exports.SoundManager = n,
            module.exports.soundManager = i) : "function" == typeof define && define.amd && define((function () {
            return {
                constructor: n,
                getInstance: function (e) {
                    return !t.soundManager && e instanceof Function && ((e = e(n)) instanceof n && (t.soundManager = e)),
                        t.soundManager
                }
            }
        })),
        t.SoundManager = n,
        t.soundManager = i
}(window);