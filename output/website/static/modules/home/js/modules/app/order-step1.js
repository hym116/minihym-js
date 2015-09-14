define('js/modules/app/order-step1', ['require', 'exports', 'module', "jquery", "js/modules/libs/ui/popup/popup"],function(require, exports, module) {
var $ = require("jquery");
var Boxy = require("js/modules/libs/ui/popup/popup");

$(document).ready(function(){

    $(".choose-box .first li:not('.disabled-box')").on("click",function(){
        var that = $(this);
        var index = that.index();
        that.addClass("active").siblings(":not('.disabled-box')").removeClass('active');
        $("#activityId").val(that.data("id"));
        $(".js-outer").find("ul").eq(index).addClass("on").siblings().removeClass('on');
        $(".js-outer").find("ul").eq(index).find("li:not('.disabled-box')").eq(0).trigger("click");
    });

    $(".choose-box .js-outer li:not('.disabled-box')").on("click",function(){
        var that = $(this);
        that.addClass("active").siblings(":not('.disabled-box')").removeClass('active');
        $("#priceId").val(that.data("id"));
    });

    if ($(".choose-box .first .active").length === 0) {
        $(".choose-box .first li:not('.disabled-box')").eq(0).trigger("click");
    } else {
        $(".choose-box .first .active").trigger("click");
    }

    $(".choosen-product-form").submit(function(){
        var activityId = $("#activityId").val();
        var priceId = $("#priceId").val();
        if(activityId.length === 0){
            Boxy.alert("请选择活动类型");
            return false;
        }
        if(priceId.length === 0 ) {
            Boxy.alert("请选择支持金额");
            return false;
        }
    });

});
});