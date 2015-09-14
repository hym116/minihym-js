define('js/modules/apis/api-aio', function(require, exports, module) {
var API = {};

API.getUrl = function(module,key){
    var api = API[module.toUpperCase()];
    return api._PREFIX + api[key];
};

API.USER = {
    _PREFIX : "/user/",

    // 登陆图形验证码
    LOGIN_VCODE_REFRESH : "logincode?refresh=true",

    // 找回密码图形验证码
    FINDPASS_VCODE_REFRESH : "findpasswordcode?refresh=true",

    // 验证图形验证码
    VCODE_CHECK : "check-vcode",

    // 登陆
    LOGIN_GET_HTML : "login",
    LOGIN_FORM_ACTION : "login",

    // 是否注册过
    IF_REGISTER : "is-registerfp",

    // 注册
    REGISTER_GET_HTML : "register",
    REGISTER_FORM_ACTION : "register",

    // 找回密码
    FINDPASS_GET_HTML : "find-password",
    FINDPASS_FORM_ACTION : "find-password",

    // 手机验证码
    MVCODE_SEND : "send-message",
    MVCODE_CHECK : "mobile-code",

    // 设置密码
    SETPASS_FORM_ACTION : "set-password",

    // 邮件验证
    EMAIL_SEND : "send-message",

    // 省市联调
    PROVINCE_CITY : "proc-city"

};

API.PRODUCT = {

    _PREFIX : "/product/",

    // 获取产品byUid
    GET_PRODUCT_BY_UID : "myproduct",

    // 关注产品
    FOLLOW_PRODUCT : "follow",

    // 删除产品
    DELETE_PRODUCT : "del",

    // 编辑产品
    EDIT_PRODUCT : "editchoose",

    //发布第一步
    CREAT_BUILD : "createbuild"

};

API.UCENTER = {

    _PREFIX : "/ucenter/",

    // 关注用户
    FOLLOW_USER : "follow",

    // 邮箱验证
    EMAIL_PROVE : "email-prove",

    // 邮箱修改验证
    EMAIL_EDIT : "edit-email",

    // del-order
    ORDER_DELETE : "del-order",
    // 收货地址
     ADDRESS :"address",
     //基本信息
     PERSONAL :"personal",
     //修改密码
     EDITPASS :"edit-pw",
     //验证码验证
     EDIT_EMAIL:"email-prompt"
     
};

API.ACTIVITY = {

    _PREFIX : "/activity/",

    // 关注用户
    BAIYING_SIMPLE_DATA : "baiyingattr",

    D365_SIMPLE_DATA : "attrprocess",

    D365_COMPLEX_DATA : "productattributefour",
    PUBLISH_365: "publish",
    PUBLISH_DIY: "pub-bydiy",
    PUBLISH_OF: "pub-byof"
};
API.SPECIAL = {

    _PREFIX : "/special-topic/",

    // 365专题页
    D365_CHOOSE_PRODUCT : "apply365days",
    BAIYING_CHOOSE_PRODUCT : "applybaiying",
};

API.USERHOME = {

    _PREFIX : "/home-page/",

    // 个人中心产品列表
    LISTS : "lists",
};

API.SUPPORT = {

    _PREFIX : "/support/",

    // 支持活动按钮
    CHOOSE_ACTIVITY : "choose-activity",
};

API.PAYMENT = {

    _PREFIX : "/payment/",

    // 收货地址
    ADDRESS :"address",

    // 订单是否支付
    WEICHECK: "weicheck"
};

module.exports = API;

});