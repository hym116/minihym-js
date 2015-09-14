define('js/modules/app/home', ['require', 'exports', 'module', "jquery", "js/modules/pkgs/home-slide", "js/modules/pkgs/product-list", "js/modules/pkgs/back2top"],function(require, exports, module) {
var $ = require("jquery");
var homeSlide = require("js/modules/pkgs/home-slide");
var productList = require("js/modules/pkgs/product-list");
var b2t = require("js/modules/pkgs/back2top");

$(function() {


    homeSlide.init();

    productList.init();

    b2t.init();

});
});