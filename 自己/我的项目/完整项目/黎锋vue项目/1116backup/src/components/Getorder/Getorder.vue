<template v-if="this.grabinfo" style="overflow-y: scroll;position: absolute;">
	<!--npm install -g npm-->
	<div id="ordermask" @click="close" class="get" v-if="(this.open==true&&this.grabinfo.pay==1&&this.grabinfo.pay_status==0)||(this.open==true&&this.grabinfo.pay==0&&this.grabinfo.order_status>=0)" style="width: 100%;height: 100%;background: rgba(0,0,0,0.7) no-repeat center center;background-size:100%; position: fixed;top: 0;z-index: 9999999;overflow-y: scroll;">
		<!--@touchmove.prevent-->
		<div class="gett" style="width: 100%;height: 100%;background: rgba(0,0,0,0.1) no-repeat center center;background-size:100%; position: absolute;top: 0;z-index: 9999999;" v-if="(this.open==true&&this.grabinfo.pay==1&&this.grabinfo.pay_status==0)||(this.open==true&&this.grabinfo.pay==0&&this.grabinfo.order_status>=0)">
			<div id="center">
				<div @click="close" style="position: absolute;width: 30px;height: 30px;border:1px solid gainsboro;background: #fff;z-index: 99999; border-radius:50%;right: -2%;top: -2%;cursor: point;">
					<div style="position: absolute;width: 26px;height: 26px;background: grey;z-index: 99999; border-radius:50%;margin: auto;right: 0;cursor: point;left: 0;top: 0;bottom: 0;color: #fff;font-size: 20px;line-height: 26px;">X</div>
				</div>
				<div class="top">
					<div class="ordertag" style="font-size: 20px;" v-if="grabinfo.pay==1">货到时付款</div>

					<div class="ordertag" v-else-if="grabinfo.is_now==1">即时订单</div>

					<div class="ordertag" v-else-if="grabinfo.is_now==0">预约订单</div>
					<p v-if="grabinfo.pay!==1" style="font-size: 16px;color: #000000;width: 100%;text-align: center;margin-bottom: 5px;">发货地距离您当前位置{{grabinfo.driver_mileage}}公里</p>
					<p style="font-size: 14px;color: #4EB40A;width: 100%;text-align: center;margin-bottom: 5px;">发货时间：{{grabinfo.create_time|moment}}</p>

				</div>
				<div class="right">
					<div class="right-top">

						<div class="fahuodizhi">

							<div style="min-height: 60px;width: 100%;border-bottom: 1px solid rgba(0,0,0,0.2);">
								<p class="fa" style="font-size: 14px;color: #333;margin-bottom: 6px;">{{grabinfo.start_add}}</p>
								<p class="fa" style="font-size: 12px;color: #666;">{{grabinfo.start_address}}</p>
								<p class="facontact" style="margin-top: 10px;margin-bottom: 10px;color: #FAAF19;">
									<span class="faname">{{grabinfo.start_name}}</span>
									<span class="faphone">{{grabinfo.start_phone}}</span>
								</p>
							</div>
							<img src="../../../static/img/fahuo.png" style="position: absolute;left: 12px;top: 23px;" />
							<img src="../../../static/img/jiantou.png" style="position: absolute;left: 13px;top: 51px;" />

						</div>
					</div>

					<div class="right-bottom" v-for="item in orderinfo.orderaddress">
						<div class="shouhuodizhi">

							<div style="min-height: 60px;width:100%;border-bottom: 1px solid rgba(0,0,0,0.2);">
								<p style="font-size: 14px;color: #333;margin-bottom: 6px;">{{item.shipping_add}}</p>
								<p style="font-size: 12px;color: #666;">{{item.shipping_address}}</p>
								<p class="shoucontact" style="margin-top: 10px;margin-bottom: 10px;color: #FAAF19;">
									<span class="shouname">{{item.shipping_name}}</span>
									<span class="shouphone">{{item.shipping_phone}}</span>
								</p>
							</div>
							<img src="../../../static/img/shouhuo.png" style="position: absolute;left: 12px;top: 23px;" />
							<img class="d" src="../../../static/img/jiantou.png" style="position: absolute;left: 13px;top: 57px;" />
						</div>
					</div>
				</div>
				<div class="yunfeidiv" style="height: 36px;font-size:14px;line-height: 36px;width: auto;border-bottom: 1px solid #ddd;padding: 0 15px;">
					<span style="float: left;">运输费: <span style="color: #FA4535;">{{grabinfo.amount}}</span>元</span>
					<span style="float: right;color: #FA4535;">
								<span class="distance spanleft">(预估总里程：{{grabinfo.mileage}}公里)</span>
					</span>
					<div class="" style="clear: both;"></div>
				</div>
				<div class="yunfeidiv" v-if="grabinfo.orderdetails" style="height: 36px;font-size:14px;line-height: 36px;width: auto;border-bottom: 1px solid #ddd;padding: 0 15px;">
					<span style="float: left;">服务费:<span style="color: #FA4535;">{{grabinfo.excess_amount}}</span>元</span>
					<span style="float: right;color: #FA4535;">
							<span class="distance spanleft">所需车型：{{grabinfo.car_name}}</span>
					</span>
					<div class="" style="clear: both;"></div>
				</div>

				<div class="b" style="height: 60px;position: relative;padding-top: 10px;">
					<!--<span v-if="grabinfo.pay==1" style="position: absolute;bottom: 1%;left: 1.5%;color: red;font-size: 14px;">货到付款</span>-->
					<p style="font-size: 18px;color: red;text-align: center;width: auto;">￥ {{grabinfo.order_amount}}<span style="font-size: 18px;color: red;" v-if="grabinfo.subsidy_amount>0"> + {{grabinfo.subsidy_amount}} </span>元</p>
					<div v-if="(this.grabinfo.pay==0)||(this.grabinfo.pay==1&&this.grabinfo.pay_status==0&&this.grabinfo.driver_id==0)" class="bc" style="position: absolute;bottom: -85%;margin: auto;left:0;right:0;width: 90px;height: 90px;background: rgba(250,173,26,0.5);z-index: 99999999;border-radius:50%;">
						<a class="mc" style="position: absolute;bottom: 0%;margin: auto;left:0;right:0;top:0;width: 80px;height: 80px;background: #fff;z-index: 99999999;border-radius:50%;display: block;">
							<div v-if="(this.grabinfo.pay==0)||(this.grabinfo.pay==1&&this.grabinfo.pay_status==0&&this.grabinfo.driver_id==0)" @click="gomarket" class="sc" style="position: absolute;bottom: 0%;margin: auto;left:0;right:0;top:0;width: 70px;height: 70px;background: rgba(250,173,26,0.8);z-index: 99999999;border-radius:50%;">
								<p style="line-height: 52px;font-size: 20px;color: #fff;">抢单</p>
								<p style="line-height: 5px;font-size: 14px;color: #fff;">{{count}}秒</p>
							</div>

						</a>
					</div>
				</div>
				<div v-if="this.grabinfo.pay==1&&this.grabinfo.order_status>=0&&this.grabinfo.pay_status==0&&this.grabinfo.driver_id>0" style="position: absolute;bottom: -13%;margin: auto;left:0;right:0;width: 90px;height: 90px;background: rgba(73,242,17,0.8);z-index: 99999999;border-radius:50%;">
					<div class="mc" style="position: absolute;bottom: 0%;margin: auto;left:0;right:0;top:0;width: 80px;height: 80px;background: #fff;z-index: 99999999;border-radius:50%;">

						<div v-if="this.grabinfo.pay==1" @click="gopay" class="sc" style="position: absolute;bottom: 0%;margin: auto;left:0;right:0;top:0;width: 70px;height: 70px;background: rgba(32,149,42,0.8);z-index: 99999999;border-radius:50%;">
							<p style="line-height: 70px;font-size: 22px;color: #fff;">付款</p>
							<!--<p style="line-height: 5px;font-size: 14px;color: #fff;">{{count}}秒</p>-->
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
	</div>

