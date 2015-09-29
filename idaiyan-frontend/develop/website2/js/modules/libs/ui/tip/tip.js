var Boxy = require("popup");
$ = require("jquery");
Boxy.tip = function(message, options){
    var _WARPPER = Boxy.WRAPPER;
    var content = $('<div>' + message + '</div>');

    Boxy.WRAPPER = '<div class="boxy-tip-wrapper boxy-tip tip-arrow-'+options.arrow+'"><div class="boxy-tip-arrow"><b><i></i></b></div><div class="boxy-inner"></div></div>';
    options.fixed=false;
    options.show=false;

    var _tip = new Boxy(content, options);
    var size = _tip.getSize();
    var tipHeight = size[1];

    Boxy.tip.reflashPosition(_tip);

    _tip.show();

    Boxy.WRAPPER = _WARPPER;
};
Boxy.tip.reflashPosition = function(tip){
    var obj = $(tip.options.actuator);
    var offset = obj.offset();
    var oWidth = obj.outerWidth(); 
    var oHeight = obj.outerHeight(); 
    var windowWidth = $(window).outerWidth();
    var size = tip.getSize();
    switch (tip.options.arrow){
        case "left"://TODO
            options.position={left:(offset.left+oWidth+7),top:offset.top-5};
        break;
        case "right"://TODO
            options.position={right:(windowWidth-offset.left+7),top:offset.top-5};
        break;
        case "top":
            tip.moveTo( offset.left + (oWidth - size[0]) / 2 ,(offset.top+oHeight+7));
        break;
        case "bottom":
            tip.moveTo( offset.left + (oWidth - size[0]) / 2 ,(offset.top-size[1]-7));
        break;
        default:
            options.position={left:(offset.left+oWidth+7),top:offset.top-5};
        break;
    }
}
module.exports = Boxy;