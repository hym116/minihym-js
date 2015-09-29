$(function(){
  // 下拉菜单
 //  $(".reset_select").on("click",function(){
 //    var that = $(this);
 //    var parent = that.closest(".select-wrap");
 //    parent.addClass('active');
 // });
    $(".reset_select").on("change",function(){
        var that = $(this);
        var parent = that.closest(".select-wrap");
        var select_container = parent.find(".selected-item");
        // parent.removeClass('active');
        select_container .text(that.find("option:selected").text());
    });
    // 弹窗关闭按钮
    $(".closebtn").on("click",function(){
          $("#add-del").hide();
    });
    // 删除地址
    $(".del").on("click",function(){
        var that = $(this);
        that.closest(".addr-itemwrap").remove();
    });
    // 添加地址
    $(".add-item").on("click",function(e){
        $(".dynamictitle").text("添加地址");
        $("#add-del").show();
        e.stopPropagation();
    })
    // 修改地址
    $(".mod").on("click",function(e){
        var that =$(this);
        // var parent = that.closest(".addr-itemwrap");
        // var name = parent.find(".name").text();
        // var tel = parent.find(".tel").text();
        // var province = parent.find(".item-province").text();
        // var city = parent.find(".item-city").text();
        // var town = parent.find(".item-town").text();
        // var detailPlace = parent.find(".detailplace").text();
        // var name = parent.find(".name");
        // $("#name").val(name);
        // $("#tel").val(tel);
        // $("#name").val(name);
        // $("#name").val(name);
        $(".dynamictitle").text("修改地址");
        $("#add-del").show();
        e.stopPropagation();
    });
    //省市县联动
    $("#province").on("change",function(){
        location.href = "http://www.baidu.com"
        var that = $(this);
        var city_box = $("#city");
        var data_val = that.val();
        console.log(data_val);
        var URL = city_box.data("api");
        var html='';
        $.ajax({
            url: URL,
            type: 'GET',
            dataType: 'json',
            data:{ id:data_val}
        }).done(function(data) {
                if(data.code == 0){
                    var city_opt;
                    city_box.empty();
                    for(var i = 0;i<data.data.length;i++){
                         //city_opt=$('<option></option>').attr({value:data.data[i].id}).text(data.data[i].name).appendTo(city_box);
                        html += '<option value="'+data.data[i].id+'">'+data.data[i].name+'</option>';
                    }
                    city_box.append(html);
                    city_box.closest(".select-wrap").find(".selected-item").text(data.data[0].name);

                }else {
                    alert(data.data.msg);
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

    });
});