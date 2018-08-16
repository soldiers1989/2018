
//导航栏

//音乐
$('#mp3-img').click(function(){
	if($(this).attr('src') == 'img/musicon.gif'){
		$(this).attr('src','img/musicoff.gif');
		$('#mp3').attr('src','');
	}else{
		$(this).attr('src','img/musicon.gif');
		$('#mp3').attr('src','img/NL不分 - 勇者无疆.mp3');
	}	
})

//下标倒三角与导航标题
$('.li1').click(function(){	
	var left1 = ($(this).width()/2+$(this).offset().left)-($('.mark').width()/2+$('.mark').offset().left);
	var left2 = parseInt($('.mark').css('left')) + left1;
	$('.mark').animate({left:left2},400);
	
	$('.img2>img').attr('src','img/home.png');
	$(this).css('color','black').siblings().css('color','#004ff2');	
}) 
$('.img2').click(function(){
	var left1 = ($(this).width()/2+$(this).offset().left)-($('.mark').width()/2+$('.mark').offset().left);
	var left2 = parseInt($('.mark').css('left')) + left1;
	$('.mark').animate({left:left2},400);
	
	$('.img2>img').attr('src','img/home_gruen.png');	
	
	$('.li1').css('color','#004ff2');
}) 



//上下切换页面轮播效果
$('.round2>li').click(function(){
	$(this).attr('class','white').siblings().attr('class','');
	
	$('.flex-container').animate({top:80-$(this).index()*694},400);
	
	//绑定导航下标与右边圆点按钮
	$('.header-1>ul>li').eq($(this).index()).trigger('click');
})


//绑定导航下标与右边圆点按钮
$('.header-1>ul>li').click(function(){
	$('.round2>li').eq($(this).index()).attr('class','white').siblings().attr('class','');	
	$('.flex-container').animate({top:80-$(this).index()*694},400);
})



