var $ = require("jquery");
var Boxy = require("popup");
var API = require("apis/api-aio");
var template = require("arttemplate");
require("validform");
require("validform_datatype");
require("dropkick");
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
        $(document).on("click", ".js-address-btn", function() {
            Formcontent.resetForm();
            $("#addressid").val("");
            $("#name").val("");
            $("#select-province").val("0").trigger("change");
            $("#select-city").html('<option value="0">选择城市</option>').val("0").trigger("change");
            $("#select-zone").html('<option value="0">选择地区</option>').val("0").trigger("change");
            $("#adress").val("");
            $("#mobile").val("");
            $("#phone").val("");
            $("#email").val("");
            $("#addressname").val("");
            $("#phone").val("");
            edit = false;
            xqaddress.hide();
            grayBg.show();
            addwindow.show();
        });

        $(document).on("click", ".add_address_box", function() {
            $(".js-address-btn").trigger("click");
        });


        $(document).on("click", ".close-btn", function() {
            $(".errmsg").html("");
            Formcontent.resetForm();
            grayBg.hide();
            addwindow.hide();
        });
    })();
    $(document).on("click", ".edit", function() {
        edit = true;
        Formcontent.resetForm();
        var that = $(this).closest(".js-address-box").addClass("editing").siblings().removeClass('editing');
        var thatParent = $(this).closest(".js-address-box");
        var data = thatParent.data();
        data = $.extend({}, DATA_DEFAULT, data);
        $("#addressid").val(data.id);
        $("#name").val(data.harvest);
        $("#adress").val(data.address);
        $("#mobile").val(data.mobile);
        $("#phone").val(data.telephone);
        $("#email").val(data.email);
        $("#addressname").val(data.alias);
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
    /*可以添加多少个地址*/
    var Total = $(".js-total");
    var IsAlright = $(".js-isalright");
    var nums = $(".js-address-box");
    IsAlright.text(Total.text() - nums.length);


    /*收货地址*/
    $(document).on('click', '.js-address-box', function() {
        var that = $(this);
        var id = that.data("id");
        var receiving = $("#addressid");

        receiving.val(id);
    });


    /*设置为默认地址*/
    $(document).on("click", ".default", function() {
        var defaultbtn = $(this);
        var that = $(this).closest(".js-address-box");
        var addresList = $(".address-list");
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
                    that.addClass('Imgactive');
                    that.siblings().removeClass('Imgactive');
                    that.prependTo(addresList);
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

    });
    /*删除地址*/
    $(document).on("click", ".delete", function() {
        var that = $(this).closest(".js-address-box");
        var data = {
            id: that.data("id"),
            status: 0
        };
        Boxy.confirm("<div>确定要删除此产品？</div>", function() {
            $.ajax({
                    url: API.getUrl("PAYMENT", "ADDRESS"),
                    type: 'POST',
                    dataType: 'json',
                    data: data
                })
                .done(function(response) {

                    that.remove();
                    window.location.href = window.location.href;
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        });
    });
    /*保存收货地址添加到页面*/
    (function() {
        var $form = $("#address");
        var addressbtn = $(".js-address-box");
        $form.on("submit", function() {

            if (!$("#name").val().length || !parseInt($("#select-province").val()) || !parseInt($("#select-city").val()) || !parseInt($("#select-zone").val()) || !$("#email").val().length || !$("#addressname").val().length) {
                $(".errmsg").html("亲，您还有未选择的项目哦~");

                return false;
            } else {
                var data = {
                    id: $("#addressid").val(),
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
                            if (edit && $(".editing").hasClass("Imgactive")) {
                                data.addclasses = "Imgactive";
                            }
                            var html = template("address-tpl", data);

                            if (edit) {
                                $(".editing").prop("outerHTML", html);
                            } else {
                                $(".alert").after(html);
                                window.location.href = window.location.href;
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

});