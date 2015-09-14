define('js/modules/app/uc-mod-mobile', ['require', 'exports', 'module', "jquery", "js/modules/apis/api-aio", "js/modules/libs/validform/Validform_v5.3.2"],function(require, exports, module) {
var $ = require("jquery");
var API = require("js/modules/apis/api-aio");
var EMAIL_PROVE = API.getUrl("UCENTER", "EMAIL_PROVE");
var EMAIL_EDIT = API.getUrl("UCENTER", "EDIT_EMAIL");
require("js/modules/libs/validform/Validform_v5.3.2");


$(function(){
    var Timer;   //timer变量，控制时间
    var count = 60;   //间隔函数，1秒执行
    var curCount;    //当前剩余秒数
    var ajaxing = false;
    var step = 1;
    var validmode = 1;
    
    function sendMessage1() { 
        var that = $(this);
        if (ajaxing) {
            return false;
        }
        ajaxing = true;       
    　　 that.addClass('disablebtn').html( "邮件发送中……");  　  　　 
        $.ajax({
            url: EMAIL_PROVE,
            type: 'POST',
            dataType: 'json'
        })
        .done(function(data) {
            if (data.code === "0") {
              
                curCount = count; 　　   
                that.attr("disabled", "true");
                Timer = setInterval(SetRemainTime1, 1000); 
                $(".phone-step1").find(".has-send").show(); 
            }else{
                that.addClass('disablebtn').html("发送失败");
                setTimeout(function(){
                    that.addClass('disablebtn').html("60秒后重新发送");
                },2000);    
            }
            console.log("success");
        })
        .fail(function() {   
            that.addClass('disablebtn').html("发送失败");
            setTimeout(function(){
                that.addClass('disablebtn').html("60秒后重新发送");
            },2000);
            console.log("error");
        })
        .always(function() {
            ajaxing = false;
            console.log("complete");
        });
    }
    //timer处理函数
    function SetRemainTime1() {
        if (curCount == 0) {                
            window.clearInterval(Timer);//停止计时器
            $("#send-code-phone").removeAttr("disabled");//启用按钮
            $("#send-code-phone").addClass('disablebtn').html(curCount + "秒后重新发送");
            $(".phone-step1").find(".has-send").hide(); 
        }
        else {
            curCount--;
            $("#send-code-phone").html(curCount + "秒内输入验证码");
        }
    }
   $(document).on("click","#send-code-phone",sendMessage1);

   $(".modifynav li").click(function(){
        var that = $(this);
        that.addClass("active").siblings().removeClass("active");
   });
   
    //  确认按钮点击提交
    var phoneline = $(".phone-wrap");
    $("#phone-send").click(function(){
        var data = {
            codePhone :$("#phone-code").val(),
        }
        if(step == 1){
            $.ajax({
            url: EMAIL_EDIT,
            type: 'POST',
            data:data,
            async:false
            })
            .done(function(data) {
                if(data.code == 0){
                    step++;
                   
                    $(".phone-step1").hide();     
                    $(".phone-step2").show(); 
                    phoneline.find(".leftradius").addClass('opacity').next().addClass("green").removeClass("gray");        
                }
                console.log("success");
            })
            .fail(function() {
                step++;        
                $(".phone-step1").hide();     
                $(".phone-step2").show(); 
                phoneline.find(".leftradius").addClass('opacity').next().addClass("green").removeClass("gray"); 
                        
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });     
        }else if (step == 2) {
            var dada= {
                codePhone2 :$("#phone-code2").val()  
            }
            $.ajax({
            url: EMAIL_EDIT,
            type: 'POST',
            data:data,
            async:false
            })
            .done(function(data) {
                if(data.code ==0){
                    step++;
                    $(".phone-step2").hide();
                    $(".phone-step3").show();
                    $("#send").text("返回我的代言");
                    phoneline.find(".leftradius").addClass('opacity').next().addClass("green opacity").removeClass("gray").next().addClass('green').removeClass('gray');  
                }
                console.log("success");
            })
            .fail(function() {      
                step++;
                $(".phone-step2").hide();
                $(".phone-step3").show();
                $("#phone-send").text("返回我的代言");
                phoneline.find(".leftradius").addClass('opacity').next().addClass("green opacity").removeClass("gray").next().addClass('green').removeClass('gray');         
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });     
        }else if (step == 3) {
            window.open('http://www.baidu.com');
        }
    });      
});






});