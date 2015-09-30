var $ = require("jquery");
require("validform");
require("validform_datatype");
var API = require("apis/api-aio");
var Boxy = require("popup");
$(function() {

    var $form = $("#mod_password");

    $form.Validform({
        tiptype: 3
    });

    $form.on("submit", function() {
        if ($(".Validform_wrong").length > 0) {
            return false;
        }
        console.log($(".Validform_wrong").length === 0);
        console.log($.trim($("#originprice").val()));
        console.log($.trim($("#originprice1").val()));
        if ($(".Validform_wrong").length === 0 && $.trim($("#name").val()) == $.trim($("#originprice").val())) {
            $('[name="originprice"]')
                .siblings('.Validform_checktip')
                .text("新密码不能与旧密码一样")
                .removeClass("Validform_right")
                .addClass('Validform_wrong');
            return false;
        }

        var data = {
            oldpassword: $("#name").val(),
            newpassword: $("#originprice").val(),
            newpassword2: $("#originprice1").val()
        };
        // ajax
        $.ajax({
                url: API.getUrl("UCENTER", "EDITPASS"),
                type: 'POST',
                dataType: 'json',
                data: data
            })
            .done(function(response) {
                if (response.code === "0") {
                    Boxy.alert("密码修改成功，请重新登录！");
                } else if (response.code == "1004") {
                    Boxy.alert("旧密码输入不正确！");
                    console.log(data.msg);
                } else if (response.code == "1001") {
                    Boxy.alert("请先登录再修改密码！");
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
        return false;
    });
    $form.find(".cancelbtn").click(function() {
        $("#name").val("");
        $("#originprice").val("");
        $("#originprice1").val("");
    });
});