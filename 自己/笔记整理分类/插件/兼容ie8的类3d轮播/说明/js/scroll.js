$(function(){		   
		var l = true;
	var top = $("#hotmenu").offset().top;
	function doFix()
	{              
		var scrolla=$(window).scrollTop();
		var dis=parseInt(top)-parseInt( scrolla);
		if(l && dis<=0)
		{                
			$("#hotmenu").addClass("fixed_right");
			l=false;
		}
		if(!l && dis>0)
		{
			$("#hotmenu").removeClass("fixed_right");
			l=true;
		}
	}
	$(window).scroll(doFix);
	
})