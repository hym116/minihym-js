define('js/modules/app/special_365', ['require', 'exports', 'module', "jquery", "js/modules/libs/parallax/jquery.parallax", "js/modules/pkgs/ajax-form/ajax-form", "js/modules/apis/api-aio", "js/modules/libs/ui/popup/popup", "js/modules/pkgs/ajax-product-choose/ajax-product-choose"],function(require, exports, module) {
var $ = require("jquery");
require("js/modules/libs/parallax/jquery.parallax");
var ajaxForm = require("js/modules/pkgs/ajax-form/ajax-form");
var API = require("js/modules/apis/api-aio");
var Boxy = require("js/modules/libs/ui/popup/popup");
var ajaxProductChoose = require("js/modules/pkgs/ajax-product-choose/ajax-product-choose");
var CHOOSE_PRODUCT = API.getUrl("SPECIAL","D365_CHOOSE_PRODUCT");
$(function(){
    $("#top").parallax();
    ajaxProductChoose.init();
    ajaxForm.loginTpl = '<a href="/home-page/lists?uid={uid}">个人主页</a>' +
                        '<span>|</span>' +
                        '<a href="/user/logout">退出</a>';

    if (typeof window.ajaxform === "undefined") {
        ajaxForm.init();
    }
    $(".bottom a").click(function(e){
        e.preventDefault();
    });
    var ajaxing = false;
    $(".bottom .pinkbtn").click(function(){
        var button = $(this);
        if (ajaxing) {
            return false;
        }
        ajaxing = true;
        $.ajax({
            url: CHOOSE_PRODUCT,
            type: 'GET',
            dataType: 'json',
            data: {}
        })
        .done(function(data) {
            if (data.code == 1000) {
                ajaxForm.loginPopupBindFunction(function() {
                    ajaxForm.modal.fadeOut();
                    button.trigger("click");
                });
                ajaxing = false;
            }else if(data.code == 1001) {
                new Boxy("<div>"+data.data+"</div>",{modal:true,unloadOnHide: true});
                $(".activity-product-choose select").trigger("change");
                ajaxing = false;
            }else if(data.code == 1002) {
                new Boxy("<div>"+data.data+"</div>",{modal:true,unloadOnHide: true});
                ajaxing = false;
            }else{
                Boxy.alert("程序出错啦！");
                ajaxing = false;
            }
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    });
});
});