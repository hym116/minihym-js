var $ = require("jquery");
require("validform");
require("validform_datatype");
require("pkgs/uploadpreview");
var Boxy = require("popup");


$(function() {

    var $form = $("#editform");

    $form.Validform({
        tiptype: 3
    });

    $form.submit(function() {
        if ($form.find(".Validform_wrong").length === 0) {
            if (!$("#cover").val().length) {
                Boxy.alert("封面图片不可以为空！", function() {
                    $(window).scrollTop($(".cover").offset().top);
                });
                return false;

            } else if (!$("#bigbanner").val().length && !$("#bigbanner2").val().length && !$("#bigbanner3").val().length) {
                Boxy.alert("通栏图片不可以为空！", function() {
                    $(window).scrollTop($(".bigbanner").offset().top);
                });
                return false;
            }
        }
    });
    /*
     * 初始化 input[file]
     */
    // ;(function(){
    //     var cover = $("#cover");
    //     var cover_parent = cover.closest(".formitem");
    //     var bigbanner = $("#bigbanner");
    //     var bigbanner_parent = bigbanner.closest(".formitem");
    //     var cover_img = cover_parent.find(".imgpreview").css("background-image");
    //     var bigbanner_img = bigbanner_parent.find(".imgpreview").css("background-image");
    //     if ( cover_img != "none" ) {
    //         cover_parent.find(".imgpreview").show();
    //         $form.find(".cover_preview").css("background-image",cover_img).css("background-size",'cover');
    //     }
    //     if ( bigbanner_img != "none" ) {
    //         var bigbanner_width = 668;
    //         bigbanner_parent.find(".imgpreview").show();
    //         $form.find(".bigbanner_preview").css("background-image",bigbanner_img).css("background-size",'cover');
    //     }
    // })();
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
    /*
     * input[file]选择预览 bigbanner1
     */
    $("#bigbanner").uploadPreview({
        maxSize: 4096,
        imgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        callback: function(img) {
            var form = $("#editform");
            var bigbanner = form.find(".bigbanner");
            bigbanner.find(".imgselect .imgpreview").css("background-image", 'url(' + img + ')').show();
            bigbanner.find(".addimg1 .imgpreview").css("background-image", 'url(' + img + ')').show();
            bigbanner.find(".addimg1").addClass("hasimg");
            form.find(".bigbanner_add").css("background-image", 'url(' + img + ')');
            bigbanner.find(".imgselect").attr("data-target", "bigbanner");
        }
    });
    /*
     * input[file]选择预览 bigbanner2
     */
    $("#bigbanner2").uploadPreview({
        maxSize: 4096,
        imgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        callback: function(img) {
            var form = $("#editform");
            var bigbanner = form.find(".bigbanner");
            bigbanner.find(".imgselect .imgpreview").css("background-image", 'url(' + img + ')').show();
            bigbanner.find(".addimg2 .imgpreview").css("background-image", 'url(' + img + ')').show();
            form.find(".bigbanner_add").css("background-image", 'url(' + img + ')');
            bigbanner.find(".addimg2").addClass("hasimg");
            bigbanner.find(".imgselect").attr("data-target", "bigbanner2");
        }
    });
    /*
     * input[file]选择预览 bigbanner3
     */
    $("#bigbanner3").uploadPreview({
        maxSize: 4096,
        imgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        callback: function(img) {
            var form = $("#editform");
            var bigbanner = form.find(".bigbanner");
            bigbanner.find(".imgselect .imgpreview").css("background-image", 'url(' + img + ')').show();
            bigbanner.find(".addimg3 .imgpreview").css("background-image", 'url(' + img + ')').show();
            form.find(".bigbanner_add").css("background-image", 'url(' + img + ')');
            bigbanner.find(".addimg3").addClass("hasimg");
            bigbanner.find(".imgselect").attr("data-target", "bigbanner3");
        }
    });

    /*
     * 保存 提交 预览 3个按钮
     */
    // var SAVEURL = "1";
    // var SUBMITURL = "2";
    // var PREVIEWURL = "3";
    $form.find(".savebtn").mouseover(function() {
        $("#editform").attr("action", SAVEURL);
        $("#editform").removeAttr("target");
    });
    $form.find(".submitbtn").mouseover(function() {
        $("#editform").attr("action", SUBMITURL);
        $("#editform").removeAttr("target");
    });
    $form.find(".previewbtn").mouseover(function() {
        $("#editform").attr("action", PREVIEWURL);
        $("#editform").attr("target", "_blank");
    });
    $form = null;
});