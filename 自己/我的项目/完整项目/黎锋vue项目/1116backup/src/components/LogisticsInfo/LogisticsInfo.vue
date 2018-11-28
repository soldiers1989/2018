<template>
	
	<div name="slide" >

		<div style="position: relative;">
			
			<div class="pbox" style="padding-bottom: 0px;padding-top: 35px;">
				<!--<div class="left">
				<div class="left-top">
					<i class="iconfont icon-fahuodizhi"></i>
				</div>
				<div class="left-bottom">
					<i class="iconfont icon-shouhuodizhi3"></i>
				</div>
			</div>-->
				<div class="right" v-if="orderinfo.start_add">
					<div class="right-top">

						<div class="fahuodizhi">

							<div style="min-height: 60px;width: 100%;border-bottom: 1px solid rgba(0,0,0,0.2);">
								<p class="fa" style="font-size: 14px;color: #333;margin-bottom: 6px;">{{orderinfo.start_add}}</p>
								<p class="fa" style="font-size: 12px;color: #666;">{{orderinfo.start_address}}</p>
								<p class="facontact" style="margin-top: 10px;margin-bottom: 10px;color: #FAAF19;">
									<span class="faname">{{orderinfo.start_name}}</span>
									<span class="faphone">{{orderinfo.start_phone}}</span>
								</p>
							</div>
							<img src="../../../static/img/fahuo.png" style="position: absolute;left: 12px;top: 23px;" />
							<img src="../../../static/img/jiantou.png" style="position: absolute;left: 13px;top: 51px;" />
							<!--<img src="../../../static/img/didian.png" style="position: absolute;right: 18px;bottom: 11px;"/>-->
						</div>
					</div>

					<div class="right-bottom" v-for="item in orderinfo.orderaddress">
						<div class="shouhuodizhi">
							<!--<i class="iconfont icon-shouhuodizhi3"></i>-->
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

			</div>
			<div class="kongdiv"></div>
			<div class="other">
				<div class="cartypeinfo">
					<div class="hbox">
						<ul>
							<li class="goodstime" style="display: flex;"><span class="text" style="flex: 1;">发货时间：</span><span style="flex: 1;text-align: right;" class="timedetail">{{orderinfo.time|moment}}</span></li>
							<li class="cartypeset" style="display: flex;"><span class="text" style="flex: 1;">所选车型：</span><span class="cartype" style="flex: 1;text-align: right;">{{orderinfo.car_name
}}</span><span class="carlong">{{orderinfo.format}}</span></li>
							<li class="note" style="display: flex;" v-if='orderinfo.remark'><span style="flex: 1;" class="text">备注：</span><span class="notedetail" style="flex: 1;text-align: right;">{{orderinfo.remark}}</span></li>
						</ul>
					</div>

				</div>
			</div>
			<div class="kongdiv"></div>
			<div class="other" v-if="orderinfo.pay==1">
				<div class="cartypeinfo">
					<div class="hbox">
						<ul>
							<li class="goodstime" style="display: flex;"><span class="text" style="flex: 1;">付款方式：</span><span style="flex: 1;text-align: right;" class="timedetail">客户付款</span></li>
							<li class="cartypeset" style="display: flex;"><span class="text" style="flex: 1;">是否支付：</span><span v-if="orderinfo.pay_status==1">已支付</span><span v-if="orderinfo.pay_status==0">未支付</span></li>
						
						</ul>
					</div>

				</div>
			</div>
			<div class="kongdiv"></div>
		
			<div class="priceinfo">
				<div class="hbox">
					<div class="pricetitle">
						<span class="line"></span>
						<span class="txt">运单费用明细</span>
						<span class="line"></span>
					</div>
					<div class="pricedetail">
						<!--<div class="yunfeidiv" style="height: 36px;font-size:14px;line-height: 36px;width: 100%;border-bottom: 1px solid #ddd;">
							<span style="float: left;">实付总金额</span>
							<span style="float: right;color: #FA4535;">
								<span style="color: #AAAAAA;margin-right: 10px;" v-if="orderinfo.coupon_amount">
								(优惠券已抵扣{{orderinfo.coupon_amount}}元)
								</span>
							{{orderinfo.pay_amount}}元
							</span>
							<div class="" style="clear: both;"></div>
						</div>-->
						<div class="yunfeidiv" style="height: 36px;font-size:14px;line-height: 36px;width: 100%;border-bottom: 1px solid #ddd;">
							<span style="float: left;">运输费</span>
							<span style="float: right;color: #FA4535;">{{orderinfo.amount}}元</span>
							<div class="" style="clear: both;"></div>
						</div>
						
						<ul class="pul">
							<li class="startprice">
								<p>
									<i class="iconfont il tl icon-qibujia"></i>
									<span class="spli">
								<span class="spanleft">起步价<span class="text">({{orderinfo.start_num}}公里起步价)：</span></span>
									<span class="spanright tr"><i class="iconfont icon-fl-renminbi"></i>{{orderinfo.start_price}}元</span>
									</span>
								</p>
							</li>
							<li class="computprice"> 
								<i class="iconfont il icon-lichengbiao"></i>
								<span class="spli">

								<span class="distance spanleft">预估里程：</span>
								<span class="spanright tr">{{orderinfo.mileage}}公里</span>

								</span>
							</li>
							<li class="danjia" style="display: flex;">
								<i class="iconfont icon-kedanjia il"></i>
								<span class="spli">
								<span class="spanleft">
									单价：
								</span>
								<span class="spanright tr">
									{{orderinfo.price}}元/公里
								</span>
								</span>
							</li>
						</ul>
						
						<div class="yunfeidiv" v-if="orderinfo.orderdetails" style="height: 36px;font-size:14px;line-height: 36px;width: 100%;border-bottom: 1px solid #ddd;">
							<span style="float: left;">服务费</span>
							<span style="float: right;color: #FA4535;" class="fuwufei">{{orderinfo.excess_amount}}元</span>
							<div class="" style="clear: both;"></div>
						</div>
						<ul class="pul">
							<li class="banyun" style="display: flex;" v-if="orderinfo.orderdetails">
								<i class="iconfont icon-ln- il"></i>
								<span class="spli">
								<span class="spanleft">
									<!--搬运
									<span v-if="orderinfo.orderdetails.hand_type=='0'">:</span>-->

								<!--<span v-if="orderinfo.orderdetails.hand_type=='0'">:</span>-->
								<span v-if="orderinfo.orderdetails.hand_type=='1'">只装卸货,不上楼(1人力)</span>
								<span v-if="orderinfo.orderdetails.hand_type=='2'">(不上楼/2人力)：</span>
								<span v-if="orderinfo.orderdetails.hand_type=='3'">(不上楼/一口价)：</span>
								<span v-if="orderinfo.orderdetails.hand_type=='4'">(上下楼/1人力)：</span>
								<span v-if="orderinfo.orderdetails.hand_type=='5'">(上下楼/2人力)：</span>
								<span v-if="orderinfo.orderdetails.hand_type=='6'">(上下楼/3人力)：</span>
								<span v-if="orderinfo.orderdetails.hand_type=='7'">(上下楼/整车一口价)：</span>
								<span class="spanright tr" v-if="orderinfo.orderdetails.hand_type=='0'">
									无需搬运
								</span>
								</span>
								<span class="spanright tr" v-if="orderinfo.orderdetails.hand_type!=='0'">
									<span class="banyunfei">{{orderinfo.orderdetails.hand_amount}}</span>元

								
								</span>
								
								</span>
							</li>
							<li class="fancheng" style="display: flex;" v-if="orderinfo.orderdetails">
								<i class="iconfont icon-fancheng il"></i>
								<span class="spli">
								<span class="spanleft">
									返程(运价40%)：
								</span>
								<span class="spanright tr fanchengfei">
									{{orderinfo.orderdetails.return_amount}}元
								</span>
								</span>
							</li>
							<li class="huid" style="display: flex;" v-if="orderinfo.orderdetails">
								<i class="iconfont icon-navicon-dhthd il"></i>
								<span class="spli">
								<span class="spanleft">
									纸质回单(快递费)：
								</span>
								<span class="spanright tr huidanfei">
									{{orderinfo.orderdetails.invoice_amount}}元
								</span>
								</span>
							</li>
							<li class="fancheng" style="display: flex;" v-if="orderinfo.orderdetails">

								<span class="spli">
								<span class="spanleft">
									加急打赏/小件搬运/超重打赏
								</span>
								<span class="spanright tr fanchengfei">
									{{orderinfo.orderdetails.compensation}}元
								</span>
								</span>
							</li>
						</ul>
						<ul class="pul">
							<li class="yunfei" style="display: flex;" v-if="orderinfo.orderdetails">
								<!--<i class="iconfont icon-yunfei il"></i>-->
								<span class="spli">
								<span class="spanleft">
									是否跟车：
								</span>
									<span class="spanright tr" style="float: right;color: #FA4535;" v-if="orderinfo.orderdetails.is_car=='0'">否</span>
							<span class="spanright tr" style="float: right;color: #FA4535;" v-if="orderinfo.orderdetails.is_car=='1'">是</span>
							
								</span>
							</li>
							
						
							
							<li class="fshi" style="display: flex;" v-if="orderinfo.pay_status=='1'">
								<i class="iconfont icon-zhifufangshi il"></i>
								<span class="spli" style="border-bottom: none;">
								<span class="spanleft">
									支付方式：
								</span>
								<span class="spanright tr">
									<span v-if="orderinfo.pay_type == 1">支付宝</span>
								<span v-else>微信</span>
								</span>
								</span>
							</li>
							

							<!--<li class="finalprice">
							<span class="yunfei">运费金额：<i class="iconfont icon-fl-renminbi" style="color: red;"></i><span class="price">{{orderinfo.order_amount}}</span></span>
							<span class="paychoice"><span class="paytype">支付宝支付：</span><i class="iconfont icon-fl-renminbi" style="color: red;"></i><span class="price">30.00</span></span>
						</li>-->
						</ul>
					</div>
				</div>
			</div>
			<div class="kongdiv"></div>
			<div class="paytime">
				<div class="hbox">
					<ul>
						<li class="xiadan" style="display: flex;"><span style="flex: 1;">下单时间：</span><span class="xiadanshijian" style="flex: 1;text-align: right;">{{orderinfo.time|moment}}</span></li>
						<!--<li class="zhifu">
							支付时间：<span class="zhifushijian" v-if="orderinfo.pay_time">{{orderinfo.pay_time|moment}}</span><span class="zhifushijian" v-else>暂无支付时间</span>

						</li>-->
					</ul>
				</div>
			</div>
			<div class="kongdiv"></div>
			<div class="huidan" v-if="orderinfo.shipped_img">
				<div class="hbox">
					<div class="pricetitle">
						<span class="line"></span>
						<span class="txt">装货照片</span>
						<span class="line"></span>
					</div>
					<div style="padding: 20px 30px">
						<div class="backimg" style="position: relative;">
							<img class="preview-img" preview="0" :src="orderinfo.shipped_img" v-if="orderinfo.shipped_img" />
							<div style="font-size: 20px;color: #999999;width: 100%;height: 100%;text-align: center;line-height: 140px;" v-if="!orderinfo.shipped_img">暂无图片</div>
						</div>
					</div>

				</div>
			</div>
			<div class="huidan" v-if="orderinfo.img">
				<div class="hbox">
					<div class="pricetitle">
						<span class="line"></span>
						<span class="txt">回单照片</span>
						<span class="line"></span>
					</div>
					<div style="padding: 20px 30px">
						<div class="backimg" style="position: relative;">
							<img class="preview-img" preview="1" :src="orderinfo.img" v-if="orderinfo.img" />
							<div style="font-size: 20px;color: #999999;width: 100%;height: 100%;text-align: center;line-height: 140px;" v-if="!orderinfo.img">暂无回单</div>
						</div>
					</div>

				</div>
			</div>
			
			<div class="kongdiv"></div>

				

		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import $ from 'jquery'
	import API from '../../js/shipperapi'

	export default {
		name: 'LogisticsInfo',
		props: {
			//			orderinf: Object,
		},
		data() {
			return {
				orderinfo: {},
				al: ''

			}
		},

		mounted: function() {
			this.$nextTick(function() {
				this.getOrdeinfo()
			})
		},

		methods: {
getQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;

			},
			getOrdeinfo() {
				var that = this
				if(that.$route.query.id) {
					let id = that.$route.query.id
					that.id = id
					window.localStorage.setItem("orderid", that.id)
				}
					var codee = this.getQueryString('code');

				axios.post('https://city.56dog.net/api/order/getOrder?coupon=2', {
						"id": that.id,
						"type": '2'
					})
					.then(function(response) {
//						console.log(response)
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

				setTimeout(function() {

					console.log(that.orderinfo);
					var all = ''
					if(that.orderinfo.orderdetails) {
						var invoice_amount = parseFloat(that.orderinfo.orderdetails.invoice_amount)
						var return_money = parseFloat(that.orderinfo.orderdetails.return_amount)

						console.log(typeof(that.orderinfo.orderdetails.hand_amount))
						var hand_amount = parseFloat(that.orderinfo.orderdetails.hand_amount)

						all += invoice_amount + return_money + hand_amount
//						console.log(typeof(hand_amount))
						//								this.all = all
//						console.log(all)
						that.al = all
//						$("span.fuwufei").text(all + "元");
					}
				}, 800)
				//				setTimeout(function() {

				//				}, 500)
				//				console.log(that.orderinfo.orderdetails.invoice_amount+that.orderinfo.orderdetails.invoice_amount)
			}

		},

	}
</script>

<style scoped="scoped">
	/*.slide-enter-active,.slide-leave-active{
		transition: left 2s;
	}
	.slide-enter,.slide-leave-to{
		transform: translate3d(100%, 0, 0)
	}*/
	
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
	
	.backimg img {
		display: block;
		height: 100%;
		width: 100%;
	}
	
	.backimg {
		padding: 10px 10px;
		width: 100%;
		/*height: 140px;*/
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
		flex: 10;
		display: flex;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	}
	
	span.spanleft {
		flex: 5;
		color: #333;
	}
	
	span.spanright {
		flex: 3;
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