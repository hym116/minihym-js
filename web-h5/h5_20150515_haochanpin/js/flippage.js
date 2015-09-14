/**
 * flippage
 * window.estart;
 * window.emove;
 * flippage.showPage(index) 显示某页
 * flippage.disableFlipPage() 禁用翻屏
 * flippage.enableFlipPage() 启用翻屏
 * flippage.setFlipPageMode(mode) 0:禁用翻页、1:启用上下翻页、2:仅启用向上翻页、3:仅启用向下翻页
 * $(".page").eq(index).on("current") 监听某页面显示
 * $(".page").eq(index).on("active") 监听某页面运动中
 * $(".page").eq(index).on("hide") 监听某页面隐藏
 */
var Flippage = function(main, isx) {
    console.log("app init");
    this._$app = main;
    this._$pages = this._$app.find(".page");
    this.$currentPage = this._$pages.eq(0);
    this._isFirstShowPage = true;
    this._isInitComplete = false;
    this._isDisableFlipPage = false;
    this._isDisableFlipPrevPage = false;
    this._isDisableFlipNextPage = false;
    this._direction = isx ? 'X' : 'Y';
    var that = this,
        W = $(window);
    (function() {
        W.on("scroll.elasticity", function(event) {
            event.preventDefault();
        }).on("touchmove.elasticity", function(event) {
            event.preventDefault();
        }).on("doubleTap", function(event) {
            event.preventDefault();
        }).on("mousemove", "img", function(event) {
            event.preventDefault();
        }).on("touchmove", function(event) {
            event.preventDefault();
        });
    })();

    that.prefix = (function() {
        var _elementStyle = document.createElement('div').style;
        var _vendor = (function() {
            var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
                transform,
                i = 0,
                l = vendors.length;
            for (; i < l; i++) {
                transform = vendors[i] + 'ransform';
                if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
            }
            return false;
        })();

        function _prefixStyle(style) {
            if (_vendor === false) return false;
            if (_vendor === '') return style;
            return '-' + _vendor.toLowerCase() + '-' + style;
        }

        return {
            transition: _prefixStyle('transition'),
            transform: _prefixStyle('transform'),
            transformOrigin: _prefixStyle('transform-origin')
        };
    })();

    $(function() {
        var current = null,
            next = null,
            isLoop = true,
            pageX = 0,
            pageY = 0,
            moveX = 0,
            moveY = 0,
            moving = false,
            movePrev = false,
            touchStart = true,
            stepOffset = that._direction === 'X' ? that._$app.width() : that._$app.height();

        that._$app.on("mousedown touchstart MSPointerDown pointerdown", function(event) {
            var point = event.touches ? event.touches[0] : event;
            window.estart = event;
            if (!that._isDisableFlipPage) {
                current = that._$pages.filter(".z-current");
                next = null;
                if (current) {
                    moving = true;
                    movePrev = false;
                    touchStart = true;
                    moveX = 0;
                    moveY = 0;

                    pageX = point.pageX;
                    pageY = point.pageY;

                    current.addClass("z-move");
                    current.css(that.prefix.transition, "none");
                }
            }
        });

        that._$app.on("mousemove touchmove MSPointerMove pointermove", function(event) {
            var point = event.touches ? event.touches[0] : event;
            window.emove = event;

            if (moving && (next || touchStart)) {
                moveX = point.pageX - pageX;
                moveY = point.pageY - pageY;

                if (that._direction !== "Y") {
                    //互换
                    moveX = moveY + (moveY = moveX) * 0;
                }

                if (Math.abs(moveY) > Math.abs(moveX)) {
                    if (moveY > 0) {
                        if (that._isDisableFlipPrevPage) {
                            return;
                        }
                        if (movePrev || touchStart) {
                            movePrev = false;
                            touchStart = false;
                            if (next) {
                                next.removeClass("z-active");
                                next.removeClass("z-move");
                            }

                            if (current.prev() && current.prev().hasClass("page")) {
                                next = current.prev();
                            } else {
                                if (isLoop) {
                                    next = that._$pages.last();
                                } else {
                                    next = false;
                                }
                            }
                            if (next) {
                                if (next.hasClass("page")) {
                                    next.addClass("z-active");
                                    next.addClass("z-move");
                                    next.css(that.prefix.transition, "none");
                                    next.css(that.prefix.transform, "translate" + that._direction + "(-100%)");
                                    $(next).trigger("active");
                                    current.css(that.prefix.transformOrigin, "bottom center");
                                } else {
                                    current.css(that.prefix.transform, "translate" + that._direction + "(0px)");
                                    next = null;
                                }
                            }
                        } else {
                            current.css(that.prefix.transform, "translate" + that._direction + "(" + moveY + "px)");
                            next.css(that.prefix.transform, "translate" + that._direction + "(-" + (stepOffset - moveY) + "px)");
                        }
                    } else if (0 > moveY) {
                        if (that._isDisableFlipNextPage) {
                            return;
                        }
                        if (!movePrev || touchStart) {
                            movePrev = true;
                            touchStart = false;
                            if (next) {
                                next.removeClass("z-active");
                                next.removeClass("z-move");
                            }
                            if (current.next() && current.next().hasClass("page")) {
                                next = current.next();
                            } else {
                                next = that._$pages.first();
                                isLoop = true;
                            }
                            if (next && next.hasClass("page")) {
                                next.addClass("z-active");
                                next.addClass("z-move");
                                next.css(that.prefix.transition, "none");
                                next.css(that.prefix.transform, "translate" + that._direction + "(" + stepOffset + "px)");
                                $(next).trigger("active");
                                current.css(that.prefix.transformOrigin, "top center");
                            } else {
                                current.css(that.prefix.transform, "translate" + that._direction + "(0px)");
                                next = null;
                            }
                        } else {
                            current.css(that.prefix.transform, "translate" + that._direction + "(" + moveY + "px)");
                            next.css(that.prefix.transform, "translate" + that._direction + "(" + (stepOffset + moveY) + "px)");
                        }
                    }
                }
            }

        });
        that._$app.on("mouseup touchend MSPointerUp pointerup mousecancel touchcancel MSPointerCancel pointercancel", function() {
            if (moving) {
                moving = false;
                if (next) {
                    that._isDisableFlipPage = true;
                    current.css(that.prefix.transition, that.prefix.transform + " 0.3s ease-out");
                    next.css(that.prefix.transition, that.prefix.transform + " 0.3s ease-out");
                    if (Math.abs(moveY) > Math.abs(moveX) && Math.abs(moveY) > 100) {
                        if (movePrev) {
                            current.css(that.prefix.transform, "translate" + that._direction + "(-" + stepOffset + "px)");
                            next.css(that.prefix.transform, "translate" + that._direction + "(0px)");
                        } else {
                            current.css(that.prefix.transform, "translate" + that._direction + "(" + stepOffset + "px)");
                            next.css(that.prefix.transform, "translate" + that._direction + "(0px)");
                        }
                        setTimeout(function() {
                            next.removeClass("z-active");
                            next.removeClass("z-move");
                            next.addClass("z-current");
                            current.removeClass("z-current");
                            current.removeClass("z-move");
                            that._isDisableFlipPage = false;
                            $(current).trigger("hide");
                            that.$currentPage = $(next).trigger("current");
                        }, 500);
                    } else {
                        if (movePrev) {
                            current.css(that.prefix.transform, "translate" + that._direction + "(0px)");
                            next.css(that.prefix.transform, "translate" + that._direction + "(100%)");
                        } else {
                            current.css(that.prefix.transform, "translate" + that._direction + "(0px)");
                            next.css(that.prefix.transform, "translate" + that._direction + "(-100%)");
                        }
                        setTimeout(function() {
                            $(current).trigger("current");
                            next.removeClass("z-active");
                            next.removeClass("z-move");
                            that._isDisableFlipPage = false;
                        }, 500);
                    }
                } else {
                    current.removeClass("z-move");
                    that._isDisableFlipPage = false;
                }
            }
        });
    });
};
Flippage.prototype.showPage = function(index, notrans) {
    var that = this;
    var moving;
    var stepOffset = that._direction === 'X' ? that._$app.width() : that._$app.height();
    if (!window._app_showPage) {
        window._app_showPage = function(index, notrans) {
            var next, current, type = typeof index,
                that = this;
            switch (type) {
                case "number":
                    next = this._$pages.eq(index);
                    break;
                case "string":
                    next = this._$pages.filter(index).first();
                    break;
                case "object":
                    next = $(index);
            }
            if (this._isFirstShowPage && !(next && next.length)) {
                next = this.$currentPage;
                this._$pages.filter(".z-current").removeClass("z-current");
                next.css("transform", "none").addClass("z-current");
                next.trigger("current");
                this._isFirstShowPage = false;

            } else if (next && next.length && next.attr("notrans") !== null || notrans) {

                this._$pages.filter(".z-current").removeClass("z-current").trigger("hide");
                next.css("transform", "none").addClass("z-current");
                this.$currentPage = next.trigger("current");

            } else if (next && next.length && !notrans) {

                if (moving) {
                    return false;
                }
                moving = true;
                current = this._$pages.filter(".z-current");
                currentIndex = current.index();
                next.addClass("z-active");
                next.css(that.prefix.transition, that.prefix.transform + " 0.3s ease-out");
                current.css(that.prefix.transition, that.prefix.transform + " 0.3s ease-out");

                if (index > currentIndex) {

                    next.css(that.prefix.transform, "translate" + that._direction + "(" + stepOffset + "px)");
                    current.css(that.prefix.transform, "translate" + that._direction + "(0px)");

                    setTimeout(function() {
                        next.css(that.prefix.transform, "translate" + that._direction + "(0px)");
                        current.css(that.prefix.transform, "translate" + that._direction + "(-" + stepOffset + "px)");
                    }, 100);

                    setTimeout(function() {
                        next.removeClass("z-active");
                        next.addClass("z-current");
                        current.removeClass("z-current");
                        current.trigger("hide");
                        that.$currentPage = next.trigger("current");
                        moving = false;
                    }, 500);

                } else if (index < currentIndex) {

                    next.css(that.prefix.transform, "translate" + that._direction + "(-" + stepOffset + "px)");
                    current.css(that.prefix.transform, "translate" + that._direction + "(0px)");

                    setTimeout(function() {
                        next.css(that.prefix.transform, "translate" + that._direction + "(0px)");
                        current.css(that.prefix.transform, "translate" + that._direction + "(" + stepOffset + "px)");
                    }, 100);

                    setTimeout(function() {
                        next.removeClass("z-active");
                        next.addClass("z-current");
                        current.removeClass("z-current");
                        current.trigger("hide");
                        that.$currentPage = next.trigger("current");
                        moving = false;
                    }, 500);

                }
            }
        };
    }
    if (this._isInitComplete) {
        return window._app_showPage.apply(that, [index, notrans]);
    } else {
        $(window).one("load", function() {
            window._app_showPage.apply(that, [index, notrans]);
        });
    }
};
Flippage.prototype.disableFlipPage = function() {
    this._isDisableFlipPage = true;
};
Flippage.prototype.enableFlipPage = function() {
    this._isDisableFlipPage = false;
};
Flippage.prototype.setFlipPageMode = function(mode) {
    if ("number" != typeof mode || 0 > mode || mode > 3) throw "App.setFlipPageMode 方法调用错误：请提供以下正确的参数（0:禁用翻页、1:启用上下翻页、2:仅启用向上翻页、3:仅启用向下翻页）";
    switch (mode) {
        case 0:
            this._isDisableFlipPage = true;
            this._isDisableFlipPrevPage = true;
            this._isDisableFlipNextPage = true;
            break;
        case 1:
            this._isDisableFlipPage = false;
            this._isDisableFlipPrevPage = false;
            this._isDisableFlipNextPage = false;
            break;
        case 2:
            this._isDisableFlipPage = false;
            this._isDisableFlipPrevPage = false;
            this._isDisableFlipNextPage = true;
            break;
        case 3:
            this._isDisableFlipPage = false;
            this._isDisableFlipPrevPage = true;
            this._isDisableFlipNextPage = false;
    }
};