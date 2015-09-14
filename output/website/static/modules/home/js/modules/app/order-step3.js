define('js/modules/app/order-step3', ['require', 'exports', 'module', "jquery", "js/modules/libs/ui/popup/popup", "js/modules/apis/api-aio", "js/modules/libs/arttemplate/arttemplate", "js/modules/libs/validform/Validform_v5.3.2", "js/modules/libs/validform/Validform_Datatype", "js/modules/libs/ui/dropkick/dropkick"],function(require, exports, module) {
var $ = require("jquery");
var Boxy = require("js/modules/libs/ui/popup/popup");
var API = require("js/modules/apis/api-aio");
var template = require("js/modules/libs/arttemplate/arttemplate");
require("js/modules/libs/validform/Validform_v5.3.2");
require("js/modules/libs/validform/Validform_Datatype");
require("js/modules/libs/ui/dropkick/dropkick");
$(function() {
    var $form = $("#address");
    var edit;
    var DATA_DEFAULT = {
        id: "",
        harvest: "",
        province: "0",
        city: "0",
        district: "0",
        address: "",
        telephone: "",
        email: "",
        alias: "",
        mobile: ""
    };
    var Formcontent = $form.Validform({
        tiptype: 3,
        datatype: {
            "phone": function(gets, obj, curform, regxp) {
                /*参数gets是获取到的表单元素值，
                  obj为当前表单元素，
                  curform为当前验证的表单，
                  regxp为内置的一些正则表达式的引用。*/
                var reg1 = regxp["m"],
                    reg2 = /[\d]{7}/,
                    mobile = curform.find(".mobile");
                if (reg1.test(mobile.val())) {
                    return true;
                }
                if (reg2.test(gets)) {
                    return true;
                }
                return false;
            }
        }
    });
    var xqaddress = $(".xqaddress");
    var select = $('.name-wrap select');
    select.change(function() {
        var that = $(this);
        var provincetext = $("#select-province").val();
        var citytext = $("#select-city").val();
        var towntext = $("#select-zone").val();
        var textaddress = $(".text-address");
        var text = "";
        if (that.val() == null || that.val() == "") {

        } else {
            $("select option:selected").each(function() {
                text += $(this).text();

                if (provincetext !== "0" && citytext !== "0" && towntext !== "0") {

                    textaddress.text(text);
                    xqaddress.show();
                }
            });
        }
    });


    /*收货地址*/
    $('.js-address').on('click', 'li', function() {

        var that = $(this);
        if (that.hasClass('js-address-btn')) {

        } else {
            that.addClass('active').siblings().removeClass('active');
            var id = that.data("id");
            var receiving = $("#receiving");
            receiving.val(id);
        }
    });

    /*产品信息*/
    (function() {
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
    })();
    /*优惠券*/
    (function() {


        var parent = $('.list-item-content');
        var menu = parent.find(".js-menu");
        var listitem = parent.find(".js-item li");
        var result = parent.find(".result-t");

        $(".js-benefit").click(function() {
            $(".title").toggleClass("active");
            menu.toggle();
        });

        listitem.click(function() {
            var that = $(this);
            var yhq = $(".js-yhq");

            var parent = that.parent(".list-item-content");
            var id = that.data("id");
            var benefit = $("#benefit");
            var text = that.find(".condition").text();
            var ticket = parseFloat(that.data("integral")); //优惠金额
            var Initialcost = parseInt($(".js-Initialcost").text()); //原价
            var Presentvalue = $(".js-Presentvalue"); //现价
            var res = $(".js-res").text("-" + ticket + "元");


            Presentvalue.text(Initialcost - ticket + "元");
            yhq.show();
            menu.hide();

            result.show();
            result.html(text + '<div class="yhclose"></div>');


            benefit.val(id);
        });
        $(document).on("click", ".yhclose", function() {
            $(this).parent(".result-t").empty();
            benefit.val();
        });

        $(document).on("click",".js-close",function() {
            menu.hide();
        });

    })();


    /*地址管理*/
    var addressSelect = (function() {
        // 如果后端输出的是两个type 为hidden的input
        var dkProvince, dkCity, dkZone;

        $("#select-province").dropkick({
            initialize: function() {
                dkProvince = this;
            },
            change: function() {
                updatacity(this.value, function() {
                    dkCity.refresh();
                    $("#select-zone").html('<option value="0">选择地区</option>').val("0").trigger("change");
                });
            }
        });
        $("#select-city").dropkick({
            initialize: function() {
                dkCity = this;
            },
            change: function() {
                updatazone(this.value, function() {
                    dkZone.refresh();
                });
            }
        });

        $("#select-zone").dropkick({
            initialize: function() {
                dkZone = this;
            }
        });
        $("#select-province").on("change", function() {
            dkProvince.refresh();
        });
        $("#select-city").on("change", function() {
            dkCity.refresh();
        });
        $("#select-zone").on("change", function() {
            dkZone.refresh();
        });
        // updatacity($("#select-province").val(),function(){
        //     dkCity.refresh();
        //     updatacity($("#select-city").val(),function(){
        //         dkZone.refresh();
        //     },$("#select-city").val());
        // },$("#select-province").val());

        // 更新区级下拉菜单
        function updatazone(id, callback, value) {
            updatacity(id, callback, value, true);
        }

        //更新城市下拉菜单
        function updatacity(id, callback, value, zone) {

            $.ajax({
                    url: API.getUrl("USER", "PROVINCE_CITY"),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        id: id
                    }
                })
                .done(function(response) {
                    // console.log(value);
                    // console.log(response.data);
                    var html = "";
                    if (response.code === "0") {
                        var arr = response.data;
                        var select0 = "";
                        if (value == 0) {
                            select0 = " selected";
                        }
                        if (zone) {
                            html += '<option' + select0 + ' value="0">选择地区</option>';
                        } else {
                            html += '<option' + select0 + ' value="0">选择城市</option>';
                        }
                        for (var i = 0; i < arr.length; i++) {
                            if (value == arr[i].id) {
                                html += '<option selected value="' + arr[i].id + '">' + arr[i].name + '</option>';
                            } else {
                                html += '<option value="' + arr[i].id + '">' + arr[i].name + '</option>';
                            }
                        }
                        if (zone) {
                            $("#select-zone").html(html);
                        } else {
                            $("#select-city").html(html);
                        }
                        if (callback) {
                            callback();
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
        }

        // 放出接口
        return {
            dkProvince: dkProvince,
            dkCity: dkCity,
            dkZone: dkZone,
            updatazone: updatazone,
            updatacity: updatacity
        };
    })();

    var grayBg = $(".gray-bg");
    var addwindow = $(".js-window");

    (function() {
        // 新地址
        $(document).on("click", ".js-address-btn", function() {
            Formcontent.resetForm();
            $("#receiving").val("");
            $("#name").val("");
            $("#select-province").val("0").trigger("change");
            $("#select-city").html('<option value="0">选择城市</option>').val("0").trigger("change");
            $("#select-zone").html('<option value="0">选择地区</option>').val("0").trigger("change");
            $("#adress").val("");
            $("#mobile").val("");
            $("#phone").val("");
            $("#email").val("");
            $("#addressname").val("");

            edit = false;
            xqaddress.hide();
            grayBg.show();
            addwindow.show();
        });
        // 关闭按钮
        $(document).on("click", ".close-btn", function() {
            $(".errmsg").html("");
            Formcontent.resetForm();
            grayBg.hide();
            addwindow.hide();
        });
    })();

    // 编辑地址
    $(document).on("click", ".edit", function() {
        edit = true;
        Formcontent.resetForm();
        var that = $(this).closest("li").addClass("editing").siblings().removeClass('editing');
        var thatParent = $(this).closest("li");
        var data = thatParent.data();
        data = $.extend({}, DATA_DEFAULT, data);
        $("#receiving").val(data.id);
        $("#name").val(data.harvest);
        $("#adress").val(data.address);
        $("#mobile").val(data.mobile);
        $("#email").val(data.email);
        $("#addressname").val(data.alias);
        $("#phone").val(data.telephone);
        xqaddress.show();
        grayBg.show();
        addwindow.show();
        $("#select-province").val(data.province).trigger('change');
        addressSelect.updatacity(data.province, function() {
            addressSelect.dkCity.refresh();
        }, data.city);
        addressSelect.updatazone(data.city, function() {
            addressSelect.dkZone.refresh();
        }, data.district);
    });

    /*设置为默认地址*/
    $(document).on("click", ".default", function() {
        var def = $(this);
        var that = $(this).closest("li");
        var addresList = $(".js-ulwrap");
        var data = {
            id: that.data("id"),
            status: 2
        };

        $.ajax({
                url: API.getUrl("PAYMENT", "ADDRESS"),
                type: 'POST',
                dataType: 'json',
                data: data
            })
            .done(function(response) {
                if (response.code === "0") {
                    that.addClass('active default-a');
                    that.prependTo(addresList);
                    def.text("默认地址");
                    that.siblings().find(".default").text("设为默认地址");
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

    });

    /*保存收货地址添加到页面*/
    (function() {
        var parent = $(".js-address");
        var $form = $("#address");
        var addressbtn = $(".js-address-btn");

        $form.on("submit", function() {

            if (!$("#name").val().length || !parseInt($("#select-province").val()) || !parseInt($("#select-city").val()) || !parseInt($("#select-zone").val()) || !$("#email").val().length || !$("#addressname").val().length) {
                $(".errmsg").html("亲，您还有未选择的项目哦~");
                return false;
            } else {
                $(".errmsg").html("");
                var data = {
                    id: $("#receiving").val(),
                    harvest: $("#name").val(),
                    province: $("#select-province").val(),
                    city: $("#select-city").val(),
                    district: $("#select-zone").val(),
                    provincetext: $("#select-province").find("option:selected").text(),
                    citytext: $("#select-city").find("option:selected").text(),
                    districttext: $("#select-zone").find("option:selected").text(),
                    address: $("#adress").val(),
                    telephone: $("#phone").val(),
                    email: $("#email").val(),
                    alias: $("#addressname").val(),
                    mobile: $("#mobile").val()
                };
                // ajax

                $.ajax({
                        url: API.getUrl("PAYMENT", "ADDRESS"),
                        type: 'POST',
                        dataType: 'json',
                        data: data
                    })
                    .done(function(response) {
                        if (response.code === "0") {

                            data.id = response.data;

                            var html = template("address-tpl", data);
                            if (edit) {
                                var active = $(".editing").hasClass('active');
                                var index = $(".editing").index();
                                $(".editing").prop("outerHTML", html);
                                if (active) {
                                    $(".js-ulwrap li").eq(index).addClass('active').siblings().removeClass(".editing");

                                }
                            } else {
                                addressbtn.before(html);
                            }
                            grayBg.hide();
                            addwindow.hide();
                        } else {
                            console.log(data.msg);
                        }
                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                        console.log("complete");
                    });
            }
            return false;
        });
    })();

    /*点击确认按钮 地址选择了才可以提交*/
    $("#payment-form").submit(function(){
        if(!$("#receiving").val().length){
            Boxy.confirm("<div>请您添加地址选择后提交！</div>",function(response){
            });
            return false;
        }
    });
});
});