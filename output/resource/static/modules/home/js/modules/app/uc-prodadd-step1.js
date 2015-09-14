define('js/modules/app/uc-prodadd-step1', ['require', 'exports', 'module', "jquery", "js/modules/apis/api-aio", "js/modules/pkgs/ajax-form/ajax-form", "js/modules/libs/ui/dropkick/dropkick"],function(require, exports, module) {
var $ = require("jquery");
var API = require("js/modules/apis/api-aio");
var ajaxForm = require("js/modules/pkgs/ajax-form/ajax-form");

require("js/modules/libs/ui/dropkick/dropkick");
var CREAT_URL = API.getUrl("PRODUCT", "CREAT_BUILD");

$(function() {
    // 单选
    $(".single-check .item-wrap .js-check").click(function() {
        var that = $(this);
        var parent = that.closest(".formitem");
        var title = that.html();
        var desc = that.data("desc");
        var checkActive = parent.find(".js-check-active");
        var itemWrap = parent.find(".item-wrap");

        if (parent.hasClass('type')) {
            $("#category").val(that.data("tid"));
        } else if (parent.hasClass('role')) {
            $("#role").val(that.data("rid"));
        } else if (parent.hasClass('sex')) {
            $("#sex").val(that.data("sid"));
        }

        checkActive.find(".active-title").html(title);
        checkActive.find(".message").html(desc);
        checkActive.show();
        itemWrap.hide();
    });
    $(".single-check .item-wrap .js-back").click(function() {
        var that = $(this);
        var parent = that.closest('.formitem');
        var title = that.html();
        var desc = that.data("desc");
        var checkActive = parent.find(".js-check-active");
        var itemWrap = parent.find(".item-wrap");
        var hide_c4 = parent.find(".hide_c4");
        hide_c4.show();
    });
    $(".single-check .js-check-active").click(function() {
        var that = $(this);
        var parent = that.closest(".formitem");
        var itemWrap = parent.find(".item-wrap");
        var hide_c4 = parent.find(".hide_c4");
        if (parent.hasClass('type')) {
            $("#category").val("");
        } else if (parent.hasClass('role')) {
            $("#role").val("");
        } else if (parent.hasClass('sex')) {
            $("#sex").val("");
        } else if (parent.hasClass('hide_c4')) {
            $("#category").val("");
        }
        that.hide();
        hide_c4.hide();
        itemWrap.show();
    });

    // 多选
    $(".multiple-check .item-wrap .js-check").click(function() {
        var that = $(this);
        var parent = that.closest(".formitem");
        var descTpl = "这个产品是为了{ages}而专门设计的";
        var checkActive = parent.find(".js-check-active");
        var input = $("#age");
        var aid = that.data("aid");
        var itemWrap = parent.find(".item-wrap");

        $("#age").val(aid);

        $(".multiple-check .js-check-active [data-aid='" + aid + "']").addClass("click");

        desc = descTpl.replace("{ages}", that.data("desc"));

        checkActive.find(".message").html(desc);
        checkActive.show();
        itemWrap.hide();
    });

    $(".multiple-check .js-check-active .js-check").click(function() {
        var that = $(this);
        var parent = that.closest(".js-check-active");
        var descTpl = "这个产品是为了{ages}而专门设计的";
        var itemWrap = parent.find(".item-wrap");

        if (that.hasClass("click") && parent.find(".click").length === 1) {
            return false;
        }

        that.toggleClass("click");

        var valArr = [];
        var descArr = [];

        parent.find(".js-check").each(function() {
            var _that = $(this);
            if (_that.hasClass('click')) {
                valArr.push(_that.data("aid"));
                descArr.push(_that.data("desc"));
            }
        });
        $("#age").val(valArr.join(","));
        parent.find(".message").text(descTpl.replace("{ages}", descArr.join(",")));
    });

    $(".city-check .js-check-active").click(function() {
        var that = $(this);
        var parent = that.closest(".formitem");
        var itemWrap = parent.find(".item-wrap");

        that.hide();
        itemWrap.show();
    });
    (function() {
        // 如果后端输出的是两个type 为hidden的input
        var dkCity;
        $("#select-province").dropkick({
            change: function() {
                var dk = this;

                updatacity(this.value, function() {
                    dkCity.refresh();
                });
            }
        });
        $("#select-city").dropkick({
            initialize: function() {
                dkCity = this;
                var citySelected = $("#city").find(":selected");
                this.selectOne(citySelected[0]);
            },
            change: function() {
                var dk = this;
                if (parseInt(this.value)) {
                    var obj = this.data.elem;

                    var parent = $(obj).closest(".formitem");
                    var itemWrap = parent.find(".item-wrap");
                    var checkActive = parent.find(".js-check-active");
                    var text = $(this.selectedOptions[0]).text();
                    checkActive.find(".city").text(text);
                    itemWrap.hide();
                    checkActive.show();
                }
            }
        });

        //更新城市下拉菜单
        function updatacity(id, callback) {
            $.ajax({
                    url: API.getUrl("USER", "PROVINCE_CITY"),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        id: id
                    }
                })
                .done(function(data) {
                    var html = "<option selected>选择市</option>";
                    if (data.code === "0") {
                        var arr = data.data;
                        for (var i = 0; i < arr.length; i++) {
                            html += '<option value="' + arr[i].id + '">' + arr[i].name + '</option>';
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
    var ajaxing = false;
    $(".release").submit(function() {
        var that = $(this);
        var TypeValue = $("#category").val();
        var Role_Value = $("#role").val();
        var SexValue = $("#sex").val();
        var AgeValue = $("#age").val();
        var ProvinceValue = $("#select-province").val();
        var CityValue = $("#select-city").val();
        var FormhashValue = $("input[name='formhash']").val();
        console.log(!parseInt($("#select-province").val()));
        if (!$("#category").val().length || !$("#age").val().length || !$("#role").val().length || !$("#sex").val().length || !parseInt($("#select-province").val()) || !parseInt($("#select-city").val())) {
            $(".errmsg").html("亲，您还有未选择的项目哦~");
            return false;
        }
        if (ajaxing) {
            return false;
        }
        ajaxing = true;
        $.ajax({
                url: CREAT_URL,
                type: 'POST',
                dataType: 'json',
                data: {
                    type: TypeValue,
                    apply_role: Role_Value,
                    user_oriented_gender: SexValue,
                    user_oriented_age: AgeValue,
                    province: ProvinceValue,
                    city: CityValue,
                    formhash: FormhashValue

                }
            })
            .done(function(data) {
                if (data.code == "1000") {
                    location.href = data.data;
                } else if (data.code == "1001") {
                    ajaxForm.loginPopupBindFunction(function() {
                        ajaxForm.modal.fadeOut();
                        $("input[name='formhash']").val(data.data);
                        that.submit();
                    });
                } else {
                    alert("请将信息填写完整");
                }
            })
            .fail(function(err, err2) {
                alert("程序出错误了，请稍后重试！");
            })
            .always(function() {
                ajaxing = false;
            });
        return false;
    });
});
});