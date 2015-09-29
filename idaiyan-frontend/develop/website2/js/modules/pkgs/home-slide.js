var $ = require("jquery");
require("superslide");

exports.init = function(){

    $(".slideBox").slide({
        mainCell: ".slide",
        titCell: ".nav",
        effect: "fold",
        autoPage: "<li></li>",
        autoPlay: true,
        interTime: 5000,
        delayTime: 1000
    });

    $(window).on("resize", function() {
        var ww = $(window).width();
        $(".slideBox").find(".slide").width(ww * 5).find("li").width(ww);
    });
};