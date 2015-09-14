define('js/modules/libs/ui/tip/tip', ['require', 'exports', 'module', "js/modules/libs/ui/popup/popup", "jquery"],function(require, exports, module) {
var Boxy = require("js/modules/libs/ui/popup/popup");
$ = require("jquery");
Boxy.tip = function(message, options, offset) {
    var _WARPPER = Boxy.WRAPPER;
    var content = $('<div>' + message + '</div>');
    var _offset = {
        x: 0,
        y: 0
    };


    Boxy.WRAPPER = '<div class="boxy-tip-wrapper boxy-tip tip-arrow-' + options.arrow + '"><div class="boxy-tip-arrow"><b><i></i></b></div><div class="boxy-inner"></div></div>';
    options.fixed = false;
    options.show = false;

    var _tip = new Boxy(content, options);
    var size = _tip.getSize();
    var tipHeight = size[1];

    Boxy.tip.refreshPosition(_tip,$.extend(_offset,offset));

    _tip.show();

    Boxy.WRAPPER = _WARPPER;
};
Boxy.tip.refreshPosition = function(tip,offset) {
    var obj = $(tip.options.actuator);
    var pos = obj.offset();
    var oWidth = obj.outerWidth();
    var oHeight = obj.outerHeight();
    var windowWidth = $(window).outerWidth();
    var size = tip.getSize();
    switch (tip.options.arrow) {
        case "left": //TODO
            tip.moveTo((pos.left + oWidth + 7),pos.top - 5);
            break;
        case "right": //TODO
            tip.moveTo((windowWidth - pos.left + 7),pos.top - 5);
            break;
        case "top":
            tip.moveTo(pos.left + (oWidth - size[0]) / 2 + offset.x, (pos.top + oHeight + 7 + offset.y));
            break;
        case "bottom":
            tip.moveTo(pos.left + (oWidth - size[0]) / 2 + offset.x, (pos.top - size[1] - 7 + offset.y));
            break;
        default: //TODO
            tip.moveTo((pos.left + oWidth + 7),pos.top - 5);
            break;
    }
};
module.exports = Boxy;
});