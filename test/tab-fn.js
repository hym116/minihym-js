// 平常我们这样实现的 每出现一个实例就写一次

$('.block1 .nav li').on('mouseover', function() {
    var index = $(this).index();
    $(this).addClass('on').siblings().removeClass('on');
    $('.block1 .main li').eq(index).show().siblings().hide();
});

// function 扩展性加强 tabSwitch('.block1')

function tabSwitch(parent, options) {
    var DEFAULT = {
        nav: '.nav li',
        main: '.main li',
        switchEvent: 'mouseover',
        navActive: 'on',
        mainActive: 'on',
    };

    var opts = $.extend({}, DEFAULT, options);

    $(parent).each(function() {
        var $this = $(this);
        $this.on(opts.switchEvent, opts.nav, function() {
            var _this = $(this);
            var index = $this.find(opts.nav).index(_this);

            _this.addClass(opts.navActive)
                .siblings(opts.main).removeClass(opts.navActive);

            $this.find(opts.main).eq(index).addClass(opts.mainActive)
                .siblings(opts.main).removeClass(opts.mainActive);
        });
    });
}


// jQuery插件 扩展性加强 $('.block1').tabswitch(); 减少全局变量，支持链式操作

;(function($) {

    $.fn.tabswitch = function(options) {

        var DEFAULT = {
            nav: '.nav li',
            main: '.main li',
            switchEvent: 'mouseover',
            navActive: 'on',
            mainActive: 'on',
        };

        var opts = $.extend({}, DEFAULT, options);

        return this.each(function() {
            var $this = $(this);
            $this.on(opts.switchEvent, opts.nav, function() {
                var _this = $(this);
                var index = $this.find(opts.nav).index(_this);

                _this.addClass(opts.navActive)
                    .siblings(opts.main).removeClass(opts.navActive);

                $this.find(opts.main).eq(index).addClass(opts.mainActive)
                    .siblings(opts.main).removeClass(opts.mainActive);
            });
        });

    };

})(jQuery);