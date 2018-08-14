//url:http://www.baidu.com/login.html?
//参数列表：username = admin&password=123

let str = 'username=admin&password=123&timeout=10000&isLogged=true&systemVersion=10';
// let s1 = str.split("&")[0].split("=");
// let s2 = str.split("&")[1].split("=");
// console.log(s1,s2);

// 需要解析的字符串作为参数传递进来
function parse(string){
    let obj = {};
    string.split("&").map(function(item){
        let key = item.split("=")[0];
        let value = item.split("=")[1];
        obj[key] = value;
    })
    return obj;
}
module.exports.parse = parse;
// let parse = 123;
//写法错误，函数已经被声明，只是类型不同，声明为函数，非数字或字符串。+()则为调用函数。
console.log(parse);
// console.log(parse(str));