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

        this.swiper.addCallback("FirstInit", function(swiper) {
            setTimeout(function() {
                startSlideAnimation(swiper);
            }, 300);
        });

        this.swiper.addCallback("SlideReset", function(swiper, direction) {
            startSlideAnimation(swiper);
        });

        this.swiper.addCallback("SlideChangeEnd", function(swiper, direction) {
            hideAllSlideAnimation(swiper);
            hideApplyAnimation();
            startSlideAnimation(swiper);
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

    $powerScroll.on("change","select",function(){
        if ($(this).closest(".ui-select").length) {
            var text = $(this).find(":selected").text();
            $(this).closest(".ui-select").find(".ui-select-text").text(text);
        }
        console.log($(".js-power-scroll").data('swiper'));
        // ajax ..
        // $(".ui-teacher-list").html("");
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