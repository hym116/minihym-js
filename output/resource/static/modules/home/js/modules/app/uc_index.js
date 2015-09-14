define('js/modules/app/uc_index', ['require', 'exports', 'module', "jquery", "js/modules/app/uc_prodlist"],function(require, exports, module) {
var $ = require("jquery");
var ucProdlist = require("js/modules/app/uc_prodlist");

$(function(){
    
    ucProdlist.init();
});
});