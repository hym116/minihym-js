var $ = require("jquery");
var ajaxForm = require("pkgs/ajax-form/ajax-form");
var Boxy = require("tip");
var API = require("apis/api-aio");
var FOLLOW_URL = API.getUrl("UCENTER", "FOLLOW_USER");
function Follow(button,options){
    if (typeof button == "object" && button.length) {
        this.button = button;
        this.init(options);
    }
}

Follow.prototype.OPTIONS = {
    uid: null,
    likedClass: "followed",
    hasMessage: "<div>已关注</div>",
    notMessage: "<div>点击关注</div>",
    unMessage: "<div>已取消</div>",
    callback: null
};

Follow.prototype.init = function(options){
    this.options = $.extend({}, this.OPTIONS, options);

    this.ajaxing = false;

    this.data = {};

    if (this.options.uid) {
        this.data.passive_uid = this.options.uid;
    }

    this.bind();

};

Follow.prototype.bind = function(){
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
        //console.log(that.data);
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
            // Boxy.tip.refreshPosition(tip);
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

Follow.prototype.post = function(data,message){
    var that = this;
    var button = this.button;
    var tip = Boxy.linkedTo(button[0]);
    var num;
    if (that.ajaxing) {
        return false;
    }
    that.ajaxing = true;
    $.ajax({
            url: FOLLOW_URL,
            type: 'POST',
            dataType: 'json',
            data: data,
        })
        .done(function(response) {
             //num=response.data.follow;
            if (response.code === "0") {
             
                if (data.type === 1) {
                    button.addClass(that.options.likedClass);
                } else {
                    button.removeClass(that.options.likedClass);
                }
                if (tip) {
                    tip.hide();
                    tip.setContent(message);
                    // Boxy.tip.refreshPosition(tip);
                    setTimeout(function() {
                        tip.show();
                        that.ajaxing = false;
                        if (typeof that.options.callback === "function") {
                            that.options.callback(response);
                        }
                        setTimeout(function(){
                            tip.hide();
                        },1000);
                    },10);
                }
            } else if (response.code === "1002") {
                ajaxForm.loginPopupBindFunction(function() {
                    // console.log(ajaxForm.modal);
                    ajaxForm.modal.fadeOut();
                    var _popup = Boxy.linkedTo(ajaxForm.loginLink[0]);
                    var oFunction = _popup.options.afterHide;
                    _popup.options.afterHide = function() {
                        oFunction();
                        button.trigger("click");
                        _popup.options.afterHide = oFunction;
                    };
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
module.exports = Follow;