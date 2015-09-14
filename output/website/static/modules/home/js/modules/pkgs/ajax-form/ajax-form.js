define('js/modules/pkgs/ajax-form/ajax-form', ['require', 'exports', 'module', "jquery", "js/modules/libs/validform/Validform_v5.3.2", "js/modules/libs/validform/Validform_Datatype", "js/modules/pkgs/validcode", "js/modules/libs/ui/popup/popup", "js/modules/apis/api-aio"],function(require, exports, module) {
var $ = require("jquery");
require("js/modules/libs/validform/Validform_v5.3.2");
require("js/modules/libs/validform/Validform_Datatype");
var validcode = require("js/modules/pkgs/validcode");
var Boxy = require("js/modules/libs/ui/popup/popup");
var API = require("js/modules/apis/api-aio");


/**
 * 注册或登录之后，可以通过“window.UID”判断是否登陆成功
 * 然后，可以通过扩展“Boxy.linkedTo(ajaxForm.loginLink).options.afterHide”函数添加后续操作
 * 后续操作添加之前先缓存好“afterHide”，操作执行之后，换回。
 */


/**
 * 全角转半角
 */
function ToCDB(str) {
    var tmp = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
            tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
        } else {
            tmp += String.fromCharCode(str.charCodeAt(i));
        }
    }
    return tmp;
}

var ajaxForm = {
    loginLink: $(".login_regist a").eq(0),
    registLink: $(".login_regist a").eq(1),
    findpassLink: $('<a class="findpass"></a>').appendTo("body"),
    emailSuccessLink: $('<a class="emailsuccess"></a>').appendTo("body"),
    setPassLink: $('<a class="setpass"></a>').appendTo("body"),
    setPassSuccessLink: $('<a class="setpasssuccess"></a>').appendTo("body"),
    modal: $('<div class="ajax-form-modal"></div>').height($(document).height()).appendTo("body"),
    bindArr: []
};

/**
 * 初始化
 */
ajaxForm.init = function() {
    window.ajaxform = ajaxForm;
    ajaxForm.loginLink.click(function() {
        ajaxForm.loginPopupBindFunction(function() {
            ajaxForm.modal.fadeOut();
        });
        return false;
    });

    ajaxForm.registLink.click(function() {
        ajaxForm.registPopupBindFunction(function() {
            ajaxForm.modal.fadeOut();
        });
        return false;
    });

    ajaxForm.modal.click(function() {
        var formArr = [
            Boxy.linkedTo(ajaxForm.loginLink[0]),
            Boxy.linkedTo(ajaxForm.registLink[0]),
            Boxy.linkedTo(ajaxForm.findpassLink[0]),
            Boxy.linkedTo(ajaxForm.emailSuccessLink[0]),
            Boxy.linkedTo(ajaxForm.setPassLink[0]),
            Boxy.linkedTo(ajaxForm.setPassSuccessLink[0])
        ];
        for (var i = formArr.length - 1; i >= 0; i--) {
            if (formArr[i]) {
                formArr[i].hide();
            }
        }
        ajaxForm.modal.fadeOut();
    });
};

/**
 * 登陆态模板
 */
ajaxForm.loginTpl = '<a href="/product/create" class="applybtn small btn fl"><span class="icon icon-add"></span>发布代言</a>' +
    '<div class="fl">' +
    '    <div class="fl user_space">' +
    '        <a href="/ucenter/index" class="uc_link"><img class="avatar" src="{avatar}" alt="我的头像"></a>' +
    '        <div class="user_menu">' +
    '            <ul>' +
    '                <li class="bb1"><a href="/home-page/lists?uid={uid}"><span class="icon icon-home"></span>个人主页</a></li>' +
    '                <li><a href="/ucenter/my-order"><span class="icon icon-order"></span>我的订单</a></li>' +
    '                <li><a href="/ucenter/index"><span class="icon icon-set"></span>账号设置</a></li>' +
    '                <li><a href="/user/logout"><span class="icon icon-quit"></span>退出登录</a></li>' +
    '            </ul>' +
    '            <div class="user_menu_arrow"><b><i></i></b></div>' +
    '        </div>' +
    '    </div>' +
    '</div>';

/**
 * 模板数据替换
 */
ajaxForm.getUserStatusHtml = function(data) {

    var html = ajaxForm.loginTpl.replace(/(\{avatar\})|(\{uid\})/g, function(matches) {
        var res;
        switch (matches) {
            case "{avatar}":
                res = data.data.avatar;
                break;
            case "{uid}":
                res = data.data.id;
                break;
            default:
                res = "";
                break;
        }
        return res;
    });
    return html;
};

