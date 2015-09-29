var $ = require("jquery");
var homeSlide = require("pkgs/home-slide");
var productList = require("pkgs/product-list");
var b2t = require("pkgs/back2top");

$(function() {

    // 头部幻灯
    homeSlide.init();

    // 产品列表
    productList.init();

    // 返回顶部
    b2t.init();

});