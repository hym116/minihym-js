define('js/modules/pkgs/product-list', ['require', 'exports', 'module', "jquery", "js/modules/libs/superslide/jquery.SuperSlide.2.1.1.source", "js/modules/pkgs/progress", "js/modules/libs/ui/tip/tip", "js/modules/pkgs/favourite", "js/modules/pkgs/follow", "js/modules/apis/api-aio"],function(require, exports, module) {
var $ = require("jquery");
require("js/modules/libs/superslide/jquery.SuperSlide.2.1.1.source");
var Progress = require("js/modules/pkgs/progress");
var Boxy = require("js/modules/libs/ui/tip/tip");
var Favourite = require("js/modules/pkgs/favourite");
var Follow = require("js/modules/pkgs/follow");
var API = require("js/modules/apis/api-aio");

var MYPRODUCT_URL = API.getUrl("PRODUCT", "GET_PRODUCT_BY_UID");

exports.init = function() {

    var prodlist = $(".prodlist");

    $(".proditem").each(function() {
        var that = $(this);
        var button = that.find(".heart");
        var followButton = that.find(".add1");
        var pid = that.data("pid");
        var uid = that.data("uid");
        var user_numbers = $(".user_numbers");
        //console.log(uid);
        var favourite = new Favourite(button, {
            pid: pid,
            callback: function(data) {
                if (/^\d+$/.test(data.data.follow_num)) {
                    that.find(".icon-love b").text(data.data.follow_num);
                }
                if (user_numbers.length) {
                    user_numbers.find(".popularity b").text(data.data.renqi);
                    user_numbers.find(".likednum").text(data.data.pfollow_allnum);
                }
            }
        });
        var follow = new Follow(followButton, {
            uid: uid,
            likedClass:"hover"
        });
    });

    $(".add_icon").on("click", function(e) {
        var target = $(e.target);
        var that = $(this);
        var parent = target.closest(".proditem");
        var activity = parent.find(".activity");
        parent.siblings('.proditem').find('.activity').hide()
                                    .end()
                                    .find(".add_icon").removeClass('whitebkg');
        if (activity.length) {
            activity.show();
            that.addClass('whitebkg');
            parent.find(".prodrate .axis").hide();
            parent.find(".progress").each(function() {
                var data = $(this).attr("data-progress") - 0;
                var progress = new Progress($(this), data, {
                    x: 31,
                    y: 31,
                    r: 31,
                    r0: 28,
                    color: "#00a1d7"
                }, 600);
                progress.show();
                progress = null;
            });

        }
        e.stopPropagation();
    });
    $(document).on("click", function(e) {
        $(".activity").hide();
        $(".add_icon").removeClass('whitebkg');
    });

    /**
     * 其他产品
     */
    var myprodlistloading = false;
    var mouseenter = false;
    prodlist.find(".portrait").mouseenter(function() {
        mouseenter = true;
        var item = $(this).closest(".proditem");
        var uid = item.attr("data-uid");
        var ajaxing = false;
        if ($(this).find(".small_img li").length || myprodlistloading) {
            item.find(".portrait_hover").show();
            item.find(".avtivity").hide();
            return false;
        }
        myprodlistloading = true;
        $.ajax({
                url: MYPRODUCT_URL,
                type: 'GET',
                dataType: 'json',
                data: {
                    uid: uid
                }
            })
            .done(function(data) {
                if (data.code == "0") {
                    var html = "";
                    var length = data.data.length > 3 ? 3 : data.data.length;
                    if (length > 0) {
                        for (var i = 0; i < length; i++) {
                            html += '<li data-tip="' + data.data[i].name + '""><a href="/product/view?id=' + data.data[i].id + '"><img src="' + data.data[i].album + '"></a></li>';
                        }
                    }
                    if (3 - length > 0) {
                        for (var j = 0; j < (3 - length); j++) {
                            html += '<li class="b1"></li>';
                        }
                    }
                    item.find(".small_img").html(html);
                    if (mouseenter) {
                        item.find(".portrait_hover").show();
                    }
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                myprodlistloading = false;
                console.log("complete");
            });
    }).mouseleave(function() {
        mouseenter = false;
        $(this).closest(".proditem").find(".portrait_hover").hide();
    });

    /**
     * 幻灯
     */
    prodlist.find(".prodimg").each(function() {
        if ($(this).find("img").length > 1) {
            $(this).slide({
                mainCell: "ul",
                effect: "fold",
                delayTime: 1000,
                prevCell: ".btn_l",
                nextCell: ".btn_r"
            });
        } else {
            $(this).find(".btn,.pageState").hide();
        }
    });

    /**
     * 数字气泡
     */
    prodlist.find('.prodnums .icon').mouseenter(function() {
        var tip = Boxy.linkedTo(this);
        var b = $(this).find("b");
        if (tip) {
            tip.show();
        } else {
            var message = b.data("tip");
            if (message) {
                Boxy.tip(message, {
                    actuator: this,
                    arrow: 'bottom'
                });
            }
        }
    }).mouseleave(function() {
        var tip = Boxy.linkedTo(this);
        if (tip) {
            tip.hide();
        }
    });

    /**
     * 其他产品气泡
     */
    prodlist.on("mouseenter", '.small_img li', function() {
        var tip = Boxy.linkedTo(this);
        if (tip) {
            tip.show();
        } else {
            var message = $(this).attr("data-tip");
            if (message) {
                Boxy.tip(message, {
                    actuator: this,
                    arrow: 'bottom'
                });
            }
        }
    }).on("mouseleave", '.small_img li', function() {
        var tip = Boxy.linkedTo(this);
        if (tip) {
            tip.hide();
        }
    });
    /**
     * 进度条气泡
     */
    (function() {
        var T2;
        $(".add_icon").on("mouseleave",function(){
            var that = $(this);
        T2 = setTimeout(function() {
                hideActivity(that);
            }, 200);
           
        
    });
        prodlist.find(".tab_img .text").each(function() {
            var T1;
            $(this).mouseenter(function() {
                clearTimeout(T1);
                clearTimeout(T2);
                var that = $(this);
                var tip = Boxy.linkedTo(this);
                if (tip) {
                    tip.show();
                } else {
                    var message = $(this).attr("data-tip");
                    if (message) {
                        Boxy.tip(message, {
                            actuator: this,
                            arrow: 'bottom'
                        });
                        tip = Boxy.linkedTo(this);
                        tip.boxy.on("mouseenter", function() {
                            clearTimeout(T1);
                            clearTimeout(T2);
                        }).on("mouseleave", function() {
                            tip.hide();
                            clearTimeout(T2);
                            T2 = setTimeout(function() {
                                hideActivity(that);
                            }, 200);
                        });
                    }
                }
            }).mouseleave(function() {
                clearTimeout(T1);
                var tip = Boxy.linkedTo(this);
                if (tip) {
                    T1 = setTimeout(function() {
                        tip.hide();
                    }, 200);
                }
            });
        });
        prodlist.find(".activity").mouseleave(function() {
            var that = $(this);
            clearTimeout(T2);
             T2 = setTimeout(function() {
                hideActivity(that);
            }, 200);
           
        }).mouseenter(function() {
            clearTimeout(T2);
        });

        function hideActivity(obj) {
            var parent = obj.closest(".proditem");
            parent.find(".add_icon").removeClass("whitebkg");
            parent.find(".activity").hide();
            parent.find(".prodrate .axis").show();
            parent.find(".progress").empty();
        }
    })();
};
});