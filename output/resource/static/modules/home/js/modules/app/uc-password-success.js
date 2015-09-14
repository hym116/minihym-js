define('js/modules/app/uc-password-success', ['require', 'exports', 'module', "jquery", "js/modules/apis/api-aio"],function(require, exports, module) {
var $ = require("jquery");
var API = require("js/modules/apis/api-aio");
var SEND_MESSAGE = API.getUrl("USER", "MVCODE_SEND");
$(function(){
    var ajaxing = false;

    $(".resend").click(function(){
        if(ajaxing){
            return false;
        }
        ajaxing = true;
        $(".forget_wrap .btn span").remove();
        $(".forget_wrap .btn").append("<span style='margin-left:10px;font-size:13px;'>发送中...</span>");
        $.ajax({
            url : SEND_MESSAGE,
            type : 'post',
            data : {username:username,checkkey:checkkey},
            dataType : 'json'
        }).done(function(data){
            ajaxing = false;
            $(".forget_wrap .btn span").remove();
            if(data.code=="0"){
                $(".forget_wrap .btn").append("<span style='margin-left:10px;font-size:13px;'>发送成功！</span>");
            }else{
                $(".forget_wrap .btn").append("<span style='margin-left:10px;font-size:13px;'>发送失败，请重试！</span>");
            }
        });
    });
});
});