let http=require("http");
let fs=require("fs");
let url=require("url");
let querystring=require("querystring");

http.createServer(function(request,response){

    let filename="";
    //1. 判断浏览器传过来的URL
    let urlobj=url.parse(request.url);
    //2. pathname
    let pathname=urlobj.pathname;
    //3. 根据url 查找对应的文件
    console.log(pathname)
    if(pathname=="/"){
        filename="login.html";
    }
    else if(pathname=="/checkuser.html")
    {
        //是否包含参数
        if(urlobj.query){
            //使用querystring 解析参数
            let params=querystring.parse(urlobj.query);
            if(params.username=="admin"&&params.password=="1231"){
                filename="profile.html";
            }
            else{
                filename="404.html"
            }
        }
    }else{
        filename="404.html"
    }
    //4. 读取文件流，作为响应发给浏览器
    fs.createReadStream(`public/${filename}`).pipe(response);

}).listen(9000,"127.0.0.1",function(){
    console.log("running on 9000")
})