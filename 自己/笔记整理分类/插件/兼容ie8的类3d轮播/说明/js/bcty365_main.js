if (document.domain != 'www.bcty365.com'){ 
var zurl=document.location.href;
var ourl=document.domain;
var newurl=zurl.replace(ourl,'www.bcty365.com');
window.location.href=newurl;  
} 
$(function(){
  $('.mainlist li').hover(function(){
    $(this).addClass('divOver');  
   },function(){
    $(this).removeClass('divOver'); 
   }
  );
//导航	   
$('#wrap-nav .menu > li').hover(function() {
$(this).find('.children').animate({ opacity:'show', height:'show' },300);
$(this).find('.xiala1').addClass('navhover');
$('.xiala1').removeClass('navbg');
}, function() {
$('.children').stop(true,true).hide();
$('.xiala1').removeClass('navhover');
$('#navid').attr("class",'xiala1 navbg');
}
).slice(-2,-1).find('.children').addClass('sleft');



//滚动
var index = 0;
				var adtimer;
				var _wrap = $("#kt_list"); //
				var len = $("#kt_list ul").length;
				var list=_wrap.find('li');
				 if(list.length>=5)
				 {
				//len=1;
				if (len > 1) {
					$("#kt_list").hover(function() {
						clearInterval(adtimer);
					},
					function() {
						adtimer = setInterval(function() {
			
							var _field = _wrap.find('ul:first'); //此变量不可放置于函数起始处,ui:first取值是变化的
							var _h = _field.height(); //取得每次滚动高度(多行滚动情况下,此变量不可置于开始处,否则会有间隔时长延时)
							_field.animate({
								marginTop: -_h + 'px'
							},
							500,
							function() { //通过取负margin值,隐藏第一行
								_field.css('marginTop', 0).appendTo(_wrap); //隐藏后,将该行的margin值置零,并插入到最后,实现无缝滚动
							})
			
						},
						6000);
					}).trigger("mouseleave");
					
				}
				}
			
			  

});


/**通用焦点大小图切换构建函数**/
/*
 * 
 * 需要自行设定类/feature_list/feature_tabs/feature_tab/feature_out
 * */
var FeatureList = function(fobj,options) {
  function feature_slide(nr) {
    if (typeof nr == "undefined") {
      nr = visible_idx + 1;
      nr = nr >= total_items ? 0 : nr;
    }

    tabs.removeClass(onclass).addClass(offclass).filter(":eq(" + nr + ")").removeClass(offclass).addClass(onclass);
    output.stop(true, true).filter(":visible").hide();
	    output.filter(":eq(" + nr + ")").fadeIn("slow",function() {
	    visible_idx = nr; 
    });
  }

  fobj = (typeof(fobj) == 'string')?$(fobj):fobj;
  fobj = $(fobj).eq(0);
  if(!fobj || fobj.size() == 0) return;

  //轮询间隔，默认2S
  var options      = options || {};
  var visible_idx  = options.startidx || 0;
  var onclass = options.onclass || "current";
  var offclass = options.offclass || "";
  var speed = options.speed || 10000;
  options.pause_on_act = options.pause_on_act || "click";
  options.interval  = options.interval  || 50000;

  var tabs = fobj.find(".f_tabs .f_tab");
  var output = fobj.find(".f_out");
  var total_items = tabs.length;
 
  //初始设定
  output.hide().eq( visible_idx ).fadeIn("slow");
  tabs.eq( visible_idx ).addClass(onclass);

  if (options.interval > 0) {
    var timer = setInterval(function () {
      feature_slide();
    }, options.interval);
    output.mouseenter(function() {clearInterval( timer );}).mouseleave(function() {clearInterval( timer );timer = setInterval(function () {feature_slide();}, options.interval);});
    if (options.pause_on_act == "mouseover") {
        tabs.mouseenter(function() {
        clearInterval( timer );
        
        var idx = tabs.index($(this));
        feature_slide(idx);
      }).mouseleave(function() {
        clearInterval( timer );
        timer = setInterval(function () {
          feature_slide();
        }, options.interval);
      });
    } else {
        tabs.mouseenter(function() {
        clearInterval( timer );
        var idx = tabs.index($(this));
        feature_slide(idx);
      }).mouseleave(function() {
        clearInterval( timer );
        timer = setInterval(function () {
          feature_slide();
        }, options.interval);
      });
		
		
    }
  }
}



 //搜索
	
var getObj = function(id){
	if(!id){
		return false;
	}
	return document.getElementById(id);
};
var searchTxt ="让学习成为一种习惯！";
function searchFocus(e){
	if(e.value ==searchTxt){
		e.value='';
		e.className = '';
	}
}
function searchBlur(e){
	if(e.value == ''){
		e.value=searchTxt;
		e.className = 'gray';
	}
	//e.parentNode.className = 'ip';
}
function getSearchType(evt){
	var e=evt||window.event;
	var n = e.srcElement || e.target;
	if(n && n.tagName!='LI') return;
	n.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML = n.innerHTML;
	var lis = n.parentNode.getElementsByTagName('li');
	for(var i = 0,j=lis.length;i < j;i++){
		lis[i].style.display = '';
	}
	n.style.display='none';
	getObj('typeid').value=n.getAttribute('type');
	n.parentNode.style.display='none';
	
}
function searchInput() {
	if(getObj('search_input').value==searchTxt||getObj('search_input').value=="")
	{
		<!--getObj('search_input').value='';-->
		alert("搜索内容不能为空！");
	return  false;
	}
}

