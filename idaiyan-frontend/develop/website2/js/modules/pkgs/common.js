var header = require("pkgs/header");
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