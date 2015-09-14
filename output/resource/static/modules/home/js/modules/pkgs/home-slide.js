define('js/modules/pkgs/home-slide', ['require', 'exports', 'module', "jquery", "js/modules/libs/superslide/jquery.SuperSlide.2.1.1.source"],function(require, exports, module) {
var $ = require("jquery");
require("js/modules/libs/superslide/jquery.SuperSlide.2.1.1.source");

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
});