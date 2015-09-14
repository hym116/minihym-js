$(function(){
    $('.nav-tabs a').click(function(e) {
    e.preventDefault()
    $(this).tab('show')
    });
    $("#edit-form").Validform({
        tiptype:3
    });
    $("#coreone").on("click",function(){
        if($(".must").val().length&&!$("#basic").find(".Validform_wrong").length){
            $("#basicone .status").addClass('active');
        }else{
            $("#basicone .status").removeClass('active');
        }
    });
    // $("#messageone").on("click",function(){
    //     if($(".mustone").val().length&&!$("#core").find(".Validform_wrong").length){
    //         $("#coreone .status").addClass('active');
    //     }else{
    //         $("#coreone .status").removeClass('active');
    //     }
    // });
    // $("#controlone").on("click",function(){
    //     if($(".musttwo").val().length&&!$("#messages").find(".Validform_wrong").length){
    //         $("#messageone .status").addClass('active');
    //     }else{
    //         $("#messageone .status").removeClass('active');
    //     }
    // });
    // $("#achievementone").on("click",function(){
    //     if($(".mustthree").val().length&&!$("#control").find(".Validform_wrong").length){
    //         $("#controlone .status").addClass('active');
    //     }else{
    //         $("#controlone .status").removeClass('active');
    //     }
    // });
    // if($("#achievement").find(".form-cont  rol").val().length){
    //     $("#achievementone .status").addClass('active');
    // }
    // if($("#finance").find(".form-control").val().length){
    //     $("#financeone .status").addClass('active');
    // }
    // if($("#demand").find(".form-control").val().length){
    //     $("#demandone .status").addClass('active');
    // }
    // var personInput = $("#person").find(".form-control");
    // personInput.change(function(){
    //      if(personInput.val().length){
    //         alert(1);
    //     $("#personone .status").addClass('active');
    // }
    // });
    // function changestatus(){
    //     $(".must").val();
    // }
    //     var arr = [];
    // $(".must").each(function(){
    //     var mustval;
    //     // var brr = [];
    //     var arrlength;
    //     var that =  $(this);
    //     var index = that.index();
    //     var parent = that.closest('.tab-pane');
    //     var parentindex = parent.index();
    //     var corrli = $(".register-tabs li").eq(parentindex);
    //     var changestatus = corrli.find(".status");
    //     that.on("blur",function(){
    //     mustval = that.eq(index).val();
    //     console.log(mustval);
    //     arr.push(mustval);
    //     arrlength =  arr.length;
    //     console.log(arr);
    //     if(arrlength == 3){
    //         alert(1);
    //         changestatus.addClass('active');
    //     }     

    // });

    // });
    $(".tab-pane").each(function(){
        var that = $(this);
        var mustval;
        var wrongmsg;
        var tabIndex = that.index();
        var corrli = $(".register-tabs li").eq(tabIndex);
        var mustlen = that.find(".must"); //必填项
        var changestatus = corrli.find(".status");
        that.on("blur", "input[type='text'], textarea",function(){
           var arr = [];
           var _this = $(this);
            mustval = _this.val();
            // 遍历
            for (var i = 0;i < mustlen.length;i++){
                if(mustlen.eq(i).val()){
                arr.push(mustlen.eq(i).val());
            }};
            setTimeout(function(){
                wrongmsg = that.find('.Validform_wrong');
                if(arr.length == mustlen.length && !wrongmsg.length){
                changestatus.addClass('active');
            }
            },10);
            console.log(arr);
             console.log(arr.length);

    });

    });

});