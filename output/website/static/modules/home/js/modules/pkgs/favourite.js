define('js/modules/pkgs/favourite', ['require', 'exports', 'module', "jquery", "js/modules/pkgs/ajax-form/ajax-form", "js/modules/libs/ui/tip/tip", "js/modules/apis/api-aio"],function(require, exports, module) {
var $ = require("jquery");
var ajaxForm = require("js/modules/pkgs/ajax-form/ajax-form");
var Boxy = require("js/modules/libs/ui/tip/tip");
var API = require("js/modules/apis/api-aio");

var LIKE_URL = API.getUrl("PRODUCT", "FOLLOW_PRODUCT");

function Favourite(button,options){
    if (typeof button == "object" && button.length) {
        this.button = button;
        this.init(options);
    }
}

Favourite.prototype.OPTIONS = {
    pid: null,
    rid: null,
    likedClass: "liked",
    hasMessage: "<div>已收藏</div>",
    notMessage: "<div>点击收藏</div>",
    unMessage: "<div>已取消</div>",
    callback: null
};

Favourite.prototype.init = function(options){
    this.options = $.extend({}, this.OPTIONS, options);

    this.ajaxing = false;

    this.data = {};

    if (this.options.pid) {
        this.data.product_id = this.options.pid;
    }
    if (this.options.rid) {
        this.data.rel_id = this.options.rid;
    }

    this.bind();

};

Favourite.prototype.bind = function(){
    var that = this;
    var button = this.button;

    button.click(function(){
        var liked = button.hasClass(that.options.likedClass);
        var message;
        if (liked) {
            that.data.type = 2;
            message = that.options.unMessage;
        }else{
            that.data.type = 1;
            message = that.options.hasMessage;
        }
        that.post(that.data,message);
    });

    /*
     * 收藏气泡
     */
    button.mouseenter(function() {
        var liked = button.hasClass(that.options.likedClass);
        var tip = Boxy.linkedTo(button[0]);
        var message;

        if (liked) {
            message = that.options.hasMessage;
        }else{
            message = that.options.notMessage;
        }

        if (tip) {
            tip.show();
            tip.setContent(message);
            Boxy.tip.reflashPosition(tip);
        } else {
            Boxy.tip(message, {
                actuator: button[0],
                arrow: 'bottom'
            });
        }
    }).mouseleave(function() {
        var tip = Boxy.linkedTo(button[0]);

        if (tip) {
            tip.hide();
        }
    });
};

Favourite.prototype.post = function(data,message){
    var that = this;
    var button = this.button;
    var tip = Boxy.linkedTo(button[0]);
    var T;

    clearTimeout(T);
    if (that.ajaxing) {
        return false;
    }
    that.ajaxing = true;
    $.ajax({
            url: LIKE_URL,
            type: 'POST',
            dataType: 'json',
            data: data,
        })
        .done(function(response) {
            if (response.code === "0") {
                if (data.type === 1) {
                    button.addClass(that.options.likedClass);
                } else {
                    button.removeClass(that.options.likedClass);
                }
                if (tip) {
                    tip.hide();
                    tip.setContent(message);
                    Boxy.tip.reflashPosition(tip);
                    setTimeout(function() {
                        tip.show();
                        that.ajaxing = false;
                        if (typeof that.options.callback === "function") {
                            that.options.callback(response);
                        }
                        T = setTimeout(function(){
                            tip.hide();
                        },1000);
                    },10);
                }
            } else if (response.code === "1002") {
                ajaxForm.loginPopupBindFunction(function() {
                    ajaxForm.modal.fadeOut();
                    button.trigger("click");
                });
                that.ajaxing = false;
            } else {
                Boxy.alert(response.msg);
                that.ajaxing = false;
            }

            console.log("success");
        })
        .fail(function() {
            that.ajaxing = false;
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
};


/*
 * 喜欢ajax
 */
module.exports = Favourite;
});