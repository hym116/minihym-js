var $ = require("jquery");
require("validform");
require("validform_datatype");
require("pkgs/uploadpreview");
require("libs/ui/dropkick/dropkick");
require("libs/ui/icheck/icheck");
require("pin");
// require("pkgs/jUploader");
var Boxy = require("popup");
var API = require("apis/api-aio");

$(document).ready(function(){
    $('.main_wrap input').iCheck({
        checkboxClass: 'icheckbox_polaris',
        radioClass: 'iradio_polaris',
        increaseArea: '-10%'
    });
    $('.main_wrap input[type="radio"]').on("ifChanged",function() {
        var that = $(this);
        var parent = that.closest('li');
        if(that.prop("checked")){
            parent.addClass('checked').siblings().removeClass('checked');
        }
    });
    $('.main_wrap input[type="checkbox"]').on("ifChanged",function() {
        var that = $(this);
        var parent = that.closest('li');
        if(that.prop("checked")){
            parent.addClass('checked');
        }else{
            parent.removeClass('checked');
        }
    });
});


// $.jUploader.setDefaults({
//     cancelable: false,
//     allowedExtensions: ['jpg', 'jpeg', 'png'],
//     messages: {
//         upload: '上传',
//         cancel: '取消',
//         emptyFile: "{file} 为空，请选择一个文件.",
//         invalidExtension: "{file} 后缀名不合法. 只有 {extensions} 是允许的.",
//         onLeave: "文件正在上传，如果你现在离开，上传将会被取消。"
//     },
//     showMessage: function(message) {
//         Boxy.alert(message);
//     }
// });


