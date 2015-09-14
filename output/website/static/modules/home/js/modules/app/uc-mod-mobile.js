define('js/modules/app/uc-mod-mobile', ['require', 'exports', 'module', "jquery", "js/modules/apis/api-aio", "js/modules/libs/ui/popup/popup", "js/modules/libs/validform/Validform_v5.3.2"],function(require, exports, module) {
var $ = require("jquery");
var API = require("js/modules/apis/api-aio");
var EMAIL_PROVE = API.getUrl("UCENTER", "EMAIL_PROVE");
var EMAIL_EDIT = API.getUrl("UCENTER", "EDIT_EMAIL");
var EDIT_MOBILE = API.getUrl("UCENTER", "EDIT_MOBILE");
var Boxy = require("js/modules/libs/ui/popup/popup");
var NewUrl;
require("js/modules/libs/validform/Validform_v5.3.2");

function PhoneMod() {
    var HasEmail = $(".has_email").text().length;
    var HasMobile = $(".has_mobile").text().length;
    $("#modify_form").hide();
    if (HasEmail && HasMobile) {
        $(".phone-wrap").show();
    } else if (HasMobile && !HasEmail) {
        $(".phone-wrap").show();
        $(".phone-wrap .change").hide();
    } else if (!HasMobile && HasEmail) {
        $(".phone-wrap").show();
        $(".emailmod-wrap .change").hide();
        $(".js-change-mobile").hide();
        $(".phone-wrap .email-step1").show();
        $(".phone-step1").hide();
    }
    $(".phone-mod").addClass("active");
    $(".person-mod").removeClass("active");
    // $("#modify_form").hide();
    // $(".phone-wrap").show();
    // $(".person-mod").removeClass("active");
    //
}

exports.PhoneMod = PhoneMod;

$(function() {
    var Timer; //timer变量，控制时间
    var count = 60; //间隔函数，1秒执行
    var curCount; //当前剩余秒数
    var ajaxing = false;
    var step = 1;
    var validmode = 1;
    var phoneline = $(".phone-wrap");

    function ToStep2() {
        step++;
        $(".phone-step1").hide();
        $(".phone-wrap .email-step1").hide();
        $(".phone-step2").show();
        $(".js-change-mobile").hide();
        phoneline.find(".leftradius").addClass('opacity').next().addClass("green").removeClass("gray");
    }

    function sendMessage1() {
        var that = $(this);
        if (ajaxing) {
            return false;
        }
        ajaxing = true;
        that.addClass('disablebtn').html("短信发送中……");　　　
        $.ajax({
                url: EMAIL_PROVE,
                type: 'POST',
                dataType: 'json',
                data: {
                    ismobile: true
                }
            })
            .done(function(data) {
                if (data.code === "0") {
                    curCount = count;　　
                    that.attr("disabled", "true");
                    Timer = setInterval(SetRemainTime1, 1000);
                    $(".phone-step1").find(".has-send").show();
                } else {
                    that.addClass('disablebtn').html("发送失败");
                    setTimeout(function() {
                        that.addClass('disablebtn').html("60秒后重新发送");
                    }, 2000);
                }
                console.log("success");
            })
            .fail(function() {
                that.addClass('disablebtn').html("发送失败");
                setTimeout(function() {
                    that.addClass('disablebtn').html("60秒后重新发送");
                }, 2000);
                console.log("error");
            })
            .always(function() {
                ajaxing = false;
                console.log("complete");
            });
    }

    function sendMessage2() {
        var that = $(this);
        if (ajaxing) {
            return false;
        }
        ajaxing = true;
        that.addClass('disablebtn').html("邮件发送中……");　　　
        $.ajax({
                url: EMAIL_PROVE,
                type: 'POST',
                dataType: 'json',
                data: {
                    ismobile: false,
                    isemail: true
                }
            })
            .done(function(data) {
                if (data.code === "0") {
                    curCount = count;　　
                    that.attr("disabled", "true");
                    Timer = setInterval(SetRemainTime2, 1000);
                    $(".phone-wrap .email-step1").find(".has-send").show();
                } else {
                    that.addClass('disablebtn').html("发送失败");
                    setTimeout(function() {
                        that.addClass('disablebtn').html("60秒后重新发送");
                    }, 2000);
                }
                console.log("success");
            })
            .fail(function() {
                that.addClass('disablebtn').html("发送失败");
                setTimeout(function() {
                    that.addClass('disablebtn').html("60秒后重新发送");
                }, 2000);
                console.log("error");
            })
            .always(function() {
                ajaxing = false;
                console.log("complete");
            });
    }
    //timer处理函数
    function SetRemainTime1() {
        if (curCount == 0) {
            window.clearInterval(Timer); //停止计时器
            $("#send-code-phone").removeAttr("disabled"); //启用按钮
            $(".phone-step1").find(".has-send").hide();
            $("#send-code-phone").removeClass("disablebtn").html("发送验证码");;
        } else {
            curCount--;
            $("#send-code-phone").html(curCount + "秒内输入验证码");
        }
    }

    function SetRemainTime2() {
        if (curCount == 0) {
            window.clearInterval(Timer); //停止计时器
            $("#send-code").removeAttr("disabled"); //启用按钮
            $(".phone-wrap .email-step1").find(".has-send").hide();
            $("#send-code").removeClass("disablebtn").html("发送验证码");;
        } else {
            curCount--;
            $("#send-code").html(curCount + "秒内输入验证码");
        }
    }

    function SetNewRemainTime() {
        if (curCount == 0) {
            clearInterval(Timer); //停止计时器
            $("#send-code-phone2").removeAttr("disabled"); //启用按钮
            $("#send-code-phone2").removeClass("disablebtn").html("发送验证码");
            $(".phone-step2").find(".has-send").hide();
        } else {
            curCount--;
            $("#send-code-phone2").addClass('disablebtn').html(curCount + "秒后重新发送");
        }
    }

    function SendNewMessage(ajaxdata, Send_Url) {
        var that = $(this);
        if (ajaxing) {
            return false;
        }
        ajaxing = true;　　
        that.addClass('disablebtn').html("短信发送中……");　　　
        $.ajax({
                url: Send_Url,
                type: 'POST',
                dataType: 'json',
                data: {
                    newmobile_code: ajaxdata
                }
            })
            .done(function(data) {
                if (data.code === "0") {
                    curCount = count;
                    NewMobile = data.data;　　
                    that.attr("disabled", "true");
                    Timer = setInterval(SetNewRemainTime, 1000);
                    $(".phone-step2").find(".has-send").show();
                } else {
                    that.addClass('disablebtn').html("发送失败");
                    setTimeout(function() {
                        that.addClass('disablebtn').html("60秒后重新发送");
                    }, 2000);
                }
                console.log("success");
            })
            .fail(function() {
                that.addClass('disablebtn').html("发送失败");
                setTimeout(function() {
                    that.addClass('disablebtn').html("60秒后重新发送");
                }, 2000);
                console.log("error");
            })
            .always(function() {
                ajaxing = false;
                console.log("complete");
            });
    }

    $(document).on("click", "#send-code-phone", sendMessage1);
    $(document).on("click", "#send-code", sendMessage2);
    $("#send-code-phone2").on("click", function() {
        var newphone = $("#mobile").val();
        var Send_Url = EDIT_MOBILE;
        SendNewMessage(newphone, Send_Url);

    });


    $(".modifynav li").click(function() {
        var that = $(this);
        that.addClass("active").siblings().removeClass("active");
    });
    //   修改手机
    $(".js-phone-mod").click(function() {
        PhoneMod();
    });
    //   验证手机号是否被注册
    $(".phone-step2").Validform({
        tiptype: 3,
        ajaxurl: {
            success: function(data, obj) {
                if (obj.eq(0)[0].id === "mobile" && data.status == "y") {
                    $("#send-code-phone2").removeClass("disablebtn").html("发送验证码");
                    $("#send-code-phone2").removeAttr("disabled");

                }
            }
        }
    });
    // 切换认证方式
    $(".js-change-mobile").click(function() {
        if (validmode == 1) {
            validmode++;
            $(this).html("改为手机认证方式");
            $(".phone-step1").hide();
            $(".phone-wrap .email-step1").removeClass("none");
        } else if (validmode == 2) {
            validmode--;
            $(this).html("改为邮箱认证方式");
            $(".phone-step1").show();
            $(".phone-wrap .email-step1").addClass("none");
        }
    });
    //  确认按钮点击提交
    $("#phone-send").click(function() {
        var phone = !$(".phone-wrap .email-step1").is(":hidden");
        if (step == 1) {
            var data;
            if (phone) {
                if (!$(".phone-wrap .email1-code").val().length) {
                    alert("请填写验证码");
                    return false;
                }
                data = {
                    code: $(".phone-wrap .email1-code").val(),
                };
            } else {
                if (!$("#phone-code").val().length) {
                    alert("请填写验证码");
                    return false;
                }
                data = {
                    code: $("#phone-code").val()
                };
            }

            $.ajax({
                    url: EMAIL_EDIT,
                    type: 'POST',
                    dataType: "json",
                    data: data,
                })
                .done(function(data) {
                    if (data.code == "0") {
                        ToStep2();
                    } else if (data.code == "1") {
                        Boxy.alert("验证码输入错误");
                    }
                    console.log("success");
                })
                .fail(function() {
                    step++;
                    $(".phone-step1").hide();
                    $(".phone-step2").show();
                    phoneline.find(".leftradius").addClass('opacity').next().addClass("green").removeClass("gray");

                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        } else if (step == 2) {
            var data = {
                code: $("#phone-code2").val(),
                newmobile: $("#mobile").val()
            };
            $.ajax({
                    url: EMAIL_EDIT,
                    type: 'POST',
                    data: data,
                    dataType: "json"
                })
                .done(function(data) {
                    if (data.code == "0") {
                        step++;
                        NewUrl = data.data.url;
                        $(".newmobile").text(data.data.message);
                        $(".phone-step2").hide();
                        $(".phone-step3").show();
                        $("#phone-send").text("返回我的代言");
                        phoneline.find(".leftradius").addClass('opacity').next().addClass("green opacity").removeClass("gray").next().addClass('green').removeClass('gray');
                    } else if (data.code == "1") {
                        Boxy.alert("验证码输入错误");
                    }
                    console.log("success");
                })
                .fail(function() {
                    step++;
                    $(".phone-step2").hide();
                    $(".phone-step3").show();
                    $("#phone-send").text("返回我的代言");
                    phoneline.find(".leftradius").addClass('opacity').next().addClass("green opacity").removeClass("gray").next().addClass('green').removeClass('gray');
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        } else if (step == 3) {
            window.open(NewUrl);
        }
    });
});
});