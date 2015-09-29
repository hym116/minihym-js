var $ = require("jquery");
require("parallax");
var ajaxForm = require("pkgs/ajax-form/ajax-form");
var API = require("apis/api-aio");
var Boxy = require("libs/ui/popup/popup");
var icheck = require("icheck");
var ajaxProductChoose = require("pkgs/ajax-product-choose/ajax-product-choose");
var CHOOSE_PRODUCT = API.getUrl("SPECIAL", "GOOD_CHOOSE_PRODUCT");
var DELL_POLL = API.getUrl("GOODPRODUCT", "DELL_POLL");

$(document).ready(function() {
    var add_img = ' <img class="chartlink_img" src="static/modules/home/images/goodproduct/qcode.png" alt="">';
    $(".chartlink").after(add_img);
    $("#top").parallax();
    ajaxProductChoose.init();
    ajaxForm.loginTpl = '<a href="/home-page/lists?uid={uid}">个人主页</a>' +
        '<span>|</span>' +
        '<a href="/user/logout">退出</a>';

    if (typeof window.ajaxform === "undefined") {
        ajaxForm.init();
    }
    $(".js-button a").click(function(e) {
        e.preventDefault();
    });

    //点击申请活动
    var ajaxing = false;
    $(".sq-btn").click(function() {
        if ($(this).hasClass('chartlink')) {
            return;
        }
        var button = $(this);
        if (ajaxing) {
            return false;
        }
        ajaxing = true;
        $.ajax({
                url: CHOOSE_PRODUCT,
                type: 'GET',
                dataType: 'json',
                data: {}
            })
            .done(function(data) {
                if (data.code == 1000) {
                    ajaxForm.loginPopupBindFunction(function() {
                        ajaxForm.modal.fadeOut();
                        button.trigger("click");
                    });
                    ajaxing = false;
                } else if (data.code == 1001) {
                    new Boxy("<div>" + data.data + "</div>", {
                        modal: true,
                        unloadOnHide: true
                    });
                    $(".activity-product-choose select").trigger("change");
                    ajaxing = false;
                } else if (data.code == 1002) {
                    new Boxy("<div>" + data.data + "</div>", {
                        modal: true,
                        unloadOnHide: true
                    });
                    ajaxing = false;
                } else {
                    Boxy.alert("程序出错啦！");
                    ajaxing = false;
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

    // checkbox美化
    $('.dellform input').iCheck({
        checkboxClass: 'icheckbox_polaris',
        radioClass: 'iradio_polaris',
        increaseArea: '-10%'
    });
    $('.dellform input[type="checkbox"]').on("ifChanged", function() {
        var that = $(this);
        var parent = that.closest('li');
        if (that.prop("checked")) {
            parent.addClass('checked');
        } else {
            parent.removeClass('checked');
        }
    });
    // 提交成功时候弹窗
    var graybg = $(".bg");
    var windows = $(".show-window");

    var ajaxing = false;
    $(".dellform").submit(function() {
        var checkboxs = $(this).find(':checked');
        var options = [];
        checkboxs.each(function(index, el) {
            options.push($(this).val());
        });
        if (ajaxing) {
            return false;
        }
        ajaxing = true;
        $.ajax({
                url: DELL_POLL,
                type: 'POST',
                dataType: 'json',
                data: {
                    options: options
                }
            })
            .done(function(data) {
                if (data.code == 0) {
                    graybg.show();
                    windows.show();
                } else if (data.code == 1001) {
                    ajaxing = false;
                } else if (data.code == 1002) {
                    Boxy.alert("请选择");
                    ajaxing = false;
                } else if (data.code == 1003) {
                    Boxy.alert("您已经投过票");
                    ajaxing = false;
                } else if (data.code == 1004) {
                    Boxy.alert("未登录", {
                        modal: true,
                        unloadOnHide: true
                    });
                    $(".activity-product-choose select").trigger("change");
                    ajaxing = false;
                } else {
                    Boxy.alert("程序出错啦！");
                    ajaxing = false;
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
        return false;
    });
    $(".close").click(function() {
        graybg.hide();
        windows.hide();
    });
    $(".bg").click(function() {
        $(this).hide();
        windows.hide();
    });
    //css3动画到达那屏时加载
    var t1 = 1400;
    $(window).scroll(function() {
        var top = $(window).scrollTop();
        var wuhan = $(".part3 .ui-wuhan");
        var shanghai = $(".part3 .ui-shanghai");
        var hangzhou = $(".part3 .ui-hangzhou");
        var chengdu = $(".part3 .ui-chengdu");
        var nanjing = $(".part3 .ui-nanjing");
        var beijing = $(".part3 .ui-beijing");
        if (top > t1) {
            wuhan.show();
            wuhan.find(".ui-arrow").addClass("a-fadeinT");
            wuhan.find(".ui-tip").addClass("a-fadeinT");
            shanghai.show();
            shanghai.find(".ui-arrow").addClass("a-fadeinB");
            shanghai.find(".ui-tip").addClass("a-fadeinL");
            hangzhou.show();
            hangzhou.find(".ui-arrow").addClass("a-fadeinT");
            hangzhou.find(".ui-tip").addClass("a-fadeinT");
            chengdu.show();
            chengdu.find(".ui-arrow").addClass("a-fadeinR");
            chengdu.find(".ui-tip").addClass("a-fadeinR");
            nanjing.show();
            nanjing.find(".ui-arrow").addClass("a-fadeinR");
            nanjing.find(".ui-tip").addClass("a-fadeinR");
            beijing.show();
            beijing.addClass('a-fadeinB');
        }
    });
});