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
    var $powerScroll = $(".js-power-scroll");
    // new tab at pc
    if (!/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) {
        $powerScroll.find("a").attr("target", "_blank");
    }

    $powerScroll = null;
});