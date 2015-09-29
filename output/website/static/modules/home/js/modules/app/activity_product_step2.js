define('js/modules/app/activity_product_step2', ['require', 'exports', 'module', "jquery", "js/modules/libs/ui/popup/popup", "js/modules/libs/ui/calendar/calendar", "js/modules/libs/arttemplate/arttemplate", "js/modules/pkgs/jUploader", "js/modules/apis/api-aio"],function(require, exports, module) {
$ = require("jquery");
var Boxy = require("js/modules/libs/ui/popup/popup");
var calendar = require("js/modules/libs/ui/calendar/calendar");
var template = require("js/modules/libs/arttemplate/arttemplate");
require("js/modules/pkgs/jUploader");

var API = require("js/modules/apis/api-aio");
var CHOISE_DATE_URL = API.getUrl("ACTIVITY", "CHOISE_DATE_URL");
var simpleModuleUrl = API.getUrl("GOODPRODUCT", "PRODUCT_SIMPLE_DATA");
var complexModuleUrl = API.getUrl("ACTIVITY", "D365_COMPLEX_DATA");
var publicUrl = API.getUrl("GOODPRODUCT", "PUBLISH");
var loginUrl = API.getUrl("USER", "LOGIN");
var userhomeUrl = API.getUrl("USERHOME", "LISTS");

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

// 初始化
AutoSave.prototype.init = function(options) {
    this.url = options.url || "";
    this.waiting = options.waiting || 1000;
    this.savingObj = options.savingObj || false;

    this.T = null;
    this.xhr = null;
    this.ajaxing = false;
};

// 保存
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

    updateLastStepNum(); // 更新剩余步骤数目

    // 隐藏价格图片提示信息
    function hidePriceImgTip() {
        $(".add_imgselect").each(function() {
            if ($(this).find("img").length && $(this).find("img").attr("src").length) {
                $(this).find(".tip-right").hide();
            }
        });
    }
    hidePriceImgTip();

    // 发布按钮点击
    $(".allready .button").click(function() {
        $.ajax({
                url: publicUrl,
                type: 'POST',
                dataType: 'json',
                data: {
                    id: rel_id
                },
            })
            .done(function(data) {
                if (data.code === 0) {
                    Boxy.alert(data.msg, function() {
                        location.href = "/" + data.data.url;
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

    // 剩余步骤数目
    var lastStep = $(".steptip .num").text();

    // 创建剩余步骤数目弹层HTML
    var tpl = '<div class="activity-alert">' +
        '<div class="a-title">您已申请了<span>中国好产品</span>活动</div>' +
        '<div class="a-last-step">' + lastStep + '</div>' +
        '<div class="a-text">要发布您的活动，还需要完成一些步骤</div>' +
        '<div class="bluebtn close">继续</div>' +
        '</div>';

    // 弹出剩余步骤数目弹层
    if (lastStep > 0) {
        new Boxy('<div>' + tpl + '</div>', {
            modal: true,
            closeable: false,
            show: true
        });
    }

    // 保存中提示的元素建立
    var savingText = $('<div class="saving">保存中...</div>').appendTo(".main");

    // 更新左侧目录状态
    function changeMenuStatus(step, status) {
        var menuLiStatus = $(".steps li").eq(step - 1).find(".status");
        if (status) {
            menuLiStatus.addClass("right");
        } else {
            menuLiStatus.removeClass("right");
        }
        updateLastStepNum();
    }

    // 更新剩余步骤数目
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

    // 初始化表单默认值缓存
    $('input[type="text"], textarea').each(function() {
        $(this).data("oldvalue", $(this).val());
    });

    // 输入错误类型提示方法
    function showDataErrorMsg(obj, msg) {
        var parent = obj.parent();
        var area = parent.find(".errormsg");
        if (area.length) {
            area.text(msg).show();
        } else {
            parent.append('<div class="errormsg">' + msg + '</div>');
        }
    }

    // 隐藏提示方法
    function hideDataErrorMsg(obj) {
        obj.parent().find(".errormsg").hide();
    }

    // 自动保存简单模型
    function autoSaveSimpleModule(step) {
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
            if (that.hasClass("end_date")) {
                attrId = 18;
            }
            var ajaxData = {
                rel_id: rel_id,
                attrid: attrId,
                attrval: value,
            };

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
                } else if (data.code === "1004") {
                    // 无法修改
                    Boxy.alert("活动产品已锁定，无法修改！", function() {
                        location.href = userhomeUrl;
                    });
                } else {
                    changeMenuStatus(step, false);
                    console.log(data.msg);
                }

            });
        });
    }

    // 自动保存复杂模型attrName
    var complexFields = "id,video_url,video_title,video_summary,pimage,desc," +
        "character_title,character_summary,partner_logo,partner_title";

    // 自动保存简单模型
    function autoSaveComplexModule(step) {
        var parent = $(".step" + step);
        var attrId = parent.data("attrid");
        var type = parent.data("type");
        var autoSave = new AutoSave({
            url: simpleModuleUrl,
            waiting: 250,
            savingObj: savingText
        });
        // 保存
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
            if (!$.trim(value).length) {
                Boxy.alert("写点什么吧！", function() {
                    that.focus();
                });
                return false;
            }


            var attrName = that.attr("name");
            if (attrName.length && !~complexFields.indexOf(attrName)) {
                return false;
            }

            var item = that.closest(".js-item-parent");
            var idInput = item.find(".data-id");
            var idVal = idInput.val();


            // 验证
            var datatype = that.attr("datatype");
            var errormsg = that.attr("errormsg");
            var nullmsg = that.attr("nullmsg");

            var reg = /\/.+\//g;

            hideDataErrorMsg(that);

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

            var ajaxData = {
                rel_id: rel_id,
                attrid: attrId,
                type: type,
                id: idVal
            };
            ajaxData[attrName] = that.val();

            // 图片
            if (attrName === "desc") {
                ajaxData.pos_id = 5;
            }

            autoSave.save(ajaxData, function(data) {
                if (data.code === "00") {
                    // 成功且完成
                    if (!(idVal.length) && data.data.id) {
                        idInput.val(data.data.id);
                    }
                    changeMenuStatus(step, true);
                } else if (data.code === "01") {
                    // 成功未完成
                    if (!(idVal.length) && data.data.id) {
                        idInput.val(data.data.id);
                    }
                    changeMenuStatus(step, false);
                } else if (data.code === "1001") {
                    // 没登陆
                    location.href = loginUrl;
                } else if (data.code === "1004") {
                    // 无法修改
                    Boxy.alert("活动产品已锁定，无法修改！", function() {
                        location.href = userhomeUrl;
                    });
                } else {
                    changeMenuStatus(step, false);
                    console.log(data.msg);
                }

            });
        });

        // 删除
        parent.on("click", ".delbtn", function() {

            if (!checkItemNum(step)) {
                return false;
            }

            var that = $(this);
            var item = that.closest(".js-item-parent");
            var idVal = item.find(".data-id").val();
            Boxy.confirm('<div class="js-delate"><h3>您确定要删除本项吗？</h3></div>', function() {
                if (idVal.length) {
                    var ajaxData = {
                        rel_id: rel_id,
                        attrid: attrId,
                        type: type,
                        delid: idVal
                    };
                    autoSave.save(ajaxData, function(data) {
                        if (data.code === "02") {
                            // 成功且完成
                            item.remove();
                        } else if (data.code === "1001") {
                            // 没登陆
                            location.href = loginUrl;
                        } else if (data.code === "1004") {
                            // 无法修改
                            Boxy.alert("活动产品已锁定，无法修改！", function() {
                                location.href = userhomeUrl;
                            });
                        } else {
                            changeMenuStatus(step, false);
                            console.log(data.msg);
                        }
                    });
                } else {
                    item.remove();
                }
            });
        });
    }

    // 校验复杂类型数量
    function checkItemNum(step, add) {
        var nowNum;
        var minNum;
        var maxNum;
        add = add || false;

        var parent = $(".step" + step);

        if (step === 6) {
            minNum = 1;
            maxNum = 9;
            nowNum = parent.find(".image-and-text-list").find(".js-item-parent").length;
        }

        if (add && nowNum === maxNum) {
            Boxy.alert("请最多填写" + maxNum + "条数据！");
            return false;
        }

        if (!add && nowNum === minNum) {
            Boxy.alert("请最少填写" + minNum + "条数据！");
            return false;
        }
        return true;
    }

    // 左侧目录切换
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

    // 上传图片loading层
    var imgLoadingHtml = '<div class="idaiyan-loading"><div class="windows8"><div class="wBall wBall_1"><div class="wInnerBall"></div></div><div class="wBall wBall_2"><div class="wInnerBall"></div></div><div class="wBall wBall_3"><div class="wInnerBall"></div></div><div class="wBall wBall_4"><div class="wInnerBall"></div></div><div class="wBall wBall_5"><div class="wInnerBall"></div></div></div></div>';

    // 判断是申请还是修改
    var editing = $(".main").hasClass("js-editpage");

    if (!editing) {

        /* 时间 */
        (function() {

            var parent = $(".step3");
            var step = 3;

            autoSaveSimpleModule(step);

            // 开始时间
            var startDateInput = parent.find(".js-start-date-calendar").eq(0);
            if (startDateInput.length) {
                var _loading = $(imgLoadingHtml);
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
                    cleanLink: "清除已选日期"
                });
                console.log(startDateCalendar);
                startDateCalendar.show(parent.find(".start_date").eq(0), 247);
                startDateCalendar.hide();


                $(".start_date").focus(function() {
                    startDateCalendar.show();
                    if (endDateCalendar && endDateCalendar.hide) {
                        endDateCalendar.hide();
                    }
                });
            }

            // 结束时间
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

            // 隐藏逻辑
            $(document).click(function(e) {
                if ($(e.target).closest(".dv_dateCalendar").length === 0) {
                    if (startDateCalendar && startDateCalendar.hide) {
                        startDateCalendar.hide();
                        startDateInput.trigger("blur");
                    }
                    if (endDateCalendar && endDateCalendar.hide) {
                        endDateCalendar.hide();
                        endDateInput.trigger("blur");
                    }
                }
            });

            // 格式日期获取函数
            function getDateStr(AddDayCount) {
                var dd = new Date();
                dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
                var y = dd.getFullYear();
                var m = dd.getMonth() + 1; //获取当前月份的日期
                var d = dd.getDate();
                return y + "-" + formatTen(m) + "-" + formatTen(d);
            }

            // 日期格式化函数
            function formatTen(num) {
                return num > 9 ? (num + "") : ("0" + num);
            }

        })();

        /* 团队 */
        (function() {
            var step = 2;
            autoSaveSimpleModule(step);
        })();

        /* 数量 */
        // (function() {
        //     var step = 3;
        //     autoSaveSimpleModule(step);
        // })();

    }

    /* 评价 */
    (function() {

        var parent = $(".step4");
        var attrId = parent.data("attrid");
        var step = 4;
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

        var parent = $(".step5");
        var step = 5;
        var attrId = parent.data("attrid");
        autoSaveComplexModule(step);

    })();


    /* 图片 */
    (function() {

        var parent = $(".step6");
        var step = 6;

        var attrId = parent.data("attrid");
        var type = "image";

        textNum({
            textarea: ".step5 textarea",
            maxNum: 75
        });

        autoSaveComplexModule(step);


        parent.find(".image-and-text .js-uploader").each(function() {
            var that = $(this);
            var _parent = that.closest("li");
            var isEdit = _parent.hasClass('js-item-parent');
            var attrName = _parent.data("imagename");
            var textplaceholder = _parent.data("textplaceholder");
            var textname = _parent.data("textname");
            var inputplaceholder = _parent.data("inputplaceholder");
            var inputname = _parent.data("inputname");
            var idInput = _parent.find(".data-id");
            var idVal = idInput.length ? idInput.val() : "";
            var ajaxData = {
                rel_id: rel_id,
                attrid: attrId,
                type: type
            };

            if (isEdit) {
                ajaxData.id = idVal;
            }

            $(this).click(function() {
                if (!$(this).closest('.image-and-text-item').length && !checkItemNum(step, true)) {
                    return false;
                }
            });

            var previewBox = _parent.find(".image-preview");
            var _loading = $(imgLoadingHtml);
            if (!isEdit) {
                previewBox = _parent.find(".imgselect");
            }
            // var preview = parent.find("img");
            $.jUploader({
                button: that, // 这里设置按钮id
                action: simpleModuleUrl, // 这里设置上传处理接口，这个加了参数test_cancel=1来测试取消
                attrName: "pimage",
                otherData: ajaxData,
                onUpload: function() {
                    previewBox.append(_loading);
                },
                // 上传完成事件
                onComplete: function(fileName, response) {
                    // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
                    _loading.remove();
                    console.log(response);
                    if (response.err) {
                        Boxy.alert("图片大小、格式可能存在问题");
                    }
                    if (response.code === "00") {
                        if (isEdit) {
                            changeImg(_parent, response.data);
                        } else {
                            rander(response.data);
                            idInput.val(response.data.id);
                        }
                        changeMenuStatus(step, true);
                    } else if (response.code === "01") {
                        if (isEdit) {
                            changeImg(_parent, response.data);
                        } else {
                            rander(response.data);
                            idInput.val(response.data.id);
                        }
                        changeMenuStatus(step, false);
                    } else if (response.code === "1001") {
                        // 没登陆
                        location.href = loginUrl;
                    } else if (response.code === "1004") {
                        // 无法修改
                        Boxy.alert("活动产品已锁定，无法修改！", function() {
                            location.href = userhomeUrl;
                        });
                    } else {
                        changeMenuStatus(step, false);
                        console.log(response.msg);
                    }

                    function rander(data) {
                        var html = template("image-text-tpl", {
                            id: data.id,
                            imageurl: '/' + data.imgurl,
                            isInput: false,
                            textplaceholder: textplaceholder,
                            textname: textname,
                            inputplaceholder: inputplaceholder,
                            inputname: inputname
                        });
                        var $html = $(html);
                        _parent.before($html);
                        //that.data("oldvalue", value);
                        var __ajaxData = $.extend({}, ajaxData);
                        __ajaxData.id = data.id;
                        var __loading = $(imgLoadingHtml);
                        $.jUploader({
                            button: $html.find(".js-uploader"), // 这里设置按钮id
                            action: simpleModuleUrl, // 这里设置上传处理接口，这个加了参数test_cancel=1来测试取消
                            attrName: "pimage",
                            otherData: __ajaxData,
                            onUpload: function() {
                                $html.find(".image-preview").append(__loading);
                            },
                            // 上传完成事件
                            onComplete: function(fileName, response) {
                                // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
                                console.log(response);
                                __loading.remove();

                                if (response.err) {
                                    Boxy.alert("图片大小、格式可能存在问题");
                                }
                                if (response.code === "00") {
                                    changeImg($html, response.data);
                                    changeMenuStatus(step, true);
                                } else if (response.code === "01") {
                                    changeImg($html, response.data);
                                    changeMenuStatus(step, false);
                                } else if (response.code === "1001") {
                                    // 没登陆
                                    location.href = loginUrl;
                                } else if (response.code === "1004") {
                                    // 无法修改
                                    Boxy.alert("活动产品已锁定，无法修改！", function() {
                                        location.href = userhomeUrl;
                                    });
                                } else {
                                    changeMenuStatus(step, false);
                                    console.log(response.msg);
                                }
                            }
                        });
                    }

                    function changeImg(parent, data) {
                        parent.find("img").attr("src", '/' + data.imgurl);
                    }
                }
            });
        });

    })();

    // 文字限制
    function textNum(options) {
        var maxNum = options.maxNum || 140;
        if (typeof options.textarea === "object") {
            options.textarea.keyup(function() {
                main.apply(this);
            });
        } else {
            $(document).on("keyup", options.textarea, function() {
                main.apply(this);
            });
        }

        function main() {
            var text = $(this).val();
            var textNum = text.length;
            if (maxNum - textNum >= 0) {
                if (typeof options.num !== "undefined") {
                    options.num.text(maxNum - textNum);
                }
            } else {
                $(this).val(text.substr(0, maxNum));
            }
        }
    }

    // 价格图片
    $(".pic_box .js-uploader").each(function() {
        var step = 2;
        var that = $(this);
        var parent = that.closest(".step");
        var attrId = parent.data("attrid");

        var ajaxData = {
            rel_id: relId,
            attr_id: attrId
        };

        var previewBox = parent.find(".image-preview");
        var _loading = $(imgLoadingHtml);

        $.jUploader({
            button: that, // 这里设置按钮id
            action: simpleModuleUrl, // 这里设置上传处理接口，这个加了参数test_cancel=1来测试取消
            attrName: "attr_val",
            otherData: ajaxData,
            onUpload: function() {
                previewBox.append(_loading);
            },
            // 上传完成事件
            onComplete: function(fileName, response) {
                // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
                console.log(response);
                _loading.remove();

                if (response.err) {
                    Boxy.alert("图片大小、格式可能存在问题");
                }
                if (response.code === "0") {
                    rander(response.data);
                    changeMenuStatus(step, true);
                } else if (response.code === "1005") {
                    rander(response.data);
                    changeMenuStatus(step, false);
                } else if (response.code === "1001") {
                    // 没登陆
                    location.href = loginUrl;
                } else if (response.code === "1004") {
                    // 无法修改
                    Boxy.alert("活动产品已锁定，无法修改！", function() {
                        location.href = userhomeUrl;
                    });
                } else {
                    changeMenuStatus(step, false);
                    console.log(response.msg);
                }

                function rander(imgurl) {
                    if (previewBox.find("img").length) {
                        previewBox.find("img").attr("src", '/' + imgurl + '.jpg');
                    } else {
                        previewBox.append('<img src="/' + imgurl + '.jpg">');
                    }
                    hidePriceImgTip();
                }
            }
        });
    });
});
});