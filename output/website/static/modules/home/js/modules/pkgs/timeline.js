define('js/modules/pkgs/timeline', ['require', 'exports', 'module', "jquery", "js/modules/apis/api-aio", "js/modules/libs/arttemplate/arttemplate"],function(require, exports, module) {
var $ = require("jquery");
var API = require("js/modules/apis/api-aio");
var calander365_url = "/activity/axislist";
var template = require("js/modules/libs/arttemplate/arttemplate");

// 时间轴父类
var Timeline = function(opt) {
    if (opt) {
        this.oyear = opt.year;
        this.omonth = opt.month;
        this.oday = opt.day;
        this.year = opt.year;
        this.month = opt.month;
        this.day = opt.day;
    }
    this._storagePre = "idy365tl_";
    this.ajaxing = false;
    this.storage = window.localStorage;
};

Timeline.prototype._formatDate = function(year, month, day) {
    return "" + year + "-" + this._zerofix(month) + (day ? "-" + this._zerofix(day) : "");
};

Timeline.prototype._zerofix = function(num) {
    return num < 10 ? "0" + num : num;
};

Timeline.prototype._getMonthDayNum = function(year, month) {
    return new Date(year, month, 0).getDate();
};

Timeline.prototype._getDays = function(year, month, day) {
    return ((new Date(year, month - 1, day, 8, 0, 0) - 0) / 1000) / 3600 / 24;
};

Timeline.prototype.init = function() {
    this.emptyStorage();
    this.bindEvent();
    this.showToday();
};

Timeline.prototype.emptyStorage = function() {
    var reg = new RegExp(this._storagePre + "[\s\S]*");
    for (var item in this.storage) {
        if (reg.test(item)) {
            delete this.storage[item];
        }
    }
};

Timeline.prototype.bindEvent = function() {};

Timeline.prototype.showToday = function() {};

Timeline.prototype.setBgcolor = function() {};

Timeline.prototype.getData = function(year, month, callback) {
    var that = this;
    // 判断localStorage里是否缓存
    var storageData = this.storage[this._storagePre + that._formatDate(year, month)];
    if (storageData) {
        callback(JSON.parse(storageData));
        return false;
    }
    if (this.ajaxing) {
        setTimeout(function() {
            that.getData(year, month, callback);
        }, 200);
        return false;
    }
    this.ajaxing = true;
    $.ajax({
            url: calander365_url,
            type: 'GET',
            dataType: 'json',
            data: {
                month: that._formatDate(year, month)
            },
        })
        .done(function(data) {
            if (data.code == "0" || data.code == "1002") {
                for (var key in data.data) {
                    if (data.data.hasOwnProperty(key)) {
                        data.data[key].act_price = that.formatPrice(data.data[key].act_price);
                    }
                }
                callback(data.data);
                that.storage[that._storagePre + that._formatDate(year, month)] = JSON.stringify(data.data);
            }
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            that.ajaxing = false;
            console.log("complete");
        });
};

Timeline.prototype.showOne = function($obj) {
    var that = this;
    var theScreen = this._parent.find(".screen");
    var data = $.extend({}, $obj.data());
    var html = "";
    //console.log(data);
    var _date = data.date.split("-");
    data.year = _date[0];
    data.month = _date[1];
    data.day = _date[2];
    console.log(data);
    // if (data.act_price) {
    //     data.act_price = this.formatPrice(data.act_price);
    // }
    if (data.id) {
        html = template("screen-tpl", data);
    } else {
        html = template("screen-noapply-tpl", data);
    }
    theScreen.stop().animate({
            opacity: 0
        },
        200,
        function() {

            theScreen.html(html);
            that.setBgcolor($obj);

            theScreen.css({
                opacity: 1
            });
        });
};
Timeline.prototype.formatPrice = function(price) {
    var str;
    price = parseInt(price);
    // if (price >= 1e4 && price < 1e8){
    //     str = Math.ceil(price/1e4)+"万";
    // } else if (price >= 1e8 && price < 1e12){
    //     str = Math.ceil(price/1e8)+"亿";
    // } else {
    //     return price;
    // }
    if (price >= 1e4 && price <= 1e6){
        str = (price/1e4).toFixed(2)+"万";
    } else if (price >= 1e7 && price < 1e10){
        str = (price/1e8).toFixed(2)+"亿";
    }else if (price >= 1e10 && price < 1e12){
        str = Math.ceil(price/1e8)+"亿";
    }else {
        return price;
    }
    return str;
};

module.exports = Timeline;
});