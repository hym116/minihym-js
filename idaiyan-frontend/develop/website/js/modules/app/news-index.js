
var Boxy = require("tip");
var $ = require("jquery");
var Boxy_Cover = require("popup");
var API = require("apis/api-aio");
var ajaxForm = require("pkgs/ajax-form/ajax-form");
var NEWSUrl = API.getUrl("NEWS","GET_PAGE_DATA");
var NEWSUrl_DETAIL = API.getUrl("NEWS","TAG_GET_PAGE_DATA");
var template = require("arttemplate");
var FOLLOW_URL = API.getUrl("NEWS","FOLLOW");
var getLocalTime = function(nS) {
    var now = new Date(nS*1000);
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    return year+"-"+zerofix(month)+"-"+zerofix(date)+" "+zerofix(hour)+":"+zerofix(minute);
    function zerofix(num) {
        return num < 10 ? "0" + num : num;
    }
};
var fomateNumber = function(nS) {
};


$(function(){
    // var has_btnwrap = $(".btn-wrap");
    // if(!has_btnwrap.length){
    //     $(".hot-activity").addClass("has_btn_wrap");
    // }
    /**
     * 数字气泡
     */
     var num_parent = $(".productlist");
     num_parent.mouseenter(function() {
         $(this).find(".num").mouseenter(function() {
              $(this).css("opacity","1");
                 var tip = Boxy.linkedTo(this);
                var b = $(this).find("b");
                   if (tip) {
                       tip.show();
                   } else {
                       var message = b.data("tip");
                       if (message) {
                           Boxy.tip(message, {
                               actuator: this,
                               arrow: 'bottom'
                           });
                       }
                   }
         }).mouseleave(function() {
             $(this).css("opacity","0.5");
             var tip = Boxy.linkedTo(this);
             if (tip) {
                 tip.hide();
             }
         });
     });
  
// 加载更多
var page = 1;
$(".look-more").on("click",function(){
    var that = $(this);
    $.ajax({
        url: NEWSUrl,
        type: 'POST',
        dataType: 'json',
        data:{page: page-0+1}
    })
    .done(function(data) {
        if(data.code == 0){
            page = data.data.page;
            var _data = data.data.data;
            // alert(data.data.data.length);
            for (var j = 0,len=_data.length; j < len; j++) {
                _data[j].created_at = getLocalTime(_data[j].created_at);
            }
            var html = template("js-product-list-tpl", data.data);
            $(".productlist").append(html);
            if(page == data.data.totalpage){
                that.hide();
            }
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
    //tag页头部关注
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
                    that.text("关注");
                }else {
                    that.addClass('greenbtn');
                    that.text("已关注");
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
//tag页查看更多
    var page_tag = 1;
    var tag_id_value = $("#tag_id").val();
    $(".look-more-tag").on("click",function(){
        var that = $(this);
        $.ajax({
            url: NEWSUrl_DETAIL,
            type: 'POST',
            dataType: 'json',
            data:{
                page: page_tag-0+1,
                tag_id:tag_id_value 
            }
        })
        .done(function(data) {
            if(data.code == 0){
                page_tag = data.data.page;
                var html = template("js-product-tag-tpl", data.data);
                $(".productlist").append(html);
                if(page_tag == data.data.total){
                    that.hide();
                }
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