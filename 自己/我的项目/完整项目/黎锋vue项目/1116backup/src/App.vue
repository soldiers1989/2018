<template>
	<div id="app">
		<Getorder></Getorder>
		
		<!--<div class="hbao" style="position: absolute;height:35px;top: 50%;right：0%;bottom: 0%;right: 1%;z-index: 999999;" @click="go">

			<img src="../static/img/hongbao.png" style="width: 60%;" />

		</div>-->
		<OrderHeader></OrderHeader>

		<!--<OrderTab></OrderTab>-->
		
		<!--<LogisticsInfo></LogisticsInfo>-->
		<!--<dialog :show.sync="show">
			<p>这是一个对话框点击遮盖层或者按 ESC 键可以关闭</p>
		</dialog>-->
	</div>
</template>

<script>
	import Getorder from '@/components/Getorder/Getorder'
	
	import OrderHeader from '@/components/OrderHeader/OrderHeader'
	
//	import LogisticsInfo from '@/components/LogisticsInfo/LogisticsInfo'
	import $ from "jquery"

	

//	import DiaLog from '@/components/DiaLog/DiaLog'
	//	import PopupManager from './js/popup-manager'
	//export {default as overlay} from 'components/Overlay/overlay'
	//export {getZIndex} from './js/utils'
	//import OrderTab from '@/components/OrderTab/OrderTab'

	export default {
		name: 'App',

		components: {
			OrderHeader,
			Getorder,

		},
		methods:{
			go(){

		window.location.href = "https://city.56dog.net/web/register/html/index.html?type=2"

			}
		}

	}
	
	

</script>
<!--<style lang="less">
	@import '~vux/src/styles/1px.less';
</style>-->
<style>
	#app {
		word-wrap: break-word;
		display: flex;
		overflow-x: hidden;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		/*margin-top: 60px;*/
	}
	
	.hbox {
		padding-left: 12px;
		padding-right: 12px;
	}
	
	.pbox {
		padding: 12px 0px;
	}
	
	.single-line {
		margin: 0 auto;
		height: 1px;
		width: 100%;
		background: rgba(0, 0, 0, 0.2);
		overflow: hidden;
		transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5);
	}
	
	.kongdiv {
		width: 100%;
		height: 8px;
		background: #eee;
	}
</style>