<template>
	<div class="xiazai" style="box-shadow: rgb(170, 170, 170) 0px 3px 22px -2px;">
		<div class="ios dbtn">
			<a style="display: block;width: 100%;height: 100%;">
				<p>
					<img src="../../../static/img/pingguo.png" style="vertical-align: middle;">
					<span style="color: #fff;font-weight：100;font-family: 'arial, helvetica, sans-serif'; font-size: 14px;">iPhone下载</span>
				</p>
			</a>

		</div>
		<div style="width: 10%;"></div>
		<div class="and dbtn">
			<a style="display: block;width: 100%;height: 100%;">
				<p>
					<img src="../../../static/img/anzhuo.png" style="vertical-align: middle;">
					<span style="color: #373C64;font-weight：100;font-family: 'arial, helvetica, sans-serif'; font-size: 14px;">Android下载</span>
				</p>
			</a>

		</div>
	</div>
</template>

<script>
	import browser from '../../js/drivce'
	export default {
		name: 'DownLoad',
		mounted() {
//			this.getBrowser()
			this.getEquipment()
		},
		methods: {
			getEquipment(){
				let userAgentInfo = navigator.userAgent;
	let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod", "Mac", "Windows"];
	let flag = "PC";
	for(let v = 0; v < Agents.length; v++) {
		if(userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = Agents[v];

			break;
		}
	}
//	alert(flag)
			},
			getBrowser() {
				let agent = navigator.userAgent.toLowerCase(),
					opera = window.opera,
					browser = {
						//检测当前浏览器是否为IE  
						ie: /(msie\s|trident.*rv:)([\w.]+)/.test(agent),
						//检测当前浏览器是否为Opera  
						opera: (!!opera && opera.version),
						//检测当前浏览器是否是webkit内核的浏览器  
						webkit: (agent.indexOf(' applewebkit/') > -1),
						//检测当前浏览器是否是运行在mac平台下  
						mac: (agent.indexOf('macintosh') > -1),
						//检测当前浏览器是否处于“怪异模式”下  
						quirks: (document.compatMode == 'BackCompat')
					};
				//检测当前浏览器内核是否是gecko内核  
				browser.gecko = (navigator.product == 'Gecko' && !browser.webkit && !browser.opera && !browser.ie);
				let version = 0;
				// Internet Explorer 6.0+  
				if(browser.ie) {
					let v1 = agent.match(/(?:msie\s([\w.]+))/);
					let v2 = agent.match(/(?:trident.*rv:([\w.]+))/);
					if(v1 && v2 && v1[1] && v2[1]) {
						version = Math.max(v1[1] * 1, v2[1] * 1);
					} else if(v1 && v1[1]) {
						version = v1[1] * 1;
					} else if(v2 && v2[1]) {
						version = v2[1] * 1;
					} else {
						version = 0;
					}
					//检测浏览器模式是否为 IE11 兼容模式  
					browser.ie11Compat = document.documentMode == 11;
					//检测浏览器模式是否为 IE9 兼容模式  
					browser.ie9Compat = document.documentMode == 9;
					//检测浏览器模式是否为 IE10 兼容模式  
					browser.ie10Compat = document.documentMode == 10;
					//检测浏览器是否是IE8浏览器  
					browser.ie8 = !!document.documentMode;
					//检测浏览器模式是否为 IE8 兼容模式  
					browser.ie8Compat = document.documentMode == 8;
					//检测浏览器模式是否为 IE7 兼容模式  
					browser.ie7Compat = ((version == 7 && !document.documentMode) || document.documentMode == 7);
					//检测浏览器模式是否为 IE6 模式 或者怪异模式  
					browser.ie6Compat = (version < 7 || browser.quirks);
					browser.ie9above = version > 8;
					browser.ie9below = version < 9;
				}
				// Gecko.  
				if(browser.gecko) {
					let geckoRelease = agent.match(/rv:([\d\.]+)/);
					if(geckoRelease) {
						geckoRelease = geckoRelease[1].split('.');
						version = geckoRelease[0] * 10000 + (geckoRelease[1] || 0) * 100 + (geckoRelease[2] || 0) * 1;
					}
				}
				//检测当前浏览器是否为Chrome, 如果是，则返回Chrome的大版本号  
				if(/chrome\/(\d+\.\d)/i.test(agent)) {
					browser.chrome = +RegExp['\x241'];
				}
				//检测当前浏览器是否为Safari, 如果是，则返回Safari的大版本号  
				if(/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent) && !/chrome/i.test(agent)) {
					browser.safari = +(RegExp['\x241'] || RegExp['\x242']);
				}
				// Opera 9.50+  
				if(browser.opera)
					version = parseFloat(opera.version());
				// WebKit 522+ (Safari 3+)  
				if(browser.webkit)
					version = parseFloat(agent.match(/ applewebkit\/(\d+)/)[1]);
				//检测当前浏览器版本号  

				browser.version = version;
				console.log(browser);
			}
		}
	}
</script>

<style>
	.ios {
		background: #373C64;
	}
	
	.dbtn {
		width: 40%;
		position: relative;
		border: 1px solid #373C64;
		border-radius: 5px;
		height: 42px;
		/*justify-content: space-between;*/
		line-height: 42px;
	}
	
	.xiazai {
		width: 100%;
		position: fixed;
		justify-content: center;
		align-items: center;
		display: flex;
		bottom: 0;
		line-height: 74px;
		left: 0;
		background: #fff;
		height: 42px;
		padding-top: 16px;
		padding-bottom: 16px;
		text-align: center;
	}
</style>