define(function(){

var jQuery = require("jquery");

(function($) {
    jQuery.fn.extend({
        uploadPreview: function(opts) {
            opts = jQuery.extend({
                maxSize:300,
                imgType: ["gif", "jpeg", "jpg", "bmp", "png"],
                callback: function(img) { return false; }
            }, opts || {});
            //var _self = this;
            var _this = $(this);

            var sizeCheck = function(imageSize){
                if( (imageSize/1024) > opts.maxSize) {
                    alert('图片大小不能超过'+opts.maxSize+'K');
                    return false;
                }else{
                    return true;
                }
            }

            var typeCheck = function(imagepath){
                if (!RegExp("\.(" + opts.imgType.join("|") + ")$", "i").test(imagepath.toLowerCase())) {
                    alert("图片类型必须是" + opts.imgType.join("，") + "中的一种");
                    this.value = "";
                    return false;
                }else{
                    return true;
                }
            }
            var callback = opts.callback;

            _this.change(function() {
                
                if (this.value) {
                    if (!typeCheck(this.value)) {
                        return false;
                    }

                    if (this.files && this.files[0]) {   

                        if (!sizeCheck(this.files[0].size)) {
                            return false;
                        };
                        
                        var reader = new FileReader(); 
                        reader.onload = function (e) {                                      
                            callback(e.target.result);  
                        };
                        _this.imgSrc = this.files[0];
                        reader.readAsDataURL(this.files[0]); 

                    }  
                }
            });
        }
    });
})(jQuery);


	return jQuery.fn.uploadPreview;
})