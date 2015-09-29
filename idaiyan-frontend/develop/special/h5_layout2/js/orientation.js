/* !orientation */
(function(window) {
    var supportOrientation = (typeof window.orientation == "number" && typeof window.onorientationchange == "object"),
        classList = document.documentElement.classList;

    var updateOrientation;
    if (supportOrientation) {
        updateOrientation = function() {
            var orientation = window.orientation;
            switch (window.orientation) {
                case 90:
                case -90:
                    classList.remove("portrait");
                    classList.add("landscape");
                    break;
                default:
                    classList.remove("landscape");
                    classList.add("portrait");
            }
        };
    } else {
        updateOrientation = function() {
            if (window.innerWidth > window.innerHeight) {
                classList.remove("portrait");
                classList.add("landscape");
            } else {
                classList.remove("landscape");
                classList.add("portrait");
            }
        };
    }
    var init = function() {
        updateOrientation();
        if (supportOrientation) {
            window.addEventListener("orientationchange", updateOrientation, false);
        } else {
            window.addEventListener("resize", updateOrientation, false);
        }
    };
    window.addEventListener("DOMContentLoaded", init, false);
})(window);