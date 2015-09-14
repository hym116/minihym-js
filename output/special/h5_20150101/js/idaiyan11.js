;!function( Slider ) {
    Slider.prototype.initAnimation = function() {
        var progress = $("<div/>");
        var offset = $(".js-gain-button").offset();
        var wheight = $(window).height();
        progress.css({
            position:"absolute",
            width:212,
            height:212,
            left:offset.left,
            top:(offset.top%wheight),
            zIndex:9
        }).append('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="212" height="212" viewbox="0 0 212 212">'
        +'<path id="la-anim-6-loader" transform="translate(106, 106)" fill="rgba(0,161,215,.3)"/>'
        +'</svg>');
        $(".js-gain-button").css({
            position:"relative",
            zIndex:10
        }).after(progress);
        var tanimwait;
        var loader = document.getElementById('la-anim-6-loader')
            , α = 0
            , π = Math.PI
            , t = 15
            , tdraw;
        function PieDraw() {
            var a = ++α;
            α %= 360;
            var r = ( α * π / 180 )
            , x = Math.sin( r ) * 106
            , y = Math.cos( r ) * - 106
            , mid = 0;
            if ( a > 0 && a <= 180 ) {
                anim = 'M 0 0 v -106 A 106 106 1 ' 
                + mid + ' 1 ' 
                +  x  + ' ' 
                +  y  + ' z';
            } else if ( a > 180 && a <= 360 ){
                anim = 'M 0 0 v -106 A 106 106 1 1 1 0,106 A 106 106 1 ' 
                + mid + ' 1 ' 
                +  x  + ' ' 
                +  y  + ' z';
            }
            loader.setAttribute( 'd', anim );
            if( α > 0 && α < 3.60 * ( SUPPORT_RATE <= 100 ? SUPPORT_RATE : 100 ) )
            tdraw = setTimeout(PieDraw, t); // Redraw
        }
        function PieReset() {
            clearTimeout(tdraw);
            var anim = 'M 0 0 v -106 A 106 106 1 0 1 0 -106 z';
            α = 0;
            loader.setAttribute( 'd', anim );
        }
        var $apply = $( ".js-agreement" ),
            startSlideAnimation = function( swiper ) {
                var $activeSlide = $( swiper.activeSlide() );
                $activeSlide.children().removeClass( "hide" );
                if ($activeSlide.is(".slide-intro")) {
                    PieReset();
                    clearTimeout(tanimwait);
                    tanimwait = setTimeout(function(){
                        PieDraw();
                    },1000);
                };
            },
            hideAllSlideAnimation = function( swiper ) {
                var $activeSlide = $( swiper.activeSlide() );
                for ( var i = 0, l = swiper.slides.length; i < l; ++ i ) {
                    $( swiper.slides[i] ).children().addClass( "hide" );
                }
            },
            hideApplyAnimation = function() {
                $apply.children().addClass( "hide" );
            };

        this.swiper.addCallback( "FirstInit", function( swiper ) {
            setTimeout( function() {
                startSlideAnimation( swiper );
            }, 300);
        } );

        this.swiper.addCallback( "SlideReset", function( swiper, direction ) {
            startSlideAnimation( swiper );
        } );

        this.swiper.addCallback( "SlideChangeEnd", function( swiper, direction ) {
            hideAllSlideAnimation( swiper );
            hideApplyAnimation();
            startSlideAnimation( swiper );
        } );

        hideAllSlideAnimation( this.swiper );
    };
}( MobileSlider );
//scrollbar
Swiper.prototype.plugins.scrollbar=function(a,b){function c(a){return document.querySelectorAll?document.querySelectorAll(a):jQuery(a)}function d(c){w=!0,c.preventDefault?c.preventDefault():c.returnValue=!1,g(c),clearTimeout(z),a.setTransition(t,0),t.style.opacity=1,a.setWrapperTransition(100),a.setTransition(u,100),b.onScrollbarDrag&&b.onScrollbarDrag(a)}function e(c){w&&(c.preventDefault?c.preventDefault():c.returnValue=!1,g(c),a.setWrapperTransition(0),a.setTransition(t,0),a.setTransition(u,0),b.onScrollbarDrag&&b.onScrollbarDrag(a))}function f(){w=!1,b.hide&&(clearTimeout(z),z=setTimeout(function(){t.style.opacity=0,a.setTransition(t,400)},1e3)),b.snapOnRelease&&a.swipeReset()}function g(b){var c=y=0;if(s){var d="touchstart"==b.type||"touchmove"==b.type?b.targetTouches[0].pageX:b.pageX||b.clientX;c=d-a.h.getOffset(t).left-p/2,0>c?c=0:c+p>l&&(c=l-p)}else{var e="touchstart"==b.type||"touchmove"==b.type?b.targetTouches[0].pageY:b.pageY||b.clientY;y=e-a.h.getOffset(t).top-q/2,0>y?y=0:y+q>m&&(y=m-q)}a.setTranslate(u,{x:c,y:y});var f=-c/o,g=-y/o;a.setWrapperTranslate(f,g,0),a.updateActiveSlide(s?f:g)}function h(){u.style.width="",u.style.height="",s?(l=a.h.getWidth(t,!0),n=a.width/(a.h.getWidth(a.wrapper)+a.wrapperLeft+a.wrapperRight),o=n*(l/a.width),p=l*n,u.style.width=p+"px"):(m=a.h.getHeight(t,!0),n=a.height/(a.h.getHeight(a.wrapper)+a.wrapperTop+a.wrapperBottom),o=n*(m/a.height),q=m*n,q>m&&(q=m),u.style.height=q+"px"),r.style.display=n>=1?"none":""}var i=b&&b.container;if(i){var j={hide:!0,draggable:!0,snapOnRelease:!1};b=b||{};for(var k in j)k in b||(b[k]=j[k]);if((document.querySelectorAll||window.jQuery)&&(b.container.nodeType||0!=c(b.container).length)){var l,m,n,o,p,q,r=b.container.nodeType?b.container:c(b.container)[0],s="horizontal"==a.params.mode,t=r,u=document.createElement("div");u.className="swiper-scrollbar-drag",b.draggable&&(u.className+=" swiper-scrollbar-cursor-drag"),t.appendChild(u),b.hide&&(t.style.opacity=0);var v=a.touchEvents;if(b.draggable){var w=!1,x=a.support.touch?t:document;a.h.addEventListener(t,v.touchStart,d,!1),a.h.addEventListener(x,v.touchMove,e,!1),a.h.addEventListener(x,v.touchEnd,f,!1)}var z,A={onFirstInit:function(){h()},onInit:function(){h()},onTouchMoveEnd:function(){b.hide&&(clearTimeout(z),t.style.opacity=1,a.setTransition(t,200))},onTouchEnd:function(){b.hide&&(clearTimeout(z),z=setTimeout(function(){t.style.opacity=0,a.setTransition(t,400)},1e3))},onSetWrapperTransform:function(c){if(s){var d=c.x*o,e=p;if(d>0){var f=d;d=0,e=p-f}else-d+p>l&&(e=l+d);a.setTranslate(u,{x:-d}),u.style.width=e+"px"}else{var g=c.y*o,h=q;if(g>0){var f=g;g=0,h=q-f}else-g+q>m&&(h=m+g);a.setTranslate(u,{y:-g}),u.style.height=h+"px"}a.params.freeMode&&b.hide&&(clearTimeout(z),t.style.opacity=1,z=setTimeout(function(){t.style.opacity=0,a.setTransition(t,400)},1e3))},onSetWrapperTransition:function(b){a.setTransition(u,b.duration)},onDestroy:function(){var b=a.support.touch?t:document;a.h.removeEventListener(t,v.touchStart,d,!1),a.h.removeEventListener(b,v.touchMove,e,!1),a.h.removeEventListener(b,v.touchEnd,f,!1)}};return A}}};

