var UA = navigator.userAgent,browserName,browserVersion,deviceName;
function detectBrowser(){
	if(/Firefox[\/\s](\d+\.\d+)/.test(UA)){ browserName="firefox"; var ffversion=new Number(RegExp.$1);browserVersion=Math.floor(ffversion); }
	if(/MSIE (\d+\.\d+);/.test(UA)){browserName="internet explorer";var ieversion=new Number(RegExp.$1);browserVersion=Math.floor(ieversion); }
	if(/Opera[\/\s](\d+\.\d+)/.test(UA)){browserName="opera";var oprversion=new Number(RegExp.$1);browserVersion=Math.floor(oprversion); }
	if((UA.toLowerCase().indexOf('chrome')>-1)&&(UA.toLowerCase().indexOf('safari')!=-1)){browserName="chrome";browserVersion="";}
	if((UA.toLowerCase().indexOf('chrome')==-1)&&(UA.toLowerCase().indexOf('safari')!=-1)){browserName="safari";browserVersion="";}
};
function detectDevice(){
	if((UA.match(/iPhone/i))||(UA.match(/iPod/i))||(UA.match(/iPad/i))){deviceName="iosdevice";}
	else if(UA.match(/Android/i)){deviceName="android";}
	else if(UA.match(/BlackBerry/i)){deviceName="blackberry";}
	else if(UA.match(/IEMobile/i)){deviceName="iemobile";}
	else if(UA.match(/Silk/i)){deviceName="kindle";}
	else{deviceName="computer";}
};
function isMobile(){if(deviceName=="iosdevice"||deviceName=="android"){return true;}else{return false;}};
function isIOS(){if(deviceName=="iosdevice"){return true;}else{return false;}};
function isSafari(){if(browserName=="safari"){return true;}else{return false;}};
function isWebapp(){return navigator.standalone;};

//DETECT DEVICE
detectBrowser();
detectDevice();

$(function(){
    //针对非iOS设备缩放
    if(deviceName!="iosdevice"){
        var res = window.innerWidth >= 640 ?  1 : window.innerWidth/640;
        $("body").eq(0).css('zoom', res);
    }
});