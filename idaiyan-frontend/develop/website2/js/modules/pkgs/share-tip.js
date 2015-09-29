var $ = require("jquery");
var Boxy = require("tip");
exports.init = function(proditem) {
    /*
     * 分享到气泡
     */
    proditem = proditem || $(document);
    proditem.on("mouseenter", ".share a", function() {
        var tip = Boxy.linkedTo(this);
        var message = $(this).attr("title");

        if (tip) {
            tip.show();
        } else {
            if (message) {
                Boxy.tip(message, {
                    actuator: $(this)[0],
                    arrow: 'top'
                });
            }
        }
    }).on("mouseleave", ".share a", function() {
        var tip = Boxy.linkedTo(this);
        if (tip) {
            tip.hide();
        }
    });
};