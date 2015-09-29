$(function(){
    // 下拉菜单
      $(".reset_select").on("click",function(){
        var that = $(this);
        var parent = that.closest(".select-wrap");
        parent.addClass('active');
     });
    $(".reset_select").on("change",function(){
        var that = $(this);
        var parent = that.closest(".select-wrap");
        var select_container = parent.find(".selected-item");
        parent.removeClass('active');
        select_container .text(that.find("option:selected").text());
    });

     // 单选框样式美化
    $('.sex input').iCheck({
        checkboxClass: 'icheckbox_polaris',
        radioClass: 'iradio_polaris',
        increaseArea: '-10%'
    });
    // 表单验证
    $("#personal-info").Validform({
        tiptype:3
    });
    // tab选项卡
    // $(".left-menu li").click(function(){
    //     var that = $(this);
    //     var index = that.index();
    //     that .addClass('active').siblings().removeClass('active');
    //    $(".right-content").eq(index).show().siblings().hide();

    // });
    //年月日联动
    var selYear=$('#year');
    var selMonth=$('#month');
    var selday=$('#day');
    var dayVal=$("#daynum");

    creatDate();

    function creatDate(){
        var myDate = new Date();
        //console.log(myDate.getFullYear());
        addOpt(selYear,[myDate.getFullYear(),myDate.getFullYear()-65]);
        addOpt(selMonth,[1,12]);

        selYear.change(function(e) {
            creatDay(selYear.val(),selMonth.val());
        });

        selMonth.change(function(e) {
            creatDay(selYear.val(),selMonth.val());
        });
    }
    /**
     *  月份改变
     */
    function creatDay(year,month){//m为改变的月份值
        selday.empty();
        //var defaultopt = '';
        //defaultopt += '<option style="display:none;">'+dayVal+'</option>';
        //selday.append(defaultopt);
        dayVal.text(1);
        var day;
        console.log('year:'+year);
        console.log('month:'+month);
        if(year!='年' && month!='月'){
            year=parseInt(year);
            month=parseInt(month);
            if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12 ) day = 31;
            else if(month==4 || month==6 || month==9 || month==11) day = 30
            else{
                if ((year%4==0 && year%100!=0) || (year%400==0)) day = 29; //闰年公式，判断是否为闰年
                else day=28;
            }
            console.log('day:'+day);
            addOpt(selday,[1,day])
        }
    }
    function addOpt(box,range){
        var html = '';
        if(range[1]>=range[0]){
            for(var i=range[0]; i<=range[1]; i++){
                html += '<option value="'+i+'">'+i+'</option>';
            }
        }
        else{
            for(var i=range[0]; i>=range[1]; i--){
                html += '<option value="'+i+'">'+i+'</option>';
            }
        }
        box.append(html);
           var selected_val = box.closest(".select-wrap").find(".selected-item").text();
            var alloption = box.find("option");
            for (var i=0;i < alloption.length;i++){
                if(alloption.eq(i).text()==selected_val){
                    alloption.eq(i).attr("selected","selected");
                }
            }
    }
    //省市联动
    $("#province").on("change",function(){
        var that = $(this);
        var city_box = $("#city");
        var data_val = that.val();
        var URL = city_box.data("api");
        var html='';
        $.ajax({
            url: URL,
            type: 'GET',
            dataType: 'json',
            data:{ id:data_val}
        })
            .done(function(data) {
                if(data.code == 0){
                    var city_opt;
                    city_box.empty();
                    for(var i = 0;i<data.data.length;i++){
                         //city_opt=$('<option></option>').attr({value:data.data[i].id}).text(data.data[i].name).appendTo(city_box);
                        html += '<option value="'+data.data[i].id+'">'+data.data[i].name+'</option>';
                    }
                    city_box.append(html);
                    city_box.closest(".select-wrap").find(".selected-item").text(data.data[0].name);

                }else {
                    alert(data.data.msg);
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

    });
    // 修改头像
    function ModAvatarShow(){
       $(".mask_avatar").show();
        $(".img_wrap").show();

    }
    function ModAvatarHide(){
       $(".mask_avatar").hide();
        $(".img_wrap").hide();

    }
    $(".mod-btn").click(function(){
        ModAvatarShow();
    });
    $(".closebtn span").click(function(){
        ModAvatarHide();
    });
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
                    viewWidth: 100,
                    viewHeight: 100
                }, {
                    viewId: "viewDiv1",
                    viewWidth: 74,
                    viewHeight: 74
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
                    left: 0,
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
        w: 200,
        h: 200
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
            var bg_image = 'images/advator_bg.png';
            $(".avatar_editor_show").css("background",'url(' + bg_image + ')');
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

    // 保存按钮滑过时更新切割参数
    $('.savebtn').click(function() {

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
            $("#ocutpos").val(JSON.stringify(data));
        }
        ModAvatarHide();

    });
    //$('.savebtn').click(function(){
    //});

    // 生成iframe，生成from，并提交
    var uploading = false;
    $("#personal-info").submit(function() {
        var that = $(this);
        return true;

        if (!ic) {
            return false;
        }
        if (uploading) {
            return false;
        }
        if ($("#avatariframe").length && !uploading) {
            uploading = true;
        }

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
    }

    // 扩大选择区域
    $(".avatar_editor_show").click(function() {
        if ($(this).find("img").length === 0) {
            $("#choose").trigger("click");
        }
    });
    // 下拉菜单箭头颜色改变
      $(".num-safety").hover(function(){
        $(".user-menu b i").addClass('hover');
      },function(){
        $(".user-menu b i").removeClass('hover');
      });
});
// });
