(function(window, navigator, document) {
    var W = parseInt(window.innerWidth),
        H = parseInt(window.innerHeight);
    var phoneScale;
    var myWidth;
    if (W < H) {
        phoneScale = W / 640;
        myWidth = H / phoneScale;
    } else {
        phoneScale = H / 640;
        myWidth = W / phoneScale;
    }
    if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
        var version = parseFloat(RegExp.$1);
        if (version > 2.3) {
            document.write('<meta name="viewport" content="width=' + myWidth + ', minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
        } else {
            document.write('<meta name="viewport" content="width=' + myWidth + ', target-densitydpi=device-dpi">');
        }
    } else {
        document.write('<meta name="viewport" content="width=' + myWidth + ', user-scalable=no, target-densitydpi=device-dpi">');
    }
})(window, navigator, document);