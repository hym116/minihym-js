$(function(){
    $(".other").click(function() {
        $(this).css("display","none");
        $(".other-way").css("display","block");
    });
    $(".other-way").click(function(){
        $(this).css("display","none");
        $(".other").css("display","block");
    });
    //   $("#password").on("focus",function(){
    //     $(this).siblings(".input_icon").addClass('active');
    // });
    // $(document).on("click",function(e){
    //     $(".input_icon").removeClass('active');
    //     if ($(e.target)[0] == $("#password")[0]) {
    //         $(".icon_lock").addClass('active');
    //     };
    // });
})