var jQuery = require("jquery");

(function($) {
    jQuery.fn.extend({
        uploadPreview: function(opts) {
            opts = jQuery.extend({
                maxSize: 4096,
                imgType: ["gif", "jpeg", "jpg", "bmp", "png"],
                callback: function() { return false; }
            }, opts || {});
            //var _self = this;
            var _this = $(this);

            var isIE = !-[1,];
            var ie6 = isIE && !window.XMLHttpRequest;

            var sizeCheck = function(imageSize){
                if( (imageSize/1024) > opts.maxSize) {
                    alert('图片大小不能超过'+opts.maxSize+'K');
                    return false;
                }else{
                    return true;
                }
            };

            var typeCheck = function(imagepath){
                if (!RegExp("\.(" + opts.imgType.join("|") + ")$", "i").test(imagepath.toLowerCase())) {
                    alert("图片类型必须是" + opts.imgType.join("，") + "中的一种");
                    this.value = "";
                    return false;
                }else{
                    return true;
                }
            };
            var callback = opts.callback;

            _this.change(function() {

                if (this.value) {
                    if (!typeCheck(this.value)) {
                        return false;
                    }
                    if (isIE && !(function() {"use strict";return this === undefined;}()) ) {

                        if (ie6) {

                            var image = new Image();
                            image.onload = function(){
                                if (!sizeCheck(image.fileSize)) {
                                    return false;
                                }
                                callback(_this.imgSrc);
                            };
                            _this.imgSrc = image.src = 'file:///' + this.value;
                        }  else {

                            this.select();
                            var img = document.selection.createRange().text;
                            var image = new Image();
                            image.onload = function(){
                                if (!sizeCheck(image.fileSize)) {
                                    return false;
                                }
                                callback(_this.imgSrc);
                            };
                            _this.imgSrc = image.src = img;
                        }
                    }
                    else {
                        try{
                            var file = null;
                            var size = 0;
                            if(this.files && this.files[0] ){
                                file = this.files[0]; 
                                size = file.size;
                            }else if(this.files && this.files.item(0)) {
                                file = this.files.item(0);
                                size = file.fileSize;
                            }

                            if (!sizeCheck(size)) {
                                return false;
                            }

                            //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
                            try{
                                //Firefox7.0 以下
                                _this.imgSrc = file.getAsDataURL();
                                callback(_this.imgSrc);
                            }catch(e){
                                //Firefox8.0以上
                                _this.imgSrc = window.URL.createObjectURL(file);
                                callback(_this.imgSrc);
                            }

                        }catch(e){
                            //支持html5的浏览器,比如高版本的firefox、chrome、ie10
                            if (this.files && this.files[0]) {
                                if (!sizeCheck(this.files[0].size)) {
                                    return false;
                                }

                                var reader = new FileReader();
                                reader.onload = function (e) {
                                    callback(e.target.result);
                                };
                                _this.imgSrc = this.files[0];
                                reader.readAsDataURL(this.files[0]);

                            }
                        }
                    }
                }
            });
        }
    });
})(jQuery);

return jQuery.fn.uploadPreview;