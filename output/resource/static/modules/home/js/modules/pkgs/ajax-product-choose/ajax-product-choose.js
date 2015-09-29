define('js/modules/pkgs/ajax-product-choose/ajax-product-choose', ['require', 'exports', 'module', "jquery"],function(require, exports, module) {
var $ = require("jquery");
exports.init = function(){
    $(document).on("change",".activity-product-choose select",function(){
        var value = $(this).val();
        var parent = $(".activity-product-choose");
        parent.find(".tips a").attr("href","/product/view?id="+value).attr("target","_blank");
    });
};
});