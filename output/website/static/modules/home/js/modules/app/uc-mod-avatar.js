define('js/modules/app/uc-mod-avatar', ['require', 'exports', 'module', "jquery", "js/modules/pkgs/imgcut", "js/modules/pkgs/uploadpreview", "js/modules/pkgs/jUploader", "js/modules/libs/ui/popup/popup"],function(require, exports, module) {
var $ = require("jquery");
require("js/modules/pkgs/imgcut");
require("js/modules/pkgs/uploadpreview");
require("js/modules/pkgs/jUploader");
var btnClick = false; //初始化锁
var Boxy = require("js/modules/libs/ui/popup/popup");
$(document).on("click", ".avator-mod", function() {
    if (btnClick) {
        return;
    }
    btnClick = true;

    var oavatar = $("#oavatar").val();
    var ocutpos = $("#ocutpos").val() ? JSON.parse($("#ocutpos").val()) : false; // 向下兼容需要引入JSON2.JS

    var ic = null;

    // 图片切割
    var imgcut = {
        bb: function(img, dragTop, dragLeft, dragWidth, dragHeight) {
            dragTop = dragTop || 15;
            dragLeft = dragLeft || 15;
            dragWidth = dragWidth || 148;
            dragHeight = dragHeight || 148;
            ic = new $.ImgCut("bgDiv", "dragDiv", img, {
                dragTop: dragTop,
                dragLeft: dragLeft,
                dragWidth: dragWidth,
                dragHeight: dragWidth,
                Scale: true,
                Right: "rRight",
                Left: "rLeft",
                Up: "rUp",
                Down: "rDown",
                RightDown: "rRightDown",
                LeftDown: "rLeftDown",
                RightUp: "rRightUp",
                LeftUp: "rLeftUp",
                MinWidth: "20",
                MinHeight: "20",
                View: [{
                    viewId: "viewDiv",
                    viewWidth: 130,
                    viewHeight: 130
                }, {
                    viewId: "viewDiv1",
                    viewWidth: 70,
                    viewHeight: 70
                }]
            });
            $('#bgDiv').show();
            $('#dragDiv').show();
            $('#bgDiv img').on('load', function() {
                imgcut.setmiddle();
            });
        },
        setmiddle: function() {
            $('#bgDiv').each(function() {
                var width = $(this).width();
                var height = $(this).height();
                var parent = $(this).parent();
                var parent_width = parent.width();
                var parent_height = parent.height();

                $(this).css({
                    left: parent_width / 2 - width / 2,
                    top: parent_height / 2 - height / 2,
                });
            });
        }
    };
    // var sohtml = $(".avatar_editor_show").html();
    // var cohtml = $(".avatar_editor_cutpreview").html();
    //imgcut.bb("/SprintX/common/images/wallpager/wp001.jpg");
    // 阻止图片拖动的默认事件
    $("#avatar_editor_control").on("mousedown", "img", function(e) {
        e.preventDefault();
    });

    // 如果原来传过头像，显示出来
    var oImagewh = {};
    var aImagewh = {};
    var wrapWH = {
        w: 400,
        h: 320
    };
    if (oavatar && ocutpos) {
        getActualSize(oavatar, function(data) {
            var _zoom;
            oImagewh = data;
            if (oImagewh.width / oImagewh.height > wrapWH.w / wrapWH.h) {
                // 图片宽度拉伸成400
                _zoom = wrapWH.w / oImagewh.width;
            } else {
                // 图片高度拉伸成320
                _zoom = wrapWH.h / oImagewh.height;
            }
            imgcut.bb(oavatar, ocutpos.y * _zoom, ocutpos.x * _zoom, ocutpos.w * _zoom, ocutpos.h * _zoom);
        });
    }

    // 上传前的预览
    $("#choose").uploadPreview({
        maxSize: 5000,
        imgType: ["gif", "jpeg", "jpg", "png"],
        callback: function(imgurl) {
            if (imgurl) {
                imgcut.bb(imgurl);
                getActualSize(imgurl, function(data) {
                    oImagewh = data;
                });
            }
        }
    });

    // 获取图片实际尺寸
    function getActualSize(imgurl, callback) {
        var _img = new Image(); //弄一个替身
        _img.style.position = 'absolute';
        _img.style.visibility = 'hidden';
        _img.style.zIndex = '-1';
        _img.style.maxWidth = 'none';
        _img.style.top = _img.style.left = '0px';
        document.body.appendChild(_img);
        _img.onload = function() {
            callback({
                width: _img.width,
                height: _img.height
            });
            _img.parentNode.removeChild(_img);
        };
        _img.src = imgurl;
    }

    // $(".reupload").click(function(){
    //     ic = null;
    //     $(".avatar_editor_show").html(sohtml);
    //     $(".avatar_editor_cutpreview").html(cohtml);
    //     return false;
    // });
    // 保存按钮滑过时更新切割参数
    $('.savebtn').mouseover(function() {

        if (ic) {
            var oImagew = oImagewh.width;
            var aImagew = $("#bgDiv").width();
            var zoom = aImagew / oImagew;
            var icPos = ic.getPos();
            // console.log(aImagew);
            // console.log(oImagew);
            // console.log(zoom);
            // console.log(icPos.x);
            // console.log(icPos.y);
            var data = {
                x: Math.round(icPos.x / zoom) + "", //x轴偏移量
                y: Math.round(icPos.y / zoom) + "", //y轴偏移量
                w: Math.round(icPos.width / zoom) + "", //w缩放宽度
                h: Math.round(icPos.height / zoom) + "" //h缩放高度
            };
            $("#cutPos").val(JSON.stringify(data));
        }
    });
    // $('.savebtn').click(function(){
    //     if (!ic) {
    //         return false;
    //     }
    // });
    // 生成iframe，生成from，并提交
    var uploading = false;
    $("#edit_img").submit(function() {
        var that = $(this);
        if (!ic) {
            return false;
        }
        if (uploading) {
            return false;
        }
        if ($("#avatariframe").length && !uploading) {
            uploading = true;
        }
        //
        if (!$("#avatariframe").length && !uploading) {

            var uploadIframe = $('<iframe id="avatariframe" name="avatariframe" src="javascript:;"></iframe>');
            uploadIframe.on('load', function() {
                var iframe = uploadIframe[0];
                if (!iframe.parentNode) {
                    return;
                }

                if ((iframe.contentDocument &&
                        iframe.contentDocument.body &&
                        iframe.contentDocument.body.innerHTML == "false") ||
                    (iframe.contentWindow.document &&
                        iframe.contentWindow.document.body &&
                        iframe.contentWindow.document.body.innerHTML == "false")) {
                    return;
                }
                // iframe.contentWindow.document - for IE<7
                var doc = iframe.contentDocument ? iframe.contentDocument : iframe.contentWindow.document;
                var response;
                // fix for chrome

                if (doc.body.innerHTML === '') {
                    return;
                }

                uploading = false;

                try {
                    var json = doc.body.innerHTML.replace(/<pre>(.*)<\/pre>/g, '$1');
                    response = JSON.parse(json);
                } catch (e) {
                    response = {};
                    //throw e;
                }

                uploadCallback(response);

                setTimeout(function() {
                    uploadIframe.remove();
                }, 10);
                that.removeAttr("target");
            });
            that.attr("target", "avatariframe");
            $("body").append(uploadIframe);
        }
        if (!uploading) {
            that.submit();
            return false;
        }
    });
    // 上传回调
    function uploadCallback(response) {
        if (response.code == "0") {
            Boxy.alert("保存成功！", function() {
                window.location.reload();
            });

        } else if (response.code == 1001) {
            Boxy.alert("保存错误");
        } else if (response.code == 1004) {
            Boxy.alert("没有上传图片");
        }
        // console.log(response);
    }

    // 扩大选择区域
    $(".avatar_editor_show").click(function() {
        if ($(this).find("img").length === 0) {
            $("#choose").trigger("click");
        }
    });
    // function _showwrong(text){
    //     $(".avatar_edit_wrong").text(text);
    //     setTimeout(function(){
    //         $(".avatar_edit_wrong").text("");
    //     }, 5000);
    // }
    // window.showwrong = _showwrong;
});
});