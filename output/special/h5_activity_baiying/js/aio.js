define("modules/app/main", ["lib/zepto/zepto", "lib/zepto/selector", "units/lightAppAd", "lib/zepto/touch", "system/util/objectUtil", "units/globalAudio", "lib/zepto/coffee"], function(a, b, c) {
    var d = a("lib/zepto/zepto"),
        d = a("lib/zepto/selector");
    a("units/lightAppAd");
    var e = (a("units/globalAudio"), function(a) {
        console.log("app init");
        this._$app = a;
        this._$pages = this._$app.find(".page");
        this.$currentPage = this._$pages.eq(0);
        this._isFirstShowPage = !0;
        this._isInitComplete = !1;
        this._isDisableFlipPage = !1;
        this._isDisableFlipPrevPage = !1;
        this._isDisableFlipNextPage = !1;
        var b = this,
            c = d(window);
        ! function() {
            c.on("scroll.elasticity", function(a) {
                a.preventDefault()
            }).on("touchmove.elasticity", function(a) {
                a.preventDefault()
            }).on("doubleTap", function(a) {
                a.preventDefault()
            }), c.delegate("img", "mousemove", function(a) {
                a.preventDefault()
            })
        }(), c.on("load", function() {
            var a = null,
                c = null,
                e = !0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = !1,
                k = !1,
                l = !0;
            b._$app.on("touchstart", function(d) {
                window.estart = d, b._isDisableFlipPage || (a = b._$pages.filter(".z-current").get(0), c = null, a && (j = !0, k = !1, l = !0, h = 0, i = 0, "mousedown" == d.type ? (f = d.pageX, g = d.pageY) : (f = d.touches[0].pageX, g = d.touches[0].pageY), a.classList.add("z-move"), a.style.webkitTransition = "none"))
            }).on("mousemove touchmove", function(m) {
                if (window.emove = m, j && (c || l) && ("mousemove" == m.type ? (h = m.pageX - f, i = m.pageY - g) : (h = m.touches[0].pageX - f, i = m.touches[0].pageY - g), Math.abs(i) > Math.abs(h)))
                    if (i > 0) {
                        if (b._isDisableFlipPrevPage) return;
                        k || l ? (k = !1, l = !1, c && (c.classList.remove("z-active"), c.classList.remove("z-move")), c = a.previousElementSibling && a.previousElementSibling.classList.contains("page") ? a.previousElementSibling : e ? b._$pages.last().get(0) : !1, c && c.classList.contains("page") ? (c.classList.add("z-active"), c.classList.add("z-move"), c.style.webkitTransition = "none", c.style.webkitTransform = "translateY(-100%)", d(c).trigger("active"), a.style.webkitTransformOrigin = "bottom center") : (a.style.webkitTransform = "translateY(0px)", c = null)) : (a.style.webkitTransform = "translateY(" + i + "px)", c.style.webkitTransform = "translateY(-" + (window.innerHeight - i) + "px)")
                    } else if (0 > i) {
                    if (b._isDisableFlipNextPage) return;
                    !k || l ? (k = !0, l = !1, c && (c.classList.remove("z-active"), c.classList.remove("z-move")), a.nextElementSibling && a.nextElementSibling.classList.contains("page") ? c = a.nextElementSibling : (c = b._$pages.first().get(0), e = !0), c && c.classList.contains("page") ? (c.classList.add("z-active"), c.classList.add("z-move"), c.style.webkitTransition = "none", c.style.webkitTransform = "translateY(" + window.innerHeight + "px)", d(c).trigger("active"), a.style.webkitTransformOrigin = "top center") : (a.style.webkitTransform = "translateY(0px)", c = null)) : (a.style.webkitTransform = "translateY(" + i + "px)", c.style.webkitTransform = "translateY(" + (window.innerHeight + i) + "px)")
                }
            }).on("mouseup touchend", function() {
                j && (j = !1,
                    c ? (

                        b._isDisableFlipPage = !0, a.style.webkitTransition = "-webkit-transform 0.3s ease-out", c.style.webkitTransition = "-webkit-transform 0.3s ease-out", Math.abs(i) > Math.abs(h) && Math.abs(i) > 100 ? 
                        (
                            k ? (
                                a.style.webkitTransform = "translateY(-" + window.innerHeight + "px)", c.style.webkitTransform = "translateY(0px)"
                            ) : (
                                a.style.webkitTransform = "translateY(" + window.innerHeight + "px)", c.style.webkitTransform = "translateY(0px)"
                            )

                            , setTimeout(function() {
                                c.classList.remove("z-active"), c.classList.remove("z-move"), c.classList.add("z-current"), a.classList.remove("z-current"), a.classList.remove("z-move"), b._isDisableFlipPage = !1, d(a).trigger("hide"), b.$currentPage = d(c).trigger("current")
                            }, 500)
                        ) : (
                            k ? (
                                a.style.webkitTransform = "translateY(0px)", c.style.webkitTransform = "translateY(100%)"
                            ) : (
                                a.style.webkitTransform = "translateY(0px)", c.style.webkitTransform = "translateY(-100%)"
                            ),
                            setTimeout(function() {
                                d(a).trigger("current"), c.classList.remove("z-active"), c.classList.remove("z-move"), b._isDisableFlipPage = !1
                            }, 500))

                    ) : (

                        a.classList.remove("z-move"), b._isDisableFlipPage = !1
                    )

                )
            })
        }), c.on("load", function() {
            var a = '<div class="u-guideWrap"><a href="javascript:void(0);" class="u-guideTop z-move"></a></div>';
            b._$pages.not(b._$pages.last()).append(a)
        }), c.on("load", function() {
            var a = d("#app-loading");
            a.addClass("z-hide"), a.on("webkitTransitionEnd", function() {
                a.remove()
            }), b._isInitComplete = !0, b.showPage()
        })
    });
    e.prototype.showPage = function(a) {
        var b = this;
        window._app_showPage ? window._app_showPage : window._app_showPage = function(a) {
            var b, c = typeof a;
            switch (c) {
                case "number":
                    b = this._$pages.eq(a);
                    break;
                case "string":
                    b = this._$pages.filter(a).first();
                    break;
                case "object":
                    b = d(a)
            }!this._isFirstShowPage || b && b.length || (b = this.$currentPage, this._isFirstShowPage = !1), b && b.length && (this._$pages.filter(".z-current").removeClass("z-current"), b.css("-webkit-transform", "none").addClass("z-current"), b.trigger("current"), this.$currentPage = b)
        }, this._isInitComplete ? window._app_showPage.apply(b, [a]) : d(window).one("load", function() {
            window._app_showPage.apply(b, [a])
        })
    }, e.prototype.disableFlipPage = function() {
        this._isDisableFlipPage = !0
    }, e.prototype.enableFlipPage = function() {
        this._isDisableFlipPage = !1
    }, e.prototype.setFlipPageMode = function(a) {
        if ("number" != typeof a || 0 > a || a > 3) throw "App.setFlipPageMode 方法调用错误：请提供以下正确的参数（0:禁用翻页、1:启用上下翻页、2:仅启用向上翻页、3:仅启用向下翻页）";
        switch (a) {
            case 0:
                this._isDisableFlipPage = !0, this._isDisableFlipPrevPage = !0, this._isDisableFlipNextPage = !0;
                break;
            case 1:
                this._isDisableFlipPage = !1, this._isDisableFlipPrevPage = !1, this._isDisableFlipNextPage = !1;
                break;
            case 2:
                this._isDisableFlipPage = !1, this._isDisableFlipPrevPage = !1, this._isDisableFlipNextPage = !0;
                break;
            case 3:
                this._isDisableFlipPage = !1, this._isDisableFlipPrevPage = !0, this._isDisableFlipNextPage = !1
        }
    };
    var f = new e(d("body"));
    c.exports = f
})