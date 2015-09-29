var $ = require("jquery");
var Boxy = require("popup");
var API = require("apis/api-aio");
var ajaxForm = require("pkgs/ajax-form/ajax-form");
var VOTE_URL = API.getUrl("GOODPRODUCT", "VOTE");
//require("pin");

// youku视频
function videoInit(){
    var script = document.getElementById('_youkujs_');
    script.src = 'http://player.youku.com/jsapi';
    // script.src = '/js/youku-jsapi.js';
    script.onload = script.onreadystatechange = function(){

        if(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'){
            /*QS.width = QS.width ? QS.width : wh.width;
             QS.height = QS.height ? QS.height :wh.height;*/
            // var arr = window.location.pathname.split('/');
            // if(arr.length == 3 && arr[1] == 'embed' && arr[2].charAt(0) == 'X' ){
            //     QS.vid = arr[2];
            // }
            QS.vid = document.getElementById("video_url").value;
            if (!QS.vid) {
                return false;
            }
            var result;
            if (/\.youku\.com/.test(QS.vid)) {
                result = QS.vid.match(/[\/_](X\w+)\W/);
                if (result) {
                    QS.vid = result[1];
                } else {
                    return false;
                }
            }
            if(QS.target == null ) QS.target = "youku-playerBox";
            if(QS.client_id == null) QS.client_id = "youkuind";
            var _select = new YoukuPlayerSelect(QS);
            _select.select();
            // var player = new YKU.Player("youku-playerBox", {
            // styleid: "0",
            // client_id: "168eed9e805f5239",
            // vid: "XOTU0NzAzMjUy",
            // show_related: !1,
            // autoplay: !0,
            // events: {
            //     onPlayerReady: function(){},
            //     onPlayStart: function(){},
            //     onPlayEnd: function(){}
            // }});
        }
    };
}
videoInit();

$(function(){
    // 登录态样式
    ajaxForm.loginTpl = '<a href="/home-page/lists?uid={uid}">个人主页</a>' +
                        '<span>|</span>' +
                        '<a href="/user/logout">退出</a>';

    if (typeof window.ajaxform === "undefined") {
        ajaxForm.init();
    }
    //pin
    // $(".pin").pin({
    //     padding:{
    //         top:44
    //     }
    // });

    //分享按钮点击事件
    $("#share-btn").each(function(){
        var that = $(this);
        var mobileUrl = that.data("mobileurl").split( "#" )[0];
        var src = 'http://s.jiathis.com/qrcode.php?url=' + mobileUrl;
        new Boxy('<div><img style="width:200px;height:200px;" src="' + src + '"></div>', {
            modal: true,
            closeable: false,
            actuator: that,
            show: false
        });
        that.click(function(){
            var popup = Boxy.linkedTo(that);
            popup.show();
        });
    });

    //支持此项目
    var ajaxing = false;
    $(".light-green-btn").click(function(){
        var that = $(this);
        if(ajaxing || that.hasClass("disable")){
            return false;
        }
        ajaxing = true;
        $.ajax({
                url: VOTE_URL,
                type: 'POST',
                dataType: 'json',
                data: {
                    option_id: [OPTION_ID]
                }
            })
            .done(function(data) {
                if (data.code == "0") {
                    Boxy.alert("投票成功");
                    that.addClass("disable");
                } else if(data.code == "1001"){
                    ajaxForm.loginPopupBindFunction(function() {
                    ajaxForm.modal.fadeOut();
                    that.trigger("click");
                });
                }
                else  {
                    Boxy.alert(data.msg);
                    that.addClass("disable");

                } 
            })
            .fail(function(err, err2) {
                Boxy.alert("程序出错误了，请稍后重试！");
            })
            .always(function() {
                ajaxing = false;
            });
    });
    $(".support").click(function(){
        $(".light-green-btn").trigger("click");
    });
});
