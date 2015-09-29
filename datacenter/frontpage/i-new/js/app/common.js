 $(function(){
      $("#exit").on("click",function(e){
            $("#exitlogin").show();
            e.stopPropagation();

        });
      $(".cancle").on("click",function(){
         $(".mask").hide();
      });
        $(document).on("click",function(e){
            if($(e.target).closest(".mask-content").length){
                
            }else{
                $(".mask").hide();
            }
        });
    });