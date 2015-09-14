define('js/modules/app/activity-baiying-edit', ['require', 'exports', 'module', "jquery", "js/modules/libs/ui/popup/popup", "js/modules/libs/ui/calendar/calendar", "js/modules/libs/arttemplate/arttemplate", "js/modules/pkgs/jUploader", "js/modules/apis/api-aio"],function(require, exports, module) {
$ = require("jquery");
var Boxy = require("js/modules/libs/ui/popup/popup");
var calendar = require("js/modules/libs/ui/calendar/calendar");
var template = require("js/modules/libs/arttemplate/arttemplate");
require("js/modules/pkgs/jUploader");
var API = require("js/modules/apis/api-aio");
var delOrderUrl = API.getUrl("UCENTER","ORDER_DELETE");
var simpleModuleUrl = API.getUrl("ACTIVITY","BAIYING_SIMPLE_DATA");
var publicUrl = API.getUrl("ACTIVITY","PUBLISH_DIY");
var loginUrl = API.getUrl("USER","LOGIN");

if($("body")[0].id === "activity_applybaiying"){

    publicUrl = API.getUrl("ACTIVITY","PUBLISH_OF");
}

$.jUploader.setDefaults({
    cancelable: false,
    allowedExtensions: ['jpg', 'jpeg', 'png'],
    messages: {
        upload: '上传',
        cancel: '取消',
        emptyFile: "{file} 为空，请选择一个文件.",
        invalidExtension: "{file} 后缀名不合法. 只有 {extensions} 是允许的.",
        onLeave: "文件正在上传，如果你现在离开，上传将会被取消。"
    },
    showMessage: function(message) {
        Boxy.alert(message);
    }
});

// AutoSave 类
function AutoSave(options) {
    this.init(options);
}

AutoSave.prototype.init = function(options) {
    this.url = options.url || "";
    this.waiting = options.waiting || 1000;
    this.savingObj = options.savingObj || false;

    this.T = null;
    this.xhr = null;
    this.ajaxing = false;
};

AutoSave.prototype.save = function(postData, callback) {

    clearTimeout(this.T);
    var that = this;

    this.T = setTimeout(function() {
        if (that.xhr && that.ajaxing) {
            that.xhr.abort();
            that.savingObj.hide();
        }

        if (that.ajaxing) {
            return false;
        }

        that.ajaxing = true;
        that.savingObj.show();

        that.xhr = $.ajax({
                url: that.url,
                type: 'POST',
                dataType: 'json',
                data: postData
            })
            .done(function(data) {
                if (callback) {
                    callback(data);
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                that.ajaxing = false;
                that.savingObj.hide();
                console.log("complete");
            });
    }, that.waiting);

};


$(function() {
    
    updateLastStepNum();

    function hidePriceImgTip(){
        $(".add_imgselect").each(function(){
            if($(this).find("img").length && $(this).find("img").attr("src").length){
                $(this).find(".tip-right").hide();
            }
        });
    }
    hidePriceImgTip();

    $(".allready .button").click(function() {
        var idVal = $("#rel_id").val();
        $.ajax({
                url: publicUrl,
                type: 'POST',
                dataType: 'json',
                data: {
                    id: idVal
                },
            })
            .done(function(data) {
                if (data.code === 0) {
                    Boxy.alert(data.msg,function(){
                        location.href = "/"+data.data.url;
                    });
                } else {
                    Boxy.alert(data.msg);
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    });
    var lastStep = $(".steptip .num").text();
    var tlp = '<div class="activity-alert">' +
        '<div class="a-title">您已申请了<span>一呼百应</span>代言方式</div>' +
        '<div class="a-last-step">' + lastStep + '</div>' +
        '<div class="a-text">要发布您的活动，还需要完成一些步骤</div>' +
        '<div class="bluebtn close">继续</div>' +
        '</div>';
    if (lastStep > 0) {
        new Boxy('<div>' + tlp + '</div>', {
            modal: true,
            closeable: false,
            show: true
        });
    }
    

    var savingText = $('<div class="saving">保存中...</div>').appendTo(".main");

    function changeMenuStatus(step, status) {
        var menuLiStatus = $(".steps li").eq(step - 1).find(".status");
        if (status) {
            menuLiStatus.addClass("right");
        } else {
            menuLiStatus.removeClass("right");
        }
        updateLastStepNum();
    }

    function updateLastStepNum() {
        var num = $(".steps .status").not(".right").not(".ignore").not(".lock").length;
        $(".steptip .num").text(num);
        if (num === 0) {
            $(".steptip .allready").show();
            $(".steptip .laststep").animate({
                    marginTop: "-165px"
                },
                500);
        }
    }

    $('input[type="text"], textarea').each(function() {
        $(this).data("oldvalue", $(this).val());
    });

    function showDataErrorMsg(obj, msg) {
        var parent = obj.parent();
        var area = parent.find(".errormsg");
        if (area.length) {
            area.text(msg).show();
        } else {
            parent.append('<div class="errormsg">' + msg + '</div>');
        }
    }

    function hideDataErrorMsg(obj) {
        obj.parent().find(".errormsg").hide();
    }

    function autoSaveSimpleModule(step) {
        var relId = $("#rel_id").val();
        var parent = $(".step" + step);
        var attrId = parent.data("attrid");

        var autoSave = new AutoSave({
            url: simpleModuleUrl,
            waiting: 250,
            savingObj: savingText
        });

        parent.on("change blur", "input[type='text'], textarea", function() {
            var that = $(this);
            var oldValue = $(this).data("oldvalue") || '';
            var value = that.val();
            if (oldValue.length === "0") {
                that.data("oldvalue", "");
            }

            // 是否更改
            if (oldValue === value) {
                return false;
            }

            // 缓存
            that.data("oldvalue", value);

            // 验证
            var datatype = that.attr("datatype");
            var errormsg = that.attr("errormsg");
            var nullmsg = that.attr("nullmsg");

            var reg = /\/.+\//g;

            hideDataErrorMsg(that);

            // 日期验证
            if (that.hasClass("start_date") || that.hasClass("end_date")) {
                var start = $(".start_date").val();
                var end = $(".end_date").val();
                if (end && start >= end) {
                    showDataErrorMsg(that, "结束时间要大于开始时间！");
                    changeMenuStatus(step, false);
                    return false;
                }
            }

            if (nullmsg && $.trim(value).length === 0) {
                //console.log(nullmsg);
                showDataErrorMsg(that, nullmsg);
                changeMenuStatus(step, false);
                updateLastStepNum();
                return false;
            }

            if (datatype && errormsg && reg.test(datatype)) {
                var regstr = datatype.match(reg)[0].slice(1, -1);
                var param = datatype.replace(reg, "");
                var rexp = RegExp(regstr, param);

                if (!rexp.test(value)) {
                    showDataErrorMsg(that, errormsg);
                    changeMenuStatus(step, false);
                    return false;
                }
            }

            // 接口数据构建
            var ajaxData = {
                rel_id: relId,
                attrid: attrId,
                attval: value
            };
            if (that.hasClass("end_date")) {
                ajaxData.endtime = 1;
            }
            // 保存数据
            autoSave.save(ajaxData, function(data) {
                if (data.code === "0") {
                    // 成功且完成
                    changeMenuStatus(step, true);
                } else if (data.code === "1") {
                    // 成功未完成
                    changeMenuStatus(step, false);
                } else if (data.code === "1002") {
                    // 没登陆
                    location.href = loginUrl;
                } else {
                    changeMenuStatus(step, false);
                    console.log(data.msg);
                }

            });
        });
    }

    $(".steps li").click(function(e) {
        e.preventDefault();
        var that = $(this);
        if (that.hasClass("active")) {
            return false;
        }
        that.addClass("active").siblings().removeClass("active");
        var index = that.index();
        $(".main .step").eq(index).addClass("active").siblings().removeClass("active");
    });

    var editing = $(".main").hasClass("js-editpage");

    if (!editing) {

        /* 时间 */
        (function() {

            var parent = $(".step1");
            var step = 1;

            autoSaveSimpleModule(step);


            var beginInfo = getDateStr(3);

            var startDateInput = parent.find(".js-start-date-calendar").eq(0);
            if (startDateInput.length > 0) {
                var startDateCalendar = new $.jcalendar({
                    deflayerPos: {
                        x: 0,
                        y: 10,
                        z: 10
                    },
                    showInput: startDateInput,
                    calendarId: "start_date_calender",
                    monthCols: 1,
                    showSpeed: 300,
                    beginInfo: beginInfo,
                    cleanLink: "清除已选日期"
                });
                startDateCalendar.show(parent.find(".start_date").eq(0), 247);
                startDateCalendar.hide();

                $(".start_date").focus(function() {
                    startDateCalendar.show();
                    if (endDateCalendar && endDateCalendar.hide) {
                        endDateCalendar.hide();
                    }
                });


                var endDateInput = parent.find(".js-end-date-calendar").eq(0);
                if (endDateInput.length) {

                    var endDateCalendar = new $.jcalendar({
                        deflayerPos: {
                            x: 0,
                            y: 10,
                            z: 10
                        },
                        showInput: endDateInput,
                        calendarId: "end_date_calender",
                        monthCols: 1,
                        showSpeed: 300,
                        beginInfo: beginInfo,
                        cleanLink: "清除已选日期"
                    });
                    endDateCalendar.show(parent.find(".end_date").eq(0), 247);
                    endDateCalendar.hide();


                    $(".end_date").focus(function() {
                        endDateCalendar.show();
                        if (startDateCalendar && startDateCalendar.hide) {
                            startDateCalendar.hide();
                        }
                    });
                }

                $(document).click(function(e) {
                    if ($(e.target).closest(".dv_dateCalendar").length === 0) {
                        if (startDateCalendar && startDateCalendar.hide) {
                            startDateCalendar.hide();
                            startDateInput.trigger("blur");
                        }
                        if (endDateCalendar && endDateCalendar.hide) {
                            endDateCalendar.hide();
                            endDateCalendar.trigger("blur");
                        }
                    }
                });

            }

            function getDateStr(AddDayCount) {
                var dd = new Date();
                dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
                var y = dd.getFullYear();
                var m = dd.getMonth() + 1; //获取当前月份的日期
                var d = dd.getDate();
                return y + "-" + formatTen(m) + "-" + formatTen(d);
            }

            function formatTen(num) {
                return num > 9 ? (num + "") : ("0" + num);
            }

        })();

        /* 价格 */
        (function() {
            var step = 2;
            autoSaveSimpleModule(step);
        })();


        /* 数量 */
        (function() {
            var step = 3;
            autoSaveSimpleModule(step);
        })();

    }

        /* 人数 */
        (function() {
            var step = 4;
            autoSaveSimpleModule(step);
        })();

    /* 评价 */
    (function() {

        var parent = $(".step5");
        // var attrId = parent.data("attrid");
        var step = 5;
        autoSaveSimpleModule(step);

        var textarea = parent.find("#comment");
        var numText = textarea.siblings(".tips").find("span");


        textNum({
            textarea: textarea,
            num: numText,
            maxNum: 140
        });

    })();

    /* 视频 */
    (function() {

        var parent = $(".step6");
        var step = 6;

        autoSaveSimpleModule(step);

    })();

    function textNum(options) {
        var maxNum = options.maxNum || 140;
        options.textarea.keyup(function() {
            var text = $(this).val();
            var textNum = text.length;
            if (maxNum - textNum >= 0) {
                options.num.text(maxNum - textNum);
            } else {
                $(this).val(text.substr(0, maxNum));
            }
        });
    }

    $(".pic_box .js-uploader").each(function() {
        var step = 2;
        var that = $(this);
        var parent = that.closest(".step");
        var relId = $("#rel_id").val();
        var attrId = parent.data("attrid");

        var ajaxData = {
            rel_id: relId,
            attrid: attrId
        };

        var previewBox = parent.find(".image-preview");
        var _loading = $(imgLoadingHtml);

        $.jUploader({
            button: that, // 这里设置按钮id
            action: simpleModuleUrl, // 这里设置上传处理接口，这个加了参数test_cancel=1来测试取消
            attrName: "attr_val",
            otherData: ajaxData,
            onUpload:function(){
                previewBox.append(__loading);
            },
            // 上传完成事件
            onComplete: function(fileName, response) {
                // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
                console.log(response);
                _loading.remove();
                if (response.code === "0") {
                    rander(response.data.priceImg);
                    changeMenuStatus(step, true);
                } else if (response.code === "1005") {
                    rander(response.data.priceImg);
                    changeMenuStatus(step, false);
                } else {
                    changeMenuStatus(step, false);
                    console.log(response.msg);
                }

                function rander(imgurl) {
                    if (previewBox.find("img").length) {
                        previewBox.find("img").attr("src", '/' + imgurl);
                    } else {
                        previewBox.append('<img src="/' + imgurl + '">');
                    }
                    hidePriceImgTip();
                }
            }
        });
    });
    $(".left-tip").mouseenter(function(){
        var parent = $(this).closest(".help");

        if (parent.hasClass("show")) {
            $(".arrow-left").addClass("hover-right");
        } else {
            $(".arrow-left").addClass("hover-left");
        }
    });
    $(".left-tip").mouseleave(function() {
        var parent = $(this).closest(".help");
        if (parent.hasClass("show")) {
            $(".arrow-left").removeClass("hover-right");
        } else {
            $(".arrow-left").removeClass("hover-left");
        }
    });
    $(".right-btn").click(function(){
        var parent = $(this).closest(".help");
        var screen_width=$(window).width();
        var help_width=(screen_width-1000)/2+784+64;
        $(".con-wrap").width(help_width-250);
        $(".arrow-left").removeClass("hover-right");
            $(".arrow-left").removeClass("arrow-right");
            $(".tip-content").text("查看帮助");
            parent.animate({
                width: "64"
            }, 500, function() {
                parent.removeClass("show");
                $(".help-wrap").hide();
            });
    });
    $(".left-tip").click(function() {
        var parent = $(this).closest(".help");
        var screen_width=$(window).width();
        var help_width=(screen_width-1000)/2+784+64;
        $(".con-wrap").width(help_width-250);
        // alert(screen_width);
        if (parent.hasClass("show")) {
            $(".arrow-left").removeClass("hover-right");
            $(".arrow-left").removeClass("arrow-right");
            $(".tip-content").text("查看帮助");
            parent.animate({
                width: "64"
            }, 500, function() {
                parent.removeClass("show");
                $(".help-wrap").hide();
            });
        } else {
            $(".help-wrap").show();
            $(".tip-content").text("关闭帮助");
            $(".arrow-left").addClass("arrow-right");
            parent.animate({
                width: help_width + "px"
            }, 500, function() {
                parent.addClass("show");
            });
        }
    });
});
});