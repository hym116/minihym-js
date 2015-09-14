define('js/modules/pkgs/jcountdown', ['require', 'exports', 'module', "jquery"],function(require, exports, module) {
var $ = require("jquery");

module.exports = function jCountdown(leftTime, tpl, obj, callback) {
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
});