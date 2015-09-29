var $ = require("jquery");
var Follow = require("pkgs/follow");
var API = require("apis/api-aio");
require("js/modules/libs/ui/dropkick/dropkick");
$(function() {

    var form = $("#filter-form");
    var prodnameInput = $("#js-prodname");
    var industryInput = $("#js-industry");
    var userInput = $("#js-user");
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
    // (function() {

    //     var prodnameVal = $("#js-prodname").val();
    //     var userVal = $("#js-user").val();
    //     var industryVal = $("#js-industry").val();

    //     var prodnameSelect = $('#dk1-listbox');
    //     var prodnameText = prodnameSelect.find('[data-value="' + prodnameVal + '"]').text();

    //     var userSelect = $('#dk2-listbox');
    //     var userText = userSelect.find('[data-value="' + userVal + '"]').text();

    //     var industrySelect = $('#dk0-listbox');
    //     var industryText = industrySelect.find('[data-value="' + industryVal + '"]').text();

    //     if (prodnameText.length) {
    //         prodnameSelect.closest(".dk-select").find('.dk-selected').text(prodnameText);
    //     }

    //     if (userText.length) {
    //         userSelect.closest(".dk-select").find('.dk-selected').text(userText);
    //     }

    //     if (industryText.length) {
    //         industrySelect.closest(".dk-select").find('.dk-selected').text(industryText);
    //     }
        

    // })();

    // $(".dk-select-options").find("li").click(function() {
    //     var that = $(this);
    //     var selectText = that.text();
    //     var parent = that.closest(".dk-select");
    //     var select = parent.find(".dk-select-options");
    //     var value = that.data("value");

    //     var form = $("#filter-form");
    //     var prodnameInput = $("#js-prodname");
    //     var userInput = $("#js-user");
    //     var industryInput = $("#js-industry");
    //     var prodnameVal = prodnameInput.val();
    //     var userVal = userInput.val();
    //     var industryVal = industryInput.val();

    //     parent.find('.dk-selected').text(selectText);
    //     if (select[0].id == "dk1-listbox" && prodnameVal !== value) {
    //         prodnameInput.val(value);
    //         form.submit();
    //     } else if (select[0].id == "dk2-listbox" && userVal !== value) {
    //         userInput.val(value);
    //         form.submit();
    //     } else if(select[0].id == "dk0-listbox" && industryVal !== value) {
    //         industryInput.val(value);
    //         form.submit();
    //     }
    //     select.hide();
    // });
