var $ = require("jquery");
var Timeline = require("pkgs/timeline");
var template = require("arttemplate");
// 按星期查看
var WeekScroll = function(opt) {
    Timeline.call(this, opt);
    this._parent = $(".hand_week");
    this._step = 0;
    this._animating = false;
};
WeekScroll.prototype = new Timeline();

WeekScroll.prototype.bindEvent = function() {
    var that = this;
    $(document).on("click", "#weekview .left_arrow", function() {
        that.prev();
    });
    $(document).on("click", "#weekview .right_arrow", function() {
        that.next();
    });
    $(document).on("click", "#weekview .check_today", function() {
        that.showToday();
    });
    this._parent.on("click", "li", function() {
        var cur = $(this);
        var index = cur.index();
        var step = index - 8;
        if (!cur.hasClass('other')) {
            that.showOne(cur);
            // 动作等
            cur.addClass("active").siblings().removeClass("active");
            that.go(step);
        }
    });
};

WeekScroll.prototype.setBgcolor = function($obj) {
    //onsole.log($obj);
    var theScreen = this._parent.find(".screen");
    theScreen.removeClass("green blue orange red yellow purple cyan");
    //console.log(theScreen);
    if ($obj.hasClass("li0")) {
        theScreen.addClass('blue');
    } else if ($obj.hasClass("li1")) {
        theScreen.addClass('orange');
    } else if ($obj.hasClass("li2")) {
        theScreen.addClass('red');
    } else if ($obj.hasClass("li3")) {
        theScreen.addClass('yellow');
    } else if ($obj.hasClass("li4")) {
        theScreen.addClass('purple');
    } else if ($obj.hasClass("li5")) {
        theScreen.addClass('cyan');
    } else if ($obj.hasClass("li6")) {
        theScreen.addClass('green');
    } else {
        theScreen.addClass('blue');
    }
};

WeekScroll.prototype.showToday = function() {
    var that = this;
    var oMonthNumber = this._getMonthDayNum(this.oyear, this.omonth);
    var day = this.oday;
    this.year = this.oyear;
    this.month = this.omonth;
    this.day = this.oday;

    // 取以今天为中心的17条数据
    if (day <= 8) {

        this.getData(this.oyear, this.omonth, function(data) {
            that.getData(this.oyear, this.omonth - 1, function(data2) {
                var _data = $.extend({}, data, data2);
                _callback(_data);
            });
        });

    } else if (day >= (oMonthNumber - 8)) {

        this.getData(this.oyear, this.omonth, function(data) {
            that.getData(this.oyear, this.omonth + 1, function(data2) {
                var _data = $.extend({}, data, data2);
                _callback(_data);
            });
        });

    } else {

        this.getData(this.oyear, this.omonth, function(data) {
            var _data = data;
            _callback(_data);
        });
    }

    function _callback(data) {
        var html = that.randerHTML(data);
        that.setContent(html);
        that._parent.find("li").eq(8).trigger("click");
    }

};

WeekScroll.prototype.parseData = function(data) {
    var that = this;
    var list = {};
    var result = {};
    var products = data;
    // 取以今天为中心的17条数据
    var number = 17;
    var __data;
    //console.log(that.year, that.month, that.oday);
    for (var i = 0; i < number; i++) {
        __data = new Date(that.year, that.month - 1, that.day - 8 + i);
        list[that._formatDate(__data.getFullYear(), __data.getMonth() + 1, __data.getDate())] = null;
    }
    $.each(products, function(key, value) {
        if (key in list) {
            list[key] = value;
        }
    });

    result.list = list;
    result.length = number;

    result.day1Index = this._getDays(this.year, this.month, this.day) - 8;

    //console.log(result);
    return result;
};

WeekScroll.prototype.randerHTML = function(data) {
    var _data = this.parseData(data);
    var html = template("week-show-tpl", _data);
    return html;
};

WeekScroll.prototype.setContent = function(html) {
    this._parent.find("ul").html(html);
};

