var $ = require("jquery");
var Boxy = require("tip");
var Follow = require("pkgs/follow");
var Favourite = require("pkgs/favourite");
var Boxy_Cover = require("popup");
var API = require("apis/api-aio");
var template = require("arttemplate");
var ajaxForm = require("pkgs/ajax-form/ajax-form");
var NEWS_DETAIL_Url = API.getUrl("COMMENT", "DETAIL_GET_PAGE");
var REPLY_Url = API.getUrl("COMMENT", "REPLY");
var REPLYMORE_URL = API.getUrl("COMMENT", "REPLYMORE");
var FOLLOW_URL = API.getUrl("NEWS", "FOLLOW");
var formatUtil = {};
formatUtil.getLocalTime = function(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
};
formatUtil.fomateNumber = function(nS) {};

window.myUtil = formatUtil;
$(function() {
    //hover的时候回复二字出现
    $(".user-comment").mouseover(function(e) {
        if ($(e.target).closest(".other-comment-wrap").length) {
            var that = $(e.target).closest(".other-comment-wrap");
            that.find(".reply").show();
            that.mouseout(function() {
                that.find(".reply").hide();
            })
        } else if ($(e.target).is('.num ')) {
            var that = $(e.target);
            that.css("opacity", "1");
            var tip = Boxy.linkedTo(that[0]);
            var b = that.find("b");
            if (tip) {
                tip.show();
            } else {
                var message = b.data("tip");
                if (message) {
                    Boxy.tip(message, {
                        actuator: that[0],
                        arrow: 'bottom'
                    });
                }
            };
            that.mouseout(function() {
                that.css("opacity", "0.5");
                var tip = Boxy.linkedTo(that[0]);
                if (tip) {
                    tip.hide();
                }
            });
        }
    })
    var append_comment = $(".hide-comment");
    var UID = $("#uid").val();
    $(document).on("click", function(e) {
        if ($(e.target).closest(".talk-num").length) {
            var that = $(e.target);
            // alert(that.find("b").text()+1);
            var parent = that.closest('li');
            var uid = parent.data("uid");
            // alert(uid);
            var self_comment = parent.find(".self-comment");
            var pid = self_comment.find(".user-info a").data("pid")
            // alert(uid);
            // alert(UID);
            if(pid == UID){
                Boxy_Cover.alert("您不能回复自己哦~");
                return false;
            }else{
                self_comment.append(append_comment);
                append_comment.fadeIn();
            }
          
            return;
        } else if ($(e.target).closest(".reply").length) {
            var that = $(e.target);
            var parent = that.closest('.other-comment-wrap');
            var other_comment = parent.find(".other-comment");
            other_comment.append(append_comment);
            append_comment.fadeIn();
            return;
        } else if ($(e.target).closest(".hide-comment").length) {
            return;
        }
        append_comment.fadeOut();
    });

    $(".bds_weixin").each(function() {
        var that = $(this);
        var mobileUrl = that.data("mobileurl").split("#")[0];
        var src = 'http://s.jiathis.com/qrcode.php?url=' + mobileUrl;
        new Boxy_Cover('<div><img style="width:200px;height:200px;" src="' + src + '"></div>', {
            modal: true,
            closeable: false,
            actuator: that,
            show: false
        });
        that.click(function() {
            var popup = Boxy_Cover.linkedTo(that);
            popup.show();
        });
    });
    $(".user-item").each(function() {
        var that = $(this);
        // var button = that.find(".heart");
        var followButton = that.find(".care-icon");
        var pid = that.data("pid");
        var uid = that.data("uid");
        var user_numbers = $(".user_numbers");
        var follow = new Follow(followButton, {
            uid: uid,
            likedClass: "hover"
        });
    });
    //查看更多
    var page = 1;
    var news_id_value = $("#news_id").val();
    $(".look-more").on("click", function() {
        var that = $(this);
        $.ajax({
                url: NEWS_DETAIL_Url,
                type: 'POST',
                dataType: 'json',
                data: {
                    page: page - 0 + 1,
                    news_id: news_id_value
                }
            })
            .done(function(data) {
                if (data.code == 0) {
                    page = data.data.page;
                    var _data = data.data.datalist;
                    var html = template("js-comment-list-tpl", data.data);
                    $(".user-comment").append(html);
                    if (data.data.end == 1) {
                        that.hide();
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
    });

    // 喜欢的ajax

    $(".like").on('click', function() {
        var that = $(this);
        var id_value = $("#news_id").val();
        $.ajax({
                url: FOLLOW_URL,
                type: 'GET',
                dataType: 'json',
                data: {
                    action: "follow_news",
                    id: id_value
                }
            })
            .done(function(data) {
                if (data.code == 1) {
                    if (that.hasClass('liked')) {
                        that.removeClass('liked');
                        that.text("收藏");
                    } else {
                        that.addClass('liked');
                        that.text("已收藏");
                    }
                } else if (data.code == 1001) {
                    ajaxForm.loginPopupBindFunction(function() {
                        ajaxForm.modal.fadeOut();
                        that.trigger("click");
                    });
                } else {
                    Boxy_Cover.alert(data.msg);

                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    });

    // 支持的ajax
    $(".support").on('click', function() {
        var that = $(this);
        var id_value = $("#news_id").val();
        $.ajax({
                url: FOLLOW_URL,
                type: 'GET',
                dataType: 'json',
                data: {
                    action: "like_news",
                    id: id_value
                }
            })
            .done(function(data) {
                if (data.code == 1) {
                    if (that.hasClass('supported')) {
                        that.removeClass('supported');
                        that.text("赞");
                    } else {
                        that.addClass('supported');
                        that.text("已赞");
                    }
                } else if (data.code == 1001) {
                    ajaxForm.loginPopupBindFunction(function() {
                        ajaxForm.modal.fadeOut();
                        that.trigger("click");
                    });
                } else {
                    Boxy_Cover.alert(data.msg);
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    });
    // 回复
    $(".hide-comment .publish").on("click", function() {
        var that = $(this);
        var li_parent = that.closest('li');
        var TalkNum = li_parent.find(".talk-num");
        var MainComment = that.closest('.main-comment');
        var Self_Comment = MainComment.find('.self-comment');
        var other_parent = that.closest('.other-comment-wrap');
        var ParentId = li_parent.data("uid");
        var UserId = other_parent.data("pid");
        var comment = that.closest('.comment');
        var textarea = comment.find("textarea");
        var CmtCon = comment.find("textarea").val();
        var cmt_parent = $(this).closest('.comment');
        var self_cmt_con = cmt_parent.find("textarea").val();
        var ajaxingdata = {
            parent_id: ParentId,
            cmt_name: CmtCon
        }

        if (UserId) {
            ajaxingdata.user_id = UserId;
        }
        $.ajax({
                url: REPLY_Url,
                type: 'POST',
                dataType: 'json',
                data: ajaxingdata
            })
            .done(function(data) {
                textarea.val("");
                comment.hide();
             
                if (data.code == 0) {
                    var talk_num = TalkNum.find("b").text() - 0 + 1;
                    TalkNum.find("b").text(talk_num);
                    var html = template("js-reply-tpl", {
                        avatar: data.data.avatar,
                        pid: data.data.uid,
                        nickname: data.data.nickname,
                        cmt_name: data.data.cmt_name,
                        created_at: data.data.created_at,
                    });
                    Self_Comment.after(html);

                } else if (data.code == 1001) {
                        ajaxForm.loginPopupBindFunction(function() {
                        ajaxForm.modal.fadeOut();
                        that.trigger("click");
                    });
                } else {
                    // Boxy_Cover.alert(data.msg);
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    });
    //评论点赞接口
    $(".user-comment").on("click", function(e) {
        if ($(e.target).closest(".support-num").length) {
            var that = $(e.target);
            var parent = that.closest('li');
            var uid = parent.data("uid");
            $.ajax({
                    url: FOLLOW_URL,
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        action: 'like_cmt',
                        id: uid
                    },
                })
                .done(function(data) {
                    if (data.code == 1) {
                        that.find("b").text(data.data.follow_num);
                        
                    } else if(data.code == 1001){
                        ajaxForm.loginPopupBindFunction(function() {
                        ajaxForm.modal.fadeOut();
                        that.trigger("click");
                        });
                    }else{
                        Boxy_Cover.alert(data.msg);
                    }
                    console.log("success");
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });

        } else if ($(e.target).closest(".more-reply").length) {
            var that = $(e.target);
            var li_parent = that.closest('li');
            var MainComment = li_parent.find('.main-comment');
            var parentid = li_parent.data("uid");
            $.ajax({
                    url: REPLYMORE_URL,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        parent_id: parentid
                    }
                })
                .done(function(data) {
                    if (data.code == 0) {
                        var html = template("js-replymore-tpl", data);
                        MainComment.append(html);
                        that.hide();
                    } else if (data.code == 1002) {
                        Boxy_Cover.alert(data.msg)
                    } else {
                        Boxy_Cover.alert(data.msg);
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

    });

});

var _console = window.console;

function videoInit() {
    var script = document.getElementById('_youkujs_');
    script.src = 'http://player.youku.com/jsapi';
    // script.src = '/js/youku-jsapi.js';
    script.onload = script.onreadystatechange = function() {

        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
            /*QS.width = QS.width ? QS.width : wh.width;
             QS.height = QS.height ? QS.height :wh.height;*/
            // var arr = window.location.pathname.split('/');
            // if(arr.length == 3 && arr[1] == 'embed' && arr[2].charAt(0) == 'X' ){
            //     QS.vid = arr[2];
            // }
            QS.vid = document.getElementById("video_url").value;
            if (!QS.vid) {
                return;
            }
            if (QS.target == null) QS.target = "youku-playerBox";
            if (QS.client_id == null) QS.client_id = "youkuind";
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
// window.console = _console;