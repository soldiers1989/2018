/**
 * Created by Administrator on 2017/9/1.
 */
let http=require("http");
let fs=require("fs");
let url=require("url");
let querystring=require("querystring");

http.createServer(function(request,response){
        let urlobj=url.parse(request.url)
        console.log(urlobj);
        //urlobj.pathname /login.html
       if(urlobj.pathname=="/login.html"){
           //相应的页面
           //fs.readFile("test.html",function(error,data){
           //     //补充一下响应头的信息
           //     response.writeHead(200,{"Content-Type":"text/html"});
           //    //需要将缓存的data,响应给浏览器
           //    response.end(data);
           //})
           //data end
           fs.createReadStream("test.html").pipe(response);
       }

}).listen(9000,"127.0.0.1",function(){
    console.log("node server running on port : 9000")
})