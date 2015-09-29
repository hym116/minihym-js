var flippage;
var city = "shanghai";
if(/MicroMessenger/.test(navigator.userAgent)) {
    init();
    wx.ready(function(){
        playbgm();
        loader();
        bind();
        audioControl();
    });
}else{
    init();
    playbgm();
    loader();
    bind();
    audioControl();
}

window.onload = function() {
    $audio = $("#bgmidim");
    if ($audio.length>0) {
        $audio.attr("src", StaticPath + $audio.data("src"));
        $audio.parent("a").prepend('<i class="icon-music"></i>');
    }
};

function init(){
    $(function(){
        FastClick.attach(document.body);
        flippage = new Flippage($("body"));
        setShareInfo();
    });
}

function setShareInfo(){
    var title = "中国好产品大赛招募start！来报名！亮出新奇特硬货！";
    var desc = "我们寻找最新奇特的创新硬件，来好产品大赛一决高下，加冕最in之王！";
    wxShare.setData({
        title: title,
        desc: desc
    });
    wxShare.setLineData({
        title: title
    });
}

function playbgm(){
    document.getElementById("bgmidim").play();
}

function loader(){
    var imageList = [
        "p0-bg-1.jpg","p0-text.png","p0-bg-1.jpg","p0-text.png","ads-bg.jpg","ads-text.png","guideWrap.png","bg.jpg","p1-bg.png","p2-bg.png","p2_5-text.png","p3-bg.png","p4-bg.png","p5-bg.png","p6-bg.png",
        "share-mask-bg.jpg","trans-bg.jpg","trans-1.jpg","trans-2.jpg","trans-3.jpg","trans-4.png","light.gif","activity-logo.png",
        "p1-text.png","p1-border.png","button.png","button-text.png","p2-title.png","p2-text-bg.png","p2-text.png",
        "p3-title.png","p3-map.png","p3-dots.png","p3-tips.png","p4-title.png","p4-list.png","p5-title.png","p5-form.png",
        "p6-title.png","p6-qrtip.png","p6-qrcode.png","p6-link.png","share-mask-tip.png","alert.png","units-icons.png",
        "p6x-qrcode.png","p6x-text.png","alert.png","p6-press.png"
    ];

    var audioList = document.querySelectorAll(".audio-lazyload");

    var i = 0;
    var progress = 0;
    var length = imageList.length + audioList.length;
    imageloader(imageList,function(){
        i++;
        if (i === length) {
            progress = 100;
            setTimeout(function(){
                loaded();
            },1000);
        }
        progress = parseInt(i / length * 100);
        var html = buildHTML(progress);
        // console.log(i);
        document.getElementById("loading-progress").innerHTML = html;

    });
    audioloader(audioList,function(){
        i++;
        if (i === length) {
            progress = 100;
            loaded();
            setTimeout(function(){
                loaded();
            },1000);
        }
        progress = parseInt(i / length * 100);
        var html = buildHTML(progress);
        // console.log(i);
        document.getElementById("loading-progress").innerHTML = html;

    });

    function buildHTML(progress){
        var html = "";
        for (var j = 0,len = ("" + progress).length; j < len; j++) {
            //console.log(("" + progressgetElementByClassName)[j]);
            html += '<span class="num num' + ("" + progress)[j] + '"></span>';
        }
        return html;
    }

    function loaded(){
        $(function(){
            var loading = $("#app-loading");
            loading.addClass("z-hide");
            flippage._isInitComplete = true;
            console.log(flippage);
            flippage.showPage();
            flippage.disableFlipPage();
            loading.on("webkitTransitionEnd", function() {
                loading.remove();
                //flippage.showPage(13);
            });
        });
    }
}

