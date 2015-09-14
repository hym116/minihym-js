define('js/modules/app/daiyanitem', ['require', 'exports', 'module', "jquery", "js/modules/pkgs/share-tip"],function(require, exports, module) {
var $ = require("jquery");
var shareTip = require("js/modules/pkgs/share-tip");

$(function(){

    // 侧边栏分享提示
    shareTip.init();

});

});