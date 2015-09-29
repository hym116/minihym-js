$(function(){
    $(".questions li").click(function(){
        console.log($(".questions li:gt(0)").index(this));
        var liIndex = $(".questions li:gt(0)").index($(this));
        $(this).addClass("li-click").siblings("li").removeClass("li-click");
        $(".answer-list:eq("+liIndex+")").css("display","block").siblings(".answer-list").css("display","none");/**/
    });
})