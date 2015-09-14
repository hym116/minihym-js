/*
 * Vision:1.0.0
 * Create:dezhao.chen
 * @onBridgeReady()
*/


			function onBridgeReady() {
			var mainTitle="南极！南极！我们该一起上船了!",
			mainDesc="创业家+投资家+探险家的南极18天冰火蜕变之旅",
			mainURL=location.href,
			mainImgUrl= "http://cdn.iheima.com/base/img/sm_njy.jpg?111";

			    //转发朋友圈
			    WeixinJSBridge.on("menu:share:timeline", function(e) {
			    	var data = {
			    		img_url:mainImgUrl,
			    		img_width: "120",
			    		img_height: "120",
			    		link: mainURL,
			            //desc这个属性要加上，虽然不会显示，但是不加暂时会导致无法转发至朋友圈，
			            desc: mainDesc,
			            title: mainTitle
			        };
					
			        WeixinJSBridge.invoke("shareTimeline", data, function(res) {
			        	WeixinJSBridge.log(res.err_msg)
			        });
			    });
			    //同步到微博
			    WeixinJSBridge.on("menu:share:weibo", function() {
			    	WeixinJSBridge.invoke("shareWeibo", {
			    		"content": mainDesc,
			    		"url": mainURL
			    	}, function(res) {
			    		WeixinJSBridge.log(res.err_msg);
			    	});
			    });
			    //分享给朋友
			    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
			    	
			    	WeixinJSBridge.invoke("sendAppMessage", {
			    		img_url: mainImgUrl,
			    		img_width: "120",
			    		img_height: "120",
			    		link: mainURL,
			    		desc: mainDesc,
			    		title: mainTitle
			    	}, function(res) {
			    		WeixinJSBridge.log(res.err_msg)
			    	});
			    });
			};

//执行
	document.addEventListener('WeixinJSBridgeReady', function() {
		onBridgeReady();
	});