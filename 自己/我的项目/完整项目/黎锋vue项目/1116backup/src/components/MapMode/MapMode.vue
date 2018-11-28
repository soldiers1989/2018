<template>
	<div style="position: relative;">
		<div class="baidumap" id="allmap" style="width: 100%;height:500px;"></div>
		<!--<div class="localcar" style="position: absolute;width: 30px;height: 30px;border-radius: 50%;top: 60%;right: 10px;">
			<img src="../../../static/img/caricon.svg" style="width: 30px;height: 30px;" />
		</div>-->
		<!--<div class="getroute" style="position: absolute;width: 30px;height: 30px;border-radius: 50%;top: 70%;right: 10px;">
			<img src="../../../static/img/route.svg" style="width: 30px;height: 30px;"/>
		</div>-->
	</div>

</template>

<script>
	import $ from "jquery"
	import { MP } from '../../js/map'
	import axios from 'axios'
	import API from '../../js/shipperapi'
	//	import BMap from 'BMap'
	//	import BMapSymbolSHAPEPOINT from 'BMap_Symbol_SHAPE_POINT'
	export default {
		data() {
			return {
				id: '',
				pointArr: [],
				dataa: ''
			}
		},
		mounted() {
			this.$nextTick(function() {

				var that = this;
				MP(that.ak).then(BMap => {

					var chartData = [];
					let polylinePoints = [];
					if(that.$route.query.id) {
						let id = that.$route.query.id

						that.id = id
					}
					
					var map = new BMap.Map("allmap", {
						minZoom: 13,
						maxZoom: 18
					});

					
					var geolocation = new BMap.Geolocation();
					var gc = new BMap.Geocoder(); 
					geolocation.getCurrentPosition(function(r){

 if(this.getStatus() == BMAP_STATUS_SUCCESS){

 	map.setCurrentCity(r.address.city); // 设置地图显示的城市 此项是必须设置的
 }else   
        {  
            //关于状态码    
            //BMAP_STATUS_SUCCESS   检索成功。对应数值“0”。    
            //BMAP_STATUS_CITY_LIST 城市列表。对应数值“1”。    
            //BMAP_STATUS_UNKNOWN_LOCATION  位置结果未知。对应数值“2”。    
            //BMAP_STATUS_UNKNOWN_ROUTE 导航结果未知。对应数值“3”。    
            //BMAP_STATUS_INVALID_KEY   非法密钥。对应数值“4”。    
            //BMAP_STATUS_INVALID_REQUEST   非法请求。对应数值“5”。    
            //BMAP_STATUS_PERMISSION_DENIED 没有权限。对应数值“6”。(自 1.1 新增)    
            //BMAP_STATUS_SERVICE_UNAVAILABLE   服务不可用。对应数值“7”。(自 1.1 新增)    
            //BMAP_STATUS_TIMEOUT   超时。对应数值“8”。(自 1.1 新增)    
            switch( this.getStatus() )  
            {  
                case 2:  
                    alert( '位置结果未知 获取位置失败.' );  
                break;  
                case 3:  
                    alert( '导航结果未知 获取位置失败..' );  
                break;  
                case 4:  
                    alert( '非法密钥 获取位置失败.' );  
                break;  
                case 5:  
                    alert( '对不起,非法请求位置  获取位置失败.' );  
                break;  
                case 6:  
                    alert( '对不起,当前 没有权限 获取位置失败.' );  
                break;  
                case 7:  
                    alert( '对不起,服务不可用 获取位置失败.' );  
                break;  
                case 8:  
                    alert( '对不起,请求超时 获取位置失败.' );  
                break;  
                  
            }  
        } 
						
					})

					

					map.enableScrollWheelZoom(false); //开启鼠标滚轮缩放
					map.disableContinuousZoom(true);
					map.disablePinchToZoom(true)
					var startPoint

					//					map.addEventListener("dragging",
					//						function(evt) {
					//							console.log(111111111111)
					//							 map.setZoom(14);
					//						});

					axios.post(API.getaddress, {
							"id": that.id
						})
						.then(function(response) {
							var data = response.data.data
							var endPoint
							var d = data.orderaddress
console.log(d.length)
							if(d.length > 1) {
								for(var i = 0; i < d.length; i++) {
									that.pointArr.push(new BMap.Point(d[i].end_lng, d[i].end_lat))
									endPoint = that.pointArr[that.pointArr.length - 1]
								}
							} else if(d.length == 1) {

								that.pointArr.push(new BMap.Point(d[0].end_lng, d[0].end_lat))
								endPoint = that.pointArr[0]
							}

							startPoint = new BMap.Point(data.start_lng, data.start_lat);
							sessionStorage.setItem('startPoint', startPoint)

							map.centerAndZoom(startPoint, 17);
							var carpoint

							if(data.driver) {
								carpoint = (new BMap.Point(data.driver.lng, data.driver.lat));
console.log("carpoint is",carpoint)
							}

							$.each(that.pointArr, function(item, value) {
								chartData.push(new BMap.Point(that.pointArr[item].lng, that.pointArr[item].lat));
								sessionStorage.setItem("cdata", chartData);

							})

							function carlocation(point) {

								this._point = point;
							}
							carlocation.prototype = new BMap.Overlay();
							carlocation.prototype.initialize = function(map) {
								this._map = map
								var div = this._div = document.createElement('div')
								div.style.position = "absolute"
								div.className = "cardiv"
								div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
								div.style.height = "20px"
								div.style.overflow = "hidden"
								div.style.width = "30px"
								var img = this._img = document.createElement('img')
								img.className = "carimg"
								img.style.width = "100%"
								img.style.height = "100%"
								img.style.position = "absolute"
								img.style.margin = "auto"
								img.style.left = "0"
								img.style.right = '0'
								img.style.top = "0"
								img.style.bottom = "0"

								div.appendChild(img)
								var that = this
								map.getPanes().labelPane.appendChild(div);
								return div
							}

							function ComplexCustomOverlay(point) {
								this._point = point;
							}
							ComplexCustomOverlay.prototype = new BMap.Overlay();
							ComplexCustomOverlay.prototype.initialize = function(map) {
								this._map = map
								var div = this._div = document.createElement('div')
								div.style.position = "absolute"
								div.style.borderRadius = "50%"
								div.className = "himg"
								div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
								div.style.background = "#fff"
								div.style.border = "2px solid cornflowerblue"
								div.style.height = "30px"
								div.style.overflow = "hidden"
								div.style.width = "30px"
								div.style.right = "0px"
								var img = this._img = document.createElement('img')
								img.className = "img1"
								img.style.width = "100%"
								img.style.height = "100%"
								img.style.position = "absolute"
								img.style.margin = "auto"
								img.style.left = "0"
								img.style.right = '0'
								img.style.top = "0"
								img.style.bottom = "0"
								div.appendChild(img)
								var that = this
								map.getPanes().labelPane.appendChild(div);
								return div
							}
							carlocation.prototype.draw = function() {
								var map = this._map;

								var pixel = map.pointToOverlayPixel(this._point);

								this._div.style.left = pixel.x - 15 + "px";
								this._div.style.top = pixel.y - 15 + "px";

							}
							var POINT_ICON = {
								"start": '../../../web/static/img/fa.png',
								"end": '../../../web/static/img/shou.png',
								"che": '../../../web/static/img/che.png',
								"head": '../../../web/static/img/touxiang.png',
								'0': '../../../web/static/img/s1.png',
								'1': '../../../web/static/img/s2.png',
								'2': '../../../web/static/img/s3.png',
								'3': '../../../web/static/img/s4.png',
								'4': '../../../web/static/img/s5.png'

							}
							var ICON_SIZE_WIDTH = 23
							var ICON_SIZE_HEIGHT = 35

							function drawPoint(point, type) {

								if(type == "che") {

									let iconUrl = POINT_ICON[type]; // 通过不同的type 拿到对应的marker的icon url

									let marker = new BMap.Marker(point, {
										icon: new BMap.Icon(iconUrl, new BMap.Size(40, 20), {
											imageSize: new BMap.Size(40, 20),

										}),
										//									offset: new BMap.Size(0, -ICON_SIZE_HEIGHT / 2)
									});
									//																	map.clearOverlays()
									map.addOverlay(marker);

								} else {
									let iconUrl = POINT_ICON[type]; // 通过不同的type 拿到对应的marker的icon url
									//								console.log("290 is %o", type)
									let marker = new BMap.Marker(point, {
										icon: new BMap.Icon(iconUrl, new BMap.Size(ICON_SIZE_WIDTH, ICON_SIZE_HEIGHT), {
											imageSize: new BMap.Size(ICON_SIZE_WIDTH, ICON_SIZE_HEIGHT),

										}),

									});
									//																	map.clearOverlays()
									map.addOverlay(marker);

								}

							}

							var driving = new BMap.DrivingRoute(map, {
								renderOptions: {
									//map注释后则不显示默认途经点以及起点终点
									map: map,

									autoViewport: true
								},
								policy: BMAP_DRIVING_POLICY_LEAST_TIME, // 最短事件

								// 路径规划的回调函数 把结果绘制到地图上
								onSearchComplete: (result) => {
									//第一个途经点结果
									// 自定义的路径                                             
console.log(result)
									map.removeOverlay(polyline)
									let plan = result.getPlan(0)

									//如果有经点，会分段，需要重绘制
									let routeNum = plan.getNumRoutes();

									polylinePoints = [];
									for(let i = 1; i <= routeNum; i++) {

										let pathArr = plan.getRoute(i - 1).getPath();
										polylinePoints.push(...pathArr);

									}
									let icons = new BMap.Symbol(
										'M0 -8 L-5 -3 L0 -5 L5 -2 Z', {
											fillColor: '#32CD32', //设置矢量图标的填充颜色。支持颜色常量字符串、十六进制、RGB、RGBA等格式
											fillOpacity: 1, //设置矢量图标填充透明度,范围0~1
											scale: 0.5, //设置矢量图标的缩放比例
											rotation: 90, //设置矢量图标的旋转角度,参数为角度
											strokeColor: '#FFF', //设置矢量图标的线填充颜色,支持颜色常量字符串、十六进制、RGB、RGBA等格式
											strokeOpacity: 1, //设置矢量图标线的透明度,opacity范围0~1
											strokeWeight: 2, //旋设置线宽。如果此属性没有指定，则线宽跟scale数值相
										}
									)
									var iconSequence = new BMap.IconSequence(
										icons, //symbol为符号样式
										'10%', //offset为符号相对于线起点的位置，取值可以是百分比也可以是像素位置，默认为"100%"
										'8%', //repeat为符号在线上重复显示的距离，可以是百分比也可以是距离值，同时设置repeat与offset时，以repeat为准
										false //fixedRotation设置图标的旋转角度是否与线走向一致，默认为true
									);
									let polyline = new BMap.Polyline(polylinePoints, {
										icons: [iconSequence], //图标集合  **之前没有实现样式改变的最大原因**
										strokeColor: '#32CD32', //折线颜色 尽量与图标填充色保持一样
										strokeOpacity: 1, //折线的透明度，取值范围0 - 1
										strokeWeight: 5, //折线的宽度，以像素为单位
									});

									map.addOverlay(polyline);

								},
								onMarkersSet: function(res) { //标注点完成回调

									map.removeOverlay(res[0].marker); //删除起点
									for(var k in res) {
										map.removeOverlay(res[k].Om);
										map.removeOverlay(res[k].Pm);
									}

									map.removeOverlay(res[res.length - 1].marker); //删除终点

								}
							});
							loadline()
							driverhead()

							$(".localcar").click(function() {

								//	var carpoint = sessionStorage.getItem("carpoint")
								if(data.driver.length !== 0) {
									console.log(11111)
									focudriver()
								}

							})

							function focudriver() {
								if(data.driver !== "") {
									map.centerAndZoom(carpoint, 1);
								}
							}

							function driverhead() {
								var iconUrl
								if(carpoint) {
									if(data.driver.avator) {
										iconUrl = data.driver.avator;
									} else {
										iconUrl = '../../../web/static/img/touxiang.png';
									}
									let marker = new BMap.Marker(carpoint, {
										icon: new BMap.Icon(iconUrl, new BMap.Size(30, 30), {
											imageSize: new BMap.Size(30, 30),
											anchor: new BMap.Size(15, 40),
										}),
									});

									map.addOverlay(marker);

								}
								if(data.driver) {
									var ig = document.getElementsByClassName("BMap_Marker")
									for(var k = 0; k < ig.length; k++) {
										//											console.log(ig[k])
										var ht = '<div style="position: absolute; margin: 0px; padding: 0px; width: 30px; height: 30px; overflow: hidden;"><img src="' + data.driver.avator + '" style="display: block; border:none;margin-left:0px; margin-top:0px; ; width:30px; height:30px;"></div>'
										if(ig[k].innerHTML == ht) {
											//												console.log(k)

											ig[k].innerHTML = '<div style="position: absolute; margin: 0px; padding: 0px; width: 30px; height: 30px; overflow: hidden;"><img src="' + data.driver.avator + '" style="display: block;border-radius: 50%;border:none;margin-left:0px; margin-top:0px; ; width:30px; height:30px;"></div>'
										}

									}
								}

							}

							function loadline() {

								if(chartData.length > 1) {
									map.clearOverlays()
									chartData.pop()

									if(data.driver) {
										drawPoint(carpoint, 'che')

									}

									driving.search(startPoint, endPoint, {
										waypoints: chartData
									});

									drawPoint(startPoint, 'start')
									drawPoint(endPoint, 'end')

									for(let i = 0; i < chartData.length; i++) {

										drawPoint(chartData[i], i)

									}

								} else if(chartData.length == 1) {
									console.log(chartData)
									map.clearOverlays()

									if(data.driver) {
										drawPoint(carpoint, 'che')

									}

									driving.search(startPoint, endPoint)
									drawPoint(startPoint, 'start')
									drawPoint(endPoint, 'end')

								}
								//									ComplexCustomOverlay.prototype.draw = function() {
								//									var map = this._map;
								////									var pixel = map.pointToOverlayPixel(this._point);
								//									
								//
								//								}
								//								var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(data.driver.lng, data.driver.lat));
								//
								//								map.addOverlay(myCompOverlay);
								//								if(data.driver.avator) {
								//									$(".img1").attr('src', "../../../static/img/caricon.svg")
								//								}

							}

						}).catch(function(err) {

							console.log(err)
						})
				})

			})
		},
		methods: {

		},

	}

	//		layui-layer-iframe1
</script>

<style>
	path {
		/*		stroke: #1fdf53 !important;*/
	}
	
	.cardiv {
		animation-name: cardiv;
		animation-duration: 1.5s;
		/* 42 * (1 / 12) */
		animation-delay: 0.0833s;
		/* 1 * (1 / 12) */
		animation-fill-mode: both;
		animation-timing-function: ease-in-out;
	}
	
	@keyframes cardiv {
		0% {
			transform: translate3d(0, 1175px, 0);
		}
		61.90% {
			/* (2 * 12 + 3 - 1) / 42，注意要减去延时时间（1），因为 02:03 包含了它。下同。*/
			transform: translate3d(0, 0, 0);
		}
		64.29% {
			transform: translate3d(0, 0, 0);
		}
		100% {
			transform: translate3d(0, 0, 0);
		}
	}
</style>
