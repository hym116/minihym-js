define('js/modules/app/order-info', ['require', 'exports', 'module', "jquery", "js/modules/libs/ui/popup/popup", "js/modules/apis/api-aio", "js/modules/libs/arttemplate/arttemplate", "js/modules/libs/validform/Validform_v5.3.2", "js/modules/libs/validform/Validform_Datatype", "js/modules/libs/ui/dropkick/dropkick"],function(require, exports, module) {
var $ = require("jquery");
var Boxy = require("js/modules/libs/ui/popup/popup");
var API = require("js/modules/apis/api-aio");
var template = require("js/modules/libs/arttemplate/arttemplate");
require("js/modules/libs/validform/Validform_v5.3.2");
require("js/modules/libs/validform/Validform_Datatype");
require("js/modules/libs/ui/dropkick/dropkick");
$(function() {
    var $form = $("#address"); 
    $form.Validform({
        tiptype:3,
        datatype:{
            "phone":function(gets,obj,curform,regxp){
                /*参数gets是获取到的表单元素值，
                  obj为当前表单元素，
                  curform为当前验证的表单，
                  regxp为内置的一些正则表达式的引用。*/
                var reg1=regxp["m"],
                    reg2=/[\d]{7}/,
                    mobile=curform.find(".mobile");
                if(reg1.test(mobile.val())){return true;}
                if(reg2.test(gets)){return true;}
                return false;
            }   
        }
    });
    var add = $(".js-ulwrap li:last()")   
    var addwindow = $(".js-window");
    var closebtn = $(".close-btn");
    var bg = $(".gray-bg");
    add.on("click",function() {
        bg.show();
        addwindow.show();
    });
    closebtn.on("click",function() {
        bg.hide();
        addwindow.hide();
    });

    var xqaddress = $(".xqaddress");
    var select = $('.name-wrap select');
    select.change(function() {
        var that = $(this);
        var province = $("#select-province").val();
        var city = $("#select-city").val();
        var town =$("#select-zone").val();
        var textaddress = $(".text-address");
        var text ="";
        if(that.val() == null || that.val() == ""){
                
        }else {
            $("select option:selected" ).each(function() {
                text += $(this).text();
                if (province && city && town){
                    textaddress.text(text);
                    xqaddress.show(); 
                }
            });
        }
    });

    /*保存收货地址添加到页面*/
    // (function() {
    //     var parent = $(".js-address");  
    //     var $form = $("#address");   
    //     var savebtn = $form.find(".save"); 
    //     var addressbtn = parent.find("li:last()");
    //     savebtn.click(function() {     
    //         if (!$("#name").val().length || !parseInt($("#select-province").val()) || !parseInt($("#select-city").val())|| !parseInt($("#select-zone").val())||!$("#email").val().length||!$("#addressname").val().length) {
    //             $(".errmsg").html("亲，您还有未选择的项目哦~");

    //             return false;
                
    //         }else {
               
    //             var data = {
    //                 id: "",
    //                 name:$form.find("#name").val(),
    //                 province:$form.find("#select-province").val(),
    //                 city:$form.find("#select-city").val(),
    //                 zone:$form.find("#select-zone").val(),
    //                 town:$form.find(".text-address").text(),      
    //                 address:$form.find("#adress").val(),
    //                 mobile:$form.find("#mobile").val(),
    //                 phone:$form.find("#phone").val(),
    //                 email:$form.find("#email").val(),
    //                 addressname:$form.find("#addressname").val()
    //             };
    //             var html = template("title-desc-tpl", data);
    //             addressbtn.before(html);   
    //             bg.hide();
    //             addwindow.hide();
    //         }   
    //     });
    // })();
   
    /*收货地址*/  
    $('.js-address').on('click','li',function(){ 
        var that = $(this);
        var id = that.data("id");
        var receiving = $("#receiving");
        that.addClass('active').siblings().removeClass('active');
        receiving.val(id);       
    });

    /*产品信息*/
    var productname = $("#product-name");
    var id = $(".list-item-content").data("id");
    productname.val(id);
    /*支付方式*/
    $(".paylist-warp .js-check").click(function() {
        var that = $(this);
        var payment = $("#payment");
        var id = that.data("id");
        that.addClass('active').siblings().removeClass('active');
        payment.val(id);
    });
    /*优惠券*/
    $(".js-benefit").mouseover(function(){
        var that = $(this);
        var parent = that.closest('.list-item-content');
        var menu = parent.find(".js-menu");
        var listitem = parent.find(".js-item li");
        var close = parent.find(".js-close");
        var result = parent.find(".result-t");
        menu.show();
        close.click(function() {
            menu.hide();
        });
        listitem.click(function() {      
            var that = $(this);
            var id = that.data("id");
            var benefit = $("#benefit");
            var text = that.find(".condition").text();
            menu.hide();
            result.show();
            result.text(text);
            benefit.val(id);
        });
    });
    
    (function(){
        // 如果后端输出的是两个type 为hidden的input       
        var dkCity,dkzone;
        $("#select-province").dropkick({
            change: function(){
               // var dk = this;
                updatacity(this.value,function(){
                    dkCity.refresh();
                });
            }
        });
        $("#select-city").dropkick({
            change: function(){
               // var dk = this;
                updatacity(this.value,function(){
                    dkzone.refresh();
                });
            }
        });

        updatacity($("#select-province").val(),function(){
            dkCity.refresh();
        },$("#town").val());

        $("#select-city").dropkick({
            initialize: function(){
                dkCity = this;        
            }
        }); 

        $("#select-zone").dropkick({
            initialize: function(){
                dkzone = this;        
            }
        });  

        //更新城市下拉菜单
        function updatacity(id ,callback, value) {
           
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
                $("#select-city").html(html);
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
    $(document).on("click",".edit",function() {  
        var that = $(this).parent("li");
        bg.show();
        addwindow.show(); 
        var data = {
                    id: "",
                    name:that.data("name"),
                    province:that.data("province"),
                    city:that.data("city"),
                    zone:that.data("zone"),
                    town:that.data("town"),    
                    address:that.data("address"),
                    mobile:that.data("mobile"),
                    phone:that.data("phone"),
                    email:that.data("email"),
                    addressname:that.data("addressname")
                };
            var html = template("shoots", data);
    });

    function saveBtn() {
        var parent = $(".js-address");  
        var $form = $("#address");   
        var savebtn = $form.find(".save"); 
        var addressbtn = parent.find("li:last()");
        savebtn.click(function() {     
            if (!$("#name").val().length || !parseInt($("#select-province").val()) || !parseInt($("#select-city").val())|| !parseInt($("#select-zone").val())||!$("#email").val().length||!$("#addressname").val().length) {
                $(".errmsg").html("亲，您还有未选择的项目哦~");
                return false;           
            }else {       
                var data = {
                    id: "",
                    name:$form.find("#name").val(),
                    province:$form.find("#select-province").val(),
                    city:$form.find("#select-city").val(),
                    zone:$form.find("#select-zone").val(),
                    town:$form.find(".text-address").text(),      
                    address:$form.find("#adress").val(),
                    mobile:$form.find("#mobile").val(),
                    phone:$form.find("#phone").val(),
                    email:$form.find("#email").val(),
                    addressname:$form.find("#addressname").val()
                };
                var html = template("title-desc-tpl", data);
                addressbtn.before(html);   
                bg.hide();
                addwindow.hide();
            }   
        });
    };
    saveBtn();

   
});

});