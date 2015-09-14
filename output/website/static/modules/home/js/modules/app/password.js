define('js/modules/app/password', ['require', 'exports', 'module', "jquery", "js/modules/apis/api-aio", "js/modules/libs/validform/Validform_v5.3.2", "js/modules/libs/validform/Validform_Datatype", "js/modules/pkgs/validcode"],function(require, exports, module) {
var $ = require("jquery");
var API = require("js/modules/apis/api-aio");
var REFRESH_VCODE_URL = API.getUrl("USER", "FINDPASS_VCODE_REFRESH");
var CHECK_VCODE_URL = API.getUrl("USER", "VCODE_CHECK");

require("js/modules/libs/validform/Validform_v5.3.2");
require("js/modules/libs/validform/Validform_Datatype");
var validcode = require("js/modules/pkgs/validcode");

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
});