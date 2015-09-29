require("libs/ui/icheck/icheck");

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
})