/**
 * 登陆按钮事件绑定
 */
ajaxForm.loginPopupBindFunction = function(callback) {
    var url = API.getUrl("USER", "LOGIN_GET_HTML");
    var popup = Boxy.linkedTo(ajaxForm.loginLink[0]);
    if (popup) {
        popup.show();
    } else {
        Boxy.load(url, {
            modal: false,
            closeable: false,
            actuator: ajaxForm.loginLink[0],
            afterShow: function() {
                ajaxForm.loginFormActionBind(callback);
                ajaxForm.modal.show();
            }
        });
    }
};

/**
 * 注册按钮事件绑定
 */
ajaxForm.registPopupBindFunction = function(callback) {
    var url = API.getUrl("USER", "REGISTER_GET_HTML");
    var popup = Boxy.linkedTo(ajaxForm.registLink[0]);
    if (popup) {
        popup.show();
    } else {
        Boxy.load(url, {
            modal: false,
            closeable: false,
            actuator: ajaxForm.registLink[0],
            afterShow: function() {
                ajaxForm.registFormActionBind(callback);
                ajaxForm.modal.show();
            }
        });
    }
};

/**
 * 找回密码事件绑定
 */
ajaxForm.findPassPopupBindFunction = function() {
    var url = API.getUrl("USER", "FINDPASS_GET_HTML");
    var popup = Boxy.linkedTo(ajaxForm.findpassLink[0]);
    if (popup) {
        popup.show();
    } else {
        Boxy.load(url, {
            modal: false,
            closeable: false,
            actuator: ajaxForm.findpassLink[0],
            afterShow: function() {
                ajaxForm.findPassFormActionBind();
                ajaxForm.modal.show();
            }
        });
    }
};

/**
 * 登录事件逻辑
 */
ajaxForm.loginFormActionBind = function(callback) {

    // 判断是否已绑定
    if (ajaxForm.bindArr.hasOwnProperty("loginForm")) {
        return false;
    }
    ajaxForm.bindArr.loginForm = 1;

    var form = $(".js-login-form").find("form");

    // 验证码
    validcode.init({
        selecter: ".js-login-form .vcode", //点击的元素选择器
        target: ".js-login-form .vcode", //验证码图片的选择器
        geturl: API.getUrl("USER", "LOGIN_VCODE_REFRESH") //验证码图片的更新的URL
    });

    // 验证初始化
    var loginForm = form.Validform({
        tiptype: 3
    });

    // 错误提示框
    form.find("button").before('<div id="login-form-msgbox" class="Validform_wrong"></div>');

    // 验证条件缓存
    var checkitem = form.find(".check");
    var checkinput = checkitem.find("input");
    var checkurl = checkinput.attr("ajaxurl");
    var datatype = checkinput.attr("datatype");

    // 隐藏时去除验证条件
    if (checkitem.css("display") === "none") {
        checkinput.removeAttr("ajaxurl");
        checkinput.removeAttr("datatype");
    }

    var url = API.getUrl("USER", "LOGIN_FORM_ACTION");

    var ajaxing = false;

    // 登陆提交
    form.submit(function() {

        if (!loginForm.check()) {
            return false;
        }

        if (ajaxing) {
            return false;
        }

        ajaxing = true;

        var data = $(this).serialize();

        var loginPopup = Boxy.linkedTo(ajaxForm.loginLink[0]);

        $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: data
            })
            .done(function(data) {
                if (data.code === "0") {
                    // 成功，设置登录态
                    window.UID = data.data.id;
                    var html = ajaxForm.getUserStatusHtml(data);
                    $(".userstatus").html(html);
                    loginPopup.hide(function() {
                        if (callback) {
                            callback();
                        }
                    });
                } else if (data.code == "1013") {
                    // 失败3次以上，显示验证码
                    checkitem.show();
                    checkinput.attr("ajaxurl", checkurl);
                    checkinput.attr("datatype", datatype);
                    $("#login-form-msgbox").text(data.msg);
                } else {
                    // 失败
                    $("#login-form-msgbox").text(data.msg);
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                ajaxing = false;
                console.log("complete");
            });
        return false;
    });

    // 全半角转换
    form.find("input").on("input change", function() {
        var thisValue = ToCDB($(this).val());
        $(this).val(thisValue);
        // console.log($(this).val());
        $("#login-form-msgbox").text("");

    });

    // 绑定弹窗上的注册链接
    $(".js-login-form").find(".footer a").click(function() {
        ajaxForm.registPopupBindFunction(function() {
            ajaxForm.modal.fadeOut();
        });
        Boxy.linkedTo(ajaxForm.loginLink[0]).hide();
        return false;
    });

    // 绑定弹窗上的找回密码链接
    $(".js-login-form").find(".notice a").click(function() {
        ajaxForm.findPassPopupBindFunction();
        Boxy.linkedTo(ajaxForm.loginLink[0]).hide();
        return false;
    });
};

