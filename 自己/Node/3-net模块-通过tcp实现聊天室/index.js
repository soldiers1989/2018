var net = require("net");  //引入net模块

var count = 0;  //当前在线人数
var user = {};   //储存当前聊天室的用户
//创建一个tcp的服务器
var server = net.createServer(function(scoket){
    scoket.write("welcome to node chat , now "+count+" at this time .your name\r\n");
    count++;//聊天室的人数要进行增加
    var nickname;//临时存储用户输入的姓名

    //公共的广播方法
    function broadcast(msg){
        for(var i in user){
            if(i!=nickname){
                user[i].write(msg)
            }
        }
    }

    var temp = "";
    scoket.on("data",function(data){
        // console.log(data);
        temp += data;
        if(temp.indexOf("\n")===-1){
            return;
        }
        data = temp.replace(/\r|\n/g,"");
        if(!nickname){
            //用户名重复存在
            if(user[data]){
                scoket.write("nickname already in use , try \r\n");
                temp = "";
                return;
            }
            else{
                nickname = data;
                user[nickname] = scoket;
                broadcast(nickname+"join the room\r\n")
            }
        }else{
            broadcast(nickname+"say:"+data+"\r\n");
        }
        temp = "";
    })
    //用户离开的时候
    scoket.on("close",function(){
        count--;
        delete user[nickname];
        broadcast(nickname+"leave the room")
    })
});
server.listen(9000,function(){
    console.log("server listening on 9000");
})
