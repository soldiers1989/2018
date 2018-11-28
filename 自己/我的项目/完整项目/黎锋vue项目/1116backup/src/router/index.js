import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'

Vue.use(Router)
//const OrderHeader = (resolve)=>{
//	import('../components/OrderHeader/OrderHeader').then((module)=>{
//		resolve(module)
//	})
//}
//const LogisticsInfo = (resolve)=>{
//	import('../components/LogisticsInfo/LogisticsInfo').then((module)=>{
//		resolve(module)
//	})
//}
//const LogisticsState = (resolve)=>{
//	import('../components/LogisticsState/LogisticsState').then((module)=>{
//		resolve(module)
//	})
//}
//const MapMode = (resolve)=>{
//	import('../components/MapMode/MapMode').then((module)=>{
//		resolve(module)
//
//	})
//}
import OrderHeader from '../components/OrderHeader/OrderHeader'
import LogisticsInfo from '../components/LogisticsInfo/LogisticsInfo'
import LogisticsState from '../components/LogisticsState/LogisticsState'
import MapMode from '../components/MapMode/MapMode'

export default new Router({
//	mode:'history',
//	base:'/drivertest',
	routes: [{
			path: '/',
			redirect: '/LogisticsInfo',
			component: LogisticsInfo,
		},
		{
					name: 'LogisticsInfo',
					path: '/LogisticsInfo',
					component: LogisticsInfo
				},
				{
					name: 'LogisticsState',
					path: '/LogisticsState',
					component: LogisticsState
				},
				{
					name: 'MapMode',
					path: '/MapMode',
					component: MapMode
				}

	]
})