/**
 * 注册事件逻辑
 */
ajaxForm.registFormActionBind = function(callback) {

    // 判断是否已绑定
    if (ajaxForm.bindArr.hasOwnProperty("registForm")) {
        return false;
    }
    ajaxForm.bindArr.registForm = 1;

    var form = $(".js-regist-form").find("form");

    // 验证初始化
    var regForm = form.Validform({
        tiptype: 3
    });

    // 错误提示框
    form.find("button").before('<div id="regist-form-msgbox" class="Validform_wrong"></div>');

    var url = API.getUrl("USER", "REGISTER_FORM_ACTION");

    var ajaxing = false;

    // 注册提交
    form.submit(function() {

        if (!regForm.check()) {
            return false;
        }

        if (ajaxing) {
            return false;
        }

        ajaxing = true;

        var data = $(this).serialize();
        var registPopup = Boxy.linkedTo(ajaxForm.registLink[0]);

        $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: data,
            })
            .done(function(data) {
                if (data.code === "0") {
                    // 成功，设置登录态
                    window.UID = data.data.id;
                    var html = ajaxForm.getUserStatusHtml(data);
                    $(".userstatus").html(html);

                    registPopup.hide(function() {
                        if (callback) {
                            callback();
                        }
                    });
                } else {
                    // 失败
                    $("#regist-form-msgbox").text(data.msg);
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                ajaxing = false;
                console.log("complete");
            });
        return false;
    });

    // 全半角转换
    form.find("input").on("input change", function() {
        var thisValue = ToCDB($(this).val());
        $(this).val(thisValue);
        // console.log($(this).val());
        $("#login-form-msgbox").text("");
    });

    // 绑定弹窗上的注册链接
    $(".js-regist-form").find(".footer a").click(function() {
        ajaxForm.loginPopupBindFunction(function() {
            ajaxForm.modal.fadeOut();
        });
        Boxy.linkedTo(ajaxForm.registLink[0]).hide();
        return false;
    });
};

/**
 * 找回密码事件逻辑
 */
ajaxForm.findPassFormActionBind = function() {

    // 判断是否已绑定
    if (ajaxForm.bindArr.hasOwnProperty("findPassForm")) {
        return false;
    }
    ajaxForm.bindArr.findPassForm = 1;

    var form = $(".js-findpass-form").find("form");

    // 验证码初始化
    validcode.init({
        selecter: ".js-findpass-form .vcode", //点击的元素选择器
        target: ".js-findpass-form .vcode", //验证码图片的选择器
        geturl: API.getUrl("USER", "FINDPASS_VCODE_REFRESH") //验证码图片的更新的URL
    });

    // 验证初始化
    var findpassForm = form.Validform({
        tiptype: 3
    });

    // 错误提示框
    form.find("button").before('<div id="regist-form-msgbox" class="Validform_wrong"></div>');

    var url = API.getUrl("USER", "FINDPASS_FORM_ACTION");

    var ajaxing = false;

    // 找回密码提交
    form.submit(function() {

        if (!findpassForm.check()) {
            return false;
        }

        if (ajaxing) {
            return false;
        }

        ajaxing = true;

        var data = $(this).serialize();
        var findpassPopup = Boxy.linkedTo(ajaxForm.findpassLink[0]);

        $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: data
            })
            .done(function(data) {
                // console.log(data);
                if (data.code === "1000") {
                    // 1000 邮箱找回
                    new Boxy("<div>" + data.data.html + "</div>", {
                        modal: false,
                        closeable: false,
                        actuator: ajaxForm.emailSuccessLink[0],
                        unloadOnHide: true,
                        afterHide: function() {
                            ajaxForm.modal.fadeOut();
                        }
                    }).show();
                    findpassPopup.hide();
                } else if (data.code === "2000") {
                    // 2000 手机找回
                    new Boxy("<div>" + data.data.html + "</div>", {
                        modal: false,
                        closeable: false,
                        actuator: ajaxForm.setPassLink[0],
                        unloadOnHide: true,
                        afterShow: function() {
                            ajaxForm.mobileFindPassFormActionBind();
                        }
                    }).show();
                    findpassPopup.hide();
                } else {
                    $("#findpass-form-msgbox").text(data.msg);
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                ajaxing = false;
                console.log("complete");
            });
        return false;
    });

    // 输入时清空错误
    form.find("input").on("input change", function() {
        $("#findpass-form-msgbox").text("");
    });

    // 绑定弹窗上的登录链接
    $(".js-findpass-form").find(".footer a").click(function() {
        ajaxForm.loginPopupBindFunction(function() {
            ajaxForm.modal.fadeOut();
        });
        Boxy.linkedTo(ajaxForm.findpassLink[0]).hide();
        return false;
    });
};

