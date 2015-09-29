$(document).ready(function(){
    $(".other-top button").click(function(){
        var that=$(this);
        if($(".third-party").css("display")=="none"){
            $(".third-party").css("display","inline-block");
            that.addClass("special-btn-bind");
            $(".other-top button").html("收起");
        }
        else if($(".third-party").css("display")=="inline-block"){
            $(".third-party").css("display","none");
            that.removeClass("special-btn-bind");
            $(".other-top button").html("绑定");
        }
    });

    //进度条
    function calculate(mark){
        var markPercent = mark/100;
        var redBarWidth = $(".red-bar").css("width")
        var redBar=parseInt(redBarWidth);

        var redPointLeft = $(".red-point").css("left");
        var redPoint=parseInt(redPointLeft);
        var timer = null;

            timer=setInterval(function(){
                if(redPoint==(markPercent*300)){
                    clearInterval(timer);
                }
                else{
                    redPointLeft=redPoint+1+"px";
                    $(".red-point").css("left",redPointLeft);
                    redPoint=parseInt(redPointLeft);
                    console.log(redPoint);
                    console.log(redPointLeft);


                    $(".red-bar").css("width",redBarWidth);
                    redBarWidth=redPoint+1+3+"px";
                    redBar=parseInt(redBarWidth);
                    console.log(redBar);
                    console.log(redBarWidth);

                }
            },30)

        console.log(redBar);
        console.log(redPoint);
    }
})
