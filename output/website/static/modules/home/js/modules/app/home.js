define('js/modules/app/home', ['require', 'exports', 'module', "jquery", "js/modules/pkgs/home-slide", "js/modules/pkgs/product-list", "js/modules/pkgs/back2top"],function(require, exports, module) {
var $ = require("jquery");
var homeSlide = require("js/modules/pkgs/home-slide");
var productList = require("js/modules/pkgs/product-list");
var b2t = require("js/modules/pkgs/back2top");

$(function() {

    // 头部幻灯
    homeSlide.init();

    // 产品列表
    productList.init();

    // 返回顶部
    b2t.init();

});
});