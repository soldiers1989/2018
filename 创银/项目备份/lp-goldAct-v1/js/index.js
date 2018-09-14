'use strict';
//添加公用部分
$(".content").prepend(_jyheader).append(_jyfooter);
//	活动规则
$("#actRuleBtn").on("click",function(){
	$("#rulesBox").show();
	$(".rulesbox_cont").animate({
		height: 584
	},300);
});
$("#rulesBoxClose").on("click",function(){
	$(".rulesbox_cont").animate({
		height: 0
	},300,function(){
		$("#rulesBox").hide();
	});
});
//立即加入我们-提交表单
function yanzheng(){
	var uname = $("#user").val();
	var uphone = $("#phone").val();
	if( uname.trim() == '' ){
        alert("昵称不能为空");
        $("#user").focus();
        return false;
    };
    if( !(/^1[3|4|5|7|8]\d{9}$/.test( uphone )) ){
        alert("请正确填写手机号码！");
        $("#phone").focus();
        return false;
    };
    console.log(uname);
    //提交数据
    $.ajax({
        type:"post",	 
	    url:"http://www.hj9999.hk/index.php?m=huangjinshenqing&c=index&a=send",
	    data:{uname:uname,uphone:uphone,dosubmit:1},
	    success:function(data){
		    $("#succTipMask").fadeIn(500);
	    },
	    error:function(){
		   alert("网络故障，请检查");
	    }
   });
   return false;
}
$("#succTipClose").click(function(){
	$("#succTipMask").fadeOut(500);
})
//  右边悬浮客服
$(document).scroll(function(){
	var serverH = $(document).scrollTop()+200;
	if( $(document).scrollTop() > 580 ){
		$("#server").slideDown(100);
		$("#server").animate({
			top: serverH
		},30);
	}else{
		$("#server").slideUp(100);
	}
});
