<template>
	<div class="h" id="orderh" >

		<!--<div class="header">
			<i class="iconfont icon-fanhui"></i>

			<span class="header-title">运单详情</span>
		</div>-->
		
		<div class="card" style="">
			
			<img src="../../../static/img/infobanner.png" class="banner"/>
		
		
		</div>

		<div class="single-line"></div>

		<OrderTab :orderinfo="orderinf"></OrderTab>
		<!--<LogisticsInfo v-if="orderinf"></LogisticsInfo>-->
		<BottomInfo :orderinfo ="orderinfo" v-if="orderinf.driver"></BottomInfo>
		<!--<DownLoad v-if="!orderinfo.driver"></DownLoad>-->
<!--v-if="orderinfo.driver"-->
	</div>

</template>

<script>import axios from 'axios'
import OrderTab from '../OrderTab/OrderTab'
import API from '../../js/shipperapi'
import BottomInfo from '../BottomInfo/BottomInfo'
import DownLoad from '../DownLoad/DownLoad'
//import LogisticsInfo from '../LogisticsInfo/LogisticsInfo'

export default {
	name: 'OrderHeader',

	data() {
		return {
			orderinfoo: {},
			orderinf: {},
			lastshou: {}
		}

	},

	mounted() {
		this.getOrderinfo()
	},

	methods: {
		getOrderinfo() {
			let that = this;

			if(that.$route.query.id) {
				let id = that.$route.query.id
				that.id = id
			}
			axios.post(API.getOrder, {
					"id": that.id,
					"type": '1'
				})
				.then(function(response) {
					console.log(response)
					console.log(that)
					if(response.status == 200) {
						that.orderinfo = response.data.data;
						that.orderinf = that.orderinfo
						that.lastshou = that.orderinfo.orderaddress[that.orderinfo.orderaddress.length - 1];

					}
					if(that.orderinfo.driver !== null) {
						that.pb = true
					}
				})
				.catch(function(error) {
					console.log(error);
				});

		},
	},
	components: {
		OrderTab,
//		LogisticsInfo,
		DownLoad,
		BottomInfo
	}
}</script>

<style scoped>.card {
	width: 100%;
	color: #fff;
	height: 216px;
	/*margin: 16px auto;*/
	/*margin-top: 16px;*/
	/*margin-bottom: 5px;*/
	/*border-radius: 5px;*/
}

.banner {
	width: 100%;
	height: 100%;
}

.orderstatus {
	color: #FEE600;
	position: absolute;
	font-size: 14px;
	top: -10px;
}

.cityarrow i {
	font-size: 20px;
}

p.locationdetail {
	font-size: 13px;
	color: #fff;
}

.startcity p,
.endcity p {
	width: 100%;
	/*font-size: 18px;*/
	/*display: flex;*/
	line-height: 22px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	/*word-break:break-all;*/
}

.ordersite {
	height: 92px;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-content: space-between;
}

.startcity,
.cityarrow,
.endcity {
	vertical-align: middle;
	width: 33.333%;
	height: 92px;
	line-height: 92px;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	display: flex;
	align-items: center;
}

.h {
	width: 100%;
	position: relative;
}

.header {
	width: 100%;
	height: 48px;
	line-height: 48px;
	background: #373C64;
	padding-left: 12px;
	padding-right: 12px;
	color: #FAAF19;
	font-size: 16px;
	text-align: left;
}

.header i {
	font-size: 20px;
}

.shuxian {
	color: #FAAF19;
	font-size: 20px;
}

.orderinfo {
	display: flex;
	justify-content: space-between;
	min-height: 34px;
	line-height: 34px;
	width: 100%;
}

.orderinfo span {
	font-size: 14px;
}

.startlocation {
	font-size: 16px;
}</style>
