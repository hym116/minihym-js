$(function() {
    var H = $(window).height();
    $("#iui").height(H);


    var myiScroll = new IScroll('.y-scroll', {
        mouseWheel: true,
        click: true
    });

});
var Share={};
(function() {
    var e = {
        defaultData: {
            title: (document.getElementsByTagName("title")[0].innerHTML || "").replace(/&nbsp;/g, " "),
            desc: "",
            link: location.href.split("#")[0] || "",
            imgUrl: "",
            trigger: function(){},
            complete: function(){},
            success: function(){},
            cancel: function(){},
            fail: function(){}
        },
        customData: {},
        callback: [],
        isInit: !1,
        init: function() {
            var e = this;
            if (this.isInit){
                return false;
            }else{
                this.isInit = true;
                if (navigator.userAgent.match(/micromessenger/gi)) {
                    wx.ready(function(){
                        var t = e.getData();
                        wx.onMenuShareAppMessage(t);
                        wx.onMenuShareTimeline(t);
                        wx.onMenuShareQQ(t);
                        wx.onMenuShareWeibo(t);
                    });
                }
            }
        },
        setData: function(e, t) {
            var n = this.customData;
            if ("object" == typeof e)
                for (var i in e)
                    n[i] = e[i];
            else
                n[e] = t;
        },
        getData: function() {
            var e = this.defaultData,
                t = this.customData,
                n = {};
            for (var i in e)
                n[i] = e[i];
            for (var _i in t)
                n[_i] = t[_i];
            return n;
        }
    };
    window.Share.WeChat = {
        setData: function(t, n) {
            e.setData(t, n);
        },
        getData: function() {
            return e.getData();
        }
    };
    e.init();
})();