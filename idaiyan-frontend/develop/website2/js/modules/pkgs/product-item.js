var $ = require("jquery");
var jCountdown = require("pkgs/jcountdown");

exports.init = function(){

    var proditem = $(".proditem_wrap");

    proditem.find(".support_items .item_title").click(function() {
        $(this).closest(".support_item").toggleClass("close");
    });

    proditem.find(".activity_item .activity_title").click(function() {
        $(this).closest(".activity_item").toggleClass("close");
    });

    /*
     * 二维码
     */
    $(".qrcode_main").each(function(){
        var url = $(this).data("mobile-url") || $(this).data("url");
        $(this).find("img").css({width:180,height:180}).attr("src",'http://s.jiathis.com/qrcode.php?url=' + url );
    });

    /**
     * 倒计时
     */
    $(".js-time-remain").each(function() {
        var that = $(this);

        var from = parseInt(that.data("start_time_from"));
        var to = parseInt(that.data("start_time_to"));

        var now = typeof NOW !== "undefined" && !!NOW ? parseInt(NOW) : parseInt(+new Date() / 1000);

        var text1 = "距结束时间还剩 ";
        var text2 = "距开始时间还有 ";
        var text3 = "此活动已结束";

        var tpl = '<span class="time"><span class="day">{D}</span> 天 - <span class="hour">{hh}</span> 小时 - <span class="minute">{mm}</span> 分</span>';

        if (!from || !to || from == "0" || to == "0") {
            that.html(text3);
            return false;
        }

        if (now > to) {
            that.html(text3);
        } else if (now < from) {
            jCountdown((now - from), (text2 + tpl), that, function() {
                jCountdown((to - now), (text1 + tpl), function() {
                    that.html(text3);
                    return false;
                });
            });
        } else {
            jCountdown((to - now), (text1 + tpl), that, function() {
                that.html(text3);
                return false;
            });
        }

    });
};