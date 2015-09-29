var $ = require("jquery");
require("pkgs/imgcut");
require("pkgs/uploadpreview");
$(function(){
    

    var ic = null;

    var imgcut = {
        bb : function (img){
            ic = new $.ImgCut("bgDiv", "dragDiv", img, {
                dragTop: 15, dragLeft: 15,dragWidth:148,dragHeight:148,Scale:true,
                Right: "rRight", Left: "rLeft", Up: "rUp", Down: "rDown",
                RightDown: "rRightDown", LeftDown: "rLeftDown", RightUp: "rRightUp", LeftUp: "rLeftUp",MinWidth:"20",MinHeight:"20",
                View:[{viewId:"viewDiv", viewWidth: 130, viewHeight: 130},
                      {viewId:"viewDiv1", viewWidth: 70, viewHeight: 70}]
            });
            $('#bgDiv').show();
            $('#dragDiv').show();
            $('#bgDiv img').on('load',function(){
                imgcut.setmiddle();
            });
        },
        setmiddle : function (){
            $('#bgDiv').each(function(){
                var width = $(this).width();
                var height = $(this).height();
                var parent = $(this).parent();
                var parent_width = parent.width();
                var parent_height = parent.height();

                $(this).css({
                    left:parent_width/2-width/2,
                    top:parent_height/2-height/2,
                });
            });
        }
    };
    $(function() {
        var sohtml = $(".avatar_editor_show").html();
        var cohtml = $(".avatar_editor_cutpreview").html();
        //imgcut.bb("/SprintX/common/images/wallpager/wp001.jpg");
        $(document).find("#avatar_editor_control").on("mousedown","img",function(e){
            e.preventDefault();
        });
        var oImagewh = {};
        var aImagewh = {};
        $("#choose").uploadPreview({
            maxSize:5000,
            imgType:["gif", "jpeg", "jpg", "png"],
            callback:function(imgurl){
                if (imgurl) {
                    imgcut.bb(imgurl);
                    getActualSize(imgurl);
                }
            }
        });
        function getActualSize(imgurl){
            var _img = new Image();//弄一个替身
            _img.style.position = 'absolute';
            _img.style.visibility = 'hidden';
            _img.style.zIndex = '-1';
            _img.style.maxWidth = 'none';
            _img.style.top =  _img.style.left = '0px';
            document.body.appendChild(_img);
            _img.onload = function(){
                oImagewh = {width:_img.width, height:_img.height};
                _img.parentNode.removeChild(_img);
            };
            _img.src = imgurl;
        }

        $(".reupload").click(function(){
            ic = null;
            $(".avatar_editor_show").html(sohtml);
            $(".avatar_editor_cutpreview").html(cohtml);
            return false;
        });
        $('.savebtn').mouseover(function(){
            if (ic) {
                var oImagew = oImagewh.width;
                var aImagew = $("#bgDiv").width();
                var zoom = aImagew/oImagew;
                var icPos = ic.getPos();
                var data = {
                    x : Math.round(icPos.x/zoom)+"", //x轴偏移量
                    y : Math.round(icPos.y/zoom)+"", //y轴偏移量
                    w : Math.round(icPos.width/zoom)+"", //w缩放宽度
                    h : Math.round(icPos.height/zoom)+"" //h缩放高度
                };
                $("#cutPos").val(JSON.stringify(data));
            }
        });
        $('.savebtn').click(function(){
            if (!ic) {
                return false;
            }
        });
        $(".avatar_editor_show").click(function(){
            if( $(this).find("img").length === 0 ){
                $("#choose").trigger("click");
            }
        });
    });


    function _showwrong(text){
        $(".avatar_edit_wrong").text(text);
        setTimeout(function(){
            $(".avatar_edit_wrong").text("");
        }, 5000);
    }
    window.showwrong = _showwrong;
});