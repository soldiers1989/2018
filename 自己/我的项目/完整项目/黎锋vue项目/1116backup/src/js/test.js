"use strict";
var swiper;
var headerCityName = $('#current-city-name');
var cityPickerMenu = $("#city-picker-menu");
var resultList = "";
var cityChange = true;
var orderVehicleId = '';
var orderName = '';
var orderImg = '';
var modelsList = [];
var cityList = [];
var inputWhether = true;
var preventRepeat = true;
var urlList = "";
var cityS = false;
var arr = [];
var arrList = [];
var inputNumber = 0;
var myIoc = true;
var myFleet = '0';
$.cookie("myFleet", 0);
var prevent = true;
var stdTag = '';
var specReq = '';
var orderData = '';
var locationList = {};
var latLongArr = [];
var latLongStr = '';
var closeAdd = 0;
var addextra = [];
var distanceTotal = '';
var isSubscribe = 0;
var dizhiList = [];
var paymentMode = 1;
var alreadyCoupon = '';
var couponId = '';
var price_item = [];
var userName = '';
var myStyleJson = [];
var hll = '';
var dataTransformation = true;
var dataManual = true;
var sname = '';
var llData = true;
var computePriceParams = {};
int();

function int() {
	hll = switchMethod("city");
	if(hll) {
		sname = decodeURI(switchMethod("cityName"));
		var url = GetRequest();
		localStorage.setItem("url", url);
		$.cookie('cityName', sname);
	}
	loadCity();
	resultList = switchMethod("switch");
	if(!resultList) {
		window.location.href = '../index.html?switch=1';
	}
	if(resultList == "1") {
		urlList = localStorage.getItem("url");
		localStorage.setItem("url", '');
		if(urlList) {
			dataManual = false;
			urlListS(urlList);
		}
		loginVerification();
		alreadyModels();
	} else {
		loginVerification(resultList);
	}
	initEvents();
	navigationPrompt();
}

function initEvents() {
	$(document).on('click', '#log', loginShow).on('click', '#fancybox-close', outInformation).on('click', '#login-submit-btn,#request-sms-btn', login).on('click', '#logout', logOut).on('click', '#agreement-checkbox', agreementCheckbox).on('keyup', '#phone-input , #password-input', bindUIActions).on('click', '#phone-input,#verification-img-input,#password-input', removePrompt).on('mouseover', '.carModels', carModelsShow).on('mouseleave', '#Carousel', carModelsHide).on('click', '.switchImg', verificationReplace).on('click', '.special_rules_ul li', switchSpecial).on('click', '.input-predict-link', linkPlace).on('click', '#add-end-pt', addDestination).on('click', '.remove-location', removeDestination).on('click', '.my-icon', selectMyFleetRadioType).on('click', '.extra', extraShow).on('click', '#dlet-img , .call-calculate', extraHide).on('click', '#city-picker', cityShow).on('click', '.city-picker-link', switchCity).on('click', '.switchS', switchModels).on('keyup', ".order-input", keyWord).on('click', ".order-total-breakdown", openPriceBreakdown).on('click', '.outInformation', outInformation).on('keyup', '#recipient-name-input', recipientNameInput).on('change', '#recipient-name-input', inputFilter).on('click', '#failReason', failReason).on('click', '#order-booking', orderAction).on('click', '#order-now', jumpConfirm).on('click', '#edit-order', editOrder).on('click', '#lala-close', lalaClose).on('click', '#lalaBtn , #lalaNo', lalaDetails).on('click', '.payment', paymentMethod).on('click', '.cursorBtn', cursor).on('click', '#order-determine', choiceMode).on('click', '#lalaDetermine', checkPrice);
	$('#phone-input,#verification-img-input,#password-input').focus(removePrompt);
}

function GetRequest() {
	var strs = '';
	var url = location.search;
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
	}
	return str;
}

function urlListS(urlList) {
	urlList = urlList || '';
	var latLong = /&latLong=([^&=]*)&/;
	var address = /&address=([^&=]*)/;
	var addressName = /&addressName=([^&=]*)&/;
	var a = urlList.match(latLong);
	var b = urlList.match(address);
	var c = urlList.match(addressName);
	var lc = a[1].split(",");
	var q = a[1].split(",")[0].split("|");
	var address = decodeURI(b[1].split(","));
	var name = decodeURI(c[1].split(","));
	address = address.split(",");
	name = name.split(",");
	$.each(lc, function(i, v) {
		var sa = v.split("|");
		var p = {};
		$.each(sa, function(s, a) {
			if(s == 0) {
				p.lat = a;
			} else {
				p.lng = a;
			}
		});
		p.address = address[i];
		p.name = name[i];
		locationList["location-" + (i + 1)] = p;
	});
	orderVehicleId = switchMethod("serviceType");
	cityS = true;
	inputLocation();
	resolution(q[0], q[1], function() {
		console.log(cityChange);
		if(resultList == 1) {
			if(hll) {
				$.cookie("cityid", hll);
			}
			Corresponding();
		}
	});
	var href = location.href.replace(/&.*$/, '');
	if(window.history.replaceState) {
		window.history.replaceState(null, '货拉拉', href);
	}
}

function addInput(data) {
	if(data.length > 2) {
		console.log("addInput.......");
		var inputNumber = data.length - 2;
		var o = 2;
		for(var s = 0; s < data.length - 2; s++) {
			var currentEndPoint = $('#location-' + o),
				currentEndPointParent = currentEndPoint.parent();
			var sdee = currentEndPoint.parent().parent();
			sdee[0].firstElementChild.className = 'logo transit-pt';
			currentEndPointParent.addClass('border-hui');
			currentEndPoint.attr('placeholder', '按此输入目的地');
			o += 1;
			var newEndPointHtml = '<li class="section-input positionR ">';
			newEndPointHtml += '<div id="section-input' + o + '" class="logo end-pt"></div>';
			newEndPointHtml += '<div class="location-input-ctn border-hui positionR ">';
			newEndPointHtml += '<input id="location-' + o + '" class="order-input-list order-input place-order-input addressInput medium-fnt ellipsis bdr-none  " type="text" placeholder="按此输入目的地" data-loc="' + inputNumber + '" data-name="" data-address="" data-lat="" data-lng="" data-cityname="" data-citycode="" />';
			newEndPointHtml += '<a id="remove-location-' + o + '" class="remove-location show" href="javascript:void(0);" data-loc="' + o + '"></a>';
			newEndPointHtml += '<div id="location-' + o + '-predict" class="input-predict bdr-all bdr-shadow medium-fnt hide"></div>';
			newEndPointHtml += '</div>';
			var wp = $("#section-input-list li").length;
			newEndPointHtml += '<span class="xiashi" style="top:-17px;left: 0px;"></span>';
			newEndPointHtml += '</li>';
			$("#section-input-list").eq(0).append(newEndPointHtml);
		}
	}
	$.each(data, function(i, v) {
		$("#location-" + (i + 1)).val(v.name);
		if(v.address != "undefined") {
			var pHtml = '<p class="lgtFnt" style="">' + v.address + '</p>';
		} else {
			var pHtml = '<p class="lgtFnt" style=""> </p>';
		}
		$("#location-" + (i + 1)).closest(".location-input-ctn").append(pHtml);
		$("#location-" + (i + 1)).val(v.name);
		$("#location-" + (i + 1)).attr("data-lng", v.lng);
		$("#location-" + (i + 1)).attr("data-lat", v.lat);
		$("#location-" + (i + 1)).attr("data-name", v.name);
	});
	inputLocation();
	return false;
}

function switchMethod(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(!r) {
		return false;
	}
	return r[2];
}

function loginShow() {
	if(!$.cookie("tel")) {
		$("#fancybox-wrap").show();
		$("#fancybox-overlay").show();
		$("#phone-input").val("");
		$("#verification-img-input").val("");
		$("#password-input").val("");
		$("#login-phone-input-error-ctn , #login-verification-img-input-error-ctn , #login-password-input-error-ctn").removeClass('show').addClass('hide');
		return true;
	}
	return false;
}

function agreementCheckbox() {
	if($(this).hasClass("checked")) {
		$(this).removeClass("checked").addClass("checkedY");
	} else {
		$(this).removeClass("checkedY").addClass("checked");
	}
}

function loginVerification(data) {
	console.log('loginVerification......');
	if($.cookie("tel")) {
		$("#loginOut").removeClass('hide').addClass('show');
		$(".user-login-icon").text($.cookie("tel"));
	} else {
		$("#login").removeClass('hide').addClass('show');
		return false;
	}
}

function login() {
	console.log('login......');
	var phone = $("#phone-input").val();
	var verificationImg = $("#verification-img-input").val();
	var passwordInput = $("#password-input").val();
	verification($(this).attr('id'), phone, verificationImg, passwordInput);
}

function removePrompt() {
	console.log('removePrompt..........');
	if($(this).hasClass('login-input')) {
		$("#login-phone-input-error-ctn").removeClass('show').addClass('hide');
	} else if($(this).hasClass('verification-img-input')) {
		$("#login-verification-img-input-error-ctn").removeClass('show').addClass('hide');
	} else if($(this).hasClass('password-input')) {
		$("#login-password-input-error-ctn").removeClass('show').addClass('hide');
	}
}

