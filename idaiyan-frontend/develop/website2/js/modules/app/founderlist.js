var $ = require("jquery");
var Follow = require("pkgs/follow");
var API = require("apis/api-aio");
require("js/modules/libs/ui/dropkick/dropkick");
$(function(){
	$(".contact .add").each(function(){
    	var that=$(this);
        var parent=that.closest(".founditem");
        var people=parent.find(".people");
    	new Follow(that, {
            uid: parent.data("uid"),
            likedClass: "hover",
            callback:function(data){
                if (typeof parseInt(data.data.follow === "number")) {
                    people.text(data.data.follow);
                }
            }
        
        });
    });
    $(".city-check .js-check-active").click(function(){
        var that = $(this);
        var parent = that.closest(".formitem");
        var itemWrap = parent.find(".item-wrap");

        that.hide();
        itemWrap.show();
    });
    (function(){
        // 如果后端输出的是两个type 为hidden的input
        $("#select-industry").dropkick();
        $("#prodname").dropkick();
        $("#select-user").dropkick();
        var dkCity;
        $("#select-province").dropkick({
            change: function(){
                var dk = this;

                updatacity(this.value,function(){
                    dkCity.refresh();
                });
            }
        });
        $("#select-city").dropkick({
            initialize: function(){
                var citySelected = $("#city").find(":selected");
                this.selectOne(citySelected[0]);
            },
        });

        //更新城市下拉菜单
        function updatacity(id, callback) {
            $.ajax({
                    url: API.getUrl("USER", "PROVINCE_CITY"),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        id: id
                    }
                })
                .done(function(data) {
                    var html = "<option selected>选择市</option>";
                    if (data.code === "0") {
                        var arr = data.data;
                        for (var i = 0; i < arr.length; i++) {
                            html += '<option value="' + arr[i].id + '">' + arr[i].name + '</option>';
                        }
                    }
                    $("#select-city").html(html);
                    if (callback) {
                        callback();
                    }
                    console.log("success");
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        }

    })();
   
});