var $ = require("jquery");
var homeSlide = require("pkgs/home-slide");
var productList = require("pkgs/product-list");
var b2t = require("pkgs/back2top");

$(function() {


    homeSlide.init();

    productList.init();

    b2t.init();

});