function bindUIActions() {
	console.log('bindUIActions......');
	if($('#phone-input').val().length == 11 && $('#password-input').val().length == 4) {
		$('#login-submit-btn').css('background', '#f60');
		$('#login-submit-btn').css('color', '#fff');
	} else {
		$('#login-submit-btn').css('background', '#dbdad8');
	};
	return false;
}

function verification(id, phone, verificationImg, passwordInput) {
	console.log('verification......');
	if(id == 'request-sms-btn') {
		if(phone == '') {
			$('#login-phone-input-error-ctn').html('号码不可为空，请输入').removeClass('hide').addClass('show');
			return false;
		} else if(!/^1[34578]\d{9}$/.test(phone)) {
			$('#login-phone-input-error-ctn').html('号码不符合规范，请重新输入').removeClass('hide').addClass('show');
			return false;
		} else if(verificationImg == '') {
			$('#login-phone-input-error-ctn').removeClass('show').addClass('hide');
			$('#login-verification-img-input-error-ctn').html('请先输入图形验证码').removeClass('hide').addClass('show');
			return false;
		} else if(verificationImg.length > 0 && verificationImg.length != 4) {
			$('#login-phone-input-error-ctn').removeClass('show').addClass('hide');
			$('#login-verification-img-input-error-ctn').html('图形验证码输入错误').removeClass('hide').addClass('show');
			return false;
		} else if(!$("#agreement-checkbox").hasClass("checkedY")) {
			$('#login-phone-input-error-ctn').removeClass('show').addClass('hide');
			$('.Agreement').show();
			$('.Agreement').html('请点击同意货拉拉打车服务协议');
			return false;
		} else {
			if(preventRepeat) {
				preventRepeat = false;
				verificationPhone(phone, verificationImg, '');
			}
		}
	} else {
		if(phone == '') {
			$('#login-phone-input-error-ctn').html('号码不可为空，请输入').removeClass('hide').addClass('show');
			return false;
		} else if(!/^1[34578]\d{9}$/.test(phone)) {
			$('#login-phone-input-error-ctn').html('号码不符合规范，请重新输入').removeClass('hide').addClass('show');
			return false;
		} else if(verificationImg == '') {
			$('#login-phone-input-error-ctn').removeClass('show').addClass('hide');
			$('#login-verification-img-input-error-ctn').html('请先输入图形验证码').removeClass('hide').addClass('show');
			return false;
		} else if(verificationImg.length > 0 && verificationImg.length != 4) {
			$('#login-phone-input-error-ctn').removeClass('show').addClass('hide');
			$('#login-verification-img-input-error-ctn').html('图形验证码输入错误').removeClass('hide').addClass('show');
			return false;
		} else if(passwordInput == '') {
			$('#login-verification-img-input-error-ctn').removeClass('show').addClass('hide');
			$('#login-password-input-error-ctn').html('验证码不可为空，请输入').removeClass('hide').addClass('show');
			return false;
		} else if(!$("#agreement-checkbox").hasClass("checkedY")) {
			$('.Agreement').show();
			$('.Agreement').html('请点击同意货拉拉打车服务协议');
			return false;
		} else {
			verificationPhone(phone, verificationImg, passwordInput);
		}
	}
}

function verificationPhone(phone, verificationImg, passwordInput) {
	var data = {
		_m: 'user',
		_a: 'login',
		phone_no: phone,
		captcha: verificationImg
	};
	if(passwordInput != "") {
		data.code = passwordInput;
	}
	$.ajax({
		url: '/index.php',
		type: 'GET',
		data: data,
		dataType: 'json',
		timeout: 15000
	}).done(function(response) {
		console.log('verificationPhone...');
		console.log(response);
		if(response.ret == 100) {
			$('#login-password-input-error-ctn').html('短信验证码错误').removeClass('hide').addClass('show');
			preventRepeat = true;
			return false;
		} else if(response.ret == 20001) {
			$('#login-verification-img-input-error-ctn').html('图形验证码错误').removeClass('hide').addClass('show');
			preventRepeat = true;
			return false;
		} else if(response.ret == 0 && response.msg == "登陆成功") {
			$.cookie("tel", phone);
			$("#fancybox-wrap").hide();
			$("#fancybox-overlay").hide();
			$("#login").addClass('hide').removeClass('show');
			$("#recipient-phone-input").val(phone);
			if(switchMethod('switch') === '4') {
				location.reload();
			}
			loginVerification();
		}
		if(passwordInput == "") {
			setTimer();
			return false;
		}
	}).fail(function() {
		showPopupMsg('error', '网络进水，请刷新', '刷新');
		return false;
	});
}

function setTimer() {
	console.log('setTimer......');
	var timer = 0;
	clearInterval(timer);
	var callback = function callback() {
		var text = $('#request-sms-btn .cover').text();
		var val = text.replace(/^(\d*).+/, "$1");
		if(val) {
			val = parseInt(val) - 1;
		} else {
			val = 60;
		}
		if($('#request-sms-btn:visible').size() == 0 || val <= 0) {
			clearInterval(timer);
			$("#request-sms-btn").removeAttr("readonly").removeClass("disabled");
			$("#jse").text('');
			$('#request-sms-btn>span').text('点击获取验证码');
			preventRepeat = true;
		} else {
			$('#request-sms-btn').attr('readonly', 'true').addClass('disabled');
			$('#request-sms-btn>span').text('');
			$('#request-sms-btn .cover').text(val + '秒后重试').attr('readonly', 'true').addClass('disabled');
		}
	};
	callback();
	timer = setInterval(function() {
		callback();
	}, 1000);
}

function verificationReplace() {
	console.log('verificationReplace......');

	function changeImg() {
		var imgSrc = $("#verification-img img");
		var src = 'index.php?_m=index&_a=captcha';
		imgSrc.attr('src', chgUrl(src));
	}

	function chgUrl(url) {
		var timestamp = new Date().valueOf();
		url = url + "&tamp=" + timestamp;
		return url;
	}
	changeImg();
}

function logOut() {
	$.ajax({
		url: '/index.php',
		type: 'GET',
		data: {
			_m: 'user',
			_a: 'logout'
		},
		dataType: 'json',
		timeout: 15000
	}).done(function(response) {
		console.log(response);
		$.cookie('tel', "");
		window.location.href = '../index.html?switch=1';
	}).fail(function() {
		showPopupMsg('error', '网络进水，请刷新', '刷新');
		return false;
	});
}

function cityLocation(data) {
	console.log('cityLocation......');
	if(sname == '') {
		var city = $.cookie('cityName');
	} else {
		var city = sname;
	}
	sname = '';
	if(city != undefined) {
		cityDisplay(city);
		if(data) {
			$.each(data, function(a, b) {
				if(city == b.name) {
					$.cookie("cityid", b.city_id);
					return false;
				}
			});
		}
	} else {
		var myCity = new BMap.LocalCity();
		myCity.get(function(result) {
			resolution(result.center.lng, result.center.lat);
			var cityName = result.name;
			$.cookie('cityName', result.name);
			cityDisplay(cityName);
		});
	}
}

function loadCity() {
	$.ajax({
		url: '/index.php',
		type: 'GET',
		data: {
			_m: 'comm',
			_a: 'a_city_list'
		},
		dataType: 'json',
		timeout: 15000
	}).done(function(response) {
		cityList = response.data;
		console.log('loadCity...');
		console.log(response);
		if(response.ret == 0) {
			var temp = $('#cityList').html();
			var interText = doT.template(temp);
			$("#city-picker-menu").html(interText(cityList));
			cityLocation(cityList);
		}
	}).fail(function() {
		showPopupMsg('error', '网络进水，请刷新', '刷新');
		return false;
	});
}

function switchCity() {
	dataManual = true;
	console.log('switchCity......');
	$.cookie("upperCity", $('#current-city-name').html());
	$.cookie("cityid", $(this).data('cityid'));
	headerCityName.text(this.innerHTML);
	$.cookie('cityName', this.innerHTML);
	cityPickerMenu.removeClass('show').addClass('hide');
	if(resultList == "1") {
		inputList();
		alreadyModels();
		window.location.reload();
	}
}

function Corresponding() {
	console.log('Corresponding...');
	var cityId = $.cookie("cityid");
	if(cityId == undefined) {
		cityId = 1002;
	}
	$.ajax({
		url: '/index.php',
		data: {
			_m: 'comm',
			_a: 'a_city_info',
			city_id: cityId
		},
		type: 'GET',
		dataType: 'json',
		timeout: 15000
	}).done(function(response) {
		if(response.ret == 0) {
			modelsList = [];
			var data = response.data;
			var temp = $('#order').html();
			var interText = doT.template(temp);
			$("#pageContent").html(interText(data));
			modelsList.push(data);
			if(data.vehicle_item[0] != undefined) {
				specialRules(data.vehicle_item[0].order_vehicle_id);
				if(orderVehicleId == '') {
					orderVehicleId = data.vehicle_item[0].order_vehicle_id;
				}
				orderName = data.vehicle_item[0].name;
				orderImg = data.vehicle_item[0].image_url_high_light;
				swiper = new Swiper('.swiper-container', {
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
					slidesPerView: 4,
					slidesPerGroup: 2
				});
				additional(data.spec_req_item);
				if(orderVehicleId != '') {
					console.log('modelsList[0].vehicle_item', modelsList[0].vehicle_item);
					$.each(modelsList[0].vehicle_item, function(a, s) {
						if(s.order_vehicle_id == orderVehicleId) {
							$(".switchS p").addClass('transparency');
							var g = $(".switchS").length;
							for(var i = 0; i < g; i++) {
								var q = $(".switchS").eq(i).attr('data-id');
								if(q == orderVehicleId) {
									$(".switchS").eq(i).find('p').removeClass('transparency');
									swiper.slideTo(i, 1000, false);
									return true;
								}
							}
						}
					});
				}
			} else {
				$(".swiper-wrapper").text("暂时未开通");
			}
		} else {
			showPopupMsg('error', '网络进水，请刷新', '刷新');
			return false;
		}
	}).fail(function() {
		showPopupMsg('error', '网络进水，请刷新', '刷新');
		return false;
	});
}

