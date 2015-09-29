var flippage;

if (/MicroMessenger/.test(navigator.userAgent)) {
    init();
    wx.ready(function() {
        playbgm();
        loader();
        bind();
    });
} else {
    init();
    playbgm();
    loader();
    bind();
}

window.onload = function() {
    $audio = $("#bgmidim");
    if ($audio.length > 0) {
        $audio.attr("src", StaticPath + $audio.data("src"));
        $audio.parent("a").prepend('<i class="icon-music"></i>');
    }
};

function init() {
    $(function() {
        FastClick.attach(document.body);
        flippage = new Flippage($("body"),1);
        //flippage.setFlipPageMode(3);
    });
}

function playbgm() {
    document.getElementById("bgmidim").play();
}

function loader() {
    var imageList = [
        "units-icons.png"
    ];

    var audioList = document.querySelectorAll(".audio-lazyload");

    var i = 0;
    var progress = 0;
    var length = imageList.length + audioList.length;
    imageloader(imageList, function() {
        i++;
        if (i === length) {
            progress = 100;
            setTimeout(function() {
                loaded();
            }, 1000);
        }
        progress = parseInt(i / length * 100);
        var html = buildHTML(progress);
        // console.log(i);
        document.getElementById("loading-progress").innerHTML = html;

    });
    audioloader(audioList, function() {
        i++;
        if (i === length) {
            progress = 100;
            setTimeout(function() {
                loaded();
            }, 1000);
        }
        progress = parseInt(i / length * 100);
        var html = buildHTML(progress);
        // console.log(i);
        document.getElementById("loading-progress").innerHTML = html;

    });

    function buildHTML(progress) {
        var html = "";
        // for (var j = 0,len = 10; j < len; j++) {
        //     html += '<span class="num num' + j + '"></span>';
        // }
        for (var j = 0, len = ("" + progress).length; j < len; j++) {
            //console.log(("" + progressgetElementByClassName)[j]);
            html += '<span class="num num' + ("" + progress)[j] + '"></span>';
        }
        return html;
    }

    function loaded() {
        $(function() {

            flippage._isInitComplete = true;
            flippage.showPage();
            var loading = $("#app-loading");
            loading.addClass("z-hide");
            // flippage.showPage(6);
            videoInit();
            // loading.on("webkitTransitionEnd", function() {
            //     loading.remove();
            // });
        });
    }
}

function videoInit() {
    var script = document.getElementById('_youkujs_');
    script.src = 'http://player.youku.com/jsapi';
    script.onload = script.onreadystatechange = function() {

        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
            QS.vid = document.getElementById("video_url") && document.getElementById("video_url").value;
            if (!QS.vid) {
                return;
            }
            if (QS.target == null) QS.target = "youku-playerBox";
            if (QS.client_id == null) QS.client_id = "youkuind";
            var _select = new YoukuPlayerSelect(QS);
            _select.select();
        }
    };
}

function bind() {

    $(function() {
        audioControl().init();
    });
}

function audioControl() {
    var obj = $(".u-globalAudio").eq(0);
    var audio = obj.find("audio")[0];
    return {
        init: function() {
            if (audio.autoplay) {
                _play();
            }
            obj.on("click", function() {
                if (obj.hasClass('z-play')) {
                    _pause();
                } else {
                    _play();
                }
            });
        },
        pause: _pause,
        play: _play
    };

    function _pause() {
        audio.pause();
        obj.removeClass("z-play").addClass("z-pause");
    }

    function _play() {
        audio.play();
        obj.removeClass("z-pause").addClass("z-play");
    }
}