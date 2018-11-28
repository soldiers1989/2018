<template>
	<div style="position: relative;">
		<!--<div class="footnotice">
			<span>
				司机接单后15分钟内取消运单免费,超过15分钟取消订单扣除10%运费
			</span>
		</div>-->
		<div class="hbox" style="padding-top: 20px;">
			<ul>
				<li v-for="item in OrderLog">
					<!--<p class="logis-detail-date">03-10</p>-->
					<div class="logis-detail-d logis-detail-first">
						<div class="logis-detail-content">
							<p class="logis-detail-content-detail">{{item.msg}}</p>
							<p class="logis-detail-content-time">{{item.create_time| moment}}</p>
							
						</div>
					</div>

				</li>
			</ul>
		</div>
		
	</div>

</template>

<script>
	import axios from 'axios'
	import API from '../../js/shipperapi'
	export default {
		name: 'LogisticsState',
		data() {
			return {
				OrderLog: {}
			}
		},
		mounted() {
			this.getOrderLog()
		},
		methods: {
			getOrderLog() {
				var that = this
				if(that.$route.query.id){
					let id = that.$route.query.id
				console.log(id)
					that.id = id
				}
//				else{
//					that.id = '55'
//				}
				axios.post(API.getOrderLog, {
					"id": that.id
				}).then(function(response) {

					if(response.status == 200) {
						that.OrderLog = response.data.data
						console.log(that.OrderLog)
					}
				}).catch(function(error) {
					console.log(error)
				})
			}
		}
	}
</script>

<style>
	ul li:first-child p.logis-detail-date {
		color: #F40;
	}
	
	ul .logis-detail-date {
		width: 40px;
		padding: 10px 0 10px 4px;
		text-align: right;
		font-size: 14px;
	}
	
	ul li:first-child .logis-detail-first .logis-detail-content {
		border-bottom: 1px solid rgba(0,0,0,0.2);
		/*background: #F40;*/
		color: #66CC22;
	}
	
	ul .logis-detail-d {
		border-left: 2px solid #bdbdbd;
		padding: 10px 0 10px 35px;
		margin-left: 25px;
		position: relative;
	}
	
	ul .logis-detail-content {
		/*display: -webkit-box;*/
		position: relative;
		/*background: #ddd;*/
		padding: 5px 10px;
		-webkit-border-radius: 2px;
		font-size: 14px;
	}
	
	ul .logis-detail-d:after {
		content: '';
		display: inline-block;
		position: absolute;
		left: -6px;
		top: 30px;
		width: 6px;
		height: 6px;
		-webkit-border-radius: 10px;
		background: #BDBDBD;
		border: 2px solid #EEE;
	}
	
	ul .logis-detail-content .logis-detail-content-time {
		width: 50px;
		line-height: 25px;
	}
	
	ul .logis-detail-content .logis-detail-content-detail {
		-webkit-box-flex: 1;
		line-height: 25px;
	}
	
	ul .logis-detail-content {
		/*display: -webkit-box;*/
		border-bottom: 1px solid rgba(0,0,0,0.2);
		position: relative;
		/*background: #ddd;*/
		padding: 5px 10px;
		-webkit-border-radius: 2px;
		font-size: 14px;
	}
	
	.logis-detail-content-detail {
		-webkit-box-flex: 1;
		line-height: 25px;
	}
	
	/*ul li:first-child .logis-detail-first .logis-detail-content:after {
		border-bottom-color: #F40;
	}
	*/
	/*ul .logis-detail-content:after {
		content: '';
		display: inline-block;
		position: absolute;
		left: -10px;
		top: 18px;
		border-left: 10px solid #fff;
		border-bottom: 10px solid #ddd;
	}*/
	
	ul .logis-detail-d:after {
		    content: '';
    display: inline-block;
    position: absolute;
    left: -10px;
    top: 30px;
    width: 15px;
    height: 15px;
    -webkit-border-radius: 10px;
    background: #BDBDBD;
    border: 2px solid #EEE;
	}
	
	ul li:first-child .logis-detail-first:after {
		background: #66CC22;
		border: 2px solid #D2FFB5;
	}
	
	ul .logis-detail-content .logis-detail-content-time {
		width: 100%;
		line-height: 25px;
	}
	
	ul li:first-child .logis-detail-first {
		border-left: 1px solid #999;
	}
	
	ul .logis-detail-d {
		border-left: 1px solid #bdbdbd;
		padding: 10px 0 10px 35px;
		margin-left: 25px;
		position: relative;
	}
	
	li {
		color: #666;
		position: relative;
	}
	
	.footnotice {
		position: fixed;
		background: #FFEFCF;
		bottom: 100;
		width: 100%;
		height: 20px;
		line-height: 20px;
	}
	
	.footnotice span {
		color: red;
		font-size: 10px;
	}
</style>