var nextpage;

$(function(){
	var currentPage=0,
		prewPage,
		$ul=$(".form-list"),
		$li=$(".form-list > li"),
		total=$li.length;
		
	nextpage=function(){
		
		if(currentPage<=total-1){
			prewPage=currentPage;
			++currentPage;
			
			$li.eq(currentPage).addClass("current");
			
			setTimeout(function(){
				$li.eq(prewPage).removeClass("current");
			},1500);
			
			$li.eq(prewPage).find(".item").addClass("formOut");
			
			setTimeout(function(){
				$li.eq(prewPage).find(".item").removeClass("formOut");
			},1500);
			
			$li.eq(currentPage).find(".item").addClass("formIn");
			setTimeout(function(){
				$li.eq(currentPage).find(".item").removeClass("formIn");
			},1500);
			
		}
		
	}
	
	
	
//	切换按钮

$(".tab-btn").bind("click",function(){
	$(this).toggleClass("on");
	$(this).toggleClass("off");
	$(".password-input").toggle();
	$(".code-input").toggle();
});
$("#info-logo").bind("click",function(){
	$("#info-logo-data").click();
});

	
});
