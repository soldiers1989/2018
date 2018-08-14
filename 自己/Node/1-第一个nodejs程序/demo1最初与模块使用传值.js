// console.log('你好，世界！！！！');
let name = '召唤，世界！';
// 变量、函数、其他模块是不能直接访问的
var say = '介绍你妹给我！';
//公开出去 不同写法，方式1
module.exports.name = "不给";
// console.log(name);
module.exports.say = say;


// 引用导入方式二
exports.shuo = say;
//module.exorts 和exports ，module.exports.a 相当于 exports.a

// 引用导入方式3
module.exports = {
    ming: "我真的是帅哥！",
    zi: say
}
