define('js/modules/pkgs/back2top', ['require', 'exports', 'module', "jquery"],function(require, exports, module) {
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
});