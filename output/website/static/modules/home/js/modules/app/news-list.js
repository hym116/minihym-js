define('js/modules/app/news-list', ['require', 'exports', 'module', "jquery", "js/modules/libs/ui/tip/tip", "js/modules/pkgs/follow", "js/modules/pkgs/favourite", "js/modules/libs/ui/popup/popup", "js/modules/apis/api-aio", "js/modules/pkgs/ajax-form/ajax-form"],function(require, exports, module) {
var $ = require("jquery");
var Boxy = require("js/modules/libs/ui/tip/tip");
var Follow = require("js/modules/pkgs/follow");
var Favourite = require("js/modules/pkgs/favourite");
var Boxy_Cover = require("js/modules/libs/ui/popup/popup");
var API = require("js/modules/apis/api-aio");
var ajaxForm = require("js/modules/pkgs/ajax-form/ajax-form");
var FOLLOW_URL = API.getUrl("NEWS","FOLLOW");
$(function(){
  $(".care").on('click',  function() {
        var that = $(this);
        var id_value = $("#tag_id").val();
    // if (ajaxing) {
    //     return false;
    // }
    // ajaxing = true;
        $.ajax({
        url: FOLLOW_URL,
        type: 'GET',
        dataType: 'json',
        data:{
            action:"follow_tag",
            id:id_value
        }
        })
        .done(function(data) {
            if(data.code == 1){
                if(that.hasClass('greenbtn')){
                    that.removeClass('greenbtn');
                    that.text(关注);
                }else {
                    that.addClass('greenbtn');
                    that.text(已关注);
                }
            }else if(data.code == 1001){
                ajaxForm.loginPopupBindFunction(function() {
                ajaxForm.modal.fadeOut();
                that.trigger("click");
                });
            }else{
                Boxy_Cover.alert(data.msg);

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