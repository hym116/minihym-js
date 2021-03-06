(function(window,document){
    var styles = '.fe-floatmenu{position: fixed;top:10px;padding:5px;background: #fff;border:1px solid #919191;z-index:100000000;width:150px;}.fe-floatmenu>ul{display: block;}.fe-floatmenu.show{width:200px;padding:2px;}.fe-floatmenu.show>ul{display: block;}.fe-floatmenu.show>a{text-align:center;}.fe-floatmenu a{color:#434343;display: block;height:35px;line-height:35px;}.fe-floatmenu li{border:1px solid #fff;padding:2px 6px;margin-bottom:-1px;background: #f0f0f0;}.fe-floatmenu .close{display:block;position:absolute;right:2px;top:2px;color:#00a1d7;}.fe-floatmenu a:hover{color:#00a1d7;}.fe-floatmenu>ul>li>ul{display: block;padding-left:10px;}.fe-floatmenu>ul>li>ul>li>ul{display: block;padding-left:10px;}.fe-floatmenu>ul>li>ul>li>ul>li>ul{display: none;padding-left:10px;}.fe-floatmenu .hassubmenu>a{position: relative;padding-bottom:3px;}.fe-floatmenu .hassubmenu>a:after{content:"+";position: absolute;right:0;top:0;}.fe-floatmenu .hassubmenu.show>ul{display: block;}.fe-floatmenu .hassubmenu.show>a:after{content:"-";}';
    var html = '<div class="fe-floatmenu">'+
        '<a href="javascript:;">页面导航</a>'+'<a class="close" href="javascript:;">关闭</a>'+
        '<ul>'+
            '<li><a href="index.html">首页</a></li>'+
            '<li><a href="contest.html">大赛介绍</a></li>'+
            '<li><a href="comment.html">评委嘉宾</a></li>'+
            '<li class="hassubmenu"><a href="javascript:;">新闻消息</a>'+
                '<ul>'+
                    '<li><a href="news.html">新闻消息</a></li>'+
                    '<li><a href="article-detail.html">文章详情</a></li>'+
                '</ul>'+
            '</li>'+ 

            '<li class="hassubmenu"><a href="javascript:;">报名</a>'+
                '<ul>'+
                '<li><a href="register.html">报名</a></li>'+
                    '<li><a href="success.html">报名成功</a></li>'+
                    '<li><a href="fail.html">报名失败</a></li>'+
                '</ul>'+
            '</li>'+  
            '<li class="hassubmenu"><a href="javascript:;">其他</a>'+
                '<ul>'+
                    '<li><a href="error404.html">404页面</a></li>'+
                '</ul>'+
            '</li>'+
        '</ul>'+
    '</div>';
    var styleWrap = document.createElement("style");

    styleWrap.innerHTML = styles;
    document.body.appendChild(styleWrap);

    var htmlWrap = document.createElement("div");
    htmlWrap.innerHTML = html;
    document.body.appendChild(htmlWrap);

    var $ = document.querySelectorAll.bind(document);

    Element.prototype.on = Element.prototype.addEventListener;

    NodeList.prototype.on = function (event, fn) {
        [].forEach.call(this, function (el) {
            el.on(event, fn);
        });
        return this;
    };

    var css = function(t,s){
      s = document.createElement('style');
      s.innerText=t;
      document.body.appendChild(s);
    };
    $(".fe-floatmenu>a").on("click",function(e){
        $("a.close")[0].style.display="block";
        this.parentNode.classList.add('show');
    });

    $(".fe-floatmenu").on("mouseleave",function(e){
        // this.classList.remove('show');
    });
    $(".close").on("click",function(e){
        $("a.close")[0].style.display="none";
         $(".fe-floatmenu")[0].classList.remove('show');
    });
    $(".fe-floatmenu .hassubmenu").on("click",function(e){
        e.stopPropagation();
        var obj = this.children[1];
        var display = window.getComputedStyle(obj).display;
        if (display == "block") {
            this.classList.toggle('show');
        }else if(display == "none"){
            this.classList.toggle('show');
        }
    });

})(window,document);