WeekScroll.prototype.go = function(stepx, callback) {
    // console.log("stepx:" + stepx);
    var that = this;
    var _ul = this._parent.find("ul");
    var _lis = _ul.find("li");
    var _width = _ul.find("li").eq(0).outerWidth();
    var today = {
        year: that.year,
        month: that.month,
        day: that.day
    };
    var hideLis, removeLis, showLis, grayLis, grayLis2;
    var _htmls = [];
    var _htmla = "";
    // console.log(today);
    var after = function() {};

    function _callback() {
        that._step--;
        // console.log("3:this._step:" + that._step);

        if (that._step === 0) {
            // console.log(_htmls);
            for (var i = 0; i < _htmls.length; i++) {
                _htmla += _htmls[i];
            }
            after(_htmla);
        }
    }

    function _callback2() {
        if (!hideLis.is(":animated") && !removeLis.is(":animated") && !showLis.is(":animated") && !grayLis.is(":animated") && !grayLis2.is(":animated")) {
            that._animating = false;
            if (stepx < 0) {
                console.log("prev");
                _ul.prepend(_htmla);
            } else if (stepx > 0) {
                console.log("next");
                _ul.append(_htmla);
            }
            if (callback) {
                callback();
            }
        }
    }

    // 各种异步锁
    // console.log("1:this._step:" + this._step);
    // console.log("1:this._step:" + this._step);
    // console.log("2:this._animating:" + this._animating);
    if (this._step > 0 || this._animating) {
        return false;
    }

    this._animating = true;

    if (stepx < 0) {
        // 左
        step = -stepx;

        this._step = step;


        removeLis = _lis.filter(function(index) {
            return index > 17 - 1 - step;
        });

        showLis = _lis.filter(function(index) {
            return (index < 4 && index >= (4 - step));
        });

        hideLis = _lis.filter(function(index) {
            return (index <= 12 && index > (12 - step));
        });

        grayLis = _lis.filter(".gray");

        grayLis2 = _lis.filter(function(index) {
            return (index === 4 - step || index === 12 - step);
        });

        after = function(_htmla) {
            _ul.css("text-align", "right");

            removeLis.animate({
                    width: 0,
                    margin: 0
                },
                200,
                function() {
                    $(this).remove();
                    _callback2();
                });

            showLis.animate({
                opacity: 1
            }, 200, function() {
                showLis.removeClass('hidden');
                _callback2();
            });

            grayLis.animate({
                opacity: 0
            }, 200, function() {
                $(this).removeClass('gray');
                grayLis2.addClass('gray');
                $(this).not(hideLis).animate({
                    opacity: 1
                }, 200, function() {
                    _callback2();
                });
                _callback2();
            });

            hideLis.animate({
                opacity: 0
            }, 200, function() {
                hideLis.addClass('hidden');
                _callback2();
            });
        };

        (function() {
            for (var i = step; i > 0; i--) {
                (function(i) {
                    that.getSingleHtml(-9 - i, today, function(html) {
                        _htmls[step - i] = html;
                        _callback();
                    });
                })(i);
            }

            var __day = new Date(that.year, that.month - 1, that.day - step);
            that.year = __day.getFullYear();
            that.month = __day.getMonth() + 1;
            that.day = __day.getDate();
        })();

    } else if (stepx > 0) {
        // 右
        step = stepx;

        this._step = step;
        // console.log("2:this._step:" + this._step);

        removeLis = _lis.filter(function(index) {
            return index < step;
        });

        showLis = _lis.filter(function(index) {
            return (index >= 13 && index < 13 + step);
        });

        hideLis = _lis.filter(function(index) {
            return (index >= 4 && index < 4 + step);
        });

        grayLis = _lis.filter(".gray");

        grayLis2 = _lis.filter(function(index) {
            return (index === 4 + step || index === 12 + step);
        });

        after = function() {

            _ul.css("text-align", "left");

            removeLis.animate({
                    width: 0,
                    margin: 0
                },
                200,
                function() {
                    $(this).remove();
                    _callback2();
                });

            showLis.animate({
                opacity: 1
            }, 200, function() {
                showLis.removeClass('hidden');
                _callback2();
            });

            grayLis.animate({
                opacity: 0
            }, 200, function() {
                $(this).removeClass('gray');
                grayLis2.addClass('gray');
                $(this).not(hideLis).animate({
                    opacity: 1
                }, 200, function() {
                    _callback2();
                });
                _callback2();
            });

            hideLis.animate({
                opacity: 0
            }, 200, function() {
                hideLis.addClass('hidden');
                _callback2();
            });
        };

        (function() {
            for (var j = 0; j < step; j++) {
                // console.log("5:step:" + step);
                (function(j) {
                    that.getSingleHtml(9 + j, today, function(html) {
                        _htmls[j] = html;
                        _callback();
                        // console.log("4:this._step:" + that._step);
                    });
                })(j);
            }

            var __day = new Date(that.year, that.month - 1, that.day + step);
            that.year = __day.getFullYear();
            that.month = __day.getMonth() + 1;
            that.day = __day.getDate();
        })();

    } else {
        this._animating = false;
    }
};

WeekScroll.prototype.getSingleHtml = function(day, today, callback) {
    var that = this;
    var _theDay = theDayLater(day, today);
    getSingleData(_theDay.year, _theDay.month, _theDay.day, function(single) {
        var result = {};
        result.list = single;

        result.day1Index = that._getDays(_theDay.year, _theDay.month, _theDay.day);

        var html = template("week-show-tpl", result);
        callback(html);
    });

    function theDayLater(day, today) {
        var __day = new Date(today.year, today.month - 1, today.day + day);
        return {
            year: __day.getFullYear(),
            month: __day.getMonth() + 1,
            day: __day.getDate()
        };
    }

    function getSingleData(year, month, day, callback) {
        that.getData(year, month, function(res) {
            var key = that._formatDate(year, month, day);
            var single = {};
            single[key] = res[key];
            callback(single);
        });

    }
};

WeekScroll.prototype.next = function() {
    this._parent.find(".active").next().trigger("click");
};

WeekScroll.prototype.prev = function() {
    this._parent.find(".active").prev().trigger("click");
};

module.exports = WeekScroll;