function Tab1(n){
var toptype=document.getElementById("hoth3").getElementsByTagName("a");
var content=document.getElementById("hotmenu").getElementsByTagName("div");
for(i=0;i<toptype.length;i++){
  toptype[i].className=i==n?"f":"";
  content[i].style.display=i==n?"block":"none";
}}


//向上滚动代码
function startmarquee(elementID,h,n,speed,delay){
 var t = null;
 var box = '#' + elementID;
 $(box).hover(function(){
  clearInterval(t);
  }, function(){
  t = setInterval(start,delay);
 }).trigger('mouseout');
 function start(){
  $(box).children('ul:first').animate({marginTop: '-='+h},speed,function(){
   $(this).css({marginTop:'0'}).find('li').slice(0,n).appendTo(this);
  })
 }
}

//运行代码
function runEx(cods)  {
		  var newwin = window.open('',"_blank",'');
		   var code=getObj(cods).value;
		  newwin.document.open('text/html','');
		  newwin.document.write('<script type="text/javascript" src="http://www.bcty365.com/statics/js/bcty365_js/jquery.min.js"></script>');
		  newwin.opener = null 
		  newwin.document.write(code);  
		  newwin.document.close();
	
}

//另存为代码
function saveCode(codx) {

	if (document.all){
		  
	 var cod=getObj(codx);
	 var winname = window.open('', '_blank', 'top=10000'); 
    winname.document.open('text/html', 'replace'); 
    winname.document.write(cod.value); 
    winname.document.execCommand('saveas','','www.bcty365.com.htm'); 
    winname.close();
	}
	else{
	alert("此功能只能在IE上有效");
	}
}
//复制代码
function doCopy(id){
	var testCode=getObj(id).innerText;
	if(copy2Clipboard(testCode)!=false){
	if (document.all){
	var rng = document.body.createTextRange();
	rng.moveToElementText(getObj(id));
	rng.scrollIntoView();
	rng.select();
	rng.collapse(false);
	alert("代码已经复制到粘贴板! ");
	}	
	}else{
 alert("请选中文本，使用 Ctrl+C 复制!");
 }
}
copy2Clipboard=function(txt){
	if(window.clipboardData){
window.clipboardData.clearData();
		window.clipboardData.setData("Text",txt);
	}
	else if(navigator.userAgent.indexOf("Opera")!=-1){
		window.location=txt;
	}
	else if(window.chrome){
	alert("请选中文本，使用 Ctrl+C 复制!");
	}
	else if(window.netscape){
		try{
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		}
		catch(e){			//alert("您的firefox安全限制限制您进行剪贴板操作，请打开’about:config’将signed.applets.codebase_principal_support’设置为true’之后重试，相对路径为firefox根目录/greprefs/all.js");
			return false;
		}
		var clip=Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
		if(!clip)return;
		var trans=Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
		if(!trans)return;
		trans.addDataFlavor('text/unicode');
		var str=new Object();
		var len=new Object();
		var str=Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		var copytext=txt;str.data=copytext;
		trans.setTransferData("text/unicode",str,copytext.length*2);
		var clipid=Components.interfaces.nsIClipboard;
		if(!clip)return false;
		clip.setData(trans,null,clipid.kGlobalClipboard);
	}
}



function copyToClipboard(txt) {
     if(window.clipboardData) {
             window.clipboardData.clearData();
             window.clipboardData.setData("Text", txt);
     } else if(navigator.userAgent.indexOf("Opera") != -1) {
          window.location = txt;
     } else if (window.netscape) {
          try {
               netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
          } catch (e) {
               alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
          }
          var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
          if (!clip)
               return;
          var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
          if (!trans)
               return;
          trans.addDataFlavor('text/unicode');
          var str = new Object();
          var len = new Object();
          var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
          var copytext = txt;
          str.data = copytext;
          trans.setTransferData("text/unicode",str,copytext.length*2);
          var clipid = Components.interfaces.nsIClipboard;
          if (!clip)
               return false;
          clip.setData(trans,null,clipid.kGlobalClipboard);
     }
}
function getClipboard(){if(window.clipboardData){return(window.clipboardData.getData('text'));}else
{if(window.netscape){try
{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");var clip=Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);if(!clip){return;}var trans=Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);if(!trans){return;}trans.addDataFlavor("text/unicode");clip.getData(trans,clip.kGlobalClipboard);var str=new Object();var len=new Object();trans.getTransferData("text/unicode",str,len);}catch(e){alert("您的firefox安全限制限制您进行剪贴板操作，请打开'about:config'将signed.applets.codebase_principal_support'设置为true'之后重试，相对路径为firefox根目录/greprefs/all.js");return null;}if(str){if(Components.interfaces.nsISupportsWString){str=str.value.QueryInterface(Components.interfaces.nsISupportsWString);}else
{if(Components.interfaces.nsISupportsString){str=str.value.QueryInterface(Components.interfaces.nsISupportsString);}else
{str=null;}}}if(str){return(str.data.substring(0,len.value/2));}}}return null;}


