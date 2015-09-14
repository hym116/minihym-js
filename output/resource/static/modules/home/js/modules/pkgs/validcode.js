define('js/modules/pkgs/validcode', ['require', 'exports', 'module', "jquery"],function(require, exports, module) {
/**
 *  require(['jquery','pkgs/validcode'],function($,vc){
 *      $(function(){
 *          vc.init({
 *              selecter : "#vcode", //点击的元素选择器
 *              target : "#vcode",   //验证码图片的选择器
 *              geturl : ""          //验证码图片的更新的URL
 *          })
 *      });
 *  });
 */

var $ = require("jquery");

var OPTION = {
    selecter: "#vcode", //点击的元素选择器
    target: "#vcode", //验证码图片的选择器
    geturl: "" //验证码图片的更新的URL
};

exports.init = function(option) {
    var _option = $.extend({}, OPTION, option);
    if (!$(_option.selecter).length || !$(_option.target).length || !_option.geturl) {
        return false;
    }
    $(document).on("click", _option.selecter, function() {
        $.ajax({
                url: _option.geturl,
                type: 'GET',
                dataType: 'json'
            })
            .done(function(data) {
                $(_option.target).attr('src', data.url);
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
        return false;
    });
    $(_option.selecter).eq(0).trigger("click");
};
});