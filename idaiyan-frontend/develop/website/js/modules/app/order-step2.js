var $ = require("jquery");
$(function() {
    var all_value,
        Max_Num = $(".item-wrap").find("#max_num").val() - 0;
    var sale_value = $(".item-wrap").find(".sale-value");
    var Sale_Value = parseInt(sale_value.text());
    $(".info-wrap").each(function() {
        var that = $(this);
        var addbtn = that.find("#addbtn");
        var minus = that.find("#minus");
        var delbtn = that.find("#delbtn");
        var nums = that.find(".num");
        minus.addClass("disable");
        if (nums[0].value == Max_Num) {
            addbtn.addClass("disable");
        }
        addbtn.on("click", function() {
            // var num = $(".total-value").text().length;  
            // var totalValue = $(".total-value");
            // if (num >= 8) {
            //     totalValue.addClass("font22");
            // }
            if (nums[0].value < Max_Num) {
                minus.removeClass("disable");
                nums[0].value++;
                updateTotalPrice(nums[0].value);

                if (nums[0].value == Max_Num) {
                    $(this).addClass("disable");
                    return false;
                }
            }


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
                if (addbtn.hasClass("disable")) {
                    addbtn.removeClass("disable");
                }
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
            var salevalue = that.find(".sale-value");
            var single_price = parseInt(singleprice.text());
            var subtotal = single_price * price;
            totalprice.text(subtotal);
            updateProdTotalPrice(price);
        }
    });

    function updateProdTotalPrice(price) {
        var s = 0;
        var item_wap = $(".item-wrap");
        var price_value = $(".price-value");
        var all_totalprice = item_wap.find(".sub_total");
        var total_value = item_wap.find(".total-value");
        sale_value.text(Sale_Value * price);
        for (var i = 0; i < all_totalprice.length; i++) {
            s += parseInt(all_totalprice.eq(i).text());

        }
        price_value.text(s);
        var fina_price = s + Sale_Value * price;
        total_value.text(fina_price);
    }

});