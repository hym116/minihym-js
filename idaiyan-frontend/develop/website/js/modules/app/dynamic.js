var $ = require("jquery");
require("validform");
require("validform_datatype");
require("pkgs/uploadpreview");
require("icheck");
var Boxy = require("popup");
var API = require("apis/api-aio");
// 文字限制
function textNum(options) {
    var maxNum = options.maxNum || 140;
    if (typeof options.textarea === "object") {
        options.textarea.keyup(function() {
            main.apply(this);
        });
    } else {
        $(document).on("keyup", options.textarea, function() {
            main.apply(this);
        });
    }
    function main(){
        var text = $(this).val();
        var textNum = text.length;
        if (maxNum - textNum >= 0) {
            if(typeof options.num !== "undefined"){
                options.num.text(maxNum - textNum);
            }
        } else {
            $(this).val(text.substr(0, maxNum));
        }
    }
}

$(document).ready(function() {
    $('#personbox input').iCheck({
        checkboxClass: 'icheckbox_polaris',
        radioClass: 'iradio_polaris',
        increaseArea: '-10%'
    });
    $('.checkbox input[type="checkbox"]').on("ifChanged", function() {
        var that = $(this);
        var parent = that.closest('li');
        if (that.prop("checked")) {
            parent.addClass('checked');
        } else {
            parent.removeClass('checked');
        }
    });
});

$(function() {
    var $form = $("#editform");
    // 表单验证
    $form.Validform({
        tiptype: 3
    });

    (function() {
        var input = $(".name").find("#name");

        textNum({
            textarea: input,
            maxNum: 14
        });

    })();
     (function() {
        var input = $(".subname").find("#nikename");
        
        textNum({
            textarea: input,
            maxNum: 14
        });

    })();

    $form.submit(function() {
        if ($form.find(".Validform_wrong").length === 0) {
            if (!$("#cover").val().length) {
                Boxy.alert("封面图片不可以为空！", function() {
                    $(window).scrollTop($(".cover").offset().top);
                });
                return false;
            }
        }
    });
    /*
     * 初始化 input[file]
     */
    ;
    (function() {
        $(".imgpreview").each(function() {
            var that = $(this);
            if (that.css("background-image") !== "none") {
                that.show();
            }
        });

        var cover_img = $(".cover .imgpreview").css("background-image");
        if (cover_img !== "none") {
            $form.find(".cover_preview").css("background-image", cover_img).css("background-size", 'cover');
        }

        $(".bigbanner .imgpreview").each(function() {
            var bigbanner_img = $(this).css("background-image");
            if (bigbanner_img !== "none") {
                $(".bigbanner .imgselect .imgpreview").show().css("background-image", bigbanner_img).css("background-size", 'cover');
                $form.find(".bigbanner_preview").css("background-image", bigbanner_img).css("background-size", 'cover');
                return false;
            }
        });

    })();
    /*
     * 移动input[file] cover
     */
    $form.find(".cover .imgselect").mouseenter(function() {
        var that = $(this);
        var coverInput = $("#cover").parent();
        if (that.find(".filewrap").length) {
            return false;
        }
        coverInput.appendTo(that);
    });
    $form.find(".cover_add").mouseenter(function() {
        var that = $(this);
        var coverInput = $("#cover").parent();
        if (that.find(".filewrap").length) {
            return false;
        }
        coverInput.appendTo(that);
    });

    /*
     * 移动input[file] bigbanner
     */
    $form.find(".bigbanner .imgselect").mouseenter(function() {
        var that = $(this);
        var bigbannerInput = $("#" + that.attr("data-target")).parent();
        if (that.find(".filewrap").length) {
            return false;
        }
        bigbannerInput.appendTo(that);
    });
    $form.find(".addimg").mouseenter(function() {
        var that = $(this);
        var bigbannerInput = $("#" + that.attr("data-target")).parent();

        if (that.hasClass("hasimg")) {
            that = that.find(".add_wrap .edit");
        }

        if (that.children(".filewrap").length) {
            return false;
        }
        // console.log(that);
        // console.log(bigbannerInput)
        bigbannerInput.appendTo(that);
    });
    $form.find(".bigbanner_add").mouseenter(function() {
        var that = $(this);
        var bigbannerInput = $("#bigbanner").parent();
        if (that.find(".filewrap").length) {
            return false;
        }
        bigbannerInput.appendTo(that);
    });

    /*
     * 编辑层的交互
     */
    $form.find(".add_wrap").click(function(e) {
        var parent = $(this).closest(".addimg");
        if (!parent.hasClass("hasimg")) {
            return false;
        }
        var backgroundImage = parent.find(".imgpreview").css("background-image");
        var form = $("#editform");
        var bigbanner = form.find(".bigbanner");
        var imgselect = bigbanner.find(".imgselect");

        var targetElement = $(e.target);
        var target = parent.attr("data-target");

        if (targetElement.hasClass("del")) {
            $("#" + parent.attr("data-target")).val("");
            parent.find(".imgpreview").css("background-image", "none");
            parent.removeClass("hasimg");
            parent.trigger("mouseenter");

            if (form.find(".addimg.hasimg").length > 0) {
                var _bigbanner = form.find(".addimg.hasimg").eq(0).find(".imgpreview").css("background-image");
                form.find(".bigbanner_add").css("background-image", _bigbanner);
            } else {
                form.find(".bigbanner_add").css("background-image", "none");
            }

            if (imgselect.attr("data-target") == target) {
                imgselect.find(".imgpreview").css("background-image", "none").hide();
            }
            return false;
        }
        imgselect.attr("data-target", target);
        imgselect.find(".imgpreview").css("background-image", backgroundImage).show();
        form.find(".bigbanner_add").css("background-image", backgroundImage);
    });

    /*
     * input[file]选择预览 cover
     */
    $("#cover").uploadPreview({
        maxSize: 4096,
        imgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        callback: function(img) {
            var $form = $("#editform");
            $form.find(".cover .imgpreview").css("background-image", 'url(' + img + ')').show();
            $form.find(".cover_add").css("background-image", 'url(' + img + ')');
        }
    });
});

