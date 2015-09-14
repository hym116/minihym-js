define('js/modules/app/uc-mod-email', ['require', 'exports', 'module', "jquery", "js/modules/pkgs/imgcut", "js/modules/pkgs/uploadpreview", "js/modules/apis/api-aio", "js/modules/libs/ui/popup/popup", "js/modules/libs/validform/Validform_v5.3.2", "js/modules/app/uc-mod-mobile"],function(require, exports, module) {
var $ = require("jquery");
require("js/modules/pkgs/imgcut");
require("js/modules/pkgs/uploadpreview");
var API = require("js/modules/apis/api-aio");
var Boxy = require("js/modules/libs/ui/popup/popup");
var EMAIL_PROVE = API.getUrl("UCENTER", "EMAIL_PROVE");
var EMAIL_EDIT = API.getUrl("UCENTER", "EDIT_EMAIL");
var EDIT_EMAIL = API.getUrl("UCENTER", "EMAIL_EDIT");
var NewUrl;
var emailline = $(".emailmod-wrap");
var step = 1;
require("js/modules/libs/validform/Validform_v5.3.2");
var ucmodmobile = require("js/modules/app/uc-mod-mobile");
//li 点击导航
$(".modifynav li").click(function() {
    var that = $(this);
    that.addClass("active").siblings().removeClass("active");
    if (that.hasClass("person-mod")) {
        $("#modify_form").show().siblings().not($(".modifynav")).hide();
    } else if (that.hasClass("email-mod")) {
        $(".emailmod-wrap").show().siblings().not($(".modifynav")).hide();
        EmailMod();
    } else if (that.hasClass("phone-mod")) {
        $(".phone-wrap").show().siblings().not($(".modifynav")).hide();
        ucmodmobile.PhoneMod();
    } else if (that.hasClass("avator-mod")) {
        $("#edit_img").show().siblings().not($(".modifynav")).hide();
    } else if (that.hasClass("password-mod")) {
        $("#mod_password").show().siblings().not($(".modifynav")).hide();
    }
});


$(".mod_portrait").click(function() {
    $(".avator-mod").trigger("click");
});

function ToStep2() {
    $(".emailmod-wrap .email-step1").hide();
    $(".step1").hide();
    $(".step2").show();
    emailline.find(".leftradius").addClass('opacity').next().addClass("green").removeClass("gray");
    // $("#send").parent().css({
    //     "width": "245px",
    //     "marginLeft": "-122px"
    // });
    $("#send").parent().css({
        "width": "245px"
    });
    $("#send").siblings().remove();
}

function EmailMod() {
    var HasEmail = $(".has_email").text().length;
    var HasMobile = $(".has_mobile").text().length;
    $("#modify_form").hide();
    if (HasEmail && !HasMobile) {
        $(".emailmod-wrap").show();
        $(".emailmod-wrap .change").hide();
    } else if (HasEmail && HasMobile) {
        $(".emailmod-wrap").show();
    } else if (!HasEmail && HasMobile) {
        $(".emailmod-wrap").show();
        $(".emailmod-wrap .email-step1").hide();
        $(".step1").show();
        $(".phone-wrap .change").hide();
        $(".email-rz").hide();
    }
    $(".email-mod").addClass("active");
    $(".person-mod").removeClass("active");
}

$(function() {
    var step2form = $(".step2").Validform({
        tiptype: 3,
        ajaxurl: {
            success: function(data, obj) {
                if (obj.eq(0)[0].id === "email" && data.status == "y") {
                    $("#send-code2").removeClass("disablebtn").html("发送验证码");
                    $("#send-code2").removeAttr("disabled");

                }
            }
        }
    });
    var Timer; //timer变量，控制时间
    var count = 60; //间隔函数，1秒执行
    var curCount; //当前剩余秒数
    var ajaxing = false;
    var validmode = 1;
    $(".js-email-mod").click(function() {
        EmailMod();
    });

    function sendMessage() {
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
                    isemail: true,
                    ismobile: false
                }
            })
            .done(function(data) {
                if (data.code === "0") {
                    curCount = count;　　
                    that.attr("disabled", true);
                    Timer = setInterval(SetRemainTime, 1000);
                    $(".emailmod-wrap .email-step1").find(".has-send").show();
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
    // function SetRemainTime() {
    //         if (curCount == 0) {
    //             clearInterval(Timer); //停止计时器
    //             $(".send-code-common").removeAttr("disabled"); //启用按钮
    //             $(".send-code-common").removeClass("disablebtn").html("发送验证码");
    //             $(".emailmod-wrap .email-step1").find(".has-send").hide();
    //         } else {
    //             curCount--;
    //             $(".send-code-common").addClass('disablebtn').html(curCount + "秒后重新发送");
    //         }
    //     }
    function SetRemainTime() {
        if (curCount == 0) {
            clearInterval(Timer); //停止计时器
            $("#send-code-e").removeAttr("disabled"); //启用按钮
            $("#send-code-e").removeClass("disablebtn").html("发送验证码");
            $(".emailmod-wrap .email-step1").find(".has-send").hide();
        } else {
            curCount--;
            $("#send-code-e").addClass('disablebtn').html(curCount + "秒后重新发送");
        }
    }
    //  修改邮箱第一步发送验证码函数
    function sendMessagetwo() {
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
                    isemail: false,
                    ismobile: true
                }
            })
            .done(function(data) {
                if (data.code === "0") {
                    curCount = count;
                    that.prop("disabled", true);
                    Timer = setInterval(SetRemainTimetow, 1000);
                    $(".step1").find(".has-send").show();
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
    function SetRemainTimetow() {
        if (curCount == 0) {
            clearInterval(Timer); //停止计时器
            $("#send-code-m").removeAttr("disabled"); //启用按钮
            $("#send-code-m").removeClass("disablebtn").html("发送验证码");
            $(".step1").find(".has-send").hide();
        } else {
            curCount--;
            $("#send-code-m").addClass('disablebtn').html(curCount + "秒后重新发送");
        }
    }

    function SetNewRemainTime() {
        if (curCount == 0) {
            clearInterval(Timer); //停止计时器
            $("#send-code2").removeAttr("disabled"); //启用按钮
            $("#send-code2").removeClass("disablebtn").html("发送验证码");
            $(".step2").find(".has-send").hide();
        } else {
            curCount--;
            $("#send-code2").addClass('disablebtn').html(curCount + "秒后重新发送");
        }
    }
    // $(document).on("click", ".send-code-common", sendMessage);
    $(document).on("click", "#send-code-e", sendMessage);
    //  修改邮箱第二步发送验证码函数
    function SendNewMessage(obj, ajaxdata, sendurl, callback) {
        var that = obj;
        if (ajaxing) {
            return false;
        }
        ajaxing = true;　　
        $.ajax({
                url: sendurl,
                type: 'POST',
                dataType: 'json',
                data: ajaxdata
            }).done(function(data) {
                if (data.code == "0") {
                    curCount = count;
                    that.prop("disabled", true);
                } else {
                    curCount = count;
                    obj.addClass('disablebtn').html("发送失败");
                    Timer = setInterval(SetNewRemainTime, 1000);
                }
                if (callback) {
                    callback(data);
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
    //  修改邮箱第一步发送验证码
    $(document).on("click", "#send-code-m", sendMessagetwo);

    //  修改邮箱第二步发送验证码
    $("#send-code2").on("click", function() {
        var newemail = {
            newemail_code: $("#email").val()
        };
        var Send_Url = EDIT_EMAIL;
        SendNewMessage($(this), newemail, Send_Url, function(data) {
            if (data.code == "0") {
                $(".step2").find(".has-send").show();
                Timer = setInterval(SetNewRemainTime, 1000);
            }
        });
    });
    // 切换认证方式
    $(".js-change-email").click(function() {
        if (validmode == 1) {
            validmode++;
            $(this).html("改为邮箱认证方式");
            $(".emailmod-wrap .email-step1").hide();
            $(".step1").removeClass("none");
        } else if (validmode == 2) {
            validmode--;
            $(this).html("改为手机认证方式");
            $(".emailmod-wrap .email-step1").show();
            $(".step1").addClass("none");
        }
    });
    //  确认按钮点击提交
    $("#send").click(function() {
        var email = !$(".emailmod-wrap .email-step1").is(":hidden");
        if (step == 1) {
            var data;
            if (email) {
                if (!$(".emailmod-wrap .email1-code").val().length) {
                    alert("请填写验证码");
                    return false;
                }
                data = {
                    code: $(".emailmod-wrap .email1-code").val()
                };
            } else {
                if (!$("#step1-code").val().length) {
                    alert("请填写验证码");
                    return false;
                }
                data = {
                    code: $("#step1-code").val()
                };
            }

            $.ajax({
                    url: EMAIL_EDIT,
                    type: 'POST',
                    data: data,
                    dataType: "json"
                })
                .done(function(response) {

                    if (response.code == "0") {

                        clearInterval(Timer);
                        step++;
                        ToStep2();
                    } else if (response.code == "1") {
                        Boxy.alert("验证码输入错误");
                    }
                    console.log("success");
                })
                .fail(function() {


                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        } else if (step == 2) {
            var sametip = "新邮箱不能与原邮箱一样！";
            var data = {
                code: $("#step2-code").val(),
                newemail: $("#email").val()
            };
            if ($(".js-email-active").html() == $("#email").val()) {
                var checktip = $("#email").siblings('.Validform_checktip');
                if (checktip.length) {
                    checktip.removeClass("Validform_right").addClass("Validform_wrong").text(sametip);
                } else {
                    $("#email").parent().append('<div class="Validform_checktip Validform_wrong">' + sametip + '</div>');
                }
                return false;
            }
            $.ajax({
                    url: EMAIL_EDIT,
                    type: 'POST',
                    data: data,
                    dataType: "json"
                })
                .done(function(response) {
                    if (response.code == "0") {
                        $(".step2").hide();
                        $(".step3").show();
                        $("#send").text("返回我的代言");
                        $(".newemail").text(response.data.message);
                        NewUrl = response.data.url;
                        $("#send").siblings().remove();
                        emailline.find(".leftradius").addClass('opacity').next().addClass("green opacity").removeClass("gray").next().addClass('green').removeClass('gray');
                        step++;
                    } else if (response.code == "1") {
                        Boxy.alert("验证码输入错误");
                    }
                    console.log("success");
                })
                .fail(function() {

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