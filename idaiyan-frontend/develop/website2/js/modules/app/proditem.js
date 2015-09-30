var $ = require("jquery");
var Favourite = require("pkgs/favourite");
var Follow = require("pkgs/follow");
var shareTip = require("pkgs/share-tip");
var productItem = require("pkgs/product-item");
var Progress = require("pkgs/progress");
var Boxy = require("libs/ui/popup/popup");
require("pin");
var ajaxForm = require("pkgs/ajax-form/ajax-form");
var API = require("apis/api-aio");
var SUPPORT_CHOOSE_ACTIVITY = API.getUrl("SUPPORT","CHOOSE_ACTIVITY");

$(function(){

    $(".pin_activity").pin({
        padding:{
            top:50
        }
    });

    new Follow($(".followbtn"), {
        uid: typeof PUID !== "undefined" ? PUID : 0,
        likedClass: "hover"
    });
	var circle = $(".pin_activity").find(".circle");

	circle.each(function(){
		var that = $(this);
		var c_color;
    	if(that.hasClass("crowd-donate")){
    		c_color = "#ff8062";
    	}else if(that.hasClass("activity-365")){
    		c_color = "#00a1d7";
    	}else if(that.hasClass("fans")){
    		c_color = "#87c80a";
    	}else{
    		c_color = "#ff4861";
    	}
    	//console.log(c_color);
		var data = $(this).attr("data-progress") - 0;
        var progress = new Progress($(this), data, {
            x: 24,
            y: 24,
            r: 24,
            r0: 20,
            color: c_color
        }, 600);
        progress.show();
        progress = null;
	});

    new Favourite($(".proditem_wrap .heart"), {
        pid: typeof PID !== "undefined" ? PID : 0,
    });

    shareTip.init($(".sidebar"));

    productItem.init();

    $(".suppotbtn").click(function(){
        var button = $(this);
        var url = SUPPORT_CHOOSE_ACTIVITY;
        var pid = typeof PID !== "undefined" ? PID : 0;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: {pid: pid},
        })
        .done(function(data) {
            if (data.code == "0") {
                //成功状态
                location.href = data.data.url;
            } else if (data.code == "1") {
                //未登录状态
                ajaxForm.loginPopupBindFunction(function() {
                    ajaxForm.modal.fadeOut();
                    button.trigger("click");
                });
            } else {
                Boxy.alert(data.msg);
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

});