function cityShow() {
	console.log('cityShow......');
	$("#city-picker-menu").removeClass('hide').addClass('show');
	if($.cookie('cityName')) {
		$('#city-picker-menu .last_city').html($.cookie('upperCity'));
	};
	$('#city-picker-menu .through_city li').removeClass('yse');
	for(var i = 0; i < $('#city-picker-menu .through_city li a').length; i += 1) {
		if($('#city-picker-menu .through_city li a').eq(i).html() == $('#current-city-name').html()) {
			$('#city-picker-menu .through_city li').eq(i).addClass('yse');
			break;
		}
	};
	cityPickerMenu.addClass('show');
}

function alreadyModels() {
	console.log('alreadyModels...');
	var cityId = $.cookie("cityid");
	if(cityId == undefined || cityId == "false") {
		cityId = 1002;
	}
	$.ajax({
		url: '/index.php',
		data: {
			_m: 'comm',
			_a: 'a_city_info',
			city_id: cityId
		},
		type: 'GET',
		dataType: 'json',
		timeout: 15000
	}).done(function(response) {
		if(response.ret == 0) {
			console.log(response);
			modelsList = [];
			var data = response.data;
			var temp = $('#order').html();
			var interText = doT.template(temp);
			$("#pageContent").html(interText(data));
			modelsList.push(data);
			if(inputWhether) {
				inputList();
			}
			if(data.vehicle_item[0] != undefined) {
				specialRules(data.vehicle_item[0].order_vehicle_id);
				if(orderVehicleId == '') {
					orderVehicleId = data.vehicle_item[0].order_vehicle_id;
				}
				orderName = data.vehicle_item[0].name;
				orderImg = data.vehicle_item[0].image_url_high_light;
				swiper = new Swiper('.swiper-container', {
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
					slidesPerView: 4,
					slidesPerGroup: 2
				});
			} else {
				$(".swiper-wrapper").text("暂时未开通");
			}
			var serviceType = switchMethod("serviceType");
			if(serviceType) {
				var s = $(".switchS p").addClass('transparency');
				for(var i = 0; i < s.length; i++) {
					if($(".switchS").eq(i).attr('data-id') == serviceType) {
						swiper.slideTo(i, 1000, false);
					}
				}
			}
			console.log("swiper：" + swiper);
			additional(data.spec_req_item);
			rightContent(data);
			if(urlList != "") {
				var c = [];
				$.each(locationList, function(p, s) {
					c.push(s);
				});
				addInput(c);
				triggerPriceCalc();
				localStorage.setItem("url", "");
				if(dataManual) {
					urlList = "";
				}
			}
		} else {
			showPopupMsg('error', '网络进水，请刷新', '刷新');
			return false;
		}
	}).fail(function() {
		showPopupMsg('error', '网络进水，请刷新', '刷新');
		return false;
	});
}

function inputList() {
	var temp = $('#inputList').html();
	var interText = doT.template(temp);
	$("#inputListContent").html(interText(""));
	inputLocation();
}

function carModelsShow(e) {
	$('.carInfoBox').show();
	var tag = e.currentTarget;
	var weight = $(tag).attr('data-weight');
	var size = $(tag).attr('data-size');
	var volume = $(tag).attr('data-volume');
	$('.carInfoBoxWeight').text(weight);
	$('.carInfoBoxSize').text(size);
	$('.carInfoBoxVolume').text(volume);
	var curLeft = tag.offsetLeft + swiper.translate;
	$('.carInfoBox').css('left', curLeft + 50 + 'px');
	return false;
}

function carModelsHide() {
	$('.carInfoBox').hide();
	return false;
}

function openPriceBreakdown() {
	if($(".total-breakdown-ctn").hasClass('hide')) {
		$(".total-breakdown-ctn").slideDown(500).removeClass('hide');
	} else {
		$(".total-breakdown-ctn").slideUp(500).addClass('hide');
	}
}

function rightContent(data) {
	var temp = $('#rightTabe').html();
	var interText = doT.template(temp);
	$("#rightContent").html(interText(data));
	if($.cookie("tel") != '') {
		$("#recipient-phone-input").val($.cookie("tel"));
	}
}

function switchModels(s) {
	if(s.altKey != undefined) {
		console.log('switchModels......');
		orderVehicleId = $(this)[0].id;
		orderName = $(this)[0].childNodes[1].innerText;
		orderImg = $(this).find('img').attr('src');
		console.log('orderImg', orderImg);
		if(modelsList[0].vehicle_item.length != 0) {
			for(var i = 0; i < modelsList[0].vehicle_item.length; i++) {
				if(orderVehicleId == modelsList[0].vehicle_item[i].order_vehicle_id) {
					$(".switchS p").addClass('transparency');
					if($(this).find('p').hasClass('transparency')) {
						$(this).find('p').removeClass('transparency');
					} else {
						$(this)[0].childNodes[0].className = 'transparency';
					}
				}
			}
			specialRules(orderVehicleId);
			triggerPriceCalc();
		}
	} else {}
}

function specialRules(data) {
	console.log('specialRules......');
	for(var c = 0; c < modelsList[0].vehicle_item.length; c++) {
		if(data == modelsList[0].vehicle_item[c].order_vehicle_id) {
			if(modelsList[0].vehicle_item[c].vehicle_std_item.length != 0) {
				$(".special_rules").show();
				var temp = $('#special').html();
				var interText = doT.template(temp);
				$(".special_rules_ul").html(interText(modelsList[0].vehicle_item[c].vehicle_std_item));
			} else {
				$(".special_rules").hide();
			}
		}
	}
}

function switchSpecial() {
	console.log('switchSpecial.....');
	if($(this).hasClass('bdr-all-y')) {
		$(this).removeClass('bdr-all-y').addClass('bdr-all');
	} else {
		$('.special_rules_ul li').removeClass('bdr-all-y').addClass('bdr-all');
		$(this).removeClass('bdr-all').addClass('bdr-all-y');
	}
	triggerPriceCalc();
}

function additional(data) {
	console.log('additional.....');
	var temp = $('#additional').html();
	var interText = doT.template(temp);
	$("#additionalContent").html(interText(data));
}
var keyWordTimer = null;

function keyWord() {
	clearTimeout(keyWordTimer);
	var key = $(this);
	keyWordTimer = setTimeout(searchAddress(key), 1000);
}

function searchAddress(thisKey) {
	var key = thisKey.val();
	eliminateP(thisKey);
	var id = thisKey.attr('id');
	var city = $("#current-city-name").html();
	$('#' + id + '-predict').addClass('show');
	var sid = thisKey.attr('id').charAt(thisKey.attr('id').length - 1);
	$.ajax({
		url: "//api.map.baidu.com/place/v2/search?q=" + key + "&region=" + city + "&output=json&ak=GANo2ajua2rTiTTc05oKIrYr&callback=?&s=1",
		type: "GET",
		dataType: 'jsonp',
		jsonpCallback: 'callbackACityInfo',
		timeout: 15000
	}).done(function(response) {
		console.log(response);
		if(response.message == "ok") {
			if(response.results[0] == undefined) {
				$('#' + id + '-predict').addClass('hide');
				delete locationList['location-' + parseInt(sid)];
				return false;
			}
			console.log("keyWord........");
			console.log(response.results);
			var data = response.results;
			var autoCompleteList = '<ul>';
			$.each(data, function(i, n) {
				autoCompleteList += '<li class="pd-left-3pc">';
				if(n.address != undefined || n.location != undefined) {
					autoCompleteList += '<a class="input-predict-link" data-parentinput="' + id + '" data-name="' + n.name + '" data-address="' + n.address + '" data-lat="' + n.location.lat + '" data-lng="' + n.location.lng + '" data-cityname="">';
					autoCompleteList += '<span class="input-predict-logo"></span>';
					autoCompleteList += '<span class="input-predict-content bdr-btm">';
					autoCompleteList += '<span class="text drk-gry-fnt ellipsis">' + n.name + '</span>';
					autoCompleteList += '<br />';
					if(n.address != undefined) {
						autoCompleteList += '<span class="text lgt-gry-fnt ellipsis">' + n.address + '</span>';
					}
					autoCompleteList += '</span>';
					autoCompleteList += '</a>';
					autoCompleteList += '</li>';
				} else {
					if(n.location != undefined) {
						autoCompleteList += '<a class="input-predict-link" data-parentinput="' + id + '" data-name="' + n.name + '" data-lat="' + n.location.lat + '" data-lng="' + n.location.lng + '">';
						autoCompleteList += '<span class="input-predict-logo"></span>';
						autoCompleteList += '<span class="input-predict-content bdr-btm">';
						autoCompleteList += '<span class="text drk-gry-fnt ellipsis">' + n.name + '</span>';
						autoCompleteList += '<br />';
						if(n.address != undefined) {
							autoCompleteList += '<span class="text lgt-gry-fnt ellipsis">' + n.address + '</span>';
						}
						autoCompleteList += '</span>';
						autoCompleteList += '</a>';
						autoCompleteList += '</li>';
					}
				}
			});
			autoCompleteList += '</ul>';
			$('#' + id + '-predict').removeClass('hide').html(autoCompleteList);
		} else {
			$('#' + id + '-predict').addClass('hide');
			delete locationList['location-' + parseInt(sid)];
		}
	}).fail(function() {});
}

