var $ = require("jquery");
require("validform");
require("validform_datatype");

$(function() {

    var validCodeLock = false;
    var $form = $("#reset_form");
    var ajaxtimeout = 5000;

    // 验证
    var loginForm = $form.Validform({
        tiptype: 3
    });

    // 获取验证码
    $form.on("click", ".checkcode", function() {
        var $validbtn = $(this),
            phoneNum = $form.find(".phonenum").text(),
            checkkey = CHECKKEY,
            timeout = 60;
        if (validCodeLock) {
            return false;
        }
        validCodeLock = true;
        $validbtn.addClass("disabled").text("获取中...");
        $.ajax({
                url: SEND_VALID_CODE,
                type: 'POST',
                dataType: 'json',
                timeout: ajaxtimeout,
                data: {
                    username: phoneNum,
                    checkkey: checkkey
                }
            })
            .done(function(res) {
                if (res.code == "0") {
                    $validbtn.text(timeout + "秒");
                    _validTimeOut(timeout);
                } else {
                    alert(res.msg);
                    $validbtn.removeClass("disabled").text("获取验证码");
                }

                function _validTimeOut(_timeout) {
                    if (_timeout >= 1) {
                        setTimeout(function() {
                            _timeout -= 1;
                            $validbtn.text(_timeout + "秒");
                            _validTimeOut(_timeout);
                        }, 1000);
                    } else {
                        $validbtn.removeClass("disabled").text("获取验证码");
                        validCodeLock = false;
                    }
                }
            })
            .fail(function(err, err2) {
                console.log(err2);
                alert("程序忙，请稍后重试！");
                validCodeLock = false;
                $validbtn.removeClass("disabled").text("获取验证码");
            })
            .always(function() {});
        return false;
    });
});