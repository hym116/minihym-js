define('js/modules/libs/ui/calendar/calendar', ['require', 'exports', 'module', "jquery"],function(require, exports, module) {
$ = require("jquery");
$.jcalendar = function(options) {
    this.options = {
        startVal: "",
        endVal: "",
        showInput: "",
        showWrapId: "",
        width: 400,
        wholewidth: true,
        initDate: "",
        calendarId: "calendarId",
        deflayerPos: {
            x: 0,
            y: 0,
            z: 10
        }, //输入的数据为空的时候显示的空层相当于输入框左下角的位置 以及z-index的值
        weekDayClassName: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        monthName: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        extendVal: "",
        extendInput: "",
        extendValKey: "",
        extendSelect: true,
        containerId: null,
        showType: "", //"UpToDown"，从上到下，“LeftToRight” 从左边到右边，默认是 淡入淡出；
        showSpeed: 0,
        passDayNoSel: false, //过去的日期不能选择，默认false，可以选择
        passMonNoSel: false, //过去的月份不能选择，默认false，可以选择
        monthCols: 1, //每次显示的月份的列数
        beginInfo: "", //如果传入一个字符串，则，可选日期必须在字符串之后，如果传入jq对象，则，可选日期必须在对象的值之后
        weekDayName: ["日", "一", "二", "三", "四", "五", "六"],
        cleanLink: false, //是否显示清楚链接，字符串为链接文字
        beforeShow: function(){},
        afterShow: function(){},
        beforeHide: function(){},
        afterHide: function(){}
    };

    this.today = new Date();

    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            this.options[key] = options[key];
        }
    }

    this.options.cellWidth = (1/7*100) + "%";

    this.formatTen = function(num) {
        return num > 9 ? (num + "") : ("0" + num);
    };

    this.formatDate = function(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
    };

    this.strTodate = function(strr) {
        var strr1 = strr.split('-');
        date1 = new Date(strr1[0], strr1[1] - 1, strr1[2]);
        if (date1 == "Invalid Date") {
            return false;
        }
        return date1;
    };

    this.show = function(initInput, width, beginInfo) {

        if (beginInfo) {
            this.options.beginInfo = beginInfo;
        }

        var obj = this;

        if (this.options.startVal) {
            this.startVal = obj.strTodate(this.options.startVal);
        }
        if (this.options.endVal) {
            this.endVal = obj.strTodate(this.options.endVal);
        }

        var $calendar = $("#" + this.options.calendarId);
        var showAct = true;
        if (initInput) {
            if (typeof(initInput) == "string") {
                showAct = false;
                this.options.initDate = initInput;
            } else {
                this.options.showInput = initInput;
                this.options.width = initInput.width();
                this.options.initDate = initInput.val();
            }
        }
        this.options.showInput.click(function() {
            return false;
        });
        $calendar.click(function() {
            return false;
        });
        if (width) {
            this.options.width = width;
        }
        this.options.cellWidth = (1/7*100) + "%";
        if ($calendar.length === 0) {
            var weekstr = "";
            for (var i = 0, len = this.options.weekDayName.length; i < len; i++) {
                weekstr += '<th class="dv_' + this.options.weekDayClassName[i] + ' ' + (i === 0 ? "dc_first" : "") + (i + 1 == len ? "dc_last" : "") + '" style="width:' + this.options.cellWidth + 'px">' + this.options.weekDayName[i] + '</th>';
            }
            var calendarStr = '';
            calendarStr += '<div id="' + this.options.calendarId + '" class="dv_dateCalendar" style="overflow:hidden;width:' + (this.options.width * this.options.monthCols) + 'px">';
            calendarStr += '<div class="dc_header" style="overflow:hidden;">';
            calendarStr += '<span class="dc_button dc_button_arrow dc_btn_prev"><</span>';
            calendarStr += '<span class="dc_button dc_button_arrow dc_btn_next">></span>';
            for (var o = 0; o < this.options.monthCols; o++) {
                // calendarStr+='<h4 style="width:'+parseInt(this.options.width/this.options.monthCols)+'px"></h4>';
                calendarStr += '<h4 style="float:left;width:' + ((1/this.options.monthCols*100) + "%") + ';"></h4>';
            }
            calendarStr += '</div>';
            // calendarStr+='<div class="dv_calendarBox" style="overflow:hidden;" style="width:'+this.options.width+'px">';
            calendarStr += '<div class="dv_calendarBox" style="overflow:hidden;">';

            for (var p = 0; p < this.options.monthCols; p++) {
                calendarStr += '<table class="tbl_box dc_border_separate" style="width:' + ((1/this.options.monthCols*100) + "%") + ';float:left;">';
                calendarStr += '<thead><tr class="dc_title colHeader">' + weekstr + '</tr></thead>';
                calendarStr += '<tbody></tbody>';
                calendarStr += '</table>';
            }
            if (this.options.cleanLink) {
                calendarStr += '<div class="dc_cleanlink"><a href="javascript:;">' + this.options.cleanLink + '</a></div>';
            }
            calendarStr += '</div>';
            calendarStr += '<div style="z-index:2;position:relative;" class="dc-showLoading"></div>';
            calendarStr += '</div>';
            $calendar = $(calendarStr);

            if (!(this.options.showWrapId)) {
                $("body").append($calendar);
                $calendar.show();
            } else {
                $("#" + this.options.showWrapId).append($calendar);
                $calendar.show();
            }
            this.$calendar = $calendar;
            $calendar.find(".dc_btn_prev").click(function(evt) {
                if (obj.options.passMonNoSel && $(this).hasClass("dc_past_month")) {
                    return false;
                }
                var today = obj.getToday();
                var month = today.getMonth();
                today.setMonth(today.getMonth() - 1);
                //today.getMonth()
                if (month == today.getMonth()) {
                    today.setMonth(month - 1);
                }
                obj.formatDate(today);
                obj.show(obj.formatDate(today), obj.options.width, obj.options.beginInfo);
            });
            $calendar.find(".dc_btn_next").click(function(evt) {
                if (obj.options.passMonNoSel && $(this).hasClass("dc_past_month")) {
                    return false;
                }
                var today = obj.getToday();
                var month = today.getMonth();
                today.setMonth(today.getMonth() + 1);
                if (today.getMonth() - month >= 2) {
                    today.setMonth(today.getMonth(), -1);
                }
                obj.formatDate(today);
                obj.show(obj.formatDate(today), obj.options.width, obj.options.beginInfo);
            });
            if (this.options.cleanLink) {
                $calendar.find(".dc_cleanlink a").click(function(evt) {
                    obj.options.showInput.val("");
                    $calendar.find(".dc_selected_date").removeClass("dc_selected_date");
                });
            }

        }
        this.addTable($calendar);
        // 设置位置

        if (this.options.beforeShow) {
            this.options.beforeShow(this);
        }

        var parentPos = this.options.showInput.offset();
        $calendar.css("position", "absolute");
        $calendar.css("left", parentPos.left + this.options.deflayerPos.x + "px");
        $calendar.css({
            "z-index": this.options.deflayerPos.z
        });
        $calendar.css("top", parentPos.top + this.options.showInput.innerHeight() + this.options.deflayerPos.y + "px");
        if (showAct) {
            $calendar.hide().show();
            if (this.options.showType == "UpToDown") {
                var h = $calendar.innerHeight();
                var pstop = $calendar.offset().top;
                $calendar.css({
                    top: pstop - h,
                    opacity: 0.01
                }).animate({
                    top: pstop,
                    opacity: 1
                }, this.options.showSpeed);
            } else if (this.options.showType == "LeftToRight") {
                var w = $calendar.innerWidth();
                var psleft = $calendar.offset().left;
                $calendar.css({
                    left: psleft - w,
                    opacity: 0.01
                }).animate({
                    left: psleft,
                    opacity: 1
                }, this.options.showSpeed);
            } else {
                $calendar.css({
                    opacity: 0.01
                }).animate({
                    opacity: 1
                }, this.options.showSpeed);
            }
        }

        if (this.options.afterShow) {
            this.options.afterShow(this);
        }
    };

    this.addTable = function($calendar, data) {
        var that = this;
        var selDate = this.options.initDate;
        var beginInfo = this.options.beginInfo;

        if (beginInfo.length > 0 && typeof(beginInfo) == "object") {
            if (beginInfo.val().length > 0) {
                beginInfo = this.strTodate(beginInfo.val());
            } else {
                beginInfo = false;
            }

        } else if (beginInfo.length > 0) {
            beginInfo = this.strTodate(beginInfo);
        } else {
            beginInfo = false;
        }
        if (selDate) {
            selDate = this.strTodate(selDate);
        } else if (beginInfo) {
            selDate = (beginInfo);
        } else {
            selDate = new Date();
        }
        var curMonth = selDate.getMonth();
        var curYear = selDate.getFullYear();

        var today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());


        for (var o = 0; o < this.options.monthCols; o++) {
            var dateStr = '';
            var monthFirst = new Date(curYear, curMonth + o, 1);
            var nextMonthFirst = new Date(curYear, curMonth + 1 + o, 1);
            var monthFirstWeekday = monthFirst.getDay();
            var monthTemp = new Date(curYear, curMonth + o);
            var monthDays = new Date(curYear, curMonth + 1 + o, -1).getDate() + 1;
            var lineCount = parseInt((monthDays + monthFirstWeekday) / 7);
            if ((monthDays + monthFirstWeekday) % 7 > 0) {
                lineCount++;
            }
            $calendar.find("h4").eq(o).html(curYear + '年' + this.options.monthName[curMonth + o > 11 ? curMonth + o - 12 : curMonth + o]);
            $calendar.find(".dc_today").removeClass("dc-state-disabled");
            for (var j = 0; j < lineCount; j++) {
                //if(monthTemp.getTime()>=nextMonthFirst.getTime())break;
                dateStr += '<tr class="dc-week ' + (j === 0 ? 'dc_first' : (j == lineCount - 1) ? "dc_last" : "") + '">';
                for (var i = 0; i < 7; i++) {
                    monthTemp = new Date(curYear, curMonth + o, 1);
                    var tempfix = j * 7 + i - monthFirstWeekday;
                    monthTemp.setDate(monthFirst.getDate() + tempfix);
                    var monthTempStr = this.formatDate(monthTemp);
                    var percent = "";
                    var content = "";
                    var classN = "dc_day dc_" + this.options.weekDayClassName[i];
                    if (i === 0) {
                        classN += " dc_first";
                    } else if (i == 6) {
                        classN += " dc_last";
                    }
                    if (tempfix < 0 || tempfix >= monthDays) {
                        classN += " dc_other_month";
                    } else {

                    }

                    if (monthTemp.getTime() > today.getTime()) {
                        classN += " dc_fcture_date";
                    } else if (monthTemp.getTime() < today.getTime()) {
                        classN += " dc_past_date";
                    } else {
                        classN += " dc_today";
                        $calendar.find(".dc_today").addClass("dc-state-disabled");
                    }
                    if (monthTempStr == this.options.showInput.val()) {
                        classN += " dc_selected_date";
                    }
                    if (beginInfo && this.formatDate(beginInfo) > monthTempStr) {
                        classN += " dc_unclick";
                    }
                    var dDate = "data=\"" + monthTempStr + "\"";
                    var dataContent = '<div class="dc_day_number">' + monthTemp.getDate() + '</div>';

                    if (this.options.extendVal && this.options.extendVal[monthTempStr]) {
                        dataContent += '<div class="dc_day_extendval">' + this.options.extendVal[monthTempStr][this.options.extendValKey] + '</div>';
                    }
                    dateStr += "<td class='" + classN + "' " + dDate + ">" + dataContent + "</td>";
                }
                dateStr += "</tr>";
                $calendar.find("tbody").eq(o).html(dateStr);
            }
            if (monthFirst <= that.startVal && o === 0) {
                $calendar.find(".dc_btn_prev").addClass("dc_past_month");
            } else if (o === 0) {
                $calendar.find(".dc_btn_prev").removeClass("dc_past_month");
            }

            if (nextMonthFirst > that.endVal && o === 0) {
                $calendar.find(".dc_btn_next").addClass("dc_past_month");
            } else if (o === 0) {
                $calendar.find(".dc_btn_next").removeClass("dc_past_month");
            }
            // 注释后，只生成数据区间
            if (monthFirst < today && o === 0){
                $calendar.find(".dc_btn_prev").addClass("dc_past_month");
            } else if (o === 0) {
                $calendar.find(".dc_btn_prev").removeClass("dc_past_month");
            }
        }
        $calendar.find("td").click(function(evt) {
            if (that.options.extendVal && that.options.extendSelect) {
                if ($(this).find(".dc_day_extendval").length === 0) {
                    return false;
                }
            }
            if ($(this).hasClass("dc_unclick")) {
                return false;
            }
            var data = this.getAttribute("data");
            if (that.options.passDayNoSel && $(this).hasClass("dc_past_date")) return false;
            $calendar.find(".dc_selected_date").removeClass("dc_selected_date");
            $(this).addClass("dc_selected_date");
            that.options.showInput.val(data).trigger("change");
            if (that.options.extendVal && that.options.extendSelect && that.options.extendInput) {
                var extend = $(this).find('.dc_day_extendval').text();
                that.options.extendInput.val(extend);
            }
            //$calendar.hide();
        });
    };

    this.getToday = function(){
        var today;
        var obj = this;
        if (obj.options.initDate) {
            today = obj.strTodate(obj.options.initDate);
        } else if (obj.options.beginInfo) {
            today = obj.strTodate(typeof(obj.options.beginInfo) == "object" ? obj.options.beginInfo.val() : obj.options.beginInfo);
        } else {
            today = new Date();
        }
        return today;
    };

    this.hide = function() {
        if (this.options.beforeHide) {
            this.options.beforeHide(this);
        }

        this.$calendar.hide();

        if (this.options.beforeHide) {
            this.options.beforeHide(this);
        }
    };
};
return $.jcalendar;
});