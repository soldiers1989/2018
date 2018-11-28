<template>
	<div class="bottomdiv">
		<div class="hbox">
			<div class="info">
				<div class="headimg">
					<div class="imgdiv">
						<img class="img" :src="orderinfo.driver.avator" v-if="orderinfo.driver.avator" />
						<!--<img :src="orderinfo.driver.card_img" v-else-if="orderinfo.driver.card_img"/>-->
						<img src="../../../static/img/touxiang.png" class="img" v-else/>
					</div>
				</div>
				<div class="rate">
					<StarRating :orderinformation="orderinformation"></StarRating>
					<p class="tl" style="position: relative;">
						<p style="text-align: left;
    margin-block-start: 0;
    margin-block-end: 0;
    margin: 0;
    padding: 0;
    height: 15px;">
							<span style="color: #666;font-size: 12px;" v-if="orderinformation.driver.car_type==1">小型面包车</span>
							<span style="color: #666;font-size: 12px;" v-else-if="orderinformation.driver.car_type==2">中面包车/金杯</span>
							<span style="color: #666;font-size: 12px;" v-else-if="orderinformation.driver.car_type==3">平板车/超大面包车</span>
							<span style="color: #666;font-size: 12px;" v-else-if="orderinformation.driver.car_type==4">大面包车/依维柯</span>
							<span style="color: #666;font-size: 12px;" v-else="orderinformation.driver.car_type==4">中型货车</span>
						</p>
						<span style="text-align: left;display:block;margin-block-start: 0;margin-block-end: 0;margin: 0;padding: 0;height: 15px;">
							<span style="color: #666;font-size: 12px;">{{orderinformation.driver.number_plates}}</span>
							<!--<span style="position: absolute;width:100px;margin-left: 3%;color: #666;font-size: 10px;top: 14%;right: 26%;" v-if="drivermsg">{{drivermsg}}</span>-->
							<!--<span style="position: absolute;width:100px;margin-left: 3%;color: red;font-size: 10px;top: 14%;right: 26%;border: 1px solid red;border-radius: 3px;padding: 2px;text-align: center;height: 15px;line-height: 15px;"  v-on:click="calltel">又接一单奖</span>-->
							<a class="iosDriver" href="https://itunes.apple.com/us/app/id1281443566?l=zh&ls=1&mt=8" style="width: 70%;margin-left:5px;text-decoration: none;font-size: 13px;color: rgba(32,149,42,0.8);">点击加盟城市货的,接单多,无押金></a>

							<a class="anDriver" href="https://imtt.dd.qq.com/16891/A48F5BEDF9B90217ACD103E479DFFF6E.apk?fsname=com.borun.dst.city.driver.app_2.85_10.apk&csr=1bbd" style="width: 70%;margin-left:5px;text-decoration: none;font-size: 13px;color: rgba(32,149,42,0.8);">点击加盟城市货的,接单多,无押金></a>
						</span>

					</p>
					<!--<p class="tl">
						<span style="color: #666;font-size: 12px;" v-if="orderinformation.driver.car_type==1">小型面包车</span>
						<span style="color: #666;font-size: 12px;" v-else-if="orderinformation.driver.car_type==2">中面包车/金杯</span>
						<span style="color: #666;font-size: 12px;" v-else-if="orderinformation.driver.car_type==3">平板车/超大面包车</span>
						<span style="color: #666;font-size: 12px;" v-else-if="orderinformation.driver.car_type==4">大面包车/依维柯</span>
						<span style="color: #666;font-size: 12px;" v-else="orderinformation.driver.car_type==4">中型货车</span>
					</p>-->
					<!--<i v-on:click="calltel" style="font-size: 40px;" class="iconfont icon-dianhua"></i>-->
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import StarRating from '../StarRating/StarRating'
	import $ from 'jquery'
	import axios from 'axios'
	import API from '../../js/shipperapi'
	export default {
		components: {
			StarRating
		},
		data() {
			return {
				img: {
					src: ''
				},
				isan: 0,
				isios: 0,

				//				defaultImg:"../../../assets/img/touxiang.png",
				orderinformation: {},
				drivermsg: '',
				id: ""
			}
		},
		props: {
			orderinfo: Object
		},
		mounted() {
			this.s()
		},
		created: function() {
			var that = this;

			if(that.$route.query.id) {
				let id = that.$route.query.id

				that.id = id
			}
			that.orderinformation = that.orderinfo;
			console.log(that.orderinformation);
			axios.post(API.getaddress, {
					"id": that.id,

				})
				.then(function(res) {
					if(res.data.data.driver.msg) {

						that.drivermsg = res.data.data.driver.msg

					}

				})

		},

		methods: {
			//			getdriverinfo() {
			//				let that = this
			//					that.orderinformation = that.orderinfo
			//					console.log(that.orderinformation.driver)
			//			}
			calltel() {
				var that = this
				console.log(that.orderinformation.driver.mobile)
				window.location.href = 'tel://' + this.orderinformation.driver.mobile;
			},
			s() {
				var uu = navigator.userAgent;

				var isAndroid = uu.indexOf('Android') > -1 || uu.indexOf('Adr') > -1; //android终端

				var isiOS = !!uu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				
								if(isAndroid) {
				$(".iosDriver").css("display", "none")
								} else if(isiOS) {
								$(".anDriver").css("display","none")
								}else if(!isAndroid&&!isiOS){
									$(".iosDriver").css("display","none")
									$(".anDriver").css("display","none")
								}
			},

		}
	}
</script>
<style>
	.icon-dianhua {
		color: #66CC22;
		font-size: 30px;
		position: absolute;
		right: 5px;
		top: 15px;
	}
	
	.imgdiv {
		/* position: absolute; */
		width: 57px;
		height: 57px;
		overflow: hidden;
		/* border: 1px solid #999; */
		border-radius: 50%;
		/* margin: auto; */
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	}
	
	.img {
		width: 100%;
		height: 100%;
	}
	
	.headimg {
		position: relative;
		height: 100%;
		/*border-right: 1px solid #999;*/
		flex: 1;
		/*width: 10%;*/
		/*padding-right: 10px;*/
	}
	
	.rate {
		position: relative;
		-webkit-box-flex: 6;
		-ms-flex: 6;
		flex: 12;
		padding-left: 9px;
		/* width: 90%; */
		border-left: 1px solid #D4D8E0;
		margin-left: 12px;
	}
	
	.info {
		width: 100%;
		padding: 9px 0px;
		min-height: 56px;
		display: flex;
	}
	
	.bottomdiv {
		position: fixed;
		box-shadow: 0px 5px 10px 5px #aaa;
		bottom: 0;
		left: 0;
		background: #fff;
		z-index: 999;
		min-height: 74px;
		width: 100%;
	}
</style>