let http = require("http");
let fs = require("fs");
let url = require("url");
let querystring = require("querystring");

http.createServer(function(request,response){
    let filename = "";
    let urlobj = url.parse(request.url);
    let pathname = urlobj.pathname;

    if( pathname == "/" ){
        filename = "login.html";
        fs.createReadStream(`public/${filename}`).pipe(response);
    }else if( pathname == "/checkuser.html" )
    {
        let params = "";
        console.log(request.method);
        if( request.method == "GET" ){
            //是否包含参数
            if(urlobj.jqery){
                //使用querystring 解析参数
                params = querystring.parse(urlobj.query);
            }
        }
        else if( request.method == "POST" ){
            var postdata = "";
            request.on("data",function(data){
                postdata += data;
            })
            request.on("end",function(){
                console.log("ceshi:----"+postdata);
                params = querystring.parse(postdata);
                if(params.usernaem == "admin"&&params.password=="123"){
                    filename = "profile.html";
                }
                else{
                    filename = "404.html"
                }
                fs.createReadStream(`public/${filename}`).pipe(response);
            })

        }
    }
    else{
        filename = "404.html"
        //4. 读取文件流，作为响应发给浏览器
        // fs.createReadStream( "public/"+filename ).pipe(response);
        // ES6字符串拼接写法
        fs.createReadStream( `public/${filename}` ).pipe(response);
    }

}).listen(9000,"127.0.0.1",function(){
    console.log('出来吧！9000');
})