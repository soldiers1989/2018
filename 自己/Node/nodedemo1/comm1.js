let name="张三";
/*变量、函数、其他模块是不能直接访问的*/
//公开出去 不同的写法
//module.exports.a="aaa";


//module.exports 和 exports  ，module.exports.a 相当于 exports.a


exports.name="lisi";
module.exports={
    a:"aaa",
    aa:"zhangsan"
}