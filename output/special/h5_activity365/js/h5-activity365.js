(function(Slider) {
    Slider.prototype.initAnimation = function() {
        var $apply = $(".js-gain"),
            startSlideAnimation = function(swiper) {
                var $activeSlide = $(swiper.activeSlide());
                $activeSlide.children().removeClass("hide");
            },
            hideAllSlideAnimation = function(swiper) {
                var $activeSlide = $(swiper.activeSlide());
                for (var i = 0, l = swiper.slides.length; i < l; ++i) {
                    $(swiper.slides[i]).children().addClass("hide");
                }
            },
            hideApplyAnimation = function() {
                $apply.children().addClass("hide");
            };

        var slideinit = function(swiper) {
            var $activeSlide = $(swiper.activeSlide());
            var current = $activeSlide.hasClass('slide-intro');
            if (current) {
                $(".js-arrow").hide();
            } else {
                $(".js-arrow").show();
            }
            if ($activeSlide.data("swiper")) {
                return false;
            }
            if (current) {
                var myswiper = new Swiper(".swiper-container-x", {
                    pagination: '.pagination-x',
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    slidesPerView: 1,
                    paginationClickable: true,
                    spaceBetween: 30,
                    loop: true,
                    autoplay: 2500
                });
                $activeSlide.data("swiper", myswiper);
                $(".swiper-button-next").click(function() {
                    myswiper.swipeNext();
                });
                $(".swiper-button-prev").click(function() {
                    myswiper.swipePrev();
                });
            }
            //slide-intro
            if (!$activeSlide.hasClass('slide-video')) {
                $("#video-wrap").hide();
            }else{
                $("#video-wrap").show();
            }
        };

        this.swiper.addCallback("FirstInit", function(swiper) {
            setTimeout(function() {
                startSlideAnimation(swiper);
            }, 300);
        });

        this.swiper.addCallback("SlideReset", function(swiper, direction) {
            startSlideAnimation(swiper);
        });

        this.swiper.addCallback("SlideChangeEnd", function(swiper, direction) {
            hideAllSlideAnimation(swiper);
            hideApplyAnimation();
            startSlideAnimation(swiper);
            slideinit(swiper);
        });

        hideAllSlideAnimation(this.swiper);
    };
})(MobileSlider);

