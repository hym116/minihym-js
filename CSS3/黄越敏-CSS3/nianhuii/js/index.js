

(function(){
	
	console.log("Vision:1.0.0;" +
    "Email:10949221@qq.com;" +
    "Create:dezhao.chen;");
    //
function debug(str){
    $("#debugbox").append('<p>'+encodeURI(str)+'</p>')
}

function isWeixin(){
    var UA = navigator.userAgent;
    // alert(UA)
    if (/MicroMessenger/.test(UA)){
        return true
    }else{
        return false
    }
}
function getOSVS(){
    var UA = navigator.userAgent;
    var s = UA.indexOf("OS ");
    if(s == -1){ return false }
    var vs = UA.substr(s+3,5);
    return vs
}

function playPause() {
    var myVideo = document.querySelectorAll('audio')[0];
    var music_btn = document.getElementById('music_btn');
    if (myVideo.paused){
        myVideo.play()
        $('.icon_audio').addClass('border_anim')
    }
    else{
        myVideo.pause()
        $('.icon_audio').removeClass('border_anim')
    }
}

var debugcode = "error:";
$(function(){
    var _bg = document.getElementById('bg'),
        _uparrw = document.getElementById('uparrw'),
        _icon_uparrw = document.getElementById('icon_uparrw');

    var isWEIXIN = isWeixin();
    var os_vs = getOSVS();
    var domeInitEnd = false;
    var myVideo = document.querySelector('audio');

    document.addEventListener('WeixinJSBridgeReady', function() {
        onBridgeReady()
        // _uparrw.querySelector(".cur").innerHTML = "滑动进入";
        if(os_vs >= "7_1_1"){
            debugcode +="os_vs>=7_1_1,";
            // _uparrw.style.display = 'block';
            _uparrw.style.display = 'none';
            //_bg.style.display = 'none';
            document.getElementById("scene").style.display = "block";
            if(!domeInitEnd) {
                initTabDomo()
            }
        }
    })

    if(!isWEIXIN){
        debugcode +="2,";
        // _bg.querySelector("span").innerHTML = "滑动进入";
        _uparrw.querySelector(".cur").innerHTML = "滑动进入";
        _uparrw.style.display = 'block';
        document.getElementById("loading").style.display = "none";
    }

    myVideo.addEventListener('canplaythrough',function(){
        _uparrw.style.display = 'none';
        _bg.style.display = 'none';
        document.getElementById("scene").style.display = "block";
        debugcode +="3,";
        if(!domeInitEnd){
            initTabDomo()
        }
        myVideo.play()
    },false)
    


    
    
    $(document).ready(function(){
    	if(!domeInitEnd){
            _uparrw.style.display = 'none';
            _bg.style.display = 'none';
            document.getElementById("scene").style.display = "block";
            // alert(typeof myVideo.play)
            initTabDomo()
            debugcode +="4,";
        }
        myVideo.play()
    });

    
    function initTabDomo(){
        domeInitEnd = true;
        debugcode +="5,";
        gameTab = new m.Tab({
            target: document.querySelectorAll('.tabs li'),
            trigger: document.querySelectorAll('.triggers li'),
            onchange: function(n){
                console.log(n);
                debugcode +="7,";
                var sprites = this.target[n].querySelectorAll('.img');
                var peo = this.target[n].querySelectorAll('.peo');
                
                
                this.target[n].classList.add("current");
                for(var i = 0; i < sprites.length; i++) {
                    sprites[i].classList.add('show')
                }
                for(var j = 0; j < peo.length; j++) {
                    peo[j].classList.add('show')
                }

                if(this.prevPage !== window.undefined) {
                	this.target[this.prevPage].classList.remove("current");
                    var sprites = this.target[this.prevPage].querySelectorAll('.sprite');
                    for(var i = 0; i < sprites.length; i++) {
                        sprites[i].classList.remove('show')
                    }
                }
                if(n != 0){
                    $("#mainlogo").addClass("zoom_small")
                }else{
                    $("#mainlogo").removeClass("zoom_small")
                }
            },
            touchMove: true
        });
        debugcode +="6,";
    }
})
// onload function end


$(function(){
    //针对非iOS设备缩放
    if(deviceName!="iosdevice"){
        var res = window.innerWidth >= 640 ?  1 : window.innerWidth/640;
        $("body").eq(0).css('zoom', res);
    }

    $('#img_b .peo').click(function(){
        var index = $(this).index();
        $('#title .title').hide().removeClass('titlemove')
        $('#title .title').eq(index).show().addClass('titlemove')
    })

	 //JQuery
	 $(function(){
		    $('.tabs li').parallax();
	});

});
	
	
	
})(Zepto);




