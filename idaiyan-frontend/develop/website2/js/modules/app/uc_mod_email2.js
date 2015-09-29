var $ = require("jquery");
var API = require("apis/api-aio");
var EMAIL_EDIT = API.getUrl("UCENTER", "EMAIL_EDIT");
require("validform");

$(function(){
    
    var sametip = "新邮箱不能与原邮箱一样！";
    $("#edit_email").Validform({
        tiptype:3
    });
    var ajaxing = false;
    $("#edit_email").submit(function(){
        if ($("#nemail").val() == $("#email").val()) {
            var checktip = $("#nemail").siblings('.Validform_checktip');
            if(checktip.length){
                checktip.removeClass("Validform_right").addClass("Validform_wrong").text(sametip);
            }else{
                $("#nemail").parent().append('<div class="Validform_checktip Validform_wrong">'+sametip+'</div>');
            }
            return false;
        }
        if (ajaxing) {
            return false;
        }
        ajaxing = true;
        $("#send").addClass('disabled').html("邮件发送中...");
        $.ajax({
            url: EMAIL_EDIT,
            type: 'POST',
            dataType: 'json',
            data:$(this).serialize()
        })
        .done(function(data) {
            if (data.code==="0") {
                $(".step4 .checked_e .formobject .fl").text($("#nemail").val());
                $("#send").addClass('disabled').html("邮件已发送！");
                $(".step3").hide();
                $(".step4").show();
            }
            console.log("success");
        })
        .fail(function() {
            $("#send").removeClass('disabled').html("重新发送");
            console.log("error");
        })
        .always(function() {
            ajaxing = false;
            console.log("complete");
        });
        return false;
    });
});