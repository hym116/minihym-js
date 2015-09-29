var $ = require("jquery");
/*
 * 倒计时函数 jCountdown
 * leftTime 剩余时间 单位(秒)
 * tpl      模板 天：{D} 小时：{hh} 分钟：{mm} 秒：{ss}
 * obj      jq对象
 * callback 回调函数
 * fix      补零
 */
module.exports = function jCountdown(leftTime, tpl, obj, callback, fix) {
    var T = setTimeout(function() {
        countdown();
    }, 1000);

    function countdown() {

        if (leftTime <= 0) {
            clearTimeout(T);
            if (callback) {
                callback();
            }
            return false;
        }

        var day = Math.floor(leftTime / (60 * 60 * 24));
        var hour = Math.floor((leftTime - day * 24 * 60 * 60) / 3600);
        var minute = Math.floor((leftTime - day * 24 * 60 * 60 - hour * 3600) / 60);
        var second = Math.floor(leftTime - day * 24 * 60 * 60 - hour * 3600 - minute * 60);

        if (fix) {
            if (hour<10) {
                hour = "0" + hour;
            }
            if (minute<10) {
                minute = "0" + minute;
            }
            if (second<10) {
                second = "0" + second;
            }
        }

        leftTime--;

        var html = tpl.replace(/(\{D\})|(\{hh\})|(\{mm\})|(\{ss\})/g, function(matches) {
            var res;
            switch (matches) {
                case "{D}":
                    res = day;
                    break;
                case "{hh}":
                    res = hour;
                    break;
                case "{mm}":
                    res = minute;
                    break;
                case "{ss}":
                    res = second;
                    break;
                default:
                    res = "";
                    break;
            }
            return res;
        });

        obj.html(html);

        T = setTimeout(function() {
            countdown();
        }, 1000);

    }
};