define('js/modules/pkgs/product-item', ['require', 'exports', 'module', "jquery", "js/modules/pkgs/jcountdown", "js/modules/libs/ui/popup/popup"],function(require, exports, module) {
var $ = require("jquery");
var jCountdown = require("js/modules/pkgs/jcountdown");
var Boxy = require("js/modules/libs/ui/popup/popup");

exports.init = function(){

    // 侧边栏模块收起展开
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
    $(".activitys .qrcode_main").each(function(){
        var url = $(this).data("mobile-url") || $(this).data("url");
        $(this).find("img").css({width:180,height:180}).attr("src",'http://s.jiathis.com/qrcode.php?url=' + url );
    });
    $(".actions .qrcode").each(function(){
        var that = $(this);
        var mobileUrl = that.data("mobile-url") || that.data("url");
        var src = 'http://s.jiathis.com/qrcode.php?url=' + mobileUrl;
        new Boxy('<div><img style="width:200px;height:200px;" src="' + src + '"></div>', {
            modal: true,
            closeable: false,
            actuator: that,
            show: false
        });
        that.click(function(){
            var popup = Boxy.linkedTo(that);
            popup.show();
        });
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
            return;
        }

        if (now > to) {
            that.html(text3);
        } else if (now < from) {
            jCountdown((from - now), (text2 + tpl), that, function() {
                jCountdown((to - from), (text1 + tpl), that, function() {
                    that.html(text3);
                    return;
                });
            });
        } else {
            jCountdown((to - now), (text1 + tpl), that, function() {
                that.html(text3);
                return;
            });
        }

    });
};
});