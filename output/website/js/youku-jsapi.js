var _console = console;
(function() {
    function x(a) {
        var c = document.createElement("script");
        c.type = "text/javascript";
        c.src = a;
        document.getElementsByTagName("head")[0].appendChild(c)
    }

    function pa(a) {
        if (!a) return "";
        var a = a.toString(),
            c, b, f, i, d, h = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27,
                28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
            ];
        i = a.length;
        f = 0;
        for (d = ""; f < i;) {
            do c = h[a.charCodeAt(f++) & 255]; while (f < i && -1 == c);
            if (-1 == c) break;
            do b = h[a.charCodeAt(f++) & 255]; while (f < i && -1 == b);
            if (-1 == b) break;
            d += String.fromCharCode(c << 2 | (b & 48) >> 4);
            do {
                c = a.charCodeAt(f++) & 255;
                if (61 == c) return d;
                c = h[c]
            } while (f < i && -1 == c);
            if (-1 == c) break;
            d += String.fromCharCode((b & 15) << 4 | (c & 60) >> 2);
            do {
                b = a.charCodeAt(f++) & 255;
                if (61 == b) return d;
                b = h[b]
            } while (f < i && -1 == b);
            if (-1 == b) break;
            d += String.fromCharCode((c &
                3) << 6 | b)
        }
        return d
    }

    function F(a, c) {
        for (var b = [], f = 0, d, g = "", h = 0; 256 > h; h++) b[h] = h;
        for (h = 0; 256 > h; h++) f = (f + b[h] + a.charCodeAt(h % a.length)) % 256, d = b[h], b[h] = b[f], b[f] = d;
        for (var p = f = h = 0; p < c.length; p++) h = (h + 1) % 256, f = (f + b[h]) % 256, d = b[h], b[h] = b[f], b[f] = d, g += String.fromCharCode(c.charCodeAt(p) ^ b[(b[h] + b[f]) % 256]);
        return g
    }

    function G(a, c) {
        for (var b = [], f = 0; f < a.length; f++) {
            for (var d = 0, d = "a" <= a[f] && "z" >= a[f] ? a[f].charCodeAt(0) - 97 : a[f] - 0 + 26, g = 0; 36 > g; g++)
                if (c[g] == d) {
                    d = g;
                    break
                }
            b[f] = 25 < d ? d - 26 : String.fromCharCode(d + 97)
        }
        return b.join("")
    }

    function qa(a) {
        function c(a, c) {
            return a << c | a >>> 32 - c
        }

        function b(a) {
            var c = "",
                e, f;
            for (e = 7; 0 <= e; e--) f = a >>> 4 * e & 15, c += f.toString(16);
            return c
        }
        var f, d, g = Array(80),
            h = 1732584193,
            p = 4023233417,
            k = 2562383102,
            l = 271733878,
            m = 3285377520,
            o, n, t, q, r, a = function(a) {
                for (var a = a.replace(/\r\n/g, "\n"), c = "", b = 0; b < a.length; b++) {
                    var e = a.charCodeAt(b);
                    128 > e ? c += String.fromCharCode(e) : (127 < e && 2048 > e ? c += String.fromCharCode(e >> 6 | 192) : (c += String.fromCharCode(e >> 12 | 224), c += String.fromCharCode(e >> 6 & 63 | 128)), c += String.fromCharCode(e &
                        63 | 128))
                }
                return c
            }(a);
        o = a.length;
        var s = [];
        for (f = 0; f < o - 3; f += 4) d = a.charCodeAt(f) << 24 | a.charCodeAt(f + 1) << 16 | a.charCodeAt(f + 2) << 8 | a.charCodeAt(f + 3), s.push(d);
        switch (o % 4) {
            case 0:
                f = 2147483648;
                break;
            case 1:
                f = a.charCodeAt(o - 1) << 24 | 8388608;
                break;
            case 2:
                f = a.charCodeAt(o - 2) << 24 | a.charCodeAt(o - 1) << 16 | 32768;
                break;
            case 3:
                f = a.charCodeAt(o - 3) << 24 | a.charCodeAt(o - 2) << 16 | a.charCodeAt(o - 1) << 8 | 128
        }
        for (s.push(f); 14 != s.length % 16;) s.push(0);
        s.push(o >>> 29);
        s.push(o << 3 & 4294967295);
        for (a = 0; a < s.length; a += 16) {
            for (f = 0; 16 > f; f++) g[f] =
                s[a + f];
            for (f = 16; 79 >= f; f++) g[f] = c(g[f - 3] ^ g[f - 8] ^ g[f - 14] ^ g[f - 16], 1);
            d = h;
            o = p;
            n = k;
            t = l;
            q = m;
            for (f = 0; 19 >= f; f++) r = c(d, 5) + (o & n | ~o & t) + q + g[f] + 1518500249 & 4294967295, q = t, t = n, n = c(o, 30), o = d, d = r;
            for (f = 20; 39 >= f; f++) r = c(d, 5) + (o ^ n ^ t) + q + g[f] + 1859775393 & 4294967295, q = t, t = n, n = c(o, 30), o = d, d = r;
            for (f = 40; 59 >= f; f++) r = c(d, 5) + (o & n | o & t | n & t) + q + g[f] + 2400959708 & 4294967295, q = t, t = n, n = c(o, 30), o = d, d = r;
            for (f = 60; 79 >= f; f++) r = c(d, 5) + (o ^ n ^ t) + q + g[f] + 3395469782 & 4294967295, q = t, t = n, n = c(o, 30), o = d, d = r;
            h = h + d & 4294967295;
            p = p + o & 4294967295;
            k = k + n & 4294967295;
            l = l + t & 4294967295;
            m = m + q & 4294967295
        }
        r = b(h) + b(p) + b(k) + b(l) + b(m);
        return r.toLowerCase()
    }

    function y(a, c) {
        if ("js" == c) {
            var b = document.createElement("script");
            b.setAttribute("type", "text/javascript");
            b.setAttribute("src", a)
        } else "css" == c && (b = document.createElement("link"), b.setAttribute("rel", "stylesheet"), b.setAttribute("type", "text/css"), b.setAttribute("href", a));
        "undefined" != typeof b && document.getElementsByTagName("head")[0].appendChild(b)
    }

    function Q() {
        return d.isAndroid ? d.isAndroid4 ? "adr4" : "adr" : d.isIPHONE ?
            "iph" : d.isIPAD ? "ipa" : d.isIPOD ? "ipo" : "oth"
    }

    function z(a) {
        return d.isIPAD && 0 <= window.location.href.indexOf("v.youku.com") ? "x-player" : 200 >= a ? "x-player x-player-200" : 300 >= a ? "x-player x-player-200-300" : 660 >= a ? "x-player x-player-300-660" : 800 >= a ? "x-player x-player-660-800" : "x-player"
    }
    VER = "2013/12/2713:55:33";
    VER = "2014/08/2518:26:49";
    VER = "2014/08/2916:02:44";
    VER = "2014/08/2916:05:39";
    VER = "2014/08/2916:10:08";
    VER = "2014/08/2916:19:00";
    VER = "2014/08/2916:19:25";
    VER = "2014/08/2916:39:16";
    VER = "2014/08/2916:40:26";
    VER = "2014/09/0116:01:10";
    VER = "2014/09/0116:15:20";
    VER = "2014/09/0116:17:27";
    VER = "2014/09/0212:00:09";
    VER = "2014/09/0212:00:41";
    VER = "2014/09/0216:19:29";
    VER = "2014/09/0216:26:07";
    VER = "2014/09/0417:44:57";
    VER = "2014/09/0417:46:33";
    VER = "2014/09/0417:47:49";
    VER = "2014/09/0417:49:21";
    VER = "2014/09/0417:49:56";
    VER = "2014/09/0418:15:26";
    VER = "2014/09/3010:56:11";
    VER = "2014/10/1611:25:41";
    VER = "2014/10/1611:28:29";
    VER = "2014/10/1616:22:57";
    VER = "2014/10/2115:53:11";
    VER = "2014/10/2115:54:04";
    VER = "2014/10/2115:55:08";
    VER =
        "2014/10/2812:03:59";
    VER = "2014/10/2813:08:13";
    VER = "2014/11/0417:56:16";
    VER = "2014/11/0417:59:22";
    VER = "2014/11/0418:03:16";
    VER = "2014/11/0418:23:28";
    VER = "2014/11/0418:28:34";
    VER = "2014/11/0418:32:33";
    VER = "2014/11/0510:56:34";
    VER = "2014/11/0510:57:54";
    VER = "2014/11/0510:59:03";
    VER = "2014/11/0511:00:06";
    VER = "2014/11/0511:02:24";
    VER = "2014/11/0511:11:34";
    VER = "2014/11/1010:38:18";
    VER = "2014/11/1318:06:15";
    VER = "2014/11/1318:23:25";
    VER = "2014/11/1318:29:24";
    VER = "2014/11/1318:30:27";
    VER = "2014/11/1318:31:03";
    VER = "2014/11/1318:32:38";
    VER = "2014/11/1318:35:09";
    VER = "2014/11/1318:36:04";
    VER = "2014/11/1318:36:59";
    VER = "2014/11/1318:37:54";
    VER = "2014/11/1318:39:50";
    VER = "2014/11/1318:40:10";
    VER = "2014/11/1318:41:10";
    VER = "2014/11/1318:45:44";
    VER = "2014/11/1318:46:49";
    VER = "2014/11/1318:47:19";
    VER = "2014/11/1410:12:17";
    VER = "2014/11/1410:14:53";
    VER = "2014/11/1410:16:39";
    VER = "2014/11/1410:18:07";
    VER = "2014/11/1410:19:15";
    VER = "2014/11/1410:52:32";
    VER = "2014/11/1410:54:46";
    VER = "2014/11/1410:59:26";
    VER = "2014/11/1411:14:09";
    VER = "2014/11/1411:15:20";
    VER =
        "2014/11/1411:16:59";
    VER = "2014/11/1411:17:24";
    VER = "2014/11/1411:57:02";
    VER = "2014/11/1711:02:45";
    VER = "2014/11/1817:14:29";
    VER = "2014/11/2017:50:34";
    VER = "2014/11/2017:50:55";
    VER = "2014/11/2017:51:40";
    VER = "2014/11/2017:53:29";
    VER = "2014/11/2017:54:06";
    VER = "2014/11/2017:57:26";
    VER = "2014/11/2017:59:13";
    VER = "2014/11/2018:00:57";
    VER = "2014/11/2018:33:10";
    VER = "2014/11/2018:34:26";
    VER = "2014/11/2018:36:46";
    VER = "2014/11/2018:40:49";
    VER = "2014/11/2018:42:03";
    VER = "2014/11/2411:24:13";
    VER = "2014/11/2815:53:58";
    VER = "2014/12/0418:00:32";
    VER = "2014/12/0418:09:56";
    VER = "2015/01/2610:31:10";
    VER = "2015/02/0416:13:08";
    VER = "2015/02/0416:18:05";
    VER = "2015/02/0416:19:46";
    VER = "2015/02/0416:39:16";
    VER = "2015/02/0416:54:12";
    VER = "2015/02/2510:56:12";
    VER = "2015/02/2510:58:01";
    VER = "2015/03/1715:34:05";
    VER = "2015/03/1716:36:06";
    VER = "2015/03/1716:36:45";
    VER = "2015/03/1716:37:34";
    VER = "2015/03/1716:38:05";
    VER = "2015/03/1716:38:33";
    VER = "2015/03/1716:39:18";
    VER = "2015/03/1716:42:00";
    VER = "2015/03/1716:43:03";
    VER = "2015/03/1716:45:38";
    VER = "2015/03/1716:46:54";
    VER =
        "2015/03/1716:47:44";
    VER = "2015/04/2016:59:34";
    VER = "2015/04/2017:01:44";
    VER = "2015/04/2017:03:21";
    VER = "2015/04/2017:06:42";
    VER = "2015/04/2017:15:55";
    VER = "2015/04/2017:24:57";
    VER = "2015/04/2017:26:36";
    VER = "2015/04/2114:54:43";
    VER = "2015/04/2115:03:27";
    VER = "2015/05/0416:40:45";
    VER = "2015/05/0511:04:50";
    DEBUG__ = 0;
    if (0 == DEBUG__ || !window.console) window.console = {}, window.console.log = function() {};
    debug = {
        log: function(a) {
            null != document.getElementById("debug") && (document.getElementById("debug").innerHTML += a + " | ")
        }
    };
    var b = {},
        C = {},
        d = {
            playerType: "",
            uniplayerUrl: "http://passport-log.youku.com/logsys/logstorage/append?project=uniplayer&log=",
            MPIECEURL: "http://passport-log.youku.com/logsys/logstorage/append?project=mpiece&log=",
            userCache: {
                a1: "4",
                a2: "1"
            },
            playerState: {
                PLAYER_STATE_INIT: "PLAYER_STATE_INIT",
                PLAYER_STATE_READY: "PLAYER_STATE_READY",
                PLAYER_STATE_AD: "PLAYER_STATE_AD",
                PLAYER_STATE_PLAYING: "PLAYER_STATE_PLAYING",
                PLAYER_STATE_END: "PLAYER_STATE_END",
                PLAYER_STATE_ERROR: "PLAYER_STATE_ERROR"
            },
            playerCurrentState: "PLAYER_STATE_INIT"
        },
        R = function() {
            this._player = document.getElementById(d.playerId)
        };
    R.prototype = {
        resize: function(a, c) {
            this._player.style.width = a + "px";
            this._player.style.height = c + "px"
        },
        currentTime: function() {
            var a = this._player.getPlayerState().split("|");
            return 3 <= a.length ? a[2] : -1
        },
        totalTime: function() {
            var a = this._player.getPlayerState().split("|");
            return 4 <= a.length ? a[3] : -1
        },
        playVideo: function() {
            this._player.pauseVideo(!1)
        },
        pauseVideo: function() {
            this._player.pauseVideo(!0)
        },
        seekTo: function(a) {
            this._player.nsseek(a)
        },
        playVideoById: function(a) {
            this._player.playVideoByID(a)
        },
        hideControls: function() {
            this._player.showControlBar(!1)
        },
        showControls: function() {
            this._player.showControlBar(!0)
        }
    };
    PartnerConstant = {
        OPEN_API_URL: "https://openapi.youku.com/v2/players/custom.json",
        OPEN_API_OK: "openapiokyouku",
        OPEN_API_TIME_OUT: "openapitimeoutyouku",
        OPEN_API_ERROR: "openapierror"
    };
    var S = function(a) {
        this._handler = {};
        window.partnerinfo = this;
        a.callback = "partnerinfo.parse";
        a = n(a);
        x(PartnerConstant.OPEN_API_URL + "?" + a);
        var c = this;
        setTimeout(function() {
            c._hasResp ||
                c.dispatch({
                    type: PartnerConstant.OPEN_API_TIME_OUT
                })
        }, 2E3)
    };
    S.prototype = {
        addEventListener: function(a, c) {
            this._handler[a] = c
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        parse: function(a) {
            this._hasResp = !0;
            null != a.error || 1 != a.status ? this.dispatch({
                type: PartnerConstant.OPEN_API_ERROR
            }) : this.dispatch({
                type: PartnerConstant.OPEN_API_OK,
                data: a
            })
        }
    };
    var k = {},
        A = {},
        D = [];
    k.mp4srcs = [];
    k.start = function(a, c, b, f) {
        this._callback =
            f;
        if (null == this._callback) switch (this._type) {
            case "m3u8":
                this._callback = d.GetM3U8OK;
                break;
            case "mp4":
                this._callback = d.GetMP4OK;
                break;
            default:
                this._callback = d.GetM3U8OK
        }
        null != A[a] && null != A[a][b] ? (console.log("Cache Hit vid = " + a), this._callback(A[a][b].v, A[a][b].videoInfo)) : (this._vid = a, this._password = c, this._type = b, this._videoInfo = null, this._url = "", this.mp4srcs = [], this.request())
    };
    k.cache = function() {
        A[k._vid] = {};
        A[k._vid][k._type] = {
            v: this._v,
            videoInfo: this._videoInfo
        }
    };
    k.getPlayListUrl = function() {
        var a =
            "http://v.youku.com/player/getPlayList/VideoIDS/" + this._vid,
            a = a + "/Pf/4/ctype/12/ev/1",
            c;
        for (c in this.playlistconfig) a += "/" + c + "/" + this.playlistconfig[c];
        return a + "?"
    };
    k.error = function(a) {
        a || (a = 0);
        d.sendErrorReport(0);
        d.uniReport({
            error: a,
            vid: b.initConfig.vid
        });
        d.showError(b.config.parentBox, "\u8be5\u89c6\u9891\u6682\u65f6\u4e0d\u80fd\u64ad\u653e,\u8bf7\u4e0b\u8f7dAPP\u6216\u5728PC\u4e0a\u89c2\u770b", 320)
    };
    k.reportPlayListUep = function() {
        var a = (new Date).getTime() - this._plreqStartTime;
        D.push({
            type: "getplaylist",
            time: a
        })
    };
    k.response = function(a) {
        this.playlistError || (this.playlistOK = !0, this.reportPlayListUep(), (b.v = a) && a.data && a.data[0] && !0 !== a.data[0].rtmp && !0 !== a.data[0].drm ? this.init(a) : this.error(1, a, a.data, a.data[0]))
    };
    k.request = function() {
        this._url = this.getPlayListUrl();
        this._password && (this._url += "password=" + escape(this._password), this._url += "&");
        this._password && (b.initConfig.client_id && b.config.partner_config && 1 == b.config.partner_config.status && 1 == b.config.partner_config.passless) && (this._url += "client_id=" +
            b.initConfig.client_id, this._url += "&");
        this._url += "__callback=BuildVideoInfo.response";
        "" != b.getUCStr(this._vid) && (this._url += b.getUCStr(this._vid));
        this._plreqStartTime = (new Date).getTime();
        x(this._url);
        var a = this;
        setTimeout(function() {
            if (!a.playlistOK) {
                a.playlistError = true;
                d.sendErrorReport(2003);
                if (b.playerEvents && b.playerEvents.onPlayError) b.playerEvents.onPlayError("\u89c6\u9891\u4fe1\u606f\u51fa\u9519\uff0c\u8bf7\u5237\u65b0\u91cd\u8bd5");
                b.get("#x-player").innerHTML = "\u89c6\u9891\u4fe1\u606f\u51fa\u9519\uff0c\u8bf7\u5237\u65b0\u91cd\u8bd5";
                b.get("#x-player").style.color = "white";
                b.get("#x-player").style.textAlign = "center";
                b.get("#x-player").style.lineHeight = b.get("#x-player").offsetHeight + "px"
            }
        }, 15E3)
    };
    k.m3u8src = function(a) {
        b.password = this._password;
        return b.m3u8src_v2(this._vid, a)
    };
    k.total = function(a) {
        for (var c in a.segs) {
            for (var b = 0, f = 0, d = 0; d < a.segs[c].length; d++) var g = a.segs[c][d],
                b = b + parseInt(g.seconds),
                f = f + parseInt(g.size);
            return {
                totalTime: b,
                totalBytes: f
            }
        }
    };
    k.cleanSrc = function() {
        for (var a = this._videoInfo._videoSegsDic[m], c = 0; c <
            a.length; c++) a[c].fyksrc = a[c].src, a[c].src = k.mp4srcs[c]
    };
    k.processError = function(a) {
        debug.log("playlist errorcode = " + a.error_code);
        if (-12 == a.error_code || -13 == a.error_code) return a.segs = {
            "3gphd": [{
                no: "0",
                size: "0",
                seconds: "0",
                k: "",
                k2: ""
            }]
        }, a.streamfileids = {
            "3gphd": "0*0"
        }, !1;
        null == this._callback ? "m3u8" == this._type ? d.GetM3U8OK(this._v, {}) : d.GetMP4OK(this._v, {}) : this._callback(this._v, {});
        return !0
    };
    k.init = function(a) {
        this._v = a;
        a = a.data[0];
        if (!a.ep || !a.ip) d.sendErrorReport(2004), d.showError(null, "\u6570\u636e\u89e3\u6790\u9519\u8bef");
        else {
            var c = F(G(b.mk.a3 + "o0b" + d.userCache.a1, [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26]).toString(), pa(a.ep));
            if (2 > c.split("_").length) d.sendErrorReport(2004), d.showError(null, "\u6570\u636e\u89e3\u6790\u9519\u8bef");
            else {
                d.userCache.sid = c.split("_")[0];
                d.userCache.token = c.split("_")[1];
                if (null != a.error_code) {
                    if (-6 == a.error_code || -7 == a.error_code) d.sendErrorReport(4E3);
                    else {
                        if (-28 == a.error_code) {
                            d.sendErrorReport(2007);
                            d.showError(b.config.parentBox,
                                "\u7528\u6237\u6ca1\u6709\u6743\u9650\u89c2\u770b");
                            return
                        }
                        d.sendErrorReport(1E3)
                    }
                    if (this.processError(a)) return
                }
                c = k.total(a);
                this._videoInfo = new T(a, this._type);
                this._videoInfo.totalTime = c ? c.totalTime : a.seconds;
                if ("m3u8" == this._type) b.defaultVideoType = "mp4", null != l.getItem("defaultVideoType") && (b.defaultVideoType = l.getItem("defaultVideoType")), -1 == a.streamtypes.indexOf(b.defaultVideoType) && (b.defaultVideoType = "mp4", -1 == a.streamtypes.indexOf("mp4") && (b.defaultVideoType = "flv")), debug.log("default = " +
                    b.defaultVideoType), this._videoInfo.src = k.m3u8src(b.defaultVideoType), this.cache(), null == this._callback ? d.GetM3U8OK(this._v, this._videoInfo) : this._callback(this._v, this._videoInfo);
                else if ("mp4" == this._type) {
                    c = ["3gphd", "mp4", "flv"];
                    m = null;
                    for (var e = 0; e < c.length; e++)
                        if (this._videoInfo._videoSegsDic[c[e]] && !("3gphd" == c[e] && 7200 < parseInt(a.seconds))) {
                            m = c[e];
                            break
                        }
                    debug.log("mp4 type=" + m);
                    m ? ("flv" == m && (d.Log(d.uniplayerUrl + r({
                            error: "flvonly",
                            vid: b.initConfig.vid
                        })), b.config.playType = "directsrc"), this.fetchDirectSrc(this._videoInfo._videoSegsDic[m]),
                        this._tid = setInterval("checkSrc()", 500)) : this.error(2)
                }
            }
        }
    };
    k.getFileUrl = function(a) {
        var c = [];
        if (a)
            for (var b = 0; b < a.length; b++) c.push(a[b].src);
        return c
    };
    k.fetchDirectSrc = function(a) {
        this._fyks = urls = this.getFileUrl(a);
        if (this._v && this._v.data[0].trial) {
            for (var a = 0, c = this._v.data[0].segs, a = 0; a < c.mp4.length && -1 !== c.mp4[a].k; a++);
            urls.length = a
        }
        for (a = 0; a < urls.length; a++) k.mp4srcs.push(urls[a])
    };
    DirectSrcOK = function(a) {
        null == a || ("object" != typeof a || 0 == a.length) || k.mp4srcs.push(a[0].server)
    };
    var T = function(a,
            c) {
            this._sid = d.userCache.sid;
            this._seed = a.seed;
            this._fileType = c;
            var b = new U(this._seed);
            this._streamFileIds = a.streamfileids;
            this._videoSegsDic = {};
            for (c in a.segs) {
                for (var f = [], i = 0, g = 0; g < a.segs[c].length; g++) {
                    var h = a.segs[c][g],
                        p = {};
                    p.no = h.no;
                    p.size = h.size;
                    p.seconds = h.seconds;
                    h.k && (p.key = h.k);
                    p.fileId = this.getFileId(a.streamfileids, c, parseInt(g), b);
                    p.type = c;
                    p.src = this.getVideoSrc(h.no, a, c, p.fileId);
                    f[i++] = p
                }
                this._videoSegsDic[c] = f
            }
        },
        U = function(a) {
            this._randomSeed = a;
            this.cg_hun()
        };
    U.prototype = {
        cg_hun: function() {
            this._cgStr =
                "";
            for (var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890", c = a.length, b = 0; b < c; b++) {
                var f = parseInt(this.ran() * a.length);
                this._cgStr += a.charAt(f);
                a = a.split(a.charAt(f)).join("")
            }
        },
        cg_fun: function(a) {
            for (var a = a.split("*"), c = "", b = 0; b < a.length - 1; b++) c += this._cgStr.charAt(a[b]);
            return c
        },
        ran: function() {
            this._randomSeed = (211 * this._randomSeed + 30031) % 65536;
            return this._randomSeed / 65536
        }
    };
    T.prototype = {
        getFileId: function(a, c, b, f) {
            for (var d in a)
                if (d == c) {
                    streamFid = a[d];
                    break
                }
            if ("" ==
                streamFid) return "";
            c = f.cg_fun(streamFid);
            a = c.slice(0, 8);
            b = b.toString(16);
            1 == b.length && (b = "0" + b);
            b = b.toUpperCase();
            c = c.slice(10, c.length);
            return a + b + c
        },
        getVideoSrc: function(a, c, e, f, i, g) {
            if (!c.videoid || !e) return "";
            var h = {
                    flv: 0,
                    flvhd: 0,
                    mp4: 1,
                    hd2: 2,
                    "3gphd": 1,
                    "3gp": 0
                }[e],
                p = {
                    flv: "flv",
                    mp4: "mp4",
                    hd2: "flv",
                    "3gphd": "mp4",
                    "3gp": "flv"
                }[e],
                k = a.toString(16);
            1 == k.length && (k = "0" + k);
            var l = c.segs[e][a].seconds,
                a = c.segs[e][a].k;
            if ("" == a || -1 == a) a = c.key2 + c.key1;
            e = "";
            c.show && (e = c.show.show_paid ? "&ypremium=1" : "&ymovie=1");
            c = "/player/getFlvPath/sid/" + d.userCache.sid + "_" + k + "/st/" + p + "/fileid/" + f + "?K=" + a + "&hd=" + h + "&myp=0&ts=" + l + "&ypp=0" + e;
            f = encodeURIComponent(E(F(G(b.mk.a4 + "poz" + d.userCache.a2, [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26]).toString(), d.userCache.sid + "_" + f + "_" + d.userCache.token)));
            c = c + ("&ep=" + f) + "&ctype=12&ev=1" + ("&token=" + d.userCache.token);
            c += "&oip=" + b.v.data[0].ip;
            return "http://k.youku.com" + (c + ((i ? "/password/" + i : "") + (g ? g : "")))
        }
    };
    var V = function(a) {
        this._player =
            document.getElementById("youku-html5player-video");
        null == this._player && (this._player = document.getElementById("youku-html5player-video-0"));
        this._oplayer = a
    };
    V.prototype = {
        resize: function(a, c) {
            this._oplayer.resize(a, c)
        },
        currentTime: function() {
            return this._player.currentTime
        },
        totalTime: function() {
            return this._player.duration
        },
        playVideo: function() {
            this._oplayer.play()
        },
        startPlayVideo: function() {
            if (d.isNeedFrontAd) this._oplayer.controls.onVideoBtnTouchEnd();
            else this._oplayer.controls.onVideoBtnClick()
        },
        pauseVideo: function() {
            this._player.pause()
        },
        seekTo: function(a) {
            try {
                this._player.currentTime = a
            } catch (c) {}
        },
        playVideoById: function(a, c) {
            debug.log("YKH5Player playVideoByid");
            var e = this._oplayer;
            b.config.autoplay = !0;
            b.config.vid = a;
            k.start(a, c, b.config.content, function(a, c) {
                e.startPlay(a, c)
            })
        },
        hideControls: function() {
            this._player.removeAttribute("controls")
        },
        showControls: function() {
            this._player.setAttribute("controls", !0)
        },
        switchFullScreen: function() {
            this._oplayer.controls.fullscreenPanel.switchFullScreen({})
        }
    };
    d.Log = function(a, c) {
        var b = document.createElement("img");
        c && b.addEventListener("error", c, !1);
        b.src = a + "&r_=" + Math.floor(1E4 * Math.random());
        b.id = "youku-uniplayer-stat"
    };
    d.isNeedAdrTrick = function() {
        return d.isAndroid && !d.adrPlayTrick && !d.isHTC && d.isNeedFrontAd && !d.isVIVO
    };
    d.adrInvalidPauseCheck = function(a) {
        var c = a.currentTime,
            b = 0,
            f = !1;
        d.adrPlayTrick = !0;
        a.pause();
        a.play();
        setInterval(function() {
            a.currentTime == c && !f ? (b++, a.play(), 0 == b % 10 && (a.load(), a.play())) : f = !0
        }, 1E3)
    };
    d.sendErrorReport = function(a) {
        var c = {},
            e = "",
            e = d.isIPAD ? "xplayer_ipad" : d.isIPHONE ? "xplayer_iphone" : "xplayer_android";
        c.m = e;
        c.ec = a;
        e = "";
        1E3 == a && (e = b.v.data[0].error_code);
        c.gc = e;
        c.u = encodeURIComponent(window.location.href);
        c.v = b.videoInfo ? b.videoInfo._sid : "";
        c.ct = b.v ? b.v.data[0].ct : "";
        c.cs = b.v ? b.v.data[0].cs : "";
        c.hd = d.hd ? d.hd : 0;
        c.a = b.v ? b.v.controller.area_code + "|" + b.v.controller.dma_code : "";
        a = "";
        b.initConfig.vvlogconfig && b.initConfig.vvlogconfig.pvid && (a = b.initConfig.vvlogconfig.pvid);
        c.pid = a;
        d.Log("http://v.l.youku.com/perror?" + n(c))
    };
    d.uniReport = function(a) {
        a.partner = b.initConfig.client_id;
        a.os = escape(d.os);
        a.mios = d.isMobileIOS;
        a.adrd4 = d.isAndroid4;
        a.mobile = d.isMobile;
        a.adrpad = d.isAndroidPad;
        !1 == a.mobile && (a.ua = escape(navigator.userAgent.replace(/[\/\+\*@\(\)\,]/g, "")));
        a.version = VER.replace(/[-: ]/g, "");
        d.Log(d.uniplayerUrl + r(a))
    };
    d.Load = function(a, c) {
        if ("js" == c) {
            var b = document.createElement("script");
            b.setAttribute("type", "text/javascript");
            b.setAttribute("src", a)
        } else "css" == c && (b = document.createElement("link"), b.setAttribute("rel",
            "stylesheet"), b.setAttribute("type", "text/css"), b.setAttribute("href", a));
        "undefined" != typeof b && document.getElementsByTagName("head")[0].appendChild(b)
    };
    d.showError = function(a, c) {
        var e = b.get("#x-player");
        e.innerHTML = c ? c : "\u8be5\u89c6\u9891\u683c\u5f0f\u7279\u6b8a\uff0c\u8bf7\u5728PC\u4e0a\u89c2\u770b";
        e.style.textAlign = "center";
        e.style.color = "white";
        e.style.lineHeight = e.offsetHeight + "px";
        if (b.playerEvents && b.playerEvents.onPlayError) b.playerEvents.onPlayError(c ? c : "\u8be5\u89c6\u9891\u683c\u5f0f\u7279\u6b8a\uff0c\u8bf7\u5728PC\u4e0a\u89c2\u770b")
    };
    (function() {
        var a = document.createElement("video"),
            c = {
                MP4: "video/mp4",
                OGG: "video/ogg",
                WEBM: "video/webm"
            },
            b = {
                isWin: "Win",
                isMac: "Mac",
                isSafari: "Safari",
                isChrome: "Chrome",
                isIPAD: "iPad",
                isIPAD7: "iPad; CPU OS 7",
                isIPHONE: "iPhone",
                isIPOD: "iPod",
                isLEPAD: "lepad_hls",
                isMIUI: "MI-ONE",
                isAndroid: "Android",
                isAndroid4: "Android 4.",
                isAndroid41: "Android 4.1",
                isSonyDTV: "SonyDTV",
                isBlackBerry: "BlackBerry",
                isMQQBrowser: "MQQBrowser",
                isMobile: "Mobile",
                isSamSung: "SAMSUNG",
                isHTC: "HTC",
                isVIVO: "vivo"
            };
        d.supportHTML5Video = !1;
        d.isIOS = !1;
        d.os = "";
        if (a.canPlayType) {
            d.supportHTML5Video = !0;
            for (var f in c) d["canPlay" + f] = a.canPlayType(c[f]) ? !0 : !1
        }
        for (var i in b)
            if (-1 !== navigator.userAgent.indexOf(b[i]) ? (d[i] = !0, d.os += b[i] + " ") : d[i] = !1, -1 !== navigator.userAgent.indexOf("Android")) a = navigator.userAgent.indexOf("Android"), a = navigator.userAgent.substr(a, 10), a > b.isAndroid4 && (d.isAndroid4 = !0, d.os += a + " ");
        d.isMobileIOS = d.isIPAD || d.isIPHONE || d.isIPOD;
        d.isIOS = d.isMobileIOS || d.isMac;
        d.isSupportH5M3U8 = d.isMobileIOS || d.isMac && d.isSafari &&
            !d.isChrome || d.isLEPAD || d.isSonyDTV;
        d.isSupportH5MP4 = (d.isChrome || d.isIE10 || d.isAndroid41 || d.isAndroid4) && d.canPlayMP4;
        i = b = 0;
        try {
            if (document.all) {
                var g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                g && (b = 1, VSwf = g.GetVariable("$version"), parseInt(VSwf.split(" ")[1].split(",")[0]))
            } else if (navigator.plugins && 0 < navigator.plugins.length && (g = navigator.plugins["Shockwave Flash"]))
                for (var b = 1, h = g.description.split(" "), g = 0; g < h.length; ++g) isNaN(parseInt(h[g])) || parseInt(h[g])
        } catch (p) {
            i = b = 1
        }
        d.isSupportFlash =
            b && !i;
        d.isMQQBrowser && (d.isSupportFlash = !1);
        d.isPhone = d.isIPHONE || d.isIPOD || d.isAndroid && d.isMobile;
        d.isAndroidPad = d.isAndroid && !d.isMobile;
        d.isPad = d.isIPAD || d.isAndroidPad;
        d.isMobile = d.isIPAD || d.isIPHONE || d.isIPOD || d.isLEPAD || d.isMIUI || d.isAndroid4 || d.isSonyDTV
    })();
    var J = function(a) {
        _console.log(a.target);
        debug.log("canplay mp4 = " + d.canPlayMP4);
        b.initConfig = a;
        this._vid = a.vid;
        this._target = a.target;
        this._partnerId = a.partnerId;
        a.client_id && (this._partnerId = a.client_id);
        !a.pkid && (!this._vid || !this._target || !this._partnerId) ?
            alert("[Fail]The params of {vid,target,client_id} are necessary !") : (this._events = a.events, b.playerEvents = a.events, d._target = this._target, this._paid = 0, null != a.paid && (this._paid = a.paid), this._id = a.id, null == this._id && (this._id = "youku-player"), d.playerId = this._id, this._width = a.width, this._height = a.height, this._expand = a.expand, null == a.width || null == a.height ? null == a.expand && (this._expand = 0) : null == a.expand && (this._expand = 1), this._prefer = a.prefer ? a.prefer.toLowerCase() : "flash", this._starttime = a.starttime,
                this._password = a.password, this._poster = a.poster, this._autoplay = eval(a.autoplay), this._canWide = a.canWide, this._showRelated = a.show_related, this._winType = a.wintype, this._pkid = a.pkid, this._pkpid = a.pkpid, this._pkurl = a.pkurl, this._playlistconfig = a.playlistconfig, this._isMobile = d.isMobile, this._isMobileIOS = d.isMobileIOS, this._weixin = a.weixin, this._playerType = "", b.mk = {}, b.mk.a3 = "b4et", b.mk.a4 = "boa4")
    };
    J.prototype = {
        isSupportH5MP4: function() {
            return d.isSupportH5MP4
        },
        isSupportH5M3U8: function() {
            return d.isSupportH5M3U8
        },
        isSupportFlash: function() {
            return d.isSupportFlash
        },
        playerType: function() {
            if ("" != this._playerType) return this._playerType;
            this._playerType = "h5" == this._prefer ? this.isSupportH5M3U8() ? "h5m3u8" : this.isSupportH5MP4() ? "h5mp4" : this.isSupportFlash() ? "flash" : "error" : "flash" == this._prefer ? this.isSupportFlash() ? "flash" : this.isSupportH5M3U8() ? "h5m3u8" : this.isSupportH5MP4() ? "h5mp4" : "error" : "error";
            if (("h5m3u8" == this._playerType || "h5mp4" == this._playerType) && void 0 != this._pkid) this._playerType = "h5pk";
            window.console &&
                console.log && console.log("playerType = " + this._playerType);
            return this._playerType
        },
        select: function() {
            debug.log("playerType = " + this.playerType());
            if (this.isThirdParty()) {
                var a = this;
                this.processThirdParty(function() {
                    a.selectHandler()
                })
            } else this.selectHandler()
        },
        selectHandler: function() {
            "h5m3u8" == this.playerType() ? this.selectH5M3U8() : "h5mp4" == this.playerType() ? this.selectH5MP4() : "h5pk" == this.playerType() ? this.selectH5PK() : "flash" == this.playerType() ? this.selectFlash() : this.selectDirectUrl();
            if (this._events &&
                this._events.onPlayerReady) {
                var a = this._events.onPlayerReady;
                if ("h5" == d.playerType) var c = setInterval(function() {
                    if ($$$(d.playerId)) {
                        d.playerCurrentState = d.playerState.PLAYER_STATE_READY;
                        debug.log(d.playerCurrentState);
                        clearInterval(c);
                        try {
                            l.appendItem("phase", "playerready"), a()
                        } catch (b) {}
                    }
                }, 500);
                else "flash" == d.playerType && (c = setInterval(function() {
                    if (1 == C.swfLoaded) {
                        d.playerCurrentState = d.playerState.PLAYER_STATE_READY;
                        debug.log(d.playerCurrentState);
                        clearInterval(c);
                        try {
                            l.appendItem("phase", "playerready"),
                                a()
                        } catch (b) {}
                    }
                }, 500))
            }
        },
        selectH5MP4: function() {
            d.uniReport({
                mp4: 1
            });
            d.playerType = "h5";
            var a = this._h5player = new YoukuHTML5Player({
                id: this._id,
                vid: this._vid,
                partnerId: this._partnerId,
                parentBox: this._target,
                events: this._events,
                width: this._width,
                height: this._height,
                poster: this._poster,
                autoplay: this._autoplay,
                isMobile: this._isMobile,
                isMobileIOS: this._isMobileIOS,
                content: "mp4",
                wintype: this._winType,
                expand: this._expand,
                partner_config: this.partner_config,
                canWide: this._canWide ? this._canWide : 0
            });
            d.GetMP4OK =
                function(c, e) {
                    l.appendItem("phase", "vinfo_mp4");
                    a.startPlay(c, e);
                    if (b.initConfig.events.onMediaSrcOK) b.initConfig.events.onMediaSrcOK(m, e._videoSegsDic[m][0].src)
                };
            k.playlistconfig = this._playlistconfig;
            k.start(this._vid, this._password, "mp4")
        },
        selectH5M3U8: function() {
            d.uniReport({
                m3u8: 1
            });
            d.playerType = "h5";
            var a = {
                id: this._id,
                vid: this._vid,
                partnerId: this._partnerId,
                parentBox: this._target,
                events: this._events,
                width: this._width,
                height: this._height,
                poster: this._poster,
                autoplay: this._autoplay,
                isMobile: this._isMobile,
                isMobileIOS: this._isMobileIOS,
                content: "m3u8",
                wintype: this._winType,
                expand: this._expand,
                partner_config: this.partner_config,
                canWide: this._canWide ? this._canWide : 0
            };
            b.isWeixin = !1;
            if (d.isIPHONE || d.isIPOD) a.playType = "directsrc", this._weixin && (b.isWeixin = !0);
            var c = new YoukuHTML5Player(a);
            this._h5player = c;
            d.GetM3U8OK = function(a, b) {
                l.appendItem("phase", "vinfo_m3u8");
                console.log("videoinfo src = " + b.src);
                c.startPlay(a, b)
            };
            k.playlistconfig = this._playlistconfig;
            k.start(this._vid, this._password, "m3u8")
        },
        selectH5PK: function() {
            d.playerType =
                "h5";
            var a = {
                id: this._pkid,
                pid: this._pkpid,
                url: decodeURIComponent(this._pkurl),
                parentBox: this._target
            };
            this._h5player = new W(a)
        },
        processThirdParty: function(a) {
            var c = new S({
                    client_id: b.initConfig.client_id,
                    video_id: b.initConfig.vid,
                    embsig: b.initConfig.embsig,
                    refer: escape(window.location.href)
                }),
                e = this;
            c.addEventListener(PartnerConstant.OPEN_API_OK, function(c) {
                debug.log("thirdparty res ok");
                e.partner_config = c.data;
                a()
            });
            c.addEventListener(PartnerConstant.OPEN_API_ERROR, function() {
                debug.log("thirdparty res error");
                a()
            });
            c.addEventListener(PartnerConstant.OPEN_API_TIME_OUT, function() {
                debug.log("thirdparty res timeout");
                a()
            })
        },
        selectH5VTag: function() {
            d.playerType = "h5";
            var a = "http://v.youku.com/player/getM3U8/vid/" + this._vid + "/type/mp4/ts/" + parseInt((new Date).getTime() / 1E3),
                a = a + (this._password ? "/password/" + this._password : ""),
                a = '<video src="' + (a + "/v.m3u8") + '" controls width=' + this._width + " height=" + this._height + " id=" + this._id + " autohide=false " + (this._poster ? "poster=" + this._poster : "") + " " + (!0 == this._autoplay ?
                    "autoplay=true" : "") + "></video>";
            $$$(this._target).innerHTML = a
        },
        isThirdParty: function() {
            if (void 0 != this._pkid) return !1;
            var a = b.initConfig.client_id;
            return null != a && 16 == (a + "").length ? !0 : !1
        },
        selectFlash: function() {
            d.uniReport({
                flash: 1
            });
            d.playerType = "flash";
            var a = {
                imglogo: this._poster || "",
                paid: this._paid,
                partnerId: b.initConfig.client_id
            };
            null != b.initConfig.firsttime && (a.firsttime = b.initConfig.firsttime);
            null != this._autoplay && (a.isAutoPlay = this._autoplay);
            null != b.initConfig.embsig && (a.embsig = b.initConfig.embsig);
            null != this._showRelated && (a.isShowRelatedVideo = this._showRelated);
            null != b.initConfig.password && (a.passwordstr = b.initConfig.password);
            null != b.initConfig.styleid && (a.styleid = b.initConfig.styleid);
            null != b.initConfig.vext && (a.vext = b.initConfig.vext);
            for (var c in b.initConfig.adconfig) a[c] = b.initConfig.adconfig[c];
            for (c in b.initConfig.flashconfig) a[c] = b.initConfig.flashconfig[c];
            c = "";
            this.isThirdParty() && (c = "/partnerid/" + this._partnerId);
            a.delayload && (c = "");
            var e = "";
            null != this._winType && "" != this._winType &&
                (e = "/winType/" + this._winType);
            null != b.initConfig.pkid && (a.VideoIDS = b.initConfig.pkid);
            null != b.initConfig.pkpid && (a.pkpid = b.initConfig.pkpid);
            null != b.initConfig.pkurl && (a.pkurl = b.initConfig.pkurl);
            c = "http://player.youku.com/player.php/sid/" + this._vid + c + e + "/v.swf";
            b.initConfig.flashsrc && (c = b.initConfig.flashsrc);
            null != b.initConfig.pkid && (c = "youkupaike.swf");
            a = n(a);
            $$$(this._target).innerHTML = "<object type=application/x-shockwave-flash data= " + c + " width=100% height=100% id=" + this._id + "><param name=allowFullScreen value=true><param name=allowScriptAccess value=always><param name=movie value=" +
                c + "><param name=flashvars value=" + a + ">" + (b.initConfig.flashext || "") + "</object>";
            this._expand && ($$$(this._target).style.width = this._width + "px", $$$(this._target).style.height = this._height + "px")
        },
        selectDirectUrl: function(a) {
            a = a || "mp4";
            debug.log("select directsrc");
            d.uniReport({
                direct: 1
            });
            d.playerType = "directsrc";
            var c = new DirectPlayer({
                id: this._id,
                vid: this._vid,
                partnerId: this._partnerId,
                parentBox: this._target,
                events: this._events,
                width: this._width,
                height: this._height,
                poster: this._poster,
                autoplay: this._autoplay,
                isMobile: this._isMobile,
                isMobileIOS: this._isMobileIOS,
                content: a,
                playType: "directsrc",
                wintype: this._winType,
                expand: this._expand,
                canWide: this._canWide ? this._canWide : 0
            });
            this._h5player = c;
            k.playlistconfig = this._playlistconfig;
            k.start(this._vid, this._password, a, function(a, b) {
                c.startPlay(a, b)
            })
        },
        selectError_: function(a, c) {
            d.uniReport({
                error: 1
            });
            if (this._width || this._height) $$$(this._target).style.width = this._width + "px", $$$(this._target).style.height = this._height + "px";
            d.playerType = "error";
            d.showError(this._target,
                a, c)
        }
    };
    C.Player = function(a, c) {
        c.target = a;
        this.select = new J(c);
        this.select.select();
        this._player = ""
    };
    C.Player.prototype = {
        player: function() {
            return "" != this._player ? this._player : this._player = "h5" == d.playerType ? new V(this.select._h5player) : "flash" == d.playerType ? new R : "error"
        },
        resize: function(a, c) {
            this.player().resize(a, c)
        },
        currentTime: function() {
            return this.player().currentTime()
        },
        totalTime: function() {
            return this.player().totalTime()
        },
        playVideo: function() {
            this.player().playVideo()
        },
        startPlayVideo: function() {
            this.player().startPlayVideo()
        },
        pauseVideo: function() {
            this.player().pauseVideo()
        },
        seekTo: function(a) {
            this.player().seekTo(a)
        },
        hideControls: function() {
            this.player().hideControls()
        },
        showControls: function() {
            this.player().showControls()
        },
        playVideoById: function(a) {
            this.player().playVideoById(a)
        },
        switchFullScreen: function() {
            try {
                this.player().switchFullScreen()
            } catch (a) {}
        }
    };
    $$$ = function(a) {
        return document.getElementById(a)
    };
    var ra = function(a) {
            a = parseInt(a);
            return Math.min(Math.max(a, 0), b.videoInfo.totalTime)
        },
        r = function(a) {
            var c = [],
                b;
            for (b in a) c.push(b + ":" + a[b]);
            return "{" + c.join(",") + "}"
        },
        n = function(a) {
            var c = [],
                b;
            for (b in a) c.push(b + "=" + a[b]);
            return c.join("&")
        },
        E = function(a) {
            if (!a) return "";
            var a = a.toString(),
                c, b, f, d, g, h;
            f = a.length;
            b = 0;
            for (c = ""; b < f;) {
                d = a.charCodeAt(b++) & 255;
                if (b == f) {
                    c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d >> 2);
                    c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((d & 3) << 4);
                    c += "==";
                    break
                }
                g = a.charCodeAt(b++);
                if (b == f) {
                    c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d >>
                        2);
                    c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((d & 3) << 4 | (g & 240) >> 4);
                    c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((g & 15) << 2);
                    c += "=";
                    break
                }
                h = a.charCodeAt(b++);
                c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d >> 2);
                c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((d & 3) << 4 | (g & 240) >> 4);
                c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((g & 15) << 2 | (h & 192) >> 6);
                c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(h & 63)
            }
            return c
        };
    (function() {
        this.FX = function(c, b, e, d, p, k) {
            this.el = a.get(c);
            this.attributes = b;
            this.duration = e || 0.7;
            this.transition = d && d in FX.transitions ? d : "easeInOut";
            this.callback = p || function() {};
            this.ctx = k || window;
            this.units = {};
            this.frame = {};
            this.endAttr = {};
            this.startAttr = {}
        };
        this.FX.transitions = {
            linear: function(a, c, b, e) {
                return b * a / e + c
            },
            easeIn: function(a, c, b, e) {
                return -b * Math.cos(a / e * (Math.PI / 2)) + b + c
            },
            easeOut: function(a,
                c, b, e) {
                return b * Math.sin(a / e * (Math.PI / 2)) + c
            },
            easeInOut: function(a, c, b, e) {
                return -b / 2 * (Math.cos(Math.PI * a / e) - 1) + c
            }
        };
        this.FX.prototype = {
            start: function() {
                var a = this;
                this.getAttributes();
                this.duration *= 1E3;
                this.time = (new Date).getTime();
                this.animating = !0;
                this.timer = setInterval(function() {
                    var c = (new Date).getTime();
                    c < a.time + a.duration ? (a.elapsed = c - a.time, a.setCurrentFrame()) : (a.frame = a.endAttr, a.complete());
                    a.setAttributes()
                }, 10)
            },
            ease: function(a, c) {
                return FX.transitions[this.transition](this.elapsed, a,
                    c - a, this.duration)
            },
            complete: function() {
                clearInterval(this.timer);
                this.timer = null;
                this.animating = !1;
                this.callback.call(this.ctx)
            },
            setCurrentFrame: function() {
                for (attr in this.startAttr)
                    if (this.startAttr[attr] instanceof Array) {
                        this.frame[attr] = [];
                        for (var a = 0; a < this.startAttr[attr].length; a++) this.frame[attr][a] = this.ease(this.startAttr[attr][a], this.endAttr[attr][a])
                    } else this.frame[attr] = this.ease(this.startAttr[attr], this.endAttr[attr])
            },
            getAttributes: function() {
                for (var c in this.attributes) switch (c) {
                    case "color":
                    case "borderColor":
                    case "border-color":
                    case "backgroundColor":
                    case "background-color":
                        this.startAttr[c] =
                            b(this.attributes[c].from || a.getStyle(this.el, c));
                        this.endAttr[c] = b(this.attributes[c].to);
                        break;
                    case "scrollTop":
                    case "scrollLeft":
                        var d = this.el == document.body ? document.documentElement || document.body : this.el;
                        this.startAttr[c] = this.attributes[c].from || d[c];
                        this.endAttr[c] = this.attributes[c].to;
                        break;
                    default:
                        var g = this.attributes[c].to,
                            h = this.attributes[c].units || "px";
                        this.attributes[c].from ? d = this.attributes[c].from : (d = parseFloat(a.getStyle(this.el, c)) || 0, "px" != h && document.defaultView && (a.setStyle(this.el,
                            c, (g || 1) + h), d *= (g || 1) / parseFloat(a.getStyle(this.el, c)), a.setStyle(this.el, c, d + h)));
                        this.units[c] = h;
                        this.endAttr[c] = g;
                        this.startAttr[c] = d
                }
            },
            setAttributes: function() {
                for (var c in this.frame) switch (c) {
                    case "opacity":
                        a.setStyle(this.el, c, this.frame[c]);
                        break;
                    case "scrollLeft":
                    case "scrollTop":
                        (this.el == document.body ? document.documentElement || document.body : this.el)[c] = this.frame[c];
                        break;
                    case "color":
                    case "borderColor":
                    case "border-color":
                    case "backgroundColor":
                    case "background-color":
                        a.setStyle(this.el,
                            c, "rgb(" + Math.floor(this.frame[c][0]) + "," + Math.floor(this.frame[c][1]) + "," + Math.floor(this.frame[c][2]) + ")");
                        break;
                    default:
                        a.setStyle(this.el, c, this.frame[c] + this.units[c])
                }
            }
        };
        var a = {
                get: function(a) {
                    return "string" == typeof a ? document.getElementById(a) : a
                },
                getStyle: function(a, b) {
                    var b = c(b),
                        e = document.defaultView;
                    return e && e.getComputedStyle ? e.getComputedStyle(a, "")[b] || null : "opacity" == b ? (e = a.filters("alpha").opacity, isNaN(e) ? 1 : e ? e / 100 : 0) : a.currentStyle[b] || null
                },
                setStyle: function(a, b, e) {
                    "opacity" == b ?
                        (a.style.filter = "alpha(opacity=" + 100 * e + ")", a.style.opacity = e) : (b = c(b), a.style[b] = e)
                }
            },
            c = function() {
                var a = {};
                return function(c) {
                    if (a[c]) return a[c];
                    var b = c.split("-"),
                        e = b[0];
                    if (1 < b.length)
                        for (var d = 1, k = b.length; d < k; d++) e += b[d].charAt(0).toUpperCase() + b[d].substring(1);
                    return a[c] = e
                }
            }(),
            b = function() {
                var a = /^#?(\w{2})(\w{2})(\w{2})$/,
                    c = /^#?(\w{1})(\w{1})(\w{1})$/,
                    b = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
                return function(e) {
                    var d = e.match(a);
                    if (d && 4 == d.length) return [parseInt(d[1], 16), parseInt(d[2],
                        16), parseInt(d[3], 16)];
                    if ((d = e.match(b)) && 4 == d.length) return [parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3], 10)];
                    if ((d = e.match(c)) && 4 == d.length) return [parseInt(d[1] + d[1], 16), parseInt(d[2] + d[2], 16), parseInt(d[3] + d[3], 16)]
                }
            }()
    })();
    FX.transitions.quadIn = function(a, c, b, f) {
        return b * (a /= f) * a + c
    };
    FX.transitions.quadOut = function(a, c, b, f) {
        return -b * (a /= f) * (a - 2) + c
    };
    FX.transitions.quadInOut = function(a, c, b, f) {
        return 1 > (a /= f / 2) ? b / 2 * a * a + c : -b / 2 * (--a * (a - 2) - 1) + c
    };
    FX.transitions.cubicIn = function(a, c, b, f) {
        return b *
            (a /= f) * a * a + c
    };
    FX.transitions.cubicOut = function(a, c, b, f) {
        return b * ((a = a / f - 1) * a * a + 1) + c
    };
    FX.transitions.cubicInOut = function(a, c, b, f) {
        return 1 > (a /= f / 2) ? b / 2 * a * a * a + c : b / 2 * ((a -= 2) * a * a + 2) + c
    };
    FX.transitions.quartIn = function(a, c, b, f) {
        return b * (a /= f) * a * a * a + c
    };
    FX.transitions.quartOut = function(a, c, b, f) {
        return -b * ((a = a / f - 1) * a * a * a - 1) + c
    };
    FX.transitions.quartInOut = function(a, c, b, f) {
        return 1 > (a /= f / 2) ? b / 2 * a * a * a * a + c : -b / 2 * ((a -= 2) * a * a * a - 2) + c
    };
    FX.transitions.quintIn = function(a, c, b, f) {
        return b * (a /= f) * a * a * a * a + c
    };
    FX.transitions.quintOut =
        function(a, c, b, f) {
            return b * ((a = a / f - 1) * a * a * a * a + 1) + c
        };
    FX.transitions.quintInOut = function(a, c, b, f) {
        return 1 > (a /= f / 2) ? b / 2 * a * a * a * a * a + c : b / 2 * ((a -= 2) * a * a * a * a + 2) + c
    };
    FX.transitions.expoIn = function(a, c, b, f) {
        return 0 == a ? c : b * Math.pow(2, 10 * (a / f - 1)) + c - 0.0010 * b
    };
    FX.transitions.expoOut = function(a, c, b, f) {
        return a == f ? c + b : 1.001 * b * (-Math.pow(2, -10 * a / f) + 1) + c
    };
    FX.transitions.expoInOut = function(a, c, b, f) {
        return 0 == a ? c : a == f ? c + b : 1 > (a /= f / 2) ? b / 2 * Math.pow(2, 10 * (a - 1)) + c - 5.0E-4 * b : 1.0005 * (b / 2) * (-Math.pow(2, -10 * --a) + 2) + c
    };
    FX.transitions.circIn =
        function(a, b, e, f) {
            return -e * (Math.sqrt(1 - (a /= f) * a) - 1) + b
        };
    FX.transitions.circOut = function(a, b, e, f) {
        return e * Math.sqrt(1 - (a = a / f - 1) * a) + b
    };
    FX.transitions.circInOut = function(a, b, e, f) {
        return 1 > (a /= f / 2) ? -e / 2 * (Math.sqrt(1 - a * a) - 1) + b : e / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + b
    };
    FX.transitions.backIn = function(a, b, e, f, d) {
        d = d || 1.70158;
        return e * (a /= f) * a * ((d + 1) * a - d) + b
    };
    FX.transitions.backOut = function(a, b, e, f, d) {
        d = d || 1.70158;
        return e * ((a = a / f - 1) * a * ((d + 1) * a + d) + 1) + b
    };
    FX.transitions.backBoth = function(a, b, e, f, d) {
        d = d || 1.70158;
        return 1 >
            (a /= f / 2) ? e / 2 * a * a * (((d *= 1.525) + 1) * a - d) + b : e / 2 * ((a -= 2) * a * (((d *= 1.525) + 1) * a + d) + 2) + b
    };
    FX.transitions.elasticIn = function(a, b, e, f, d, g) {
        if (0 == a) return b;
        if (1 == (a /= f)) return b + e;
        g || (g = 0.3 * f);
        !d || d < Math.abs(e) ? (d = e, e = g / 4) : e = g / (2 * Math.PI) * Math.asin(e / d);
        return -(d * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * f - e) * 2 * Math.PI / g)) + b
    };
    FX.transitions.elasticOut = function(a, b, e, f, d, g) {
        if (0 == a) return b;
        if (1 == (a /= f)) return b + e;
        g || (g = 0.3 * f);
        if (!d || d < Math.abs(e)) var d = e,
            h = g / 4;
        else h = g / (2 * Math.PI) * Math.asin(e / d);
        return d * Math.pow(2, -10 * a) * Math.sin((a * f - h) * 2 * Math.PI / g) + e + b
    };
    FX.transitions.elasticBoth = function(a, b, e, f, d, g) {
        if (0 == a) return b;
        if (2 == (a /= f / 2)) return b + e;
        g || (g = f * 0.3 * 1.5);
        if (!d || d < Math.abs(e)) var d = e,
            h = g / 4;
        else h = g / (2 * Math.PI) * Math.asin(e / d);
        return 1 > a ? -0.5 * d * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * f - h) * 2 * Math.PI / g) + b : 0.5 * d * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * f - h) * 2 * Math.PI / g) + e + b
    };
    FX.transitions.backIn = function(a, b, e, f, d) {
        "undefined" == typeof d && (d = 1.70158);
        return e * (a /= f) * a * ((d + 1) * a - d) + b
    };
    FX.transitions.backOut = function(a,
        b, e, f, d) {
        "undefined" == typeof d && (d = 1.70158);
        return e * ((a = a / f - 1) * a * ((d + 1) * a + d) + 1) + b
    };
    FX.transitions.backBoth = function(a, b, e, f, d) {
        "undefined" == typeof d && (d = 1.70158);
        return 1 > (a /= f / 2) ? e / 2 * a * a * (((d *= 1.525) + 1) * a - d) + b : e / 2 * ((a -= 2) * a * (((d *= 1.525) + 1) * a + d) + 2) + b
    };
    FX.transitions.bounceIn = function(a, b, e, f) {
        return e - FX.transitions.bounceOut(f - a, 0, e, f) + b
    };
    FX.transitions.bounceOut = function(a, b, e, f) {
        return (a /= f) < 1 / 2.75 ? e * 7.5625 * a * a + b : a < 2 / 2.75 ? e * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + b : a < 2.5 / 2.75 ? e * (7.5625 * (a -= 2.25 / 2.75) * a +
            0.9375) + b : e * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + b
    };
    FX.transitions.bounceBoth = function(a, b, e, f) {
        return a < f / 2 ? 0.5 * FX.transitions.bounceIn(2 * a, 0, e, f) + b : 0.5 * FX.transitions.bounceOut(2 * a - f, 0, e, f) + 0.5 * e + b
    };
    var v = {
            "-1": "\u8be5\u89c6\u9891\u6b63\u5728\u8f6c\u7801\u4e2d... , \u8bf7\u7a0d\u5019",
            "-2": "\u8be5\u89c6\u9891\u6b63\u5728\u5ba1\u6838\u4e2d... , \u8bf7\u7a0d\u5019",
            "-3": "\u8be5\u89c6\u9891\u5df2\u88ab\u5c4f\u853d",
            "-4": "\u8be5\u89c6\u9891\u8f6c\u7801\u5931\u8d25",
            "-9": "\u65e0\u6548\u89c6\u9891",
            "-5": "\u8be5\u89c6\u9891\u88ab\u8bbe\u4e3a\u79c1\u5bc6",
            "-6": "\u8be5\u89c6\u9891\u5df2\u7ecf\u52a0\u5bc6",
            "-7": "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u8f93\u5165\u7684\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",
            "-8": "Sorry,this video can only be streamed within Mainland China.",
            "-15": "\u5f88\u62b1\u6b49! \u8be5\u89c6\u9891\u7684\u683c\u5f0f\u6682\u65f6\u4e0d\u652f\u6301\u5728ipad\u5e73\u53f0\u4e0a\u64ad\u653e",
            "-25": "\u60a8\u7684\u8d26\u53f7\u89c2\u770b\u8fc7\u4e8e\u9891\u7e41\uff0c\u8d85\u8fc7IP\u4e0a\u9650,\u5982\u8d26\u53f7\u88ab\u76d7\uff0c\u8bf7\u53ca\u65f6\u8054\u7cfb\u5ba2\u670d",
            "-26": "\u60a8\u6240\u5728\u7684\u56fd\u5bb6/\u5730\u533a\u65e0\u6cd5\u89c2\u770b\u6b64\u89c6\u9891\uff01"
        },
        K = function(a, c) {
            this.player = a;
            this._handle = {};
            this._feedback = b.get(".x-feedback");
            this._message = this._feedback.getElementsByClassName("x-message")[0];
            this._messagetxt = this._message.getElementsByClassName("x-message-txt")[0];
            this._messagebtn = this._message.getElementsByClassName("x-message-btn")[0];
            this._errorcode = this._error = null;
            this.init(c);
            this.bindEvent()
        };
    K.prototype = {
        init: function(a) {
            if (a &&
                a.data && a.data[0] && (a.data[0].error_code || a.data[0].error)) {
                b.hide(b.get(".x-video-button"));
                b.hide(b.get(".x-console"));
                this._vid = a.data[0].videoid;
                this._title = a.data[0].title;
                this._userid = a.data[0].userid;
                this._error = a.data[0].error;
                this._errorcode = parseInt(a.data[0].error_code);
                switch (this._errorcode) {
                    case -1:
                        this.setMessage(v["-1"]);
                        break;
                    case -2:
                        this.setMessage(v["-2"]);
                        break;
                    case -3:
                        this.setMessage(v["-3"]);
                        this.setButton("\u641c\u7d22", this.search);
                        break;
                    case -4:
                        this.setMessage(v["-4"]);
                        this.bind_feedback =
                            b.bindAsEventListener(this, this.feedback);
                        this.setButton("\u5728\u7ebf\u53cd\u9988", this.bind_feedback);
                        break;
                    case -9:
                        this.setMessage(v["-9"]);
                        break;
                    case -5:
                        this.setMessage(v["-5"]);
                        this.bind_contact = b.bindAsEventListener(this, this.contactOwner);
                        this.setButton("\u8054\u7cfb\u4e0a\u4f20\u8005", this.bind_contact);
                        break;
                    case -6:
                        this._messagetxt.innerHTML = "<input type=password placeholder=\u8f93\u5165\u5bc6\u7801\u89c2\u770b\u89c6\u9891 class=x-message-input>";
                        this.bind_inputpassword = b.bindAsEventListener(this,
                            this.inputPassword);
                        this.setButton("\u786e\u5b9a", this.bind_inputpassword);
                        break;
                    case -7:
                        this._messagetxt.innerHTML = '<input type=password placeholder="\u5bf9\u4e0d\u8d77,\u60a8\u8f93\u5165\u7684\u5bc6\u7801\u9519\u8bef,\u8bf7\u91cd\u65b0\u8f93\u5165" class=x-message-input>';
                        this.bind_inputpassword = b.bindAsEventListener(this, this.inputPassword);
                        this.setButton("\u786e\u5b9a", this.bind_inputpassword);
                        break;
                    case -8:
                        this.setMessage(v["-8"]);
                        break;
                    case -15:
                        this.setMessage(v["-15"]);
                        break;
                    case -25:
                        this.setMessage(v["-25"]);
                        break;
                    case -26:
                        this.setMessage(v["-26"]);
                        break;
                    default:
                        this.setMessage(a.data[0].error)
                }
                this.show();
                this.showMessage()
            }
        },
        bindEvent: function() {},
        show: function() {
            b.show(this._feedback)
        },
        hide: function() {
            b.hide(this._feedback)
        },
        showMessage: function() {
            b.show(this._message)
        },
        hideMessage: function() {
            b.hide(this._message)
        },
        setMessage: function(a) {
            this._messagetxt.innerHTML = "<p>" + a + "</p>"
        },
        setButton: function(a, c) {
            this._messagebtn.innerHTML = "<button type=button class=x-btn>" + a + "</button>";
            var e = this._message.getElementsByClassName("x-btn")[0];
            b.addEventHandler(e, "click", c)
        },
        search: function() {
            window.location.href = "http://www.soku.com/search_video/q_" + this._title
        },
        feedback: function() {
            window.location.href = "http://www.youku.com/service/feed/subtype/4/"
        },
        contactOwner: function() {
            window.location.href = "http://i.youku.com/u/id_" + this._userid
        },
        onPasswordConfirm: function() {},
        inputPassword: function() {
            var a = this._messagetxt.getElementsByClassName("x-message-input")[0],
                c = a.value;
            if (null == c || 0 == c.replace(/\s/g, "").length) a.value = "", a.placeholder = "\u5bc6\u7801\u4e3a\u7a7a\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165";
            else {
                var e = this.player;
                b.password = c;
                k.start(this._vid, c, b.config.content, function(a, d) {
                    b.hide(b.get(".x-feedback"));
                    b.password = c;
                    b.show(b.get(".x-video-button"));
                    b.hide(b.get(".x-message"));
                    e.startPlay(a, d)
                })
            }
        }
    };
    var X = function(a) {
        this._handler = {};
        this.player = a;
        this._fullflag = null;
        this.init();
        this._fullscreen = b.get(".x-fullscreen");
        this._btn = this._fullscreen.getElementsByTagName("button")[0];
        this._btnb = this._btn.getElementsByTagName("b")[0];
        this.bindEvent()
    };
    X.prototype = {
        addEventListener: function(a,
            b) {
            this._handler[a] = b
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        init: function() {},
        bindEvent: function() {
            this.bind_switch = b.bindAsEventListener(this, this.switchFullScreen);
            b.addEventHandler(this._fullscreen, "click", this.bind_switch, !0)
        },
        removeEvent: function() {
            b.removeEventHandler(this._fullscreen, "click", this.bind_switch, !0)
        },
        zoomStatus: function() {
            return this._btnb.className
        },
        fullFlag: function() {
            if (null !==
                this._fullflag) return this._fullflag;
            var a = this.player.video.webkitDisplayingFullscreen;
            return this._fullflag = "undefined" != typeof a ? a : !1
        },
        switchFullScreen: function(a) {
            var c = a.method || "c",
                e = this._btnb.className;
            b.config.events && b.config.events.onSwitchFullScreen ? (-1 === e.indexOf("in") ? (this._fullflag = !1, this._btnb.className = e.replace(/out/g, "in"), this.player.controls.hideShowListBtn(), this.player._reporter.sendUserActionReport("xexfs", c), this.player.adjustVideoRatio(1), this.dispatch({
                    type: "exitfullscreen"
                })) :
                (this._fullflag = !0, this._btnb.className = e.replace(/in/g, "out"), this.player.controls.showShowListBtn(), this.player._reporter.sendUserActionReport("xenfs", c), this.player.adjustVideoRatio(), this.dispatch({
                    type: "enterfullscreen"
                })), c = b.config.events.onSwitchFullScreen, c(a, e)) : (a = document.getElementById("x-player"), -1 === e.indexOf("in") ? (this.player._reporter.sendUserActionReport("xexfs", c), document.webkitCancelFullScreen && (this._btnb.className = e.replace(/out/g, "in"), this._fullflag = !1, document.webkitCancelFullScreen())) :
                (this.player._reporter.sendUserActionReport("xenfs", c), a.webkitRequestFullScreen ? (this._btnb.className = e.replace(/in/g, "out"), this._fullflag = !0, a.webkitRequestFullScreen()) : this.player.video.webkitSupportsFullscreen && 1 <= this.player.video.readyState && this.player.video.webkitEnterFullscreen()))
        }
    };
    var Y = function(a, c) {
        this.handler = {};
        this.player = a;
        this.information = b.get(".x-video-info");
        this.title = this.information.getElementsByClassName("x-title")[0];
        this.videoState = this.information.getElementsByClassName("x-video-state")[0];
        b.hide(this.videoState);
        this.init(c)
    };
    Y.prototype = {
        init: function(a) {
            !a.data[0].trial && (!a.data[0].error_code && !a.data[0].error) && (this.title.innerHTML = a.data[0].title.substr(0, 20), this.videoState.innerHTML = "<span>\u65f6\u957f: " + b.getTime(parseInt(a.data[0].seconds)) + "</span>", this.show())
        },
        show: function() {
            b.v.data[0].trial || b.show(this.information)
        },
        hide: function() {
            b.hide(this.information)
        },
        bindEvent: function() {}
    };
    var Z = function(a) {
        this.player = a;
        this._tip = b.get(".x-prompt");
        this.init()
    };
    Z.prototype = {
        init: function() {
            this._tip.innerHTML = '<div class=x-prompt-mode><div class=x-prompt-time></div><div class=x-prompt-forward>\u5feb\u8fdb</div><div class=x-prompt-back>\u5feb\u9000</div><div class=x-mask></div></div><div class=x-prompt-status style="display:none"><div class=x-prompt-txt></div><div class=x-mask></div></div>';
            this._mode = this._tip.getElementsByClassName("x-prompt-mode")[0];
            this._time = this._tip.getElementsByClassName("x-prompt-time")[0];
            this._back = this._tip.getElementsByClassName("x-prompt-back")[0];
            this._forward = this._tip.getElementsByClassName("x-prompt-forward")[0];
            this._status = this._tip.getElementsByClassName("x-prompt-status")[0];
            this._statusTxt = this._tip.getElementsByClassName("x-prompt-txt")[0]
        },
        setProgress_: function(a) {
            !0 != this._progressFlag && (this._time.innerHTML = b.getTime(parseInt(a)))
        },
        setStatus: function(a) {
            this._statusTxt.innerHTML = a;
            this.showStatus()
        },
        hideStatus: function() {
            b.hide(this._status);
            b.hide(this._tip)
        },
        showStatus: function() {
            b.hide(this._mode);
            b.show(this._status);
            b.show(this._tip)
        },
        setTip: function(a, c) {
            this._progressFlag = !0;
            this._time.innerHTML = b.getTime(ra(a + c));
            0 >= c ? (b.show(this._back), b.hide(this._forward)) : (b.show(this._forward), b.hide(this._back));
            var e = this;
            setTimeout(function() {
                e._progressFlag = false
            }, 1E3)
        },
        isVisible: function() {
            return "none" != this._tip.style.display
        },
        hide: function() {
            b.hide(this._tip)
        },
        show: function() {
            b.show(this._mode);
            b.hide(this._status);
            b.show(this._tip)
        },
        autoHide: function(a) {
            var b = this;
            setTimeout(function() {
                b.hide()
            }, a || 1E3)
        }
    };
    var $ = function(a, c) {
        this._handler = {};
        b.isWeixin ? b.get(".x-localization").style.display = "none" : !c || !c.data || !c.data[0] || !c.data[0].dvd || !c.data[0].dvd.audiolang ? b.get(".x-localization").style.display = "none" : (this.player = a, this._language = b.get(".x-localization"), this.init(c), this.bindEvent(), this._button = this._language.getElementsByTagName("button")[0], this._panel = this._language.getElementsByTagName("div")[0], this._nodes = this._language.getElementsByTagName("li"))
    };
    $.prototype = {
        addEventListener: function(a, b) {
            this._handler[a] = b
        },
        removeEventListener: function(a) {
            this._handler[a] =
                null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        init: function(a) {
            for (var a = a.data[0], b = a.dvd.audiolang, e = ["<button class=x-control-btn>", "", "</button>"], f = ["<div class=x-panel><ul>", "", "</ul><div class=x-mask></div>", "</div>"], d = [], g = 0; g < b.length; g++) {
                var h = "",
                    h = h + ("<li data-vid=" + b[g].vid),
                    h = h + (" data-language=" + b[g].lang);
                b[g].vid == a.vidEncoded ? (e[1] = b[g].lang, h += " class=selected>") : h += ">";
                h += b[g].lang + "</li>";
                d[b[g].langid] = h
            }
            f[1] = d.join("");
            this._language.innerHTML =
                e.join("") + f.join("")
        },
        bindEvent: function() {
            var a = this._language.getElementsByTagName("li");
            if (0 != a.length) {
                this.bind_toggle = b.bindAsEventListener(this, this.toggleLanguagePanel);
                b.addEventHandler(this._language, "click", this.bind_toggle);
                for (var c = 0; c < a.length; c++) b.addEventHandler(a[c], "click", b.bindAsEventListener(this, this.switchLanguage))
            }
        },
        removeEvent: function() {
            null != this._language && b.removeEventHandler(this._language, "click", this.bind_toggle)
        },
        hide: function(a) {
            if (this._language) {
                var b = this._panel;
                this._language.className = this._language.className.replace(/[\s]*pressed/g, "");
                b.style.display = "none";
                a || this.dispatch({
                    type: "settinghide"
                })
            }
        },
        toggleLanguagePanel: function(a) {
            var b = this._panel; - 1 === this._language.className.indexOf("pressed") ? (this._language.className += " pressed", b.style.display = "block", this.dispatch({
                type: "settingshow"
            }), this.player._reporter.sendUserActionReport("xcl", "c")) : (this.hide(), this.player._reporter.sendUserActionReport("xhl", "c"));
            this.dispatch(a)
        },
        switchLanguage: function(a) {
            this.player._reporter.sendUserActionReport("xsl",
                "c");
            a.stopPropagation();
            var a = a.target,
                c = null,
                e = null;
            a.getAttribute ? (c = a.getAttribute("data-vid"), e = a.getAttribute("data-language")) : (c = a.parentNode.getAttribute("data-vid"), e = a.parentNode.getAttribute("data-language"));
            b.defaultLanguage = e;
            a = this._nodes;
            for (e = 0; e < a.length; e++)
                if (a[e].getAttribute("data-vid") == c) {
                    if (-1 !== a[e].className.indexOf("selected")) {
                        this.toggleLanguagePanel();
                        return
                    }
                    a[e].innerHTML = a[e].getAttribute("data-language");
                    a[e].className += " selected";
                    this._button.innerHTML = a[e].getAttribute("data-language")
                } else a[e].innerHTML =
                    a[e].getAttribute("data-language"), a[e].className = a[e].className.replace(/[\s]*selected/g, "");
            this.toggleLanguagePanel();
            this.dispatch({
                type: "settingdone"
            });
            var f = this.player,
                d = this.player.currentTime;
            if ("mp4" == b.config.content) d = this.player.currentTime, k.start(c, "", b.config.content, function(a, e) {
                console.log("switchLanguage vid = " + c);
                if (a.data && a.data[0]) {
                    if (a.data[0].dvd == null) {
                        a.data[0].dvd = b.v.data[0].dvd;
                        console.log("switchLanuage keep dvd info audiolang")
                    }
                    b.config.nextAutoPlay = 1;
                    if (e._videoSegsDic !=
                        null && e._videoSegsDic[m] != null) {
                        f.video.src = e._videoSegsDic[m][0].src;
                        f.video.load();
                        f.video.play()
                    }
                    var g = 0;
                    f.video.addEventListener("canplay", function() {
                        if (g !== 1) {
                            g = 1;
                            f.seek(d)
                        }
                    })
                }
            });
            else {
                this.player.video.src = b.m3u8src_v2(c, b.defaultVideoType);
                this.player.video.autoplay = !0;
                b.unitedTag = null;
                var g = this,
                    h = 0;
                this.player.video.addEventListener("canplay", function() {
                    if (h !== 1) {
                        h = 1;
                        g.player.seek(d)
                    }
                });
                this.player.video.load();
                this.player.video.play()
            }
        }
    };
    var l = {
            setItem: function(a, b) {
                try {
                    window.localStorage.setItem(a,
                        b)
                } catch (e) {}
            },
            appendItem: function(a, b) {
                "phase" == a && !this.phaseTag && (this.phaseTag = !0, l.removeItem("phase"));
                try {
                    var e = l.getItem(a);
                    null !== e && (b = e + "-" + b);
                    window.localStorage.setItem(a, b)
                } catch (f) {}
            },
            getItem: function(a) {
                try {
                    return window.localStorage.getItem(a)
                } catch (b) {
                    return null
                }
            },
            removeItem: function(a) {
                try {
                    window.localStorage.removeItem(a)
                } catch (b) {}
            }
        },
        aa = function(a) {
            this.player = a;
            this._progress = b.get(".x-progress-mini");
            this._track = this._progress.getElementsByClassName("x-progress-track-mini")[0];
            this._play = this._progress.getElementsByClassName("x-progress-play-mini")[0];
            this._load = this._progress.getElementsByClassName("x-progress-load-mini")[0];
            this._handler = {};
            this.bindEvent();
            this.resetProgress();
            this.hide()
        };
    aa.prototype = {
        addEventListener: function(a, b) {
            this._handler[a] = b
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        bindEvent: function() {},
        removeEvent: function() {},
        dispatch: function(a) {
            if (a && this._handler[a.type]) this._handler[a.type]()
        },
        setProgress: function(a, c) {
            var e = Math.min(a,
                b.videoInfo.totalTime);
            this.playTime = e;
            var f = e / b.videoInfo.totalTime;
            this._play.style.width = 100 * f + "%";
            !0 !== c && (this.loadTime = e += Math.max(this.player.bufferedEnd() - a, 0), f = e / b.videoInfo.totalTime + 0.05, this._load.style.width = 100 * Math.min(Math.max(f, 0), 1) + "%")
        },
        resetProgress: function() {
            this._play.style.width = "0%";
            this._load.style.width = "0%"
        },
        show: function() {
            this._progress.style.display = "block"
        },
        hide: function() {
            this._progress.style.display = "none"
        }
    };
    var ba = function(a, c) {
        this._handler = {};
        this._hasPayInfo = !1;
        this._payInfo = b.get(".x-pay");
        this._text = b.get(".x-pay-txt");
        this._title = this._text.getElementsByTagName("h1")[0];
        this._vip = this._text.getElementsByTagName("em")[0];
        this._tip = b.get(".x-pay-tips");
        this._button = b.get(".x-pay-btn");
        this._tryBtn = b.get("#x-try");
        this._payBtn = b.get("#x-pay");
        this.player = a;
        this.init(c)
    };
    ba.prototype = {
        addEventListener: function(a, b) {
            this._handler[a] = b
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this,
                this._handler[a.type](a))
        },
        bindEvent: function() {
            this.bind_try = b.bindAsEventListener(this, this.play);
            this.bind_pay = b.bindAsEventListener(this, this.pay);
            b.addEventHandler(this._tryBtn, "click", this.bind_try);
            b.addEventHandler(this._payBtn, "click", this.bind_pay)
        },
        removeEvent: function() {
            b.removeEventHandler(this._tryBtn, "click", this.bind_try);
            b.removeEventHandler(this._payBtn, "click", this.bind_pay)
        },
        init: function(a) {
            if (null == a.data[0].trial) debug.log("not pay");
            else {
                this._hasPayInfo = !0;
                this._showid = a.data[0].show.showid;
                this._type = a.data[0].show.paid_type;
                var b = a.data[0].title;
                12 < b.length && (b = b.substr(0, 12) + "...");
                this._tryDuration = parseInt(a.data[0].trial.time);
                this.player.tryDuration = this._tryDuration;
                debug.log("try = " + this._tryDuration);
                "vod" == this._type ? (this._title.innerHTML = b + "<em class=x-vip>\u4ed8\u8d39\u5f71\u7247</em>", this._payBtn.innerHTML = "\u7acb\u5373\u8d2d\u4e70") : (this._title.innerHTML = b + "<em class=x-vip>\u4ed8\u8d39\u5305\u6708\u5f71\u7247</em>", this._payBtn.innerHTML = "\u5f00\u901a\u4f1a\u5458");
                this.bindEvent();
                this.show();
                this.player._reporter.sendPayReport()
            }
        },
        play: function() {
            if ((d.isIPHONE || d.isIPOD) && null != b.v.data[0].trial) this.player.video.style.display = "block";
            0 === this.activeTime ? this.player.seek(0) : this.player.video.play();
            this.player._reporter.sendUserActionReport("xtry", "c")
        },
        pay: function() {
            this.player.video.pause();
            b.v.payInfo && b.v.payInfo.h5_caseurl && window.open(b.v.payInfo.h5_caseurl, "", "", !1);
            this.player._reporter.sendUserActionReport("xbuy", "c")
        },
        hide: function() {
            this._payInfo &&
                (this._payInfo.style.display = "none")
        },
        show: function() {
            !1 != this._hasPayInfo && (this._payInfo.style.display = "block", 0 >= this._tryDuration && b.hide(this._tryBtn))
        },
        isBlock: function() {
            return "block" == this._payInfo.style.display
        },
        showTip: function() {
            this._hasPayInfo && (this._tip.innerHTML = "\u514d\u8d39\u8bd5\u770b\u5df2\u7ecf\u7ed3\u675f\uff0c\u4ed8\u8d39\u5373\u53ef\u89c2\u770b", this.show())
        },
        clearTip: function() {
            this._tip.innerHTML = ""
        },
        hasPayInfo: function() {
            return this._hasPayInfo
        },
        tryDuration: function() {
            return this._tryDuration
        }
    };
    var ca = function(a, b) {
        this._handler = {};
        this.player = a;
        this._videoInfo = b;
        this._app_disable = !1;
        this._limitTime = 2400;
        !0 == this._videoInfo.controller.app_disable && (this._app_disable = !0);
        this._isLimit = !1;
        !0 == this._videoInfo.controller.xplayer_disable && (this._isLimit = !0, this.player.tryDuration = this._limitTime);
        this._isCreated = !1;
        debug.log("videoInfo.controller.xplayer_disable:", this._isLimit);
        debug.log("videoInfo.controller.app_disable:", this._app_disable)
    };
    ca.prototype = {
        addEventListener: function(a, b) {
            this._handler[a] =
                b
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        create: function() {
            if (!this._isCreated) {
                debug.log("playLimit create");
                this.player.video.pause();
                this._isCreated = !0;
                var a = b.get("#x-player"),
                    c = this._videoInfo.controller.mobile_disabled,
                    e = this._videoInfo.controller.pad_disabled,
                    f = this._videoInfo.controller.pc_disabled,
                    c = !1 == this._app_disable && (!0 == c || !0 == e) && !1 == f;
                !0 == this._app_disable || c ? (a.innerHTML = "<div class=x-app-guide><div class=x-app-guide-tips><p>\u672c\u9875\u9762\u63d0\u4f9b40\u5206\u949f\u9884\u89c8\uff0c</p><p>\u8bf7\u4f7f\u7528\u7535\u8111\u89c2\u770b\u5b8c\u6574\u7248\uff01</p></div></div>",
                    this._content = b.get(".x-app-guide"), d.Log("http://hz.youku.com/red/click.php?tp=1&cp=4009227&cpp=1000752&url=")) : (a.innerHTML = '<div class=x-app-guide><div class=x-app-guide-tips><p>\u672c\u9875\u9762\u63d0\u4f9b40\u5206\u949f\u9884\u89c8</p></div><div class=x-app-guide-action><button type=button class="x-btn x-btn-major">&nbsp;&nbsp;&nbsp;\u70b9\u8fd9\u91cc\u89c2\u770b\u5b8c\u6574\u7248&nbsp;&nbsp;&nbsp;</button></div><div class=x-app-openapp></div></div>', this._content = b.get(".x-app-guide"), this._fullBtn =
                    this._content.getElementsByClassName("x-btn")[0], this._openApp = this._content.getElementsByClassName("x-app-openapp")[0], this.bind_onFullClick = b.bindAsEventListener(this, this.onFullClick), b.addEventHandler(this._fullBtn, "click", this.bind_onFullClick), d.Log("http://hz.youku.com/red/click.php?tp=1&cp=4009212&cpp=1000752&url="));
                this._content.style.marginLeft = parseInt(-this._content.offsetWidth / 2) + "px";
                this._content.style.marginTop = parseInt(-this._content.offsetHeight / 2) + "px"
            }
        },
        onFullClick: function() {
            debug.log("onFullClick");
            this._content.getElementsByClassName("x-app-guide-action")[0].innerHTML = '<button type=button class="x-btn x-btn-major">&nbsp;\u4e0b\u8f7d\u5b89\u88c5&nbsp;</button><button type=button class="x-btn">&nbsp;\u6211\u77e5\u9053\u4e86&nbsp;</button>';
            this._downloadBtn = this._content.getElementsByClassName("x-btn")[0];
            this._knowBtn = this._content.getElementsByClassName("x-btn")[1];
            this.bind_onDownload = b.bindAsEventListener(this, this.onDownloadClick);
            this.bind_onKnow = b.bindAsEventListener(this, this.onKnowClick);
            b.addEventHandler(this._downloadBtn, "click", this.bind_onDownload);
            b.addEventHandler(this._knowBtn, "click", this.bind_onKnow);
            d.Log("http://hz.youku.com/red/click.php?tp=1&cp=4009213&cpp=1000752&url=");
            this._content.getElementsByClassName("x-app-guide-tips")[0].innerHTML = "<p>\u770b\u5b8c\u6574\u7248\u9700\u5b89\u88c5\u6700\u65b0\u4f18\u9177app</p>";
            this._content.style.marginLeft = parseInt(-this._content.offsetWidth / 2) + "px";
            this._content.style.marginTop = parseInt(-this._content.offsetHeight / 2) + "px";
            this.openApp()
        },
        onDownloadClick: function() {
            d.Log("http://hz.youku.com/red/click.php?tp=1&cp=4009215&cpp=1000752&url=");
            d.isAndroid ? window.open("http://dl.m.cc.youku.com/android/phone/Youku_Android_xianbobofangqi.apk", "_blank") : window.open("http://hz.youku.com/red/click.php?tp=1&cp=4008066&cpp=1000687&url=http://m.youku.com/webapp/dl?app=youku&source=webqr", "_blank")
        },
        onKnowClick: function() {
            d.Log("http://hz.youku.com/red/click.php?tp=1&cp=4009216&cpp=1000752&url=");
            setTimeout(function() {
                    window.location.reload()
                },
                500)
        },
        openApp: function() {
            var a = document.createElement("iframe");
            a.height = 0;
            a.width = 0;
            a.frameBorder = "no";
            a.src = "youku://play?vid=" + b.initConfig.vid;
            d.isIPAD && (a.src = "youkuhd://play?vid=" + b.initConfig.vid);
            document.getElementsByTagName("body")[0].appendChild(a)
        },
        isLimit: function() {
            return this._isLimit
        },
        limitTime: function() {
            return this._limitTime
        }
    };
    var B = {
            2: "2\u500d",
            "1.5": "1.5\u500d",
            1: "\u5e38\u901f",
            "0.8": "0.8\u500d"
        },
        da = function(a, c) {
            this._handler = {};
            !b.isWeixin && d.isIPAD7 && (this.player = a, this.playRate =
                b.get(".x-playspeed"), this.init(c), this.bindEvent(), this.button = this.playRate.getElementsByTagName("button")[0], this.panel = this.playRate.getElementsByTagName("div")[0], this.nodes = this.playRate.getElementsByTagName("li"), b.show(this.playRate))
        };
    da.prototype = {
        addEventListener: function(a, b) {
            this._handler[a] = b
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        init: function() {
            for (var a = ["<button class=x-control-btn>",
                    "", "</button>"
                ], b = ['<div class=x-panel style="display:none"><ul>', "", "</ul><div class=x-mask></div>", "</div>"], e = "", f = [], d = ["2", "1.5", "1", "0.8"], g = 0; g < d.length; g++) {
                var h = d[g],
                    p = "",
                    k = "";
                "1" == h && (p = "", a[1] = B[h], k = " class=selected");
                e += "<li data-vtype=" + h + k + ">" + p + B[h] + "</li>";
                f.push(B[h])
            }
            b[1] = e;
            this.playRate.innerHTML = a.join("") + b.join("")
        },
        bindEvent: function() {
            var a = this.playRate.getElementsByTagName("li");
            if (0 != a.length) {
                this.bind_toggle = b.bindAsEventListener(this, this.toggleRatePanel);
                b.addEventHandler(this.playRate,
                    "click", this.bind_toggle);
                for (var c = 0; c < a.length; c++) b.addEventHandler(a[c], "click", b.bindAsEventListener(this, this.switchRate))
            }
        },
        removeEvent: function() {
            null != this.playRate && b.removeEventHandler(this.playRate, "click", this.bind_toggle)
        },
        hide: function(a) {
            if (this.playRate) {
                var b = this.panel;
                this.playRate.className = this.playRate.className.replace(/[\s]*pressed/g, "");
                b.style.display = "none";
                a || this.dispatch({
                    type: "settinghide"
                })
            }
        },
        toggleRatePanel: function(a) {
            var b = this.panel; - 1 === this.playRate.className.indexOf("pressed") ?
                (this.playRate.className += " pressed", b.style.display = "block", this.player._reporter.sendUserActionReport("xcra", "c"), this.dispatch({
                    type: "settingshow"
                })) : (this.hide(), this.player._reporter.sendUserActionReport("xhra", "c"));
            this.dispatch(a)
        },
        switchRate: function(a) {
            a.stopPropagation();
            var b = a.target,
                a = null,
                a = b.getAttribute ? b.getAttribute("data-vtype") : b.parentNode.getAttribute("data-vtype");
            this.player._reporter.sendUserActionReport("xsra", "c", {
                rate: a
            });
            for (var b = this.button, e = this.nodes, f = 0; f < e.length; f++)
                if (e[f].getAttribute("data-vtype") ==
                    a) {
                    if (-1 !== e[f].className.indexOf("selected")) {
                        this.toggleRatePanel();
                        return
                    }
                    e[f].innerHTML = B[a];
                    e[f].className += " selected";
                    b.innerHTML = B[a]
                } else {
                    var d = e[f].getAttribute("data-vtype");
                    e[f].innerHTML = B[d];
                    e[f].className = e[f].className.replace(/selected/, "")
                }
            this.toggleRatePanel();
            this.dispatch({
                type: "settingdone"
            });
            this.player.video.pause();
            this.player.video.playbackRate = parseFloat(a);
            this.player.video.play()
        }
    };
    var ea = function(a) {
        this.player = a;
        this._progress = b.get(".x-progress");
        this._track = this._progress.getElementsByClassName("x-progress-track")[0];
        this._play = this._progress.getElementsByClassName("x-progress-play")[0];
        this._load = this._progress.getElementsByClassName("x-progress-load")[0];
        this._seek = this._progress.getElementsByClassName("x-progress-seek")[0];
        this._seekHandle = this._seek.getElementsByClassName("x-seek-handle")[0];
        this._handler = {};
        this.bindEvent()
    };
    ea.prototype = {
        addEventListener: function(a, b) {
            this._handler[a] = b
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        bindEvent: function() {
            this.bind_seek = b.bindAsEventListener(this,
                this.seek);
            this.bind_touchstart = b.bindAsEventListener(this, this.onTouchStart);
            b.addEventHandler(this._track, "click", this.bind_seek, !0);
            b.addEventHandler(this._seek, "touchstart", this.bind_touchstart)
        },
        removeEvent: function() {
            b.removeEventHandler(this._track, "click", this.bind_seek, !0);
            b.removeEventHandler(this._seek, "touchstart", this.bind_touchstart)
        },
        removeClickEvent: function() {
            b.removeEventHandler(this._track, "click", this.bind_seek, !0)
        },
        addClickEvent: function() {
            b.addEventHandler(this._track, "click",
                this.bind_seek, !0)
        },
        dispatch: function(a) {
            if (a && this._handler[a.type]) this._handler[a.type](a)
        },
        setProgress: function(a, c) {
            var e = Math.min(Math.max(a, 0), b.videoInfo.totalTime);
            this.playTime = e;
            var f = e / b.videoInfo.totalTime,
                d = this._track.offsetWidth,
                g = this._seek.offsetWidth;
            this._play.style.width = Math.min(100 * (f + g / d / 2), 100) + "%";
            this._seek.style.left = f * d > d - g ? d - g + "px" : 100 * Math.min(Math.max(f, 0), 1) + "%";
            this.uCurrentTime.innerHTML = b.getTime(e);
            !0 !== c && (this.loadTime = e += Math.max(this.player.bufferedEnd() - a,
                0), f = e / b.videoInfo.totalTime, this._load.style.width = 100 * Math.min(Math.max(f + 0.05, 0), 1) + "%")
        },
        resetProgress: function() {
            this._seek.style.left = this._seek.style.width;
            this._load.style.width = "0";
            this._play.style.width = "0"
        },
        getRate: function(a, c) {
            var e = 1,
                f = b.get(".x-fs-console");
            f && (e = parseFloat(b.getCurrentStyle(f).zoom));
            return a / (c * e)
        },
        seek: function(a) {
            var c = (new Date).getTime() - fa;
            if (a.srcElement == this._seek || c < ga) return debug.log(c + "," + ga), !1;
            this.player._reporter.sendUserActionReport("xcs", "c");
            c =
                a.offsetX || a.changedTouches[0].clientX - this._track.clientX;
            debug.log("x = " + c);
            var c = this.getRate(c, this._track.offsetWidth),
                e = c * b.videoInfo.totalTime;
            debug.log("progress bar time = " + e + "rate = " + c + "total = " + b.videoInfo.totalTime);
            this.setProgress(e, !0);
            this.dispatch({
                type: "progressend"
            });
            this.player.seek(e);
            this.dispatch(a)
        },
        handleX: function() {
            return 0
        },
        onTouchStart: function(a) {
            if (1 != a.targetTouches.length || this.isTouching) return !1;
            this.startX = a.targetTouches[0].clientX;
            a.preventDefault();
            this.isTouching = !0;
            this.startTime = this._currentTime = this.player.currentTime || 0;
            "m3u8" == b.config.content && (this._prepaused = this.player.video.paused, this.player.video.pause(), this.startTime = this.player.currentTime);
            if ("mp4" == b.config.content) {
                this.player.video.pause();
                this.startTime = this.player.video.currentTime;
                for (a = 0; a < s; a++) this.startTime += parseInt(b.videoInfo._videoSegsDic[m][a].seconds)
            }
            this.bind_onTouchMove = b.bindAsEventListener(this, this.onTouchMove);
            this.bind_onTouchEnd = b.bindAsEventListener(this, this.onTouchEnd);
            b.addEventHandler(this._seek, "touchmove", this.bind_onTouchMove);
            b.addEventHandler(this._seek, "touchend", this.bind_onTouchEnd)
        },
        onTouchMove: function(a) {
            if (1 != a.targetTouches.length) return !1;
            a.preventDefault();
            a.stopPropagation();
            a = this.startTime + this.getRate(a.targetTouches[0].clientX - this.startX, this._track.offsetWidth) * b.videoInfo.totalTime;
            this.dispatch({
                type: "progressing",
                st: this._currentTime,
                dt: a - this._currentTime
            });
            this._currentTime = a;
            this.setProgress(Math.min(Math.max(this._currentTime, 0), b.videoInfo.totalTime), !0);
            return !1
        },
        onTouchEnd: function(a) {
            this.dispatch({
                type: "progressend"
            });
            this.isTouching = !1;
            if (1 < a.changedTouches.length) return !1;
            var c = {
                tb: parseInt(100 * this.startTime) / 100,
                to: parseInt(100 * this._currentTime) / 100
            };
            debug.log("tb=" + c.tb);
            this.player._reporter.sendUserActionReport("xds", "d", c);
            a.preventDefault();
            a.stopPropagation();
            b.removeEventHandler(this._seek, "touchmove", this.bind_onTouchMove);
            b.removeEventHandler(this._seek, "touchend", this.bind_onTouchEnd);
            a = Math.min(Math.max(this._currentTime, 0),
                b.videoInfo.totalTime - 5);
            this.player.controls.onPlay();
            var e = this.player;
            this.player.seek(a, function() {
                e.video.play()
            });
            return !1
        }
    };
    var ha = function(a, c) {
        this._handler = {};
        b.isWeixin && (b.get(".x-quality").style.display = "none");
        "m3u8" != b.config.content ? b.get(".x-quality").style.display = "none" : !c || !c.data || !c.data[0] || !(c.data[0].streamtypes && 1 < c.data[0].streamtypes.length) ? b.get(".x-quality").style.display = "none" : (this.player = a, this._quality = b.get(".x-quality"), this.init(c), this.bindEvent(), this._button =
            this._quality.getElementsByTagName("button")[0], this._panel = this._quality.getElementsByTagName("div")[0], this._nodes = this._quality.getElementsByTagName("li"))
    };
    ha.prototype = {
        addEventListener: function(a, b) {
            this._handler[a] = b
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        init: function(a) {
            var a = a.data[0],
                c = ["<button class=x-control-btn title=\u753b\u8d28\u8bbe\u7f6e>", "", "</button>"],
                e = ['<div class=x-panel style="display:none"><ul>',
                    "", "</ul><div class=x-mask></div>", "</div>"
                ],
                f = "",
                d = [],
                g;
            for (g in u)
                if (-1 !== a.streamtypes.indexOf(g) && -1 === d.indexOf(u[g])) {
                    var h = "",
                        k = "";
                    g == b.defaultVideoType && (h = "", c[1] = u[g], k = " class=selected");
                    f += "<li data-vtype=" + g + k + ">" + h + u[g] + "</li>";
                    d.push(u[g])
                }
                "" == c[1] && (c[1] = d[0]);
            e[1] = f;
            this._quality.innerHTML = c.join("") + e.join("")
        },
        bindEvent: function() {
            var a = this._quality.getElementsByTagName("li");
            if (0 != a.length) {
                this.bind_toggle = b.bindAsEventListener(this, this.toggleQualityPanel);
                b.addEventHandler(this._quality,
                    "click", this.bind_toggle);
                for (var c = 0; c < a.length; c++) b.addEventHandler(a[c], "click", b.bindAsEventListener(this, this.switchQuality))
            }
        },
        removeEvent: function() {
            null != this._quality && b.removeEventHandler(this._quality, "click", this.bind_toggle)
        },
        hide: function(a) {
            if (this._quality) {
                var b = this._panel;
                this._quality.className = this._quality.className.replace(/[\s]*pressed/g, "");
                b.style.display = "none";
                a || this.dispatch({
                    type: "settinghide"
                })
            }
        },
        toggleQualityPanel: function(a) {
            var b = this._panel; - 1 === this._quality.className.indexOf("pressed") ?
                (this._quality.className += " pressed", b.style.display = "block", this.player._reporter.sendUserActionReport("xcq", "c"), this.dispatch({
                    type: "settingshow"
                })) : (this.hide(), this.player._reporter.sendUserActionReport("xhq", "c"));
            this.dispatch(a)
        },
        switchQuality: function(a) {
            this.player._reporter.sendUserActionReport("xsq", "c");
            a.stopPropagation();
            for (var c = a.target, a = null, a = c.getAttribute ? c.getAttribute("data-vtype") : c.parentNode.getAttribute("data-vtype"), c = this._button, e = this._nodes, f = 0; f < e.length; f++)
                if (e[f].getAttribute("data-vtype") ==
                    a) {
                    if (-1 !== e[f].className.indexOf("selected")) {
                        this.toggleQualityPanel();
                        return
                    }
                    e[f].innerHTML = u[a];
                    e[f].className += " selected";
                    c.innerHTML = u[a];
                    l.setItem("defaultVideoType", a);
                    b.defaultVideoType = a
                } else {
                    var d = e[f].getAttribute("data-vtype");
                    e[f].innerHTML = u[d];
                    e[f].className = e[f].className.replace(/selected/, "")
                }
            debug.log("q1");
            this.toggleQualityPanel();
            this.dispatch({
                type: "settingdone"
            });
            var g = this.player.currentTime,
                h = b.m3u8src_v2(b.v.data[0].videoid, a);
            b.unitedTag = null;
            this.player.video.src = h;
            var k = this,
                m = 0;
            this.player.video.addEventListener("canplay", function() {
                1 === m ? debug.log("XXXXXXXXXXXXXXXXXXXXX") : (m = 1, debug.log("q2 nsrc=" + h), k.player.seek(g), debug.log("q3"))
            });
            this.player.video.load();
            this.player.video.play()
        },
        switchQuality_: function(a) {
            a.stopPropagation();
            for (var a = a.target.dataset.vtype, b = this._button, e = this._nodes, f = 0; f < e.length; f++)
                if (e[f].dataset.vtype == a) {
                    if (-1 !== e[f].className.indexOf("selected")) {
                        this.toggleQualityPanel();
                        return
                    }
                    e[f].innerHTML = u[a];
                    e[f].className += " selected";
                    b.innerHTML = u[a]
                } else e[f].innerHTML = u[e[f].dataset.vtype], e[f].className = e[f].className.replace(/selected/, "");
            debug.log("q1");
            this.toggleQualityPanel();
            var d = this.player.video.currentTime,
                g = this.player.video.src.replace(/type\/(flv|flvhd|mp4|hd2)/, "type/" + a);
            this.player.video.src = g;
            var h = this,
                k = 0;
            this.player.video.addEventListener("canplay", function() {
                1 === k ? debug.log("XXXXXXXXXXXXXXXXXXXXX") : (k = 1, debug.log("q2 nsrc=" + g), h.player.seek(d), debug.log("q3"))
            })
        }
    };
    var ia = function(a, c) {
        this._handler = {};
        this.player = a;
        this._panel = document.createElement("div");
        this._panel.className = "x-recommend";
        this.init(c);
        this.request(c);
        window.relatedpanel = this;
        b.get("#x-player").appendChild(this._panel);
        this._panel.style.display = "box";
        var e = {
            e: "xendcard"
        };
        e.device = d.isAndroid ? "adr" : d.isIPAD ? "ipad" : "oth";
        d.Log(d.uniplayerUrl + r(e))
    };
    ia.prototype = {
        bindDynamicEvent: function() {
            var a = this._listinner.getElementsByClassName("x-item");
            this.bind_itemclick = b.bindAsEventListener(this, this.onItemClick);
            for (var c = 0; c < a.length; c++) b.addEventHandler(a[c],
                "click", this.bind_itemclick, !0)
        },
        onItemClick: function(a) {
            a = a.currentTarget.getAttribute("data-i");
            "x" == a ? this.replay() : this.player._reporter.sendRecommendLog(this.getReportParam(a))
        },
        init: function() {
            this._panel.innerHTML = "<div class=x-pages></div>";
            this._listinner = this._panel.getElementsByClassName("x-pages")[0]
        },
        request: function(a) {
            var c, e = {};
            e.vid = a.data[0].videoid;
            e.uid = a.data[0].userid;
            a.data[0].show && a.data[0].show.showid && (e.sid = a.data[0].show.showid);
            e.cate = a.data[0].categories;
            e.site = "1";
            e.module = "2";
            a = a.controller.playmode;
            e.pg = "1";
            e.pg = {
                normal: 1,
                show: 3,
                folder: 4
            }[a];
            "interior" == b.config.winType ? e.apptype = 12 : (e.apptype = 12, e.pg = 1);
            e.pl = 36;
            for (c in b.initConfig.playlistconfig) e[c] = b.initConfig.playlistconfig[c];
            e.callback = "relatedpanel.parseResponse";
            c = "http://ykrec.youku.com/video/packed/list.json?" + n(e);
            x(c);
            this._apt = e.apptype;
            this._pg = e.pg;
            this._md = e.module
        },
        parseResponse: function(a) {
            this._info = a;
            this.buildPanel(this._info)
        },
        buildPanel: function(a) {
            var a = a.data,
                c = a.length;
            debug.log("realted len = " +
                c);
            var e = [];
            e.push('<ul class="x-item" data-i="x"><li class="x-item-img"><img src="http://player.youku.com/h5player/img/replay.png"></li></ul>');
            for (var f = Math.floor((this._panel.offsetWidth - 60 + 16) / 166) * Math.floor((this._panel.offsetHeight - 120 + 12) / 97), f = (f > c ? c : f) - 1, f = 0 > f ? 0 : f, c = 0; c < f; c++) {
                var d = a[c].picUrl,
                    g = a[c].title.substr(0, 20),
                    h = "http://v.youku.com/v_show/id_" + a[c].codeId + ".html?from=",
                    k = "y7",
                    k = "interior" == b.config.winType ? k + ".2-1-" : k + ".7-1-",
                    k = k + b.v.data[0].categories,
                    k = k + ".4",
                    k = k + ("." + (c + 1) +
                        "-1"),
                    k = k + ("." + this._apt + "-" + this._pg + "-" + this._md + "-" + c),
                    h = h + k;
                debug.log(h);
                "myoukucom" == b.initConfig.client_id && (h = "http://m.youku.com/smartphone/detail?vid=" + a[c].codeId);
                e.push('<ul class="x-item" data-i=' + c + '><li class="x-item-img"><img src=' + d + '></li><li class="x-item-info"><div class="x-item-title">' + g + '</div><div class="x-item-bg"></div></li><li class="x-item-url"><a href=' + h + ' target="_blank"></a></li><li class="x-item-loading"><div class="x-play-loading"></div></li></ul>')
            }
            this._listinner.innerHTML =
                e.join("");
            this.bindDynamicEvent();
            this.buildImgEvent()
        },
        getReportParam: function(a) {
            var c = {};
            c.pos = "" + a;
            c.sct = b.v.data[0].categories;
            c.dct = this._info.data[a].dct;
            c.ord = this._info.ord;
            c.req_id = this._info.req_id;
            c.abver = this._info.ver;
            c.dma = this._info.data[a].dma;
            c.algInfo = this._info.data[a].algInfo;
            c.apt = this._apt;
            c.md = this._md;
            c.pg = this._pg;
            c.r = (new Date).getTime();
            c.vid = b.v.data[0].vidEncoded;
            c.uid = b.v.data[0].userid;
            1 == this._info.data[a].type ? c.dvid = this._info.data[a].id : c.dsid = this._info.data[a].id;
            c.sid = "";
            b.v.data[0].show && b.v.data[0].show.showid && (c.sid = b.v.data[0].show.showid);
            return c
        },
        buildImgEvent: function() {
            for (var a = this._listinner.getElementsByClassName("x-item-img"), c = 0; c < a.length; c++) b.addEventHandler(a[c], "error", b.bindAsEventListener(this, this.onLoadImgError)), b.addEventHandler(a[c], "abort", b.bindAsEventListener(this, this.onLoadImgError))
        },
        onLoadImgError: function(a) {
            debug.log("img error");
            a = a.target;
            b.addClass(a.parentNode.parentNode, "x-no-pic");
            a.src = "http://player.youku.com/h5player/img/no_pic.png"
        },
        replay: function(a) {
            this.player.controls.rePlay(a)
        },
        onResize: function() {
            var a = this;
            setTimeout(function() {
                a.buildPanel(a._info)
            }, 500)
        }
    };
    var ja = function(a, c) {
        this._handler = {};
        this.player = a;
        this._showbtn = b.get(".x-playshow");
        this._showlist = b.get(".x-showlist");
        this.init(c);
        this._inner = this._showlist.getElementsByClassName("x-showlist-inner");
        this._bullet = this._showlist.getElementsByClassName("x-showlist-bullet");
        this.bindEvent()
    };
    ja.prototype = {
        init: function(a) {
            this._showlist.innerHTML = '<div class=x-showlist-inner><div class=x-showlist-hd></div><div class=x-showlist-bd></div><div class=x-showlist-ft style="display:none"></div><div class=x-mask></div></div>';
            this._slhd = this._showlist.getElementsByClassName("x-showlist-hd")[0];
            this._slbd = this._showlist.getElementsByClassName("x-showlist-bd")[0];
            this._slft = this._showlist.getElementsByClassName("x-showlist-ft")[0];
            this._slhd.innerHTML = "<label>\u9009\u96c6</label><div class=x-showlist-close></div>";
            this._closeHandle = this._slhd.getElementsByClassName("x-showlist-close")[0];
            var c = a.data[0].list;
            if (!(null == c || 0 == c.length)) {
                for (var e = ["<ul class=x-showlist-bullet>", "", "</ul>"], f = [], d = 0; d < c.length; d++) {
                    var g =
                        c[d],
                        h = "http://v.youku.com/v_show/id_" + g.vidEncoded + ".html";
                    b.v.folder && (h = h + "?f=" + b.v.folder.folderId);
                    var k = "";
                    g.vidEncoded == b.v.data[0].vidEncoded && (k = " class=selected");
                    g = "<li" + k + "><a href=" + h + ">" + g.title.substr(0, 20) + "</a></li>";
                    f.push(g)
                }
                e[1] = f.join("");
                this._slbd.innerHTML = e.join("");
                e = "<div class=x-showlist-pages>;<span class=x-showlist-pre></span>;<ul>;;</ul>;<span class=x-showlist-next></span>".split(";");
                f = [];
                k = a.data[0].list_pre ? parseInt(a.data[0].list_pre.seq / 60) : 0;
                for (d = 0; d < (c.length -
                        1) / 60 + 1; d++) a = "", d == k && (a = " class=current"), g = "<li" + a + "><em>" + (d + 1) + "</em></li>", f.push(g);
                e[3] = f.join("");
                this._slft.innerHTML = e.join("")
            }
        },
        addEventListener: function(a, b) {
            this._handler[a] = b
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        bindEvent: function() {
            this.bind_close = b.bindAsEventListener(this, this.hide);
            b.addEventHandler(this._closeHandle, "click", this.bind_close);
            this.bind_toggle = b.bindAsEventListener(this,
                this.toggle);
            b.addEventHandler(this._showbtn, "click", this.bind_toggle)
        },
        removeEvent: function() {
            b.removeEventHandler(this._closeHandle, "click", this.bind_close)
        },
        hide: function() {
            this._showbtn.className = this._showbtn.className.replace(/[\s]*pressed/g, "");
            b.hide(this._showlist)
        },
        show: function() {
            this._showbtn.className += " pressed";
            b.show(this._showlist)
        },
        showListBtn: function() {
            var a = b.v.data[0].list;
            null == a || 1 >= a.length || b.show(this._showbtn)
        },
        hideListBtn: function() {
            var a = b.v.data[0].list;
            null == a || 0 ==
                a.length || (b.hide(this._showbtn), this.hide())
        },
        toggle: function(a) {
            "block" != this._showlist.style.display ? (this.show(), this.player._reporter.sendUserActionReport("xshl", "c"), d.Log(d.uniplayerUrl + r({
                e: "xshl",
                adr: d.isAndroid,
                ios: d.isIPAD
            }))) : this.hide();
            this.dispatch(a)
        },
        touchStart: function(a) {
            this._sx = a.targetTouches[0].clientX;
            this._sy = a.targetTouches[0].clientY;
            this._ex = this._sx;
            this._ey = this._ey
        },
        touchEnd: function() {},
        touchMove: function(a) {
            this._ex = a.targetTouches[0].clientX;
            this._ey = a.targetTouches[0].clientY;
            this._dx = this._ex - this._sx;
            this._dy = this._ey - this._sy;
            Math.abs(this._dx) > Math.abs(this._dy) || a.preventDefault()
        }
    };
    var ka = function(a) {
        this.player = a;
        this._handle = {};
        this._tips = b.get(".x-tips");
        b.hide(this._tips);
        this._tips.innerHTML = "<div class=x-tips-txt></div><div class=x-tips-close><a href=#><em>\u5173\u95ed</em></a></div><div class=x-tips-mask></div>";
        this._ptip = this._tips.getElementsByClassName("x-tips-txt")[0];
        this._ctip = this._tips.getElementsByClassName("x-tips-close")[0];
        null == l.getItem("youku_conf_skip") &&
            l.setItem("youku_conf_skip", !0);
        this.bindEvent()
    };
    ka.prototype = {
        bindEvent: function() {
            b.addEventHandler(this._ctip, "click", b.bindAsEventListener(this, this.closeTip))
        },
        closeTip: function() {
            b.hide(this._tips);
            this.keepLastTime()
        },
        autoHide: function(a) {
            var b = this;
            setTimeout(function() {
                b.closeTip()
            }, a)
        },
        keepLastTime: function() {},
        ignoreLastTime: function() {},
        isShowTimeTip: function() {
            var a = l.getItem("youku_keep_lasttime"),
                a = parseInt(a),
                b = l.getItem("youku_ignore_lasttime"),
                b = parseInt(b);
            return 3 <= a || 3 <= b ? !1 :
                !0
        },
        showLastTimeTip: function(a) {
            a = b.getTime(a);
            debug.log("last = " + a);
            !1 != this.isShowTimeTip() && (this._ptip.innerHTML = "\u4f18\u9177\u8bb0\u5fc6\u60a8\u4e0a\u6b21\u64ad\u653e\u5230<span class=x-tips-time>" + a + "</span>, <a class=x-tip-timebegin href=#>\u4ece\u5934\u89c2\u770b</a>", this._playBegin = this._ptip.getElementsByClassName("x-tip-timebegin")[0], b.addEventHandler(this._playBegin, "click", b.bindAsEventListener(this, this.seekBegin)), b.show(this._tips), this.autoHide(5E3))
        },
        onSkipTail: function() {
            "true" ==
            l.getItem("youku_conf_skip") ? (this._ptip.innerHTML = "\u5373\u5c06\u4e3a\u60a8\u8df3\u8fc7\u7247\u5c3e, <a class=x-tip-skipnoway href=#>\u4e0d\u518d\u8df3\u8fc7</a>", this._skipnowtail = this._ptip.getElementsByClassName("x-tip-skipnoway")[0], b.addEventHandler(this._skipnowtail, "click", b.bindAsEventListener(this, this.skipNoway))) : (this._ptip.innerHTML = "\u662f\u5426\u8df3\u8fc7\u7247\u5934\u7247\u5c3e? <a class=x-tip-skipalways href=#>\u59cb\u7ec8\u8df3\u8fc7</a>", this._skipalwtail = this._ptip.getElementsByClassName("x-tip-skipalways")[0],
                b.addEventHandler(this._skipalwtail, "click", b.bindAsEventListener(this, this.skipAlways)));
            b.show(this._tips);
            this.autoHide(1E4)
        },
        onSkipHead: function() {
            "true" == l.getItem("youku_conf_skip") ? (this._ptip.innerHTML = "\u5df2\u7ecf\u4e3a\u60a8\u8df3\u8fc7\u7247\u5934, <a class=x-tip-skipnoway href=#>\u4e0d\u518d\u8df3\u8fc7</a>", this._skipnow = this._ptip.getElementsByClassName("x-tip-skipnoway")[0], b.addEventHandler(this._skipnow, "click", b.bindAsEventListener(this, this.skipNoway))) : (this._ptip.innerHTML = "\u662f\u5426\u8df3\u8fc7\u7247\u5934\u7247\u5c3e? <a class=x-tip-skipalways href=#>\u59cb\u7ec8\u8df3\u8fc7</a>",
                this._skipalw = this._ptip.getElementsByClassName("x-tip-skipalways")[0], b.addEventHandler(this._skipalw, "click", b.bindAsEventListener(this, this.skipImediately)));
            b.show(this._tips);
            this.autoHide(5E3)
        },
        onUglyAdPlay: function() {
            this._ptip.innerHTML = "\u5c0a\u656c\u7684\u4f1a\u5458\uff0c\u56e0\u7248\u6743\u539f\u56e0\uff0c\u8bf7\u70b9\u51fb\u53f3\u4e0a\u89d2 \u5173\u95ed\u5e7f\u544a ";
            b.show(this._tips);
            var a = this;
            setTimeout(function() {
                b.hide(a._tips)
            }, 15E3)
        },
        closeUglyHint: function() {
            b.hide(this._tips)
        },
        skipImediately: function() {
            debug.log("skip imediately");
            this.player._reporter.sendUserActionReport("xskh", "c");
            l.setItem("youku_conf_skip", !0);
            var a = parseInt((b.v.data[0].dvd || "").head) / 1E3;
            this.onSkipHead();
            this.player.seek(a);
            return !1
        },
        skipNoway: function() {
            this.player._reporter.sendUserActionReport("xnsk", "c");
            l.setItem("youku_conf_skip", !1);
            this._ptip.innerHTML = "\u8bbe\u7f6e\u6210\u529f";
            return !1
        },
        skipAlways: function() {
            this.player._reporter.sendUserActionReport("xask", "c");
            l.setItem("youku_conf_skip", !0);
            this._ptip.innerHTML = "\u8bbe\u7f6e\u6210\u529f";
            return !1
        },
        seekBegin: function() {
            this.player._reporter.sendUserActionReport("xseb", "c");
            b.hide(this._tips);
            this.ignoreLastTime();
            this.player.seek(0);
            return !1
        }
    };
    var L = function(a, b, e) {
        this.player = a;
        this.v = b;
        this.sid = e;
        this.isSendedConsumeReport = !1;
        d.hd = this.getHDFlag();
        if (0 < D.length)
            for (a = 0; a < D.length; a++) this.sendUepReport(D[a].type, D[a].time);
        this.dimension = {
            w: document.getElementById("x-player").offsetWidth,
            h: document.getElementById("x-player").offsetHeight
        };
        this.screenDim = {
            w: screen.availWidth,
            h: screen.availHeight
        }
    };
    L.prototype = {
        sendRecommendLog: function(a) {
            d.Log("http://r.l.youku.com/recclick?" + n(a))
        },
        tsInit: function() {
            this.tsSn = null
        },
        sendTSLog: function(a) {
            null == this.tsSn && (this.tsSn = 0);
            var c = 5,
                c = 24 < this.tsSn ? 20 : 12 < this.tsSn ? 10 : 5,
                e = this;
            this.tstimer = setTimeout(function() {
                e.sendTSLog(60)
            }, 1E3 * c);
            if (61 == a) clearTimeout(this.tstimer), this.tstimer = null;
            else if (e.player.video.paused) return;
            if (0 == this.tsSn) this.tsSn++;
            else {
                var f = b.v.data[0];
                f.sid = b.videoInfo._sid;
                b.initConfig.tslogconfig = b.initConfig.tslogconfig || {};
                var i = {};
                i.vvid = f.sid;
                i.vid = f.videoid;
                i.cf = this.getHDFlag();
                i.cpt = this.player.currentTime ? Math.floor(this.player.currentTime) : 0;
                i.full = this.player.controls.fullscreenPanel.fullFlag() ? 1 : 0;
                i.lang = this.getLanguage();
                i.pc = 60 == a ? 0 : 1;
                i.clb = 0;
                i.iku = "m";
                i.pt = this.getPlayTime();
                i.sn = this.tsSn++;
                i.hi = c;
                i.uid = b.v.user.id;
                i.r = this.signTS(i.vvid + i.vid + i.cpt + i.pt + i.sn);
                d.Log("http://p-log.ykimg.com/tslog?" + n(i))
            }
        },
        signTS: function(a) {
            if (null == a) return 0;
            var b =
                0,
                e = a.length;
            for (j = 0; j < e; j++) b = 43 * b + a.charCodeAt(j), b %= 1E10;
            return b
        },
        getPlayTime: function() {
            var a = 0;
            return a = 24 < this.tsSn ? 180 + 20 * (this.tsSn - 24) : 12 < this.tsSn ? 60 + 10 * (this.tsSn - 12) : 5 * this.tsSn
        },
        tslogparse: function() {},
        sendTSErrorLog: function() {},
        sendVVLog: function(a) {
            var c = b.v.data[0];
            c.sid = b.videoInfo._sid;
            b.initConfig.vvlogconfig = b.initConfig.vvlogconfig || {};
            var e = {
                pvid: ""
            };
            e.chid = c.ct;
            e.url = escape(window.location.href);
            e.rurl = "";
            e.vvid = c.sid;
            e.vid = c.videoid;
            e.schid = c.cs;
            e.plid = "";
            e.plchid = "";
            e.shid =
                null != c.show && c.show.showid ? c.show.showid : "";
            e.shchid = c.ct;
            e.ptype = b.WIN_TYPE;
            e.cp = null != c.show && c.show.copyright ? c.show.copyright : "";
            e.vl = parseInt(c.seconds);
            e.cf = this.getHDFlag();
            e.hf = this.getMaxFileType();
            e.spt = 0;
            e.pb = 62 == a ? 2 : 0;
            e.vdoid = c.userid;
            e.out = "interior" == b.initConfig.wintype ? 0 : 1;
            e.r = this.signTS(e.vvid + e.vid);
            e.ext = this.getExtString(a);
            for (var f in b.initConfig.vvlogconfig) e[f] = b.initConfig.vvlogconfig[f];
            d.Log("http://v.l.youku.com/ykvvlog?" + n(e))
        },
        getLanguage: function() {
            null == this.langMap &&
                (this.langMap = {
                    "\u56fd\u8bed": 1,
                    "\u7ca4\u8bed": 2,
                    "\u82f1\u8bed": 6,
                    "\u65e5\u8bed": 7,
                    "\u5ddd\u8bdd": 3
                });
            return this.langMap[b.defaultLanguage || "\u56fd\u8bed"]
        },
        getExtString: function(a) {
            var c = {
                iku: "m"
            };
            c.full = this.player.controls.fullscreenPanel.fullFlag();
            c.lang = this.getLanguage();
            c.num = a;
            c.ctp = 0;
            c.pc = 60 == a ? 0 : 1;
            c.clb = 0;
            c.ctype = "12";
            c.ev = "1";
            c.tk = d.userCache.token;
            c.oip = b.v.data[0].ip;
            c.isvip = b.v.user.vip ? "1" : "0";
            c.paystate = this.getPayState();
            c.playstate = null == b.v.data[0].trial ? "1" : "2";
            return escape(n(c))
        },
        getPlayByType_: function(a) {
            var c = 0;
            62 == a && (c = 2);
            b.initConfig.vvlogconfig.pb && (c = b.initConfig.vvlogconfig.pb);
            return c
        },
        getMaxFileType: function() {
            return b.v.data[0].segs.hd2 ? 2 : b.v.data[0].segs.mp4 ? 1 : 0
        },
        getHDFlag: function() {
            if (null == this.player) return 0;
            var a = null,
                c = this.player.video.src; - 1 != c.indexOf("m3u8") ? (a = {
                flv: 0,
                flvhd: 0,
                mp4: 1,
                hd2: 2,
                hd3: 3
            }, c = b.defaultVideoType) : a = {
                "030020": 4,
                "030004": 0,
                "030008": 1,
                "030080": 3
            };
            for (var e in a)
                if (-1 !== c.indexOf(e)) return a[e];
            return 0
        },
        addPlayerDurationReport: function(a) {
            var c =
                b.videoInfo;
            if (!(null == c || null == c._playListData)) {
                if (null == this.drtimer) {
                    var e = this;
                    this.drtimer = setInterval(function() {
                        e.player.video.paused || e.addPlayerDurationReport(60)
                    }, 6E4)
                }
                61 == a && (clearInterval(this.drtimer), this.drtimer = null);
                var f = {};
                f.sid = c._sid;
                f.videoOwnerId = b.v.data[0].userid;
                f.viewUserId = b.v.user.id;
                f.videoid = b.v.data[0].videoid;
                f.ct = b.v.data[0].ct;
                f.cs = b.v.data[0].cs;
                f.number = a;
                f.rnd = ((new Date).getTime() - c.abstarttime) / 1E3;
                null != c._playListData.show ? (f.showid_v2 = null == c._playListData.show ?
                    "" : c._playListData.show.showid, f.showid_v3 = null == c._playListData.show ? "" : c._playListData.show.showid_encode, f.show_videotype = c._playListData.show.show_videotype, f.stg = c._playListData.show.stage, f.Tid = c._playListData.show.theaterid, f.Copyright = c._playListData.show.copyright) : (f.showid_v2 = "", f.Tid = 0, f.Copyright = "");
                f.hd = 0;
                f.ikuflag = "m";
                f.hd = {
                    flv: 0,
                    flvhd: 0,
                    mp4: 1,
                    hd2: 2,
                    hd3: 3
                }[b.defaultVideoType];
                f.winType = b.WIN_TYPE;
                f.mtype = Q();
                f.totalsec = c.totalTime;
                f.fullflag = this.player.controls.fullscreenPanel.fullFlag();
                f.playComplete = 0;
                61 == a && (f.playComplete = 1);
                59 == a && (f.referUrl = (b.initConfig.vvlogconfig || "").rurl, f.url = encodeURIComponent(window.location.href), f.starttime = 0);
                f.currentPlayTime = parseInt(this.player.currentTime || 0);
                f.continuationPlay = 0;
                f.pid = b.initConfig.client_id;
                f.timestamp = (new Date).getTime();
                f.ctype = "12";
                f.ev = "1";
                f.tk = d.userCache.token;
                f.oip = b.v.data[0].ip;
                f.isvip = b.v.user.vip ? "1" : "0";
                f.paystate = this.getPayState();
                f.playstate = null == b.v.data[0].trial ? "1" : "2";
                d.Log("http://stat.youku.com/player/addPlayerDurationReport?" +
                    n(f))
            }
        },
        addPlayerStaticReport: function() {
            var a = {};
            a.videoid = this.v.data[0].videoid;
            a.t = this.v.data[0].ts;
            a.totalsec = parseInt(this.v.data[0].seconds);
            a.ikuflag = "m_" + this.getShowFlag();
            a.url = escape(window.location.href);
            a.fullflag = this.player.controls.fullscreenPanel.fullFlag();
            a.source = "video";
            a.referer = (b.initConfig.vvlogconfig || "").rurl;
            a.sid = this.sid;
            a.uid = this.v.data[0].userid;
            for (var c = a.t, e = !1, f = ""; !e;) {
                for (var f = "", i = 0; 20 > i; i++) var g = Math.floor(61 * Math.random()),
                    f = f + "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".substring(g,
                        g + 1);
                hstr = c + f;
                hashcash = qa(hstr);
                "00" == hashcash.substring(0, 2) && (e = !0)
            }
            a.h = f;
            a.totalseg = b.pieceLength();
            a = n(a);
            d.Log("http://stat.youku.com/player/addPlayerStaticReport?" + a)
        },
        sendUserActionReport: function(a, c, e) {
            c = {
                t: 1002,
                e: a,
                v: c
            };
            c.d = E(Q());
            var f = {
                v: "h5player",
                vid: b.v.data[0].videoid,
                ssid: b.videoInfo._sid,
                ct: b.v.data[0].ct,
                cs: b.v.data[0].cs,
                uid: 0
            };
            b.v.data[0].user && (f.uid = b.v.user.id);
            f.sid = "";
            b.v.data[0].show && (f.sid = b.v.data[0].show.showid);
            f.tc = this.player.currentTime || 0;
            f.w = b.get("#x-player").offsetWidth;
            f.h = b.get("#x-player").offsetHeight;
            f.f = this.player.video.webkitDisplayingFullscreen ? "on" : "off";
            f.q = this.player.getQuality();
            f.ver = "1.0.0";
            for (var i in e) f[i] = e[i];
            c.x = E(n(f));
            i = n(c);
            if ("xre" == a) this.checkPlayerResize("http://e.stat.ykimg.com/red/ytes.php?", i);
            else {
                if ("xenfs" == a || "xexfs" == a) {
                    this._giveupReTag = !0;
                    var g = this;
                    setTimeout(function() {
                        g._giveupReTag = false
                    }, 800)
                }
                d.Log("http://p-log.ykimg.com/event?" + i)
            }
            this.sendCustomUserAction(a, e)
        },
        checkScreenRotate: function(a, b) {
            var e = screen.availWidth,
                f = screen.availHeight;
            debug.log("<hr/>rota w,h = " + e + "," + f);
            if (this.screenDim.w != e || this.screenDim.h != f) this.screenDim.w = e, this.screenDim.h = f, debug.log("<b><font color=red>rotate</font></b>"), d.Log(a + b)
        },
        checkPlayerResize: function(a, b) {
            if (!0 === this._giveupReTag) debug.log("give up xre after enfs or exfs");
            else {
                var e = document.getElementById("x-player");
                this._resizeList = this._resizeList || [];
                this._resizeList.push({
                    str: b,
                    time: (new Date).getTime(),
                    w: e.offsetWidth,
                    h: e.offsetHeight
                });
                var f = this;
                setTimeout(function() {
                    if (0 !=
                        f._resizeList.length) {
                        for (var b = f._resizeList[0].time, c = 0; c < f._resizeList.length; c++) {
                            var e = f._resizeList[c].w,
                                k = f._resizeList[c].h,
                                l = f._resizeList[c].time;
                            if (e != f.dimension.w || k != f.dimension.h) f.dimension.w = e, f.dimension.h = k, (800 < l - b || c == f._resizeList.length - 1) && d.Log(a + f._resizeList[c].str)
                        }
                        f._resizeList = []
                    }
                }, 1E3)
            }
        },
        sendCustomUserAction: function(a, b) {
            var e = {
                    e: a
                },
                f;
            for (f in b) e[f] = b[f];
            e.device = d.isAndroid ? "adr" : d.isIPAD ? "ipad" : "oth";
            switch (a) {
                case "xenfs":
                    d.Log(d.uniplayerUrl + r(e));
                    break;
                case "xexfs":
                    d.Log(d.uniplayerUrl +
                        r(e));
                    break;
                case "xsra":
                    d.Log(d.uniplayerUrl + r(e))
            }
        },
        sendCustomLoadedTime: function(a) {
            a = {
                vid: b.v.data[0].videoid,
                os: escape(d.os),
                adrd4: d.isAndroid4,
                mobile: d.isMobile,
                type: "mp4" == b.config.content ? m : b.config.content,
                cost: a,
                ver: VER.replace(/[-:]/g, "")
            };
            !1 == a.mobile && (a.ua = escape(navigator.userAgent.replace(/[\/\+\*@\(\)\,]/g, "")));
            d.Log("http://passport-log.youku.com/logsys/logstorage/append?project=xplayerloadtime&log=" + r(a))
        },
        sendUepReport: function(a, c, e) {
            !1 !== e && 10 < 100 * Math.random() || (e = "", e = d.isIPAD ?
                "xplayer_ipad" : d.isIPHONE ? "xplayer_iphone" : "xplayer_android", a = {
                    m: e,
                    hd: this.getHDFlag(),
                    t: a,
                    s: c,
                    u: escape(window.location.href),
                    p: 2,
                    v: b.videoInfo._sid,
                    ct: b.v.data[0].ct,
                    cs: b.v.data[0].cs,
                    a: b.v.controller.area_code + "|" + b.v.controller.dma_code
                }, d.Log("http://v.l.youku.com/uep?" + n(a)))
        },
        sendLoadedTime: function(a) {
            debug.log("loaded cost = " + a);
            this.sendCustomLoadedTime(a);
            this.sendUepReport("videoload", a)
        },
        sendComScoreReport: function(a) {
            if (!this._hasComScore) {
                for (var c = document.getElementsByTagName("script"),
                        e = 0; e < c.length; e++)
                    if (-1 !== c[e].src.indexOf("scorecardresearch.com/beacon.js")) {
                        this._hasComScore = !0;
                        break
                    }!0 !== this._hasComScore && (c = document.createElement("script"), e = document.getElementsByTagName("script")[0], c.async = !0, c.src = ("https:" == document.location.protocol ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js", e.parentNode.insertBefore(c, e));
                this._hasComScore = !0
            }
            var d = setInterval(function() {
                if ("undefined" != typeof COMSCORE) {
                    clearInterval(d);
                    try {
                        COMSCORE.beacon({
                            c1: 1,
                            c2: 7293931,
                            c3: a,
                            c6: b.v.data[0].categories
                        })
                    } catch (c) {
                        debug.log("beacon exception")
                    }
                }
            }, 500)
        },
        sendIResearchReport: function() {},
        sendThirdPartyReport: function(a) {
            "xplayer_h5" == a && (a = d.isAndroid ? "xplayer_h5_android" : d.isIPAD ? "xplayer_h5_ipad" : "xplayer_h5_other");
            this.sendComScoreReport(a);
            this.sendIResearchReport(a)
        },
        sendPayReport: function() {
            var a = {
                vid: b.v.data[0].videoid,
                os: escape(d.os)
            };
            d.Log("http://passport-log.youku.com/logsys/logstorage/append?project=unipay&log=" + r(a))
        },
        sendClientConsumeReport: function() {
            !0 != this.isSendedConsumeReport &&
                (null != b.config.partner_config && 1 == b.config.partner_config.status && null != b.config.partner_config.token && "" != b.config.partner_config.token) && (this.isSendedConsumeReport = !0, d.Log("https://openapi.youku.com/v2/players/consume.json?token=" + b.config.partner_config.token))
        },
        getPayState: function() {
            var a = 0;
            b.v.data[0].show && "vod" == b.v.data[0].show.paid_type && (a = 1);
            b.v.data[0].show && "mon" == b.v.data[0].show.paid_type && (a = 2);
            return a
        },
        getShowFlag: function() {
            var a = "m";
            return a = b.v.data[0].show ? a + "1" : a + "0"
        }
    };
    var la = function(a, c) {
        this._handler = {};
        this.player = a;
        this.controls = a.controls;
        this.adplugin = this.controls._pauseAdPlugin;
        this.info = c.data.info;
        this.adjustIMGWH();
        this.adpause = b.get(".x-ad-pause");
        this.info.VAL[0].VT = parseInt(this.info.VAL[0].VT);
        2 != this.info.VAL[0].VT && (this.init(), this.bindEvent(), this._adreporter = new H(this, c.data));
        this.loadVC()
    };
    la.prototype = {
        addEventListener: function(a, b) {
            this._handler[a] = b
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] &&
                (a._target = this, this._handler[a.type](a))
        },
        bindEvent: function() {
            b.addEventHandler(this.adcontent, "click", b.bindAsEventListener(this, this.adClick));
            b.addEventHandler(this.adclose, "click", b.bindAsEventListener(this, this.hide));
            var a = this;
            window.addEventListener("orientationchange", function() {
                setTimeout(function() {
                    b.isLandScape() || a.hide()
                }, 1E3)
            })
        },
        adjustIMGWH: function() {
            var a = this.info.VAL[0].W,
                c = this.info.VAL[0].H,
                e = (b.get("#x-player").offsetHeight - 110) / c;
            if (1 < e || 0 >= e) e = 1;
            this.info.VAL[0].W = a * e;
            this.info.VAL[0].H =
                c * e;
            debug.log("pause img adjusted w = " + this.info.VAL[0].W + " h = " + this.info.VAL[0].H)
        },
        init: function() {
            this.adpause.innerHTML = "<div class=x-pause-content></div><div class=x-pause-close></div>";
            this.adcontent = this.adpause.getElementsByClassName("x-pause-content")[0];
            this.adcontent.innerHTML = " <img class=x-pause-img width=" + this.info.VAL[0].W + " height=" + this.info.VAL[0].H + " src=" + this.info.VAL[0].RS + ">";
            this.adclose = this.adpause.getElementsByClassName("x-pause-close")[0];
            this.adimg = this.adcontent.getElementsByClassName("x-pause-img")[0];
            this.adimg.style.height = this.info.VAL[0].H + "px";
            this.adimg.style.width = this.info.VAL[0].W + "px";
            this.adpause.style.marginLeft = "-" + this.info.VAL[0].W / 2 + "px";
            this.adpause.style.marginTop = "-" + this.info.VAL[0].H / 2 + "px"
        },
        hide: function() {
            b.hide(this.adpause)
        },
        play: function() {
            2 != this.info.VAL[0].VT && (b.show(this.adpause), this._adreporter.sendSUS())
        },
        adClick: function() {
            window.open(this.info.VAL[0].CU, null);
            this._adreporter && this._adreporter.sendCUM()
        },
        loadVC: function() {
            (2 == this.info.VAL[0].VT || 1 == this.info.VAL[0].VT) &&
            y(this.info.VAL[0].VC, "js")
        }
    };
    var ma = function(a, b) {
        this._handler = {};
        this._adinfo = a;
        this._info = {
            VAL: []
        };
        for (var e in a) "VAL" != e && (this._info[e] = a[e]);
        this._vt2nodes = b || []
    };
    ma.prototype = {
        addEventListener: function(a, b) {
            this._handler[a] = b
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        buildAdRS: function() {
            for (var a = "http://pl.youku.com/playlist/m3u8?", c = {}, e = {}, f = this._adinfo.VAL, i = 0; i < f.length; i++) {
                var g =
                    f[i];
                e["a" + (i + 1)] = g.VID + "_" + g.VQT
            }
            e.v = b.v.data[0].videoid + "_" + b.defaultVideoType;
            var i = escape,
                g = [],
                h;
            for (h in e) g.push('"' + h + '":"' + e[h] + '"');
            e = "{" + g.join(",") + "}";
            c.ids = i(e);
            c.ts = parseInt((new Date).getTime() / 1E3);
            b.password && (c.password = b.password);
            b.password && (b.initConfig.client_id && b.config.partner_config && 1 == b.config.partner_config.status && 1 == b.config.partner_config.passless) && (c.client_id = b.initConfig.client_id);
            e = [];
            for (h = 0; h < f.length; h++) e.push(f[h].VID);
            e.push(b.v.data[0].videoid);
            f = encodeURIComponent(E(F(G(b.mk.a4 +
                "poz" + d.userCache.a2, [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26]).toString(), d.userCache.sid + "_" + e.join("") + "_" + d.userCache.token)));
            c.ep = f;
            c.sid = d.userCache.sid;
            c.token = d.userCache.token;
            c.ctype = "12";
            c.ev = "1";
            c.oip = b.v.data[0].ip;
            a += n(c);
            "" != b.getUCStr(b.v.data[0].videoid) && (a += b.getUCStr(b.v.data[0].videoid));
            return a
        },
        run: function() {
            if (!(null == this._adinfo || null == this._adinfo.VAL || 0 == this._adinfo.VAL.length)) {
                for (var a = {
                        SUS: [],
                        SU: [],
                        SUE: [],
                        CU: [],
                        CUM: [],
                        VTVC: []
                    }, b = 0, e = 0; e < this._adinfo.VAL.length; e++) {
                    var d = this._adinfo.VAL[e];
                    if (!(null == d.VID || null == d.VQT)) {
                        null == d.SU && (d.SU = []);
                        null == d.SUE && (d.SUE = []);
                        if (0 == e) a.SUS = d.SUS || [];
                        else
                            for (var i = 0; i < d.SUS.length; i++) a.SU.push({
                                T: b,
                                U: d.SUS[i].U
                            });
                        for (i = 0; i < d.SU.length; i++) {
                            var g = d.SU[i].T + b;
                            a.SU.push({
                                T: g,
                                U: d.SU[i].U
                            })
                        }
                        if (e == this._adinfo.VAL.length - 1) a.SUE = d.SUE;
                        else
                            for (i = 0; i < d.SUE.length; i++) g = b + d.AL, a.SU.push({
                                T: g,
                                U: d.SUE[i].U
                            });
                        b += d.AL;
                        a.CU.push({
                            T: b,
                            U: d.CU
                        });
                        a.CUM.push({
                            T: b,
                            CUM: d.CUM
                        });
                        1 == parseInt(d.VT) && a.VTVC.push({
                            U: d.VC,
                            T: b
                        });
                        if (0 != this._vt2nodes.length)
                            for (i = 0; i < this._vt2nodes.length; i++) d = this._vt2nodes[i].VC, g = this._vt2nodes[i].pos_, -1 == g && a.VTVC.push({
                                U: d,
                                T: 0
                            }), g == e && a.VTVC.push({
                                U: d,
                                T: b
                            })
                    }
                }
                a.AL = b;
                a.RS = this.buildAdRS();
                this._info.VAL.push(a);
                this._info.src = a.RS
            }
            this.dispatch({
                type: ADConstant.FRONT_AD_INFO_ADAPER_OK,
                data: this._info
            })
        }
    };
    var M = function(a, b) {
        this._handler = {};
        this.player = a;
        this.video = this.player.video;
        this.controls = this.player.controls;
        this._adplugin = this.player._adplugin;
        this._adplugin.adplayer = this;
        this.video.preload = "none";
        this.video.src = b.data.urls[0];
        debug.log("ad src=" + this.video.src);
        this.video.style.display = "block";
        this._addata = b.data;
        this._addata.curnum = 0;
        this._playTag = [];
        this.bindAdEvent();
        this._adreporter = new H(this, this._addata)
    };
    M.prototype = {
        addEventListener: function(a, b) {
            this._handler[a] = b
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        bindAdEvent: function() {
            this.bind_fadtoplay =
                b.bindAsEventListener(this, this.onPlayClick);
            this.bind_fadplay = b.bindAsEventListener(this, this.onAdPlay);
            this.bind_fadended = b.bindAsEventListener(this, this.onAdEnded);
            this.bind_faderror = b.bindAsEventListener(this, this.onAdError);
            this.bind_fadpause = b.bindAsEventListener(this, this.onAdPause);
            this.bind_fadsuspend = b.bindAsEventListener(this, this.onAdSuspend);
            this.bind_fadstalled = b.bindAsEventListener(this, this.onAdStalled);
            this.bind_fadwaiting = b.bindAsEventListener(this, this.onAdWaiting);
            this.bind_fadloadedmetadata =
                b.bindAsEventListener(this, this.onAdLoadedMetaData);
            this.bind_fadtimeupdate = b.bindAsEventListener(this, this.onAdTimeUpdate);
            b.addEventHandler(this.video, "play", this.bind_fadplay);
            b.addEventHandler(this.video, "ended", this.bind_fadended);
            b.addEventHandler(this.video, "error", this.bind_faderror);
            b.addEventHandler(this.video, "pause", this.bind_fadpause);
            b.addEventHandler(this.video, "suspend", this.bind_fadsuspend);
            b.addEventHandler(this.video, "stalled", this.bind_fadstalled);
            b.addEventHandler(this.video,
                "waiting", this.bind_fadwaiting);
            b.addEventHandler(this.video, "loadedmetadata", this.bind_fadloadedmetadata);
            b.addEventHandler(this.video, "timeupdate", this.bind_fadtimeupdate);
            this.shadow = this.controls.buttons.shadow;
            this.videobtn = this.controls.buttons.videobtn;
            b.addEventHandler(this.videobtn, "click", this.bind_fadtoplay, !0)
        },
        removeAdEvent: function() {
            b.removeEventHandler(this.video, "play", this.bind_fadplay);
            b.removeEventHandler(this.video, "ended", this.bind_fadended);
            b.removeEventHandler(this.video, "error",
                this.bind_faderror);
            b.removeEventHandler(this.video, "pause", this.bind_fadpause);
            b.removeEventHandler(this.video, "suspend", this.bind_fadsuspend);
            b.removeEventHandler(this.video, "stalled", this.bind_fadstalled);
            b.removeEventHandler(this.video, "waiting", this.bind_fadwaiting);
            b.removeEventHandler(this.video, "timeupdate", this.bind_fadtimeupdate);
            b.removeEventHandler(this.video, "loadedmetadata", this.bind_fadloadedmetadata);
            b.removeEventHandler(this.videobtn, "click", this.bind_fadtoplay, !0)
        },
        onPlayClick: function() {
            this.video.play()
        },
        checkVTVC: function(a) {
            var b = this._addata.vtvc;
            if (!(null == b || 0 === b.length))
                for (var e = 0; e < b.length; e++) {
                    var d = b[e];
                    d.pos_ == a - 1 && y(d.VC, "js")
                }
        },
        play: function() {
            this.checkVTVC(0);
            this.video.load();
            this.video.play()
        },
        leftSecond: function() {
            for (var a = this._addata.curnum, b = this._addata.seconds.length, e = this._addata.seconds[a] - this.video.currentTime, a = a + 1; a < b; a++) e += this._addata.seconds[a];
            return parseInt(e)
        },
        clearTimer: function() {
            clearInterval(this._checkTimer);
            this._checkTimer = null
        },
        checkPause: function() {
            if (!this._checkTimer) {
                var a =
                    this;
                this._timelist = [];
                this._checkTimer = setInterval(function() {
                    if (a.video.paused) a.onAdPause();
                    else a._timelist.push(a.video.currentTime), 3 <= a._timelist.length && (1 > Math.abs(a._timelist[0] - a._timelist[2]) && (debug.log("<b>ad unexpected pause</b>"), a.video.play(), 0 == a.leftSecond() && (debug.log("<b>exception left = 0 </b>"), a.onAdEnded())), a._timelist = [])
                }, 1E3)
            }
        },
        onAdPlay: function() {
            this.checkPause();
            var a = this.controls.container.poster;
            b.hide(this.controls.buttons.videobtn);
            b.hide(a);
            b.hide(b.get(".x-video-info"));
            this.video.style.display = "block";
            a = this._addata.curnum;
            debug.log("left=" + this.leftSecond() + " curtotal=" + this._addata.seconds[a] + " curtime=" + this.video.currentTime);
            this._adplugin.setLeftSecond(this.leftSecond());
            var c = this;
            setTimeout(function() {
                debug.log("ad media timeout check begin = " + c._adBegin);
                c._adBegin || (c.removeAdEvent(), c._adplugin.hide(), c._adplugin.reportTime("advideo", -1, !1), c.dispatch({
                    type: ADConstant.AD_ERROR,
                    data: !0
                }))
            }, 1E4);
            this._playTag[a] || (this._playTag[a] = !0, this._adfirsttu = !1,
                this._adplugin.recordTime("advideo"), l.appendItem("phase", "adplay"))
        },
        uglyClose: function() {
            this.video.src = "";
            this.video.load();
            this.video.play()
        },
        onAdError: function() {
            this.checkVTVC(this._addata.curnum + 1);
            this.removeAdEvent();
            this._adplugin.hide();
            this._adplugin.reportTime("advideo", -1, !1);
            this.dispatch({
                type: ADConstant.AD_ERROR,
                data: !0
            })
        },
        onAdEnded: function(a) {
            debug.log("ad ended");
            this._adreporter.sendSUE();
            this.checkVTVC(this._addata.curnum + 1);
            if (this._addata.curnum < this._addata.urls.length - 1) this.onMiddleAdEnded(a);
            else this.removeAdEvent(), this._adplugin.hide(), this.clearTimer(), this.dispatch({
                type: ADConstant.AD_END,
                data: !0
            }), l.appendItem("phase", "adend")
        },
        onMiddleAdEnded: function() {
            debug.log("onMiddleAdEnded");
            this._pauseLeftSec = !0;
            var a = this;
            setTimeout(function() {
                a._pauseLeftSec = !1
            }, 1E3);
            this._addata.curnum++;
            this.video.src = this._addata.urls[this._addata.curnum];
            this.video.load();
            this.video.play();
            this._adBegin = !1
        },
        onAdPause: function() {
            this.player.video.ended || (b.show(this.controls.buttons.videobtn), b.hide(this.controls.buttons.shadow))
        },
        onAdSuspend: function() {
            debug.log("<font color=red>ad suspend</font>")
        },
        onAdStalled: function() {
            debug.log("<font color=red>ad stalled</font>")
        },
        onAdWaiting: function(a) {
            this.controls.onWaiting(a)
        },
        onAdTimeUpdate: function() {
            b.hide(this.controls.buttons.loading);
            this._adBegin = !0;
            b.hide(this.controls.buttons.loading);
            this._pauseLeftSec || this._adplugin.setLeftSecond(this.leftSecond());
            this._adreporter.sendSU(this.video.currentTime);
            0.5 <= this.video.currentTime && this._adplugin.show();
            this._adfirsttu || (this._adfirsttu = !0, this._adreporter.sendSUS(), this._adreporter.sendVC(), this._adplugin.reportTime("advideo"), d.isNeedAdrTrick() && d.adrInvalidPauseCheck(this.video), 0 === this._adplugin.SKIP && this.dispatch({
                type: ADConstant.UGLY_CLOSE_AD_HINT
            }))
        },
        onAdLoadedMetaData: function() {
            this._adBegin = !0
        },
        onAdClick: function() {
            this.video.pause();
            this._adreporter.sendCUM();
            var a = this._addata,
                a = a.info.VAL[a.curnum].CU;
            debug.log("click cu=" + a);
            window.open(a, "", "", !1)
        }
    };
    ADConstant = {
        FRONT_REQUEST_BASE: "http://mf.atm.youku.com/mf?",
        BACK_REQUEST_BASE: "http://mb.atm.youku.com/mb?",
        PAUSE_REQUEST_BASE: "http://mp.atm.youku.com/mp?",
        INSERT_REQUEST_BASE: "http://valo.atm.youku.com/valo?",
        OVERLAY_REQUEST_BASE: "http://valc.atm.youku.com/valc?",
        FRONT_AD: "frontAD",
        BACK_AD: "backAD",
        INSERT_AD: "insertAD",
        PAUSE_AD: "pauseAD",
        OVERLAY_AD: "overlayAD",
        AD_END: "adend",
        AD_ERROR: "aderror",
        UGLY_CLOSE_AD: "uglyclosead",
        FRONT_AD_END: "frontADend",
        FRONT_AD_ERROR: "frontADerror",
        FRONT_AD_INFO_OK: "frontAdinfook",
        FRONT_AD_UNITED_INFO_OK: "unitedfrontadinfook",
        FRONT_AD_INFO_ADAPER_OK: "frontAdinfoadapterok",
        FRONT_AD_INFO_TIMEOUT: "frontAdinfotimeout",
        BACK_AD_END: "backAdend",
        BACK_AD_ERROR: "backaderror",
        BACK_AD_INFO_OK: "backAdinfook",
        BACK_AD_INFO_TIMEOUT: " backAdinfotimeout",
        INSERT_AD_INFO_OK: "insertAdinfook",
        PAUSE_AD_INFO_OK: "pauseAdinfook",
        PAUSE_AD_INFO_ERROR: "pauseAdinfoerror",
        PAUSE_AD_INFO_TIMEOUT: "pauseadinfotimeout",
        OVERLAY_AD_INFO_OK: "overlayAdinfook",
        AdPluginObject: "adpluginobject"
    };
    var N = function(a, c, e) {
        this._handler = {};
        this.player = a;
        this.sid = e;
        this._advids = [];
        this._adsecs = [];
        this._adsrcs = [];
        this._vid =
            c.data[0].videoid;
        this._advert = b.get(".x-advert");
        this._adskip = this._advert.getElementsByClassName("x-advert-skip")[0];
        this._adcount = this._advert.getElementsByClassName("x-advert-countdown")[0];
        this._adknowdet = this._advert.getElementsByClassName("x-advert-detail")[0];
        this.init(c);
        this.bindEvent()
    };
    N.prototype = {
        init: function(a) {
            this.initRequestParam(a);
            this._adskipTxt = this._adskip.getElementsByClassName("x-advert-txt")[0];
            this._adskipTxt.innerHTML = "\u8df3\u8fc7\u5e7f\u544a";
            this._adcountTxt = this._adcount.getElementsByClassName("x-advert-txt")[0];
            this._adcountTxt.innerHTML = "\u5e7f\u544a <span class=x-advert-sec></span> \u79d2";
            this._adsec = this._adcountTxt.getElementsByClassName("x-advert-sec")[0]
        },
        initRequestParam: function(a) {
            var c = {
                site: 1,
                p: 0,
                vl: parseInt(a.data[0].seconds),
                fu: 0,
                ct: a.data[0].ct,
                cs: a.data[0].cs,
                d: 0,
                paid: a.data[0].show ? a.data[0].show.paid : 0,
                s: a.data[0].show ? a.data[0].show.showid : 0,
                sid: this.sid,
                td: a.data[0].sourceVid ? a.data[0].sourceVid : 0,
                v: a.data[0].videoid,
                vip: a.user.vip ? 1 : 0,
                wintype: "xplayer_m3u8",
                u: a.data[0].userid,
                bt: d.isPad ?
                    "pad" : "phone",
                os: d.isMobileIOS ? "ios" : "Android",
                rst: d.isMobileIOS ? "m3u8" : "3gphd",
                tict: 0,
                aw: "w",
                vs: "1.0"
            };
            null != b.config.partner_config && (c.partnerid = b.initConfig.client_id, c.atm = b.config.partner_config.atm);
            for (var e in b.initConfig.adconfig) c[e] = b.initConfig.adconfig[e];
            this._param = c;
            this._ti = encodeURIComponent(a.data[0].title);
            this._k = encodeURIComponent((a.data[0].tags || []).join("|"));
            this.loadPartnerParam()
        },
        loadPartnerParam: function() {},
        partnerParse: function() {},
        initRequestParam_: function(a) {
            var c = {
                ct: a.data[0].ct,
                cs: a.data[0].cs,
                v: a.data[0].videoid,
                t: parseInt(a.data[0].seconds),
                u: a.data[0].userid,
                fileid: "todo",
                winType: "xplayer_m3u8",
                partnerid: b.config.partnerId,
                sid: this.sid,
                k: "",
                td: "todo"
            };
            c.s = a.data[0].show ? a.data[0].show.showid : "";
            a.user && (c.vip = a.user.vip ? 1 : 0);
            c.paid = a.data[0].show ? a.data[0].show.paid : 0;
            for (var e in b.initConfig.adconfig) c[e] = b.initConfig.adconfig[e];
            this._param = c
        },
        bindEvent: function() {
            var a = this;
            this.fSkipAd = function() {
                a.adplayer.video.pause();
                window.open("http://cps.youku.com/redirect.html?id=000002bf",
                    "", "", !1)
            };
            this._adskip.addEventListener("click", this.fSkipAd, !1);
            this._adknowdet.addEventListener("click", function() {
                debug.log("detail clicked");
                a.adplayer.onAdClick("")
            }, !1)
        },
        addEventListener: function(a, b) {
            this._handler[a] = b
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        show: function() {
            b.show(this._advert)
        },
        hide: function() {
            b.hide(this._advert)
        },
        setLeftSecond: function(a) {
            debug.log(a);
            this._adsec &&
                (this._adsec.innerText = a)
        },
        splitVTVC: function(a) {
            debug.log("split adinfo vt vc");
            this._vtvc = [];
            var b = {},
                e;
            for (e in a) "VAL" != e && (b[e] = a[e]);
            b.VAL = [];
            a = a.VAL;
            for (e = 0; e < a.length; e++) 2 === parseInt(a[e].VT) ? (a[e].pos_ = e - 1 - this._vtvc.length, this._vtvc.push(a[e])) : null == a[e].RS || ("" == a[e].RS.trim() || null == a[e].VID || null == a[e].VQT) || b.VAL.push(a[e]);
            return b
        },
        buildTestData: function() {
            return {
                VAL: [{
                    AL: 15,
                    VID: 147660115,
                    VQT: "flv",
                    SUS: [{
                        U: "http://mytestdata.com1"
                    }, {
                        U: "http://mytestdata.com2"
                    }],
                    SU: [],
                    SUE: [],
                    CU: "http://www.baidu.com",
                    CUM: [{
                        U: "http://cum"
                    }],
                    RS: "http://fasdfa"
                }, {
                    AL: 15,
                    VID: 15252,
                    VQT: "flv",
                    SUS: [{
                        U: "http://mytestdata.com1"
                    }, {
                        U: "http://mytestdata.com2"
                    }],
                    SU: [],
                    SUE: [],
                    CU: "http://www.bing.com",
                    CUM: [{
                        U: "http://cum"
                    }],
                    RS: "http://fasdfa",
                    VT: 2,
                    VC: "http://vc.com"
                }]
            }
        },
        checkSkip: function(a) {
            a && 0 === parseInt(a.SKIP) && (b.hide(this._adskip), this.SKIP = 0)
        },
        adParseUnited: function(a) {
            this.checkSkip(a);
            this._isAdInfoOk = !0;
            l.appendItem("phase", "adinfo");
            this.reportTime("adinfo");
            a && a.VAL && (debug.log("<b>before split val length =  " + a.VAL.length +
                "</b>"), a = this.splitVTVC(a), debug.log("<b>after : val length =  " + a.VAL.length + "</b>"));
            if (null == a || null == a.VAL || 0 == a.VAL.length) a = {
                VAL: []
            }, this.dispatch({
                type: ADConstant.FRONT_AD_UNITED_INFO_OK,
                data: {
                    info: {
                        VAL: []
                    },
                    vtvc: this._vtvc || []
                }
            });
            else {
                var a = new ma(a, this._vtvc),
                    b = this;
                a.addEventListener(ADConstant.FRONT_AD_INFO_ADAPER_OK, function(a) {
                    debug.log("ad info adapter ok");
                    b.dispatch({
                        type: ADConstant.FRONT_AD_UNITED_INFO_OK,
                        data: {
                            info: a.data,
                            vtvc: b._vtvc || []
                        }
                    })
                });
                a.run()
            }
        },
        adParse: function(a) {
            this.checkSkip(a);
            l.appendItem("phase", "adinfo");
            this.reportTime("adinfo");
            this._isAdInfoOk = !0;
            if (a && a.VAL)
                for (var a = this.splitVTVC(a), b = a.VAL, e = 0; e < b.length; e++) this._adsrcs.push(b[e].RS), this._adsecs.push(parseInt(b[e].AL));
            debug.log("frontad len =" + this._adsrcs.length);
            this.dispatch({
                type: ADConstant.FRONT_AD_INFO_OK,
                data: {
                    ids: this._advids || [],
                    urls: this._adsrcs,
                    seconds: this._adsecs,
                    info: a,
                    vtvc: this._vtvc || []
                }
            })
        },
        buildPauseData: function() {
            return adinfo = {
                P: 10,
                VAL: [{
                    RS: "http://static.atm.youku.com/Youku2013/201307/0715/27896/600-430.jpg",
                    RST: "img",
                    AT: 73,
                    SU: [],
                    SUS: [{
                        U: "http://mf.atm.youku.com/mshow?v=137006183&at=73&ct=d&cs=1003&ca=135159&ie=150597&uid=1234567&ck=137689524489061H&al=0&bl=1&s=&td=&st=1&vl=1200.0&ap=4&sid=1&cr=0&tvb=0&pr=100&oidtype=27896%7C1&tpa=null&rid=&os=1&dt=1&aw=a&avs="
                    }],
                    SUE: [],
                    CU: "http://vid.atm.youku.com/mclick?v=137006183&at=73&ct=d&cs=1003&ca=135159&ie=150597&uid=1234567&ck=137689524489061H&al=0&bl=1&s=&td=&st=1&vl=1200.0&ap=4&sid=1&cr=0&tvb=0&pr=100&oidtype=27896%7C1&tpa=null&rid=&os=1&dt=1&aw=a&avs=&u=http://static.youku.com/pub/youku/fragment/panel_phone.html&md5=f2450cd80597324b57d986147dc1b3a9",
                    W: 400,
                    H: 300,
                    CF: "1"
                }]
            }
        },
        adParsePause: function(a) {
            debug.log("<b> ad parse pause </b>");
            l.appendItem("phase", "pauseadinfo");
            this.reportTime("adinfo");
            this._isPauseAdInfoOk = !0;
            null == a || null == a.VAL || 0 == a.VAL.length || 10 != a.P ? this.dispatch({
                type: ADConstant.PAUSE_AD_INFO_ERROR
            }) : (debug.log("<b>pause ad len = " + a.VAL.length + "</b>"), this.dispatch({
                type: ADConstant.PAUSE_AD_INFO_OK,
                data: {
                    info: a
                }
            }))
        },
        frontAd: function() {
            this._param.fu = this.player.controls.fullscreenPanel.fullFlag() ? 1 : 0;
            this._param.p = 7;
            this._param.callback =
                ADConstant.AdPluginObject + ".adParse";
            b.OLD_M3U8 = !0;
            d.isIPAD && (debug.log("<font color=red> new m3u8 api</font>"), b.OLD_M3U8 = !1, this._param.callback = ADConstant.AdPluginObject + ".adParseUnited");
            var a = ADConstant.FRONT_REQUEST_BASE + n(this._param) + "&ti=" + this._ti + "&k=" + this._k;
            x(a);
            this.recordTime("adinfo");
            var c = this;
            setTimeout(function() {
                if (!c._isAdInfoOk) {
                    debug.log("adinfo timeout");
                    c.reportTime("adinfo", -1);
                    c.dispatch({
                        type: ADConstant.FRONT_AD_INFO_TIMEOUT,
                        data: {
                            timeout: 8E3
                        }
                    })
                }
            }, 8E3)
        },
        pauseAd: function() {
            this._param.r_ =
                parseInt(1E4 * Math.random());
            this._param.p = 10;
            this._param.fu = this.player.controls.fullscreenPanel.fullFlag() ? 1 : 0;
            this._param.callback = ADConstant.AdPluginObject + ".adParsePause";
            var a = ADConstant.PAUSE_REQUEST_BASE + n(this._param) + "&ti=" + this._ti + "&k=" + this._k;
            x(a);
            this.recordTime("adinfo");
            var b = this;
            setTimeout(function() {
                b._isPauseAdInfoOk || (debug.log("pause ad info timeout"), b.reportTime("adinfo", -1), b.dispatch({
                    type: ADConstant.PAUSE_AD_INFO_TIMEOUT,
                    data: {
                        timeout: 8E3
                    }
                }))
            }, 8E3)
        },
        recordTime: function(a) {
            null ==
                this._timearr && (this._timearr = {});
            this._timearr[a] = (new Date).getTime()
        },
        reportTime: function(a, b, e) {
            null == this._timearr && (this._timearr = {});
            b = b || (new Date).getTime() - this._timearr[a];
            this.player._reporter.sendUepReport({
                adinfo: "valfload",
                advideo: "adload"
            }[a], b, e)
        },
        backAd: function() {
            this._param.fu = this.player.controls.fullscreenPanel.fullFlag();
            this._param.p = 9;
            this._param.callback = ADConstant.AdPluginObject + ".adParse";
            this._param.ctu = 0;
            var a = ADConstant.BACK_REQUEST_BASE + n(this._param) + "&ti=" + this._ti +
                "&k=" + this._k;
            x(a);
            var b = this;
            setTimeout(function() {
                b._isAdInfoOk || (debug.log("adinfo timeout"), b.dispatch({
                    type: ADConstant.BACK_AD_INFO_TIMEOUT,
                    data: {
                        timeout: 5E3
                    }
                }))
            }, 5E3)
        },
        insertAd: function() {
            this._param.ps = 0;
            this._param.pt = 0
        }
    };
    var H = function(a, b) {
        this.adplayer = a;
        this.addata = b;
        "undefined" == typeof b.curnum && (this.addata.curnum = 0)
    };
    H.prototype = {
        sendSUS: function() {
            var a = this.addata.info.VAL[this.addata.curnum].SUS;
            if ("undefined" != typeof a)
                for (var b = 0; b < a.length; b++) d.Log(a[b].U)
        },
        sendUnitedVTVC: function(a) {
            var a =
                a + 2,
                b = this.addata.info.VAL[0].VTVC;
            this._vtccache || (this._vtccache = []);
            for (var e = null, d = 1E6, i = 1E5, g = 0; g < b.length; g++) {
                var h = b[g].U,
                    k = parseInt(b[g].T),
                    l = a - k;
                0 <= l && l < i && (i = l, e = h, d = k)
            }
            null != e && -1 == this._vtccache.indexOf(d) && (this._vtccache.push(d), debug.log("<b> vc = " + e + "</b>"), y(e, "js"))
        },
        sendVC: function() {
            var a = this.addata.info.VAL[this.addata.curnum];
            "undefined" != typeof a.VT && y(a.VC, "js")
        },
        sendSUS_: function() {
            var a = this.addata.info,
                b = this.addata.curnum + 2,
                e = a["A" + b].ATMSU,
                f = a["A" + b].ISOSU;
            d.Log(a["A" +
                b].SU);
            d.Log(e);
            d.Log(f)
        },
        sendSUE: function() {
            var a = this.addata.info.VAL[this.addata.curnum].SUE;
            if ("undefined" != typeof a)
                for (var b = 0; b < a.length; b++) d.Log(a[b].U)
        },
        sendSUE_: function() {
            var a = this.addata.info,
                b = this.addata.curnum + 2,
                e = a["A" + b].COU;
            d.Log(a["A" + b].OU);
            d.Log(e)
        },
        sendSU: function(a) {
            var b = this.addata.info.VAL[this.addata.curnum].SU;
            if ("undefined" != typeof b) {
                this._sucache || (this._sucache = []);
                for (var e = 1E4, f = 1E6, i = 0; i < b.length; i++) {
                    var g = parseInt(b[i].T),
                        h = a - g;
                    0 <= h && h < e && (e = h, f = g)
                }
                if (1E6 != f &&
                    -1 == this._sucache.indexOf(f)) {
                    this._sucache.push(f);
                    for (i = 0; i < b.length; i++) parseInt(b[i].T) == f && d.Log(b[i].U)
                }
            }
        },
        sendSU_: function(a) {
            curnum += 2;
            var b = this.addata.info["A" + curnum].MT;
            b && a >= parseInt(b) && (a = this.addata.info["A" + curnum].CMU, d.Log(this.addata.info["A" + curnum].MU), d.Log(a))
        },
        sendCUM: function() {
            var a = this.addata.info.VAL[this.addata.curnum].CUM;
            if ("undefined" != typeof a)
                for (var b = 0; b < a.length; b++) d.Log(a[b].U)
        },
        sendUnitedCUM: function(a) {
            var b = this.addata.info.VAL[0].CUM;
            if (!("undefined" ==
                    typeof b || 0 === b.length))
                for (var e = 0; e < b.length; e++)
                    if (a < parseInt(b[e].T)) {
                        for (a = 0; a < (b[e].CUM || []).length; a++) d.Log(b[e].CUM[a].U);
                        break
                    }
        },
        sendCUM_: function() {
            var a = this.addata;
            d.Log(a.info["A" + (a.curnum + 2)].VCU)
        }
    };
    var na = function(a, b) {
        this._handler = {};
        this.player = a;
        this.video = this.player.video;
        this.controls = this.player.controls;
        this._adplugin = this.player._adplugin;
        this._adplugin.adplayer = this;
        this._addata = b.data.info;
        this.video.preload = "none";
        this.video.src = this._addata.VAL[0].RS;
        debug.log("ad src=" +
            this.video.src);
        this.video.style.display = "block";
        this._playTag = [];
        this.bindAdEvent();
        this._adreporter = new H(this, {
            curnum: 0,
            info: this._addata
        })
    };
    na.prototype = {
        addEventListener: function(a, b) {
            this._handler[a] = b
        },
        removeEventListener: function(a) {
            this._handler[a] = null
        },
        dispatch: function(a) {
            a && this._handler[a.type] && (a._target = this, this._handler[a.type](a))
        },
        bindAdEvent: function() {
            this.bind_fadtoplay = b.bindAsEventListener(this, this.onPlayClick);
            this.bind_fadplay = b.bindAsEventListener(this, this.onAdPlay);
            this.bind_fadended = b.bindAsEventListener(this, this.onAdEnded);
            this.bind_faderror = b.bindAsEventListener(this, this.onAdError);
            this.bind_fadpause = b.bindAsEventListener(this, this.onAdPause);
            this.bind_fadsuspend = b.bindAsEventListener(this, this.onAdSuspend);
            this.bind_fadstalled = b.bindAsEventListener(this, this.onAdStalled);
            this.bind_fadwaiting = b.bindAsEventListener(this, this.onAdWaiting);
            this.bind_fadloadedmetadata = b.bindAsEventListener(this, this.onAdLoadedMetaData);
            this.bind_fadtimeupdate = b.bindAsEventListener(this,
                this.onAdTimeUpdate);
            b.addEventHandler(this.video, "play", this.bind_fadplay);
            b.addEventHandler(this.video, "error", this.bind_faderror);
            b.addEventHandler(this.video, "pause", this.bind_fadpause);
            b.addEventHandler(this.video, "suspend", this.bind_fadsuspend);
            b.addEventHandler(this.video, "stalled", this.bind_fadstalled);
            b.addEventHandler(this.video, "waiting", this.bind_fadwaiting);
            b.addEventHandler(this.video, "loadedmetadata", this.bind_fadloadedmetadata);
            b.addEventHandler(this.video, "timeupdate", this.bind_fadtimeupdate);
            this.shadow = this.controls.buttons.shadow;
            this.videobtn = this.controls.buttons.videobtn;
            b.addEventHandler(this.videobtn, "click", this.bind_fadtoplay, !0)
        },
        removeAdEvent: function() {
            b.removeEventHandler(this.video, "play", this.bind_fadplay);
            b.removeEventHandler(this.video, "ended", this.bind_fadended);
            b.removeEventHandler(this.video, "error", this.bind_faderror);
            b.removeEventHandler(this.video, "pause", this.bind_fadpause);
            b.removeEventHandler(this.video, "suspend", this.bind_fadsuspend);
            b.removeEventHandler(this.video,
                "stalled", this.bind_fadstalled);
            b.removeEventHandler(this.video, "waiting", this.bind_fadwaiting);
            b.removeEventHandler(this.video, "timeupdate", this.bind_fadtimeupdate);
            b.removeEventHandler(this.video, "loadedmetadata", this.bind_fadloadedmetadata);
            b.removeEventHandler(this.videobtn, "click", this.bind_fadtoplay, !0)
        },
        onPlayClick: function() {
            this.video.play()
        },
        play: function() {
            this.video.load();
            this.video.play()
        },
        leftSecond: function() {
            return parseInt(Math.max(0, this._addata.VAL[0].AL - this.video.currentTime))
        },
        clearTimer: function() {
            clearInterval(this._checkTimer);
            this._checkTimer = null
        },
        checkPause: function() {
            if (!this._checkTimer) {
                var a = this;
                this._timelist = [];
                this._checkTimer = setInterval(function() {
                    if (a.video.paused) a.onAdPause();
                    else a._timelist.push(a.video.currentTime), 3 <= a._timelist.length && (1 > Math.abs(a._timelist[0] - a._timelist[2]) && (debug.log("<b>ad unexpected pause</b>"), a.video.play(), 0 == a.leftSecond() && (debug.log("<b>exception left = 0 </b>"), a.onAdEnded())), a._timelist = [])
                }, 1E3)
            }
        },
        onAdPlay: function() {
            this.checkPause();
            var a = this.controls.container.poster;
            b.hide(this.controls.buttons.videobtn);
            b.hide(a);
            b.hide(b.get(".x-video-info"));
            this.video.style.display = "block";
            this._adplugin.setLeftSecond(this.leftSecond());
            var c = this;
            setTimeout(function() {
                debug.log("ad media timeout check begin = " + c._adBegin);
                c._adBegin || (c.removeAdEvent(), c._adplugin.hide(), c._adplugin.reportTime("advideo", -1, !1), c.dispatch({
                    type: ADConstant.AD_ERROR,
                    data: !0
                }))
            }, 15E3);
            this._playTag[0] || (this._playTag[0] = !0, this._adfirsttu = !1, this._adplugin.recordTime("advideo"),
                l.appendItem("phase", "adplay"))
        },
        uglyClose: function() {
            debug.log("united ugly close");
            this.onAdError()
        },
        onAdError: function() {
            this.removeAdEvent();
            this._adplugin.hide();
            this._adplugin.reportTime("advideo", -1, !1);
            this.clearTimer();
            this.dispatch({
                type: ADConstant.AD_ERROR,
                data: !0
            })
        },
        onAdEnded: function() {
            debug.log("united ad ended");
            this._adreporter.sendSUE();
            this.removeAdEvent();
            this._adplugin.hide();
            this.clearTimer();
            this.dispatch({
                type: ADConstant.AD_END,
                data: !0
            });
            l.appendItem("phase", "adend")
        },
        onAdPause: function() {
            this.player.video.ended ||
                (b.show(this.controls.buttons.videobtn), b.hide(this.controls.buttons.shadow))
        },
        onAdSuspend: function() {
            debug.log("<font color=red>ad suspend</font>")
        },
        onAdStalled: function() {
            debug.log("<font color=red>ad stalled</font>")
        },
        onAdWaiting: function(a) {
            this.controls.onWaiting(a)
        },
        onAdTimeUpdate: function() {
            if (this.video.currentTime > this._addata.VAL[0].AL) this.onAdEnded();
            else b.hide(this.controls.buttons.loading), this._adBegin = !0, b.hide(this.controls.buttons.loading), this._adplugin.setLeftSecond(this.leftSecond()),
                this._adreporter.sendSU(this.video.currentTime), this._adreporter.sendUnitedVTVC(this.video.currentTime), this._adfirsttu || (this._adplugin.show(), this._adreporter.sendSUS(), this._adfirsttu = !0, this._adplugin.reportTime("advideo"), 0 === this._adplugin.SKIP && this.dispatch({
                    type: ADConstant.UGLY_CLOSE_AD_HINT
                }))
        },
        onAdLoadedMetaData: function() {
            this._adBegin = !0
        },
        onAdClick: function() {
            this.video.pause();
            this._adreporter.sendUnitedCUM(this.video.currentTime || 0);
            for (var a = this._addata.VAL[0].CU, b = this.video.currentTime,
                    e = 0; e < a.length; e++) {
                var d = a[e],
                    i = d.U;
                if (b <= parseInt(d.T)) {
                    window.open(i, "", "", !1);
                    break
                }
            }
        }
    };
    DirectPlayer = function(a) {
        b.config = a;
        null == b.config.width && (b.config.width = q(b.config.parentBox).offsetWidth);
        this.buildDirectDom(q(b.config.parentBox))
    };
    DirectPlayer.prototype = {
        buildDirectDom: function(a) {
            a.innerHTML = "<div id=x-player class=" + z(b.config.width) + '><div class=x-video-poster><img id=x-img></img></div><div class=x-video-button><div class=x-video-play-ico></div></div><div class=x-video-info><h1 class=x-title></h1><div class=x-video-state style="display:none"><span class=x-time-span></span></div><div class=x-showmore></div><div class=x-mask></div></div>'
        },
        bindEvent: function() {
            this._videobtn = b.get(".x-video-button");
            b.addEventHandler(this._videobtn, "click", b.bindAsEventListener(this, this.redirect))
        },
        startPlay: function(a, c) {
            b.v = a;
            b.videoInfo = c;
            b.videoInfo._playListData = a.data[0];
            this._pimg = b.get("#x-img");
            this._pimg.src = a.data[0].logo;
            this._title = b.get(".x-title");
            this._title.innerHTML = a.data[0].title;
            this._timespan = b.get(".x-time-span");
            this._timespan.innerHTML = b.getTime(a.data[0].seconds);
            b.show(b.get(".x-video-poster"));
            b.show(b.get(".x-video-info"));
            this.adapterForReport();
            this._reporter = new L(this, b.v, b.videoInfo._sid);
            this.bindEvent()
        },
        onPlayStart: function() {
            b.config.events && b.config.events.onPlayStart && (d.playerCurrentState = d.playerState.PLAYER_STATE_PLAYING, debug.log(d.playerCurrentState), debug.log("api:onplaystart"), b.config.events.onPlayStart())
        },
        getSrc: function() {
            if (this.src) return this.src;
            "m3u8" == b.config.content ? this.src = b.videoInfo.src : null != b.videoInfo._videoSegsDic && null != b.videoInfo._videoSegsDic[m] && (this.src = b.videoInfo._videoSegsDic[m][0].src);
            return this.src
        },
        redirect: function() {
            var a = this.getSrc();
            debug.log("redirect play src=" + a);
            d.isMIUI ? window.location.href = a : window.open(a, "", "", !1);
            this.onPlayStart();
            this._reporter.addPlayerStaticReport();
            this._reporter.addPlayerDurationReport(59);
            this._reporter.sendVVLog(59);
            this._reporter.sendTSLog(60);
            this._reporter.sendUserActionReport("xps", "c");
            this._reporter.sendThirdPartyReport("xplayer_dl");
            this._reporter.sendCustomLoadedTime(1);
            this._reporter.sendClientConsumeReport()
        },
        adapterForReport: function() {
            this.controls = {
                fullscreenPanel: {
                    fullFlag: function() {
                        return 1
                    }
                }
            };
            this.video = {
                src: this.getSrc()
            };
            this.getQuality = function() {
                return "m"
            }
        }
    };
    y("http://player.youku.com/h5player/play.css?ver=" + VER.replace(/[-:]/g, ""), "css");
    var W = function(a) {
        this._id = a.id;
        this._pid = a.pid || "";
        this._url = a.url;
        this._box = a.parentBox;
        this._gotInfo = !1;
        a.width = q(a.parentBox).offsetWidth;
        a.height = q(a.parentBox).offsetHeight;
        b.config = a;
        this.request()
    };
    W.prototype = {
        request: function() {
            window.pkinfo = this;
            x(this._url + "/h5/videos/play.json?vid=" + this._id +
                "&pid=" + this._pid + "&callback=pkinfo.parse");
            var a = this;
            setTimeout(function() {
                !0 != a._gotInfo && a.showError()
            }, 5E3)
        },
        parse: function(a) {
            this._gotInfo = !0;
            0 == a.error ? (this.videoSrc = a.results.url, this.imgSrc = a.results.cover, this.buildDom()) : this.showError()
        },
        buildDom: function() {
            var a = "<div id=x-player class=" + this.cssAdapt(parseInt(b.config.width)) + ">";
            this.$(this._box).innerHTML = a + "<video class=x-video-player id=youku-html5player-video style=width: 100%; height: 100%; position: relative; display: none; top: -1000px; src=" +
                this.videoSrc + "></video><div class=x-video-poster><img src=" + this.imgSrc + "></img></div><div class=x-video-loading></div><div id=x-video-button class=x-video-button><div class=x-video-play-ico></div></div></div>";
            this.video = b.get(".x-video-player");
            this.cover = b.get(".x-video-poster");
            this.videoBtn = b.get(".x-video-button");
            this.loading = b.get(".x-video-loading");
            b.addEventHandler(this.videoBtn, "click", b.bindAsEventListener(this, this.onOverBtnClick));
            b.addEventHandler(this.video, "ended", b.bindAsEventListener(this,
                this.onEnded));
            b.addEventHandler(this.video, "timeupdate", b.bindAsEventListener(this, this.onTimeUpdate));
            b.addEventHandler(this.video, "waiting", b.bindAsEventListener(this, this.onWaiting))
        },
        showError: function() {
            this.$(this._box).innerHTML = '<div style="background:#000; color:#FFF; text-align:center; color: white; line-height:' + $$$(this._box).offsetHeight + 'px " >\u89c6\u9891\u4fe1\u606f\u51fa\u9519\uff0c\u8bf7\u5237\u65b0\u91cd\u8bd5</div>'
        },
        onOverBtnClick: function() {
            this.video.play();
            this.loading.style.display =
                "block";
            this.videoBtn.style.display = "none"
        },
        onEnded: function() {
            this.cover.style.display = "block";
            this.videoBtn.style.display = "block";
            this.loading.style.display = "none";
            this.video.style.display = "none"
        },
        onTimeUpdate: function() {
            "none" != this.loading.style.display && (this.loading.style.display = "none");
            "block" != this.video.style.display && (this.video.style.display = "block");
            "none" != this.cover.style.display && (this.cover.style.display = "none")
        },
        onWaiting: function() {
            this.loading.style.display = "block"
        },
        cssAdapt: function(a) {
            return d.isIPAD &&
                0 <= window.location.href.indexOf("v.youku.com") ? "x-player" : 200 >= a ? "x-player x-player-200" : 300 >= a ? "x-player x-player-200-300" : 660 >= a ? "x-player x-player-300-660" : 800 >= a ? "x-player x-player-660-800" : "x-player"
        },
        $: function(a) {
            return document.getElementById(a)
        }
    };
    var oa = function(a, c) {
        this.setting = {
            debug: !1,
            controls: b.get(".x-console"),
            feedback: b.get(".x-feedback"),
            container: {
                poster: b.get(".x-video-poster")
            },
            buttons: {
                pointVideo: b.get("#point-video"),
                playControl: b.get(".x-play-control"),
                play: b.get("#x-playbtn"),
                videobtn: b.get(".x-video-button"),
                loading: b.get(".x-video-loading"),
                videoinfo: b.get(".x-video-info"),
                shadow: b.get(".x-trigger"),
                currentTime: b.get(".x-time-current"),
                totalTime: b.get(".x-time-duration"),
                fullscreen: b.get(".x-fullscreen")
            },
            classNames: {
                play: "x-playing",
                pause: "x-pause"
            },
            init: function() {}
        };
        b.extend(this.setting, c);
        this.player = a;
        this.dashboard = this.setting.controls;
        this.container = this.setting.container;
        this.progressBar = new ea(a);
        this.progressBar.uCurrentTime = this.setting.buttons.currentTime;
        this.miniProgressBar = new aa(a);
        this.fullscreenPanel = new X(a);
        this.interactionPanel = new Z(a);
        this.xplayer = b.get("#x-player");
        this.buttons = this.setting.buttons
    };
    oa.prototype = {
        init: function(a, c) {
            this.buttons.totalTime.innerHTML = c.totalTime ? b.getTime(c.totalTime) : "00:00";
            this.resetProgress();
            this.buttons.play.className = this.setting.classNames.play;
            var e = this.container.poster.getElementsByTagName("img")[0];
            b.config.poster ? e.src = b.config.poster : a.data[0].trial || -6 == a.data[0].error_code ? (this.container.poster.style.backgroundColor =
                "black", e.parentNode.removeChild(e), b.show(this.container.poster)) : (e.src = a.data[0].logo, this.container.poster.style.display = "block");
            this._qualityPanel = new ha(this.player, a);
            this._languagePanel = new $(this.player, a);
            this._playratePanel = new da(this.player, a);
            this._payPanel = new ba(this.player, a);
            this._feedbackPanel = new K(this.player, a);
            this._informationPanel = new Y(this.player, a);
            this.tipPanel = new ka(this.player, a);
            this.showlistPanel = new ja(this.player, a);
            this.playLimit = new ca(this.player, a);
            this.bindDynamicEvent()
        },
        bindDynamicEvent: function() {
            this.bind_mutualHide = b.bindAsEventListener(this, this.mutualHide);
            b.addEventHandler(this._languagePanel, "click", this.bind_mutualHide);
            b.addEventHandler(this._qualityPanel, "click", this.bind_mutualHide);
            b.addEventHandler(this.showlistPanel, "click", this.bind_mutualHide);
            b.addEventHandler(this._playratePanel, "click", this.bind_mutualHide);
            this.bind_progress = b.bindAsEventListener(this, this.onProgress);
            b.addEventHandler(this.progressBar, "progressing", this.bind_progress);
            b.addEventHandler(this.progressBar,
                "progressend", b.bindAsEventListener(this, this.onProgressEnd));
            b.addEventHandler(this._languagePanel, "settingdone", b.bindAsEventListener(this, this.onSettingDone));
            b.addEventHandler(this._qualityPanel, "settingdone", b.bindAsEventListener(this, this.onSettingDone));
            b.addEventHandler(this._playratePanel, "settingdone", b.bindAsEventListener(this, this.onSettingDone));
            b.addEventHandler(this._languagePanel, "settingshow", b.bindAsEventListener(this, this.onSettingShow));
            b.addEventHandler(this._qualityPanel, "settingshow",
                b.bindAsEventListener(this, this.onSettingShow));
            b.addEventHandler(this._playratePanel, "settingshow", b.bindAsEventListener(this, this.onSettingShow));
            b.addEventHandler(this._languagePanel, "settinghide", b.bindAsEventListener(this, this.onSettingHide));
            b.addEventHandler(this._qualityPanel, "settinghide", b.bindAsEventListener(this, this.onSettingHide));
            b.addEventHandler(this._playratePanel, "settinghide", b.bindAsEventListener(this, this.onSettingHide));
            b.addEventHandler(this.fullscreenPanel, "enterfullscreen",
                b.bindAsEventListener(this, this.onEnterFullScreen));
            b.addEventHandler(this.fullscreenPanel, "exitfullscreen", b.bindAsEventListener(this, this.onExitFullScreen))
        },
        retimer: function() {
            debug.log("retimer");
            this.autoHideDashBoard()
        },
        hideDashBoard: function() {
            var a = this._payPanel,
                b = this._informationPanel,
                e = this.miniProgressBar,
                d = this.interactionPanel,
                i = this._languagePanel;
            this.setting.controls.style.display = "none";
            e.show();
            a.hide();
            b.hide();
            d.hideStatus();
            i.hide();
            this._qualityPanel.hide();
            this._playratePanel.hide()
        },
        autoHideDashBoard: function(a) {
            this.dashboardTimer && clearTimeout(this.dashboardTimer);
            var c = this;
            this.dashboardTimer = setTimeout(function() {
                "block" == b.get(".x-showlist").style.display ? c.autoHideDashBoard(a) : c.player.video.paused || c.hideDashBoard()
            }, a || 2E3)
        },
        onMultiTouch: function() {},
        showUglyHint: function() {},
        closeUglyHint: function() {},
        showBoardInfo: function() {
            b.show(this.setting.controls);
            this.miniProgressBar.hide();
            this._informationPanel.show();
            this._payPanel.hasPayInfo() && this._payPanel.show()
        },
        toggleDashBoard: function(a) {
            if (!("touchend" ==
                    a.type && 1 < a.changedTouches.length)) {
                this._sx = this._sx || 0;
                this._sy = this._sy || 0;
                a.changedTouches = a.changedTouches || [{
                    clientX: this._sx,
                    clientY: this._sy
                }];
                var b = {
                        x: this._sx,
                        y: this._sy
                    },
                    a = {
                        x: a.changedTouches[0].clientX,
                        y: a.changedTouches[0].clientY
                    };
                !this._stmtag && (1 !== this._sactionType && this.isTouchTooShort(b, a, 100)) && (b = this.setting.controls.style.display, "none" == b || "" == b ? (this.player._reporter.sendUserActionReport("xcd", "c"), this.showBoardInfo(), this.autoHideDashBoard(), fa = (new Date).getTime()) : (this.player._reporter.sendUserActionReport("xhd",
                    "c"), clearTimeout(this.dashboardTimer), this.hideDashBoard()))
            }
        },
        bindAdVideoBtnEvent: function() {
            b.addEventHandler(this.buttons.videobtn, "touchstart", b.bindAsEventListener(this, this.onVideoBtnTouchStart));
            b.addEventHandler(this.buttons.videobtn, "touchend", b.bindAsEventListener(this, this.onVideoBtnTouchEnd))
        },
        bindVideoBtnEvent: function() {
            b.addEventHandler(this.buttons.videobtn, "click", b.bindAsEventListener(this, this.onVideoBtnClick), !0)
        },
        bindEvent: function() {
            debug.log("bind event");
            this.bind_uireinit =
                b.bindAsEventListener(this, this.uiInit);
            this.bind_play = b.bindAsEventListener(this, this.play);
            this.bind_redirect = b.bindAsEventListener(this, this.redirect);
            this.bind_showTimeTip = b.bindAsEventListener(this, this.showTimeTip);
            this.bind_hideTimeTip = b.bindAsEventListener(this, this.hideTimeTip);
            this.bind_changeVolume = b.bindAsEventListener(this, this.changeVolume);
            this.bind_toggleVolume = b.bindAsEventListener(this, this.toggleVolume);
            this.bind_gestureChange = b.bindAsEventListener(this, this.onGestureChange);
            this.bind_toggleDashBoard =
                b.bindAsEventListener(this, this.toggleDashBoard);
            this.bind_retimer = b.bindAsEventListener(this, this.retimer);
            b.addEventHandler(this.progressBar, "click", this.bind_uireinit);
            b.addEventHandler(this.setting.controls, "click", this.bind_retimer);
            b.addEventHandler(this.setting.controls, "touchstart", this.bind_retimer);
            b.addEventHandler(this.buttons.playControl, "click", this.bind_play);
            "directsrc" == b.config.playType && (!d.isIPHONE && !d.isIPOD ? b.addEventHandler(this.buttons.videobtn, "click", this.bind_redirect, !0) :
                b.addEventHandler(this.buttons.videobtn, "click", b.bindAsEventListener(this, this.playIPH), !0));
            b.addEventHandler(this.buttons.shadow, "touchstart", b.bindAsEventListener(this, this.shadowTouchStart));
            b.addEventHandler(this.buttons.shadow, "touchmove", b.bindAsEventListener(this, this.shadowTouchMove));
            b.addEventHandler(this.buttons.shadow, "touchend", b.bindAsEventListener(this, this.shadowTouchEnd));
            b.addEventHandler(this.buttons.shadow, "click", this.bind_toggleDashBoard);
            b.addEventHandler(this.buttons.shadow,
                "touchend", b.bindAsEventListener(this, this.onMultiTouch));
            b.addEventHandler(this.buttons.shadow, "gesturechange", this.bind_gestureChange)
        },
        removeEvent: function() {
            debug.log("remove event begin");
            b.removeEventHandler(this.progressBar, "click", this.bind_uireinit);
            b.removeEventHandler(this.buttons.playControl, "click", this.bind_play);
            b.removeEventHandler(this.buttons.shadow, "click", this.bind_toggleDashBoard);
            b.removeEventHandler(this.progressBar, "touchstart", this.bind_uireinit);
            b.removeEventHandler(this._languagePanel,
                "click", this.bind_mutualHide);
            b.removeEventHandler(this._qualityPanel, "click", this.bind_mutualHide);
            b.removeEventHandler(this._playratePanel, "click", this.bind_mutualHide);
            this.progressBar.removeEvent();
            this.fullscreenPanel.removeEvent();
            this._languagePanel.removeEvent();
            this._qualityPanel.removeEvent();
            debug.log("remove event end")
        },
        onGestureChange: function(a) {
            a.preventDefault();
            var b = -1 !== this.fullscreenPanel.zoomStatus().indexOf("in");
            if (1.1 < a.scale && b || 0.9 > a.scale && !b) a.method = "m", this.fullscreenPanel.switchFullScreen(a)
        },
        toggleVolume: function() {},
        changeVolume: function() {},
        rePlay: function() {
            debug.log("replay");
            this.player._reporter.sendUserActionReport("xrp", "c");
            w = !1;
            (this._recommend = b.get(".x-recommend")) && b.get("#x-player").removeChild(this._recommend);
            this.resetProgress();
            this._first = !1;
            this.player.replay();
            debug.log("replay func end")
        },
        redirect: function(a) {
            this.player.redirect(a)
        },
        hideFacade: function() {
            var a = this.container.poster;
            b.hide(this.buttons.videobtn);
            b.hide(a);
            b.hide(b.get(".x-feedback"));
            debug.log("<font color=blue>hide facade</font>")
        },
        onVideoBtnTouchStart: function(a) {
            this._vtsx = a.targetTouches[0].clientX;
            this._vtsy = a.targetTouches[0].clientY
        },
        onVideoBtnTouchEnd: function(a) {
            debug.log("<font color=red>video btn clicked</font>");
            a = a || {};
            w ? this.rePlay() : a && a.changedTouches && 50 < Math.abs(a.changedTouches[0].clientY - this._vtsy) ? debug.log("videobtn too long y") : (this.player._reporter.sendUserActionReport("xps", "c"), !0 !== this._hasAdReq && (this._hasAdReq = !0, this.hideFacade(), debug.log("active src=" + this.player.video.src), this.player.video.load(),
                this.player.requestAd()))
        },
        onVideoBtnClick: function() {
            if ((d.isIPHONE || d.isIPOD) && null != b.v.data[0].trial) this.player.video.style.display = "block";
            w ? this.rePlay() : b.v.data[0].trial && 0 == b.v.data[0].trial.time || (this.player.video.load(), this.player.video.play())
        },
        playIPH: function() {
            if (!this.iphTag) {
                this.player.video.load();
                var a = this;
                this.player.video.addEventListener("timeupdate", function(b) {
                    4 == b.target.readyState && (a.iphTag = !0)
                })
            }
            this.player.video.play()
        },
        play: function(a) {
            a = a || {};
            if (w) this.rePlay();
            else {
                var b = this.player.video.paused;
                debug.log("m3u8 isPause = " + b + " e = " + a);
                b ? (0 === this._payPanel.activeTime ? (this._payPanel.activeTime = -1, this.player.seek(0)) : this.player.video.play(), this.player._reporter.sendUserActionReport("xpl", "c"), this.interactionPanel.setStatus("\u64ad\u653e")) : (this.player.video.pause(), this.player._reporter.sendUserActionReport("xpa", "c"), this.interactionPanel.setStatus("\u6682\u505c"));
                this.checkPauseAd()
            }
        },
        isProperWH: function(a, c) {
            var e = b.get("#x-player");
            return e.offsetWidth >=
                a && e.offsetHeight >= c
        },
        isNeedPauseAd: function() {
            return this.player.video.paused && b.isLandScape()
        },
        checkPauseAd: function() {
            this.isNeedPauseAd() ? (this._pauseAdPlugin = new N(this.player, b.v, b.videoInfo._sid), this._pauseAdPlugin.addEventListener(ADConstant.PAUSE_AD_INFO_OK, b.bindAsEventListener(this, this.onPauseAdInfoOK)), this._pauseAdPlugin.addEventListener(ADConstant.PAUSE_AD_INFO_TIMEOUT, b.bindAsEventListener(this, this.onPauseAdInfoTimeout)), this._pauseAdPlugin.addEventListener(ADConstant.PAUSE_AD_INFO_ERROR,
                b.bindAsEventListener(this, this.onPauseAdInfoERROR)), window[ADConstant.AdPluginObject] = this._pauseAdPlugin, this._pauseAdPlugin.pauseAd(), debug.log("send pause ad request<br/>")) : (debug.log("<font color=blue> donot need pause ad </font>"), this.hidePauseAd())
        },
        hidePauseAd: function() {
            b.hide(b.get(".x-ad-pause"))
        },
        onPauseAdInfoOK: function(a) {
            debug.log("pause info ok");
            this._pauseAdStart || (this._pauseAdStart = !0);
            this._pauseAdPlayer = new la(this.player, a);
            this._pauseAdPlayer.play()
        },
        onPauseAdInfoTimeout: function(a) {
            debug.log("pause info timeout = " +
                a.data.timeout);
            this._pauseAdStart || (this._pauseAdStart = !0)
        },
        onPauseAdInfoERROR: function() {
            debug.log("<font color=blue>pause info error no info</font>");
            this._pauseAdStart || (this._pauseAdStart = !0)
        },
        autoShow: function() {
            this.show();
            var a = this;
            setTimeout(function() {
                a.hide()
            }, 5E3)
        },
        mutualHide: function(a) {
            a._target == this._languagePanel ? (this._qualityPanel.hide(!0), this._playratePanel.hide(!0), this.showlistPanel.hide()) : a._target == this._qualityPanel ? (this._languagePanel.hide(!0), this._playratePanel.hide(!0),
                this.showlistPanel.hide()) : a._target == this.showlistPanel ? (this._qualityPanel.hide(!0), this._languagePanel.hide(!0), this._playratePanel.hide(!0)) : a._target == this._playratePanel && (this._qualityPanel.hide(!0), this._languagePanel.hide(!0), this.showlistPanel.hide())
        },
        show: function(a) {
            a ? b.show(this.buttons[a]) : b.show(this.setting.controls)
        },
        hide: function(a) {
            a ? b.hide(this.buttons[a]) : b.hide(this.setting.controls)
        },
        backAdPrepare: function() {
            this.dashboard.style.display = "none";
            this.buttons.shadow.display = "none"
        },
        onEnded: function() {
            this.dashboard.style.display = "none";
            this.buttons.shadow.display = "none";
            this.buttons.videobtn.style.display = "block";
            this.container.poster.style.display = "block";
            this._informationPanel.show();
            this.miniProgressBar.hide();
            this.interactionPanel.hide();
            null == b.v.data[0].trial && !1 != b.initConfig.show_related && (this._relatedPanel = new ia(this.player, b.v))
        },
        onPlay: function() {
            this.player.video.style.display = "block";
            this.buttons.play.className = this.setting.classNames.pause;
            this.buttons.videobtn.style.display =
                "none";
            this.container.poster.style.display = "none";
            this.hidePauseAd();
            this.buttons.shadow.style.display = "block";
            (this._recommend = b.get(".x-recommend")) && b.get("#x-player").removeChild(this._recommend);
            w = !1;
            this._first || (this._first = !0, this._informationPanel.show(), this.setting.controls.style.display = "block");
            this.autoHideDashBoard(5E3)
        },
        onPause: function() {
            this.buttons.play.className = this.setting.classNames.play;
            b.hide(this.buttons.loading);
            this.interactionPanel.isVisible() || (this.showBoardInfo(), this.interactionPanel.setStatus("\u6682\u505c"))
        },
        onWaiting: function() {
            !this.player.video.paused && "none" == this.buttons.videobtn.style.display && (this.buttons.loading.style.display = "block")
        },
        onTryPlayEnded: function() {
            debug.log("try end");
            var a = this.player.video;
            this.player.video.pause();
            this._payPanel.activeTime = 0;
            w = !0;
            this.onEnded({
                target: a
            });
            this._payPanel.showTip();
            var b = this;
            setTimeout(function() {
                b.dashboard.style.display = "none";
                b.buttons.shadow.style.display = "none";
                b.interactionPanel.hide()
            }, 1E3)
        },
        onTimeUpdate: function(a) {
            this.buttons.loading.style.display =
                "none";
            if (a.target == this.player.video) {
                var b = this.player.currentTime;
                4 == a.target.readyState && this.setProgress(b);
                if (this._payPanel.hasPayInfo() && b >= this._payPanel.tryDuration()) this.onTryPlayEnded();
                this.playLimit.isLimit() && b >= this.playLimit.limitTime() && this.playLimit.create()
            }
        },
        checkPlayLimit: function() {
            return this.playLimit.isLimit() ? (this.playLimit.create(), !0) : !1
        },
        removeControls: function() {
            this.video.controls = !1
        },
        loadControls: function() {
            this.video.controls = !0
        },
        setProgress: function(a) {
            a = Math.min(Math.max(a,
                0), b.videoInfo.totalTime);
            this.progressBar.setProgress(a);
            this.miniProgressBar.setProgress(a);
            this.buttons.currentTime.innerHTML = b.getTime(this.progressBar.playTime)
        },
        resetProgress: function() {
            this.progressBar.resetProgress();
            this.miniProgressBar.resetProgress();
            this.buttons.currentTime.innerHTML = "00:00"
        },
        hideTimeTip: function(a) {
            if (a.srcElement.id == this.buttons.progressHandler.id) return !1;
            this.buttons.progressTime.style.display = "none"
        },
        showTimeTip: function(a) {
            if (a.srcElement.id == this.buttons.progressHandler.id ||
                a.srcElement.id == this.buttons.progressTime.id || a.srcElement.id == this.buttons.pointVideo.id) return !1;
            a = a.offsetX / this.buttons.progressBar.offsetWidth;
            this.buttons.progressTime.innerHTML = b.getTime(a * b.videoInfo.totalTime);
            this.buttons.progressTime.style.left = 100 * Math.min(Math.max(a, 0.023), 0.977) + "%";
            this.buttons.progressTime.style.display = "block"
        },
        shadowTouchStart: function(a) {
            1 < a.targetTouches.length ? this.interactionPanel.hide() : (this._sx = a.targetTouches[0].clientX, this._sy = a.targetTouches[0].clientY,
                this._smx = this._sx, this._smy = this._sy, this._presmx = this._sx, this._presmy = this._sy, this._deltaxs = [], this._ttime = this._stime = this.player.currentTime || 0, this._spretag = this._stmtag = !1, this._presmt = this._sactionTime = (new Date).getTime(), this._stmlrtag = this._sactionType = 0)
        },
        shadowTouchMove: function(a) {
            if (1 < a.targetTouches.length) this.interactionPanel.hide();
            else {
                this._smx = a.targetTouches[0].clientX;
                this._smy = a.targetTouches[0].clientY;
                this._smt = (new Date).getTime();
                var b = Math.abs(this._smx - this._sx),
                    e =
                    Math.abs(this._smy - this._sy),
                    d = this._smt - this._sactionTime;
                0 === this._stmlrtag && (this._stmlrtag = b > e ? 1 : -1);
                1 == this._stmlrtag && a.preventDefault();
                if (1 != this._sactionType)
                    if (100 < b && b > e && 500 > d) debug.log("quick seek moving"), this.player.video.pause(), this._sactionType = 1, d = this._smx > this._sx ? 30 : -30, this.interactionPanel.setTip(this._stime, d), this.interactionPanel.show();
                    else if (200 > b && (100 > e && 1E3 < d) && (this._spretag = !0), this._spretag && b > e || this._stmtag) debug.log("stmtag =" + this._stmtag), this._sactionType =
                    2, this._stmtag = !0, this.player.video.pause(), this.dragging(a)
            }
        },
        shadowTouchEnd: function(a) {
            1 < a.changedTouches.length ? this.interactionPanel.hide() : (this.adrAdapt(a), this.isShadowTouchTooShort() && !this._stmtag && 1 != this._sactionType ? debug.log("too short or horizontal") : (a = Math.abs(this._smy - this._sy) > Math.abs(this._smx - this._sx) ? "xdud" : "xdlr", debug.log("shadow action = " + a), this.player._reporter.sendUserActionReport(a, "d"), 2 == this._sactionType ? (debug.log("<br/><b>normal seek</b>"), this.player.video.play(),
                this.player.seek(this._ttime), this.interactionPanel.hide(), this.player._reporter.sendUserActionReport("xtseek", "d"), d.Log(d.uniplayerUrl + r({
                    e: "xtseek",
                    adr: d.isAndroid,
                    ios: d.isIPAD,
                    d: parseInt(this._ttime - this._stime)
                }))) : 1 == this._sactionType && (a = 0 < this._smx - this._sx ? 30 : -30, debug.log("<br/><font color=red>quick seek deltat = " + a + " cur=" + this._stime + "</font>"), this.setProgress(this._stime + a), this.interactionPanel.setTip(this._stime, a), this.interactionPanel.show(), this.interactionPanel.autoHide(), this.player.video.play(),
                this.player.seek(this._stime + a), this.player._reporter.sendUserActionReport("xqseek", "d"), d.Log(d.uniplayerUrl + r({
                    e: "xqseek",
                    adr: d.isAndroid,
                    ios: d.isIPAD,
                    d: a
                })), debug.log("<br/>"))))
        },
        dragging_: function(a) {
            var c = this._smx - this._presmx;
            this._deltaxs.push(10 < c ? c / 2 : c);
            for (var e = c = 0; e < this._deltaxs.length; e++) c += this._deltaxs[e];
            a = Math.min(Math.max(c / a.currentTarget.offsetWidth * b.videoInfo.totalTime + this._stime, 0), b.videoInfo.totalTime);
            this.setProgress(a);
            this.interactionPanel.show();
            this._ttime = a;
            this._presmx =
                this._smx;
            this._presmy = this._smy;
            this._presmt = this._smt
        },
        dragging: function(a) {
            a = Math.min(Math.max(60 * ((this._smx - this._sx) / a.currentTarget.offsetWidth) + this._stime, 0), b.videoInfo.totalTime);
            this.setProgress(a);
            this.interactionPanel.setTip(this._ttime, a - this._ttime);
            this.interactionPanel.show();
            this._ttime = a;
            this._presmx = this._smx;
            this._presmy = this._smy;
            this._presmt = this._smt
        },
        onProgress: function(a) {
            this.interactionPanel.setTip(a.st || 0, a.dt || 0);
            this.interactionPanel.show()
        },
        onProgressEnd: function() {
            this.interactionPanel.hide()
        },
        onSettingDone: function() {
            this.interactionPanel.setStatus("\u8bbe\u7f6e\u6210\u529f")
        },
        onSettingShow: function() {
            debug.log("<b>setting show</b>");
            clearTimeout(this.pbarClickTimer);
            this.progressBar.removeClickEvent()
        },
        onSettingHide: function() {
            debug.log("<b>setting hide</b>");
            var a = this;
            this.pbarClickTimer = setTimeout(function() {
                a.progressBar.addClickEvent()
            }, 1E3)
        },
        onEnterFullScreen: function() {
            d.isIPAD && b.addClass(this.setting.controls, "x-fs-console")
        },
        onExitFullScreen: function() {
            d.isIPAD && b.removeClass(this.setting.controls,
                "x-fs-console")
        },
        adrAdapt: function(a) {
            d.isAndroid && (this._smx = a.changedTouches[0].clientX, this._smy = a.changedTouches[0].clientY, debug.log("<hr/>adr smy= " + this._smy + " y = " + this._sy))
        },
        isShadowTouchTooShort: function(a) {
            return this.isTouchTooShort({
                x: this._sx,
                y: this._sy
            }, {
                x: this._smx,
                y: this._smy
            }, a)
        },
        isTouchTooShort: function(a, b, e) {
            var d = Math.abs(b.x - a.x),
                d = d || 1.0E-6,
                a = (a = Math.abs(b.y - a.y)) || 1.0E-6;
            debug.log(d + "," + a);
            e = e || 100;
            return d < e && a < e ? !0 : !1
        },
        showShowListBtn: function() {
            this.showlistPanel.showListBtn()
        },
        hideShowListBtn: function() {
            this.showlistPanel.hideListBtn()
        },
        showLastTimeTip: function(a) {
            0 >= a || this.tipPanel.showLastTimeTip(a)
        },
        uiInit: function() {
            debug.log("uiInit");
            w && (w = !1, this.buttons.videobtn.style.display = "block")
        },
        onResize: function(a) {
            var c = q(b.config.parentBox).offsetWidth,
                e = q(b.config.parentBox).offsetHeight;
            if (c && (e && b.resizeTag) && (e = this.xplayer.className, this.xplayer && (-1 === e.indexOf("fullscreen") ? this.xplayer.className = z(c) : (c = window.innerWidth, this.xplayer.className = z(c) + " x-player-fullscreen")),
                    this._relatedPanel)) this._relatedPanel.onResize(a)
        }
    };
    var O = function() {
        this.video = b.get("#youku-html5player-video");
        this._startPlayTime = -1;
        this.currentTime = this._waitTry = 0
    };
    O.prototype = {
        getVideo: function() {
            return this.video
        },
        show: function() {
            b.show(this.video)
        },
        hide: function() {
            b.hide(this.video)
        },
        play: function() {
            b.v && b.v.data[0].trial && 0 == b.v.data[0].trial.time ? debug.log("<b> trial time = 0  </b>") : this.video.play()
        },
        pause: function() {
            this.video.pause()
        },
        setupControls: function(a) {
            this.controls && this.controls.removeEvent();
            return new oa(a)
        },
        hideControls: function() {
            this.controls.hide()
        },
        showControls: function() {
            this.controls.show()
        },
        removeControls: function() {
            this.controls.removeControls()
        },
        loadControls: function() {
            this.controls.loadControls()
        },
        retry: function() {},
        showError: function(a) {
            this.errorBox || (this.errorBox = document.createElement("div"), this.errorBox.style.cssText = "position:absolute;width:100%;top:50%;display:none;text-align:center;", this.video.parentNode.appendChild(this.errorBox));
            this.errorBox.innerHTML = a;
            this.errorBox.style.marginTop =
                "-" + this.errorBox.offsetHeight / 2 + "px";
            this.errorBox.style.display = "block"
        },
        onLoadStart: function() {},
        onCanPlay: function() {},
        onLoadedData: function() {},
        onLoadedMetaData: function() {},
        onAbort: function() {},
        onError: function() {
            this._reporter.sendUserActionReport("xve", "e");
            this._reporter.sendUepReport("videoload", -1, !1);
            d.uniReport({
                error: 10,
                vid: b.v.data[0].videoid,
                time: this.currentTime,
                errorcode: this.video.error.code,
                ua: escape(navigator.userAgent.replace(/[\/\+\*@\(\)\,]/g, ""))
            });
            d.sendErrorReport(2001);
            if (0 <= this._retry--) - 1 !== this.video.src.indexOf("m3u8") && (this.video.src = b.m3u8src_v2(b.v.data[0].videoid, b.defaultVideoType)), debug.log("video onerror retry it ,time=" + this.currentTime + " src=" + this.video.src), this.video.load(), this.video.play(), this.seek(this.currentTime);
            else if (!(this.isOnePiece() && !0 == this.controls.checkPlayLimit()) && !this._errorTag) {
                d.uniReport({
                    error: 11,
                    errorcode: this.video.error.code,
                    vid: b.v.data[0].videoid,
                    ua: escape(navigator.userAgent.replace(/[\/\+\*@\(\)\,]/g, ""))
                });
                this._errorTag = !0;
                if (b.playerEvents && b.playerEvents.onPlayError) b.playerEvents.onPlayError("\u62b1\u6b49\uff0c\u89c6\u9891\u51fa\u9519\uff0c\u8bf7\u5237\u65b0");
                var a = b.get("#x-player");
                a.innerHTML = "\u62b1\u6b49\uff0c\u89c6\u9891\u51fa\u9519\uff0c\u8bf7\u5237\u65b0";
                a.style.textAlign = "center";
                a.style.color = "white";
                a.style.lineHeight = a.offsetHeight + "px"
            }
        },
        onPause: function() {
            this.controls.onPause()
        },
        onPlayIPH: function() {
            debug.log("onplayiph");
            this.onPlayStart();
            this._firstPlayTag ? !0 == this._endedIPH && (this._reporter.tsInit(),
                this._reporter.sendVVLog(62), this._reporter.sendTSLog(60), this._reporter.addPlayerDurationReport(62)) : (this._firstPlayTag = !0, this._reporter.addPlayerStaticReport(), this._reporter.addPlayerDurationReport(59), this._reporter.sendVVLog(59), this._reporter.sendTSLog(60), this._reporter.sendUserActionReport("xps", "c"), this._reporter.sendLoadedTime(3), this._reporter.sendThirdPartyReport("xplayer_iph"), this._reporter.sendClientConsumeReport())
        },
        onTimeUpdateIPH: function() {
            this.currentTime = this.video.currentTime
        },
        onEndedIPH: function() {
            this.onPlayEnd();
            this._reporter.addPlayerDurationReport(61);
            this._reporter.sendTSLog(61);
            this._endedIPH = !0
        },
        onPlay: function() {
            debug.log("onplay");
            this.controls.onPlay();
            this._firstPlayTag || (this._firstPlayTag = !0, this.onPlayStart(), b.initConfig.firsttime ? (debug.log("starttime = " + b.initConfig.firsttime), this.seek(b.initConfig.firsttime)) : this.seekToLastPoint() || this.skipHead(), this._startPlayTime = (new Date).getTime(), this._reporter.addPlayerStaticReport(), this._reporter.addPlayerDurationReport(59),
                this._reporter.sendVVLog(59), this._reporter.sendTSLog(60), this._reporter.sendClientConsumeReport());
            l.appendItem("phase", "videoplay")
        },
        onVolumeChange: function() {},
        onPlaying: function() {},
        onStalled: function(a) {
            debug.log("<b>stalled</b>");
            if (this.isOnePiece() || a.target == this.video) this.controls.onWaiting(a)
        },
        onSuspend: function() {},
        onWaiting: function(a) {
            if (this.isOnePiece() || a.target == this.video) this.controls.onWaiting(a)
        },
        onSeeked: function() {
            debug.log("onSeeked waitSkip=" + this._waitSeek + " try= " + this._waitTry);
            if (!isNaN(this._waitSeek)) {
                var a = this._waitSeek;
                10 < Math.abs(this.video.currentTime - a) && 5 >= this._waitTry ? (this._waitTry += 1, this.seek(a)) : this._waitSeek = "NaN"
            }
        },
        onSeeking: function(a) {
            debug.log("seeking");
            if (this.isOnePiece() || a.target == this.video) {
                var b = this;
                setTimeout(function() {
                    b.controls.onWaiting(a)
                }, 100)
            }
        },
        onDurationChange: function() {},
        onProgress: function() {},
        onRateChange: function() {},
        customWaiting: function() {
            var a = this;
            !1 == this.video.paused && this._lastTime === this.currentTime && (debug.log("custom waiting!:) networkstate=" +
                this.video.networkState), this.controls.onWaiting());
            this._lastTime = this.currentTime;
            setTimeout(function() {
                a.customWaiting()
            }, 5E3)
        },
        sendLoadedTime: function() {
            var a = 0,
                a = -1 == this._startPlayTime ? 0 : (new Date).getTime() - this._startPlayTime;
            this._reporter.sendLoadedTime(a)
        },
        onTimeUpdate: function(a) {
            if (this.isOnePiece()) this.currentTime = this.video.currentTime, b.unitedTag && (this.currentTime -= b.unitedTag.offset);
            else {
                for (var c = 0, e = 0; e < s; e++) c += parseInt(b.videoInfo._videoSegsDic[m][e].seconds);
                this.currentTime =
                    c + this.video.currentTime
            }
            this.controls.onTimeUpdate(a);
            this._firstflag || (this._firstflag = !0, this.customWaiting(), this.recordLocalPlayPoint(), this.sendLoadedTime(), l.appendItem("phase", "videotimeupdate"), d.isNeedAdrTrick() && d.adrInvalidPauseCheck(this.video));
            this._comscoreflag || (this._comscoreflag = !0, this._reporter.sendThirdPartyReport("xplayer_h5"));
            this.skipTail(this.currentTime)
        },
        curVideo: function() {
            return this.video
        },
        getQuality: function() {
            if ("m3u8" == b.config.content) {
                var a = this.video.src;
                if (-1 !==
                    a.indexOf("mp4")) return "m";
                if (-1 !== a.indexOf("flv")) return "f";
                if (-1 !== a.indexOf("hd2")) return "h"
            } else return "m"
        },
        bufferedEnd: function() {
            var a = this.curVideo().buffered;
            return 0 == a.length ? 0 : a.end(a.length - 1)
        },
        loadNextVideo: function() {
            var a = b.v.data[0].list_next,
                c = this;
            debug.log("loadNextVideo vid = " + a.vidEncoded);
            if (a.vidEncoded) {
                var e = {
                    isFullScreen: !0,
                    vid: a.vid,
                    vidEncoded: a.vidEncoded,
                    Pt: 2 == window.playmode ? a.seq : null
                };
                b.config.nextAutoPlay = !0;
                k.start(a.vidEncoded, "", b.config.content, function(a, b) {
                    c.startPlay(a,
                        b);
                    try {
                        onPlayerStart(e)
                    } catch (d) {
                        console.log("onPlayerStart error")
                    }
                })
            }
        },
        onPlayEnd: function() {
            d.playerCurrentState = d.playerState.PLAYER_STATE_END;
            debug.log(d.playerCurrentState);
            b.config.events && b.config.events.onPlayEnd && (debug.log("callback: on play end"), b.config.events.onPlayEnd(b.v.data[0].list_next))
        },
        onPlayStart: function() {
            b.config.events && b.config.events.onPlayStart && (d.playerCurrentState = d.playerState.PLAYER_STATE_PLAYING, debug.log(d.playerCurrentState), debug.log("callback: on play start"),
                b.config.events.onPlayStart())
        },
        onMiddleEnded: function() {
            s++;
            this.video.src = b.multiPieceSrc(s);
            this.video.load();
            this.video.play();
            this.video.style.display = "block";
            debug.log("middle src = " + this.video.src)
        },
        onEnded: function(a) {
            if (!(this.isOnePiece() && !0 == this.controls.checkPlayLimit()))
                if (this.isOnePiece() || s == b.videoInfo._videoSegsDic[m].length - 1) w = !0, this._reporter.addPlayerDurationReport(61), this._reporter.sendTSLog(61), this.clearLocalPlayPoint(), this.showEndCard(a), l.appendItem("phase", "videoended");
                else this.onMiddleEnded(a)
        },
        showEndCard: function(a) {
            this.video.style.display = "none";
            this.controls.onEnded(a);
            this.onPlayEnd()
        },
        onBeginFullscreen: function() {},
        onEndFullscreen: function() {
            if ((d.isIPHONE || d.isIPOD) && null != b.v.data[0].trial) this.video.style.display = "none"
        },
        detectIsPlaying: function(a) {
            var b = a || 0,
                e = this;
            clearTimeout(this.timeoutTimer);
            0 === this.video.currentTime && 60 >= b && (this.video.load(), this.play(), this.timeoutTimer = setTimeout(function() {
                e.detectIsPlaying(++b)
            }, 1E3))
        },
        isOnePiece: function() {
            return "m3u8" ==
                b.config.content || "mp4" == b.config.content && 1 == b.videoInfo._videoSegsDic[m].length
        },
        bindEvent: function() {
            if (!b.v.data[0].error_code && !b.v.data[0].error)
                if ("directsrc" == b.config.playType && !1 == b.isWeixin) b.addEventHandler(this.video, "play", b.bindAsEventListener(this, this.onPlayIPH)), b.addEventHandler(this.video, "timeupdate", b.bindAsEventListener(this, this.onTimeUpdateIPH)), b.addEventHandler(this.video, "ended", b.bindAsEventListener(this, this.onEndedIPH)), b.addEventHandler(this.video, "webkitendfullscreen",
                    b.bindAsEventListener(this, this.onEndFullscreen));
                else {
                    var a = {
                            loadstart: "onLoadStart",
                            canplay: "onCanPlay",
                            loadeddata: "onLoadedData",
                            loadedmetadata: "onLoadedMetaData",
                            abort: "onAbort",
                            error: "onError",
                            pause: "onPause",
                            waiting: "onWaiting",
                            stalled: "onStalled",
                            suspend: "onSuspend",
                            play: "onPlay",
                            volumechange: "onVolumeChange",
                            playing: "onPlaying",
                            seeked: "onSeeked",
                            seeking: "onSeeking",
                            durationchange: "onDurationChange",
                            progress: "onProgress",
                            ratechange: "onRateChange",
                            timeupdate: "onTimeUpdate",
                            ended: "onEnded",
                            webkitbeginfullscreen: "onBeginFullscreen",
                            webkitendfullscreen: "onEndFullscreen"
                        },
                        c;
                    for (c in a) b.addEventHandler(this.video, c, b.bindAsEventListener(this, this[a[c]]))
                }
        }
    };
    var s = -1,
        w = !1,
        m = null,
        fa = 0,
        ga = 600,
        u = {
            flvhd: "\u6807\u6e05",
            flv: "\u6807\u6e05",
            mp4: "\u9ad8\u6e05",
            hd2: "\u8d85\u6e05"
        };
    b.WIN_TYPE = 30;
    b.defaultVideoType = "mp4";
    b.resizeTag = !0;
    b.extend = function(a, b) {
        for (var e in b) a[e] = b[e]
    };
    b.inherits = function(a, b) {
        var e = function() {};
        e.prototype = b.prototype;
        a.prototype = new e;
        a.prototype.constructor = a
    };
    b.bind = function(a, b) {
        return function() {
            return b.apply(a,
                arguments)
        }
    };
    b.bindAsEventListener = function(a, b) {
        var e = Array.prototype.slice.call(arguments).slice(2);
        return function(d) {
            return b.apply(a, [d || window.event].concat(e))
        }
    };
    b.getCurrentStyle = function(a) {
        return a.currentStyle || document.defaultView.getComputedStyle(a, null)
    };
    b.addEventHandler = function(a, c, e, d) {
        b.config.isMobile && ("click" == c && !d) && (c = "touchend");
        a.addEventListener ? a.addEventListener(c, e, !1) : a.attachEvent ? a.attachEvent("on" + c, e) : a["on" + c] = e
    };
    b.removeEventHandler = function(a, c, e, d) {
        b.config.isMobile &&
            ("click" == c && !d) && (c = "touchend");
        a.removeEventListener ? a.removeEventListener(c, e, !1) : a.detachEvent ? a.detachEvent("on" + c, e) : a["on" + c] = null
    };
    b.show = function(a) {
        a.style.display = "video" === a.tagName.toLowerCase() ? "" : "block"
    };
    b.hide = function(a) {
        a && (a.style.display = "none")
    };
    b.getLeftPosition = function(a) {
        for (var b = a.offsetLeft; a.offsetParent;) a = a.offsetParent, b += a.offsetLeft;
        return b
    };
    b.get = function(a) {
        return document.querySelector(a)
    };
    b.pieceLength = function() {
        return "m3u8" == b.config.content ? 1 : b.videoInfo._videoSegsDic[m].length
    };
    b.multiPieceSrc = function(a) {
        return a >= b.videoInfo._videoSegsDic[m].length ? "" : b.videoInfo._videoSegsDic[m][a].src
    };
    b.getTime = function(a) {
        if (!a) return "00:00";
        var b = Math.floor(a),
            a = b % 60,
            b = Math.floor(b / 60);
        return (10 > b ? "0" + b : b) + ":" + (10 > a ? "0" + a : a)
    };
    b.addClass = function(a, c) {
        b.hasClass(a, c) || (a.className += " " + c)
    };
    b.hasClass = function(a, b) {
        return RegExp("(^| )" + b + "( |$)").test(a.className)
    };
    b.removeClass = function(a, b) {
        a.className = a.className.replace(RegExp("(^| )" + b + "( |$)"), " ").replace(/^\s+|\s+$/g, "")
    };
    b.m3u8src = function(a, b) {
        var e = "http://v.youku.com/player/getM3U8/vid/" + a + "/type/" + b + "/ts/" + parseInt((new Date).getTime() / 1E3);
        if (d.isIPHONE || d.isIPOD) e += "/useKeyFrame/0";
        return e + "/v.m3u8"
    };
    b.m3u8src_v2 = function(a, c) {
        if (b.OLD_M3U8) return b.m3u8src(a, c);
        var e = {
            vid: a,
            type: c,
            ts: parseInt((new Date).getTime() / 1E3),
            keyframe: d.isIPHONE ? 0 : 1
        };
        b.password && (e.password = b.password);
        b.password && (b.initConfig.client_id && b.config.partner_config && 1 == b.config.partner_config.status && 1 == b.config.partner_config.passless) &&
            (e.client_id = b.initConfig.client_id);
        var f = encodeURIComponent(E(F(G(b.mk.a4 + "poz" + d.userCache.a2, [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26]).toString(), d.userCache.sid + "_" + a + "_" + d.userCache.token)));
        e.ep = f;
        e.sid = d.userCache.sid;
        e.token = d.userCache.token;
        e.ctype = "12";
        e.ev = "1";
        e.oip = b.v.data[0].ip;
        e = "http://pl.youku.com/playlist/m3u8?" + n(e);
        "" != b.getUCStr(a) && (e += b.getUCStr(a));
        return e
    };
    b.isLandScape = function() {
        return 90 == window.orientation ||
            -90 == window.orientation
    };
    b.getUCStr = function(a) {
        var c = "";
        if ("undefined" != typeof getUCSecret) a = getUCSecret(a), c += "&xk=" + a;
        else if ("undefined" != typeof uckey) var e = uckey.getUCKey(a),
            c = c + ("&vid=" + a + "&uc_param_str=xk&xk=" + e);
        else !0 == b.isUCBrowserAndValidVersion() && (c += "&vid=" + a + "&uc_param_str=xk");
        return c
    };
    b.isUCBrowserAndValidVersion = function() {
        var a = navigator.userAgent,
            b = a.search(/ucbrowser/i);
        return -1 != b && 9.8 <= parseFloat(a.substr(b + 10, 4)) ? !0 : !1
    };
    var q = function(a) {
        return document.getElementById(a)
    };
    YoukuHTML5Player = function(a, c) {
        null == a.parentBox && (a.parentBox = "parentBox");
        a.expand && 0 < parseInt(a.width) ? (q(a.parentBox).style.width = a.width + "px", q(a.parentBox).style.height = a.height + "px") : (a.width = q(a.parentBox).offsetWidth, a.height = q(a.parentBox).offsetHeight);
        b.config = a;
        var e = q(b.config.parentBox),
            d = parseInt(b.config.width);
        parseInt(b.config.height);
        playerDom = '<div id=x-player class="' + z(d) + '">';
        d = "";
        b.isWeixin && (d = "webkit-playsinline", b.initConfig.iswifi && (d += " autoplay"));
        e.innerHTML = playerDom +
            "<video class=x-video-player id=youku-html5player-video  " + d + '></video><div class=x-video-poster><img></img></div><div class=x-video-loading></div><div class=x-video-info><h1 class=x-title></h1><div class=x-video-state></div><div class=x-showmore></div><div class=x-mask></div></div><div id=x-video-button class=x-video-button><div class=x-video-play-ico></div></div><div class=x-feedback><div class="x-message"><div class=x-message-txt></div><div class=x-message-btn></div></div><div class="x-mask"></div></div><div class="x-pay"><div class=x-pay-txt><h1><em class=vip></em></h1><p class=x-pay-tips></p></div><div class=x-pay-btn><button type=button id=x-try class=x-btn>\u514d\u8d39\u8bd5\u770b</button><button type=button id=x-pay class="x-btn x-btn-pay"></button></div></div><div class=x-advert><div class=x-advert-info><div class=x-advert-skip><div class=x-advert-txt></div><div class=x-mask></div></div><div class=x-advert-countdown><div class=x-advert-txt></div><div class=x-mask></div></div></div><div class=x-advert-detail><div class=x-advert-txt>\u8be6\u7ec6\u4e86\u89e3<span class=x-ico-detail></span></div><div class=x-mask></div></div></div><div class=x-ad-pause></div><div class=x-prompt></div><div class="x-dashboard"><div class=x-progress-mini><div class=x-progress-track-mini></div><div class=x-progress-load-mini></div><div class=x-progress-play-mini></div></div><div class="x-console"><div class="x-progress"><div class="x-progress-track"><div class="x-progress-load"></div><div class=x-progress-play></div><div class="x-progress-seek"><div class="x-seek-handle"></div></div></div></div><div class="x-controls"><div class="x-play-control"><button class="x-control-btn"><b id=x-playbtn class="x-playing"><em>\u64ad\u653e</em></b></button></div><div class="x-time-display"><span class="x-time-current">00:00</span><span class="x-time-splite">/</span><span class="x-time-duration">00:00</span></div><div class="x-settings"><div class=x-playspeed></div><div class=x-playshow style=display:none><button class=x-control-btn title=\u9009\u96c6>\u9009\u96c6</button></div><div class="x-localization"></div><div class="x-quality"></div><div class="x-fullscreen"><button class="x-control-btn" type="button" title="\u5168\u5c4f\u6a21\u5f0f" rol="button"><b class=x-zoomin><em>\u5168\u5c4f</em></b></button></div></div></div></div></div><div class=x-showlist></div><div class=x-tips></div><div class=x-trigger></div></div>';
        O.apply(this, arguments);
        this.video.style.width = "100%";
        this.video.style.height = "100%";
        this.video.style.display = "none";
        this.video.style.position = "relative";
        this._firstPlayTag = !1;
        this._retry = 2;
        this.uiAdapter()
    };
    b.inherits(YoukuHTML5Player, O);
    b.extend(YoukuHTML5Player.prototype, {
        startPlay: function(a, c, e) {
            if (a && (a.data && a.data[0]) && (a.data[0].show = a.data[0].show || {}, c.abstarttime = (new Date).getTime(), c._playListData = a.data[0], c._user = a.user, b.v = a, b.videoInfo = c, this.setting = {}, b.extend(this.setting, e), !a.data[0].error_code && !a.data[0].error || !this.processError(a, c, e)))
                if (this._reporter = new L(this, b.v, b.videoInfo._sid), this.controls = this.setupControls(this), this.controls.init(b.v, b.videoInfo), this.mpieceReport(), this.createIdNode(), this.isNeedAdRequest()) this.processAd();
                else if (this.controls.bindVideoBtnEvent(), this.realStartPlay(), 1 == b.initConfig.ucautoplay) this.controls.onVideoBtnClick({})
        },
        isNeedAdRequest: function() {
            "undefined" == typeof this._frontAdTag && (this._frontAdTag = !1);
            d.isNeedFrontAd = !this._frontAdTag && "directsrc" != b.config.playType && !b.v.data[0].trial;
            return d.isNeedFrontAd
        },
        processAd: function() {
            if (this.isNeedAdRequest() && (this._frontAdTag = !0, this._adplugin = new N(this, b.v, b.videoInfo._sid), this.bind_frontAd = b.bindAsEventListener(this, this.onFrontAdInfoOK), this.bind_frontAdInfoTimeout = b.bindAsEventListener(this, this.onFrontAdInfoTimeout), this._adplugin.addEventListener(ADConstant.FRONT_AD_INFO_OK, this.bind_frontAd, !1), this._adplugin.addEventListener(ADConstant.FRONT_AD_INFO_TIMEOUT,
                    this.bind_frontAdInfoTimeout), this.bind_unitedFrontAd = b.bindAsEventListener(this, this.onUnitedFrontAdInfoOK), this._adplugin.addEventListener(ADConstant.FRONT_AD_UNITED_INFO_OK, this.bind_unitedFrontAd, !1), this.bind_backAdInfoOK = b.bindAsEventListener(this, this.onBackAdInfoOK), this.bind_backAdInfoTimeout = b.bindAsEventListener(this, this.onBackAdInfoTimeout), this._adplugin.addEventListener(ADConstant.BACK_AD_INFO_OK, this.bind_backAdInfoOK, !1), this._adplugin.addEventListener(ADConstant.BACK_AD_INFO_TIMEOUT,
                    this.bind_backAdInfoTimeout), this.bind_uglyCloseAd = b.bindAsEventListener(this, this.onUglyCloseAd), this._adplugin.addEventListener(ADConstant.UGLY_CLOSE_AD, this.bind_uglyCloseAd), this.controls.bindAdVideoBtnEvent(), window[ADConstant.AdPluginObject] = this._adplugin, 1 == b.initConfig.ucautoplay)) this.controls.onVideoBtnTouchEnd({})
        },
        requestAd: function() {
            this._adplugin && this._adplugin.frontAd()
        },
        onUglyCloseHint: function() {
            this.controls.showUglyHint()
        },
        onUglyCloseAd: function() {
            debug.log("ugly close");
            this.controls.closeUglyHint();
            this.adplayer.uglyClose()
        },
        onFrontAdInfoTimeout: function() {
            this._hasStartPlay = !0;
            this.realStartPlay(!0)
        },
        onUnitedFrontAdInfoOK: function(a) {
            debug.log("<b>on united front adinfo ok</b>");
            var c = a.data.info;
            if (0 == a.data.info.VAL.length) debug.log("<b>onUnitedFrontAdInfoOK val length == 0 </b>"), this.loadVTVC(a.data.vtvc), this.video.src = b.m3u8src_v2(b.v.data[0].videoid, b.defaultVideoType), this.unitedStartPlay(c, !0);
            else {
                this.adplayer = new na(this, a);
                var e = this;
                this.adplayer.addEventListener(ADConstant.AD_END,
                    function() {
                        debug.log("<font color=red>united ad end</font>");
                        e._realFlag || (e._realFlag = !0, e.adplayer.clearTimer(), e.unitedStartPlay(c))
                    }, !1);
                this.adplayer.addEventListener(ADConstant.AD_ERROR, function() {
                    debug.log("<font color=red>united ad error</font>");
                    e._realFlag || (b.unitedTag = null, e._realFlag = !0, e.adplayer.clearTimer(), e.video.src = b.m3u8src_v2(b.v.data[0].videoid, b.defaultVideoType), e.unitedStartPlay(c, !0))
                }, !1);
                this.adplayer.addEventListener(ADConstant.UGLY_CLOSE_AD_HINT, function() {
                    debug.log("<b>ugly hint</b>");
                    e.onUglyCloseHint()
                }, !1);
                this.adplayer.play();
                this.createIdNode()
            }
        },
        loadVTVC: function(a) {
            for (var b = 0; b < a.length; b++) y(a[b].VC, "js")
        },
        onFrontAdInfoOK: function(a) {
            debug.log("onFrontAdInfoOK");
            if (!0 !== this._hasStartPlay)
                if (0 == a.data.urls.length) this.loadVTVC(a.data.vtvc), this.realStartPlay(!0);
                else {
                    d.playerCurrentState = d.playerState.PLAYER_STATE_AD;
                    debug.log(d.playerCurrentState);
                    this.adplayer = new M(this, a);
                    var b = this;
                    this.adplayer.addEventListener(ADConstant.AD_END, function(a) {
                        debug.log("ad end");
                        b._realFlag ||
                            (b._realFlag = !0, b.adplayer.clearTimer(), b.realStartPlay(a.data))
                    }, !1);
                    this.adplayer.addEventListener(ADConstant.AD_ERROR, function(a) {
                        debug.log("<font color=red>ad error</font>");
                        b._realFlag || (b._realFlag = !0, b.adplayer.clearTimer(), b.realStartPlay(a.data))
                    }, !1);
                    this.adplayer.addEventListener(ADConstant.UGLY_CLOSE_AD_HINT, function() {
                        debug.log("<b>ugly hint</b>");
                        b.onUglyCloseHint()
                    }, !1);
                    this.adplayer.play();
                    this.createIdNode()
                }
        },
        onBackAdInfoTimeout: function() {
            debug.log("onBackAdInfoTimeout");
            this.showEndCard()
        },
        onBackAdInfoOK: function(a) {
            debug.log("onBackAdInfoOK");
            if (0 == a.data.urls.length) this.showEndCard();
            else {
                this.adplayer = new M(this, a);
                var b = this;
                this.adplayer.addEventListener(ADConstant.AD_END, function() {
                    b.showEndCard()
                });
                this.adplayer.addEventListener(ADConstant.AD_ERROR, function() {
                    b.showEndCard()
                });
                this.adplayer.play()
            }
        },
        prepareVideoTag: function() {
            this.video.preload = "none";
            "m3u8" == b.config.content ? this.video.src = b.videoInfo.src : null != b.videoInfo._videoSegsDic && null != b.videoInfo._videoSegsDic[m] &&
                (this.video.src = b.videoInfo._videoSegsDic[m][0].src);
            b.v.data[0].trial && 0 == b.v.data[0].trial.time && (this.video.src = null);
            this.createIdNode()
        },
        createIdNode: function() {
            if (!q(b.config.id)) {
                var a = document.createElement("div");
                a.id = b.config.id;
                q(b.config.parentBox).appendChild(a)
            }
        },
        redirect: function() {
            var a = "";
            "m3u8" == b.config.content ? a = b.videoInfo.src : null != b.videoInfo._videoSegsDic && null != b.videoInfo._videoSegsDic[m] && (a = b.videoInfo._videoSegsDic[m][0].src);
            debug.log("redirect play src=" + a);
            this._reporter.addPlayerStaticReport();
            this._reporter.addPlayerDurationReport(59);
            this._reporter.sendVVLog(59);
            this._reporter.sendTSLog(60);
            this._reporter.sendUserActionReport("xps", "c");
            window.open(a, "", "", !1);
            this._reporter.sendClientConsumeReport();
            this.onPlayStart()
        },
        realStartPlay: function(a) {
            debug.log("realStartPlay " + a);
            this.controls.bindEvent();
            this.bindEvent();
            this.prepareVideoTag();
            this.playVideos(a)
        },
        unitedStartPlay: function(a, c) {
            debug.log("<b>united start play </b>");
            b.unitedTag = {
                offset: a.VAL.length ? a.VAL[0].AL : 0
            };
            this.controls.bindEvent();
            this.bindEvent();
            if (!0 === c) this.video.load(), this.video.play();
            else this.onPlay();
            this.controls.onPlay()
        },
        playVideos: function(a) {
            debug.log("playVideos " + a);
            w = !1;
            s = 0;
            this.video.style.display = (d.isIPHONE || d.isIPOD) && null != b.v.data[0].trial ? "none" : "block";
            if (b.config.autoplay || b.config.nextAutoPlay || a) debug.log("src= " + this.video.src + " auto = " + a), this.video.load(), this.video.play()
        },
        processError: function(a) {
            var c = a.data[0].error_code;
            if (-12 == c || -13 == c) return a.data[0].error_code = null, a.data[0].error =
                null, a.data[0].trial = {
                    time: 0
                }, !1;
            b.hide(b.get(".x-video-poster"));
            this.feedbackPanel = new K(this, a);
            return !0
        },
        mpieceReport: function() {
            "mp4" == b.config.content && (b.videoInfo._videoSegsDic && null != b.videoInfo._videoSegsDic[m] && 1 < b.videoInfo._videoSegsDic[m].length) && (debug.log("mpiece report"), d.Log(d.MPIECEURL + r({
                partner: b.config.partnerId,
                type: m,
                length: b.videoInfo._videoSegsDic[m].length,
                vid: b.v.data[0].videoid
            })))
        },
        resize_: function(a, c, e) {
            debug.log("resize=" + b.resizeTag);
            c && (e && b.resizeTag && this.controls) &&
                (a = this.controls.xplayer.className, this.controls && this.controls.xplayer && (-1 === a.indexOf("fullscreen") ? this.controls.xplayer.className = z(c) : (c = window.innerWidth, this.controls.xplayer.className = z(c) + " x-player-fullscreen")))
        },
        uiAdapter: function() {
            "index" == b.config.wintype && (b.hide(b.get(".x-localization")), b.hide(b.get(".x-quality")));
            b.get("#x-video-button").className = "x-video-button";
            "m3u8" != b.config.content && b.hide(b.get(".x-quality"));
            var a = this;
            window.addEventListener("resize", function(b) {
                debug.log("window.resize");
                if (a.controls) a.controls.onResize(b)
            }, !1)
        },
        isOutTryDuration: function(a) {
            return this.tryDuration ? a >= this.tryDuration : !1
        },
        replay: function() {
            s = 0;
            this._ireflag = this._comscoreflag = !1;
            this._firstflag = d.adrPlayTrick = !1;
            this.video.style.display = "block";
            this.isOnePiece() || (this.video.src = b.multiPieceSrc(s));
            d.isIPAD && (this.video.src = b.m3u8src_v2(b.v.data[0].videoid, b.defaultVideoType), b.unitedTag = null);
            this.video.load();
            this.video.play();
            this._reporter.tsInit();
            this._reporter.sendVVLog(62);
            this._reporter.sendTSLog(60);
            this._reporter.addPlayerDurationReport(62)
        },
        seekToLastPoint: function() {
            if (d.isAndroid) return !1;
            var a = b.v.data[0].lastpoint / 1E3 || -1,
                c = parseInt(l.getItem(b.v.data[0].videoid + "_playpoint")) || -1,
                e = -1; - 1 != a && -1 != c ? (e = a, 60 > Math.abs(a - c) && (e = c)) : (e = a, -1 == a && (e = c));
            debug.log("lastpoint=" + e);
            a = l.getItem("youku_ignore_lasttime");
            a = parseInt(a) || 0;
            return -1 !== e && 120 <= e && 3 > a && null == b.v.data[0].trial && !1 == b.v.controller.xplayer_disable && 600 <= b.v.data[0].seconds ? (this.controls.showLastTimeTip(e), d.isAndroid && (this._waitSeek =
                e), this.seek(e), !0) : !1
        },
        clearLocalPlayPoint: function() {
            var a = b.v.data[0].videoid;
            clearTimeout(this._recordLPPTimer);
            l.removeItem(a + "_playpoint")
        },
        recordLocalPlayPoint: function() {
            var a = b.v.data[0].videoid,
                c = this.currentTime || 0,
                e = this;
            this._recordLPPTimer = setTimeout(function() {
                e.recordLocalPlayPoint()
            }, 1E4);
            l.removeItem(a + "_playpoint");
            if (600 <= b.v.data[0].seconds && (c < b.v.data[0].seconds - 120 && null == b.v.data[0].trial && 120 <= c) && (l.setItem(a + "_playpoint", c), !this.updatePPVids)) {
                this.updatePPVids = !0;
                c = l.getItem("youku_playpoint_vids") ||
                    "";
                if ("" == c) c = a;
                else {
                    for (var c = c.split(":"), d = 0; d < c.length; d++) c[d] == a && (c[d] = "");
                    c.push(a);
                    c = c.join(":");
                    for (d = 0;
                        ":" == c.charAt(d);) d++;
                    c = c.substring(d);
                    c = c.replace(/:(:)+/g, ":")
                }
                a = c.split(":");
                30 < a.length && (debug.log("slice"), l.removeItem(a[0] + "_playpoint"), c = a.slice(1).join(":"));
                debug.log("youku_playpoint_vids=" + c);
                l.setItem("youku_playpoint_vids", c)
            }
        },
        skipHead: function() {
            if (!d.isAndroid) {
                var a = parseInt((b.v.data[0].dvd || {}).head || -1);
                debug.log("skiphead = " + a); - 1 != a && (this.controls.tipPanel.onSkipHead(),
                    "true" == l.getItem("youku_conf_skip") && (d.isAndroid && (this._waitSeek = a / 1E3), this.seek(a / 1E3)))
            }
        },
        skipTail: function(a) {
            if (!d.isAndroid) {
                var c = parseInt((b.v.data[0].dvd || {}).tail || -1); - 1 != c && (a >= c / 1E3 - 10 && !this._tailTip) && (debug.log("skiptail(act before 10) =" + c), this._tailTip = !0, this.controls.tipPanel.onSkipTail()); - 1 != c && (a >= c / 1E3 && !this._tailSkipped) && (this._tailSkipped = !0, "true" == l.getItem("youku_conf_skip") && this.seek(parseInt(b.v.data[0].seconds) - 1))
            }
        },
        assistSkipTail: function(a) {
            var c = parseInt((b.v.data[0].dvd || {}).tail || -1);
            this._tailTip = a >= c / 1E3 ? this._tailSkipped = !0 : this._tailSkipped = !1
        },
        seek: function(a, c) {
            a = a || 0;
            a = Math.max(a, 0);
            b.videoInfo.totalTime && (a = Math.min(a, b.videoInfo.totalTime - 5));
            this.isOutTryDuration(a) && (a = this.tryDuration - 1);
            this.assistSkipTail(a);
            var e = this;
            this.switchTimer && clearTimeout(this.switchTimer);
            this.currentTime = a;
            if (this.isOnePiece()) {
                var d = this.video.seekable;
                b.unitedTag && (a += b.unitedTag.offset);
                1 == d.length && a < d.end(0) ? (debug.log("seek ct = " + a + ",end = " + d.end(0)), this.seekTo(a,
                    c)) : (this.controls.onWaiting(), this.switchTimer = setTimeout(function() {
                    e.seek(a, c)
                }, 100))
            } else debug.log("multi seek"), this.multiSeekTo(a)
        },
        seekTo: function(a, b) {
            if (this.isOnePiece()) {
                debug.log("is one piece");
                var e = this;
                try {
                    e.video.currentTime = a
                } catch (d) {
                    var i = 0;
                    this.video.addEventListener("canplay", function() {
                        1 !== i && (i = 1, debug.log("canplay time=" + a), e.video.currentTime = a)
                    })
                }
                "function" == typeof b && (debug.log("<b>seekto callback(mayby play)</b>"), b())
            }
        },
        multiSeekTo_: function() {
            debug.log("YoukuHTML5 ")
        },
        multiSeekTo: function(a) {
            debug.log("YoukuHTML5Player multiSeekTo !");
            for (var c = 0, e = 0, d = 0, i = 0; i < b.videoInfo._videoSegsDic[m].length; i++) {
                var g = parseInt(b.videoInfo._videoSegsDic[m][i].seconds),
                    c = c + g;
                if (c > a) {
                    e = i;
                    d = g - (c - a);
                    break
                } else if (c == a) {
                    e = i + 1;
                    d = 0;
                    break
                }
            }
            this.video.pause();
            if (e == s) {
                debug.log(" piece time = " + d);
                try {
                    this.video.currentTime = d
                } catch (h) {}
            } else {
                s = e;
                var k = 0,
                    l = this;
                this.video.addEventListener("canplay", function() {
                    1 !== k && (k = 1, debug.log("canplay time=" + d), l.video.currentTime = d)
                });
                this.video.src =
                    b.multiPieceSrc(s);
                this.video.load()
            }
            this.video.play();
            this.video.style.display = "block"
        },
        adjustVideoRatio: function(a) {
            if (!d.isIOS) {
                if (("onorientationchange" in window || "orientation" in window) && !this._avrTag) {
                    this._avrTag = !0;
                    var c = this;
                    window.addEventListener("orientationchange", function() {
                        !0 === c.controls.fullscreenPanel.fullFlag() && c.adjustVideoRatio()
                    })
                }
                var c = this,
                    e = this.video;
                setTimeout(function() {
                    if (1 === a) e.style.width = "100%", e.style.height = "100%", e.style.top = null, e.style.left = null;
                    else {
                        var c = b.get(".x-player"),
                            c = c.offsetWidth / c.offsetHeight,
                            d = e.videoWidth / e.videoHeight;
                        isNaN(d) || isNaN(c) || !isFinite(c) || !isFinite(d) ? (e.style.width = "100%", e.style.height = "100%", e.style.top = null, e.style.left = null) : c < d ? (e.style.width = "100%", e.style.height = 100 * (c / d) + "%", e.style.top = 100 * (1 / c - 1 / d) / 2 * c + "%", e.style.left = null) : (e.style.height = "100%", e.style.width = 100 * (d / c) + "%", e.style.left = 100 * ((c - d) / 2 / c) + "%", e.style.top = null)
                    }
                }, 2E3)
            }
        }
    });
    window.YoukuPlayerSelect = J;
    window.BuildVideoInfo = k;
    window.checkSrc = function() {
        k._fyks.length >
            k.mp4srcs.length || (clearInterval(k._tid), k.cleanSrc(), k.cache(), null == k._callback ? d.GetMP4OK(k._v, k._videoInfo) : k._callback(k._v, k._videoInfo))
    };
    window.QS = function() {
        for (var a = {}, b = window.location.search.substring(1).split("&"), e = 0; e < b.length; e++) {
            var d = b[e].split("=");
            "undefined" === typeof a[d[0]] ? a[d[0]] = d[1] : "string" === typeof a[d[0]] ? a[d[0]] = [a[d[0]], d[1]] : a[d[0]].push(d[1])
        }
        return a
    };
    window.YKP = d;
    window.YKU = C;
    window.YoukuHTML5Player = YoukuHTML5Player;
    for (var P = document.getElementsByTagName("script"),
            I = 0; I < P.length; I++)
        if (-1 !== P[I].src.indexOf("player.youku.com/jsapi")) {
            eval(P[I].innerHTML);
            break
        }
    window.notifyYKU = function() {
        C.swfLoaded = 1
    };
    window.onPlayerStart = function() {
        b.initConfig.events && b.initConfig.events.onPlayStart && (d.playerCurrentState = d.playerState.PLAYER_STATE_PLAYING, debug.log(d.playerCurrentState), debug.log("api:flash play start"), b.initConfig.events.onPlayStart())
    };
    window.onPlayerComplete = function() {
        b.initConfig.events && b.initConfig.events.onPlayEnd && (d.playerCurrentState = d.playerState.PLAYER_STATE_END,
            debug.log(d.playerCurrentState), debug.log("api:flash play end"), b.initConfig.events.onPlayEnd())
    }
})();