var $ = require("jquery");
var zrender = require('zrender');
var SectorShape = require('zrender/shape/Sector');

// 默认配置
var OPTION = {
    x : 0,
    y : 0,
    r : 0,
    r0 : 0,
    startAngle : 90,
    endAngle : 90,
    color : "#000"
};
var TIMEOUT = 16.67;

// 构造函数
function Progress(obj,a,option,time){
    this.option = $.extend({},OPTION,option);
    this.canvas = $(obj)[0];
    this.zr = zrender.init( this.canvas );
    this.zr.clear();
    this.width = Math.ceil(this.zr.getWidth());
    this.height = Math.ceil(this.zr.getHeight());
    this.angle = a * 360;
    this.step = this.angle / (time / TIMEOUT);
    this.style = {
        x : this.option.x,
        y : this.option.y,
        r : this.option.r,
        r0 : this.option.r0,
        startAngle : this.option.startAngle,
        endAngle : this.option.endAngle,
        color : this.option.color,
        brushType : 'both',
        lineWidth : 0,
        lineJoin : 'round'
    };
    this.init();
}

// 角度转换方法
Progress.prototype._trans = function(d){
    return 90-d;
};

// 初始化方法
Progress.prototype.init = function(){
    this.sector = new SectorShape({
        style : this.style,
        hoverable : false
    });
};

// 显示方法
Progress.prototype.show = function(){
    var that = this;
    this.zr.addShape(this.sector);
    this.zr.render(function(){
        var now = 0;
        var animationTicket = setInterval(function(){
            var style = that.sector.style;
            if( that.angle - now < that.step ){
                clearInterval(animationTicket);
                style.startAngle = that._trans( that.angle );
            }else{
                style.startAngle = that._trans(now += that.step);
            }
            //console.log(style.startAngle);
            that.zr.modShape(that.sector.id, style);
            that.zr.refresh();
        },TIMEOUT);
    });
};

// 重置方法
Progress.prototype.reset = function(){
    this.zr.clear();
};
module.exports = Progress;