define('js/modules/app/charts', ['require', 'exports', 'module', "jquery", "js/modules/libs/parallax/jquery.parallax", "js/modules/pkgs/ajax-form/ajax-form", "js/modules/apis/api-aio", "js/modules/libs/ui/popup/popup", "js/modules/libs/ui/icheck/icheck", "js/modules/pkgs/ajax-product-choose/ajax-product-choose"],function(require, exports, module) {
var $ = require("jquery");
require("js/modules/libs/parallax/jquery.parallax");
var ajaxForm = require("js/modules/pkgs/ajax-form/ajax-form");
var API = require("js/modules/apis/api-aio");
var Boxy = require("js/modules/libs/ui/popup/popup");
var icheck = require("js/modules/libs/ui/icheck/icheck");
var ajaxProductChoose = require("js/modules/pkgs/ajax-product-choose/ajax-product-choose");

$(document).ready(function(){ 
    ajaxProductChoose.init();
    ajaxForm.loginTpl = '<a href="/home-page/lists?uid={uid}">个人主页</a>' +
                        '<span>|</span>' +
                        '<a href="/user/logout">退出</a>';

    if (typeof window.ajaxform === "undefined") {
        ajaxForm.init();
    }
    // function tab(aEle1,aEle2){
    //     for(var i=0;i<aEle1.length;i++){
    //         aEle1[i].index=i;
    //         aEle1[i].onclick=function(){
    //             for(var j=0;j<aEle1.length;j++){
    //                 aEle2[j].className='';
    //                 aEle1[j].className='';
    //             }
    //             this.className='active';
    //             aEle2[this.index].className='active';
    //         };
    //     }
    // };
    
});
});