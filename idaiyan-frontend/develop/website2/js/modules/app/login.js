var $ = require("jquery");
//
var API = require("apis/api-aio");

var REFRESH_VCODE_URL = API.getUrl("USER", "LOGIN_VCODE_REFRESH");
var CHECK_VCODE_URL = API.getUrl("USER", "VCODE_CHECK");

require("validform");
require("validform_datatype");
var validcode = require("pkgs/validcode");

$(function(){
    //

    var form = $("#loginform");
    validcode.init({
        selecter : "#vcode", //点击的元素选择器
        target : "#vcode",   //验证码图片的选择器
        geturl : REFRESH_VCODE_URL          //验证码图片的更新的URL
    });
    var loginForm = form.Validform({
        tiptype:3
    });

    form.find("button").before('<div id="msgbox" class="Validform_wrong"></div>');

    var checkitem = form.find(".check");
    var checkinput = checkitem.find("input");
    var checkurl = checkinput.attr("ajaxurl");
    var datatype = checkinput.attr("datatype");

    if (checkitem.css("display")=="none") {
        checkinput.removeAttr("ajaxurl");
        checkinput.removeAttr("datatype");
    }

    var url = form.attr("action");
    var ajaxing = false;
    form.submit(function(){
        if(!loginForm.check()){
            return false;
        }
        if (ajaxing) {
            return false;
        }
        ajaxing = true;
        var data = $(this).serialize();
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
        })
        .done(function(data) {
            if (data.code === "0") {
                var jumpurl = data.data.succeurl || '';
                location.href = jumpurl;
            }else if(data.code == 1013){
                checkitem.show();
                checkinput.attr("ajaxurl",checkurl);
                checkinput.attr("datatype",datatype);
            }else{
                $("#msgbox").text(data.msg);
            }
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            ajaxing = false;
            console.log("complete");
        });
        return false;
    });
});