define('js/modules/app/uc_mod_email', ['require', 'exports', 'module', "jquery", "js/modules/apis/api-aio", "js/modules/libs/validform/Validform_v5.3.2"],function(require, exports, module) {
var $ = require("jquery");
var API = require("js/modules/apis/api-aio");
var EMAIL_PROVE = API.getUrl("UCENTER", "EMAIL_PROVE");
require("js/modules/libs/validform/Validform_v5.3.2");

$(function(){
    var ajaxing = false;
    $("#edit_email").submit(function(){
        if (ajaxing) {
            return false;
        }
        ajaxing = true;
        $("#send").addClass('disabled').html("邮件发送中...");
        $.ajax({
            url: EMAIL_PROVE,
            type: 'POST',
            dataType: 'json'
        })
        .done(function(data) {
            if (data.code === "0") {
                $("#send").addClass('disabled').html("邮件已发送！");
                $(".step1").hide();
                $(".step2").show();
            }else{
                $("#send").removeClass('disabled').html("发送失败");
                setTimeout(function(){
                    $("#send").html("重新发送");
                },2000);
            }
            console.log("success");
        })
        .fail(function() {
            $("#send").removeClass('disabled').html("发送失败");
            setTimeout(function(){
                $("#send").html("重新发送");
            },2000);
            console.log("error");
        })
        .always(function() {
            ajaxing = false;
            console.log("complete");
        });
        return false;
    });
});

});