define('js/modules/app/special_yihubaiying', ['require', 'exports', 'module', "jquery", "js/modules/libs/parallax/jquery.parallax", "js/modules/pkgs/ajax-form/ajax-form", "js/modules/apis/api-aio", "js/modules/libs/ui/popup/popup", "js/modules/pkgs/ajax-product-choose/ajax-product-choose"],function(require, exports, module) {
var $ = require("jquery");
require("js/modules/libs/parallax/jquery.parallax");
var ajaxForm = require("js/modules/pkgs/ajax-form/ajax-form");
var API = require("js/modules/apis/api-aio");
var Boxy = require("js/modules/libs/ui/popup/popup");
var ajaxProductChoose = require("js/modules/pkgs/ajax-product-choose/ajax-product-choose");
var CHOOSE_PRODUCT = API.getUrl("SPECIAL","BAIYING_CHOOSE_PRODUCT");
$(function(){
    ajaxProductChoose.init();

    ajaxForm.loginTpl = '<a href="/home-page/lists?uid={uid}">个人主页</a>' +
                        '<span>|</span>' +
                        '<a href="/user/logout">退出</a>';

    if (typeof window.ajaxform === "undefined") {
        ajaxForm.init();
    }

    $(".btn_left,.btn_right").click(function(e){
        e.preventDefault();
    });
    var ajaxing = false;
    $(".btn_left").click(function(){
        var button = $(this);
        if (ajaxing) {
            return false;
        }
        ajaxing = true;
        $.ajax({
            url: CHOOSE_PRODUCT,
            type: 'GET',
            dataType: 'json',
            data: {diy:0}
        })
        .done(function(data) {
            if (data.code == 1000) {
                ajaxForm.loginPopupBindFunction(function() {
                    ajaxForm.modal.fadeOut();
                    button.trigger("click");
                });
                ajaxing = false;
            }else if(data.code == 1001) {
                new Boxy("<div>"+data.data+"</div>",{modal:true,unloadOnHide: true});
                $(".activity-product-choose select").trigger("change");
                ajaxing = false;
            }else if(data.code == 1002) {
                new Boxy("<div>"+data.data+"</div>",{modal:true,unloadOnHide: true});
                ajaxing = false;
            }else{
                Boxy.alert("程序出错啦！");
                ajaxing = false;
            }
            console.log("success");
        })
        .fail(function() {
                ajaxing = false;
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    });
    $(".btn_right").click(function(){
        var button = $(this);
        if (ajaxing) {
            return false;
        }
        ajaxing = true;
        $.ajax({
            url: CHOOSE_PRODUCT,
            type: 'GET',
            dataType: 'json',
            data: {diy:1}
        })
        .done(function(data) {
            if (data.code == 1000) {
                ajaxForm.loginPopupBindFunction(function() {
                    ajaxForm.modal.fadeOut();
                    button.trigger("click");
                });
                ajaxing = false;
            }else if(data.code == 1001) {
                new Boxy("<div>"+data.data+"</div>",{modal:true,unloadOnHide: true});
                $(".activity-product-choose select").trigger("change");
                ajaxing = false;
            }else if(data.code == 1002) {
                new Boxy("<div>"+data.data+"</div>",{modal:true,unloadOnHide: true});
                ajaxing = false;
            }else{
                Boxy.alert("程序出错啦！");
                ajaxing = false;
            }
            console.log("success");
        })
        .fail(function() {
                ajaxing = false;
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    });

    $(".QR_code").each(function(){
        var url = $(this).data("url");
        var html = '<img class="qrcode-img" style="margin:25px 0 0 25px;width:110px;height:110px;" src="http://s.jiathis.com/qrcode.php?url=' + url + '">';
        $(this).html(html);
    });
    $(document).on("mouseenter",".QR_code",function(){
        if ($(this).find(".qrcode-img").length) {
            return false;
        }
        var url = $(this).data("url");
        var html = '<img class="qrcode-img" style="margin:25px 0 0 25px;width:110px;height:110px;" src="http://s.jiathis.com/qrcode.php?url=' + url + '">';
        $(this).html(html);
    });
    // ajax 滚动自动加载更多
    (function(){
        var page = 1;
        var range = 500;             //距下边界长度/单位px
        var elemt = 500;           //插入元素高度/单位px
        var maxnum = 20;            //设置加载最多次数
        var num = 1;
        var totalheight = 0;
        var main = $(".exhibition");                     //主体元素
        var ajaxing = false;
        var more = true;
        $(window).scroll(function(){
            if (!more) {
                return false;
            }
            if (ajaxing) {
                return false;
            }
            var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
            //console.log("滚动条到顶部的垂直高度: "+$(document).scrollTop());
            //console.log("页面的文档高度 ："+$(document).height());
            //console.log('浏览器的高度：'+$(window).height());
            totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
            if(($(document).height()-range) <= totalheight  && num != maxnum) {
                page++;
                ajaxing = true;
                $.ajax({
                    url: (location.origin + location.pathname),
                    type: 'GET',
                    dataType: 'json',
                    data: {page: page},
                })
                .done(function(data) {
                    if (data.code == "0" && data.data.length > 0) {
                        main.append(data.data);
                    } else if (data.code == "0" && data.data.length === 0) {
                        more = false;
                    }
                    ajaxing = false;
                    console.log("success");
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
            }
        });
    })();
});
});