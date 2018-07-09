$("<link>").attr({ rel: "stylesheet", type: "text/css", href: "http://www.jygold.net/statics/jy2015/qq/style.css"}).appendTo("head");
//$("<link>").attr({ rel: "stylesheet", type: "text/css", href: "http://localhost/jy/jygold.net/statics/jy2015/qq/style.css"}).appendTo("head");

/*中间弹窗*/
document.writeln("<div id=\"online_service_ask\">");

document.writeln("	<div class=\"askbg\"></div>");
document.writeln("	<div class=\"askbox\">");

document.writeln("  <div class=\"osapopclose\" onclick=\"javascript:cls_srv_div('#online_service_ask');\"></div>");

document.writeln("  <a class=\"osapopbtn osapopbtn1\" href=\"javascript:void(0)\" onclick=\"javascript:TQOpenChatUid(9697522);\">客服咨询</a>");
document.writeln("  <a class=\"osapopbtn osapopbtn2\" href=\"http://wpa.qq.com/msgrd?v=3&uin=3111810084&site=金裕代理&menu=yes\" target=\"_blank\">QQ客服</a>");

document.writeln("	</div>");
document.writeln("</div>");



/*右客服*/
document.writeln("<div id=\"online_service_bar\">");
document.writeln("<div class=\"close\"></div>");
document.writeln("	<ul>");

document.writeln("    <li class=\"tq dail\"><a id=\"JY-daili\" href=\"javascript:void(0)\">客服咨询</a>");
document.writeln("    <div class=\"son\"><a class=\"stq\" id=\"JY-dailitq\" href=\"https://v1.live800.com/live800/chatClient/chatbox.jsp?companyID=515221&configID=41928&jid=6934404885&s=1&returnbt=1\" target=\"_blank\">在线客服</a><div class=\"line\"></div><a class=\"sqq\" id=\"JY-dailiqq\" href=\"http://wpa.qq.com/msgrd?v=3&uin=3111810084&site=金裕代理&menu=yes\" target=\"_blank\" onclick=\"ga('send', 'event', 'jygold','chat-ib-qq', 'float-right');\">QQ客服</a></div> </li>");
//document.writeln("    <div class=\"son\"><a class=\"stq\" id=\"JY-dailitq\" href=\"javascript:void(0)\" onclick=\"javascript:TQOpenChatUid(9697522);ga('send', 'event', 'jygold','chat-ib-tq', 'float-right');\">在线客服</a><div class=\"line\"></div><a class=\"sqq\" id=\"JY-dailiqq\" href=\"http://wpa.qq.com/msgrd?v=3&uin=3111810084&site=金裕代理&menu=yes\" target=\"_blank\" onclick=\"ga('send', 'event', 'jygold','chat-ib-qq', 'float-right');\">QQ客服</a></div> </li>");

/*document.writeln("    <li class=\"tq\"><a id=\"JY-kefu\" href=\"javascript:void(0)\">在线客服</a>");
document.writeln("    <div class=\"son\"><a class=\"stq\" id=\"JY-kefutq\" href=\"javascript:void(0)\" onclick=\"javascript:TQOpenChatWin(9697153);ga('send', 'event', 'jygold','chat-tq', 'float-right');\">在线客服</a><div class=\"line\"></div><a class=\"sqq\" id=\"JY-kefuqq\" href=\"http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDEzNTQ4Nl8zMzYyMDJfODAwMTM1NDg2XzJf\" target=\"_blank\" onclick=\"ga('send', 'event', 'jygold','chat-qq', 'float-right');\">QQ客服</a></div> </li>");*/

document.writeln("    <li class=\"ewm\"><a href=\"javascript:void(0)\">官方微信</a>");
document.writeln("    <div class=\"son\"><img src=\"http://www.jygold.net/statics/jy2015/qq/ew.jpg\" width=\"112\" height=\"112\" /><em>微信公众号<br />金裕环球代理</em></div></li>");
/*document.writeln("    <li class=\"active\"><a href=\"http://www.jygold.net/jylicaijin/\" target=\"_blank\">专业客服</a></li>");*/
//document.writeln("    <div class=\"son\"><a href=\"http://www.jygold.net/zengjin/\" target=\"_blank\"><img src=\"http://www.jygold.net/statics/jy2015/qq/huodong.png\" /></a></div></li>");

document.writeln("    <li class=\"gotop\"><a href=\"javascript:void(0)\"></a></li>");

document.writeln("	</ul>");

document.writeln("	</div>");

$(function(){
	

	$("#online_service_bar li").hover(function(){
		$(this).find("div.son").show();
	},function(){
		$(this).find("div.son").hide();
	})

	$("#online_service_bar .close").click(function(){
		$("#online_service_bar").hide();
	})


		
})	

function TQOpenChatWin(preuin){
	window.open('http://vipwebchat.tq.cn/pageinfo.jsp?version=vip&admiuin=9146666&ltype=0&iscallback=1&page_templete_id=35224&is_message_sms=0&is_send_mail=0&action=acd&acd=1&type_code=3', '_blank', 'height=544, width=744,toolbar=no,scrollbars=no,menubar=no,status=no');	
}

function TQOpenChatUid(preuin){
	window.open('http://vipwebchat.tq.cn/pageinfo.jsp?version=vip&admiuin=9146666&ltype=0&iscallback=1&page_templete_id=35224&is_message_sms=0&is_send_mail=0&action=acd&acd=1&type_code=3', '_blank', 'height=544, width=744,toolbar=no,scrollbars=no,menubar=no,status=no');	
}



//弹窗
function pop_srv_div(id){
	var W = $(window),
		D = $(document),
		M = $(id),
		vtop = (W.height()-M.height())/2,
		vleft = (W.width()-M.width())/2;
	M.css({
		top: vtop+"px",
		left: vleft+"px"
	}).show();
}
//关闭弹窗
function cls_srv_div(id){
	$(id).hide();
}


/*
 * 返回顶部
 */
//document.writeln("<div class=\"gotop\"><a href=\"#\"></a></div>");
$(document).ready(function(){
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(window).scroll(function(){ 
        if ($(window).scrollTop()>100){

            $(".gotop a").stop().animate({"height":"72px"}, 300);
        } else { 
            $(".gotop a").stop().animate({"height":"0"}, 300); 
        } 
    });

    $(".gotop").click(function(){ 
       $('body,html').animate({scrollTop:0},500); return false; })

})

//cnzz
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan style=\"display:none;\" id='cnzz_stat_icon_1260985671'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1260985671' type='text/javascript'%3E%3C/script%3E"));