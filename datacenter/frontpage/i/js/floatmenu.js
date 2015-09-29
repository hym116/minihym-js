(function(window,document){
    var styles = '.fe-floatmenu{position: fixed;top:10px;width:40px;padding:5px;background: #fff;border:1px solid #000;z-index:100000000;}.fe-floatmenu>ul{display:none}.fe-floatmenu.show{width:200px;padding:2px;}.fe-floatmenu.show>ul{display: block;}.fe-floatmenu.show>a{text-align:center;}.fe-floatmenu a{color:#434343;display: block;}.fe-floatmenu li{border:1px solid #fff;padding:2px 6px;margin-bottom:-1px;background: #f0f0f0;}.fe-floatmenu .close{position:absolute;right:2px;top:2px;color:#00a1d7;}.fe-floatmenu a:hover{color:#00a1d7;}.fe-floatmenu>ul>li>ul{display: none;padding-left:10px;}.fe-floatmenu>ul>li>ul>li>ul{display: none;padding-left:10px;}.fe-floatmenu>ul>li>ul>li>ul>li>ul{display: none;padding-left:10px;}.fe-floatmenu .hassubmenu>a{position: relative;padding-bottom:3px;}.fe-floatmenu .hassubmenu>a:after{content:"+";position: absolute;right:0;top:0;}.fe-floatmenu .hassubmenu.show>ul{display: block;}.fe-floatmenu .hassubmenu.show>a:after{content:"-";}';
    var html = '<div class="fe-floatmenu">'+
        '<a href="javascript:;">页面导航</a>'+'<a class="close" href="javascript:;">关闭</a>'+
        '<ul>'+
            '<li><a href="login.html">登陆</a></li>'+
             '<li class="hassubmenu"><a href="javascript:;">注册</a>'+
                '<ul class="register-ul">'+
                    '<li><a href="register.html">注册账号</a></li>'+
                    '<li><a href="register-phone-verification.html">第二步-手机验证</a></li>'+
                     '<li><a href="register-set-password.html">第三步-设置密码</a></li>'+
                    '<li><a href="register-result.html">注册成功</a></li>'+
                '</ul>'+
            '</li>'+
            '<li><a href="forget-password.html">忘记密码</a></li>'+
            '<li class="hassubmenu"><a href="javascript:;">绑定邮箱</a>'+
                '<ul class="bind-email-ul">'+
                    '<li><a href="bind-email-inputnew.html">第一步-输入新邮箱</a></li>'+
                    '<li><a href="bind-email-emailcheck.html">第二步-验证新邮箱</a></li>'+
                    '<li><a href="bind-email-phonecheck.html">第三步-发送验证信息</a></li>'+
                    '<li><a href="bind-email-result.html">第四步-完成</a></li>'+

                '</ul>'+
            '</li>'+
            '<li class="hassubmenu"><a href="javascript:;">修改邮箱</a>'+
                '<ul class="email-modify-ul">'+
                    '<li><a href="email-modify-inputnew.html">第一步-输入新邮箱</a></li>'+
                    '<li><a href="email-modify-emailcheck.html">第二步-验证新邮箱</a></li>'+
                    '<li><a href="email-modify-phonecheck.html">第三步-手机验证</a></li>'+
                    '<li><a href="email-modify-result.html">第四步-完成</a></li>'+

                '</ul>'+
            '</li>'+
            '<li class="hassubmenu"><a href="javascript:;">修改手机</a>'+
                '<ul class="phone-modify-ul">'+
                    '<li><a href="phone-modify-inputnew.html">第一步-输入新手机</a></li>'+
                    '<li><a href="phone-modify-checknew.html">第二步-验证新手机</a></li>'+
                    '<li><a href="phone-modify-phonecheck.html">第三步-发送验证信息</a></li>'+
                    '<li><a href="phone-modify-result.html">第四步-完成</a></li>'+

                '</ul>'+
            '</li>'+
            '<li class="hassubmenu"><a href="javascript:;">修改密码</a>'+
                '<ul class="password-modify-ul">'+
                    '<li><a href="password-modify-inputnew.html">输入新密码</a></li>'+
                    '<li><a href="password-modify-result.html">修改成功</a></li>'+

                '</ul>'+
            '</li>'+
         
            '<li class="hassubmenu"><a href="javascript:;">个人中心</a>'+
                '<ul class="uc-ul">'+
                    '<li><a href="uc-index.html">个人信息</a></li>'+
                    '<li><a href="uc-safety.html">账号安全</a></li>'+
                '</ul>'+
            '</li>'+
            '<li class="hassubmenu"><a href="javascript:;">qq登陆-关联已有账号</a>'+
                '<ul class="oldnum-ul">'+
                    '<li><a href="qq-related-oldnum-num.html">第二步关联账号</a></li>'+
                    '<li><a href="qq-related-oldnum.html">第二步关联已有账号</a></li>'+
                    '<li><a href="qq-related-oldnum-confirmphone.html">第二步关联已有账号-验证手机</a></li>'+
                    '<li><a href="qq-related-oldnum-unbind-otherqq.html">关联已有账号-账号未绑定其他qq</a></li>'+
                     '<li><a href="qq-related-oldnum-changebind.html">变更绑定</a></li>'+
                      '<li><a href="qq-oldnum-resetpassword.html">重置密码</a></li>'+
                    '<li><a href="qq-related-oldnum-binded-otherqq.html">关联已有账号-绑定成功</a></li>'+
                '</ul>'+
            '</li>'+
            '<li class="hassubmenu"><a href="javascript:;">qq登陆-关联新账号</a>'+
                '<ul class="newnum-ul">'+
                    '<li><a href="qq-related-newnum-inputphone.html">输入手机号</a></li>'+
                    '<li><a href="qq-related-newnum-validphone.html">手机验证</a></li>'+
                    '<li><a href="qq-related-newnum-setpassword.html">设置密码</a></li>'+
                    '<li><a href="qq-related-newnum-success.html">成功关联新账号</a></li>'+
                    '<li><a href="qq-newnum-confirmnum.html">确认账号</a></li>'+
                '</ul>'+
            '</li>'+
            '<li class="hassubmenu"><a href="javascript:;">其他</a>'+
                '<ul class="error-ul">'+
                    '<li><a href="error404.html">400错误</a></li>'+
                    '<li><a href="error500.html">500错误</a></li>'+
                    '<li><a href="error-question-first.html">常见问题</a></li>'+
                '</ul>'+
            '</li>'+
        '</ul>'+
    '</div>';

    var styleWrap = document.createElement("style");

    styleWrap.innerHTML = styles;
    document.body.appendChild(styleWrap);

    var htmlWrap = document.createElement("div");
    htmlWrap.innerHTML = html;
    document.body.appendChild(htmlWrap);

    var $ = document.querySelectorAll.bind(document);

    Element.prototype.on = Element.prototype.addEventListener;

    NodeList.prototype.on = function (event, fn) {
        [].forEach.call(this, function (el) {
            el.on(event, fn);
        });
        return this;
    };

    var css = function(t,s){
      s = document.createElement('style');
      s.innerText=t;
      document.body.appendChild(s);
    };
     var location = window.location.pathname;
    if(/register/.test(location)){
        $(".register-ul")[0].style.display="block";
    }else if(/bind-email/.test(location)){
        $(".bind-email-ul")[0].style.display="block";
    }else if(/email-modify/.test(location)){
        $(".email-modify-ul")[0].style.display="block";
    }else if(/phone-modify/.test(location)){
        $(".phone-modify-ul")[0].style.display="block";
    }else if(/password-modify/.test(location)){
        $(".password-modify-ul")[0].style.display="block";
    }else if(/uc-/.test(location)){
        $(".uc-ul")[0].style.display="block";
    }else if(/oldnum/.test(location)){
        $(".oldnum-ul")[0].style.display="block";
    }else if(/newnum/.test(location)){
        $(".newnum-ul")[0].style.display="block";
    }else if(/error/.test(location)){
        $(".error-ul")[0].style.display="block";
    }

     $(".fe-floatmenu")[0].classList.add('show');
    $(".fe-floatmenu>a").on("click",function(e){
        $("a.close")[0].style.display="block";
        this.parentNode.classList.add('show');
    });

    $(".fe-floatmenu").on("mouseleave",function(e){
        // this.classList.remove('show');
    });
    $(".close").on("click",function(e){
        $("a.close")[0].style.display="none";
         $(".fe-floatmenu")[0].classList.remove('show');
    });
    $(".fe-floatmenu .hassubmenu").on("click",function(e){
        e.stopPropagation();
        var obj = this.children[1];
        var display = window.getComputedStyle(obj).display;
        if (display == "block") {
            this.classList.toggle('show');
        }else if(display == "none"){
            this.classList.toggle('show');
        }
    });

})(window,document);