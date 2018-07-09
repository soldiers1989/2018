
var _kefu=['<img class="kefu-group-btn u-toggle" src="http://www.hj9999.hk/statics/kefuimage/del.png"/>',
    '<a class="kefu-group active xuanfu" target="_blank" href="http://vipwebchat.tq.cn/sendmain.jsp?action=chat&version=vip&admiuin=9146666&ltype=1&iscallback=1&page_templete_id=26317&is_message_sms=0&is_send_mail=0&uin=9796322&tq_rand=410381635156901',
    '    <div class="kefu-group-inner">',
    '        <img src="http://www.hj9999.hk/statics/version03/images/kefu.jpg"/>',
    '    </div>',
    '</a>'].join("");



$(function(){
				var $kefuGroup = $(".kefu-group");
			$("body").on("click",".kefu-group-btn",
				function() {
					if($kefuGroup.hasClass("active")) {
						$kefuGroup.hide(100);
						$(this).attr("src", "http://www.hj9999.hk/statics/kefuimage/plus.png");
						$kefuGroup.removeClass("active")
					} else {
						$kefuGroup.show(100);
						$(this).attr("src", "http://www.hj9999.hk/statics/kefuimage/del.png");
						$kefuGroup.addClass("active")
					}
				});
})


//$(".kefu-group-btn").click(
//  function () {
//      if($kefuGroup.hasClass("active")){
//          $kefuGroup.hide(100);
//          $(this).attr("src","http://www.hj9999.hk/statics/kefuimage/plus.png");
//          $kefuGroup.removeClass("active")
//      }
//      else{
//          $kefuGroup.show(100);
//          $(this).attr("src","http://www.hj9999.hk/statics/kefuimage/del.png");
//          $kefuGroup.addClass("active")
//      }
//  });