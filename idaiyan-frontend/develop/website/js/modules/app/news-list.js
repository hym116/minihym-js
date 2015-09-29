var $ = require("jquery");
var Boxy = require("tip");
var Follow = require("pkgs/follow");
var Favourite = require("pkgs/favourite");
var Boxy_Cover = require("popup");
var API = require("apis/api-aio");
var ajaxForm = require("pkgs/ajax-form/ajax-form");
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