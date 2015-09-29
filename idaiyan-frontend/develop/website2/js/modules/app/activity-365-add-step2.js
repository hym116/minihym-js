$ = require("jquery");
var Boxy = require("popup");
var calendar = require("libs/ui/calendar/calendar");
var template = require("arttemplate");
require("pkgs/jUploader");

var API = require("apis/api-aio");
var simpleModuleUrl = API.getUrl("ACTIVITY","D365_SIMPLE_DATA");
var complexModuleUrl = API.getUrl("ACTIVITY","D365_COMPLEX_DATA");
var publicUrl = API.getUrl("ACTIVITY","PUBLISH_365");
var loginUrl = API.getUrl("USER","LOGIN");
var userhomeUrl = API.getUrl("USERHOME","LISTS");

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

    var tpl = '<div class="activity-alert">' +
        '<div class="a-title">您已申请了<span>365</span>代言方式</div>' +
        '<div class="a-last-step">' + lastStep + '</div>' +
        '<div class="a-text">要发布您的活动，还需要完成一些步骤</div>' +
        '<div class="bluebtn close">继续</div>' +
        '</div>';
    new Boxy('<div>' + tpl + '</div>', {
        modal: true,
        closeable: false,
        show: true
    });

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
                attr_id: attrId,
                attr_val: value
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
                    Boxy.alert("活动产品已锁定，无法修改！",function(){
                        location.href = userhomeUrl;
                    });
                } else {
                    changeMenuStatus(step, false);
                    console.log(data.msg);
                }

            });
        });
    }

    var complexFields = "id,video_url,video_title,video_summary,pimage,desc," +
        "character_title,character_summary,partner_logo,partner_title";

    function autoSaveComplexModule(step) {

        var relId = $("#rel_id").val();
        var parent = $(".step" + step);
        var attrId = parent.data("attrid");
        var type = parent.data("type");

        var autoSave = new AutoSave({
            url: complexModuleUrl,
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
                rel_id: relId,
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
                    Boxy.alert("活动产品已锁定，无法修改！",function(){
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
                        rel_id: relId,
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
                            Boxy.alert("活动产品已锁定，无法修改！",function(){
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
        } else if (step === 7) {
            minNum = 3;
            maxNum = 9;
            nowNum = parent.find(".title-and-desc-list").find(".js-item-parent").length;
        } else if (step === 8) {
            minNum = 0;
            maxNum = 12;
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
            if (startDateInput.length) {

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
            }

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
                        endDateInput.trigger("blur");
                    }
                }
            });

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
        var descTextarea = parent.find("#description");
        var descNumText = descTextarea.siblings(".tips").find("span");

        textNum({
            textarea: descTextarea,
            num: descNumText,
            maxNum: 140
        });

        var titleInput = parent.find(".videotitle");
        var titleNumText = titleInput.siblings(".tips").find("span");

        textNum({
            textarea: titleInput,
            num: titleNumText,
            maxNum: 20
        });

        autoSaveComplexModule(step);

    })();

    /* 图片 */
    (function() {

        var parent = $(".step6");
        var step = 6;

        var relId = $("#rel_id").val();
        var attrId = parent.data("attrid");
        var type = parent.data("type");

        autoSaveComplexModule(step);

        parent.find(".cover .js-uploader").each(function() {
            var that = $(this);
            var parent = that.closest(".js-item-parent");
            var pos_id = 4;

            var idInput = parent.find(".data-id");
            var idVal = idInput.val();

            var ajaxData = {
                rel_id: relId,
                attrid: attrId,
                type: type,
                pos_id: pos_id,
                id: idVal
            };


            var previewBox = parent.find(".image-preview");

            $.jUploader({
                button: that, // 这里设置按钮id
                action: complexModuleUrl, // 这里设置上传处理接口，这个加了参数test_cancel=1来测试取消
                attrName: "pimage",
                otherData: ajaxData,
                // 上传完成事件
                onComplete: function(fileName, response) {
                    // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
                    console.log(response);
                    if (response.code === "00") {
                        rander(response.data.imgurl);
                        idInput.val(response.data.id);
                        changeMenuStatus(step, true);
                    } else if (response.code === "01") {
                        rander(response.data.imgurl);
                        idInput.val(response.data.id);
                        changeMenuStatus(step, false);
                    } else if (response.code === "1001") {
                        // 没登陆
                        location.href = loginUrl;
                    } else if (response.code === "1004") {
                        // 无法修改
                        Boxy.alert("活动产品已锁定，无法修改！",function(){
                            location.href = userhomeUrl;
                        });
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
                    }
                }
            });
        });

        parent.find(".image-and-text .js-uploader").each(function() {
            var that = $(this);
            var _parent = that.closest("li");
            var isEdit = _parent.hasClass('js-item-parent');

            var pos_id = 5;

            var attrName = _parent.data("imagename");
            var textplaceholder = _parent.data("textplaceholder");
            var textname = _parent.data("textname");

            var idInput = _parent.find(".data-id");
            var idVal = idInput.length ? idInput.val() : "";

            var ajaxData = {
                rel_id: relId,
                attrid: attrId,
                type: type,
                pos_id: pos_id
            };

            if (isEdit) {
                ajaxData.id = idVal;
            }

            $(this).click(function() {
                if (!$(this).closest('.image-and-text-item').length && !checkItemNum(step, true)) {
                    return false;
                }
            });

            // var preview = parent.find("img");
            $.jUploader({
                button: that, // 这里设置按钮id
                action: complexModuleUrl, // 这里设置上传处理接口，这个加了参数test_cancel=1来测试取消
                attrName: "pimage",
                otherData: ajaxData,
                // 上传完成事件
                onComplete: function(fileName, response) {
                    // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
                    console.log(response);
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
                        Boxy.alert("活动产品已锁定，无法修改！",function(){
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
                            textname: textname
                        });
                        var $html = $(html);
                        _parent.before($html);
                        //that.data("oldvalue", value);
                        var __ajaxData = $.extend({},ajaxData);
                        __ajaxData.id = data.id;
                        $.jUploader({
                            button: $html.find(".js-uploader"), // 这里设置按钮id
                            action: complexModuleUrl, // 这里设置上传处理接口，这个加了参数test_cancel=1来测试取消
                            attrName: "partner_logo",
                            otherData: __ajaxData,
                            // 上传完成事件
                            onComplete: function(fileName, response) {
                                // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
                                console.log(response);
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
                                    Boxy.alert("活动产品已锁定，无法修改！",function(){
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

    /* 特性 */
    (function() {

        var parent = $(".step7");
        var step = 7;

        autoSaveComplexModule(step);

        parent.find(".imgselect").click(function() {
            if (!checkItemNum(step, true)) {
                return false;
            }
            var that = $(this);
            var parent = that.closest("li");
            var data = {
                id: "",
                titleplaceholder: parent.data("titleplaceholder"),
                titlename: parent.data("titlename"),
                descplaceholder: parent.data("descplaceholder"),
                descname: parent.data("descname")
            };

            var html = template("title-desc-tpl", data);
            parent.before(html);
        });

        var triggerNumber = 4 - parent.find("li").length;
        if (triggerNumber > 0) {
            for (var i = 0; i < triggerNumber; i++) {
                parent.find(".imgselect").trigger("click");
            }
        }

    })();

    /* 伙伴 */
    (function() {

        var parent = $(".step8");
        var step = 8;

        var relId = $("#rel_id").val();
        var attrId = parent.data("attrid");
        var type = parent.data("type");

        autoSaveComplexModule(step);

        parent.find(".image-and-text .js-uploader").each(function() {
            var that = $(this);
            var _parent = that.closest("li");
            var isEdit = _parent.hasClass('js-item-parent');

            var attrName = _parent.data("imagename");
            var textplaceholder = _parent.data("textplaceholder");
            var textname = _parent.data("textname");

            var idInput = _parent.find(".data-id");
            var idVal = idInput.length ? idInput.val() : "";

            var ajaxData = {
                rel_id: relId,
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

            // var preview = parent.find("img");
            $.jUploader({
                button: that, // 这里设置按钮id
                action: complexModuleUrl, // 这里设置上传处理接口，这个加了参数test_cancel=1来测试取消
                attrName: "partner_logo",
                otherData: ajaxData,
                // 上传完成事件

                onComplete: function(fileName, response) {
                    // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
                    console.log(response);
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
                        Boxy.alert("活动产品已锁定，无法修改！",function(){
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
                            isInput: true,
                            textplaceholder: textplaceholder,
                            textname: textname
                        });
                        var $html = $(html);
                        _parent.before($html);
                        //that.data("oldvalue", value);
                         var __ajaxData = $.extend({},ajaxData);
                        __ajaxData.id = data.id;
                        $.jUploader({
                            button: $html.find(".js-uploader"), // 这里设置按钮id
                            action: complexModuleUrl, // 这里设置上传处理接口，这个加了参数test_cancel=1来测试取消
                            attrName: "partner_logo",
                            otherData: __ajaxData,
                            // 上传完成事件
                            onComplete: function(fileName, response) {
                                // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
                                console.log(response);
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
                                    Boxy.alert("活动产品已锁定，无法修改！",function(){
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
            attr_id: attrId
        };

        var previewBox = parent.find(".image-preview");

        $.jUploader({
            button: that, // 这里设置按钮id
            action: simpleModuleUrl, // 这里设置上传处理接口，这个加了参数test_cancel=1来测试取消
            attrName: "attr_val",
            otherData: ajaxData,
            // 上传完成事件
            onComplete: function(fileName, response) {
                // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
                console.log(response);
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
                    Boxy.alert("活动产品已锁定，无法修改！",function(){
                        location.href = userhomeUrl;
                    });
                } else {
                    changeMenuStatus(step, false);
                    console.log(response.msg);
                }

                function rander(imgurl) {
                    if (previewBox.find("img").length) {
                        previewBox.find("img").attr("src", '/' + imgurl+ '.jpg');
                    } else {
                        previewBox.append('<img src="/' + imgurl + '.jpg">');
                    }
                    hidePriceImgTip();
                }
            }
        });
    });
});