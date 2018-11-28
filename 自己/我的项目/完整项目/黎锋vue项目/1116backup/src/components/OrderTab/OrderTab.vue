<template>
	<div>
		
<div class="bg">
	<div class="t">
		
		<div class="hbox" style="border-bottom: 1px solid rgba(0,0,0,0.2);box-shadow: 0px 3px 10px -2px #aaa;">
			<div class="tab">
				<router-link :to="{ path: '/LogisticsInfo', query: { id: id}}" class="tab-item">
					<span class="tab-link">运单信息</span>
				</router-link>
				<router-link :to="{ path: '/LogisticsState', query: { id: id}}" class="tab-item">
					<span class="tab-link">物流状态</span>
				</router-link>
				<router-link :to="{ path: '/MapMode', query: { id: id}}" class="tab-item">
					<span class="tab-link">地图模式</span>
				</router-link>
			</div>
			<div class="orderinfo">
				<span class="ordernumber" style="color: #333 !important;">运单号：{{orderinfo.order_sn}}</span>
				<span class="time">{{orderinfo.create_time|moment}}</span>
			</div>
		</div>

		

		
	</div>
</div>
	
	<transition>
			<!-- exclude指定不用缓存的组件 routerview class="{paddB100:orderinf.driver}" :class="{'paddB100':pb}"-->
			<keep-alive >
				<router-view class="{paddB100:orderinf.driver}" :class="{'paddB100':pb}"></router-view>
			</keep-alive>
		</transition>
	</div>
	
</template>

<script>
import axios from 'axios'

	import API from '../../js/shipperapi'
	
	export default {
		name: 'OrderTab',
		components:{

			
		},
		data() {
			return {
				info: {},
				pb:false,
				id:''
			}
		},
		props: {
			orderinfo: Object
		},
		mounted() {
			this.setOrderinfo()
		},
		methods: {
			setOrderinfo() {
				var that = this
				if(that.$route.query.id){
					let id = that.$route.query.id
				console.log(id)
					that.id = id
				}
//				axios.post(API.getOrder, {
//						"id": that.id,
//						"type": '1'
//					})
//					.then(function(response) {
//						console.log(response)
//						console.log(that)
//						if(response.status == 200) {
//							that.orderinfo = response.data.data;

//							that.lastshou = that.orderinfo.orderaddress[that.orderinfo.orderaddress.length-1];


//						}
						if(that.orderinfo.driver!== null){
					that.pb = true
				}
//					})
//					.catch(function(error) {
//						console.log(error);
//					});
				
				
//				else{
//					that.id = '55'
//				}
			
				
			}
		}
	}
</script>

<style scoped="scoped">
	.bg{
		background: rgba(255,255,255,0.5);
		background-attachment: fixed;
		background-size:cover ;
border-radius: 3px;
		z-index: 10;
		width: 96%;
		height: 88px;
		/*background: inherit;*/
		position: absolute;
		top: 162px;
		left: 2%;
		/*filter: blur(1px);*/
	}

.t{
	/*transform: translate(-50%,-50%);*/
    width:100%;
    height: 100%;
    text-align: center;
	background: inherit;
    position: absolute;
    left:0;
    top:0;
    z-index: 11;
}
.bg:after{
    content: "";
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: blur(9px);/*为了模糊更明显，调高模糊度*/
    z-index: 2;
}




		.orderinfo {
		display: flex;
		justify-content: space-between;
		min-height: 34px;
		line-height: 34px;

		padding: 0 12px;
	}
	.orderinfo span{
		font-size: 14px;
	}
	.hbox{
		padding: 0;
	}
	.paddB100{
		padding-bottom: 15%;
	}
	.tab {
		display: flex;
		height:54px;
		line-height: 54px;
		font-size: 14px;

	}
	
	.tab-item {
		flex: 1;
		text-align: center;
	}
	
	.tab-link {
		font-size: 17px;
		/*padding-bottom: 5px;*/
		color: #666;
	}
	
	.router-link-active {
		border-bottom: 3px solid #373C64;
	}
	
	.router-link-active .tab-link {
		color: #373C64;
	}
</style>