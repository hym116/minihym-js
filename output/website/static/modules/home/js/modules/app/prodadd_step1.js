define('js/modules/app/prodadd_step1', ['require', 'exports', 'module', "jquery", "js/modules/apis/api-aio"],function(require, exports, module) {
var $ = require("jquery");
var API = require("js/modules/apis/api-aio");

$(function() {
    // 性别选择
    $(".peo").click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        var s_val = $(this).attr("data-sid");
        $("#sex").val(s_val);
    });

    // 分类选择
    $(".single").find('.cell').click(function() {
        var that = $(this);
        var parent = that.closest(".cell_wrap");
        that.addClass('click').siblings().removeClass('click');
        if (parent.find(".back").html() == "其他") {
            parent.find(".back").removeClass('click');
        }
        if (that.closest('.t').length) {
            var t_val = that.attr("data-tid");
            $("#category").val(t_val);
        } else {
            var r_val = that.attr("data-rid");
            $("#role").val(r_val);
        }
    });

    // 服务人群
    $(".multiple").find('.cell').click(function() {
        $(this).toggleClass('click');
        var arr = [];
        $(".multiple").find('.click').each(function() {
            arr.push($(this).attr("data-cid"));
        });
        $("#age").val(arr);
    });

    // 地区选择
    $(document).on("click", function(e) {
        $('.hide_c4').hide();
        var that = $(e.target);
        var downmenu = that.closest('.back').siblings('.hide_c4');
        if (that.closest('.back').length && downmenu) {
            if (that.closest('.townselect').length && !($("#province").val().length)) {
                return false;
            }
            downmenu.show();
            downmenu.find("li").one("click", function() {
                $(this).addClass("selected").siblings().removeClass('selected');
                that.html($(this).html());
                if ($(this).closest('.type_ul').length) {
                    $(".back").eq(0).addClass('click');
                    var t_val = $(this).attr("data-tid");
                    $("#category").val(t_val);
                } else if ($(this).closest('.role_ul').length) {
                    $(".back").eq(1).addClass('click');
                    var r_val = $(this).attr("data-rid");
                    $("#role").val(r_val);
                } else if ($(this).closest('.pro_ul').length) {
                    var p_val = $(this).attr("data-pid");
                    var o_prov = $("#province").val();
                    if (o_prov !== p_val) {
                        $("#province").val(p_val);
                        updatacity(p_val, function() {
                            var first = $(".townselect li").eq(0).addClass('selected');
                            $(".townselect .back").text(first.text());
                            $("#town").val(first.data("tnid"));
                        });
                    }
                } else if ($(this).closest('.tow_ul').length) {
                    var tn_val = $(this).attr("data-tnid");
                    $("#town").val(tn_val);
                }
            });
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
                var html = "";
                if (data.code === "0") {
                    var arr = data.data;
                    for (var i = 0; i < arr.length; i++) {
                        html += '<li data-tnid="' + arr[i].id + '">' + arr[i].name + '</li>';
                    }
                }
                $(".tow_ul").html(html);
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

    // 提交表单
    $("form.release").submit(function() {
        if (!$("#category").val().length || !$("#age").val().length || !$("#role").val().length || !$("#sex").val().length || !$("#province").val().length || !$("#town").val().length) {
            $(".errmsg").html("亲，您还有未选择的项目哦~");
            return false;
        }
    });
});
});