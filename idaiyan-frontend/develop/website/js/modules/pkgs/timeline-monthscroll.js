var $ = require("jquery");
var Timeline = require("pkgs/timeline");
var template = require("arttemplate");
// start_time
// 按月份查看
// 凑齐 38 个
var MonthScroll = function(opt) {
    Timeline.call(this, opt);
    this._parent = $(".hand_month");
};

MonthScroll.prototype = new Timeline();

MonthScroll.prototype.bindEvent = function() {
    var that = this;
    $(document).on("click", "#monthview .left_arrow", function() {
        that.prev();
    });
    $(document).on("click", "#monthview .right_arrow", function() {
        that.next();
    });
    $(document).on("click", "#monthview .check_today", function() {
        that.showToday();
    });
    this._parent.on("click", "li", function() {
        var cur = $(this);
        if (!cur.hasClass('other')) {
            that.showOne(cur);
            cur.addClass("active").siblings().removeClass("active");
        }
    });
};

MonthScroll.prototype.parseData = function(data) {
    var list = {};
    var result = {};
    var products = data;
    var monthNumber = this._getMonthDayNum(this.year, this.month);

    for (var i = 0; i < monthNumber; i++) {
        list[this._formatDate(this.year, this.month, (i + 1))] = null;
    }

    if (products) {
        $.each(products, function(key, value) {
            if (key in list) {
                list[key] = value;
            }
        });
    }

    result.list = list;
    result.length = monthNumber;
    result.month = this.month;
    result.day1Index = this._getDays(this.year, this.month, 1);
    result.length1 = Math.ceil((38 - monthNumber) / 4) * 2 - 1;
    result.center = 38 / 2 - result.length1;
    result.length2 = (38 - monthNumber) - result.length1;

    //console.log(result);
    return result;
};

MonthScroll.prototype.randerHTML = function(data) {
    var _data = this.parseData(data);
    var html = template("month-show-tpl", _data);
    return html;
};

MonthScroll.prototype.setContent = function(html) {
    this._parent.find("ul").html(html);
};

MonthScroll.prototype.setBgcolor = function($obj) {
    var theScreen = this._parent.find(".screen");
    theScreen.removeClass("green blue orange red yellow purple cyan");
    if ($obj.find(".li0").length) {
        theScreen.addClass('blue');
    } else if ($obj.find(".li1").length) {
        theScreen.addClass('orange');
    } else if ($obj.find(".li2").length) {
        theScreen.addClass('red');
    } else if ($obj.find(".li3").length) {
        theScreen.addClass('yellow');
    } else if ($obj.find(".li4").length) {
        theScreen.addClass('purple');
    } else if ($obj.find(".li5").length) {
        theScreen.addClass('cyan');
    } else if ($obj.find(".li6").length) {
        theScreen.addClass('green');
    } else {
        theScreen.addClass('blue');
    }
};

MonthScroll.prototype.showToday = function() {
    var that = this;
    this.getData(this.oyear, this.omonth, function(data) {
        that.year = that.oyear;
        that.month = that.omonth;
        var html = that.randerHTML(data);
        that.setContent(html);
        //console.log(that.oday-1);
        that._parent.find("li").not(".other").eq(that.oday - 1).trigger("click");
    }, true);
};

MonthScroll.prototype.showFirst = function() {
    this._parent.find(".begin").trigger("click");
};

MonthScroll.prototype.next = function() {
    var that = this;
    var month = this.month;
    var year = this.year;
    if (month == 12) {
        month = 1;
        year++;
    } else {
        month++;
    }
    this.getData(year, month, function(data) {
        that.year = year;
        that.month = month;
        var html = that.randerHTML(data);
        that.setContent(html);
        that.showFirst();
    });
};

MonthScroll.prototype.prev = function() {
    var that = this;
    var month = this.month;
    var year = this.year;
    if (month == 1) {
        month = 12;
        year--;
    } else {
        month--;
    }
    this.getData(year, month, function(data) {
        that.year = year;
        that.month = month;
        var html = that.randerHTML(data);
        that.setContent(html);
        that.showFirst();
    });
};

module.exports = MonthScroll;