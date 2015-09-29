$(function(){
    $('#success').on('click', function(){
        return false;
    })
    $(".ecode").on("click",function(e){
        $("#mask-code").show();
        e.stopPropagation();
    });
    $(".wechat").on("click",function(e){
        $("#wechat-code").show();
        e.stopPropagation();
        (function load() {
            polling('wxpay');
        })();
    });
    $("#exit").on("click",function(e){
        $("#exitlogin").show();
        e.stopPropagation();

    });
    $(document).on("click",function(e){
        if($(e.target).closest(".mask-content").length){
            
        }else{
            $(".mask").hide();
        }
    });
    $('.closebtn').on('click', function(e){
        $('.mask').hide();
    })
});

function polling(pay_method)
{
    var _csrf = $('input[name=_csrf]').val();
    var out_trade_no = $('input[name=order_sn]').val();
    var success = $('input[name=success]').val();
    var data = {
        _csrf: _csrf,
        out_trade_no: out_trade_no,
        pay_method: 'wxpay',
    }
    var num = 0;
    intervals = window.setInterval(function() {
        $.ajax({
            type: 'POST',
            data: data,
            dataType: 'json',
            url: $('input[name=url]').val(),
            success: function(resp) {
                console.log(resp.code);
                switch (resp.code) {
                    case 0:
                        $("#wechat-code").hide();
                        $('#mask-pay').show();
                        $('.ifsucc').show();
                        $('.iffail').hide();
                        $('.fl').hide();
                        $('#success').on('click', function(){
                            window.location.href = success;
                        })
                        clearInterval(intervals);
                        break;
                    case 1001:
                        break;
                    case 1002:
                        $("#wechat-code").hide();
                        $('#mask-pay').show();
                        $('.iffail').hide();
                        $('.ifsucc').hide();
                        break;
                    case 1003:
                        $("#wechat-code").hide();
                        $('#mask-pay').show();
                        $('.ifsucc').hide();
                        $('.iffail').show();
                        $('.fl').hide();
                        clearInterval(intervals);
                        break;
                    case 1004:
                        break;
                    case 1005:
                        break;
                }
                
                if ((++num) == 60) {
                    if (ress.code != 1002) {
                        clearInterval(intervals);
                    }
                }
            },
            error: function() {
            }
        });
    }, 2000);
}