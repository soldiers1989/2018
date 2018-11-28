// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import axios from 'axios'
import commonMthods from './js/common'
import router from './router'
import API from './js/shipperapi'
import preview from 'vue-photo-preview'
import moment from 'moment/moment'
import 'vue-photo-preview/dist/skin.css'
import $ from 'jquery'
import createStore from './store/store'
Vue.use(Vuex)

Vue.use(preview)

Vue.prototype.$axios = axios
Vue.prototype.API = API;
const store = createStore()
//import Vuex from 'vuex'

//import fastclick from 'fastclick'
//import VueLazyload from 'vue-lazyload'

//引入字体图标
import '../static/iconfont/iconfont.css'

//引入公共css
import '../static/css/common.css'


Vue.filter('moment', function (value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
//     return moment(value).format(formatString); // value可以是普通日期 20170723
    return moment.unix(value).format(formatString); // 这是时间戳转时间
});


new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})

