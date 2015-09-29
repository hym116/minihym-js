var $ = require("jquery");
require("validform");
require("validform_datatype");
$(function() {

    $("#mod_password").Validform({
        tiptype:3
    });
    $("#mod_password").submit(function(event) {
        if($(".Validform_wrong").length === 0 && $.trim($('[name="oldpassword"]').val()) == $.trim($('[name="newpassword"]').val())){
            $('[name="newpassword"]')
                .siblings('.Validform_checktip')
                .text("新密码不能与旧密码一样")
                .removeClass("Validform_right")
                .addClass('Validform_wrong');
            return false;
        }
    });
});