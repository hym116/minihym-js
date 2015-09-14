define('js/modules/app/activity-365-timeline', ['require', 'exports', 'module', "jquery", "js/modules/libs/ui/popup/popup", "js/modules/libs/arttemplate/arttemplate", "js/modules/apis/api-aio", "js/modules/pkgs/ajax-form/ajax-form", "js/modules/pkgs/ajax-product-choose/ajax-product-choose", "js/modules/pkgs/timeline-monthscroll", "js/modules/pkgs/timeline-weekscroll"],function(require, exports, module) {
var $ = require("jquery");
var Boxy = require("js/modules/libs/ui/popup/popup");
var template = require("js/modules/libs/arttemplate/arttemplate");

var API = require("js/modules/apis/api-aio");
var ajaxForm = require("js/modules/pkgs/ajax-form/ajax-form");
var ajaxProductChoose = require("js/modules/pkgs/ajax-product-choose/ajax-product-choose");

var calander365_url = "/activity/axislist";
var CHOOSE_PRODUCT = API.getUrl("SPECIAL","D365_CHOOSE_PRODUCT");

var MonthScroll = require("js/modules/pkgs/timeline-monthscroll");
var WeekScroll = require("js/modules/pkgs/timeline-weekscroll");


$(function(){

    ajaxProductChoose.init();
    ajaxForm.loginTpl = '<a href="/home-page/lists?uid={uid}">个人主页</a>' +
                        '<span>|</span>' +
                        '<a href="/user/logout">退出</a>';
    if (typeof window.ajaxform === "undefined") {
        ajaxForm.init();
    }

    // 实例化月视图
    var now = new Date(NOW * 1000);
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();
    //console.log({year:year,month:month+1,day:day});
    var monthScroll = new MonthScroll({year:year,month:month+1,day:day});
    //console.log(monthScroll);
    monthScroll.init();

    // 实例化周视图
    var weekScroll = new WeekScroll({year:year,month:month+1,day:day});
    weekScroll.init();


    // 对比较高的浏览器调整body高度
    $("body").css("min-height",($(window).height())+"px");


    // 月视图，周视图点击切换
    var byWeek = $(".by_week");
    var byMonth = $(".by_month");
    var weekShow = $(".hand_week");
    var monthShow = $(".hand_month");

    byWeek.find(".week_logo").click(function(){
        byMonth.removeClass("active");
        byWeek.addClass("active");
        weekShow.addClass("active");
        monthShow.removeClass("active");
        $("body")[0].id = "weekview";
    });

    byMonth.find(".month_logo").click(function(){
        byMonth.addClass("active");
        byWeek.removeClass("active");
        weekShow.removeClass("active");
        monthShow.addClass("active");
        $("body")[0].id = "monthview";
    });

    byMonth.find(".month_logo").trigger("click");

    // 点击申请活动按钮
    var ajaxing = false;
    $(document).on("click",".screen .applybtn",function(){
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
                var time = (new Date($("li.active").data("date"))-0)/1000;
                $(".activity-product-choose form").append('<input type="hidden" name="start_time" value="' + time + '" >');

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