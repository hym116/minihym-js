$(function() {
    var H = $(window).height();
    $("#iui").height(H);
    var id = $("body")[0].id;
    switch (id) {
        case "index":
            (function(id) {
                $("#scene").parallax();
                var guizeLayer = $(".guize-layer");
                $(".guize").on("tap",function(){
                    guizeLayer.removeClass("hide");
                });
                guizeLayer.find(".close").on("tap",function(){
                    guizeLayer.addClass("hide");
                });
            })(id);
            break;
        case "product-list":
            (function(id) {
                var page = 1;
                var more = true;
                var dataAdding = false;
                var offsetY = 50;
                var productList = $(".product-list");
                var myiScroll = new IScroll('.y-scroll', {
                    mouseWheel: true,
                    click: true
                });
                myiScroll.on('scrollEnd', function() {
                    if (more && (this.y - offsetY) < this.maxScrollY && dataAdding === false) {
                        addData(function() {
                            myiScroll.refresh();
                        });
                    }
                });
                //test todu delete
                var html = productList.html();

                function addData(callback) {
                    if (dataAdding) {
                        return false;
                    }
                    dataAdding = true;
                    page++;
                    $.ajax({
                        url: '/baiying/productlist',
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            page: page
                        },
                        success: function(data) {
                            console.log(data);
                            if (data.code == "0" && data.data.length > 0) {
                                productList.append(data.data);
                                if (callback) {
                                    callback();
                                }
                            } else if (data.code == "0" && data.data.length === 0) {
                                var infinite = $("#infinite");
                                infinite.text("没有更多了");
                                more = false;
                                setTimeout(function() {
                                    infinite.hide();
                                    myiScroll.refresh();
                                }, 1000);
                            }
                            dataAdding = false;
                            console.log("success");
                        },
                        error: function(a, b, c) {
                            dataAdding = false;
                            console.log(a);
                            console.log(b);
                            console.log(c);
                        }
                    });
                }
            })(id);
            break;
        case "product-item":
            (function(id) {
                var myiScroll = new IScroll('.y-scroll', {
                    mouseWheel: true,
                    click: true
                });
                $("iframe").on("load", function() {
                    $(this).css("opacity", "1");
                });
            })(id);
            break;
        case "personal-wrap":
            (function(id) {
                /*上传头像*/
                var $parent = $("#" + id);
                $parent.on("change", "input[type='file']", function() {
                    var parent = $(this).closest(".picture-uploader");
                    var preview = parent.find(".picture-preview");
                    var opts = {
                        maxSize: 10240
                    };
                    //支持html5的浏览器,比如高版本的firefox、chrome、ie10
                    if (this.files && this.files[0]) {
                        if (!sizeCheck(this.files[0].size)) {
                            return false;
                        }
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            callback(e.target.result);
                        };
                        reader.readAsDataURL(this.files[0]);
                    }

                    function sizeCheck(imageSize) {
                        if ((imageSize / 1024) > opts.maxSize) {
                            alert('图片大小不能超过' + opts.maxSize + 'K');
                            return false;
                        } else {
                            return true;
                        }
                    }

                    function callback(image) {
                        preview.css("background-image", "url(" + image + ")");
                    }
                });
                // 选择性别
                $parent.find(".js-sexual").on("tap", function() {
                    var that = $(this);
                    var btn = that.find(".circle-btn");
                    var male = that.find(".male");
                    var female = that.find(".female");
                    var value = $("#sexual");
                    if (btn.hasClass('active-m')) {
                        btn.removeClass('active-m').addClass('active-f');
                        male.removeClass('active-male');
                        female.addClass('active-female');
                        value.val("1"); //　男

                    } else {
                        btn.removeClass('active-f').addClass('active-m');
                        male.addClass('active-male');
                        female.removeClass('active-female');
                        value.val("2"); //女
                    }
                });

            })(id);
            break;
        case "order-info":
            (function(id) {
                //
                var parent = $("#" + id);

                var ajaxtimeout = 5000;
                var phoneFormAjax = false;
                var registered = false;
                var PHONE = 0;
                parent.on("tap", ".js-form-phone .js-submit-btn", function() {
                    var $phoneForm = $(".js-form-phone"),
                        $validForm = $(".js-form-valid"),
                        $nextbtn = $(this),
                        phoneNum = $phoneForm.find("input[name='tel']").val(),

                        pattern = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/;

                    if (pattern.test(phoneNum)) {
                        $(".ui-css3loading").show();
                        if (phoneFormAjax) {
                            return false;
                        }
                        if (PHONE && phoneNum == PHONE && UID > 0) {
                            if (PAID == 1) {
                                alert("您已经踢过本产品！");
                                return false;
                            }
                            $phoneForm.addClass("none");
                            return false;
                        }
                        phoneFormAjax = true;
                        $.ajax({
                            url: "/baiying/mobileuser",
                            type: 'POST',
                            dataType: 'json',
                            timeout: ajaxtimeout,
                            data: {
                                mobile: phoneNum,
                                rel_id: RELID
                            },
                            success: function(res) {
                                if (res.code == 1000) {
                                    PAID = 1;
                                    registered = true;
                                    $phoneForm.addClass("none");
                                    $validForm.removeClass("none");
                                } else if (res.code == 1001) {
                                    registered = true;
                                    $phoneForm.addClass("none");
                                    $validForm.removeClass("none");
                                } else if (res.code == 1002) {
                                    registered = false;
                                    $phoneForm.addClass("none");
                                    $validForm.removeClass("none");
                                } else if (res.code == 1003) {
                                    alert("请输入正确的手机号！");
                                } else {
                                    alert(res.msg);
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
                    } else if (phoneNum.length === 0) {
                        alert("请输入手机号！");
                    } else {
                        alert("请输入正确的手机号！");
                    }
                    return false;
                });
                // parent.on("tap",".js-form-phone .js-prev-btn",function(){
                //     var $phoneForm = $(".js-form-phone");
                //     $phoneForm.addClass("none");
                //     $(".js-arrow").show();
                // });
                var validType = 1;
                parent.on("tap", ".js-form-valid .ui-swich", function() {
                    var that = $(this);
                    var $validForm = $(".js-form-valid");
                    if (!that.hasClass("checked")) {
                        validType = 2;
                        that.addClass("checked");
                        that.find(".ui-swich-anim").animate({
                            width: 66
                        }, 300, function() {
                            that.parent().find(".ui-swich-tip").text("或使用密码登录");
                            $validForm.find("input[name='user_password']").attr("name", "user_validcode").attr("placeholder", "验证码");
                            $validForm.find(".ui-validcode-wrap").find("input").val("");
                            $validForm.find(".ui-validcode-wrap").animate({
                                width: 138
                            }, 300, function() {
                                $validForm.find(".ui-validbtn-wrap").animate({
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
                            $validForm.find("input[name='user_validcode']").attr("name", "user_password").attr("placeholder", "密码");
                            $validForm.find(".ui-validbtn-wrap").animate({
                                opacity: 0
                            }, 200, function() {
                                $validForm.find(".ui-validcode-wrap").find("input").val("");
                                $validForm.find(".ui-validcode-wrap").animate({
                                    width: 280
                                }, 300);
                            });
                        });
                    }
                });
                parent.on("tap", ".js-form-valid .js-prev-btn", function() {
                    var $phoneForm = $(".js-form-phone"),
                        $validForm = $(".js-form-valid");
                    $validForm.addClass("none");
                    $phoneForm.removeClass("none");
                });
                var validFormAjax = false;
                parent.on("tap", ".js-form-valid .js-submit-btn", function() {
                    var $phoneForm = $(".js-form-phone"),
                        $validForm = $(".js-form-valid"),
                        $nextbtn = $(this),
                        phoneNum = $phoneForm.find("input[name='tel']").val(),
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
                                url: "/baiying/checkcode",
                                type: 'POST',
                                dataType: 'json',
                                timeout: ajaxtimeout,
                                data: {
                                    mobile: phoneNum,
                                    authcode: password,
                                    rel_id: RELID
                                },
                                success: function(res) {
                                    if (res.code == "10") {
                                        location.href = res.data;
                                    } else if (res.code == "11") {
                                        // 已付款
                                        location.href = res.data;
                                    } else if (res.code == "4") {
                                        // rel_id = 0
                                        location.href = res.data;
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
                                    rel_id: RELID
                                },
                                success: function(res) {
                                    if (res.code == "10") {
                                        // 没付款
                                        location.href = res.data;
                                    } else if (res.code == "11") {
                                        // 已付款
                                        location.href = res.data;
                                    } else if (res.code == "4") {
                                        // rel_id = 0
                                        location.href = res.data;
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
                        phoneNum = $phoneForm.find("input[name='tel']").val(),
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
                            mobile: phoneNum
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

            })(id);
            break;
        case "buy-success":
            (function(id) {
                var $parent = $("#" + id);
                var myiScroll = new IScroll('.y-scroll', {
                    mouseWheel: true,
                    click: true
                });
                $parent.find(".footerbtn").on("tap",function(){
                    $("#share-mask").show();
                    return false;
                });
                $("#share-mask").on("tap",function(){
                    $(this).hide();
                });
            })(id);
            break;
        case "mine-list-wrap":
            (function(id) {
                var myiScroll = new IScroll('.y-scroll', {
                    mouseWheel: true,
                    click: true
                });
            })(id);
            break;
        case "finally":
            (function(id) {
                var $parent = $("#" + id);
                var myiScroll = new IScroll('.y-scroll', {
                    mouseWheel: true,
                    click: true
                });
                $parent.find(".footerbtn").on("tap",function(){
                    $("#share-mask").show();
                    return false;
                });
                $("#share-mask").on("tap",function(){
                    $(this).hide();
                });
            })(id);
            break;
        case "see-product":
            (function(id) {
                var $parent = $("#" + id);
                var myiScroll = new IScroll('.y-scroll', {
                    mouseWheel: true,
                    click: true
                });
                $parent.find(".footerbtn").on("tap",function(){
                    $("#share-mask").show();
                    return false;
                });
                $("#share-mask").on("tap",function(){
                    $(this).hide();
                });
            })(id);
            break;
        case "address-wrap":
            (function(id) {
                var $parent = $("#" + id);
                var myiScroll = new IScroll('.y-scroll', {
                    mouseWheel: true,
                    click: true
                });
                    var ajaxing = false;
                $parent.find(".footerbtn").on("tap",function(){
                    var address = $(".address textarea").val();
                    if (address.length<10) {
                        alert("请输入更详细的地址！");
                        return false;
                    }
                    if (ajaxing === true) {
                        return false;
                    }
                    ajaxing = true;
                    $.ajax({
                        url: '/order/orderbuild',
                        type: 'POST',
                        dataType: 'json',
                        data: {rel_id: RELID,a_id: AID,address: address,share_name:SHARE_NAME},
                        success: function(data){
                            if (data.code == 1) {
                                location.href = data.data;
                            } else {
                                alert(data.msg);
                            }
                            ajaxing = false;
                            console.log("success");
                        },
                        error: function(a,b,c){
                            alert("出错啦！请稍后重试！");
                            ajaxing = false;
                            console.log("error");
                        }
                    });
                    return false;
                });
            })(id);
            break;
        case "support-list":
            (function(id) {
                var $parent = $("#" + id);
                var myiScroll = new IScroll('.y-scroll', {
                    mouseWheel: true,
                    click: true
                });
                    var ajaxing = false;
                $parent.find(".footerbtn").on("tap",function(){
                    var address = $(".address textarea").val();
                    if (address.length<10) {
                        alert("请输入更详细的地址！");
                    }
                    if (ajaxing === true) {
                        return false;
                    }
                    ajaxing = true;
                    $.ajax({
                        url: '/order/orderbuild',
                        type: 'POST',
                        dataType: 'json',
                        data: {rel_id: RELID,a_id: AID,address: address},
                        success: function(data){
                            if (data.code == 1) {
                                location.href = data.data;
                            } else {
                                alert(data.msg);
                            }
                            ajaxing = false;
                            console.log("success");
                        },
                        error: function(){
                            alert("出错啦！请稍后重试！");
                            ajaxing = false;
                            console.log("error");
                        }
                    });
                    return false;
                });
            })(id);
            break;
        default:
            break;
    }

});
var Share={};
(function() {
    var e = {
        defaultData: {
            title: (document.getElementsByTagName("title")[0].innerHTML || "").replace(/&nbsp;/g, " "),
            desc: "",
            link: location.href.split("#")[0] || "",
            imgUrl: "",
            trigger: function(){},
            complete: function(){},
            success: function(){},
            cancel: function(){},
            fail: function(){}
        },
        customData: {},
        callback: [],
        isInit: !1,
        init: function() {
            var e = this;
            if (this.isInit){
                return false;
            }else{
                this.isInit = true;
                this.rebind();
            }
        },
        setData: function(e, t) {
            var n = this.customData;
            if ("object" == typeof e)
                for (var i in e)
                    n[i] = e[i];
            else
                n[e] = t;
        },
        getData: function() {
            var e = this.defaultData,
                t = this.customData,
                n = {};
            for (var i in e)
                n[i] = e[i];
            for (var _i in t)
                n[_i] = t[_i];
            return n;
        },
        rebind: function() {
            var e = this;
            if (navigator.userAgent.match(/micromessenger/gi)) {
                wx.ready(function(){
                    var t = e.getData();
                    wx.onMenuShareAppMessage(t);
                    wx.onMenuShareTimeline(t);
                    wx.onMenuShareQQ(t);
                    wx.onMenuShareWeibo(t);
                });
            }
        }
    };
    window.Share.WeChat = {
        setData: function(t, n) {
            e.setData(t, n);
            e.rebind();
        },
        getData: function() {
            return e.getData();
        }
    };
    e.init();
})();