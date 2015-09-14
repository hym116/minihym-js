//156px
$(function(){

    (function(id) {
        //
        var parent = $("#" + id);

        var ajaxtimeout = 10000;
        var phoneFormAjax = false;
        var registered = false;
        var PHONE = 0;

        var validType = 1;
        if ($(".js-form-phone .ui-validcode-wrap").length) {
            var Width;

            parent.on("tap", ".js-form-phone .ui-swich", function() {
                if (!Width) {
                    Width = $(".js-form-phone .ui-validcode-wrap").width();
                }
                var that = $(this);
                var $validForm = $(".js-form-phone");
                if (!that.hasClass("checked")) {
                    validType = 2;
                    that.addClass("checked");
                    that.find(".ui-swich-anim").animate({
                        width: 66
                    }, 300, function() {
                        that.parent().find(".ui-swich-tip").text("或使用密码登录");
                        $validForm.find(".user_password").attr("name", "user_validcode").attr("placeholder", "验证码").removeClass("user_password").addClass("user_validcode");
                        $validForm.find(".ui-validcode-wrap").find("input").val("");
                        $validForm.find(".ui-validcode-wrap").animate({
                            width: (Width-112)
                        }, 300, function() {
                            $validForm.find(".ui-validbtn-wrap").removeClass("hide").animate({
                                opacity: 1
                            }, 200);
                        });
                    });
                } else {
                    that.removeClass("checked");
                    validType = 1;
                    that.find(".ui-swich-anim").animate({
                        width: 34
                    }, 300, function() {
                        that.parent().find(".ui-swich-tip").text("或使用验证码登录");
                        $validForm.find(".user_validcode").attr("name", "user_password").attr("placeholder", "密码").removeClass("user_validcode").addClass("user_password");
                        $validForm.find(".ui-validbtn-wrap").animate({
                            opacity: 0
                        }, 200, function() {
                            $validForm.find(".ui-validbtn-wrap").addClass("hide");
                            $validForm.find(".ui-validcode-wrap").find("input").val("");
                            $validForm.find(".ui-validcode-wrap").animate({
                                width: Width
                            }, 300);
                        });
                    });
                }
            });
        }

        if ($(".js-form-valid .ui-validcode-wrap").length) {
            var Width2;
            parent.on("tap", ".js-form-valid .ui-swich", function() {
                var that = $(this);
                var $validForm = $(".js-form-valid");
                if (!Width2) {
                    Width2 = $(".js-form-valid .ui-validcode-wrap").width();
                }
                if (!that.hasClass("checked")) {
                    validType = 2;
                    that.addClass("checked");
                    that.find(".ui-swich-anim").animate({
                        width: 66
                    }, 300, function() {
                        that.parent().find(".ui-swich-tip").text("或使用密码登录");
                        $validForm.find(".user_password").attr("name", "user_validcode").attr("placeholder", "验证码").removeClass("user_password").addClass("user_validcode");
                        $validForm.find(".ui-validcode-wrap").find("input").val("");
                        $validForm.find(".ui-validcode-wrap").animate({
                            width: (Width2-112)
                        }, 300, function() {
                            $validForm.find(".ui-validbtn-wrap").removeClass("hide").animate({
                                opacity: 1
                            }, 200);
                        });
                    });
                } else {
                    that.removeClass("checked");
                    validType = 1;
                    that.find(".ui-swich-anim").animate({
                        width: 34
                    }, 300, function() {
                        that.parent().find(".ui-swich-tip").text("或使用验证码登录");
                        $validForm.find(".user_validcode").attr("name", "user_password").attr("placeholder", "密码").removeClass("user_validcode").addClass("user_password");
                        $validForm.find(".ui-validbtn-wrap").animate({
                            opacity: 0
                        }, 200, function() {
                            $validForm.find(".ui-validbtn-wrap").addClass("hide");
                            $validForm.find(".ui-validcode-wrap").find("input").val("");
                            $validForm.find(".ui-validcode-wrap").animate({
                                width: Width2
                            }, 300);
                        });
                    });
                }
            });
        }
        (function(){
            parent.on("tap", ".js-form-phone .js-submit-btn", function() {
                var $phoneForm = $(".js-form-phone"),
                    $validForm = $(".js-form-phone"),
                    $nextbtn = $(this),
                    phoneNum = $phoneForm.find(".user_phone").val(),
                    realName = $phoneForm.find(".user_name").val(),
                    validcode = $phoneForm.find(".user_validcode").val(),
                    password = $phoneForm.find(".user_password").val(),
                    pattern = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/;
                if (!ISUSER && $.trim(realName).length === 0) {
                    alert("请输入姓名");
                    return false;
                }
                if (pattern.test(phoneNum)) {
                    $(".ui-css3loading").show();
                    if (phoneFormAjax) {
                        return false;
                    }
                    phoneFormAjax = true;
                    if (ISUSER) {
                        if (validType == 1) {
                            var pattern1 = /^\w{6,}$/;
                            if (pattern1.test(password)) {
                                $(".ui-css3loading").show();
                                $.ajax({
                                    url: "/baiying/checkcode",
                                    type: 'POST',
                                    dataType: 'json',
                                    timeout: ajaxtimeout,
                                    data: {
                                        mobile: phoneNum,
                                        authcode: password,
                                        truename:realName,
                                        sid: SID
                                    },
                                    success: function(res) {
                                        if (res.code == "10" || res.code == "11" || res.code == "1") {
                                            // 没付款
                                            $("#gamelogin").hide();
                                            $("#gamemain").show();
                                            gameCountdown();
                                            //location.href = res.data;
                                        } else {
                                            alert("密码错误！");
                                        }
                                        $(".ui-css3loading").hide();
                                        phoneFormAjax = false;
                                    },
                                    error: function() {
                                        alert("出错了，请稍后重试！");
                                        $(".ui-css3loading").hide();
                                        phoneFormAjax = false;
                                    }
                                });
                            } else {
                                alert("请输入正确密码！");
                            }
                        } else if (validType == 2) {
                            var pattern2 = /^\d{6}$/;
                            if (pattern2.test(validcode)) {
                                $(".ui-css3loading").show();
                                $.ajax({
                                    url: "/baiying/checkcode",
                                    type: 'POST',
                                    dataType: 'json',
                                    timeout: ajaxtimeout,
                                    data: {
                                        mobile: phoneNum,
                                        authcode: validcode,
                                        truename:realName,
                                        sid: SID
                                    },
                                    success: function(res) {
                                        if (res.code == "10" || res.code == "11" || res.code == "1") {
                                            // 没付款
                                            $("#gamelogin").hide();
                                            $("#gamemain").show();
                                            gameCountdown();
                                            // 已付款
                                            //location.href = res.data;
                                        } else {
                                            alert("验证码错误！");
                                        }
                                        $(".ui-css3loading").hide();
                                        phoneFormAjax = false;
                                    },
                                    error: function() {
                                        alert("出错了，请稍后重试！");
                                        $(".ui-css3loading").hide();
                                        phoneFormAjax = false;
                                    }
                                });
                            } else {
                                alert("请输入6位验证码！");
                            }

                        }
                    } else {
                        $.ajax({
                            url: "/baiying/checkticode",
                            type: 'POST',
                            dataType: 'json',
                            timeout: ajaxtimeout,
                            data: {
                                mobile: phoneNum,
                                truename:realName,
                                sid: SID,
                                rel_id:RELID
                            },
                            success: function(res) {
                                //alert(JSON.stringify(res));
                                if(res.code == 1000){
                                    location.href = res.data.url;
                                }else if(res.code == 1003){
                                    alert("请重新打开再试！");
                                    phoneFormAjax = false;
                                    return false;
                                }else if(res.code == 1001){
                                    $(".js-form-valid").removeClass("hide");
                                    $phoneForm.addClass("hide");
                                    $(".ui-css3loading").hide();
                                    phoneFormAjax = false;
                                    return false;
                                }else{
                                    $phoneForm.addClass("hide");
                                    $validForm.addClass("hide");
                                    $("#gamemain").removeClass("hide");
                                    gameCountdown();
                                    $(".ui-css3loading").hide();
                                    phoneFormAjax = false;
                                }
                            },
                            error: function() {
                                alert("出错了，请稍后重试！");
                                $(".ui-css3loading").hide();
                                phoneFormAjax = false;
                            }
                        });
                    }
                } else if (phoneNum.length === 0) {
                    alert("请输入手机号！");
                } else {
                    alert("请输入正确的手机号！");
                }
                return false;
            });
            var validCodeLock = false;
            parent.on("tap", ".js-form-phone .ui-validbtn", function() {
                var $phoneForm = $(".js-form-phone"),
                    $validForm = $(".js-form-phone"),
                    $validbtn = $(this),
                    phoneNum = $(".user_phone").val(),
                    timeout = 60;
                if (validCodeLock) {
                    return false;
                }
                $(".ui-css3loading").show();
                validCodeLock = true;
                $validbtn.addClass("disabled").text("获取中...");
                $.ajax({
                    url: "/order/messagecode",
                    type: 'POST',
                    dataType: 'json',
                    timeout: ajaxtimeout,
                    data: {
                        mobile: phoneNum,
                        sid: SID
                    },
                    success: function(res) {
                        var T;
                        if (res.code === "0") {
                            $validbtn.text(timeout + "秒");
                            _validTimeOut(timeout);
                        } else {
                            alert(res.msg);
                            $validbtn.removeClass("disabled").text("获取验证码");
                            validCodeLock = false;
                        }

                        function _validTimeOut(_timeout) {
                            if (_timeout >= 1) {
                                setTimeout(function() {
                                    _timeout -= 1;
                                    $validbtn.text(_timeout + "秒");
                                    _validTimeOut(_timeout);
                                }, 1000);
                            } else {
                                $validbtn.removeClass("disabled").text("获取验证码");
                                validCodeLock = false;
                            }
                        }
                        $(".ui-css3loading").hide();
                    },
                    error: function() {
                        alert("出错了，请稍后重试！");
                        $(".ui-css3loading").hide();
                        validCodeLock = false;
                        $validbtn.removeClass("disabled").text("获取验证码");
                    }
                });
                return false;
            });
        })();

        (function(){
            parent.on("tap", ".js-form-valid .js-prev-btn", function() {
                var $phoneForm = $(".js-form-phone"),
                    $validForm = $(".js-form-valid");
                $validForm.addClass("hide");
                $phoneForm.removeClass("hide");
            });
            var validFormAjax = false;
            parent.on("tap", ".js-form-valid .js-next-btn", function() {
                var $phoneForm = $(".js-form-phone"),
                    $validForm = $(".js-form-valid"),
                    $nextbtn = $(this),
                    phoneNum = $phoneForm.find(".user_phone").val(),
                    password = $validForm.find(".user_password").val(),
                    validcode = $validForm.find(".user_validcode").val(),
                    truename = $phoneForm.find(".user_name").val();
                if (validType == 1) {
                    var pattern1 = /^\w{6,}$/;
                    if (pattern1.test(password)) {
                        $(".ui-css3loading").show();
                        if (validFormAjax) {
                            return false;
                        }
                        validFormAjax = true;
                        $.ajax({
                            url: "/baiying/checkcode",
                            type: 'POST',
                            dataType: 'json',
                            timeout: ajaxtimeout,
                            data: {
                                mobile: phoneNum,
                                authcode: password,
                                truename:truename,
                                sid: SID
                            },
                            success: function(res) {
                                if (res.code == "10" || res.code == "11" || res.code == "1") {
                                    // 没付款
                                    $("#gamelogin").addClass("hide");
                                    $("#gamemain").removeClass("hide");
                                    gameCountdown();
                                    //location.href = res.data;
                                } else {
                                    alert("密码错误！");
                                }
                                $(".ui-css3loading").hide();
                                validFormAjax = false;
                            },
                            error: function() {
                                alert("出错了，请稍后重试！");
                                $(".ui-css3loading").hide();
                                validFormAjax = false;
                            }
                        });
                    } else {
                        alert("请输入正确密码！");
                    }
                } else if (validType == 2) {
                    var pattern2 = /^\d{6}$/;
                    if (pattern2.test(validcode)) {
                        $(".ui-css3loading").show();
                        if (validFormAjax) {
                            return false;
                        }
                        validFormAjax = true;
                        $.ajax({
                            url: "/baiying/checkcode",
                            type: 'POST',
                            dataType: 'json',
                            timeout: ajaxtimeout,
                            data: {
                                mobile: phoneNum,
                                authcode: validcode,
                                truename:truename,
                                sid: SID
                            },
                            success: function(res) {
                                if (res.code == "10" || res.code == "11" || res.code == "1") {
                                    // 没付款
                                    $("#gamelogin").hide();
                                    $("#gamemain").removeClass("hide");
                                    gameCountdown();
                                    //location.href = res.data;
                                } else {
                                    alert("验证码错误！");
                                }
                                $(".ui-css3loading").hide();
                                validFormAjax = false;
                            },
                            error: function() {
                                alert("出错了，请稍后重试！");
                                $(".ui-css3loading").hide();
                                validFormAjax = false;
                            }
                        });
                    } else {
                        alert("请输入6位验证码！");
                    }

                } else {
                    alert("未知错误");
                }
                return false;
            });

            var validCodeLock = false;
            parent.on("tap", ".js-form-valid .ui-validbtn", function() {
                var $phoneForm = $(".js-form-phone"),
                    $validForm = $(".js-form-valid"),
                    $validbtn = $(this),
                    phoneNum = $phoneForm.find(".user_phone").val(),
                    timeout = 60;
                if (validCodeLock) {
                    return false;
                }
                $(".ui-css3loading").show();
                validCodeLock = true;
                $validbtn.addClass("disabled").text("获取中...");
                $.ajax({
                    url: "/order/messagecode",
                    type: 'POST',
                    dataType: 'json',
                    timeout: ajaxtimeout,
                    data: {
                        mobile: phoneNum,
                        sid: SID
                    },
                    success: function(res) {
                        var T;
                        if (res.code === "0") {
                            $validbtn.text(timeout + "秒");
                            _validTimeOut(timeout);
                        } else {
                            alert(res.msg);
                            $validbtn.removeClass("disabled").text("获取验证码");
                            validCodeLock = false;
                        }

                        function _validTimeOut(_timeout) {
                            if (_timeout >= 1) {
                                setTimeout(function() {
                                    _timeout -= 1;
                                    $validbtn.text(_timeout + "秒");
                                    _validTimeOut(_timeout);
                                }, 1000);
                            } else {
                                $validbtn.removeClass("disabled").text("获取验证码");
                                validCodeLock = false;
                            }
                        }
                        $(".ui-css3loading").hide();
                    },
                    error: function() {
                        alert("出错了，请稍后重试！");
                        $(".ui-css3loading").hide();
                        validCodeLock = false;
                        $validbtn.removeClass("disabled").text("获取验证码");
                    }
                });
                return false;
            });
        })();
    })("gamelogin");


    var winNum = 50;
    var TIMEOUT = 10000;
    var H = $(window).height();
    var audioArr = {};
    var audioKick = [];
    audioArr.tension = document.getElementById("audio_tension");
    audioArr.kick = document.getElementById("audio_kick");
    audioArr.go = document.getElementById("audio_go");
    audioArr.victory = document.getElementById("audio_victory");
    audioArr.failure = document.getElementById("audio_failure");
    audioArr.countdown = document.getElementById("audio_countdown");

    var prosessHtml = '<div style="width: 100%; -webkit-animation-duration: 10s;" class="prosess prosess-anim"></div>';

    $("#iui").height(H);
    $("body").css("background-size",""+H+"px "+H+"px");
    $("#countdown-mask").css("line-height",H+"px").on("touchmove",function(e){
        e.preventDefault();
    });

    $(window).on("load",function(){
        cloneKickAudio();
        bindEvents();
    });

    function bindEvents() {

        if(UID != "weixin" && UID != 0){
            gameCountdown();
        }

    }

    function cloneKickAudio(){
        var num = 10;
        for (var i = 0; i < num; i++) {
            clone(i);
        }
        function clone(i){
            var a = $(audioArr.kick).clone();
            a[0].id += i;
            a.appendTo("body");
            audioKick.push(a);
            a[0].addEventListener("pause",function(){
                $(this).removeClass("playing");
            },false);
        }
    }

    function gameCountdown(){
        var times = 4;
        var mask = $("#countdown-mask").show();
        function ding(){
            if (times === 0) {
                setTimeout(function(){
                    mask.html('<span>准备</span>');
                },1000);
                return false;
            }
            times--;
            setTimeout(function(){
                if (times === 0) {
                    mask.html('<p class="lightShake">GO</p>');
                    audioArr.go.play();
                    setTimeout(function(){
                        gameBegin();
                        mask.hide();
                    },800);
                } else {
                    mask.text(times);
                    audioArr.countdown.play();
                }
                ding();
            },1000);
        }
        ding();
    }

    function gameBegin() {
        audioArr.tension.play();
        function kick(){
            for (var i = 0; i < audioKick.length; i++) {
                if (!audioKick[i].hasClass('playing')) {
                    audioKick[i][0].play();
                    audioKick[i].addClass('playing');
                    break;
                }
            }
        }
        $(".kick").on("touchstart",function(){
            $(this).css("background-position","0 -130px");
        });
        $(".kick").on("touchend",function(){
            kick();
            var that = $(this);
            $(".shoes").addClass('done');
            var num = $(".num span");
            num.text(num.text()-0+1);
            var T1,T2;
            clearTimeout(T2);
            T1 = setTimeout(function(){
                that.css("background-position","0 0");
                $(".shoes").removeClass('done');
                $(".pigu").show();
                T2 = setTimeout(function(){
                    $(".pigu").hide();
                },1000);
            },100);
            $(this).css("background-position","0 0");
        });

        var prosess = $(prosessHtml).one("webkitAnimationEnd",function(){
            gameEnd();
        });
        $(".prosess-wrap").append(prosess);
    }

    function gameEnd(){
        audioArr.tension.pause();
        $(".kick").off("tap touchstart touchend");
        var num = $(".num span").text();
        postResult(num);
        if (num >= winNum) {
            sharetext(num,SHARE_NAME);
            audioArr.victory.play();
            $("#gamevictory").show();
            $("#gamemain").hide();
        } else {
            audioArr.failure.play();
            $("#gamefailure").show();
            $("#gamemain").hide();
        }
        $(".prosess-wrap").empty();
        //alert("结束了,您踢了" + $(".num span").text() + "下");
    }
    function sharetext(num,name){
        if (navigator.userAgent.match( /micromessenger/gi )) {
            Share.WeChat.setData("title","我用" + num + "脚把" + name + "的PP爆了,你也来爽一把！");
        }
    }
    function postResult(num){
        $.ajax({
            url: '/baiying/gamesuccess',
            type: 'POST',
            dataType: 'json',
            data: {supnum:num,supportid: SUPPORTID},
            success: function(){
                console.log("success");
            },
            error: function(){
                console.log("error");
            }
        });
    }

    $(".replaybtn").on("tap",function(){
        $("#gamefailure").hide();
        $("#gamemain").show();
        $(".num span").text("0");
        gameCountdown();
    });

    $(".minebtn").on("tap",function(){

    });

    $(".sharebtn").on("tap",function(){
        $("#share-mask").show();
    });

    $("#share-mask").on("tap",function(){
        $(this).hide();
    });


});