function eliminateP(data) {
	console.log('eliminateP......');
	for(var p = 0; p < data.parent()[0].childNodes.length; p++) {
		if(data.parent()[0].childNodes[p].className == 'lgtFnt') {
			data.parent()[0].childNodes[p].remove();
			var str = data[0].id;
			var g = str.charAt(str.length - 1);
			arrList[parseInt(g) - 1].lat = "";
			arrList[parseInt(g) - 1].lng = "";
			arrList[parseInt(g) - 1].name = "";
		}
	}
}

function linkPlace() {
	console.log('linkPlace......');
	var cityId = "";
	var t = $(this);
	var inputid = t.parents('div:eq(0)').attr('id').replace('-predict', '');
	var location = {
		'name': t.data('name'),
		'address': t.data('address'),
		'lat': t.data('lat'),
		'lng': t.data('lng')
	};
	var a = switchMethod("switch");
	if(a != "4") {
		var geoc = new BMap.Geocoder();
		var point = new BMap.Point(t.data('lng'), t.data('lat'));
		geoc.getLocation(point, function(rs) {
			var addComp = rs.addressComponents;
			var name = addComp.city.replace('市', '');
			$.each(cityList, function(i, v) {
				if(v.name == name) {
					location["city_id"] = v.city_id;
				}
			});
		});
		if(t.data('parentinput') == 'location-1') {
			resolution(location.lng, location.lat, function() {
				console.log(cityChange);
				if(cityChange) {
					if(resultList == 1) {
						orderVehicleId = '';
						Corresponding();
					}
				}
			});
		}
	}
	$('#' + inputid + '-predict').addClass('hide').removeClass('show');
	$('#' + inputid).val(location.name);
	$('#' + inputid).attr("data-lng", location.lng);
	$('#' + inputid).attr("data-lat", location.lat);
	$('#' + inputid).attr("data-name", location.name);
	if(location.address != undefined && location.address != "undefined") {
		var pHtml = '<p class="lgtFnt" style="">' + location.address + '</p>';
		$('#' + inputid).closest(".location-input-ctn").append(pHtml);
	}
	locationList[inputid] = location;
	triggerPriceCalc();
	inputLocation();
}

function addDestination(data) {
	console.log('addDestination......');
	inputNumber = $(".addressInput").length;
	if(inputNumber >= 5) {
		$("#section-input-list").addClass('huadong');
	}
	if(inputNumber < 8) {
		var currentEndPoint = $('#location-' + inputNumber),
			currentEndPointParent = currentEndPoint.parent();
		var sdee = currentEndPoint.parent().parent();
		sdee[0].firstElementChild.className = 'logo transit-pt';
		currentEndPointParent.addClass('border-hui');
		currentEndPoint.attr('placeholder', '按此输入目的地');
		inputNumber += 1;
		var newEndPointHtml = '<li class="section-input positionR ">';
		newEndPointHtml += '<div id="section-input' + inputNumber + '" class="logo end-pt"></div>';
		newEndPointHtml += '<div class="location-input-ctn border-hui positionR ">';
		newEndPointHtml += '<input id="location-' + inputNumber + '" class="order-input-list order-input place-order-input addressInput medium-fnt ellipsis bdr-none  " type="text" placeholder="按此输入目的地" data-loc="' + inputNumber + '" data-name="" data-address="" data-lat="" data-lng="" data-cityname="" data-citycode="" />';
		newEndPointHtml += '<a id="remove-location-' + inputNumber + '" class="remove-location show" href="javascript:void(0);" data-loc="' + inputNumber + '"></a>';
		newEndPointHtml += '<div id="location-' + inputNumber + '-predict" class="input-predict bdr-all bdr-shadow medium-fnt hide"></div>';
		newEndPointHtml += '</div>';
		var wp = $("#section-input-list li").length;
		newEndPointHtml += '<span class="xiashi" style="top:-17px;left: 0px;"></span>';
		newEndPointHtml += '</li>';
		$("#section-input-list").eq(0).append(newEndPointHtml);
	}
	return false;
}

function removeDestination() {
	inputNumber = $(".addressInput").length;
	if(inputNumber <= 5) {
		$("#section-input-list").removeClass('huadong');
	}
	var t = $(this);
	if(inputNumber > 2) {
		var deleteId = $(this).attr('id').charAt($(this).attr('id').length - 1);
		delete locationList['location-' + parseInt(deleteId)];
		var isThisLastPoint = t.attr('id') == 'remove-location-' + inputNumber ? true : false;
		console.log('removeDestination......');
		var thisPoint = t.parent().prev();
		thisPoint.parent().remove();
		inputNumber -= 1;
		rearrangeLocationOrders();
		inputLocation();
		if(isThisLastPoint) {
			if($('#section-input' + inputNumber)[0] != undefined) {
				$('#section-input' + inputNumber)[0].className = 'logo end-pt';
			}
		}
		triggerPriceCalc();
	}
}

function rearrangeLocationOrders() {
	console.log('rearrangeLocationOrders...');
	var liCnt = 1;
	$('#section-input-list .section-input').each(function(index) {
		var $this = $(this),
			input = $this.find('input'),
			a = $this.find('a'),
			div = $this.find('div');
		var curId = $this.find('input').attr('id');
		if(curId !== 'location-' + liCnt) {
			locationList['location-' + liCnt] = locationList[curId];
			delete locationList[curId];
		}
		div[2].id = 'location-' + liCnt + '-predict';
		div[0].id = 'section-input' + liCnt;
		if(input.length > 0) {
			input[0].id = 'location-' + liCnt;
		}
		if(a.length > 0) {
			a[0].id = 'remove-location-' + liCnt;
		}
		liCnt += 1;
	});
}

function inputLocation() {
	arrList = [];
	var inputList = $("#section-input-list .section-input  .location-input-ctn input");
	$.each(inputList, function(i, v) {
		var location = {
			'lng': v.dataset.lng,
			'lat': v.dataset.lat,
			'name': v.dataset.name
		};
		arrList.push(location);
	});
}

function selectMyFleetRadioType() {
	console.log('selectMyFleetRadioType...');
	var t = $(this);
	if(logSF()) {
		getMyFleetList(function(fleetList) {
			$.each(fleetList, function(a, b) {
				if(b != "") {
					if(myIoc != false) {
						$.cookie("myFleet", 1);
						myIoc = false;
						$(".my-icon").removeClass("open2").addClass("open1");
						$("#select-driver2").removeClass("open1").addClass("open2");
						$(".chauffeur .priority-hauffeur").addClass('heis');
					} else {
						$.cookie("myFleet", 2);
						$(".my-icon").removeClass("open1").addClass("open2");
						$("#select-driver2").removeClass("open2").addClass("open1");
						$(".chauffeur .priority-hauffeur").removeClass('heis');
						myIoc = true;
					}
					return false;
				}
			});
		});
	}
}

function getMyFleetList(openFleetBtnFn) {
	$.ajax({
		url: '/index.php',
		data: {
			_m: 'fleet',
			_a: 'a_my_fleet'
		},
		type: 'GET',
		dataType: 'json',
		timeout: 15000
	}).done(function(response) {
		var fleetList = [];
		console.log(response);
		if(response.ret == 0) {
			if(response.data.length == 0) {
				showPopupMsg('error', '抱歉，您还没编制您的车队，请先到我的车队页面添加司机。', '确定');
			}
			for(var t = 0; t < response.data.length; t++) {
				fleetList.push(response.data[t].phone_no);
			}
			openFleetBtnFn(fleetList);
		}
	}).fail(function() {
		showPopupMsg('error', '网络进水，请刷新', '刷新');
	});
}

function extraShow() {
	if(prevent != false) {
		$("#rightContent").hide();
		$("#additionalContent").toggle(500);
		$(".extrax").removeClass('bdr-all').addClass('bdr-all-y');
		prevent = false;
	}
}

function extraHide() {
	if(prevent == false) {
		$("#rightContent").show();
		$("#additionalContent").hide();
		$(".extrax").removeClass('bdr-all-y').addClass('bdr-all');
		prevent = true;
		if($(this).hasClass('call-calculate')) {
			triggerPriceCalc();
		}
	}
}

