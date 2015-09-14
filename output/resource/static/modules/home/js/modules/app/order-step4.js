define('js/modules/app/order-step4', ['require', 'exports', 'module', "js/modules/libs/ui/icheck/icheck", "js/modules/apis/api-aio"],function(require, exports, module) {
require("js/modules/libs/ui/icheck/icheck");
var API = require("js/modules/apis/api-aio");
var PAY_CHECK_URL = API.getUrl("PAYMENT", "WEICHECK");

$(document).ready(function(){
    $(".label-outer input[type = 'radio']:eq(0)").iCheck('check');
    $(".label-outer").iCheck({
        radioClass: 'iradio_polaris',
        increaseArea: '10%',
    });
    $(".label-outer input[type = 'radio']").on("ifChanged",function(){
        var that = $(this);
        var parent = that.closest(".label");
        var outer = that.parents(".choose-payment-box");
        if(that.prop("checked")){
            parent.addClass("checked").siblings().removeClass("checked");
            parent.find("img").css("border-color","#ff8062");
            if(that.val() == 1){
                outer.find(".QR_code_box").hide().end().find(".QR_code_box:eq(0)").show();
                that.parents(".select").find(".triangle-box").css("left","105px");
                outer.find(".choose-button-box").css("display","block");
                outer.css("border-bottom","1px solid #c6c6c6");
            }else{
                outer.find(".QR_code_box").hide().end().find(".QR_code_box:eq(1)").show();
                that.parents(".select").find(".triangle-box").css("left","292px");
                outer.find(".choose-button-box").css("display","none");
                outer.css("border-bottom","none");
            }
        }
        if (!that.prop("checked")){
            parent.find("img").css("border-color","#c6c6c6");
        }
    });

    (function(){
        var timeOut = 2000;
        var T;
        var orderno= $("#orderno").val();

        loop();

        function loop(){
            clearTimeout(T);
            T = setTimeout(function(){
                loop();
                ifPay();
            },timeOut);
        }

        function ifPay(){
            $.ajax({
                url: PAY_CHECK_URL,
                type: 'POST',
                dataType: 'json',
                data: {orderno: orderno},
            })
            .done(function(data) {
                if (data.code == 1003) {
                    location.href = data.data;
                } else if (data.code == 1004){
                    //loop();
                } else {
                    clearTimeout(T);
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
        }
    })();
});
});