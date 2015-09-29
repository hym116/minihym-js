define('js/modules/app/register', ['require', 'exports', 'module', "jquery", "js/modules/libs/validform/Validform_v5.3.2", "js/modules/libs/validform/Validform_Datatype"],function(require, exports, module) {
var $ = require("jquery");
//
require("js/modules/libs/validform/Validform_v5.3.2");
require("js/modules/libs/validform/Validform_Datatype");

$(function(){
    //

    var form = $("#regform");
    var regForm = form.Validform({
        tiptype:3
    });
    form.find("button").before('<div id="msgbox" class="Validform_wrong"></div>');
    var url = form.attr("action");
    var ajaxing = false;
    form.submit(function(){

        if (!regForm.check()) {
            return false;
        }

        if (ajaxing) {
            return false;
        }
        ajaxing = true;
        var data = $(this).serialize();
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
        })
        .done(function(data) {
            if (data.code === "0") {
                var jumpurl = data.data.succeurl || '';
                location.href = jumpurl;
            }else{
                $("#msgbox").text(data.msg);
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
});
});