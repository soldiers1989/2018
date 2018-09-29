'use strict';
//添加公用部分
$(".content").prepend(_jyheader).append(_jyfooter);
//	花瓣
$("#banner").snowfall({  flakeCount: 7, minSize: 20, maxSize: 26, minSpeed: 3, maxSpeed: 3, image: "images/flake1.png" });
$("#banner").snowfall({  flakeCount: 7, maxSize: 24, maxSpeed: 3, image: "images/flake2.png" });
$("#banner").snowfall({  flakeCount: 7, maxSize: 22, maxSpeed: 2, image: "images/flake3.png" });
$("#banner").snowfall({  flakeCount: 7, maxSize: 20, maxSpeed: 1, image: "images/flake4.png" });
$("#banner").snowfall({  flakeCount: 7, maxSize: 18, maxSpeed: 3, image: "images/flake5.png" });
$("#banner").snowfall({  flakeCount: 7, maxSize: 16, maxSpeed: 2, image: "images/flake6.png" });
$("#banner").snowfall({  flakeCount: 7, maxSize: 14, maxSpeed: 1, image: "images/flake7.png" });

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
//	活动规则
$("#activityRule").on("click",function(){
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
//	点差额度优惠计算器
function accMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
function accSubtr(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}
function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (arg1*m+arg2*m)/m
}
function calculatet(){
    var type = gedom("type").options[gedom("type").selectedIndex].value;
    var account = gedom("account").options[gedom("account").selectedIndex].value;
    var count = gedom("count").value;
    var buy = gedom("buy").value;
    var sell = gedom("sell").value;
    var result = gedom("box-result");
    var rs0 = "";
    if(type==0){
        rs0 = accMul(accMul(accSubtr(sell,buy),count),100);
    }
    else if (type==1){
        rs0 = accMul(accMul(accSubtr(buy,sell),count),100);
    }
    var rs1 = accMul(count,account);
    var rs2= accAdd(rs0,rs1);

    result.innerHTML = rs0+"+"+rs1+"="+rs2;
}
function gedom(id){
    return document.getElementById(id);
}