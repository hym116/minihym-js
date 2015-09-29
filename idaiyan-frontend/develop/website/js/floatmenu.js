(function(window,document){
    var styles = '.fe-floatmenu{position: fixed;top:10px;width:40px;padding:5px;background: #fff;border:1px solid #000;z-index:100000000;}.fe-floatmenu>ul{display: none;}.fe-floatmenu.show{width:200px;padding:2px;}.fe-floatmenu.show>ul{display: block;}.fe-floatmenu.show>a{text-align:center;}.fe-floatmenu a{color:#434343;display: block;}.fe-floatmenu li{border:1px solid #fff;padding:2px 6px;margin-bottom:-1px;background: #f0f0f0;}.fe-floatmenu a:hover{color:#00a1d7;}.fe-floatmenu>ul>li>ul{display: none;padding-left:10px;}.fe-floatmenu>ul>li>ul>li>ul{display: none;padding-left:10px;}.fe-floatmenu>ul>li>ul>li>ul>li>ul{display: none;padding-left:10px;}.fe-floatmenu .hassubmenu>a{position: relative;padding-bottom:3px;}.fe-floatmenu .hassubmenu>a:after{content:"+";position: absolute;right:0;top:0;}.fe-floatmenu .hassubmenu.show>ul{display: block;}.fe-floatmenu .hassubmenu.show>a:after{content:"-";}';
    var html = '<div class="fe-floatmenu">'+
        '<a href="javascript:;">页面导航</a>'+
        '<ul>'+
            '<li><a href="index.html">首页</a></li>'+
            '<li class="hassubmenu"><a href="javascript:;">产品浏览</a>'+
                '<ul>'+
                    '<li><a href="product-list.html">产品列表</a></li>'+
                    '<li><a href="proditem.html">产品详情</a></li>'+
                '</ul>'+
            '</li>'+
            '<li class="hassubmenu"><a href="javascript:;">产品发布</a>'+
                '<ul>'+
                    '<li><a href="uc-prodadd-step1.html">产品发布第一步</a></li>'+
                    '<li><a href="uc-prodadd-step2.html">产品发布第二步/修改</a></li>'+
                '</ul>'+
            '</li>'+
            '<li class="hassubmenu"><a href="javascript:;">下单流程</a>'+
                '<ul>'+
                    '<li><a href="order-step1.html">下单第一步/类型金额选择</a></li>'+
                    '<li><a href="order-step2.html">下单第二步/数量选择</a></li>'+
                    '<li><a href="order-step3.html">下单第三步/订单信息填写</a></li>'+
                    '<li><a href="order-step4.html">下单第四步/付款页</a></li>'+
                    '<li><a href="order-step5.html">下单第五步/付款结果页</a></li>'+
                    '<li><a href="order-support-list.html">支持列表</a></li>'+
                '</ul>'+
            '</li>'+
            '<li class="hassubmenu"><a href="javascript:;">代言视频</a>'+
                '<ul>'+
                    '<li><a href="daiyanlist.html">代言列表</a></li>'+
                    '<li><a href="daiyanitem.html">代言详情</a></li>'+
                '</ul>'+
            '</li>'+
            '<li><a href="activity_365_step1.html">活动申请选择</a></li>'+
            '<li class="hassubmenu"><a href="javascript:;">365活动</a>'+
                '<ul>'+
                    '<li><a href="activity-365-timeline.html">365时间轴</a></li>'+
                    '<li><a href="activity_365.html">365详情页</a></li>'+
                    '<li><a href="http://static.idaiyan.cn/special/h5_activity365/index.html">365详情页H5</a></li>'+
                    '<li><a href="activity_365_step2.html">365申请第二部</a></li>'+
                    '<li><a href="activity-365-edit.html">365修改</a></li>'+
                    '<li><a href="special-365.html">365专题</a></li>'+
                '</ul>'+
            '</li>'+
            '<li class="hassubmenu"><a href="javascript:;">一呼百应活动</a>'+
                '<ul>'+
                    '<li><a href="activity-baiying-apply.html">一呼百应有锁定</a></li>'+
                    '<li><a href="activity-baiying-edit.html">一呼百应无锁定</a></li>'+
                    '<li><a href="special-yihubaiying.html">一呼百应专题</a></li>'+
                    '<li><a href="http://static.idaiyan.cn/special/h5_activity_baiying/index.html">一呼百应H5活动</a></li>'+
                '</ul>'+
            '</li>'+
            '<li class="hassubmenu"><a href="javascript:;">中国好产品活动</a>'+
                '<ul>'+
                    '<li><a href="activity_product_step2.html">中国好产品申请</a></li>'+
                    '<li><a href="activity-product-charts.html">中国好产品排名</a></li>'+
                    '<li><a href="activity_product_detail.html">中国好产品展示</a></li>'+
                    '<li><a href="special-goodproduct.html">中国好产品专题</a></li>'+
                    '<li><a href="http://static.idaiyan.cn/special/h5_20150515_haochanpin/index.html">中国好产品招募H5</a></li>'+
                    '<li><a href="http://static.idaiyan.cn/special/h5_20150515_haochanpin_show/index.html">中国好产品展示H5</a></li>'+
                '</ul>'+
            '</li>'+
            '<li><a href="user-home.html">个人主页</a></li>'+
            '<li class="hassubmenu"><a href="javascript:;">个人中心</a>'+
                '<ul>'+
                    '<li><a href="uc-orderlist.html">订单列表</a></li>'+
                    '<li><a href="uc-trade.html">账单列表</a></li>'+
                    '<li><a href="uc-coupon.html">优惠券</a></li>'+
                    '<li><a href="uc_bindinfo.html">绑定信息</a></li>'+
                    '<li><a href="uc-mod-email1.html">修改信息</a></li>'+
                '</ul>'+
            '</li>'+
            '<li><a href="founderlist.html">创始人</a></li>'+
            '<li class="hassubmenu"><a href="javascript:;">动态</a>'+
                '<ul>'+
                    '<li><a href="news-index.html">动态首页</a></li>'+
                    '<li><a href="news-detail.html">动态详情页</a></li>'+
                    '<li><a href="news-column-list.html">动态列表页</a></li>'+
                    '<li><a href="dynamic.html">动态发布页</a></li>'+
                '</ul>'+
            '</li>'+
            '<li class="hassubmenu"><a href="javascript:;">注册/登陆/找回密码</a>'+
                '<ul>'+
                    '<li><a href="uc_login.html">登陆</a></li>'+
                    '<li><a href="uc_regist.html">注册</a></li>'+
                    '<li class="hassubmenu"><a href="javascript:;">找回密码</a>'+
                    '<ul>'+
                        '<li><a href="uc_password.html">找回密码第一步</a></li>'+
                        '<li><a href="uc_password_reset.html">找回密码手机第二步</a></li>'+
                        '<li><a href="uc_password_success.html">找回密码邮箱第二步</a></li>'+
                        '<li><a href="uc_forget_password.html">找回密码第三布</a></li>'+
                    '</ul></li>'+
                    '<li class="hassubmenu"><a href="javascript:;">第三方登陆</a>'+
                        '<ul>'+
                            '<li><a href="uc_complete1.html">完善信息第一步</a></li>'+
                            '<li><a href="uc_complete2.html">完善信息第二步手机</a></li>'+
                            '<li><a href="uc_complete3.html">完善信息第二步邮箱</a></li>'+
                        '</ul>'+
                    '</li>'+
                    '<li><a href="ajax-form.html">ajax登陆等</a></li>'+
                '</ul>'+
            '</li>'+
            '<li class="hassubmenu"><a href="javascript:;">其他</a>'+
                '<ul>'+
                    '<li><a href="404.html">404</a></li>'+
                    '<li><a href="500.html">500</a></li>'+
                    '<li><a href="aboutus.html">关于我们</a></li>'+
                    '<li><a href="useragreement.html">用户协议</a></li>'+
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

    $(".fe-floatmenu>a").on("mouseenter",function(e){
        this.parentNode.classList.add('show');
    });

    $(".fe-floatmenu").on("mouseleave",function(e){
        this.classList.remove('show');
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