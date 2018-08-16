'use strict';
var c = 0;
var time = setInterval(timer,2000);

$(".slideshow").on("mouseover mouseout", function(event){
	if(event.type === "mouseover"){
//		console.log('鼠标移入');
		clearInterval(time);
	}else if(event.type === "mouseout"){
//		console.log('鼠标移出');
		time = setInterval(timer,2000);
	}
});
function timer(){
	c = $(".ban_control .ac").index();
	c++;
	c = (c === 5)? 0 : c;
	
	$(".ban_img").eq(c).addClass("show").siblings().removeClass("show");
	$(".ban_control li").eq(c).addClass("ac").siblings().removeClass("ac");
};

$(".ban_control").on("click","li",function(){
	clearInterval(timer);
	
	var inum = $(this).index();
//	console.log(inum);
	$(this).addClass("ac").siblings().removeClass("ac");
	$(".ban_img").eq(inum).addClass("show").siblings().removeClass("show");
	
	
});

