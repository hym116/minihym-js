var Flippage = (function(main) {
    console.log("app init");
    this._$app = main; //a
    this._$pages = this._$app.find(".page");
    this.$currentPage = this._$pages.eq(0);
    this._isFirstShowPage = true;
    this._isInitComplete = false;
    this._isDisableFlipPage = false;
    this._isDisableFlipPrevPage = false;
    this._isDisableFlipNextPage = false;
    var that = this, // b
        $window = $(window); //c
    (function() {
        $window.on("scroll.elasticity", function(event) {
            event.preventDefault();
        }).on("touchmove.elasticity", function(event) {
            event.preventDefault();
        }).on("doubleTap", function(event) {
            event.preventDefault();
        }).on( "mousemove", "img",function(event) {
            event.preventDefault();
        });
    })();
    $window.on("load", function() {
        var current = null, // a
            c = null,
            e = true,
            pageX = 0, // f
            pageY = 0, // g
            h = 0,
            i = 0,
            j = false,
            k = false,
            l = true;
        that._$app.on("touchstart", function(event) {
            window.estart = event;
            if (!that._isDisableFlipPage) {
                current = that._$pages.filter(".z-current").get(0);
                c = null;
                if(current){
                    j = true;
                    k = false;
                    l = true;
                    h = 0;
                    i = 0;

                    if ("mousedown" == event.type) {
                        pageX = event.pageX;
                        pageY = event.pageY;
                    }else{
                        pageX = event.touches[0].pageX;
                        pageY = event.touches[0].pageY;
                    }
                    current.classList.add("z-move");
                    current.style.webkitTransition = "none";
                }
            }
        });
        that._$app.on("mousemove touchmove", function(event) {
            window.emove = event;

            if (j && (c || l)){
                if ("mousemove" == event.type) {
                    h = event.pageX - pageX;
                    i = event.pageY - pageY;
                } else {
                    h = event.touches[0].pageX - pageX;
                    i = event.touches[0].pageY - pageY;
                }

            }

            if (Math.abs(i) > Math.abs(h)) {
                if (i > 0) {
                    if (that._isDisableFlipPrevPage) {
                        return;
                    }
                    if (!k) {
                        if (l) {
                            k = false;
                            l = false;
                            if(c) {
                                c.classList.remove("z-active");
                                c.classList.remove("z-move");
                            }

                            if(current.previousElementSibling && current.previousElementSibling.classList.contains("page")){
                                c = current.previousElementSibling;
                            }else{
                                if(e){
                                    c = that._$pages.last().get(0);
                                } else {
                                    c = false;
                                }
                            }
                            if(c){
                                if (c.classList.contains("page")) {
                                    c.classList.add("z-active");
                                    c.classList.add("z-move");
                                    c.style.webkitTransition = "none";
                                    c.style.webkitTransform = "translateY(-100%)";
                                    $(c).trigger("active");
                                    current.style.webkitTransformOrigin = "bottom center";
                                } else {
                                    current.style.webkitTransform = "translateY(0px)";
                                    c = null;
                                }
                            }
                        } else {
                            current.style.webkitTransform = "translateY(" + i + "px)";
                            c.style.webkitTransform = "translateY(-" + (window.innerHeight - i) + "px)";
                        }
                    }
                } else if (0 > i) {
                    if (that._isDisableFlipNextPage) {
                        return;
                    }
                    if (!k) {
                        if (l) {
                            k = true;l = false;
                            if (c) {
                                c.classList.remove("z-active");
                                c.classList.remove("z-move");
                            }
                            if (current.nextElementSibling && current.nextElementSibling.classList.contains("page")) {
                                c = current.nextElementSibling;
                            }else{
                                c = that._$pages.first().get(0);
                                e = true;
                            }
                            if(c && c.classList.contains("page")){
                                c.classList.add("z-active");
                                c.classList.add("z-move");
                                c.style.webkitTransition = "none";
                                c.style.webkitTransform = "translateY(" + window.innerHeight + "px)";
                                $(c).trigger("active");
                                current.style.webkitTransformOrigin = "top center";
                            } else {
                                current.style.webkitTransform = "translateY(0px)";
                                c = null;
                            }
                        } else {
                            current.style.webkitTransform = "translateY(" + i + "px)";
                            c.style.webkitTransform = "translateY(" + (window.innerHeight + i) + "px)";
                        }
                    }
                }
            }

        });
        that._$app.on("mouseup touchend", function() {
            if(j){
                j = false;
                if(c){
                    that._isDisableFlipPage = true;
                    current.style.webkitTransition = "-webkit-transform 0.3s ease-out";
                    c.style.webkitTransition = "-webkit-transform 0.3s ease-out";
                    if (Math.abs(i) > Math.abs(h) && Math.abs(i) > 100) {
                        if(k){
                            current.style.webkitTransform = "translateY(-" + window.innerHeight + "px)";
                            c.style.webkitTransform = "translateY(0px)";
                        }else{
                            current.style.webkitTransform = "translateY(" + window.innerHeight + "px)";
                            c.style.webkitTransform = "translateY(0px)";
                        }
                    }
                    setTimeout(function() {
                        c.classList.remove("z-active");
                        c.classList.remove("z-move");
                        c.classList.add("z-current");
                        current.classList.remove("z-current");
                        current.classList.remove("z-move");
                        that._isDisableFlipPage = false;
                        $(current).trigger("hide");
                        that.$currentPage = $(c).trigger("current");
                    }, 500);
                } else {
                    if(k){
                        current.style.webkitTransform = "translateY(0px)";
                        c.style.webkitTransform = "translateY(100%)";
                    }else{
                        current.style.webkitTransform = "translateY(0px)";
                        c.style.webkitTransform = "translateY(-100%)";
                    }
                    setTimeout(function() {
                        $(current).trigger("current");
                        c.classList.remove("z-active");
                        c.classList.remove("z-move");
                        that._isDisableFlipPage = false;
                    }, 500);
                }
            }else{
                current.classList.remove("z-move");
                that._isDisableFlipPage = false;
            }
        });
    });
    $window.on("load", function() {
        var guideWrap = '<div class="u-guideWrap"><a href="javascript:void(0);" class="u-guideTop z-move"></a></div>';
        //that._$pages.not(that._$pages.last()).append(guideWrap);
        that._$pages.append(guideWrap);
    });
    $window.on("load", function() {
        var loading = $("#app-loading");
        loading.addClass("z-hide");
        loading.on("webkitTransitionEnd", function() {
            loading.remove();
        });
        that._isInitComplete = true;
        that.showPage();
    });
});
Flippage.prototype.showPage = function(index) {
    var that = this;
    if (!window._app_showPage) {
        window._app_showPage = function(index) {
            var showPage, type = typeof index;
            switch (type) {
                case "number":
                    showPage = this._$pages.eq(index);
                    break;
                case "string":
                    showPage = this._$pages.filter(index).first();
                    break;
                case "object":
                    showPage = $(index);
            }
            if (!(!this._isFirstShowPage || showPage && showPage.length) ) {
                showPage = this.$currentPage;
                this._isFirstShowPage = false;
            }
            if (showPage && showPage.length){
                this._$pages.filter(".z-current").removeClass("z-current");
                showPage.css("-webkit-transform", "none").addClass("z-current");
                showPage.trigger("current");
                this.$currentPage = showPage;
            }
        };
    }
    if (this._isInitComplete) {
        window._app_showPage.apply(that, [index]);
    } else {
        $(window).one("load", function() {
            window._app_showPage.apply(that, [index]);
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
var flippage = new Flippage($("body"));