</template>
<script src="https://static.mlinks.cc/scripts/dist/mlink.min.js">
	new Mlink({
    mlink:'https://ait1vo.mlinks.cc/ABBo',//短链地址
    button:document.querySelector('div.bc')
});
</script>
<script>
	import axios from 'axios'
	import $ from 'jquery'
	import { MP } from '../../js/map'
	import wx from 'weixin-js-sdk'
	import CallApp from 'callapp-lib';
	import API from '../../js/shipperapi'
	
	const appoption = {
		protocol: 'cityschele://',
		
		intent: {
			package: 'com.borun.dst.city.driver.app',
			scheme: 'cityschele://',
		},
		universal: {
			host: '',
			pathKey: '',
		},
		appstore: 'https://itunes.apple.com/us/app/id1281443566?l=zh&ls=1&mt=8',
		yingyongbao: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.borun.dst.city.driver.app',
		fallback: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.borun.dst.city.driver.app',
		timeout: 2000,
		//http://a.app.qq.com/o/simple.jsp?pkgname=com.borun.dst.city.driver.app
	}
	const callapp = new CallApp(appoption);
	export default {
		name: 'LogisticsInfo',
		data() {
			return {
				orderinfo: {},
				count: '',
				open: true,
				al: '',
				grabinfo: ''

			}
		},
		mounted: function() {

			this.$nextTick(function() {
				var that = this;

				if(that.$route.query.id) {
					let id = that.$route.query.id
					that.id = id
				}
				MP(that.ak).then(BMap => {
					var geolocation = new BMap.Geolocation();
					geolocation.getCurrentPosition(function(r) {
						if(this.getStatus() == BMAP_STATUS_SUCCESS) {
							var mk = new BMap.Marker(r.point);
							axios.post('https://city.56dog.net/api/order/getGrab', {
								"id": that.id,
								"lat": r.point.lat,
								"lng": r.point.lng
							}).then(function(res) {
								that.grabinfo = res.data.data

								that.getOrdeinfo()

							}).catch(function(error) {
								console.log(error);
							});
						} else {
							alert('failed' + this.getStatus());
						}
					}, {
						enableHighAccuracy: true
					})
				})

			})
			this.countt()

		},
		watch: {
			count: {
				handler(newValue, oldValue) {　　　　　　

					if(newValue == 0) {
						this.open = false
						//						this.$destroy()
					}　　　　
				},
			}
		},
		update: {

		},
		methods: {
			countt() {
				const TIME_COUNT = 45;
				if(!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if(this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)

				}

			},
			gopay() {
				//https://city.56dog.net/html/weixin/pay/id/181
				var redirect_urls = "https://city.56dog.net/html/weixin/pay/?id=" + this.id
				redirect_urls = encodeURI(redirect_urls)
				console.log(redirect_urls)
				var urls = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6a12acff41fa983d&redirect_uri=" + redirect_urls + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"

				window.location.href = urls
			},
			close() {
				this.open = false
			},

			gomarket() {

				var uu = navigator.userAgent;

				var isAndroid = uu.indexOf('Android') > -1 || uu.indexOf('Adr') > -1; //android终端

				var isiOS = !!uu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

				if(isAndroid) {
					callapp.open({
						path: '',
						param: {},
						callback: () => {
							alert("请在应用宝内下载")
						}
					});
//										window.location.href = API.downloaddriver
					//window.location.href = "com.borun.dst.city.driver.app://"

				} else if(isiOS) {
					window.location.href = API.iosdriver
				}
			},
			getOrdeinfo() {
				var that = this
				if(that.$route.query.id) {
					let id = that.$route.query.id
					that.id = id
				}

				axios.post('https://city.56dog.net/api/order/getOrder', {
						"id": that.id,
						//						"type": '2'
					})
					.then(function(response) {
						console.log(response)
						if(response.status == 200) {
							that.orderinfo = response.data.data;
							if(that.orderinfo.start_phone) {
								that.orderinfo.start_phone = that.orderinfo.start_phone.substr(0, 3) + '****' + that.orderinfo.start_phone.substr(7);
								for(var a in that.orderinfo.orderaddress) {
									that.orderinfo.orderaddress[a].shipping_phone = that.orderinfo.orderaddress[a].shipping_phone.substr(0, 3) + '****' + that.orderinfo.orderaddress[a].shipping_phone.substr(7)
								}
							}

						}
					})
					.catch(function(error) {
						console.log(error);
					});

				//				setTimeout(function() {

				//				}, 500)
				//				console.log(that.orderinfo.orderdetails.invoice_amount+that.orderinfo.orderdetails.invoice_amount)
			}

		},
		destroyed: function() {
			//			this.count == 0;
		},
	}
