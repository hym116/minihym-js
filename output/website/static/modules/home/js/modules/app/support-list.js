define('js/modules/app/support-list', ['require', 'exports', 'module', "jquery", "js/modules/pkgs/follow", "js/modules/apis/api-aio", "js/modules/libs/ui/dropkick/dropkick"],function(require, exports, module) {
var $ = require("jquery");
var Follow = require("js/modules/pkgs/follow");
var API = require("js/modules/apis/api-aio");
require("js/modules/libs/ui/dropkick/dropkick");
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
});