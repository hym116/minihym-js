/*js动态插入flash*/
function BuildFlash(url,w,h,id,bg,vars,win){
var flashStr=
"<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0' width='"+w+"' height='"+h+"' id='"+id+"' align='middle'>"+
"<param name='allowScriptAccess' value='always' />"+
"<param name='movie' value='"+url+"' />"+
"<param name='FlashVars' value='"+vars+"' />"+
"<param name='wmode' value='"+win+"' />"+
"<param name='menu' value='false' />"+
"<param name='quality' value='high' />"+
"<param name='bgcolor' value='"+bg+"' />"+
"<embed src='"+url+"' FlashVars='"+vars+"' wmode='"+win+"' menu='false' quality='high' bgcolor='"+bg+"' width='"+w+"' height='"+h+"' name='"+id+"' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' />"+
"</object>";
return flashStr;
}
/*
runnewslideshow，
主要修改了数字按钮的位置，
修改 by 大齐
*/
function runnewslideshow() {
    $F('_runnewslideshow', []);
}
function _runnewslideshow() {
    var slideshows = $C('slidebox');
    for(var i=0,L=slideshows.length; i<L; i++) {
        new newslideshow(slideshows[i]);
    }
}
function newslideshow(el) {
    var obj = this;
    if(!el.id) el.id = Math.random();
    if(typeof slideshow.entities == 'undefined') {
        slideshow.entities = {};
    }
    this.id = el.id;
    if(slideshow.entities[this.id]) return false;
    slideshow.entities[this.id] = this;

    this.slideshows = [];
    this.slidebar = [];
    this.slideother = [];
    this.slidebarup = '';
    this.slidebardown = '';
    this.slidenum = 0;
    this.slidestep = 0;

    this.container = el;
    this.imgs = [];
    this.imgLoad = [];
    this.imgLoaded = 0;
    this.imgWidth = 0;
    this.imgHeight = 0;

    this.getMEvent = function(ele, value) {
        value = !value ? 'mouseover' : value;
        var mevent = !ele ? '' : ele.getAttribute('mevent');
        mevent = (mevent == 'click' || mevent == 'mouseover') ? mevent : value;
        return mevent;
    };
    this.slideshows = $C('slideshow', el);
    this.slideshows = this.slideshows.length>0 ? this.slideshows[0].childNodes : null;
    this.slidebar = $C('slidebar', el);
    this.slidebar = this.slidebar.length>0 ? this.slidebar[0] : null;
    this.barmevent = this.getMEvent(this.slidebar);
    this.slideother = $C('slideother', el);
    this.slidebarup = $C('slidebarup', el);
    this.slidebarup = this.slidebarup.length>0 ? this.slidebarup[0] : null;
    this.barupmevent = this.getMEvent(this.slidebarup, 'click');
    this.slidebardown = $C('slidebardown', el);
    this.slidebardown = this.slidebardown.length>0 ? this.slidebardown[0] : null;
    this.bardownmevent = this.getMEvent(this.slidebardown, 'click');
    this.slidenum = parseInt(this.container.getAttribute('slidenum'));
    this.slidestep = parseInt(this.container.getAttribute('slidestep'));
    this.timestep = parseInt(this.container.getAttribute('timestep'));
    this.timestep = !this.timestep ? 2500 : this.timestep;

    this.index = this.length = 0;
    this.slideshows = !this.slideshows ? filterTextNode(el.childNodes) : filterTextNode(this.slideshows);

    this.length = this.slideshows.length;

    for(i=0; i<this.length; i++) {
        this.slideshows[i].style.display = "none";
        _attachEvent(this.slideshows[i], 'mouseover', function(){obj.stop();});
        _attachEvent(this.slideshows[i], 'mouseout', function(){obj.goon();});
    }

    for(i=0, L=this.slideother.length; i<L; i++) {
        for(var j=0;j<this.slideother[i].childNodes.length;j++) {
            if(this.slideother[i].childNodes[j].nodeType == 1) {
                this.slideother[i].childNodes[j].style.display = "none";
            }
        }
    }

    if(!this.slidebar) {
        if(!this.slidenum && !this.slidestep) {
            this.container.parentNode.style.position = 'relative';
            this.slidebar = document.createElement('div');
            this.slidebar.className = 'slidebar';
            this.slidebar.style.position = 'absolute';
            this.slidebar.style.bottom = '10px';
            this.slidebar.style.right = '10px';
            this.slidebar.style.display = 'none';
            var html = '<ul>';
            for(var i=0; i<this.length; i++) {
                html += '<li on'+this.barmevent+'="slideshow.entities[' + this.id + '].xactive(' + i + '); return false;">' + (i + 1).toString() + '</li>';
            }
            html += '</ul>';
            this.slidebar.innerHTML = html;
            this.container.parentNode.appendChild(this.slidebar);
            this.controls = this.slidebar.getElementsByTagName('li');
        }
    } else {
        this.controls = filterTextNode(this.slidebar.childNodes);
        for(i=0; i<this.controls.length; i++) {
            if(this.slidebarup == this.controls[i] || this.slidebardown == this.controls[i]) continue;
            _attachEvent(this.controls[i], this.barmevent, function(){newslidexactive()});
            _attachEvent(this.controls[i], 'mouseout', function(){obj.goon();});
        }
    }
    if(this.slidebarup) {
        _attachEvent(this.slidebarup, this.barupmevent, function(){newslidexactive('up')});
    }
    if(this.slidebardown) {
        _attachEvent(this.slidebardown, this.bardownmevent, function(){newslidexactive('down')});
    }
    this.activeByStep = function(index) {
        var showindex = 0,i = 0;
        if(index == 'down') {
            showindex = this.index + 1;
            if(showindex > this.length) {
                this.runRoll();
            } else {
                for (i = 0; i < this.slidestep; i++) {
                    if(showindex >= this.length) showindex = 0;
                    this.index = this.index - this.slidenum + 1;
                    if(this.index < 0) this.index = this.length + this.index;
                    this.active(showindex);
                    showindex++;
                }
            }
        } else if (index == 'up') {
            var tempindex = this.index;
            showindex = this.index - this.slidenum;
            if(showindex < 0) return false;
            for (i = 0; i < this.slidestep; i++) {
                if(showindex < 0) showindex = this.length - Math.abs(showindex);
                this.active(showindex);
                this.index = tempindex = tempindex - 1;
                if(this.index <0) this.index = this.length - 1;
                showindex--;
            }
        }
        return false;
    };
    this.active = function(index) {
        this.slideshows[this.index].style.display = "none";
        this.slideshows[index].style.display = "block";
        if(this.controls && this.controls.length > 0) {
            this.controls[this.index].className = '';
            this.controls[index].className = 'on';
        }
        for(var i=0,L=this.slideother.length; i<L; i++) {
            this.slideother[i].childNodes[this.index].style.display = "none";
            this.slideother[i].childNodes[index].style.display = "block";
        }
        this.index = index;
    };
    this.xactive = function(index) {
        if(!this.slidenum && !this.slidestep) {
            this.stop();
            if(index == 'down') index = this.index == this.length-1 ? 0 : this.index+1;
            if(index == 'up') index = this.index == 0 ? this.length-1 : this.index-1;
            this.active(index);
        } else {
            this.activeByStep(index);
        }
    };
    this.goon = function() {
        this.stop();
        var curobj = this;
        this.timer = setTimeout(function () {
            curobj.run();
        }, this.timestep);
    };
    this.stop = function() {
        clearTimeout(this.timer);
    };
    this.run = function() {
        var index = this.index + 1 < this.length ? this.index + 1 : 0;
        if(!this.slidenum && !this.slidestep) {
            this.active(index);
        } else {
            this.activeByStep('down');
        }
        var ss = this;
        this.timer = setTimeout(function(){
            ss.run();
        }, this.timestep);
    };

    this.runRoll = function() {
        for(var i = 0; i < this.slidenum; i++) {
            if(this.slideshows[i] && typeof this.slideshows[i].style != 'undefined') this.slideshows[i].style.display = 'block';
            for(var j=0,L=this.slideother.length; j<L; j++) {
                this.slideother[j].childNodes[i].style.display = 'block';
            }
        }
        this.index = this.slidenum - 1;
    };
    var imgs = this.slideshows.length ? this.slideshows[0].parentNode.getElementsByTagName('img') : [];
    for(i=0, L=imgs.length; i<L; i++) {
        this.imgs.push(imgs[i]);
        this.imgLoad.push(new Image());
        this.imgLoad[i].onerror = function (){obj.imgLoaded ++;};
        this.imgLoad[i].src = this.imgs[i].src;
    }

    this.getSize = function () {
        if(this.imgs.length == 0) return false;
        var img = this.imgs[0];
        this.imgWidth = img.width ? parseInt(img.width) : 0;
        this.imgHeight = img.height ? parseInt(img.height) : 0;
        var ele = img.parentNode;
        while ((!this.imgWidth || !this.imgHeight) && !hasClass(ele,'slideshow') && ele != document.body) {
            this.imgWidth = ele.style.width ? parseInt(ele.style.width) : 0;
            this.imgHeight = ele.style.height ? parseInt(ele.style.height) : 0;
            ele = ele.parentNode;
        }
        return true;
    };

    this.getSize();

    this.checkLoad = function () {
        var obj = this;
        this.container.style.display = 'block';
        for(i = 0;i < this.imgs.length;i++) {
            if(this.imgLoad[i].complete && !this.imgLoad[i].status) {
                this.imgLoaded++;
                this.imgLoad[i].status = 1;
            }
        }
        var percentEle = $(this.id+'_percent');
        if(this.imgLoaded < this.imgs.length) {
            if (!percentEle) {
                var dom = document.createElement('div');
                dom.id = this.id+"_percent";
                dom.style.width = this.imgWidth ? this.imgWidth+'px' : '150px';
                dom.style.height = this.imgHeight ? this.imgHeight+'px' : '150px';
                dom.style.lineHeight = this.imgHeight ? this.imgHeight+'px' : '150px';
                dom.style.backgroundColor = '#ccc';
                dom.style.textAlign = 'center';
                dom.style.top = '0';
                dom.style.left = '0';
                dom.style.marginLeft = 'auto';
                dom.style.marginRight = 'auto';
                this.slideshows[0].parentNode.appendChild(dom);
                percentEle = dom;
            }
            el.parentNode.style.position = 'relative';
            percentEle.innerHTML = (parseInt(this.imgLoaded / this.imgs.length * 100)) + '%';
            setTimeout(function () {obj.checkLoad();}, 100);
        } else {
            if (percentEle) percentEle.parentNode.removeChild(percentEle);
            if(this.slidebar) this.slidebar.style.display = '';
            this.index = this.length - 1 < 0 ? 0 : this.length - 1;
            if(this.slideshows.length > 0) {
                if(!this.slidenum || !this.slidestep) {
                    this.run();
                } else {
                    this.runRoll();
                }
            }
        }
    };
    this.checkLoad();
}
function newslidexactive(step) {
    var e = getEvent();
    var aim = e.target || e.srcElement;
    var parent = aim.parentNode;
    var xactivei = null, slideboxid = null,currentslideele = null;
    currentslideele = hasClass(aim, 'slidebarup') || hasClass(aim, 'slidebardown') || hasClass(parent, 'slidebar') ? aim : null;
    while(parent && parent != document.body) {
        if(!currentslideele && hasClass(parent, 'slidebar')) {
            currentslideele = parent;
        }
        if(!currentslideele && (hasClass(parent, 'slidebarup') || hasClass(parent, 'slidebardown'))) {
            currentslideele = parent;
        }
        if(hasClass(parent, 'slidebox')) {
            slideboxid = parent.id;
            break;
        }
        parent = parent.parentNode;
    }
    var slidebar = $C('slidebar', parent);
    var children = slidebar.length == 0 ? [] : filterTextNode(slidebar[0].childNodes);
    if(currentslideele && (hasClass(currentslideele, 'slidebarup') || hasClass(currentslideele, 'slidebardown'))) {
        xactivei = step;
    } else {
        for(var j=0,i=0,L=children.length;i<L;i++){
            if(currentslideele && children[i] == currentslideele) {
                xactivei = j;
                break;
            }
            if(!hasClass(children[i], 'slidebarup') && !hasClass(children[i], 'slidebardown')) j++;
        }
    }
    if(slideboxid != null && xactivei != null) slideshow.entities[slideboxid].xactive(xactivei);
}
/*
tab切换插件0.1
Plugin developed by: 大齐
*/
;(function($){
    $.fn.tabswitch = function(settings){
        settings = jQuery.extend({
            tabwrapclass: "tab-wrap",    
            mainwrapclass: "tab-main-wrap",
            mouseevent: "mouseclick",
            effect: "display"
        },settings);
        var tabswitchbox = $(this);
        var tabwrap = tabswitchbox.find("."+settings.tabwrapclass);
        var mainwrap = tabswitchbox.find("."+settings.mainwrapclass);
        var tab = tabwrap.find("[class*='tab']");
        var main = mainwrap.find("[class*='main']");
        function tabswitchstart(tab,main){
            tabswitchevent(settings.mouseevent,tab,main);
        }
        function tabswitchevent(event,tab,main) {
            switch (event) {
            case "mouseover":
                tabswitchmouseover(tab,main);
                break;
            case "mouseclick":
                tabswitchmouseclick(tab,main);
                break;
            default:
                tabswitchmouseclick(tab,main);
            }
        };
        function tabswitchmouseover(tab,main){
            tab.mouseover(function(){
                var curtabindex = tab.index($(this));
                tabswitcheffect(main,curtabindex);
            });
        };
        function tabswitchmouseclick(tab,main){
            tab.click(function(){
                var curtabindex = tab.index($(this));
                tabswitcheffect(main,curtabindex);
            });
        };
        function tabswitcheffect(main,curtabindex){
            switch (settings.effect) {
            case "display":
                tabswitcheffectdisplay(main,curtabindex);
                break;
            case "visibility":
                tabswitcheffectvisibility(main,curtabindex);
                break;
            default:
                tabswitcheffectdisplay(main,curtabindex);
            }
        }
        function tabswitcheffectdisplay(main,curtabindex){
//console.log(main);
//console.log(curtabindex);
            main.eq(curtabindex).show().siblings("[class*='main']").hide();
        }
        function tabswitcheffectvisibility(main,curtabindex){
            main.eq(curtabindex).css("visibility","visible").siblings("[class*='main']").css("visibility","hidden");
        }
        return this.each(function(){
            tabswitchstart(tab,main);
        });
    }
})(jQuery);
/*
列表无限滚动
bxCarousel v1.0
Plugin developed by: Steven Wanderski
*/
;(function($) {
    $.fn.bxCarousel = function(options) {
        var defaults = {
            move: 4,
            display_num: 4,
            speed: 500,
            margin: 0,
            auto: false,
            auto_interval: 2000,
            auto_dir: 'next',
            auto_hover: false,
            next_text: 'next',
            next_image: '',
            prev_text: 'prev',
            prev_image: '',
            controls: true
        };
        var options = $.extend(defaults, options);
        return this.each(function() {
            var $this = $(this);
            var li = $this.find('li');
            var first = 0;
            var fe = 0;
            var last = options.display_num - 1;
            var le = options.display_num - 1;
            var is_working = false;
            var j = '';
            var clicked = false;
            li.css({
                'float': 'left',
                'listStyle': 'none',
                'marginRight': options.margin
            });
            var ow = li.outerWidth(true);
            wrap_width = (ow * options.display_num) - options.margin;
            var seg = ow * options.move;
            $this.wrap('<div class="bx_container"></div>').width(999999);
            if (options.controls) {
                if (options.next_image != '' || options.prev_image != '') {
                    var controls = '<a href="" class="prev"><img src="' + options.prev_image + '"/></a><a href="" class="next"><img src="' + options.next_image + '"/></a>';
                }
                else {
                    var controls = '<a href="" class="prev">' + options.prev_text + '</a><a href="" class="next">' + options.next_text + '</a>';
                }
            }
            $this.parent('.bx_container').wrap('<div class="bx_wrap"></div>').css({
                'position': 'relative',
                'width': wrap_width,
                'overflow': 'hidden'
            }).before(controls);
            var w = li.slice(0, options.display_num).clone();
            var last_appended = (options.display_num + options.move) - 1;
            $this.empty().append(w);
            get_p();
            get_a();
            $this.css({
                'position': 'relative',
                'left': -(seg)
            });
            $this.parent().siblings('.next').click(function() {
                slide_next();
                clearInterval(j);
                clicked = true;
                return false;
            });
            $this.parent().siblings('.prev').click(function() {
                slide_prev();
                clearInterval(j);
                clicked = true;
                return false;
            });
            if (options.auto) {
                start_slide();
                if (options.auto_hover && clicked != true) {
                    $this.find('li').live('mouseenter', function() {
                        if (!clicked) {
                            clearInterval(j);
                        }
                    });
                    $this.find('li').live('mouseleave', function() {
                        if (!clicked) {
                            start_slide();
                        }
                    });
                }
            }

            function start_slide() {
                if (options.auto_dir == 'next') {
                    j = setInterval(function() {
                        slide_next()
                    }, options.auto_interval);
                } else {
                    j = setInterval(function() {
                        slide_prev()
                    }, options.auto_interval);
                }
            }

            function slide_next() {
                if (!is_working) {
                    is_working = true;
                    set_pos('next');
                    $this.animate({
                        left: '-=' + seg
                    }, options.speed, function() {
                        $this.find('li').slice(0, options.move).remove();
                        $this.css('left', -(seg));
                        get_a();
                        is_working = false;
                    });
                }
            }

            function slide_prev() {
                if (!is_working) {
                    is_working = true;
                    set_pos('prev');
                    $this.animate({
                        left: '+=' + seg
                    }, options.speed, function() {
                        $this.find('li').slice(-options.move).remove();
                        $this.css('left', -(seg));
                        get_p();
                        is_working = false;
                    });
                }
            }

            function get_a() {
                var str = new Array();
                var lix = li.clone();
                le = last;
                for (i = 0; i < options.move; i++) {
                    le++
                    if (lix[le] != undefined) {
                        str[i] = $(lix[le]);
                    } else {
                        le = 0;
                        str[i] = $(lix[le]);
                    }
                }
                $.each(str, function(index) {
                    $this.append(str[index][0]);
                });
            }

            function get_p() {
                var str = new Array();
                var lix = li.clone();
                fe = first;
                for (i = 0; i < options.move; i++) {
                    fe--
                    if (lix[fe] != undefined) {
                        str[i] = $(lix[fe]);
                    } else {
                        fe = li.length - 1;
                        str[i] = $(lix[fe]);
                    }
                }
                $.each(str, function(index) {
                    $this.prepend(str[index][0]);
                });
            }

            function set_pos(dir) {
                if (dir == 'next') {
                    first += options.move;
                    if (first >= li.length) {
                        first = first % li.length;
                    }
                    last += options.move;
                    if (last >= li.length) {
                        last = last % li.length;
                    }
                } else if (dir == 'prev') {
                    first -= options.move;
                    if (first < 0) {
                        first = li.length + first;
                    }
                    last -= options.move;
                    if (last < 0) {
                        last = li.length + last;
                    }
                }
            }
        });
    }
})(jQuery);
/*KinSlideshow*/
;(function($) {
    $.fn.KinSlideshow = function(settings) {
        settings = jQuery.extend({
            intervalTime: 5,
            moveSpeedTime: 400,
            moveStyle: "left",
            mouseEvent: "mouseclick",
            isHasTitleBar: true,
            titleBar: {
                titleBar_height: 40,
                titleBar_bgColor: "#000000",
                titleBar_alpha: 0.5
            },
            isHasTitleFont: true,
            titleFont: {
                TitleFont_size: 12,
                TitleFont_color: "#FFFFFF",
                TitleFont_family: "Verdana",
                TitleFont_weight: "bold"
            },
            isHasBtn: true,
            KinSlideshow_btnBox_bottom:5
        },
        settings);
        var titleBar_Bak = {
            titleBar_height: 40,
            titleBar_bgColor: "#000000",
            titleBar_alpha: 0.5
        }
        var titleFont_Bak = {
            TitleFont_size: 12,
            TitleFont_color: "#FFFFFF",
            TitleFont_family: "Verdana",
            TitleFont_weight: "bold"
        }
        for (var key in titleBar_Bak) {
            if (settings.titleBar[key] == undefined) {
                settings.titleBar[key] = titleBar_Bak[key];
            }
        }
        for (var key in titleFont_Bak) {
            if (settings.titleFont[key] == undefined) {
                settings.titleFont[key] = titleFont_Bak[key];
            }
        }
        var KinSlideshow_BoxObject = this;
        var KinSlideshow_BoxObjectSelector = $(KinSlideshow_BoxObject).selector;
        var KinSlideshow_DateArray = new Array();
        var KinSlideshow_imgaeLength = 0;
        var KinSlideshow_Size = new Array();
        var KinSlideshow_changeFlag = 0;
        var KinSlideshow_IntervalTime = settings.intervalTime;
        var KinSlideshow_setInterval;
        var KinSlideshow_firstMoveFlag = true;
        if (isNaN(KinSlideshow_IntervalTime) || KinSlideshow_IntervalTime <= 1) {
            KinSlideshow_IntervalTime = 5;
        }
        if (settings.moveSpeedTime > 500) {
            settings.moveSpeedTime = 500;
        } else if (settings.moveSpeedTime < 1) {
            settings.moveSpeedTime = 1;
        }
        function KinSlideshow_initialize() {
            $(KinSlideshow_BoxObject).css({
                visibility: "hidden"
            });
            $(KinSlideshow_BoxObjectSelector + " a img").css({
                border: 0
            });
            KinSlideshow_start();
            KinSlideshow_mousehover();
        };
        function KinSlideshow_start() {
            KinSlideshow_imgaeLength = $(KinSlideshow_BoxObjectSelector + " a").length;
            KinSlideshow_Size.push($(KinSlideshow_BoxObjectSelector + " a img").width());
            KinSlideshow_Size.push($(KinSlideshow_BoxObjectSelector + " a img").height());
            $(KinSlideshow_BoxObjectSelector + " a img").each(function(i) {
                KinSlideshow_DateArray.push($(this).attr("alt"));
            });
            $(KinSlideshow_BoxObjectSelector + " a").wrapAll("<div id='KinSlideshow_content'></div>");
            $("#KinSlideshow_content").clone().attr("id", "KinSlideshow_contentClone").appendTo(KinSlideshow_BoxObject);
            KinSlideshow_setTitleBar();
            KinSlideshow_setTitleFont();
            KinSlideshow_setBtn();
            KinSlideshow_action();
            KinSlideshow_btnEvent(settings.mouseEvent);
            $(KinSlideshow_BoxObject).css({
                visibility: "visible"
            });
        };
        function KinSlideshow_setTitleBar() {
            $(KinSlideshow_BoxObject).css({
                width: KinSlideshow_Size[0],
                height: KinSlideshow_Size[1],
                overflow: "hidden",
                position: "relative"
            });
            $(KinSlideshow_BoxObject).append("<div class='KinSlideshow_titleBar'></div>");
            var getTitleBar_Height = settings.titleBar.titleBar_height;
            if (isNaN(getTitleBar_Height)) {
                getTitleBar_Height = 40;
            } else if (getTitleBar_Height < 25) {
                getTitleBar_Height = 25;
            };
            $(KinSlideshow_BoxObjectSelector + " .KinSlideshow_titleBar").css({
                height: getTitleBar_Height,
                width: "100%",
                position: "absolute",
                bottom: 0,
                left: 0
            })
            if (settings.isHasTitleBar) {
                $(KinSlideshow_BoxObjectSelector + " .KinSlideshow_titleBar").css({
                    background: settings.titleBar.titleBar_bgColor,
                    opacity: settings.titleBar.titleBar_alpha
                })
            }
        };
        function KinSlideshow_setTitleFont() {
            if (settings.isHasTitleFont) {
                $(KinSlideshow_BoxObjectSelector + " .KinSlideshow_titleBar").append("<h2 class='title' style='margin:3px 0 0 6px;padding:0;'></h2>");
                $(KinSlideshow_BoxObjectSelector + " .KinSlideshow_titleBar .title").css({
                    fontSize: settings.titleFont.TitleFont_size,
                    color: settings.titleFont.TitleFont_color,
                    fontFamily: settings.titleFont.TitleFont_family,
                    fontWeight: settings.titleFont.TitleFont_weight
                });
                setTiltFontShow(0);
            };
        };
        function KinSlideshow_setBtn() {
            if (settings.isHasBtn && KinSlideshow_imgaeLength >= 2) {
                var KinSlideshow_btnBox_right = (KinSlideshow_Size[0] - KinSlideshow_imgaeLength * 13 + 2) / 2;
                var KinSlideshow_btnBox_bottom = settings.KinSlideshow_btnBox_bottom;
                $(KinSlideshow_BoxObject).append("<div class='KinSlideshow_btnBox' style='position:absolute;right:"+KinSlideshow_btnBox_right+"px;bottom:"+KinSlideshow_btnBox_bottom+"px; z-index:100'></div>");
                var KinSlideshow_btnList = "";
                for (i = 1; i <= KinSlideshow_imgaeLength; i++) {
                    KinSlideshow_btnList += "<li>" + i + "</li>";
                }
                KinSlideshow_btnList = "<ul id='btnlistID' style='margin:0;padding:0; overflow:hidden'>" + KinSlideshow_btnList + "</ul>";
                $(KinSlideshow_BoxObjectSelector + " .KinSlideshow_btnBox").append(KinSlideshow_btnList);
                $("#btnlistID li:eq(0)").css({'background-position':'-3px -3px'});
            };
        };
        function KinSlideshow_action() {
            switch (settings.moveStyle) {
                case "left":
                KinSlideshow_moveLeft();
                break;
                case "right":
                KinSlideshow_moveRight();
                break;
                case "up":
                KinSlideshow_moveUp();
                break;
                case "down":
                KinSlideshow_moveDown();
                break;
                case "fadein":
                KinSlideshow_fadeIn();
                break;
                default:
                settings.moveStyle = "left";
                KinSlideshow_moveLeft();
            }
        };
        function KinSlideshow_moveLeft() {
            $(KinSlideshow_BoxObjectSelector + " div:lt(2)").wrapAll("<div id='KinSlideshow_moveBox'></div>");
            $("#KinSlideshow_moveBox").css({
                width: KinSlideshow_Size[0],
                height: KinSlideshow_Size[1],
                overflow: "hidden",
                position: "relative"
            });
            $("#KinSlideshow_content").css({
                float: "left"
            });
            $("#KinSlideshow_contentClone").css({
                float: "left"
            });
            $(KinSlideshow_BoxObjectSelector + " #KinSlideshow_moveBox div").wrapAll("<div id='KinSlideshow_XposBox'></div>");
            $(KinSlideshow_BoxObjectSelector + " #KinSlideshow_XposBox").css({
                float: "left",
                width: "2000%"
            });
            KinSlideshow_setInterval = setInterval(function() {
                KinSlideshow_move(settings.moveStyle)
            },
            KinSlideshow_IntervalTime * 1000 + settings.moveSpeedTime);
        };
        function KinSlideshow_moveRight() {
            $(KinSlideshow_BoxObjectSelector + " div:lt(2)").wrapAll("<div id='KinSlideshow_moveBox'></div>");
            $("#KinSlideshow_moveBox").css({
                width: KinSlideshow_Size[0],
                height: KinSlideshow_Size[1],
                overflow: "hidden",
                position: "relative"
            });
            $("#KinSlideshow_content").css({
                float: "left"
            });
            $("#KinSlideshow_contentClone").css({
                float: "left"
            });
            $(KinSlideshow_BoxObjectSelector + " #KinSlideshow_moveBox div").wrapAll("<div id='KinSlideshow_XposBox'></div>");
            $(KinSlideshow_BoxObjectSelector + " #KinSlideshow_XposBox").css({
                float: "left",
                width: "2000%"
            });
            $("#KinSlideshow_contentClone").html("");
            $("#KinSlideshow_content a").wrap("<span></span>")
            $("#KinSlideshow_content a").each(function(i) {
                $("#KinSlideshow_contentClone").prepend($("#KinSlideshow_content span:eq(" + i + ")").html());
            })
            $("#KinSlideshow_content").html($("#KinSlideshow_contentClone").html());
            var KinSlideshow_offsetLeft = (KinSlideshow_imgaeLength - 1) * KinSlideshow_Size[0];
            $("#KinSlideshow_moveBox").scrollLeft(KinSlideshow_offsetLeft);
            KinSlideshow_setInterval = setInterval(function() {
                KinSlideshow_move(settings.moveStyle)
            },
            KinSlideshow_IntervalTime * 1000 + settings.moveSpeedTime);
        };
        function KinSlideshow_moveUp() {
            $(KinSlideshow_BoxObjectSelector + " div:lt(2)").wrapAll("<div id='KinSlideshow_moveBox'></div>");
            $("#KinSlideshow_moveBox").css({
                width: KinSlideshow_Size[0],
                height: KinSlideshow_Size[1],
                overflow: "hidden",
                position: "relative"
            });
            $("#KinSlideshow_moveBox").animate({
                scrollTop: 0
            },
            1);
            KinSlideshow_setInterval = setInterval(function() {
                KinSlideshow_move(settings.moveStyle)
            },
            KinSlideshow_IntervalTime * 1000 + settings.moveSpeedTime);
        };
        function KinSlideshow_moveDown() {
            $(KinSlideshow_BoxObjectSelector + " div:lt(2)").wrapAll("<div id='KinSlideshow_moveBox'></div>");
            $("#KinSlideshow_moveBox").css({
                width: KinSlideshow_Size[0],
                height: KinSlideshow_Size[1],
                overflow: "hidden",
                position: "relative"
            });
            $("#KinSlideshow_contentClone").html("");
            $("#KinSlideshow_content a").wrap("<span></span>")
            $("#KinSlideshow_content a").each(function(i) {
                $("#KinSlideshow_contentClone").prepend($("#KinSlideshow_content span:eq(" + i + ")").html());
            })
            $("#KinSlideshow_content").html($("#KinSlideshow_contentClone").html());
            var KinSlideshow_offsetTop = (KinSlideshow_imgaeLength - 1) * KinSlideshow_Size[1];
            $("#KinSlideshow_moveBox").animate({
                scrollTop: KinSlideshow_offsetTop
            },
            1);
            KinSlideshow_setInterval = setInterval(function() {
                KinSlideshow_move(settings.moveStyle)
            },
            KinSlideshow_IntervalTime * 1000 + settings.moveSpeedTime);
        };
        function KinSlideshow_fadeIn() {
            $(KinSlideshow_BoxObjectSelector + " div:lt(2)").wrapAll("<div id='KinSlideshow_moveBox'></div>");
            $("#KinSlideshow_moveBox").css({
                width: KinSlideshow_Size[0],
                height: KinSlideshow_Size[1],
                overflow: "hidden"
            });
            $("#KinSlideshow_content img").css({
                position:"absolute",
                left:0,
                top:0,
                opacity: 0
            });
            $("#KinSlideshow_contentClone").css({
                display:'none'
            });
            $("#KinSlideshow_contentClone").html("");
            $("#KinSlideshow_content a").wrap("<span></span>")
            $("#KinSlideshow_content a").each(function(i) {
                $("#KinSlideshow_contentClone").prepend($("#KinSlideshow_content span:eq(" + i + ")").html());
            })
            $("#KinSlideshow_content").html($("#KinSlideshow_contentClone").html());
            $("#KinSlideshow_content img:eq(0)").fadeTo(settings.moveSpeedTime,1).css({zIndex:100});
            KinSlideshow_changeFlag++;
            KinSlideshow_setInterval = setInterval(function() {
                KinSlideshow_move(settings.moveStyle)
            },
            KinSlideshow_IntervalTime * 1000 + settings.moveSpeedTime);
        };
        function KinSlideshow_move(style) {
            switch (style) {
                case "left":
                if (KinSlideshow_changeFlag >= KinSlideshow_imgaeLength) {
                    KinSlideshow_changeFlag = 0;
                    $("#KinSlideshow_moveBox").scrollLeft(0);
                    $("#KinSlideshow_moveBox").animate({
                        scrollLeft: KinSlideshow_Size[0]
                    },
                    settings.moveSpeedTime);
                } else {
                    sp = (KinSlideshow_changeFlag + 1) * KinSlideshow_Size[0];
                    if ($("#KinSlideshow_moveBox").is(':animated')) {
                        $("#KinSlideshow_moveBox").stop();
                        $("#KinSlideshow_moveBox").animate({
                            scrollLeft: sp
                        },
                        settings.moveSpeedTime);
                    } else {
                        $("#KinSlideshow_moveBox").animate({
                            scrollLeft: sp
                        },
                        settings.moveSpeedTime);
                    }
                }
                setTiltFontShow(KinSlideshow_changeFlag + 1);
                break;
                case "right":
                var KinSlideshow_offsetLeft = (KinSlideshow_imgaeLength - 1) * KinSlideshow_Size[0];
                if (KinSlideshow_changeFlag >= KinSlideshow_imgaeLength) {
                    KinSlideshow_changeFlag = 0;
                    $("#KinSlideshow_moveBox").scrollLeft(KinSlideshow_offsetLeft + KinSlideshow_Size[0]);
                    $("#KinSlideshow_moveBox").animate({
                        scrollLeft: KinSlideshow_offsetLeft
                    },
                    settings.moveSpeedTime);
                } else {
                    if (KinSlideshow_firstMoveFlag) {
                        KinSlideshow_changeFlag++;
                        KinSlideshow_firstMoveFlag = false;
                    }
                    sp = KinSlideshow_offsetLeft - (KinSlideshow_changeFlag * KinSlideshow_Size[0]);
                    if ($("#KinSlideshow_moveBox").is(':animated')) {
                        $("#KinSlideshow_moveBox").stop();
                        $("#KinSlideshow_moveBox").animate({
                            scrollLeft: sp
                        },
                        settings.moveSpeedTime);
                    } else {
                        $("#KinSlideshow_moveBox").animate({
                            scrollLeft: sp
                        },
                        settings.moveSpeedTime);
                    }
                }
                setTiltFontShow(KinSlideshow_changeFlag);
                break;
                case "up":
                if (KinSlideshow_changeFlag >= KinSlideshow_imgaeLength) {
                    KinSlideshow_changeFlag = 0;
                    $("#KinSlideshow_moveBox").scrollTop(0);
                    $("#KinSlideshow_moveBox").animate({
                        scrollTop: KinSlideshow_Size[1]
                    },
                    settings.moveSpeedTime);
                } else {
                    sp = (KinSlideshow_changeFlag + 1) * KinSlideshow_Size[1];
                    if ($("#KinSlideshow_moveBox").is(':animated')) {
                        $("#KinSlideshow_moveBox").stop();
                        $("#KinSlideshow_moveBox").animate({
                            scrollTop: sp
                        },
                        settings.moveSpeedTime);
                    } else {
                        $("#KinSlideshow_moveBox").animate({
                            scrollTop: sp
                        },
                        settings.moveSpeedTime);
                    }
                }
                setTiltFontShow(KinSlideshow_changeFlag + 1);
                break;
                case "down":
                var KinSlideshow_offsetLeft = (KinSlideshow_imgaeLength - 1) * KinSlideshow_Size[1];
                if (KinSlideshow_changeFlag >= KinSlideshow_imgaeLength) {
                    KinSlideshow_changeFlag = 0;
                    $("#KinSlideshow_moveBox").scrollTop(KinSlideshow_offsetLeft + KinSlideshow_Size[1]);
                    $("#KinSlideshow_moveBox").animate({
                        scrollTop: KinSlideshow_offsetLeft
                    },
                    settings.moveSpeedTime);
                } else {
                    if (KinSlideshow_firstMoveFlag) {
                        KinSlideshow_changeFlag++;
                        KinSlideshow_firstMoveFlag = false;
                    }
                    sp = KinSlideshow_offsetLeft - (KinSlideshow_changeFlag * KinSlideshow_Size[1]);
                    if ($("#KinSlideshow_moveBox").is(':animated')) {
                        $("#KinSlideshow_moveBox").stop();
                        $("#KinSlideshow_moveBox").animate({
                            scrollTop: sp
                        },
                        settings.moveSpeedTime);
                    } else {
                        $("#KinSlideshow_moveBox").animate({
                            scrollTop: sp
                        },
                        settings.moveSpeedTime);
                    }
                }
                setTiltFontShow(KinSlideshow_changeFlag);
                case "fadein":
                if (KinSlideshow_changeFlag >= KinSlideshow_imgaeLength) {
                    KinSlideshow_changeFlag = 0;
                    $("#KinSlideshow_content img").css({opacity: 0});
                    $("#KinSlideshow_content img:eq(0)").fadeTo(settings.moveSpeedTime,1);
                } else {
                    if ($("#KinSlideshow_content img").is(':animated')) {
                        $("#KinSlideshow_content img").stop();
                        $("#KinSlideshow_content img").css({opacity: 0}).css({zIndex:1});
                        $("#KinSlideshow_content img:eq("+KinSlideshow_changeFlag+")").fadeTo(settings.moveSpeedTime,1).css({zIndex:100});
                    } else {
                        $("#KinSlideshow_content img").css({opacity: 0}).css({zIndex:1});
                        $("#KinSlideshow_content img:eq("+KinSlideshow_changeFlag+")").fadeTo(settings.moveSpeedTime,1).css({zIndex:100});
                    }
                }
                setTiltFontShow(KinSlideshow_changeFlag);
                break;
            }
            KinSlideshow_changeFlag++;
        }
        function setTiltFontShow(index) {
            if (index == KinSlideshow_imgaeLength) {
                index = 0
            };
            if (settings.isHasTitleFont) {
                $(KinSlideshow_BoxObjectSelector + " .KinSlideshow_titleBar h2").html(KinSlideshow_DateArray[index]);
            };
            $("#btnlistID li").each(function(i) {
                if (i == index) {
                    $(this).css({'background-position':'-3px -3px'});
                } else {
                    $(this).css({'background-position':'-20px -3px'});
                }
            })
        };
        function KinSlideshow_btnEvent(Event) {
            switch (Event) {
                case "mouseover":
                KinSlideshow_btnMouseover();
                break;
                case "mouseclick":
                KinSlideshow_btnMouseclick();
                break;
                default:
                KinSlideshow_btnMouseclick();
            }
        };
        function KinSlideshow_btnMouseover() {
            $("#btnlistID li").mouseover(function() {
                var curLiIndex = $("#btnlistID li").index($(this));
                switch (settings.moveStyle) {
                    case "left":
                    KinSlideshow_changeFlag = curLiIndex - 1;
                    break;
                    case "right":
                    if (KinSlideshow_firstMoveFlag) {
                        KinSlideshow_changeFlag = curLiIndex - 1;
                        break;
                    } else {
                        KinSlideshow_changeFlag = curLiIndex;
                        break;
                    }
                    case "up":
                    KinSlideshow_changeFlag = curLiIndex - 1;
                    break;
                    case "down":
                    if (KinSlideshow_firstMoveFlag) {
                        KinSlideshow_changeFlag = curLiIndex - 1;
                        break;
                    } else {
                        KinSlideshow_changeFlag = curLiIndex;
                        break;
                    }
                    case "fadein":
                    KinSlideshow_changeFlag = curLiIndex;
                    break;
                }
                KinSlideshow_move(settings.moveStyle);
                $("#btnlistID li").each(function(i) {
                    if (i == curLiIndex) {
                        $(this).css({'background-position':'-3px -3px'});
                    } else {
                        $(this).css({'background-position':'-20px -3px'});
                    }
                })
            })
        };
        function KinSlideshow_btnMouseclick() {
            $("#btnlistID li").click(function() {
                var curLiIndex = $("#btnlistID li").index($(this));
                switch (settings.moveStyle) {
                    case "left":
                    KinSlideshow_changeFlag = curLiIndex - 1;
                    break;
                    case "right":
                    if (KinSlideshow_firstMoveFlag) {
                        KinSlideshow_changeFlag = curLiIndex - 1;
                        break;
                    } else {
                        KinSlideshow_changeFlag = curLiIndex;
                        break;
                    }
                    case "up":
                    KinSlideshow_changeFlag = curLiIndex - 1;
                    break;
                    case "down":
                    if (KinSlideshow_firstMoveFlag) {
                        KinSlideshow_changeFlag = curLiIndex - 1;
                        break;
                    } else {
                        KinSlideshow_changeFlag = curLiIndex;
                        break;
                    }
                    case "fadein":
                    KinSlideshow_changeFlag = curLiIndex;
                    break;
                }
                KinSlideshow_move(settings.moveStyle);
                $("#btnlistID li").each(function(i) {
                    if (i == curLiIndex) {
                        $(this).css({
                            background: settings.btn.btn_bgHoverColor,
                            borderColor: settings.btn.btn_borderHoverColor,
                            color: settings.btn.btn_fontHoverColor
                        });
                    } else {
                        $(this).css({
                            background: settings.btn.btn_bgColor,
                            borderColor: settings.btn.btn_borderColor,
                            color: settings.btn.btn_fontColor
                        });
                    }
                })
            })
        };
        function KinSlideshow_mousehover() {
            $("#btnlistID li").mouseover(function() {
                clearInterval(KinSlideshow_setInterval);
            })
            $("#btnlistID li").mouseout(function() {
                KinSlideshow_setInterval = setInterval(function() {
                    KinSlideshow_move(settings.moveStyle)
                },
                KinSlideshow_IntervalTime * 1000 + settings.moveSpeedTime);
            })
        };
        return KinSlideshow_initialize();
    };
})(jQuery);

/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.3
 *
 * Requires: 1.2.2+
 */

;(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
    var toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    var lowestDelta, lowestDeltaXY;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            absDeltaXY = 0,
            fn;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta; }
        if ( orgEvent.detail )     { delta = orgEvent.detail * -1; }

        // New school wheel delta (wheel event)
        if ( orgEvent.deltaY ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( orgEvent.deltaX ) {
            deltaX = orgEvent.deltaX;
            delta  = deltaX * -1;
        }

        // Webkit
        if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY; }
        if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Look for lowest delta to normalize the delta values
        absDelta = Math.abs(delta);
        if ( !lowestDelta || absDelta < lowestDelta ) { lowestDelta = absDelta; }
        absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
        if ( !lowestDeltaXY || absDeltaXY < lowestDeltaXY ) { lowestDeltaXY = absDeltaXY; }

        // Get a whole value for the deltas
        fn = delta > 0 ? 'floor' : 'ceil';
        delta  = Math[fn](delta / lowestDelta);
        deltaX = Math[fn](deltaX / lowestDeltaXY);
        deltaY = Math[fn](deltaY / lowestDeltaXY);

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

}));