</script>

<style>
	.ordertag {
		padding: 5px 5px;
		/*position: absolute;*/
		/*border-radius:0px 5px 5px 0px;*/
		background: #4EB40A;
		color: #fff;
	}
	
	.top {
		width: 100%;
		min-height: 60px;
		position: relative;
		background: #fff;
		border-bottom: 1px solid #AAAAAA;
	}
	
	#center {
		/*overflow: hidden;*/
		width: 80%;
		min-height: 50%;
		margin: 50px auto;
		position: relative;
		border-radius: 10px;
		background: #fff;
	}
	
	.right .right-bottom:last-child .shouhuodizhi div {
		border-bottom: none !important;
	}
	
	.fa {
		font-size: 14px;
		margin-bottom: 10px;
	}
	
	p.shou {
		font-size: 14px;
		margin-bottom: 10px;
	}
	
	.right .right-bottom:last-child .d {
		display: none;
	}
	
	.footbtndiv {
		display: flex;
		padding-top: 20px;
		padding-bottom: 20px;
	}
	
	span.gopaybtn {
		background: #373C64;
		color: #fff;
	}
	
	.footbtndiv div>span {
		padding: 10px 40px;
		border: 1px solid #373C64;
		border-radius: 20px;
		/*background: cornflowerblue;*/
	}
	
	.pul li {
		line-height: 34px;
	}
	
	.footbtndiv div {
		flex: 1;
	}
	
	.footbtn {
		width: 100%;
		/*height: 70px;*/
	}
	
	.huidan {
		min-height: 170px;
		width: 100%;
	}
	
	.paytime {
		padding-top: 5px;
		/*width: 100%;*/
		padding: 0 12px;
		line-height: 30px;
		min-height: 30px;
	}
	
	.price {
		color: red;
	}
	
	li.computprice,
	li.finalprice {
		display: flex;
	}
	
	.il {
		flex: 1;
	}
	
	.spli {
		display: flex;
	}
	
	li.startprice p {
		display: flex;
	}
	
	.spli {
		flex: 9;
		display: flex;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	}
	
	span.spanleft {
		flex: 2;
		color: #333;
	}
	
	span.spanright {
		flex: 2;
	}
	
	.pricetitle .txt {
		color: black;
		vertical-align: middle;
		vertical-align: -20%;
		margin: 0 10px;
	}
	
	.pricetitle .line {
		display: inline-block;
		width: 30%;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	
	.pricetitle {
		height: 25px;
		line-height: 25px;
		font-size: 15px;
		text-align: center;
	}
	
	.pricedetail {
		width: 100%;
		min-height: 110px;
		margin-top: 10px;
	}
	
	.priceinfo {
		/*width: 100%;*/
		padding: 0 12px;
		min-height: 130px;
	}
	
	.text {
		color: #999;
	}
	
	.cartype {
		margin-right: 10px;
	}
	
	li {
		font-size: 13px;
		line-height: 26px;
	}
	
	.cartypeinfo {
		padding: 10px;
		/*width: 98.5%;*/
		min-height: 50px;
	}
	
	.other {
		/*min-height: 100px;*/
		width: 100%;
	}
	
	.shouhuodizhi p.shoucontact {
		/*position: absolute;*/
		bottom: 5px;
		color: #999;
		font-size: 14px;
	}
	
	.shouhuodizhi {
		position: relative;
		text-align: left;
		min-height: 72px;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-box-align: left;
		-ms-flex-align: left;
		align-items: left;
		/*padding: 10px 10px;*/
		padding-top: 15px;
		padding-left: 48px;
		padding-right: 0px;
		padding-bottom: 0px;
		width: auto;
	}
	
	.fahuodizhi p.facontact {
		bottom: 5px;
		color: #999;
		font-size: 14px;
	}
	
	.fahuodizhi {
		position: relative;
		text-align: left;
		min-height: 72px;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-box-align: left;
		-ms-flex-align: left;
		align-items: left;
		/*padding: 10px 10px;*/
		padding-top: 15px;
		padding-left: 48px;
		padding-right: 0px;
		padding-bottom: 0px;
		width: auto;
	}
	
	.pbox {
		/*display: flex;*/
		width: 100%;
		min-height: 190px;
	}
	
	i.icon-fahuodizhi {
		color: #66CC22;
		margin: auto;
		position: absolute;
		top: 29px;
		bottom: 0;
		right: 0;
		left: 7px;
	}
	
	i.icon-shouhuodizhi3 {
		color: #FA4535;
		margin: auto;
		position: absolute;
		top: 50%;
		bottom: 0;
		right: 0;
		left: 7px;
	}
	
	.left>div>i {
		font-size: 24px;
	}
	
	.left>div {
		text-align: center;
		line-height: 92px;
		position: relative;
		height: 50%;
		flex-direction: column;
	}
	
	.right>div {
		position: relative;
		min-height: 50%;
	}
	
	.left {
		padding-left: 12px;
		float: left;
		flex: 1;
		height: 190px;
	}
	
	.right-top,
	.right-bottom {
		/*border-bottom: 1px solid rgba(0, 0, 0, 0.1);*/
	}
	
	.right {
		flex: 9.5;
		min-height: 190px;
	}
	
	li:nth-last-child(1) .spli {
		/*border-bottom: none;*/
	}
</style>