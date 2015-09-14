define('js/modules/app/activity-365', ['require', 'exports', 'module', "jquery", "js/modules/pkgs/ajax-form/ajax-form", "js/modules/libs/fullpage/jquery.fullPage", "js/modules/libs/fullpage/vendors/jquery.easings.min", "js/modules/libs/parallax/jquery.parallax", "js/modules/pkgs/favourite", "js/modules/pkgs/follow", "js/modules/libs/ui/popup/popup", "js/modules/pkgs/jcountdown", "js/modules/apis/api-aio"],function(require, exports, module) {
var $ = require("jquery");
var jQuery = $;
var ajaxForm = require("js/modules/pkgs/ajax-form/ajax-form");
require("js/modules/libs/fullpage/jquery.fullPage");
require("js/modules/libs/fullpage/vendors/jquery.easings.min");
require("js/modules/libs/parallax/jquery.parallax");
var Favourite = require("js/modules/pkgs/favourite");
var Follow = require("js/modules/pkgs/follow");
var Boxy = require("js/modules/libs/ui/popup/popup");
var jCountdown = require("js/modules/pkgs/jcountdown");

var API = require("js/modules/apis/api-aio");
var SUPPORT_CHOOSE_ACTIVITY = API.getUrl("SUPPORT","CHOOSE_ACTIVITY");

$(function(){
    ajaxForm.loginTpl = '<a href="/home-page/lists?uid={uid}">个人主页</a>' +
                        '<span>|</span>' +
                        '<a href="/user/logout">退出</a>';

    if (typeof window.ajaxform === "undefined") {
        ajaxForm.init();
    }
    $(".intro ul").each(function(){
        var length = $(this).find("li").length;
        $(this).attr("class","ul-"+length);
    });
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
        that.click(function(){
            var popup = Boxy.linkedTo(that);
            popup.show();
        });
    });
    $(".msgbtn").click(function(){
        $(".qrcodebtn").trigger("click");
    });

    $(".buybtn").click(function(){
        var button = $(this);
        var url = SUPPORT_CHOOSE_ACTIVITY;
        var rel_id = $("#rel_id").val();
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: {rel_id: rel_id},
        })
        .done(function(data) {
            if (data.code == "0") {
                //成功状态
                location.href = data.data.url;
            } else if (data.code == "1") {
                //未登录状态
                ajaxForm.loginPopupBindFunction(function() {
                    ajaxForm.modal.fadeOut();
                    button.trigger("click");
                });
            } else {
                Boxy.alert(data.msg);
            }
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    });

    /**
     * 倒计时
     */
    $(".js-time-countdown").each(function() {
        var that = $(this);

        var from = parseInt(that.data("start_time_from"));
        var to = parseInt(that.data("start_time_to"));
        var now = parseInt(that.data("now")) || parseInt(+new Date() / 1000);

        var text1 = "还有 {tpl} &nbsp;&nbsp;结束";
        var text2 = "还有 {tpl} &nbsp;&nbsp;开始";
        var text3 = "此活动已结束";

        var tpl = '<span> {D} </span> 天 <span> {hh} </span> 小时 <span> {mm} </span> 分 <span> {ss} </span> 秒';

        if (now > to) {
            console.log("已结束");
            that.html(text3);
        } else if (now < from) {
            console.log("未开始");
            jCountdown((from - now), (text2.replace("{tpl}",tpl)), that, function() {
                jCountdown((to - from), (text1.replace("{tpl}",tpl)), that, function() {
                    that.html(text3);
                });
            });
        } else {
            console.log("进行中");
            jCountdown((to - now), (text1.replace("{tpl}",tpl)), that, function() {
                that.html(text3);
            });
        }

    });

    (function(){
        var T1;
        $(".sharebtn").mouseenter(function() {
            clearTimeout(T1);
            var tip = Boxy.linkedTo(this);
            var message = $("#share-tip-wrap").find(".share-tip").prop("outerHTML");
            var bdshare = $("#share-tip-wrap").find(".bdshare");

            if (tip) {
                tip.show();
            } else {
                Boxy.tip(message, {
                    actuator: this,
                    arrow: 'bottom'
                });
                $(".share-tip").append(bdshare);
                tip = Boxy.linkedTo(this);
                tip.boxy.addClass("shareboxy");
                tip.boxy.on("mouseenter", function() {
                    clearTimeout(T1);
                }).on("mouseleave", function() {
                    tip.hide();
                });
            }
        }).mouseleave(function() {
            var tip = Boxy.linkedTo(this);
            if (tip) {
                T1 = setTimeout(function(){
                    tip.hide();
                },200);
            }
        });
    })();

    new Favourite($(".intro .likebtn"), {
        rid: $("#rel_id").val()
    });
    new Follow($("#section-support .followbtn"), {
        uid: $("#userid").val(),
        likedClass:"hover"
    });
    // var videoHtml = '<iframe width="100%" height="100%" src="' + VIDEO_URL + '" frameborder="0"></iframe>';
    // var videobox = $("#videobox");
    var idArr = [];
    $('#fullpage').find(".section").each(function(){
        var id = $(this)[0].id;
        console.log(id);
        idArr.push(id.slice(8));
    });

    var imagesblock = $("#section-images");
    // var videoboxWidth = videobox.width();
    $('#fullpage').fullpage({
        anchors : idArr,
        menu : "#menu2",
        paddingTop : "44px",
        resize: false,
        css3 : false,
        easing: 'easeInOutCubic',
        onLeave: function(){
            var popup = Boxy.linkedTo($(".sharebtn")[0]);
            if (popup) {
                popup.hide();
            }
        }
    });
    imagesblock.find("li").mouseenter(function(){
        var that = $(this);
        var desc = that.find(".desc");
        var height = that.height()-desc.height();
        desc.css({top: height});
    }).mouseleave(function(){
        var that = $(this);
        var desc = that.find(".desc");
        var height = that.height();
        desc.css({top: height});
    });
    $("#scene").parallax();
});
});