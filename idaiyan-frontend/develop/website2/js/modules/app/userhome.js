var $ = require("jquery");
var productList = require("pkgs/product-list");
var API = require("apis/api-aio");
var Boxy = require("popup");
var Follow = require("pkgs/follow");
var ajaxForm = require("pkgs/ajax-form/ajax-form");

$(function(){
    
    productList.init();

        new Follow( $(".followbtn"),{
            uid:$(".followbtn").data("uid"),
            likedClass:"hover",
            callback:function(data){
                if (/^\d+$/.test(data.data.follow)) {
                    $(".funsnum").text(data.data.follow);
                }
            }
        });

    $(document).on("click",function(e){
        var target = $(e.target);
        var selectwrap = target.closest('.selectwrap');
        if (selectwrap.length) {
            $(".downmenu").hide();
            selectwrap.find(".downmenu").show();
        }else{
            $(".downmenu").hide();
        }
    });
    var prodlist = $(".prodlist");
    prodlist.find(".message .close").click(function(){
        $(this).closest(".message").hide();
    });
    prodlist.find(".delbtn").click(function(){
        var that = $(this);
        var parent = that.parent(".proditem");
        var id = parent.data("pid");
        var url = API.getUrl("PRODUCT", "DELETE_PRODUCT");
        Boxy.confirm("<div>确定要删除此产品？</div>",function(){
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: {id: id},
            })
            .done(function(data) {
                if (data.code === 0) {
                    parent.remove();
                } else if (data.code === "1004") {
                    ajaxForm.loginPopupBindFunction(function() {
                        // console.log(ajaxForm.modal);
                        ajaxForm.modal.fadeOut();
                        var _popup = Boxy.linkedTo(ajaxForm.loginLink[0]);
                        var oFunction = _popup.options.afterHide;
                        _popup.options.afterHide = function() {
                            oFunction();
                            that.trigger("click");
                            _popup.options.afterHide = oFunction;
                        };
                    });
                } else {
                    Boxy.alert(data.msg);
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

    (function(){

        var ajaxing = false;
        prodlist.find(".edit").click(function(){
            var href = $(this).attr("href");
            var parent = $(this).closest('.proditem');
            var pid = parent.data("pid");
            var tpl = '<div class="edit_wrap">' +'<div class="edit-title">点选你要编辑的内容</div>' +
                    '<a href="{purl}"><div class="detail">产品详情</div></a>' +
                    '<div class="btn_wrap cf">{aurls}</div>' +
                    '<div class="foot_tip">注：正在审核中的活动无法进行编辑操作。</div>' +
                    '</div>';
            ajaxing = true;
            $.ajax({
                url: API.getUrl("PRODUCT", "EDIT_PRODUCT"),
                type: 'POST',
                dataType: 'json',
                data: {id: pid},
            })
            .done(function(data) {
                if (data.code == "1000") {
                    location.href = href;
                } else if (data.code == "1001") {
                    var aurls = "";
                    var __data = data.data;
                    for (var i = 0,length = __data.length; i < length; i++) {
                        //console.log(__data[i]);
                        var btnclass = "gray-color";
                        if (__data[i].status == "1") {
                            btnclass = "unknow-color";
                        }
                        aurls += '<a href="' + __data[i].url + '"><div class="' + btnclass + ' btn-com">' + __data[i].subject + '<div class="num">' + __data[i].step + '</div></div></a>';
                    }
                    var html = tpl.replace("{purl}",href);
                    html = html.replace("{aurls}",aurls);
                    var boxy = new Boxy(html,{ modal: true});
                    // console.log(boxy.boxy);
                    boxy.boxy.find(".boxy-inner").addClass('bigradius');
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                ajaxing = false;
                console.log("complete");
            });
           return false;
        });
    })();
});