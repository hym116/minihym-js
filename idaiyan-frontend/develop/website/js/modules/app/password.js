var $ = require("jquery");
var API = require("apis/api-aio");
var REFRESH_VCODE_URL = API.getUrl("USER", "FINDPASS_VCODE_REFRESH");
var CHECK_VCODE_URL = API.getUrl("USER", "VCODE_CHECK");

require("validform");
require("validform_datatype");
var validcode = require("pkgs/validcode");

$(function(){

    validcode.init({
        selecter : "#vcode", //点击的元素选择器
        target : "#vcode",   //验证码图片的选择器
        geturl : REFRESH_VCODE_URL          //验证码图片的更新的URL
    });

    var loginForm = $("#findpasswordform").Validform({
        tiptype:3
    });
    // $("#findpasswordform").submit(function(){
    //     $("button").prop("disabled",true);
    // });
});