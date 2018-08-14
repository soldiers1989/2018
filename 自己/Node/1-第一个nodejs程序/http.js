//node搭建http服务器
//1.导入http模块
let http = require("http");

//2.使用http，建立服务器
http.createServer(function(request,response){
                    //     请求     响应
    //respones 响应头 （状态码，响应头对象）
    response.writeHead(200,{"Content-Type":"text/html"});

    // 响应体
    response.write("<h1>我知道你相信我是帅哥~~~~~~~6666</h1>");

    // 结束响应的过程
    response.end(console.log('我相信！'));
}).listen(9000,"127.0.0.1",function(){
    console.log("骗鬼去吧！");
})