function triggerPriceCalc(params) {
	var doubleCheck = false;
	var setOrderDate = 0;
	if(params) {
		doubleCheck = params.doubleCheck;
		setOrderDate = params.setOrderDate;
	}
	console.log('triggerPriceCalc...');
	if(!doubleCheck) {
		if(isOrderLocationsValid(locationList) <= 1) {
			return false;
		}
		if(setOrderDate) {
			orderData = setOrderDate;
		} else {
			orderData = systemData();
		}
		stdTag = specialMosaic();
		specReq = obtainItional();
		if(latLongList()) {
			latLongStr = '';
			var latLong = '';
			latLong = getLatLongValues();
		}
		computePriceParams = {
			_m: 'order',
			_a: 'a_price_calc',
			lat_lon: latLong,
			city_id: $.cookie("cityid"),
			order_vehicle_id: orderVehicleId,
			order_time: orderData,
			std_tag: stdTag,
			spec_req: specReq
		};
	}
	$.ajax({
		url: '/index.php',
		type: 'GET',
		data: computePriceParams,
		dataType: 'json',
		timeout: 15000
	}).done(function(response) {
		console.log(response);
		if(response.ret == 0) {
			$('#location-error-ctn').removeClass('show').addClass('hide');
			if(response.ret == 0) {
				alreadyCoupon = "";
				distanceTotal = response.data.distance_total;
				closeAdd = 0;
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
				try {
					for(var _iterator = response.data.price_item[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var item = _step.value;
						if(item.type === 3 || item.type === 11) {
							closeAdd -= item.value_fen;
						} else {
							closeAdd += item.value_fen;
						}
					}
				} catch(err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if(!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if(_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
				closeAdd = parseFloat(closeAdd / 100).toFixed(2).replace(/0*$|\.0*$/, '');
				$("#totalS").text(closeAdd);
				price_item = response.data.price_item;
				$('.height118 .order-state-total-price p').text(response.data.surcharge_text ? response.data.surcharge_text : '');
				priceDetailed(response.data, "null");
			}
			return false;
		}
	}).fail(function() {});
	return false;
}

function priceDetailed(data) {
	console.log("priceDetailed........");
	var specialRequestCtnHtml = '';
	if(data.vehicle_type_name) {
		specialRequestCtnHtml += '<div class="section-body medium-fnt alg-l">';
		specialRequestCtnHtml += '起步价(' + data.vehicle_type_name + ')' + ':';
		specialRequestCtnHtml += '<span class="price-breakdown-special-request-total float-right">';
		specialRequestCtnHtml += '¥ ' + data.start_price_fen / 100;
		specialRequestCtnHtml += '</span>';
		specialRequestCtnHtml += '</div>';
	} else {
		if(data.start_price_fen != "") {
			var automobileImgAndText = [];
			var automobileImg = [];
			for(var i = 0; i < $(".swiper-wrapper p").length; i++) {
				if($(".swiper-wrapper p")[i].className == '') {
					automobileImgAndText.push($(".swiper-wrapper p")[i]);
					automobileImg.push($(".swiper-wrapper p")[i].innerHTML);
				}
			}
			if(automobileImgAndText[1] != undefined) {
				specialRequestCtnHtml += '<div class="section-body medium-fnt alg-l">';
				specialRequestCtnHtml += '起步价(' + automobileImgAndText[1].innerText + ')' + ':';
				specialRequestCtnHtml += '<span class="price-breakdown-special-request-total float-right">';
				specialRequestCtnHtml += '¥ ' + data.start_price_fen / 100;
				specialRequestCtnHtml += '</span>';
				specialRequestCtnHtml += '</div>';
			}
		}
	}
	if(data.exceed_distance > 0) {
		specialRequestCtnHtml += '<div class="section-body medium-fnt alg-l">';
		specialRequestCtnHtml += '超过里程' + '(' + Math.ceil(data.exceed_distance / 1000) + '公里):';
		specialRequestCtnHtml += '<span class="price-breakdown-special-request-total float-right">';
		specialRequestCtnHtml += '¥ ' + data.exceed_price_fen / 100;
		specialRequestCtnHtml += '</span>';
		specialRequestCtnHtml += '</div>';
	}
	if(data.vehicle_std_price_item.length > 0) {
		for(var i = 0; i < data.vehicle_std_price_item.length; i++) {
			if(data.vehicle_std_price_item[i].price_fen > 0) {
				specialRequestCtnHtml += '<div class="section-body medium-fnt alg-l">';
				specialRequestCtnHtml += data.vehicle_std_price_item[i].name + ':';
				specialRequestCtnHtml += '<span class="price-breakdown-special-request-total float-right">';
				specialRequestCtnHtml += '¥ ' + data.vehicle_std_price_item[i].price_fen / 100;
				specialRequestCtnHtml += '</span>';
				specialRequestCtnHtml += '</div>';
			} else if(data.vehicle_std_price_item[i].value_fen > 0) {
				specialRequestCtnHtml += '<div class="section-body medium-fnt alg-l">';
				specialRequestCtnHtml += data.vehicle_std_price_item[i].name + ':';
				specialRequestCtnHtml += '<span class="price-breakdown-special-request-total float-right">';
				specialRequestCtnHtml += '¥ ' + data.vehicle_std_price_item[i].value_fen / 100;
				specialRequestCtnHtml += '</span>';
				specialRequestCtnHtml += '</div>';
			}
		}
	}
	if(data.spec_req_price_item.length > 0) {
		for(var s = 0; s < data.spec_req_price_item.length; s++) {
			if(data.spec_req_price_item[s].price_fen > 0) {
				specialRequestCtnHtml += '<div class="section-body medium-fnt alg-l">';
				specialRequestCtnHtml += data.spec_req_price_item[s].name;
				specialRequestCtnHtml += '<span class="price-breakdown-special-request-total float-right">';
				specialRequestCtnHtml += '¥ ' + data.spec_req_price_item[s].price_fen / 100;
				specialRequestCtnHtml += '</span>';
				specialRequestCtnHtml += '</div>';
			} else if(data.spec_req_price_item[s].value_fen > 0) {
				specialRequestCtnHtml += '<div class="section-body medium-fnt alg-l">';
				specialRequestCtnHtml += data.spec_req_price_item[s].name;
				specialRequestCtnHtml += '<span class="price-breakdown-special-request-total float-right">';
				specialRequestCtnHtml += '¥ ' + data.spec_req_price_item[s].value_fen / 100;
				specialRequestCtnHtml += '</span>';
				specialRequestCtnHtml += '</div>';
			}
		}
	}
	if(data.surcharge_price_item && data.surcharge_price_item.length) {
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;
		try {
			for(var _iterator2 = data.surcharge_price_item[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var item = _step2.value;
				if(item.value_fen) {
					var price = item.value_fen / 100;
					specialRequestCtnHtml += "<div class=\"section-body medium-fnt alg-l\">\n      " + item.name + "\uFF1A\n      <span class=\"price-breakdown-special-request-total float-right\">\n      \xA5 " + price + "\n      </span>\n      </div>";
				}
			}
		} catch(err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if(!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if(_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}
	}
	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;
	try {
		for(var _iterator3 = data.price_item[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var _item = _step3.value;
			if(_item.type === 10) {
				var _price = _item.value_fen / 100;
				specialRequestCtnHtml += "<div class=\"section-body medium-fnt alg-l\">\n      \u70ED\u70B9\u533A\u57DF\u6700\u4F4E\u6D88\u8D39\u5DEE\u989D\uFF1A\n      <span class=\"price-breakdown-special-request-total float-right\">\n      \xA5 " + _price + "\n      </span>\n      </div>";
			} else if(_item.type === 11) {
				var _price2 = _item.value_fen / 100;
				specialRequestCtnHtml += "<div class=\"section-body medium-fnt alg-l\">\u670D\u52A1\u8D39\u6298\u6263\uFF1A<span class=\"price-breakdown-special-request-total float-right\">\n      \xA5 " + -_price2 + "\n      </span>\n      </div>";
			}
		}
	} catch(err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if(!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if(_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}
	$('.price-breakdown-special-request-ctn').html(specialRequestCtnHtml);
}

function specialMosaic() {
	var specialList = [];
	var special = '';
	for(var p = 0; p < $(".special_rules_ul .bdr-rds").length; p++) {
		if($(".special_rules_ul .bdr-rds")[p].classList[1] == 'bdr-all-y') {
			specialList.push($(".special_rules_ul .bdr-rds")[p].childNodes[0].data);
		}
	}
	for(var e = 0; e < specialList.length; e++) {
		if(specialList.length != 0) {
			if(e == parseInt(specialList.length - 1)) {
				special += specialList[e];
			} else {
				special += specialList[e] + ',';
			}
		}
	}
	return special;
}

function systemData() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var f = date.getMinutes();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + f + seperator2 + date.getSeconds();
	var dt = new Date(currentdate.replace(/-/g, "/"));
	dt.setMinutes(dt.getMinutes() + 20, dt.getSeconds(), 0);
	var s = Math.round(dt / 1000);
	return s;
}

function obtainItional() {
	var arr = new Array();
	var s = $(".extra-select ul li input");
	for(var p = 0; p < s.length; p++) {
		var w = s[p].checked;
		if(w) {
			arr.push(s[p].id);
			addextra.push($(".extra-select li input")[p].defaultValue);
		}
	}
	if(addextra.length != 0) {
		var arrStr = '';
		for(var i = 0; i < addextra.length; i += 1) {
			arrStr += addextra[i] + '&nbsp;|&nbsp;';
		}
		$(".extra .priority-hauffeur").html(arrStr);
		$(".extra .priority-hauffeur").addClass('heis');
		addextra = [];
	} else {
		$("#order-place-left-state-1 .extra spam").text("添加额外需求");
		$("#order-place-left-state-1 .extra spam").removeClass('heis');
	}
	var x = arr.join(",");
	return x;
}

function objKeySort(arys) {
	var newkey = Object.keys(arys).sort();
	var newObj = {};
	for(var i = 0; i < newkey.length; i++) {
		newObj[newkey[i]] = arys[newkey[i]];
	}
	return newObj;
}

function latLongList() {
	console.log('latLongList.............');
	arr = [];
	locationList = objKeySort(locationList);
	if(locationList) {
		latLongArr = [];
		$.each(locationList, function(w, a) {
			if(!hll) {
				if(typeof a.lat != 'string' && typeof a.lng != 'string') {
					var gcj02tobd09 = tools.baiduToGps(a.lat, a.lng);
					latLongArr.push(new BMap.Point(gcj02tobd09.lat, gcj02tobd09.lon));
				} else {
					latLongArr.push(new BMap.Point(a.lat, a.lng));
				}
			} else {
				if(typeof a.lat != 'string' && typeof a.lng != 'string') {
					var gcj02tobd09 = tools.baiduToGps(a.lat, a.lng);
					latLongArr.push(new BMap.Point(gcj02tobd09.lat, gcj02tobd09.lon));
				} else {
					latLongArr.push(new BMap.Point(a.lat, a.lng));
				}
			}
		});
		$.each(latLongArr, function(a, s) {
			arr.push(s);
		});
		return true;
	}
	return false;
}

function isOrderLocationsValid(json) {
	console.log('isOrderLocationsValid...');
	var len = 0;
	for(var j in json) {
		len++;
	}
	return len;
}

function orderAction() {
	if(logSF()) {
		if(immediately("1")) {
			isSubscribe = 1;
			var $this = $(this),
				startDate = getCurrentOrderTime((new Date().getTime() + 1200000) / 1000, 'yyyy-mm-dd HH:MM').formattedTime,
				endDate = getCurrentOrderTime(new Date() / 1000 + 24 * 4 * 3600);
			$this.datetimepicker({
				lang: 'ch',
				startDate: startDate,
				format: 'Y-m-d H:i',
				minDate: '-1970/01/01',
				maxDate: '+1970/01/05',
				step: 10,
				minTime: startDate,
				closeOnDateSelect: false,
				onChangeDateTime: function onChangeDateTime(ct) {
					var now = new Date();
					if(dateFormat(ct, 'd') == dateFormat(now, 'd')) {
						this.setOptions({
							minTime: startDate
						});
					} else {
						this.setOptions({
							minTime: false
						});
					}
				},
				onClose: function onClose(ct, $i) {
					$i.datetimepicker('destroy');
				},
				onSelectTime: function onSelectTime(ct) {
					onSelectDateTimePicker(ct);
				},
				onSelectDate: function onSelectDate(ct) {
					onSelectDateTimePicker(ct);
				}
			}).trigger('focus');
		}
	}
}

function getCurrentOrderTime(timestamp, format) {
	var tmpOrderCurrentTime = new Date(timestamp * 1000);
	var th = tmpOrderCurrentTime.getHours();
	th < 10 ? th = "0" + th : th = th;
	var tmpOrderCurrentTimeYear = tmpOrderCurrentTime.getFullYear(),
		tmpOrderCurrentTimeMonth = tmpOrderCurrentTime.getMonth() + 1,
		tmpOrderCurrentTimeDate = tmpOrderCurrentTime.getDate(),
		tmpOrderCurrentTimeHour = th,
		tmpOrderCurrentTimeMinute = tmpOrderCurrentTime.getMinutes();
	tmpOrderCurrentTimeMinute == 0 ? tmpOrderCurrentTimeMinute = "0" + tmpOrderCurrentTimeMinute : tmpOrderCurrentTimeMinute = tmpOrderCurrentTimeMinute;
	var ampm = tmpOrderCurrentTimeHour >= 12 ? '下午 ' : '上午 ';
	return {
		year: tmpOrderCurrentTimeYear,
		month: tmpOrderCurrentTimeMonth,
		date: tmpOrderCurrentTimeDate,
		hour: tmpOrderCurrentTimeHour,
		minute: tmpOrderCurrentTimeMinute,
		display: ampm + tmpOrderCurrentTimeHour + ':' + tmpOrderCurrentTimeMinute,
		timestamp: new Date(tmpOrderCurrentTimeYear, tmpOrderCurrentTimeMonth - 1, tmpOrderCurrentTimeDate, tmpOrderCurrentTimeHour, tmpOrderCurrentTimeMinute).getTime() / 1000,
		formattedTime: format !== null ? dateFormat(new Date(tmpOrderCurrentTimeYear, tmpOrderCurrentTimeMonth - 1, tmpOrderCurrentTimeDate, tmpOrderCurrentTimeHour, tmpOrderCurrentTimeMinute, 0, 0), format) : ''
	};
}

function baiduCssJosn() {
	$.ajax({
		url: '/rs/json/baidumap_config.json',
		data: "",
		type: 'GET',
		timeout: 15000
	}).done(function(response) {
		$.each(response, function(a, l) {
			myStyleJson.push(l);
		});
	}).fail(function(response) {
		showPopupMsg('error', '网络进水，请刷新', '刷新');
	});
}

function onSelectDateTimePicker(ct) {
	console.log('ct', ct);
	var timeText = dateFormat(ct, 'yyyy-mm-dd HH:MM');
	jumpConfirm("1");
	$("#order-time").html(timeText);
	triggerPriceCalc({
		setOrderDate: Date.parse(ct) / 1000
	});
}

function jumpConfirm(data) {
	console.log('jumpConfirm..............');
	baiduCssJosn();
	if(data == "1") {
		var sa = "1";
	} else {
		var sa = "0";
	}
	if(immediately(sa)) {
		$("#order-place-left-state-1").hide();
		$("#main-div").show();
		$("#order-now").hide();
		$("#order-booking").hide();
		$("#order-determine").show();
		$("#order-place-right1").hide();
		$("#order-place-right-state-2").show();
		var arrL = [];
		var chartData = [];
		var map = new BMap.Map("main");
		map.setMapStyle({
			styleJson: myStyleJson
		});
		if(arr != []) {
			var pointArr = new Array();
			pointArr = [];
			BD09(arr, function(data) {
				for(var i = 0; i < data.length; i++) {
					pointArr.push(new BMap.Point(data[i].x, data[i].y));
				}
				var firstPoint = pointArr[0];
				var endPoint = pointArr[pointArr.length - 1];
				map.centerAndZoom(pointArr[0], 11);
				map.enableScrollWheelZoom(true);
				$.each(pointArr, function(item, value) {
					if(item != 0 && pointArr.length - item != 1) {
						chartData.push(new BMap.Point(pointArr[item].lng, pointArr[item].lat));
					}
				});
				var driving = new BMap.DrivingRoute(map, {
					renderOptions: {
						map: map,
						autoViewport: true
					}
				});
				driving.search(firstPoint, endPoint, {
					waypoints: chartData
				});
			});
		}
		var s = [];
		var tel = $("#recipient-phone-input").val();
		s.push(tel);
		s.push($('#recipient-name-input').val());
		s.push($(".extra .priority-hauffeur")[0].innerText);
		var remarks = $('#remarks').val();
		remarks = remarks.replace('<', '&lt;').replace('>', '&gt;');
		s.push(remarks);
		var oDate = new Date();
		var as = getNowFormatDate();
		var timeArray = as.split(/-|\s|:/g);
		var time = new Date(timeArray[0], timeArray[1] - 1, timeArray[2], timeArray[3], timeArray[4]);
		var b = 20;
		time.setMinutes(time.getMinutes() + b, time.getSeconds(), 0);
		var month = time.getMonth();
		var strDate = time.getDate();
		var minutes = time.getMinutes();
		if(strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		if(minutes >= 0 && minutes <= 9) {
			minutes = "0" + minutes;
		}
		s.push(month + 1 + '月' + strDate + '日' + '&nbsp' + time.getHours() + ':' + minutes);
		var temp = $('#rightState2').html();
		var interText = doT.template(temp);
		$("#order-place-right-state-2").html(interText({
			arr: locationList,
			s: s
		}));
	}
	return false;
}

function BD09(data, BdBack) {
	console.log('BD09.......');
	var BdBack = BdBack || function() {};
	var coords = [];
	$.each(data, function(a, x) {
		if(x.lat == undefined || x.lng == undefined) {
			coords.push(x.lon + ',' + x.lat);
		} else {
			coords.push(x.lat + ',' + x.lng);
		}
	});
	coords = coords.join(';');
	$.ajax({
		url: '//api.map.baidu.com/geoconv/v1/?coords=' + coords + '&from=1&to=5&ak=GANo2ajua2rTiTTc05oKIrYr&s=1',
		type: "GET",
		dataType: 'jsonp',
		jsonpCallback: 'callbackACityInfo',
		timeout: 15000
	}).done(function(response) {
		console.log(response);
		if(response.status == 0) {
			BdBack(response.result);
		} else {
			showPopupMsg('error', '网络进水，请刷新', '刷新');
		}
	}).fail(function() {
		showPopupMsg('error', '网络进水，请刷新', '刷新');
		return false;
	});
}

function choiceMode() {
	var priceFen = '';
	priceFen = $("#totalS").html();
	priceFen = parseInt(priceFen) * 100;
	var dataList = [];
	var dataListLaLa = [];
	console.log('choiceMode...');
	$.ajax({
		type: "GET",
		url: "/index.php",
		data: {
			_m: "coupon",
			_a: "coupon_lists",
			price_total_fen: priceFen
		},
		dataType: 'json',
		timeout: 15000
	}).done(function(response) {
		console.log(response);
		var data = response.data;
		if(response.ret == 0) {
			$("#fancybox-overlay").show();
			$("#coupon").show();
			$.each(data, function(k, s) {
				var oDate1 = new Date(data[k].end_time);
				var oDate2 = new Date();
				if(oDate1 > oDate2) {
					dataList.push(data[k]);
				}
			});
			var cityId = $.cookie('cityid');
			cityId = parseInt(cityId);
			$.each(dataList, function(p, l) {
				if(l.user_citys[0] != 0) {
					$.each(dataList[p].user_citys, function(o, a) {
						if(cityId == a) {
							if(dataList[p].status != 1) {
								dataListLaLa.push(dataList[p]);
							}
						}
					});
				} else {
					dataListLaLa.push(l);
				}
			});
			$.each(dataListLaLa, function(i, v) {
				dataListLaLa[i].start_time = dataListLaLa[i].start_time.substr(0, 10);
				dataListLaLa[i].end_time = dataListLaLa[i].end_time.substr(0, 10);
				dataListLaLa[i].cityName = dataListLaLa[i].city_names.join("、");
				dataListLaLa[i].discount_rate = parseInt(dataListLaLa[i].discount_rate) / 10;
				dataListLaLa[i].discount_datas = dataListLaLa[i].discount_rate * 10;
			});
			if(llData) {
				var temp = $('#couponList').html();
				var interText = doT.template(temp);
				$("#coupon").html(interText(dataListLaLa));
			}
			$("#totalP")[0].textContent = $("#totalS")[0].textContent;
			var ww = parseInt($("#totalS")[0].textContent);
			if(ww >= 3000) {
				$("#alipayZhiFu").hide();
				$("#weChatZhiFu").hide();
				$("#paymentChoice").width(460);
				paymentMethod('0');
			} else {
				$("#alipayZhiFu").show();
				$("#weChatZhiFu").show();
			}
			$(".displayCoupon").text(alreadyCoupon);
			if(ww < 3000) {
				if(dataListLaLa.length > 0) {
					cursor(dataListLaLa);
				}
			}
		} else {
			showPopupMsg('error', '网络进水，请刷新', '刷新');
		}
	}).fail(function() {
		showPopupMsg('error', '网络进水，请刷新', '刷新');
		return false;
	});
}

function checkPrice() {
	$.ajax({
		url: '/index.php',
		type: 'GET',
		data: computePriceParams,
		dataType: 'json',
		timeout: 15000
	}).done(function(response) {
		if(response.ret === 0) {
			var totalPrice = 0;
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;
			try {
				for(var _iterator4 = response.data.price_item[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var item = _step4.value;
					if(item.type === 3 || item.type === 11) {
						totalPrice -= item.value_fen / 100;
					} else {
						totalPrice += item.value_fen / 100;
					}
				}
			} catch(err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if(!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if(_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}
			totalPrice = parseFloat(closeAdd).toFixed(2).replace(/0*$|\.0*$/, '');
			console.log('totalPrice', totalPrice);
			if(totalPrice === closeAdd) {
				orderDetermine();
			} else {
				lalaClose();
				showPopupMsg('error', '订单报价已过期，请重新确认。', '', 2000, function() {
					triggerPriceCalc({
						doubleCheck: true
					});
				});
			}
		}
	});
}

function orderDetermine() {
	console.log('orderDetermine...');
	var cityId = $.cookie("cityId");
	myFleet = $.cookie("myFleet");
	var userName = encodeURIComponent($("#recipient-name-input").val());
	var phone = $("#recipient-phone-input").val();
	var orderRemarks = $("#order-remarks").text();
	orderRemarks = orderRemarks.replace('<', '&lt;').replace('>', '&gt;');
	var addressStr = getAddressValues();
	var uuid = $.cookie('uuid');
	if(uuid == undefined) {
		uuid = 0;
	}
	if(couponId == "") {
		couponId = 0;
	}
	orderData = computePriceParams.order_time;
	$.ajax({
		url: '/index.php',
		type: 'GET',
		data: {
			_m: 'order',
			_a: 'a_order_request',
			user_name: userName,
			user_tel: phone,
			remark: orderRemarks,
			last_repeat_uuid: uuid,
			order_vehicle_id: orderVehicleId,
			order_time: orderData,
			std_tag: stdTag,
			spec_req: specReq,
			lat_lon: latLongStr,
			distance_total: distanceTotal,
			is_subscribe: isSubscribe,
			addr_info: addressStr,
			send_type: myFleet,
			coupon_id: couponId,
			pay_type: paymentMode,
			price_item: JSON.stringify(price_item)
		},
		dataType: 'json',
		timeout: 15000
	}).done(function(response) {
		if(response.ret == 0) {
			console.log(response);
			var data = response.data;
			$.cookie("uuid", data.order_uuid);
			$.cookie("orderDetailId", cityId);
			$.cookie("orderDetails", data.order_uuid);
			if(paymentMode == 0) {
				window.location.href = '../details.html?switch=4';
			} else if(paymentMode == 2) {
				$("#alipay").show();
				$("#coupon").hide();
				$('#alipay').append($(data.form_html));
			} else if(paymentMode == 1) {
				$("#weChat").show();
				$("#weChatImg").attr('src', data.code_url);
				$("#coupon").hide();
			}
		} else if(response.ret === 20001) {
			lalaClose();
			showPopupMsg('error', '订单报价已过期，请重新确认。', '', 2000, function() {
				triggerPriceCalc({
					doubleCheck: true
				});
			});
		} else {
			$("#coupon").hide();
			showPopupMsg('error', response.msg, '刷新');
		}
	}).fail(function() {
		showPopupMsg('error', '网络进水，请刷新', '刷新');
	});
}

function failReason() {
	$("#alipay").hide();
	$("#shuoMing").show();
}

function getAddressValues() {
	console.log('getAddressValues...');
	var addressStr = [];
	var c = [];
	$.each(locationList, function(p, s) {
		c.push(s);
	});
	var cityId = $.cookie('cityid');
	for(var i = 0; i < c.length; i += 1) {
		if(c[i].lat != "") {
			if(c[i].address == "undefined") {
				c[i].address = "";
			}
			var a = encodeURIComponent(c[i].address),
				d = encodeURIComponent(c[i].name);
			addressStr.push(cityId + '|' + d + '|' + a);
		}
	}
	var a = addressStr.join(',');
	return a;
}

function getLatLongValues() {
	for(var i = 0; i < latLongArr.length; i += 1) {
		if(latLongArr[i] != undefined) {
			if(latLongArr[i].lat != "") {
				latLongStr += latLongArr[i].lat + '|' + latLongArr[i].lng + ',';
			}
		}
	}
	if(latLongStr != '') {
		latLongStr = latLongStr.slice(0, -1);
	}
	return latLongStr;
}

function lalaDetails() {
	console.log('lalaDetails...');
	if($(this).hasClass('float-right')) {
		if(paymentMode != "0") {
			$("#coupon").css("width", "900");
			$("#lalaDetails").show();
		}
	} else {
		$("#coupon").css("width", "500");
		$(".displayCoupon").text('暂不使用拉拉劵');
		$("#lalaDetails").hide();
		$("#couponG").remove();
		$("#totalP")[0].textContent = closeAdd;
		$("#totalS")[0].textContent = closeAdd;
		alreadyCoupon = "";
		couponId = "";
	}
}

function paymentMethod(data) {
	console.log('paymentMethod...');
	$('.payment').removeClass("spanActis").addClass("weixian");
	$('.payment').find("span").removeClass("anquan");
	$(this).removeClass('weixian').addClass('spanActis');
	$(this).find("span").addClass('anquan');
	paymentMode = parseInt($(this).attr('data-type'));
	$(".displayCoupon").text(alreadyCoupon);
	if(paymentMode == 0 || data == 0) {
		paymentMode = 0;
		$('#xianJin').removeClass("weixian").addClass("spanActis");
		$("#lalaDetails").hide();
		$(".displayCoupon").text('拉拉劵仅支持在线支付');
		$("#couponG").remove();
		$("#totalS")[0].textContent = closeAdd;
		$("#totalP")[0].textContent = closeAdd;
		alreadyCoupon = "";
		couponId = '';
		$("#coupon").css("width", "500");
	} else {
		llData = false;
		choiceMode();
	}
}

function cursor(data) {
	console.log('cursor...', data);
	if(data.length != 0 && data.length != undefined) {
		$("#totalP")[0].textContent = closeAdd;
		$("#totalS")[0].textContent = closeAdd;
		var j = Number(data[0].discount_amount) / 100;
		var q = Number($("#totalP").html());
		var dataJ = "";
		var h = Number(data[0].discount_datas);
		h = parseFloat('0.' + h);
		var b = data[0].discount_amount / 100;
		b = Number(b);
		var x = data[0].discount_type;
		if(x == 2) {
			dataJ = q - q * h;
			dataJ = Math.floor(dataJ);
			if(dataJ > j) {
				q = q - j;
				dataJ = j;
			} else {
				q = q - dataJ;
			}
		} else {
			dataJ = b;
			if(q < parseInt(dataJ) || q == parseInt(dataJ)) {
				$("#coupon").css("width", "500");
				$("#lalaDetails").hide();
				return false;
			}
			q = q - parseInt(dataJ);
		}
		couponId = data[0].coupon_id;
		$(".displayCoupon").text('已优惠' + dataJ + '元');
		q = q.toFixed(2) * 100 / 100;
		$("#totalP")[0].textContent = q;
		$("#totalS")[0].textContent = q;
		alreadyCoupon = '已优惠' + dataJ + '元';
		if($("#couponG")) {
			$("#couponG").remove();
		}
		var html = "";
		html += '<div id="couponG" class="section-body medium-fnt alg-l">优惠劵抵扣';
		html += '<span class="price-breakdown-special-request-total float-right ">-¥ ' + dataJ + '</span>';
		html += '</div>';
		$(".price-breakdown-special-request-ctn").append(html);
	} else {
		$("#totalP")[0].textContent = closeAdd;
		$("#totalS")[0].textContent = closeAdd;
		var j = Number($(this).attr('data-amount'));
		var q = Number($("#totalP").html());
		var dataJ = "";
		var h = Number($(this).attr('discount_datas'));
		h = parseFloat('0.' + h);
		var b = Number($(this).attr('data-immediately'));
		b = Number(b);
		var t = $(this).attr('data-discount');
		var x = $(this).attr('data-discountType');
		if(x == "2") {
			dataJ = q - q * h;
			dataJ = Math.floor(dataJ);
			if(dataJ > j) {
				q = q - j;
				dataJ = j;
			} else {
				q = q - dataJ;
			}
		} else {
			dataJ = b;
			if(q < parseInt(dataJ) || q == parseInt(dataJ)) {
				$("#coupon").css("width", "500");
				$("#lalaDetails").hide();
				return false;
			}
			q = q - parseInt(dataJ);
		}
		couponId = $(this).attr('data-couponId');
		$(".displayCoupon").text('已优惠' + dataJ + '元');
		q = q.toFixed(2) * 100 / 100;
		$("#totalP")[0].textContent = q;
		$("#totalS")[0].textContent = q;
		alreadyCoupon = '已优惠' + dataJ + '元';
		if($("#couponG")) {
			$("#couponG").remove();
		}
		var html = "";
		html += '<div id="couponG" class="section-body medium-fnt alg-l">优惠劵抵扣';
		html += '<span class="price-breakdown-special-request-total float-right ">-¥ ' + dataJ + '</span>';
		html += '</div>';
		$(".price-breakdown-special-request-ctn").append(html);
		$("#coupon").css("width", "500");
		$("#lalaDetails").hide();
	}
}

function lalaClose() {
	console.log('lalaClose...');
	$("#fancybox-overlay").hide();
	$("#weChat").hide();
	$("#payment").hide();
	$("#alipay").hide();
	$("#coupon").hide();
	lalaDetails();
}

function immediately(data) {
	if(data == "1") {
		isSubscribe = "1";
	} else {
		isSubscribe = "0";
	}
	if(logSF()) {
		console.log('immediately...');
		if($("#location-1").val() == "") {
			$("#location-error-ctn").show();
			$("#location-error-ctn").text("请输入起点！");
			$(".location-1-div").removeClass('border-hui').addClass('error-rgb');
			return false;
		} else {
			$("#location-error-ctn").hide();
			$(".location-1-div").removeClass('error-rgb').addClass('border-hui');
		}
		for(var i = 0; i < arrList.length; i += 1) {
			$(".location-input-ctn")[i].className = "location-input-ctn  location-2-div positionR border-hui";
			if(arrList[i] == undefined || arrList[i].lat == "") {
				var _sel = $("input.order-input-list").filter(function() {
					return this.value != '';
				});
				if(_sel.last().parent().parent().prevAll('.section-input').length == _sel.length - 1 || _sel.length > 1) {
					$.each($(".order-input-list"), function(i, v) {
						if(v.value == "") {
							$(".location-input-ctn")[i].className = "location-input-ctn location-2-div positionR error-rgb";
							$("#location-error-ctn").show();
							$("#location-error-ctn").text("请输入目的地！");
						}
					});
					return false;
				}
			}
		}
		userName = $("#recipient-name-input").val();
		if(userName == "") {
			$("#recipient-info-error-ctn").show();
			$("#recipient-info-error-ctn").text('请填写联络人资料！');
			return false;
		}
		var tel = $("#recipient-phone-input").val();
		if(!/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(tel)) {
			$("#recipient-info-error-ctn").show();
			$("#recipient-info-error-ctn").text('请填写正确的手机号码！');
			return false;
		}
		return true;
	}
}

function editOrder() {
	$("#order-place-left-state-1").show();
	$("#main-div").hide();
	$("#order-place-right-state-2").hide();
	$("#order-now").show();
	$("#order-booking").show();
	$("#order-determine").hide();
	$("#order-place-right1").show();
}

function recipientNameInput() {
	$("#recipient-info-error-ctn").hide();
}

function inputFilter() {
	var text = $(this).val();
	text = text.replace(/[^\w\u4E00-\u9FA5]/g, '');
	$(this).val(text);
}

function resolution(lng, lat, callBack) {
	var callBack = callBack || function() {};
	console.log('resolution...');
	var geoc = new BMap.Geocoder();
	var point = new BMap.Point(lng, lat);
	geoc.getLocation(point, function(rs) {
		var addComp = rs.addressComponents;
		var name = addComp.city.replace('市', '');
		$.each(cityList, function(i, v) {
			if(v.name == name) {
				if($.cookie('cityid') == v.city_id) {
					cityChange = false;
				} else {
					cityChange = true;
				}
				$.cookie('cityid', v.city_id);
				$.cookie('cityName', v.name);
				$.cookie('upperCity', $("#current-city-name").html());
				cityS = true;
				cityDisplay(name);
			}
		});
		if(!cityS) {
			$('#location-1').val('');
			$('.lgtFnt').remove();
			$('#location-1-predict').html('').addClass('hide');
			showPopupMsg('error', '抱歉，你选择的地点还没开通服务。', '确定');
			cityS = false;
			cityLocation();
		} else {
			if(resultList == 1) {
				if(locationList == "") {
					inputWhether = false;
					alreadyModels();
				}
			}
			callBack();
			return false;
		}
	});
}

function logSF() {
	if($.cookie("tel")) {
		return true;
	} else {
		showPopupMsg('error', '对不起，您还未登录，请先登录。', '确定');
		return false;
	}
}

function showPopupMsg(state, data, btn, outTime, outCallBack) {
	if(state == 'error') {
		$('#popup .msg').text(data);
		$('#popup .outInformation').text(btn);
		$('#popup').show();
		$('#fancybox-overlay').show();
		if(outTime) {
			setTimeout(function() {
				$("#popup").hide();
				$('#fancybox-overlay').hide();
				outCallBack();
			}, outTime);
		}
	}
	return false;
}

function outInformation(source) {
	var s = switchMethod("switch");
	if($(this)[0].innerText == "刷新" || $(this)[0].innerText == "返回") {
		if($(this)[0].innerText == "返回") {
			$("#popup").hide();
			return false;
		} else {
			location.reload();
			return false;
		}
	}
	if($(this)[0].innerText == "确定") {
		if(s == 4) {
			if($("#popup .msg").text() == '对不起，您还未登录，请先登录。') {
				$("#popup").hide();
				$('#fancybox-wrap').show();
				return false;
			}
			$("#fancybox-overlay").hide();
			$("#popup").hide();
			return false;
		} else if(s == 2 || s == 1 || s == 3) {
			$('#popup').hide();
			$('#fancybox-overlay').hide();
			if($('#popup .msg').text() == "对不起，您还未登录，请先登录。") {
				loginShow();
			}
		} else {
			$("#fancybox-overlay").hide();
			$("#popup").hide();
			return false;
		}
	} else {
		if(s == 4) {
			$("#popup").hide();
			$('#fancybox-overlay').hide();
			$('#fancybox-wrap').hide();
			return false;
		}
		$('#popup .msg').text('');
		$('#popup').hide();
		$('#fancybox-overlay').hide();
		$('#fancybox-wrap').hide();
	}
	return false;
}

function cityDisplay(name) {
	name = name.replace('市', '');
	headerCityName.text(name);
}

function navigationPrompt() {
	var navigation = $.cookie("navigation");
	if(navigation != 0 && navigation != undefined && navigation != "NaN") {
		$("#navigation").show();
		$("#navigation").text(navigation);
	} else {
		$("#navigation").hide();
	}
}

function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes();
	return currentdate;
}