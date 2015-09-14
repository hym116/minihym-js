define('js/modules/app/activity-product-charts', ['require', 'exports', 'module', "jquery", "js/modules/pkgs/ajax-form/ajax-form", "js/modules/libs/ui/popup/popup", "js/modules/pkgs/jcountdown", "js/modules/apis/api-aio", "js/modules/pkgs/ajax-product-choose/ajax-product-choose"],function(require, exports, module) {
var $ = require("jquery");
var ajaxForm = require("js/modules/pkgs/ajax-form/ajax-form");
var Boxy = require("js/modules/libs/ui/popup/popup");
var jCountdown = require("js/modules/pkgs/jcountdown");
var API = require("js/modules/apis/api-aio");
var ajaxProductChoose = require("js/modules/pkgs/ajax-product-choose/ajax-product-choose");
var VOTE = API.getUrl("GOODPRODUCT", "VOTE");

$(document).ready(function() {
    //ajax产品选择
    ajaxProductChoose.init();
    //修改登录后右上角结构
    ajaxForm.loginTpl = '<a href="/home-page/lists?uid={uid}">个人主页</a>' +
                        '<span>|</span>' +
                        '<a href="/user/logout">退出</a>';

    if (typeof window.ajaxform === "undefined") {
        ajaxForm.init();
    }

    // 城市切换
    function tab(aEle1, aEle2) {
        for (var i = 0; i < aEle1.length; i++) {
            aEle1[i].index = i;
            aEle1[i].onclick = function() {
                for (var j = 0; j < aEle1.length; j++) {
                    aEle2[j].className = 'content-box';
                    aEle1[j].className = 'btn fl';
                }
                this.className = 'active btn fl';
                aEle2[this.index].className = 'active content-box';
            };
        }
    }
    var aBtn = $(".tab .btn");
    var aBox = $(".tab").find(".content-box");
    tab(aBtn, aBox);



    //倒计时
    $(".js-time-countdown").each(function() {
        var that = $(this);
        var from = parseInt(that.data("start_time_from"));
        var to = parseInt(that.data("start_time_to"));
        var now = parseInt(that.data("now")) || parseInt(+new Date() / 1000);
        var text1 = '还有 {tpl}<span class="blue-color">后投票结束</span>';
        var text2 = '还有 {tpl}<span class="blue-color">投票开始</span>';
        var text3 = '<span class="blue-color">投票已结束</span>';
        var tpl = '<span>{D}</span>天<span>{hh}</span>小时<span>{mm}</span>分<span>{ss}</span>秒';
        if (now > to) {
            console.log("已结束");
            that.html(text3);
        } else if (now < from) {
            console.log("未开始");
            jCountdown((from - now), (text2.replace("{tpl}", tpl)), that, function() {
                jCountdown((to - from), (text1.replace("{tpl}", tpl)), that, function() {
                    that.html(text3);
                }, true);
            }, true);
        } else {
            console.log("进行中");
            jCountdown((to - now), (text1.replace("{tpl}", tpl)), that, function() {
                that.html(text3);
            }, true);
        }
    });


    //投票
    var ajaxing = false;
    // var ajaxing = false;
    $(".r-bottom").click(function() {
        var that = $(this);
        var number = parseInt($(this).closest('li').find(".r-top").text());
        var option_value = $(this).closest('li').find(".js-num").val();
        if (ajaxing) {
            return false;
        }
        ajaxing = true;
        $.ajax({
                url: VOTE,
                type: 'POST',
                dataType: 'json',
                data: {
                    option_id: [option_value]
                }
            })
            .done(function(data) {
                if (data.code == 0) {
                    that.closest('li').find(".r-top").text(number + 1);
                    Boxy.alert("投票成功", function() {
                        window.location.href = window.location.href;
                    });
                } else {
                    Boxy.alert(data.msg);
                }
                console.log("success");
            })
            .fail(function() {
                Boxy.alert("程序出错了");
                console.log("error");
            })
            .always(function() {
                ajaxing = false;
                console.log("complete");
            });
        return false;
    });
});
});