/**
 * 手机找回密码事件逻辑
 */
ajaxForm.mobileFindPassFormActionBind = function() {

    // 判断是否已绑定
    if (ajaxForm.bindArr.hasOwnProperty("mobileFindPassForm")) {
        return false;
    }
    ajaxForm.bindArr.mobileFindPassForm = 1;

    var mVCodeLock = false; // 验证码锁
    var ajaxing = false; // ajax锁
    var form = $(".js-mobile-findpass-form").find("form");
    var ajaxTimeout = 5000; // 超时

    // 验证初始化
    var mobileFindPassForm = form.Validform({
        tiptype: 3
    });

    // 错误提示框
    form.find("button").eq(1).before('<div id="mobile-findpass-form-msgbox" class="Validform_wrong"></div>');

    // 获取验证码按钮事件绑定
    form.on("click", ".checkcode", function() {
        var validBtn = $(this),
            phoneNum = form.find(".phonenum").text(),
            checkkey = validBtn.data("checkkey"),
            timeout = 60;

        if (mVCodeLock) {
            return false;
        }

        if (ajaxing) {
            return false;
        }

        mVCodeLock = true;
        ajaxing = true;

        var url = API.getUrl("USER", "MVCODE_SEND");

        validBtn.addClass("disabled").text("获取中...");

        $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                timeout: ajaxTimeout,
                data: {
                    username: phoneNum,
                    checkkey: checkkey
                }
            })
            .done(function(res) {
                if (res.code == "0") {
                    validBtn.text(timeout + "秒");
                    _validTimeOut(timeout);
                } else {
                    $("#mobile-findpass-form-msgbox").text(res.msg);
                    validBtn.removeClass("disabled").text("获取验证码");
                }

                function _validTimeOut(iTimeout) {
                    if (iTimeout >= 1) {
                        setTimeout(function() {
                            iTimeout -= 1;
                            validBtn.text(iTimeout + "秒");
                            _validTimeOut(iTimeout);
                        }, 1000);
                    } else {
                        validBtn.removeClass("disabled").text("获取验证码");
                        mVCodeLock = false;
                    }
                }
                ajaxing = false;
            })
            .fail(function(err, err2) {
                $("#mobile-findpass-form-msgbox").text("程序忙，请稍后重试！");
                mVCodeLock = false;
                ajaxing = false;
                validBtn.removeClass("disabled").text("获取验证码");
            })
            .always(function() {});
        return false;
    });

    // 找回密码提交事件绑定
    form.submit(function() {

        if (!mobileFindPassForm.check()) {
            return false;
        }

        if (ajaxing) {
            return false;
        }

        ajaxing = true;

        var data = $(this).serialize();
        var url = API.getUrl("USER", "SETPASS_FORM_ACTION");
        var setPassPopup = Boxy.linkedTo(ajaxForm.setPassLink[0]);

        $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: data,
            })
            .done(function(data) {
                if (data.code === "0") {
                    // 找回成功
                    new Boxy("<div>" + data.data.html + "</div>", {
                        modal: false,
                        closeable: false,
                        actuator: ajaxForm.setPassSuccessLink[0],
                        unloadOnHide: true,
                        afterShow: function() {
                            var setPassSuccessPopup = Boxy.linkedTo(ajaxForm.setPassSuccessLink[0]);
                            setTimeout(function() {
                                setPassSuccessPopup.hide();
                            }, 3000);
                        },
                        afterHide: function() {
                            ajaxForm.loginPopupBindFunction(function() {
                                ajaxForm.modal.fadeOut();
                            });
                        }
                    }).show();
                    setPassPopup.hide();
                } else {
                    // 找回失败
                    $("#mobile-findpass-form-msgbox").text(data.msg);
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                ajaxing = false;
                console.log("complete");
            });
        return false;

    });

    // 手机找回密码弹窗上的登陆链接
    $(".js-mobile-findpass-form").find(".footer a").click(function() {
        ajaxForm.loginPopupBindFunction(function() {
            ajaxForm.modal.fadeOut();
        });
        Boxy.linkedTo(ajaxForm.findpassLink[0]).hide();
        return false;
    });
};

module.exports = ajaxForm;
});