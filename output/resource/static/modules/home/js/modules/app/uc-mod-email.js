define('js/modules/app/uc-mod-email', ['require', 'exports', 'module', "jquery", "js/modules/pkgs/imgcut", "js/modules/pkgs/uploadpreview", "js/modules/apis/api-aio", "js/modules/libs/validform/Validform_v5.3.2"],function(require, exports, module) {
var $ = require("jquery");
require("js/modules/pkgs/imgcut");
require("js/modules/pkgs/uploadpreview");
var API = require("js/modules/apis/api-aio");
var EMAIL_PROVE = API.getUrl("UCENTER", "EMAIL_PROVE");
var EMAIL_EDIT = API.getUrl("UCENTER", "EDIT_EMAIL");
require("js/modules/libs/validform/Validform_v5.3.2");
    //li 点击导航
    $(".modifynav li").click(function(){
        var that = $(this);
        that.addClass("active").siblings().removeClass("active");
        if(that.hasClass("person-mod")) {
            $("#modify_form").show().siblings().not($(".modifynav")).hide();
        }else if(that.hasClass("email-mod")) {
            $(".emailmod-wrap").show().siblings().not($(".modifynav")).hide();
        }else if(that.hasClass("phone-mod")) {
            $(".phone-wrap").show().siblings().not($(".modifynav")).hide();
        }else if(that.hasClass("avator-mod")) {
            $("#edit_img").show().siblings().not($(".modifynav")).hide();
        }else if(that.hasClass("password-mod")) {
            $("#mod_password").show().siblings().not($(".modifynav")).hide();
        }
    });
    $(".js-email-mod").click(function(){
        $("#modify_form").hide();
        $(".emailmod-wrap").show();
        $(".person-mod").removeClass("active");
        $(".email-mod").addClass("active");
    });
    $(".js-phone-mod").click(function(){
        $("#modify_form").hide();
        $(".phone-wrap").show();
        $(".person-mod").removeClass("active");
        $(".phone-mod").addClass("active");
    });
    $(".mod_portrait").click(function(){
        $("#modify_form").hide();
        $("#edit_img").show();
        $(".person-mod").removeClass("active");
        $(".avator-mod").addClass("active").trigger("click");
    });
$(function(){
    var Timer;   //timer变量，控制时间
    var count = 60;   //间隔函数，1秒执行
    var curCount;    //当前剩余秒数
    var ajaxing = false;
    var step = 1;
    var validmode = 1;
    

    function sendMessage() { 
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
                Timer = setInterval(SetRemainTime, 1000); 
               $(".email-step1").find(".has-send").show(); 
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
    function SetRemainTime() {
        if (curCount == 0) {                
            clearInterval(Timer);//停止计时器
            $("#send-code-e").removeAttr("disabled");//启用按钮
            $("#send-code-e").removeClass("disablebtn").html("发送验证码");
            $(".email-step1").find(".has-send").hide(); 
        }
        else {
            curCount--;
            $("#send-code-e").addClass('disablebtn').html(curCount + "秒后重新发送");
        }
    }

    function sendMessagetwo() { 
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
                Timer = setInterval(SetRemainTime, 1000); 
               $(".step1").find(".has-send").show(); 
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
    function SetRemainTimetow() {
        if (curCount == 0) {                
            clearInterval(Timer);//停止计时器
            $("#send-code-m").removeAttr("disabled");//启用按钮
            $("#send-code-m").removeClass("disablebtn").html("发送验证码");
            $(".step1").find(".has-send").hide(); 
        }
        else {
            curCount--;
            $("#send-code-m").addClass('disablebtn').html(curCount + "秒后重新发送");
        }
    }
   $(document).on("click","#send-code-e",sendMessage);
   $(document).on("click","#send-code-m",sendMessagetwo);
   


    // 切换认证方式
    $(".js-change").click(function(){
        if(validmode == 1){
            validmode++;
            $(this).html("改为邮箱认证方式");
            $(".email-step1").hide();
            $(".step1").removeClass("none");
        }else if(validmode==2){
            validmode--;
            $(this).html("改为手机认证方式");
            $(".email-step1").show();
            $(".step1").addClass("none"); 
        }
    });
    //  确认按钮点击提交
    var emailline = $(".emailmod-wrap");
    $("#send").click(function(){
        
        if(!$("#email1-code").val().length) {
            alert("请填写验证码");
            return false;
        }
        if(step == 1){
            var data = {
                codeMail :$("#email1-code").val(),
                codeMobile :$("#step1-code").val()  
            }
            $.ajax({
            url: EMAIL_EDIT,
            type: 'POST',
            data:data,
            async:false
            })
            .done(function(response) {
                if(response.code == 0){
                    step++;
                    if($(".step1").hasClass("none")){
                        $(".email-step1").hide();
                        $(".step2").show();
                        emailline.find(".leftradius").addClass('opacity').next().addClass("green").removeClass("gray");
                        $("#send").parent().css({"width":"245px","marginLeft":"-122px"});
                        $("#send").siblings().remove(); 
                    }else {
                        $(".step1").hide();     
                        $(".step2").show(); 
                        emailline.find(".leftradius").addClass('opacity').next().addClass("green").removeClass("gray");
                        $("#send").parent().css({"width":"245px","marginLeft":"-122px"});
                        $("#send").siblings().remove();   
                    }
                }
                console.log("success");
            })
            .fail(function() {
               
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });     
        }else if (step == 2) {
            var sametip = "新邮箱不能与原邮箱一样！";
            var data = {
                code :$("#step2-code").val()
            }
            if($(".js-email-active").html()==$("#email").val()){
                var checktip = $("#email").siblings('.Validform_checktip');
                if(checktip.length){
                    checktip.removeClass("Validform_right").addClass("Validform_wrong").text(sametip);
                }else{
                    $("#email").parent().append('<div class="Validform_checktip Validform_wrong">'+sametip+'</div>');
                }
                return false;
            }
            $.ajax({
            url: EMAIL_EDIT,
            type: 'POST',
            data:data,
            async:false
            })
            .done(function(response) {
                if(response.code ==0){
                    step++;
                    $(".step2").hide();
                    $(".step3").show();
                    $("#send").text("返回我的代言");
                    $("#send").parent().css({"width":"245px","marginLeft":"-122px"});
                    $("#send").siblings().remove();
                    emailline.find(".leftradius").addClass('opacity').next().addClass("green opacity").removeClass("gray").next().addClass('green').removeClass('gray');  
                }
                console.log("success");
            })
            .fail(function() {      
                       
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