define('js/modules/app/dongtai-index', ['require', 'exports', 'module', "js/modules/libs/ui/tip/tip", "jquery", "js/modules/libs/arttemplate/arttemplate"],function(require, exports, module) {
var Boxy = require("js/modules/libs/ui/tip/tip");
var $ = require("jquery");
var template = require("js/modules/libs/arttemplate/arttemplate");
$(function(){
    /**
     * 数字气泡
     */
     var prodlist = $(".productlist-wrap");
    prodlist.find('.item-info .num').mouseenter(function() {
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
// 加载更多
var page = 1;
$(".look-more").on("click",function(){
    var that = $(this);
    $.ajax({
        url: '/path/to/file',
        type: 'POST',
        dataType: 'json',
        data: {page: page+1},
    })
    .done(function(data) {
        if(data.code==0){
            page = data.data.page;
            var html = template("js-product-list-tpl", data.data.data);
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
});  
});