define('js/modules/app/uc_index', ['require', 'exports', 'module', "jquery", "app/uc_prodlist"],function(require, exports, module) {
var $ = require("jquery");
var ucProdlist = require("app/uc_prodlist");

$(function() {

    ucProdlist.init();
});
});