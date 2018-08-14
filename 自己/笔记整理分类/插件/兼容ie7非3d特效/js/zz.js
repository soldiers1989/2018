window.onload = function(){

	$(document).ready(function(){
		//	我们的优势
		var $ad = $('#advantage_a1').children('div');
		$ad.eq(0).css('background-image','url("http://127.0.0.1:8020/qyzx/images/ad_logo1.png")');
		$ad.eq(1).css('background-image','url("http://127.0.0.1:8020/qyzx/images/ad_logo2.png")');
		$ad.eq(2).css('background-image','url("http://127.0.0.1:8020/qyzx/images/ad_logo3.png")');
		$ad.eq(3).css('background-image','url("http://127.0.0.1:8020/qyzx/images/ad_logo4.png")');
		$ad.eq(4).css('background-image','url("http://127.0.0.1:8020/qyzx/images/ad_logo5.png")');
		$ad.eq(5).css('background-image','url("http://127.0.0.1:8020/qyzx/images/ad_logo6.png")');
		$ad.eq(6).css('background-image','url("http://127.0.0.1:8020/qyzx/images/ad_logo7.png")');
		$ad.eq(7).css('background-image','url("http://127.0.0.1:8020/qyzx/images/ad_logo8.png")');
	
		var $sh=$('#advantage_a1').children();
		var $hi=$('.hidden_box');
		$sh.hover(function (){  			
            $hi.eq($(this).index()).show();
       },function (){  
            $hi.eq($(this).index()).hide();  
        }); 
	
//		精选案例 
		$(function() {
			$(".btn").show();
			$(".btn  a:first").addClass("active");	
			$().gallery({
				current: [".show_images_1",".show_images_1_img"],
				left: [".show_images_2",".show_images_2_img"],
				right: [".show_images_3",".show_images_3_img"],
			none: [".show_images_4",".show_images_4_img"],
				duration: 500,
				autoChange : true,
				changeTimeout: 3000,
				stopTarget : ".header_stage"
			});
		});
	
//		建站流程
		var $si = $('#site_a1').children('div');
		$si.eq(0).css('background-image','url("http://127.0.0.1:8020/qyzx/images/build_site1.png")');
		$si.eq(1).css('background-image','url("http://127.0.0.1:8020/qyzx/images/build_site2.png")');
		$si.eq(2).css('background-image','url("http://127.0.0.1:8020/qyzx/images/build_site3.png")');
		$si.eq(3).css('background-image','url("http://127.0.0.1:8020/qyzx/images/build_site4.png")');
		$si.eq(0).css('margin-right','81px');
		$si.eq(1).css('margin-right','81px');
		$si.eq(2).css('margin-right','81px');
	
//		成功案例
		var $su1= $('#success_a2_a1').children('div');
		$su1.eq(0).css('background-image','url("http://127.0.0.1:8020/qyzx/images/success_case1.jpg")');
		$su1.eq(1).css('background-image','url("http://127.0.0.1:8020/qyzx/images/success_case2.jpg")');
		$su1.eq(2).css('background-image','url("http://127.0.0.1:8020/qyzx/images/success_case3.jpg")');
		$su1.eq(3).css('background-image','url("http://127.0.0.1:8020/qyzx/images/success_case4.jpg")');
		var $su2= $('#success_a2_a2').children('div');
		$su2.eq(0).css('background-image','url("http://127.0.0.1:8020/qyzx/images/mobile1.jpg")');
		$su2.eq(1).css('background-image','url("http://127.0.0.1:8020/qyzx/images/mobile2.jpg")');
		$su2.eq(2).css('background-image','url("http://127.0.0.1:8020/qyzx/images/mobile3.jpg")');
		$su2.eq(3).css('background-image','url("http://127.0.0.1:8020/qyzx/images/mobile4.jpg")');
	
		$('#mob').click(function(){
			$('#success_a2_a2').css('display','block');
			$('#pc').css('background-color','white');
			$('#pc').css('color','black');
			$('#mob').css('background-color','#639bf0');
			$('#mob').css('color','white');			
		})
		$('#pc').click(function(){
			$('#success_a2_a2').css('display','none');
			$('#pc').css('background-color','#639bf0');
			$('#pc').css('color','white');
			$('#mob').css('background-color','white');
			$('#mob').css('color','black');			
		})	
	
	
	})
	
}


