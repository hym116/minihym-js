var guanchazhe = function() {

    var _this;

    var stark = {};

    function on(e, fn) {
        if (!stark.hasOwnProperty(e)) {
            stark[e] = [];
        }
        stark[e].push(fn);
    }

    function trigger(e) {
        if (stark.hasOwnProperty(e)) {
            var args = Array.prototype.slice.call(arguments,1);
            for (var i = 0, len = stark[e].length; i < len; i++) {
                stark[e][i].apply(_this, args);
            }
        }
    }

    function off(e, fn) {
        if (stark.hasOwnProperty(e)) {
            if (fn) {
                var cbs = stark[e];
                var index = cbs.indexOf(fn);
                if (index > -1) {
                    cbs.splice(index);
                }
            } else {
                delete stark[e];
            }
        }
    }

    function one(e, fn) {
        on(e, function() {
            fn.call(_this);
            off(e);
        });
    }

    _this = {
        on: on,
        off: off,
        one: one,
        trigger: trigger
    };

    return _this;


};

var guanchazhe1 = guanchazhe();
guanchazhe1.on('complate', function(a) {
    alert('complate: '+a);
});
guanchazhe1.trigger('complate','ok');