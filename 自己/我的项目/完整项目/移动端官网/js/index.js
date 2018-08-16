//common
$('#back-top').click(function(){
	$("html,body").animate({
		scrollTop: 0
	},300);
})

//index
var id_nav = $('#id-nav .d1').length;
var id_nav_h = Math.ceil(id_nav/4)*0.86;
$('#id-switch').click(function(){
//	console.log($('#id-nav').css('height'));
	if( $('#id-switch').is('.zhankai') ){
		$('#id-nav').animate({
			height: '0.86rem'
		},300,function(){
			$('#id-switch').toggleClass('zhankai');
		});	
		
	}else{
		$('#id-nav').animate({
			height: id_nav_h+"rem"
		},300,function(){
			$('#id-switch').toggleClass('zhankai');
		});
	}
	
})

//product_detail
$('#is-show').click(function(){
	if( $('.pd-head .r-show').height()=='0' ){
		$('.pd-head .r-show').animate({
			height:'1.7rem'
		})
	}else{
		$('.pd-head .r-show').animate({
			height:'0'
		})
	}
})     
$('#pd-xx .d2').click(function(){
	$(this).addClass('ac');
	$('#pd-xx .d1').removeClass('ac')
	$('.none').css('display','none');
	$('.pd-info-cs').css('display','block');
})
$('#pd-xx .d1').click(function(){
	$(this).addClass('ac');
	$('#pd-xx .d2').removeClass('ac')
	$('.none').css('display','block');
	$('.pd-info-cs').css('display','none');
})
//分享
$('#share-switch,#share-remove,.bdsharebuttonbox a').click(function(){
	$('#mark').toggleClass('none2');
})

//问答
$(".song1220_zk").live('click',function(){
    var oBtn = $(this);
    if(oBtn.find("img").hasClass("xz_img")){
    	oBtn.parent("h3").siblings(".hd_list").slideUp(200);
    	oBtn.find("img").removeClass("xz_img");
    }else{
    	oBtn.parent("h3").siblings(".hd_list").slideDown(200);
    	oBtn.find("img").addClass("xz_img");
    }
});

$("textarea").focus(function(){
    var textval=$(this).val();
    if(textval=="请一句话描述您的问题..."){
        $(this).val("");
    }
});
$("textarea").blur(function(){
    var textval=$(this).val();
    textval=$.trim(textval);
    if(textval==""){
        $(this).val("请一句话描述您的问题...");
    }
});

$("#tj-submit").click(function(){
    var textval=$("#qa textarea").val();
    textval=$.trim(textval);
    var nameval=$("#qa .ip1").val();
    nameval=$.trim(nameval);
    var iphoneval=$("#qa .ip3").val();
    if(textval=="请一句话描述您的问题..." || textval==""){
        $(".song1220_wd_ceng").html("请输入问题描述！");
        song1220_ceng();
        return false;
    }
    if(nameval=="请输入您的姓名" || nameval==""){
        $(".song1220_wd_ceng").html("请输入姓名！");
        song1220_ceng();
        return false;
    }
    if(iphoneval=="请输入您的电话" || iphoneval==""){
        $(".song1220_wd_ceng").html("请输入电话！");
        song1220_ceng();
        return false;
    }
    if(!iphoneval.match(/^((1)+\d{10})$/)){
        $(".song1220_wd_ceng").html("请输入正确的电话！");
        song1220_ceng();
        return false;
    }

    var jsonData = {
        'name':nameval,
        'content':textval,
        'mobile':iphoneval,
    };

    $.ajax({
    	url: "http://m.qyjz.17kb.com/427769/qa/ask/",
        type: "post",
        data: jsonData,
        dataType: 'json',
        success:function(result) {
            if(result.ok) {
			   $(".song1220_wd_ceng").html("发布成功！");
       			song1220_ceng();
               // $("#question_content,#wdtjname,#wdtjphone").val('');
				setTimeout(function(){
					window.location.href = location.href;  
				},2200);
            }else{
                alert(result.msg);
            }
        }
    });

});
function song1220_ceng(){
    $(".song1220_wd_ceng").fadeIn(200);
    setTimeout(function(){
        $(".song1220_wd_ceng").fadeOut(200);
    },2000);
}
        
        


