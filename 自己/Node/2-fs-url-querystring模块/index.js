let http = require("http");
let fs = require("fs");                    //文件读取       
let url = require("url");                  //解析URL
let querystring = require("querystring");  //解析参数

http.createServer(function(request,response){
                    //     请求      响应
    console.log(request.url);//请求的是地址后面的字符串
    let urlobj = url.parse(request.url);
    console.log(urlobj);
    //urlobj.pathname    /login.html

    if(urlobj.pathname=="/login.html"){
        //响应的页面  第一种方式
        // fs.readFile("test.html",function(error,data){
        //     //补充一下响应头的信息
        //     response.writeHead(200,{"Content-Type":"text/html"});
        //     //需要将缓存的data,响应给浏览器
        //     response.end(data);
        // })
        //第二种方式
        fs.createReadStream("test.html").pipe(response);

    }


}).listen(9000,"127.0.0.1",function(){
    console.log("node server running on port : 9000");
})