function bind() {
    $(function(){
        //flippage.showPage(8);
        $(".ui-guideWrap").hide();

        $(".press").append('<div class="press-light"></div>');
        var _qrx = false;


        $("#resultx").on("current", function() {
            if (_qrx) {
                return false;
            }
            var qrcode = $("#resultx img");
            var qrcodeheight = qrcode.offset().top + qrcode.height();
            console.log(qrcodeheight);
            var qrcodex = $("#resultx .ui-qrcode img").clone().css({
                position:"absolute",
                top:0,
                left:0,
                zIndex:10,
                width:640,
                height:qrcodeheight+"px",
                opacity:0
            });
            $("#resultx .page-content").append(qrcodex);
            _qrx = true;
        });

        $(".anim-light").on("webkitAnimationEnd", function(e) {
            flippage.showPage(1);
        });
        // $("#story1").on("current", function() {
        //     flippage.setFlipPageMode(3);
        //     $(".ui-guideWrap").removeAttr("hidden");
        // });
        // $("#story3").on("current", function() {
        //     flippage.setFlipPageMode(1);
        //     $(".ui-guideWrap").removeAttr("hidden");
        // });
        // $("#story5").on("current", function() {
        //     flippage.setFlipPageMode(1);
        //     $(".ui-guideWrap").removeAttr("hidden");
        // });
        // $("#trans").on("current", function() {
        //     flippage.setFlipPageMode(0);
        //     $(".ui-guideWrap").attr("hidden", true);
        // });
        // $("#cover").on("current", function() {
        //     flippage.setFlipPageMode(0);
        //     $(".ui-guideWrap").attr("hidden", true);
        // });
        // $("#intro").on("current", function() {
        //     flippage.setFlipPageMode(2);
        //     $(".ui-guideWrap").attr("hidden", true);
        // });
        $("#trans").on("webkitAnimationEnd", function(e) {
            var index;
            if ($(e.target).hasClass('page-content') && e.animationName === "fadeout") {
                index = $(".page").index($(this).closest('.page'));
                setTimeout(function() {
                    flippage.showPage(index + 1, true);
                }, 500);
            }
        });
        $("#trans .page-content").on("webkitAnimationStart", function(e) {
            var obj = $('<div class="gif"></div>');
            if ($(e.target).hasClass('trans-1') && e.animationName === "shake") {
                obj.appendTo("#trans .page-content");
                setTimeout(function() {
                    obj.remove();
                }, 1200);
            }
            if ($(e.target).hasClass('trans-2') && e.animationName === "shake") {
                $("#screenmessm")[0].play();
            }
        });
        $("#intro .a-flipinX").on("webkitAnimationStart", function(e) {
            if (e.animationName === "flipinX") {
                $("#synopsis")[0].play();
            }
        });
        $(".form-item").on("webkitAnimationStart", function(e) {
            var index;
            if (e.animationName === "fadeinB") {
                index = $(".form-item,.infos").index($(this));
                $("#textbox" + (index + 1))[0].play();
            }
        });
        $(".ui-continue-link").on("click", function() {
            var index = $(".page").index($(this).closest('.page'));
            flippage.showPage(index + 1);
        });
        $(".btn-next").on("click", function() {
            var parent = $(this).closest('.page');
            $("#buttonm")[0].play();
            if (parent[0].id === "apply") {
                applyRequest(parent);
                return false;
            }
            if (parent[0].id === "valid") {
                validRequest(parent);
                return false;
            }
            if (parent[0].id === "result" || parent[0].id === "resultx") {
                $("#share-mask").show();
                return false;
            }
            var index = $(".page").index(parent);
            flippage.showPage(index + 1);
        });
        $(".btn-prev").on("click", function() {
            var parent = $(this).closest('.page');
            $("#buttonm")[0].play();
            if (parent[0].id === "cover") {
                flippage.showPage(0);
                return false;
            }
            if (parent[0].id === "result") {
                flippage.showPage($(".page").index($('#cover')));
                return false;
            }
            if (parent[0].id === "resultx") {
                flippage.showPage($(".page").index($('#cover')));
                return false;
            }
            var index = $(".page").index(parent);
            if (index >= 1) {
                flippage.showPage(index - 1);
            }
        });
        $(".activity-logo").on("webkitAnimationStart", function(e) {
            if (e.animationName === "activityLogo") {
                $("#logom")[0].play();
            }
        });
        $(".ui-city").on("webkitAnimationStart", function(e) {
            if (!$(e.target).hasClass('ui-arrow')) {
                $("#citym" + $(this).index())[0].play();
            }
        });
        $(".ui-flow-list li").on("webkitAnimationStart", function(e) {
            if ($(e.target).hasClass('a-flipinX2')) {
                $("#tumblingm" + ($(e.target).index() + 1))[0].play();
            }
        });
        $("#share-mask").on("click", function() {
            $(this).hide();
        });
        $("#alert-mask").on("webkitAnimationStart", function() {
            $("#warningm")[0].play();
        });
        $("#alert-mask .alert-btn").on("click", function() {
            $("#alert-mask").hide();
        });
        $("#form1").on("submit",function(){
            var parent = $(this).closest('.page');
            applyRequest(parent);
            return false;
        });
        $("#form2").on("submit",function(){
            var parent = $(this).closest('.page');
            validRequest(parent);
            return false;
        });
        function warning(text,callback){
            $("#alert-mask .alert-text").text(text);
            $("#alert-mask").show();
            if (callback) {
                $("#alert-mask .alert-btn").one("click",callback);
            }
        }
        function applyRequest(parent) {
            var index = $(".page").index(parent);
            var mobile = $("#mobile").val();
            var realName = $("#realname").val();
            var email = $("#email").val();
            var m = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/;
            var e = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            var form2 = $("#form2");
            if ($.trim(realName).length === 0) {
                warning("请输入姓名");
                return false;
            }
            if (!m.test(mobile)) {
                warning("请输入正确的手机号！");
                return false;
            }
            if (!e.test(email)) {
                warning("请输入正确的邮箱！");
                return false;
            }

            form2.find(".mobile").text(mobile);
            form2.find(".realname").text(realName);
            form2.find(".email").text(email);

            $("#ajax-mask").removeClass("z-hide").show();

            $.ajax({
                url: '/goodproduct/regist',
                type: 'POST',
                dataType: 'json',
                data: {mobile: mobile},
                success:function(data) {
                    $("#ajax-mask").addClass("z-hide").hide();

                    if (data.code == "0") {
                        $("#ajax-mask").removeClass("z-hide").show();

                        $.ajax({
                            url: '/order/messagecode',
                            type: 'POST',
                            dataType: 'json',
                            data: {mobile: mobile,from: 'goodproduct'},
                            success:function(data) {
                                if (data.code == "0") {
                                    flippage.showPage(index + 1);
                                } else if (data.code == "2") {
                                    warning("请输入正确的手机号！");
                                } else {
                                    warning("发送失败，请稍后重试！");
                                }
                                $("#ajax-mask").addClass("z-hide").hide();
                                console.log("success");
                            },
                            error:function() {
                                $("#ajax-mask").addClass("z-hide").hide();
                                warning("发送失败，请稍后重试！");
                                console.log("error");
                            }
                        });

                    } else if (data.code == "1002") {
                        warning("请输入正确的手机号！");
                    } else if (data.code == "1003") {
                        warning("您已报名过!",function(){
                            setShareContent();
                            flippage.showPage(index + 2);
                        });
                    } else {
                        warning("发送失败，请稍后重试！");
                    }
                    console.log("success");
                },
                error:function() {
                    $("#ajax-mask").addClass("z-hide").hide();
                    warning("发送失败，请稍后重试！");
                    console.log("error");
                }
            });

        }

        function validRequest(parent) {
            var index = $(".page").index(parent);
            var mobile = $("#mobile").val();
            var realName = $("#realname").val();
            var email = $("#email").val();
            var authcode = $("#authcode").val();

            if ($.trim(authcode).length != 6) {
                warning("请输入6位验证码");
                return false;
            }

            $("#ajax-mask").removeClass("z-hide").show();

            $.ajax({
                url: '/goodproduct/good-store',
                type: 'POST',
                dataType: 'json',
                data: {truename:realName, email:email, mobile:mobile, authcode:authcode, city:city},
                success:function(data) {
                    if (data.code == "0") {
                        setShareContent();
                        flippage.showPage(index + 1);
                    } else if (data.code == "1004") {
                        warning("您已报名过!",function(){
                            setShareContent();
                            flippage.showPage(index + 1);
                        });
                    } else if (data.code == "1005") {
                        warning("验证码错误！");
                    } else {
                        warning("发送失败，请稍后重试！");
                    }
                    $("#ajax-mask").addClass("z-hide").hide();
                    console.log("success");
                },
                error:function() {
                    $("#ajax-mask").addClass("z-hide").hide();
                    warning("发送失败，请稍后重试！");
                    console.log("error");
                }
            });
        }
    });
}

function setShareContent(){
    var title = "我是" + $("#realname").val() + ",已报名参加“中国好产品”大赛，有货你也来！";
    var desc = "我们寻找最新奇特的创新硬件，来好产品大赛一决高下，加冕最in之王！";
    wxShare.setData({
        title: title,
        desc: desc
    });
    wxShare.setLineData({
        title: title
    });
}

function audioControl(){
    $(function(){
        var obj = $(".u-globalAudio").eq(0);
        var audio = obj.find("audio")[0];
        if (audio.autoplay) {
            play();
        }
        obj.on("click",function(){
            if (obj.hasClass('z-play')) {
                pause();
            }else{
                play();
            }
        });
        function pause(){
            audio.pause();
            obj.removeClass("z-play").addClass("z-pause");
        }
        function play(){
            audio.play();
            obj.removeClass("z-pause").addClass("z-play");
        }
    });
}