(function () {
    $.fn.infiniteCarousel = function () {
        function repeat(str, n) {
            return new Array( n + 1 ).join(str);
        }
        
        return this.each(function () {
            // magic!
            var $wrapper = $('> div', this).css('overflow', 'hidden'),
                $slider = $wrapper.find('> ul').width(9999),
                $items = $slider.find('> li'),
                $single = $items.filter(':first')
                
                singleWidth = $single.outerWidth(),
                visible = Math.ceil($wrapper.innerWidth() / singleWidth),
                currentPage = 1,
                pages = Math.ceil($items.length / visible);
                
            /* TASKS */
            
            // 1. pad the pages with empty element if required
         /*   if ($items.length % visible != 0) {
                // pad
                $slider.append(repeat('<li class="empty" />', visible - ($items.length % visible)));
                $items = $slider.find('> li');
            }*/
            
            // 2. create the carousel padding on left and right (cloned)
            $items.filter(':first').before($items.slice(-visible).clone().addClass('cloned'));
            $items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));
            $items = $slider.find('> li');
            
            // 3. reset scroll
            $wrapper.scrollLeft(singleWidth * visible);
            
            // 4. paging function
            function gotoPage(page) {
                var dir = page < currentPage ? -1 : 1,
                    n = Math.abs(currentPage - page),
                    left = singleWidth * dir * visible * n;
                
                $wrapper.filter(':not(:animated)').animate({
                    scrollLeft : '+=' + left
                }, 500, function () {
                    // if page == last page - then reset position
                    if (page > pages) {
                        $wrapper.scrollLeft(singleWidth * visible);
                        page = 1;
                    } else if (page == 0) {
                        page = pages;
                        $wrapper.scrollLeft(singleWidth * visible * pages);
                    }
                    
                    currentPage = page;
                });
            }
            
            // 5. insert the back and forward link
            $wrapper.after('<a href="#" class="arrow back">&lt;</a><a href="#" class="arrow forward">&gt;</a>');
            
            // 6. bind the back and forward links
            $('a.back', this).click(function () {
                gotoPage(currentPage - 1);
                return false;
            });
            
            $('a.forward', this).click(function () {
                gotoPage(currentPage + 1);
                return false;
            });
            
            $(this).bind('goto', function (event, page) {
                gotoPage(page);
            });
            
            // THIS IS NEW CODE FOR THE AUTOMATIC INFINITE CAROUSEL
            $(this).bind('next', function () {
                gotoPage(currentPage + 1);
            });
        });
    };
})(jQuery);

$(document).ready(function () {
    // THIS IS NEW CODE FOR THE AUTOMATIC INFINITE CAROUSEL
    var autoscrolling = true;
    if($('#imgscroll > li').length>0)
    {
        $('.infiniteCarousel').infiniteCarousel().mouseover(function () {
            autoscrolling = false;
        }).mouseout(function () {
            autoscrolling = true;
        });
        setInterval(function () {
            if (autoscrolling) {
                $('.infiniteCarousel').trigger('next');
            }
        }, 5000);

    }
    
});

function addCopyright() {
    var Original = "转自【B5教程网】:" + location.href; //修改你的网站名称
    if ("function" == typeof window.getSelection) {
        var c = window.getSelection();
        if ("Microsoft Internet Explorer" == navigator.appName && navigator.appVersion.match(/MSIE ([\d.]+)/)[1] >= 10 || "Opera" == navigator.appName) {
            var g = c.getRangeAt(0),
            h = document.createElement("span");
            h.appendChild(g.cloneContents()),
            g.insertNode(h);
            var i = h.innerHTML.replace(/(?:\n|\r\n|\r)/gi, "").replace(/<\s*script[^>]*>[\s\S]*?<\/script>/gim, "").replace(/<\s*style[^>]*>[\s\S]*?<\/style>/gim, "").replace(/<!--.*?-->/gim, "").replace(/<!DOCTYPE.*?>/gi, "");
            try {
                document.getElementsByTagName("body")[0].removeChild(h)
            } catch(f) {
                h.style.display = "none",
                h.innerHTML = ""
            }
        } else var d = "" + c;
        var e = document.getElementsByTagName("body")[0],
        f = document.createElement("div");
        f.style.position = "absolute",
        f.style.left = "-99999px",
        e.appendChild(f),
        f.innerHTML = d.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1<br />$2") + "<br />" + Original,
        c.selectAllChildren(f),
        setTimeout(function() {
            e.removeChild(f)
        },
        0)
    } else if ("object" == typeof document.selection.createRange) {
        event.returnValue = !1;
        var c = document.selection.createRange().text;
        window.clipboardData.setData("Text", c + "\n" + Original)
    }
};