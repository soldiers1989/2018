const shipper = 'https://city.56dog.net/api';
//const shipper = '/shipper';
const baseurl = 'https://city.56dog.net/';
const API = {

	//订单详情
	getOrder:shipper+'/order/getOrder?coupon=1',
	//订单物流
	getOrderLog:shipper+'/order/getOrderLog',

	
	//订单地图
	getaddress:shipper+'/order/getaddress',
	//订单司机
	getDriver:shipper+'/my/driver',
	iosdriver:"https://itunes.apple.com/us/app/id1281443566?l=zh&ls=1&mt=8",
	downloaddriver:"https://imtt.dd.qq.com/16891/A48F5BEDF9B90217ACD103E479DFFF6E.apk?fsname=com.borun.dst.city.driver.app_2.85_10.apk&csr=1bbd"
};
export default API
