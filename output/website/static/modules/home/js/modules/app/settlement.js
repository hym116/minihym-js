define('js/modules/app/settlement', ['require', 'exports', 'module', "jquery"],function(require, exports, module) {
var $ = require("jquery");
$(function() {
    var all_value;
    $(".info-wrap").each(function() {
        var that = $(this);
        var addbtn = that.find("#addbtn");
        var minus = that.find("#minus");
        var delbtn = that.find("#delbtn");
        var nums = that.find(".num");
        minus.addClass("disable");
        addbtn.on("click", function() {
            minus.removeClass("disable");
            nums[0].value++;
            updateTotalPrice(nums[0].value);
        });
        addbtn.on("selectstart", function(event) {
            event.preventDefault();
        });
        minus.on("selectstart", function(event) {
            event.preventDefault();
        });
        minus.on("click", function() {
            var num = nums.val() - 0;
            if (num > 1) {
                $(this).removeClass("disable");
                nums.val(num - 1);
                updateTotalPrice(num - 1);
                if (num == 2) {
                $(this).addClass("disable");
            }
            } 
        });
        function updateTotalPrice(price) {
            var singleprice = that.find(".singleprice");
            var totalprice = that.find(".sub_total");
            var single_price = parseInt(singleprice.text());
            var subtotal = single_price * price;
            totalprice.text(subtotal);
            updateProdTotalPrice();
        }
    });

      function updateProdTotalPrice() {
            var s=0;
            var item_wap = $(".item-wrap");
            var price_value = $(".price-value");
            var all_totalprice = item_wap.find(".sub_total");
            var total_value = item_wap.find(".total-value");
            var sale_value = item_wap.find(".sale-value");
            for(var i = 0;i < all_totalprice.length;i++)
            { 
                s += parseInt(all_totalprice.eq(i).text());

            }
                price_value.text(s);
                var fina_price = s + parseInt(sale_value.text());
                total_value.text(fina_price);
        }
});
});