$(function() {
   
    var jCountdown = function (leftTime, tpl, obj, callback) {
        var T = setTimeout(function() {
            countdown();
        }, 1000);

        function countdown() {

            if (leftTime <= 0) {
                clearTimeout(T);
                if (callback) {
                    callback();
                }
                return false;
            }

            var day = Math.floor(leftTime / (60 * 60 * 24));
            var hour = Math.floor((leftTime - day * 24 * 60 * 60) / 3600);
            var minute = Math.floor((leftTime - day * 24 * 60 * 60 - hour * 3600) / 60);
            var second = Math.floor(leftTime - day * 24 * 60 * 60 - hour * 3600 - minute * 60);

            leftTime--;

            var html = tpl.replace(/(\{D\})|(\{hh\})|(\{mm\})|(\{ss\})/g, function(matches) {
                var res;
                switch (matches) {
                    case "{D}":
                        res = day;
                        break;
                    case "{hh}":
                        res = hour;
                        break;
                    case "{mm}":
                        res = minute;
                        break;
                    case "{ss}":
                        res = second;
                        break;
                    default:
                        res = "";
                        break;
                }
                return res;
            });

            obj.html(html);

            T = setTimeout(function() {
                countdown();
            }, 1000);

        }
    };
    var $powerScroll = $(".js-power-scroll");
    // new tab at pc
    if (!/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) {
        $powerScroll.find("a").attr("target", "_blank");
    }

    $powerScroll.delegate(".ui-textarea","input",function(){
        var height = $(this).height();
        var scrollHeight = $(this)[0].scrollHeight;
        if (height <= scrollHeight ) {
            $(this).height("auto");
            $(this).height($(this)[0].scrollHeight+'px');
        }else{
            $(this).height("auto");
        }
    });

    $powerScroll.delegate(".js-gain-button","click",function(){
        // if (!/MicroMessenger/i.test(navigator.userAgent)) {
        //     prompt("本活动仅支持微信获取，请到微信中打开以下链接",SITE_URL);
        //     return false;
        // }
        var $phoneForm = $(".js-form-phone"),
            $infosForm = $(".js-form-infos");
        if (UID > 0 && PAID === 0) {
            $infosForm.find(".ui-title span").text("核对信息");
            $infosForm.removeClass("hide");
            $infosForm.find(".ui-textarea").trigger("input");
        }else if(UID > 0 &&  PAID == 1){
            alert("您已经支持过本产品！");
        }else{
            $phoneForm.removeClass("hide");
            $(".js-arrow").hide();
            $(".slide-gain").on("touchmove mousewheel mousemove",function(e){
                e.preventDefault();
                e.stopPropagation();
            });
        }

    });

    var ajaxtimeout = 5000;
    var phoneFormAjax = false;
    var registered = false;
    var PHONE = 0;
    $powerScroll.delegate(".js-form-phone .js-submit-btn","click",function(){
        var $phoneForm = $(".js-form-phone"),
            $validForm = $(".js-form-valid"),
            $infosForm = $(".js-form-infos"),
            $nextbtn = $(this),
            phoneNum = $phoneForm.find("input[name='user_phone']").val(),

            pattern = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/;

        if (pattern.test(phoneNum)) {
            $(".ui-css3loading").show();
            if (phoneFormAjax) {
                return false;
            }
            if (PHONE && phoneNum == PHONE && UID > 0) {
                if (PAID == 1) {
                    alert("您已经支持过本产品！");
                    $phoneForm.addClass("hide");
                    $infosForm.addClass("hide");
                    $validForm.addClass("hide");
                    return false;
                }
                $infosForm.find(".ui-title span").text("核对信息");
                $phoneForm.addClass("hide");
                $infosForm.removeClass("hide");
                $infosForm.find(".ui-textarea").trigger("input");
                return false;
            }
            phoneFormAjax = true;
            $.ajax({
                url: "/order/mobileuser",
                type: 'POST',
                dataType: 'json',
                timeout: ajaxtimeout,
                data: {mobile: phoneNum,rel_id:RELID}
            })
            .done(function(res) {
                if (res.code == 1000) {
                    PAID = 1;
                    registered = true;
                    alert("您已经支持过本产品！");
                    $infosForm.find(".ui-title span").text("核对信息");
                    $infosForm.find("input[name='user_phone']").val(phoneNum);
                    $phoneForm.addClass("hide");
                    $infosForm.addClass("hide");
                    $validForm.addClass("hide");
                }else if (res.code == 1001) {
                    registered = true;
                    $infosForm.find(".ui-title span").text("核对信息");
                    $infosForm.find("input[name='user_phone']").val(phoneNum);
                    $phoneForm.addClass("hide");
                    $validForm.removeClass("hide");
                }else if(res.code == 1002){
                    registered = false;
                    $infosForm.find(".ui-title span").text("完善信息");
                    $infosForm.find("input[name='user_phone']").val(phoneNum);
                    $infosForm.find("input[name='user_name']").val("");
                    $infosForm.find("textarea[name='user_address']").val("");
                    $phoneForm.addClass("hide");
                    $validForm.removeClass("hide");
                }else if(res.code == 1003){
                    alert("请输入正确的手机号！");
                }else{
                    alert(res.msg);
                }
            })
            .fail(function() {
                alert("请检查网络并重试！");
            })
            .always(function() {
                $(".ui-css3loading").hide();
                 phoneFormAjax = false;
            });
        }else if(phoneNum.length === 0){
           alert("请输入手机号！");
        }else{
           alert("请输入正确的手机号！");
        }
        return false;
    });
    $powerScroll.delegate(".js-form-phone .js-prev-btn","click",function(){
        var $phoneForm = $(".js-form-phone");
        $phoneForm.addClass("hide");
        $(".js-arrow").show();
    });
    var validType = 1;
    $powerScroll.delegate(".js-form-valid .ui-swich","click",function(){
        var that = $(this);
        var $validForm = $(".js-form-valid");
        if (!that.hasClass("checked")) {
            validType = 2;
            that.addClass("checked");
            that.find(".ui-swich-anim").animate({width:88},300,function(){
                that.parent().find(".ui-swich-tip").text("或使用登录密码登录");
                $validForm.find("input[name='user_password']").attr("name","user_validcode").attr("placeholder","填写短信密码");
                $validForm.find(".ui-validcode-wrap").find("input").val("");
                $validForm.find(".ui-validcode-wrap").animate({width:248},300,function(){
                    $validForm.find(".ui-validbtn-wrap").animate({opacity:1},200);
                });
            });
        }else{
            that.removeClass("checked");
            validType = 1;
            that.find(".ui-swich-anim").animate({width:48},300,function(){
                that.parent().find(".ui-swich-tip").text("或使用短信验证登录");
                $validForm.find("input[name='user_validcode']").attr("name","user_password").attr("placeholder","填写用户密码");
                $validForm.find(".ui-validbtn-wrap").animate({opacity:0},200,function(){
                    $validForm.find(".ui-validcode-wrap").find("input").val("");
                    $validForm.find(".ui-validcode-wrap").animate({width:498},300);
                });
            });
        }
    });
    $powerScroll.delegate(".js-form-valid .js-prev-btn","click",function(){
        var $phoneForm = $(".js-form-phone"),
            $validForm = $(".js-form-valid");
        $validForm.addClass("hide");
        $phoneForm.removeClass("hide");
    });
    var validFormAjax = false;
    $powerScroll.delegate(".js-form-valid .js-next","click",function(){
        var $phoneForm = $(".js-form-phone"),
            $validForm = $(".js-form-valid"),
            $infosForm = $(".js-form-infos"),
            $nextbtn = $(this),
            phoneNum = $phoneForm.find("input[name='user_phone']").val(),
            password = $validForm.find("input[name='user_password']").val(),
            validcode = $validForm.find("input[name='user_validcode']").val();
        if (validType == 1) {
            var pattern1 = /^\w{6,}$/;
            if (pattern1.test(password)) {
                $(".ui-css3loading").show();
                if (validFormAjax) {
                    return false;
                }
                validFormAjax = true;
                $.ajax({
                    url: "/order/checkcode",
                    type: 'POST',
                    dataType: 'json',
                    timeout: ajaxtimeout,
                    data: {mobile: phoneNum,authcode: password}
                })
                .done(function(res) {
                    if (res.code == 1) {
                        if (PAID == 1) {
                            alert("您已经支持过本产品！");
                            $phoneForm.addClass("hide");
                            $infosForm.addClass("hide");
                            $validForm.addClass("hide");
                            return false;
                        }
                        var data = res.data;
                        UID = data.uid;
                        PHONE = data.mobile;
                        $infosForm.find("input[name='user_name']").val(data.username || '');
                        $infosForm.find("textarea[name='user_address']").val(data.address || '');
                        $validForm.addClass("hide");
                        $infosForm.removeClass("hide");
                        $infosForm.find(".ui-textarea").trigger("input");
                    }else{
                        alert("密码错误！");
                    }
                })
                .fail(function() {
                    alert("请检查网络并重试！");
                })
                .always(function() {
                    $(".ui-css3loading").hide();
                    validFormAjax = false;
                });
            }else{
               alert("请输入正确密码！");
            }
        }else if(validType == 2){
            var pattern2 = /^\d{6}$/;
            if (pattern2.test(validcode)) {
                $(".ui-css3loading").show();
                if (validFormAjax) {
                    return false;
                }
                validFormAjax = true;
                $.ajax({
                    url: "/order/checkcode",
                    type: 'POST',
                    dataType: 'json',
                    timeout: ajaxtimeout,
                    data: {mobile: phoneNum,authcode: validcode}
                })
                .done(function(res) {
                    if (res.code == 1) {
                        if (PAID == 1) {
                            alert("您已经支持过本产品！");
                            $phoneForm.addClass("hide");
                            $infosForm.addClass("hide");
                            $validForm.addClass("hide");
                        }
                        var data = res.data;
                        UID = data.uid;
                        PHONE = data.mobile;
                        $infosForm.find("input[name='user_name']").val(data.username || '');
                        $infosForm.find("textarea[name='user_address']").val(data.address || '');
                        $validForm.addClass("hide");
                        $infosForm.removeClass("hide");
                        $infosForm.find(".ui-textarea").trigger("input");
                    }else{
                        alert("验证码错误！");
                    }
                })
                .fail(function() {
                    alert("请检查网络并重试！");
                })
                .always(function() {
                    $(".ui-css3loading").hide();
                    validFormAjax = false;
                });
            }else{
               alert("请输入6位验证码！");
            }

        }else{
            alert("未知错误");
        }
        return false;
    });

    var validCodeLock = false;
    $powerScroll.delegate(".js-form-valid .ui-validbtn","click",function(){
        var $phoneForm = $(".js-form-phone"),
            $validForm = $(".js-form-valid"),
            $validbtn = $(this),
            phoneNum = $phoneForm.find("input[name='user_phone']").val(),
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
            data: {mobile: phoneNum}
        })
        .done(function(res) {
            var T;
            if (res.code === "0") {
                $validbtn.text(timeout+"秒");
                _validTimeOut(timeout);
            }else{
                alert(res.msg);
                $validbtn.removeClass("disabled").text("获取验证码");
            }
            function _validTimeOut(_timeout){
                if (_timeout >= 1) {
                    setTimeout(function(){
                        _timeout -= 1;
                        $validbtn.text(_timeout+"秒");
                        _validTimeOut(_timeout);
                    },1000);
                }else{
                    $validbtn.removeClass("disabled").text("获取验证码");
                    validCodeLock = false;
                }
            }
        })
        .fail(function() {
            alert("请检查网络并重试！");
            validCodeLock = false;
            $validbtn.removeClass("disabled").text("获取验证码");
        })
        .always(function() {
            $(".ui-css3loading").hide();
        });
        return false;
    });

    $powerScroll.delegate(".js-form-infos .js-prev-btn","click",function(){
        var $phoneForm = $(".js-form-phone"),
            $infosForm = $(".js-form-infos"),
            uid = UID || 0;
        if (uid > 0) {
            $infosForm.addClass("hide");
        }else{
            $infosForm.addClass("hide");
            $phoneForm.removeClass("hide");
        }
    });
    var infosFormAjax = false;
    $powerScroll.delegate(".js-form-infos .js-pay-btn","click",function(){
        var $infosForm = $(".js-form-infos"),
            $paybtn = $(this),
            mobile = $infosForm.find("input[name='user_phone']").val(),
            name = $infosForm.find("input[name='user_name']").val(),
            address = $infosForm.find("textarea[name='user_address']").val();
        if (name.length === 0){
            alert("请输入姓名！");
            return false;
        }
        if (address.length === 0){
            alert("请输入地址！");
            return false;
        }
        if (infosFormAjax) {
            return false;
        }
        infosFormAjax = true;
        $(".ui-css3loading").show();
        $paybtn.addClass("disabled").text("提交中");
        $.ajax({
            url: "/order/build",
            type: 'POST',
            dataType: 'json',
            timeout: ajaxtimeout,
            data: {
                rel_id:RELID,
                mobile: mobile,
                truename: name,
                address: address
            }
        })
        .done(function(res) {
            if (res.code == 1) {
                //跳到订单页
                console.log(res);
                //prompt("链接：",SITE_URL+'weixin/jsPay/id/'+res.res);
                location.href = res.data;
            }else{
                alert("订单提交失败！");
            }
        })
        .fail(function() {
            alert("请检查网络并重试！");
        })
        .always(function() {
            infosFormAjax = false;
            $(".ui-css3loading").hide();
        });
        return false;
    });
    $powerScroll = null;

    $(document).on("click", "#partner", function() {
        var partnerbox = $(".slide-intro .prdoct-feature");
        $(".gray-bg").show();
        partnerbox.show("2000");
        partnerbox.find(".close").click(function() {
            partnerbox.hide();
            $(".gray-bg").hide();
        });
    });

    $(document).on("click", ".js-popup li", function() {
        var that = $(this);
        var src = "http://static.idaiyan.cn/special/h5_activity365/images/5-icon";
        var parent = that.closest('.js-popup');
        var itemBox = parent.find(".prdoct-feature");
        var imgBox = itemBox.find(".top-icon img");
        var titleBox = itemBox.find(".content h3");
        var contentBox = itemBox.find(".content p");
        var sum = src + (that.index() + 1) + '.png';
        var data = that.attr("data-content");
        var title = that.find("p").html();
        imgBox.attr("src", sum);
        titleBox.html(title);
        contentBox.text(data);

        itemBox.show();
        itemBox.find('.close').click(function() {
            itemBox.hide();
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

        var text1 = "{tpl}";
        var text2 = "{tpl}";
        var text3 = "此活动已结束";

        var tpl = '<span> {D} </span> : <span> {hh} </span> : <span> {mm}</span> :<span> {ss} </span>';

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
});
//  优酷视频接入
// var wh = { };
window.onload = function(){
    /*wh = function () {
     var dimension = {};
     dimension.width = window.innerWidth;
     dimension.height = window.innerHeight;
     //console.log(dimension);
     return dimension;

     }();*/

    var script = document.getElementById('_youkujs_');
    script.src = 'http://player.youku.com/jsapi';
    // script.src = '/js/youku-jsapi.js';
    script.onload = script.onreadystatechange = function(){

        if(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'){
            /*QS.width = QS.width ? QS.width : wh.width;
             QS.height = QS.height ? QS.height :wh.height;*/
            // var arr = window.location.pathname.split('/');
            // if(arr.length == 3 && arr[1] == 'embed' && arr[2].charAt(0) == 'X' ){
            //     QS.vid = arr[2];
            // }
            QS.vid = document.getElementById("video_url").value;
            if (!QS.vid) {
                return false;
            }
            if(QS.target == null ) QS.target = "videobox";
            if(QS.client_id == null) QS.client_id = "youkuind";
            var _select = new YoukuPlayerSelect(QS);
            _select.select();
            // var player = new YKU.Player("youku-playerBox", {
            // styleid: "0",
            // client_id: "168eed9e805f5239",
            // vid: "XOTU0NzAzMjUy",
            // show_related: !1,
            // autoplay: !0,
            // events: {
            //     onPlayerReady: function(){},
            //     onPlayStart: function(){},
            //     onPlayEnd: function(){}
            // }});
        }
    };
};