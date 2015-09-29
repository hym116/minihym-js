var $ = require("jquery");

$(function(){
    
    $(".prodlist").find("li").not(".releasebtn_wrap").on("mouseover",function(){
        $(this).find(".operate").show();
    }).on("mouseout",function(){
        $(this).find(".operate").hide();
    });
});