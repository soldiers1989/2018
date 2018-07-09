$(function(){
	// function fontSize(){
	// var deviceWidth = $(document).width();
	// if(deviceWidth > 640){
	// 	deviceWidth = 640;
	// 	console.log(deviceWidth);
	// }

	// var fontSize = deviceWidth / 6.4;
	// $("html").css("fontSize",fontSize);
	// console.log(fontSize)
	// }

	// fontSize();

	// $(window).resize(function(){
	// 	fontSize();
	// });
	 var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 3000,
        autoplayDisableOnInteraction : false,
        loop:true
    });
    var swiper2 = new Swiper('.swiper-container02', {   
	    slidesPerView: 1,
	    paginationClickable: true,
	    spaceBetween: 30,
	    loop: true,
	    speed:2000,
		autoplay: 3000,
		autoplayDisableOnInteraction: false
	});
    function tabs(changTitle, changeCon){
		$(changTitle).click(function(){
			var _index=$(this).index();
			$(this).addClass('on').siblings().removeClass();
			$(changeCon).eq(_index).show().siblings(changeCon).hide();
		})
	};
	tabs('.GetList li','.changeCon');
	$('.floatgame img').click(function(){
		$('.floatgame').animate({
			'right':0
		},200);
		$('.floatgame img').hide();
	});

	$('.leftck').click(function(){
		$('.floatgame').animate({
			'right':'-23.2rem'
		},200,function(){
			$('.floatgame img').show();
		});

	})
})