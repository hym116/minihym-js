var T;
var N;
var Z = 0;
var siteURL = "http://static.idaiyan.cn/special/web_20141221/";
$(function(){
    var windowW = $(window).width(),
        mainW = $("#main").width(),
        mainH = $("#main").height(),
        picwallW = windowW - mainW,
        $obj = $('<div id="pics" />'),
        html = "",
        imgPath = siteURL+"img/img_done",
        max = 896;
    $obj.css({
        display:"inline-block",
        overflow:"hidden",
        width:picwallW,
        height:mainH,
        background:"#000"
    });
    $("body").prepend($obj);

    var _i;
    for (var i = max; i > 0; i--) {
        if (i<1000) {
            _i = "" + "0" + i;
        }
        if (i<100) {
            _i = "" + "00" + i;
        }
        if (i<10) {
            _i = "" + "000" + i;
        }
        html += '<img src="' + imgPath + '/img_' + _i + '.jpg">';
    }
    $obj.append(html);
    $(document).on("keyup",function(e){
        var body = $("body");
        var animating = body.hasClass("animating");
        var imgs = $obj.find("img");
        var main = $("#main");
        var nums = main.find(".num-main .num");
        var zhongs = main.find(".zhong-main .zhong");
        if (e.keyCode == 32) {
            e.stopPropagation();
            $(".btn").removeClass("act");
            if (!animating) {
                body.addClass("animating");
                $.ajax({
                    //url: '/weixin/changezjstate/idaiyan/t/' + new Date().getTime(),
                    url: siteURL+'json/result.html',
                    type: 'GET',
                    dataType: 'json'
                })
                .done(function(res) {
                    loop(res.num);
                    console.log("success");
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
                //loop();
            }else{
                clearTimeout(T);
                nums.each(function(i){
                    $(this).attr("class","num num-"+N[i]);
                });
                zhongs.eq(Z).text(N);
                Z += 1;
                body.removeClass("animating");
            }
        }

        function loop(num){
            T = setTimeout(function(){
                var n = Math.floor(Math.random()*896);
                var c = $obj.find(".c");
                nums.each(function(){
                    var x = Math.floor(Math.random()*10);
                    $(this).attr("class","num num-"+x);
                });
                if (c.length) {
                    c.addClass("transition").removeClass("c");
                    setTimeout(function(){
                        c.removeClass("transition");
                    },300);
                }
                imgs.eq(n).addClass("c");
                if(num){
                    N = num;
                }
                loop();
            },15);
        }
    });
    $(document).on("keydown",function(e){
        if (e.keyCode == 32) {
            e.stopPropagation();
            $(".btn").addClass("act");
        }
    });


});
