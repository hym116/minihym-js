var $ = require("jquery");
exports.init = function(){
    $(window).scroll(function(){
        if ( $(window).scrollTop() > $(window).height() ) {
            $(".back2top").show();
        }else{
            $(".back2top").hide();
        }
    });
    $(".back2topbtn").click(function(){
        $('html,body').animate({scrollTop: 0},300);
    });
};