export function MP(ak) {
  return new Promise(function (resolve, reject) {  
    var script = document.createElement("script");  
    script.type = "text/javascript";  
    script.src = "https://api.map.baidu.com/api?v=2.0&ak=0lMMxeeRPaSVHMPIaW6g3O1lgejLTtES&callback=initMap";  
    script.onerror = reject;  
    document.head.appendChild(script);  
     window.initMap  = function () {  
      resolve(BMap)  
      return
    } 
  })  
}  
