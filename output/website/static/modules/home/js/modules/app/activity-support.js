define('js/modules/app/activity-support', ['require', 'exports', 'module', "jquery"],function(require, exports, module) {
var $ = require("jquery");
$(document).ready(function(){
    $(".choose-box li:not('#disabled-box')").on("click",function(){
        var that = $(this);
        that.attr("id","orange-box").siblings(":not('#disabled-box')").attr("id","common-box");
    });
})
});