$( function() {
    var agreementSwiper = null;
    var $powerScroll = $( ".js-power-scroll" );
    // new tab at pc
    if ( ! /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test( navigator.userAgent.toLowerCase() ) ) {
        $powerScroll.find( "a" ).attr( "target", "_blank" );
    }
    if (/^#share/.test(location.hash)) {
        $("#share-box").show();
    };
    $("#share-box").click(function(){
        $(this).hide();
        $(".slide-cover").find(".slide-wrapper").addClass("hide");
        setTimeout(function(){
            $(".slide-cover").find(".slide-wrapper").removeClass("hide");
        },300)
    });
    $powerScroll.find(".ui-supportrate").text(""+SUPPORT_RATE+"%");
    $powerScroll.delegate(".ui-agreement-link","click",function(){
        var agreement = $(".swiper-slide-active .ui-agreement-wrap");
        agreement.show();
        if (!agreementSwiper) {
            setTimeout(function(){
                agreementSwiper = new Swiper('.swiper-slide-active .slide-agreement .ui-content', {
                    scrollContainer:true,
                    mousewheelControl : true,
                    mode:'vertical',
                    wrapperClass: "swiper-w",
                    slideClass: "swiper-s",
                    //Enable Scrollbar
                    scrollbar: {
                      container :'.swiper-slide-active .swiper-scrollbar',
                      hide: false,
                      draggable: true
                    }
                });
            },100);
        };
        agreement.find(".ui-content").on("touchmove MSPointerMove mousewheel mousemove",function(e){
            e.preventDefault();
            e.stopPropagation();
        });
        agreement.find(".ui-close").one("click",function(){
            agreement.hide();
        })
    });

    $powerScroll.delegate(".ui-textarea","input",function(){
        var height = $(this).height();
        var scrollHeight = $(this)[0].scrollHeight;
        if (height <= scrollHeight ) {
            $(this).height("auto");
            $(this).height($(this)[0].scrollHeight+'px');
        }else{
            $(this).height("auto");
        };
    });
    $powerScroll.delegate(".js-gain-button","click",function(){
        if (!/MicroMessenger/i.test(navigator.userAgent)) {
            prompt("本活动仅支持微信获取，请到微信中打开以下链接",SITE_URL+"/extension_h5/productDetail/pid/"+PID);
            return false;
        }
        var $phoneForm = $(".js-form-phone"),
            $infosForm = $(".js-form-infos");
        if (UID > 0 && PAID == 0) {
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
        };

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
            pattern = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/;
        if (pattern.test(phoneNum)) {
            $(".ui-css3loading").show();
            if (phoneFormAjax) {
                return false;
            };
            if (PHONE && phoneNum == PHONE && UID > 0) {
                if (PAID == 1) {
                    return false;
                    alert("您已经支持过本产品！");
                };
                $infosForm.find(".ui-title span").text("核对信息");
                $phoneForm.addClass("hide");
                $infosForm.removeClass("hide");
                $infosForm.find(".ui-textarea").trigger("input");
                return false;
            };
            phoneFormAjax = true;
            $.ajax({
                url: IF_USER_BY_MOBILE,
                type: 'POST',
                dataType: 'json',
                timeout: ajaxtimeout,
                data: {mobile: phoneNum,pid:PID}
            })
            .done(function(res) {
                if (res.status == 2 && res.ispay == 1) {
                    PAID = 1;
                    registered = true;
                    $infosForm.find(".ui-title span").text("核对信息");
                    $phoneForm.addClass("hide");
                    $validForm.removeClass("hide");
                }else if (res.status == 2 && res.ispay == 0 ) {
                    registered = true;
                    $infosForm.find(".ui-title span").text("核对信息");
                    $phoneForm.addClass("hide");
                    $validForm.removeClass("hide");
                }else if(res.status == 1){
                    registered = false;
                    $infosForm.find(".ui-title span").text("完善信息");
                    $infosForm.find("input[name='user_phone']").val(phoneNum);
                    $infosForm.find("input[name='user_name']").val("");
                    $infosForm.find("textarea[name='user_address']").val("");
                    $phoneForm.addClass("hide");
                    $infosForm.removeClass("hide");
                }else if(res.status == 3){
                    alert("请输入正确的手机号！");
                }else{
                    alert(res.info);
                }
            })
            .fail(function() {
                alert("请检查网络并重试！");
            })
            .always(function() {
                $(".ui-css3loading").hide();
                 phoneFormAjax = false;
            });
        }else if(phoneNum.length == 0){
           alert("请输入手机号！");
        }else{
           alert("请输入正确的手机号！");
        };
        return false;
    });
    $powerScroll.delegate(".js-form-phone .js-prev-btn","click",function(){
        var $phoneForm = $(".js-form-phone")
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
                that.parent().find(".ui-swich-tip").text("切换用户密码");
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
                that.parent().find(".ui-swich-tip").text("切换短信密码");
                $validForm.find("input[name='user_validcode']").attr("name","user_password").attr("placeholder","填写用户密码");
                $validForm.find(".ui-validbtn-wrap").animate({opacity:0},200,function(){
                    $validForm.find(".ui-validcode-wrap").find("input").val("");
                    $validForm.find(".ui-validcode-wrap").animate({width:498},300);
                })
            });
        };
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
            var pattern = /^\w{6,}$/;
            if (pattern.test(password)) {
                $(".ui-css3loading").show();
                if (validFormAjax) {
                    return false;
                };
                validFormAjax = true;
                $.ajax({
                    url: CHECK_VALID_CODE,
                    type: 'POST',
                    dataType: 'json',
                    timeout: ajaxtimeout,
                    data: {mobile: phoneNum,authcode: password,checkkey: CHECKKEY}
                })
                .done(function(res) {
                    if (res.status == 1) {
                        if (PAID == 1) {
                            alert("您已经支持过本产品！");
                        };
                        var data = res.res;
                        UID = data.uid;
                        PHONE = data.mobile;
                        $infosForm.find("input[name='user_phone']").val(data.mobile || '');
                        $infosForm.find("input[name='user_name']").val(data.username || '');
                        $infosForm.find("textarea[name='user_address']").val(data.address || '');
                        $validForm.addClass("hide");
                        $infosForm.removeClass("hide");
                        $infosForm.find(".ui-textarea").trigger("input");
                    }else{
                        alert("密码错误！");
                    };
                })
                .fail(function() {
                    alert("请检查网络并重试！")
                })
                .always(function() {
                    $(".ui-css3loading").hide();
                    validFormAjax = false;
                });
            }else{
               alert("请输入正确密码！");
            };
        }else if(validType == 2){
            var pattern = /^\d{6}$/;
            if (pattern.test(validcode)) {
                $(".ui-css3loading").show();
                if (validFormAjax) {
                    return false;
                };
                validFormAjax = true;
                $.ajax({
                    url: CHECK_VALID_CODE,
                    type: 'POST',
                    dataType: 'json',
                    timeout: ajaxtimeout,
                    data: {mobile: phoneNum,authcode: validcode,checkkey:CHECKKEY}
                })
                .done(function(res) {
                    if (res.status == 1) {
                        if (PAID == 1) {
                            alert("您已经支持过本产品！");
                        };
                        var data = res.res;
                        UID = data.uid;
                        PHONE = data.mobile;
                        $infosForm.find("input[name='user_phone']").val(data.mobile || '');
                        $infosForm.find("input[name='user_name']").val(data.username || '');
                        $infosForm.find("textarea[name='user_address']").val(data.address || '');
                        $validForm.addClass("hide");
                        $infosForm.removeClass("hide");
                        $infosForm.find(".ui-textarea").trigger("input");
                    }else{
                        alert("验证码错误！");
                    };
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
            };

        }else{
            alert("未知错误");
        };
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
        };
        $(".ui-css3loading").show();
        validCodeLock = true;
        $validbtn.addClass("disabled").text("获取中...");
        $.ajax({
            url: SEND_VALID_CODE,
            type: 'POST',
            dataType: 'json',
            timeout: ajaxtimeout,
            data: {mobile: phoneNum,checkkey:CHECKKEY}
        })
        .done(function(res) {
            var T;
            if (res.status == "success") {
                $validbtn.text(timeout+"秒");
                _validTimeOut(timeout);
            }else{
                alert(res.info);
                $validbtn.removeClass("disabled").text("获取验证码");
            };
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
                };
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
        };
    });
    var infosFormAjax = false;
    $powerScroll.delegate(".js-form-infos .js-pay-btn","click",function(){
        var $infosForm = $(".js-form-infos"),
            $paybtn = $(this),
            pid = $("#product_id").val(),
            mobile = $infosForm.find("input[name='user_phone']").val(),
            name = $infosForm.find("input[name='user_name']").val(),
            address = $infosForm.find("textarea[name='user_address']").val();
        if (name.length == 0){
            alert("请输入姓名！");
            return false;
        }
        if (address.length == 0){
            alert("请输入地址！");
            return false;
        }
        if (infosFormAjax) {
            return false;
        };
        infosFormAjax = true;
        $(".ui-css3loading").show();
        $paybtn.addClass("disabled").text("提交中");
        $.ajax({
            url: CREATE_ORDER,
            type: 'POST',
            dataType: 'json',
            timeout: ajaxtimeout,
            data: {
                pid:pid,
                mobile: mobile,
                username: name,
                address: address,
                checkkey: CHECKKEY
            }
        })
        .done(function(res) {
            if (res.status == 1) {
                //跳到订单页
                //prompt("链接：",SITE_URL+'weixin/jsPay/id/'+res.res);
                location.href = SITE_URL+'weixin/jsPay/id/'+res.res;
            }else{
                alert("订单提交失败！");
            };
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
});
