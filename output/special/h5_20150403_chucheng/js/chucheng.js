(function(Slider) {
    Slider.prototype.initAnimation = function() {
        var $apply = $(".js-agreement"),
            startSlideAnimation = function(swiper) {
                var $activeSlide = $(swiper.activeSlide());
                $activeSlide.children().removeClass("hide");
            },
            hideAllSlideAnimation = function(swiper) {
                var $activeSlide = $(swiper.activeSlide());
                for (var i = 0, l = swiper.slides.length; i < l; ++i) {
                    $(swiper.slides[i]).children().addClass("hide");
                }
            },
            hideApplyAnimation = function() {
                $apply.children().addClass("hide");
            };

        function bindanimate(swiper) {
            $(".swiper-slide").css("opacity","0");
            $(".swiper-slide").removeClass('anim-bounceIn')
            .removeClass('anim-fadeInLeft')
            .removeClass('anim-fadeInRight')
            .removeClass('anim-fadeInDown')
            .removeClass('anim-moveInLeft')
            .removeClass('anim-fadeInUp');

            if (swiper) {
                var $activeSlide = $(swiper.activeSlide());
                var classname;
                if ($activeSlide.hasClass('slide-cover')) {
                    classname = "anim-bounceIn";
                }else if($activeSlide.hasClass('slide-intro')){
                    classname = "anim-fadeInLeft";

                }else if($activeSlide.hasClass('slide-mypage')){
                    classname = "anim-fadeInRight";

                }else if($activeSlide.hasClass('slide-top5')){
                    classname = "anim-fadeInDown";

                }else if($activeSlide.hasClass('slide-choose')){
                    classname = "anim-moveInLeft";

                }else if($activeSlide.hasClass('slide-detail')){
                    classname = "anim-fadeInUp";

                }
                $activeSlide.addClass(classname).css("opacity","1");
            }
        }
        this.swiper.addCallback("FirstInit", function(swiper) {
            $(".swiper-slide").css("opacity","0");
            setTimeout(function() {
                startSlideAnimation(swiper);
                bindanimate(swiper);
            }, 300);
        });

        this.swiper.addCallback("SlideReset", function(swiper, direction) {
            startSlideAnimation(swiper);
        });

        this.swiper.addCallback("SlideChangeEnd", function(swiper, direction) {
            hideAllSlideAnimation(swiper);
            hideApplyAnimation();
            startSlideAnimation(swiper);
            bindanimate(swiper);
        });
        hideAllSlideAnimation(this.swiper);
    };
})(MobileSlider);

$(function() {
    if ($("body").height() > 1000) {
        $("body").addClass("gt1000");
    }

    var $powerScroll = $(".js-power-scroll");
    // new tab at pc
    if (!/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) {
        $powerScroll.find("a").attr("target", "_blank");
    }
    $powerScroll.find(".js-select").each(function(){
        var that = $(this);
    });

    $powerScroll.on("click",".slide-choose .ui-teacher-list li",function(){
        // ajax ..
        // swiper.appendSlide("") ...
        // swiper.swipeNext() ...
    });
    $powerScroll.on("change","input[type='file']",function(){
        var parent = $(this).closest(".picture-uploader");
        var preview = parent.find(".picture-preview");
        var opts = {
            maxSize : 10240
        };
        //支持html5的浏览器,比如高版本的firefox、chrome、ie10
        if (this.files && this.files[0]) {
            if (!sizeCheck(this.files[0].size)) {
                return false;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                callback(e.target.result);
            };
            reader.readAsDataURL(this.files[0]);

        }

        function sizeCheck(imageSize){
            if( (imageSize/1024) > opts.maxSize) {
                alert('图片大小不能超过'+opts.maxSize+'K');
                return false;
            }else{
                return true;
            }
        }
        function callback(image){
            preview.css("background-image","url("+ image +")");
        }
    });
    $powerScroll = null;
});