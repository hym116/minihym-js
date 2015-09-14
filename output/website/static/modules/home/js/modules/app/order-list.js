define('js/modules/app/order-list', ['require', 'exports', 'module', "jquery", "js/modules/libs/ui/popup/popup", "js/modules/apis/api-aio", "js/modules/libs/ui/dropkick/dropkick"],function(require, exports, module) {
var $ = require("jquery");
var Boxy = require("js/modules/libs/ui/popup/popup");

var API = require("js/modules/apis/api-aio");
var delOrderUrl = API.getUrl("UCENTER", "ORDER_DELETE");
require("js/modules/libs/ui/dropkick/dropkick");
$(function() {

    /* 下拉菜单*/
    $(function() {
        $("#select").dropkick();

    });

    // 联动全选，反选按钮操作
    $(".js-selectall").on("change", function() {
        var checked = $(this).prop("checked");
        $(".js-selectall").prop("checked", checked);
        $(".js-itemcheck").prop("checked", checked);
    });
    $(".js-itemcheck").on("change", function() {
        var checked = $(this).prop("checked");
        if (checkAllCheckBox()) {
            $(".js-selectall").prop("checked", checked);
        }
    });
    // 判断input是否选中，选中的length是否相等得出结果true或false
    function checkAllCheckBox() {
        var length = $(".js-itemcheck").length;
        var checkedLength = $(".js-itemcheck:checked").length;
        if (length === checkedLength || checkedLength === 0) {
            return true;
        } else {
            return false;
        }
    }

    //下来菜单点击事件，判断是否有下拉菜单如果有则让它显示
    $(document).on("click", function(e) {
        $('.select-ui').hide();
        var that = $(e.target);
        var downmenu = that.closest('.js-selectdown').find('.select-ui');
        if (that.closest('.js-selectdown').length && !that.closest('.select-ui').length && downmenu.length) {
            downmenu.show();
        }
    });

    (function() {

        var dateVal = $("#js-orders-date").val();
        var statusVal = $("#js-orders-status").val();
        var activityVal = $("#js-orders-activity").val();

        var dateSelect = $('.select-date');
        var dateText = dateSelect.find('[data-value="' + dateVal + '"]').text();

        var statusSelect = $('.select-status');
        var statusText = statusSelect.find('[data-value="' + statusVal + '"]').text();

        if (dateText.length) {
            dateSelect.closest(".js-selectdown").find('span').text(dateText);
        }

        if (statusText.length) {
            statusSelect.closest(".js-selectdown").find('span').text(statusText);
        }

        if (activityVal.length) {
            $(".serach-select select").val(activityVal);
        }

    })();

    $(".select-ui").find("li").click(function() {
        var that = $(this);
        var selectText = that.text();
        var parent = that.closest(".js-selectdown");
        var select = parent.find(".select-ui");
        var value = that.data("value");

        var form = $(".serach-box form");
        var dateInput = $("#js-orders-date");
        var statusInput = $("#js-orders-status");
        var dateVal = dateInput.val();
        var statusVal = statusInput.val();

        parent.find('span').text(selectText);
        if (select.hasClass('select-date') && dateVal !== value) {
            dateInput.val(value);
            form.submit();
        } else if (select.hasClass('select-status') && dateVal !== value) {
            statusInput.val(value);
            form.submit();
        }
        select.hide();
    });

    $(".serach-select select").on("change", function() {
        var value = $(this).val();
        var form = $(".serach-box form");
        var activityInput = $("#js-orders-activity");
        var activityVal = activityInput.val();

        if (activityVal !== value) {
            activityInput.val(value);
            form.submit();
        }
    });

    //删除按钮点击判断当前所选择选项，点击后弹出提示框询问是否要删除订单
    $(".js-del").click(function() {
        var that = $(this);
        var parent = that.closest(".list-item");
        var orderId = parent.data("id");
        Boxy.confirm('<div class="js-delete"><h3>您确定要删除订单吗？</h3><p>您如果想要找回订单可以从订单回收站查找。</p></div>', function() {


            $.ajax({
                    url: delOrderUrl,
                    type: "POST",
                    data: {
                        id: orderId
                    },
                    dataType: "json"
                }).done(function(data) {
                    if (data.code === "0") {
                        location.href = location.href;
                    } else {
                        console.log(data.msg);
                    }
                }).fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });

        });
    });
});
});