var $ = require("jquery");
var imgfix = function (obj){
    obj = (typeof obj === "string") ? $(obj) : obj;
    obj.each(function(){
        var that = $(this);
        var imgWidth = that.width();
        var imgHeight = that.height();
        that.height(imgWidth);
    });
};
return imgfix;