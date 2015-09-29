var ajaxForm = require("pkgs/ajax-form/ajax-form");


exports.init = function(){
    if (typeof window.ajaxform === "undefined") {
        ajaxForm.init();
    }
};