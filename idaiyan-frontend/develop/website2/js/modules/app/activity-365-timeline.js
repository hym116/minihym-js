var $ = require("jquery");
var Boxy = require("popup");
$(function(){
    $("body").css("min-height",($(window).height())+"px");
    $(".qrcodebtn").each(function(){
        var that = $(this);
        var mobileUrl = that.data("mobileurl").split( "#" )[0];
        var src = 'http://s.jiathis.com/qrcode.php?url=' + mobileUrl;
        new Boxy('<div><img style="width:200px;height:200px;" src="' + src + '"></div>', {
            modal: true,
            closeable: false,
            actuator: that,
            show: false
        });
        $(".qrcodebtn").click(function(){
            var popup = Boxy.linkedTo(that);
            popup.show();
        });
    });
    (function(){
        var byWeek = $(".by_week");
        var byMonth = $(".by_month");
        var weekShow = $(".hand_week");
        var monthShow = $(".hand_month");
        byWeek.click(function(){
            byMonth.removeClass("active");
            byWeek.addClass("active");
            weekShow.show();
            monthShow.hide();
        });
        byMonth.click(function(){
            byMonth.addClass("active");
            byWeek.removeClass("active");
            weekShow.hide();
            monthShow.show();
        });

    })();
});