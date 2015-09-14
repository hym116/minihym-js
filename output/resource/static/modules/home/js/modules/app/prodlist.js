define('js/modules/app/prodlist', ['require', 'exports', 'module', "jquery", "js/modules/pkgs/product-list"],function(require, exports, module) {
var $ = require("jquery");
var productList = require("js/modules/pkgs/product-list");

$(function(){


    productList.init();
});
});