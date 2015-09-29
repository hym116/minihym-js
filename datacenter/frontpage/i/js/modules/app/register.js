$(function(){
    $("#mobile-num").on("change",function(){
        var that = $(this);
        var parent = that.closest(".select-wrap");
        var select_container = parent.find(".selected-item");
        select_container .text(that.val());
    })
});