define('js/modules/pkgs/header', ['require', 'exports', 'module', "js/modules/pkgs/ajax-form/ajax-form"],function(require, exports, module) {
var ajaxForm = require("js/modules/pkgs/ajax-form/ajax-form");


exports.init = function(){
    if (typeof window.ajaxform === "undefined") {
        ajaxForm.init();
    }
};
});