//	返回顶部
function goTop() {
	var backtop = document.querySelector(".backtop"),
		timer = null;

	if(backtop) {
		backtop.onclick = function () {
	        timer = setInterval(function () {
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
					speed = Math.ceil(scrollTop / 5);
				if (scrollTop > 0) {
					document.documentElement.scrollTop = document.body.scrollTop = scrollTop - speed;
				} else {
					clearInterval(timer);
				}
			}, 30);
	    }	
	}	
}
goTop();

// 添加类
function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}
//删除类
function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, '');
    }
}
// 判断是否含有类
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}


function setActiveMenu() {
	var page = location.pathname.split("/").pop();
	var menu = $('.nav a[href$="'+ page + '"]');
	if(menu) {
		menu.parent().addClass("active");		
	}	
}

function getQrImageName() {
	var result;
	var hostname = window.location.hostname; 
	if (hostname.indexOf("cf1234.com") !== -1 || hostname.indexOf("cf860.com") !== -1) {
		result = 'm860-QR.png';
	} else {
		result = 'm139-QR.png';
	}
	return result;
}

function setQrImage(element) {
	var name = getQrImageName();
	var oldName = element.attr('src').split("/").pop();
	if(name) {
		$(element).attr("src", element.attr('src').replace(oldName, name));					
	}	
}

function openUrlInNewWindow(url, windowName) {
	window.open(url, windowName, "resizable,scrollbars=yes,status=1,width=800, height=550, top=100, left=100");
}

function openLive800() {
	// var url = 'https://www.cf-service.com/k800/chatClient/chatbox.jsp?companyID=475&configID=56&';
       var url = 'https://www.cf-service.com/k800/chatClient/chatbox.jsp?companyID=475&configID=56&';
	window.open(url,"DescriptiveWindowName",
			"resizable,scrollbars=yes,status=1,width=800, height=550, top=100, left=100");
}

function blockScreen(message, timeout) {
	$.blockUI({ 
		css: { 
            border: 'none', 
            padding: '2%', 
            backgroundColor: '#000', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: .5, 
            color: '#fff',
            width: '30%',
            height: '25px',
            top: '44%',
            bottom: '44%',
            left: '34%',
            right: '34%'            
    	},
    	timeout: timeout,
    	message: '<h1>' + message + '</h1>'
	});
}

function blockScreenWithPopup() {
	$.blockUI({
		message : $('#inprocess-popup'),
		css : {
			border : 'none'
		},
		overlayCSS : {
			opacity : 0
		}
	});
}

/**
 * @param url     -   the redirect url
 * @param type	  -	  the customer type (can be 'real' or 'demo')
 */
function verifyBeforeRedirect(url, type) {
	var state = getSessionState();
	if (state == 'UNLOGGED') {
		$('#login-popup').load('/cn/zt/popup/login/index.html', function() {
			$('#redirect-url').val(url);
			$('#redirect-type').val(type);
		});

	} else if ((type == null) || (type == 'real' && state == 'LOGGED_REAL')	|| (type == 'demo' && state == 'LOGGED_DEMO')) {
		window.open(url);

	} else {
		if (type == 'real') {
			blockScreen('此功能只支持真实账号',	 3000);
		} else {
			blockScreen('此功能只支持模拟账号',	 3000);			
		}
	}	
}

function getSessionState() {
	var result = 'UNLOGGED';
	$.ajax({
		type : 'POST',
		url : '/ajax/customer/sessionState.do',
		dataType : 'json',
		async : false,
		success : function(data) {
			result = data;
		}
	});
	return result;
}

$('a.verify').click(function(event){
	event.preventDefault();
	verifyBeforeRedirect($(this).attr('href'));
});

$('a.verify-real').click(function(event){
	event.preventDefault();
	verifyBeforeRedirect($(this).attr('href'), 'real');
});

$('a.verify-demo').click(function(event){
	event.preventDefault();
	verifyBeforeRedirect($(this).attr('href'), 'demo');
});

function appendQueryString(url, queryString) {
	if (url == null || url == '#' || url.startsWith("javascript")) {
		return url;
	}
	var separator = (url.indexOf("?") === -1) ? "?" : "&";
	return url + separator + queryString;
}

function appendQueryStringToElements() {
	var queryString = location.href.slice(location.href.indexOf('?') + 1);
	if (!queryString) {
		return;
	}
	
	$( "a" ).each(function() {		
		var that = this;
		var old = $(that).attr("href");
		$(that).attr("href", appendQueryString(old, queryString));
	});
}