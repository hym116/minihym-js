/**
 * zrender: 日志记录
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 */

define('js/modules/libs/zrender/tool/log', 
    ['require', 'js/modules/libs/zrender/config'],function (require) {
        var config = require('js/modules/libs/zrender/config');

        return function() {
            if (config.debugMode === 0) {
                return;
            }
            else if (config.debugMode == 1) {
                for (var k in arguments) {
                    throw new Error(arguments[k]);
                }
            }
            else if (config.debugMode > 1) {
                for (var k in arguments) {
                    console.log(arguments[k]);
                }
            }
        };

        /* for debug
        return function(mes) {
            document.getElementById('wrong-message').innerHTML =
                mes + ' ' + (new Date() - 0)
                + '<br/>' 
                + document.getElementById('wrong-message').innerHTML;
        };
        */
    }
);
