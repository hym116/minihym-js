define('js/modules/pkgs/common', ['require', 'exports', 'module', "js/modules/pkgs/header", "jquery"],function(require, exports, module) {
var header = require("js/modules/pkgs/header");
var $ = require("jquery");
$(function() {
    header.init();

    $(".applybtn.small").hover(function() {
        $(this).stop().animate({
                width: 100
            },
            200);
    }, function() {
        $(this).stop().animate({
                width: 30
            },
            200);
    });
});
});