$(function() {
    


    // 右侧悬浮
    $(".pinned").pin({
        padding:{
            top:45
        }
    });

    var $form = $("#editform");

    // 表单验证
    $form.Validform({
        tiptype:3
    });

    $form.submit(function() {
        if ($form.find(".Validform_wrong").length === 0) {
            if(!$("#cover").val().length){
                Boxy.alert("封面图片不可以为空！",function(){
                    $(window).scrollTop($(".cover").offset().top);
                });
                return false;

            } else if (!$("#bigbanner").val().length && !$("#bigbanner2").val().length && !$("#bigbanner3").val().length) {
                Boxy.alert("通栏图片不可以为空！",function(){
                    $(window).scrollTop($(".bigbanner").offset().top);
                });
                return false;
            }
        }
    });
    /*
     * 初始化 input[file]
     */
    ;(function(){
        $(".imgpreview").each(function(){
            var that = $(this);
            if (that.css("background-image") !== "none") {
                that.show();
            }
        });

        var cover_img = $(".cover .imgpreview").css("background-image");
        if (cover_img !== "none") {
            $form.find(".cover_preview").css("background-image",cover_img).css("background-size",'cover');
        }

        $(".bigbanner .imgpreview").each(function(){
            var bigbanner_img = $(this).css("background-image");
            if (bigbanner_img !== "none") {
                $(".bigbanner .imgselect .imgpreview").show().css("background-image",bigbanner_img).css("background-size",'cover');
                $form.find(".bigbanner_preview").css("background-image",bigbanner_img).css("background-size",'cover');
                return false;
            }
        });

        // var cover = $("#cover");
        // var cover_parent = cover.closest(".formitem");
        // var cover_img = cover_parent.find(".imgpreview").css("background-image");
        // if (cover_img != "none") {
        //     cover_parent.find(".imgpreview").show();
        //     $form.find(".cover_preview").css("background-image",cover_img).css("background-size",'cover');
        // }

        // var bigbanner = $("#bigbanner");
        // var bigbanner_parent = bigbanner.closest(".formitem");
        // bigbanner_parent.find(".imgpreview").each(function(){
        //     var bigbanner_img = $(this).css("background-image");
        //     if (bigbanner_img != "none") {
        //         var bigbanner_width = 668;
        //         bigbanner_img.show();
        //         $form.find(".bigbanner_preview").css("background-image",bigbanner_img).css("background-size",'cover');
        //     }
        // });
    })();
    /*
     * 移动input[file] cover
     */
    $form.find(".cover .imgselect").mouseenter(function(){
        var that = $(this);
        var coverInput = $("#cover").parent();
        if(that.find(".filewrap").length){
            return false;
        }
        coverInput.appendTo(that);
    });
    $form.find(".cover_add").mouseenter(function(){
        var that = $(this);
        var coverInput = $("#cover").parent();
        if(that.find(".filewrap").length){
            return false;
        }
        coverInput.appendTo(that);
    });

    /*
     * 移动input[file] bigbanner
     */
    $form.find(".bigbanner .imgselect").mouseenter(function(){
        var that = $(this);
        var bigbannerInput = $("#"+that.attr("data-target")).parent();
        if(that.find(".filewrap").length){
            return false;
        }
        bigbannerInput.appendTo(that);
    });
    $form.find(".addimg").mouseenter(function(){
        var that = $(this);
        var bigbannerInput = $("#"+that.attr("data-target")).parent();

        if (that.hasClass("hasimg")) {
            that = that.find(".add_wrap .edit");
        }

        if(that.children(".filewrap").length){
            return false;
        }
        // console.log(that);
        // console.log(bigbannerInput)
        bigbannerInput.appendTo(that);
    });
    $form.find(".bigbanner_add").mouseenter(function(){
        var that = $(this);
        var bigbannerInput = $("#bigbanner").parent();
        if(that.find(".filewrap").length){
            return false;
        }
        bigbannerInput.appendTo(that);
    });

    /*
     * 编辑层的交互
     */
    $form.find(".add_wrap").click(function(e){
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

        if(targetElement.hasClass("del")){
            $("#" + parent.attr("data-target")).val("");
            parent.find(".imgpreview").css("background-image","none");
            parent.removeClass("hasimg");
            parent.trigger("mouseenter");

            if( form.find(".addimg.hasimg").length > 0 ){
                var _bigbanner = form.find(".addimg.hasimg").eq(0).find(".imgpreview").css("background-image");
                form.find(".bigbanner_add").css("background-image",_bigbanner);
            }else{
                form.find(".bigbanner_add").css("background-image","none");
            }

            if (imgselect.attr("data-target") == target) {
                imgselect.find(".imgpreview").css("background-image","none").hide();
            }
            return false;
        }
        imgselect.attr("data-target",target);
        imgselect.find(".imgpreview").css("background-image",backgroundImage).show();
        form.find(".bigbanner_add").css("background-image",backgroundImage);
    });

    /*
     * input[file]选择预览 cover
     */
    $("#cover").uploadPreview({
        maxSize:4096,
        imgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        callback: function(img) {
            var $form = $("#editform");
            $form.find(".cover .imgpreview").css("background-image",'url('+img+')').show();
            $form.find(".cover_add").css("background-image",'url('+img+')');
        }
    });
    /*
     * input[file]选择预览 bigbanner1
     */
    $("#bigbanner").uploadPreview({
        maxSize:4096,
        imgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        callback: function(img) {
            var form = $("#editform");
            var bigbanner = form.find(".bigbanner");
            bigbanner.find(".imgselect .imgpreview").css("background-image",'url('+img+')').show();
            bigbanner.find(".addimg1 .imgpreview").css("background-image",'url('+img+')').show();
            bigbanner.find(".addimg1").addClass("hasimg");
            form.find(".bigbanner_add").css("background-image",'url('+img+')');
            bigbanner.find(".imgselect").attr("data-target","bigbanner");
        }
    });
    /*
     * input[file]选择预览 bigbanner2
     */
    $("#bigbanner2").uploadPreview({
        maxSize:4096,
        imgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        callback: function(img) {
            var form = $("#editform");
            var bigbanner = form.find(".bigbanner");
            bigbanner.find(".imgselect .imgpreview").css("background-image",'url('+img+')').show();
            bigbanner.find(".addimg2 .imgpreview").css("background-image",'url('+img+')').show();
            form.find(".bigbanner_add").css("background-image",'url('+img+')');
            bigbanner.find(".addimg2").addClass("hasimg");
            bigbanner.find(".imgselect").attr("data-target","bigbanner2");
        }
    });
    /*
     * input[file]选择预览 bigbanner3
     */
    $("#bigbanner3").uploadPreview({
        maxSize:4096,
        imgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        callback: function(img) {
            var form = $("#editform");
            var bigbanner = form.find(".bigbanner");
            bigbanner.find(".imgselect .imgpreview").css("background-image",'url('+img+')').show();
            bigbanner.find(".addimg3 .imgpreview").css("background-image",'url('+img+')').show();
            form.find(".bigbanner_add").css("background-image",'url('+img+')');
            bigbanner.find(".addimg3").addClass("hasimg");
            bigbanner.find(".imgselect").attr("data-target","bigbanner3");
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

    // $(document).on("click", function(e) {
    //     $('.hide_c4').hide();
    //     var that = $(e.target);
    //     var downmenu = that.closest('.back').siblings('.hide_c4');
    //     if (that.closest('.back').length && downmenu) {
    //         if (that.closest('.townselect').length && !($("#province").val().length)) {
    //             return false;
    //         }
    //         downmenu.show();
    //         downmenu.find("li").one("click", function() {
    //             $(this).addClass("selected").siblings().removeClass('selected');
    //             that.html($(this).html());
    //             if ($(this).closest('.type_ul').length) {
    //                 $(".back").eq(0).addClass('click');
    //                 var t_val = $(this).attr("data-tid");
    //                 $("#category").val(t_val);
    //             } else if ($(this).closest('.role_ul').length) {
    //                 $(".back").eq(1).addClass('click');
    //                 var r_val = $(this).attr("data-rid");
    //                 $("#role").val(r_val);
    //             } else if ($(this).closest('.pro_ul').length) {
    //                 var p_val = $(this).attr("data-pid");
    //                 var o_prov = $("#province").val();
    //                 if (o_prov !== p_val) {
    //                     $("#province").val(p_val);
    //                     updatacity(p_val, function() {
    //                         var first = $(".townselect li").eq(0).addClass('selected');
    //                         $(".townselect .back").text(first.text());
    //                         $("#town").val(first.data("tnid"));
    //                     });
    //                 }
    //             } else if ($(this).closest('.tow_ul').length) {
    //                 var tn_val = $(this).attr("data-tnid");
    //                 $("#town").val(tn_val);
    //             }
    //         });
    //     }
    // });


    
    (function(){
        // 如果后端输出的是两个type 为hidden的input
       
        var dkCity;
        $("#select-province").dropkick({
            change: function(){
               // var dk = this;
                updatacity(this.value,function(){
                    dkCity.refresh();
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
});
