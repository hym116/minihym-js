var $ = require("jquery");
var Follow = require("pkgs/follow");
var API = require("apis/api-aio");
require("dropkick");
$(function() {

    var form = $("#filter-form");
    var prodnameInput = $("#js-prodname");
    var industryInput = $("#js-industry");
    var userInput = $("#js-user");

    // 下拉美化 & 修改自动提交
    $("#select-industry").dropkick({
        change:function(){
            var that = this;
            var value = that.value;
            industryInput.val(value);
            form.submit();
        }
    });

    $("#prodname").dropkick({
        change:function(){
            var that = this;
            var value = that.value;
            prodnameInput.val(value);
            form.submit();
        }
    });

    $("#select-user").dropkick({
        change:function(){
            var that = this;
            var value = that.value;
            userInput.val(value);
            form.submit();
        }
    });
});