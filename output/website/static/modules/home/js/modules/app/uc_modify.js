define('js/modules/app/uc_modify', ['require', 'exports', 'module', "jquery", "js/modules/libs/validform/Validform_v5.3.2", "js/modules/libs/validform/Validform_Datatype", "js/modules/apis/api-aio", "js/modules/libs/ui/dropkick/dropkick"],function(require, exports, module) {
var $ = require("jquery");
require("js/modules/libs/validform/Validform_v5.3.2");
require("js/modules/libs/validform/Validform_Datatype");
var API = require("js/modules/apis/api-aio");
require("js/modules/libs/ui/dropkick/dropkick");

$(function() {

    $("#modify_form").Validform({
        tiptype:3
    });


    (function (){      
        var dkCity;
        $("#select_province").dropkick({
            change: function(){
                updatacity(this.value,function(){
                    dkCity.refresh();
                });    
            }
        });
        updatacity($("#select_province").val(),function(){
            dkCity.refresh();
        },$("#town").val());
        $("#select_city").dropkick({
            initialize: function(){
                dkCity = this;        
            }
        });    
        //更新城市下拉菜单
        function updatacity(id, callback,value) {
            console.log(id);
            $.ajax({
                url: API.getUrl("USER", "PROVINCE_CITY"),
                type: 'POST',
                dataType: 'json',
                data: {
                    id: id
                }
            })
            .done(function(data) {
                var html = "";
                if (data.code === "0") {
                    var arr = data.data;
                    for (var i = 0; i < arr.length; i++) {
                        if (value == arr[i].id) {
                            html += '<option selected value="' + arr[i].id + '">' + arr[i].name + '</option>';
                        }else{
                            html += '<option value="' + arr[i].id + '">' + arr[i].name + '</option>';
                        }
                    }
                }
                $("#select_city").html(html);
                if (callback) {
                    callback();
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
        }       
    })();
    
});

});