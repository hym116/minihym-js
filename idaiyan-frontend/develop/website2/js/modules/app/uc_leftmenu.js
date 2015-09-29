var $ = require("jquery");
exports.init = function(){
    var menu = {
        small : function (){
            $(".uc-leftmenu").addClass("small");
            $(".actives-menu-wrap").addClass("has-submenu").find(".menu-items").addClass("sub-menu");
            $(".menu-control a").html("&gt;&gt;");
        },
        big : function(){
            $(".uc-leftmenu").removeClass("small");
            $(".actives-menu-wrap").removeClass("has-submenu").find(".menu-items").removeClass("sub-menu");
            $(".menu-control a").html("&lt;&lt;");
        }
    };
    $(".menu-control a").click(function(){
        var issmall = $(".uc-leftmenu").hasClass("small");
        if(issmall){
            menu.big();
        }else{
            menu.small();
        }
    });
    $(".menu-items li").mouseenter(function(e){
        $(this).find(".icon-wrap").stop().animate({
            "margin-top": "-60px"},
            200, function() {
        });
    }).mouseleave(function(e){
        $(this).find(".icon-wrap").stop().animate({
            "margin-top": "0"},
            200, function() {
        });
    });
};