//滚轮事件
$(document).on("mousewheel DOMMouseScroll", function (ev) {
			
	var delta = (ev.originalEvent.wheelDelta && (ev.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  
				(ev.originalEvent.detail && (ev.originalEvent.detail > 0 ? -1 : 1));             	
	
	var ind = $('.round2').children('li[class=white]').index();
	//下标移动动画与上下页面滚动效果
	function flg(){
		$('.round2').children().each(function(i,elem){
			if( $(elem).attr('class') == 'white' ){
				var $oFlg = $('.header-1').find('li').eq(i);
				var left1 = ($oFlg.width()/2+$oFlg.offset().left)-($('.mark').width()/2+$('.mark').offset().left);
				var left2 = parseInt($('.mark').css('left')) + left1;
				
				$('.mark').animate({left:left2},400);
				$('.flex-container').animate({top:80-i*694},400);
			}
		})
	}
	
	
	
	if (delta > 0) {		
	
//		右边圆点按钮组		
		if( ind > 0 ){
			$('.round2>li').eq(ind-1).attr('class','white').siblings().attr('class','');
		}
				
//		导航按钮组与下标	

		if( $('.li1').eq(3).css('color') == 'rgb(0, 0, 0)' ){
			$('.li1').eq(2).css('color','black').siblings().css('color','#004ff2');
			
		
		}else if( $('.li1').eq(2).css('color') == 'rgb(0, 0, 0)' ) {
			$('.li1').eq(1).css('color','black').siblings().css('color','#004ff2');

		}else if( $('.li1').eq(1).css('color') == 'rgb(0, 0, 0)' ) {
			$('.li1').eq(0).css('color','black').siblings().css('color','#004ff2');

		}else if( $('.li1').eq(0).css('color') == 'rgb(0, 0, 0)' ) {
			$('.img2>img').attr('src','img/home_gruen.png');
			$('.li1').css('color','#004ff2');
		}
		
		flg();
								
		
	} else if (delta < 0) {	
		
//		右边圆点按钮组		
		if( ind < 5 ){
			$('.round2>li').eq(ind+1).attr('class','white').siblings().attr('class','');
		}
		
//		导航按钮组与下标
		
		if( $('.img2>img').attr('src') == 'img/home_gruen.png'){
			$('.img2>img').attr('src','img/home.png');
			$('.li1').eq(0).css('color','black').siblings().css('color','#004ff2');
			
		
		}else if( $('.li1').eq(0).css('color') == 'rgb(0, 0, 0)' ) {
			$('.li1').eq(1).css('color','black').siblings().css('color','#004ff2');

		}else if( $('.li1').eq(1).css('color') == 'rgb(0, 0, 0)' ) {
			$('.li1').eq(2).css('color','black').siblings().css('color','#004ff2');

		}else if( $('.li1').eq(2).css('color') == 'rgb(0, 0, 0)' ) {
			$('.li1').eq(3).css('color','black').siblings().css('color','#004ff2');
		}
				
		flg();
		
		
	}
});





//第一个页面3D切换效果
$('.round1>li').click(function(){	
			
	//切换里页面的背景内容
	function fn(html,bg){
		$('.bg1 div').first().html(html);
		$('.bg1 div').first().css('background',bg);
	}
	
	switch($(this).index()){		
		case 0: fn('one layer','#dc6c5f'); break;
		case 1: fn('two layer','#95dc84'); break;
		case 2: fn('three layer','#64b9d2'); break;
		case 3: fn('four layer','black'); break;
		default: console.log('错啦错啦你错啦~~~'); break;		
	}
	
	
	if($(this).index() > $('.round1>li[class="white"]').index()){
		
		//从右往左
		$('.one').toggleClass('left-page2');
		$('.two').toggleClass('right-page2');
		
		var back = setTimeout(function(){			
			$('.bg1').children().eq(1).after($('.bg1').children().eq(0));				
		},500);		
				
		var back2 = setTimeout(function(){	
			
			$('.one').toggleClass('left-page2');
			$('.two').toggleClass('right-page2');						
		},550);		
	
	}else if($(this).index() < $('.round1>li[class="white"]').index()){		
		
		//从左往右
		$('.one').toggleClass('left-page1');
		$('.two').toggleClass('right-page1');
		
		var back = setTimeout(function(){
			$('.bg1').children().eq(1).after($('.bg1').children().eq(0));			
		},500);
	
		var back2 = setTimeout(function(){	
		
			$('.one').toggleClass('left-page1');
			$('.two').toggleClass('right-page1');			
		},550);		

	}
		
	//圆圈按钮变成白色
	$(this).attr('class','white').siblings().attr('class','');
		
	var back3 = setTimeout(function(){	
		clearTimeout(back);
		clearTimeout(back2);
		fn1();
	},1050);	
	function fn1(){
		clearTimeout(back3);
	}
	
})



//第二个页面
//翻转图片
//$('.right>div').mouseover(function(){
//	$('this').addClass('right_img');
//	console.log(123);
//});
//$('.right>div').mouseout(function(){
//	$('this').removeClass('right_img');
//});

console.log();



//第三个页面
//机器人
function robLeft(){
	$('.robot').animate({left:400},4000,'linear',function(){
		robRight();		
		$('.robot>img').toggleClass('rob-Reverse');
	});	
}

function robRight(){
	$('.robot').animate({left:860},4000,'linear',function(){
		robLeft();	
		$('.robot>img').toggleClass('rob-Reverse');
	});
}

robLeft();


//图片放大旋转
$(document).ready(function(){
	
	function iVary(obj){
		obj.toggleClass('iVary');
	}
	
	$('.div3>img').mouseover(function(){		
		var flg = $(this).parent().index();
		$(this).next().fadeIn(500,iVary($('.div3').eq(flg).children('img')));
	});
	$('.div3>div').mouseleave(function(){
		var flg = $(this).parent().index();
		$(this).fadeOut(500,iVary($('.div3').eq(flg).children('img')));
	});
	
	$('.div4>img').mouseover(function(){
		$('.fade2').fadeIn(500,iVary($('.div4').children('img')));
	});
	$('.fade2').mouseleave(function(){
		$('.fade2').fadeOut(500,iVary($('.div4').children('img')));
	});
	
});




//第四个页面









