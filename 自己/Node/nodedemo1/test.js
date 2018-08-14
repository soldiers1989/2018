/**
 * Created by Administrator on 2017/8/30.
 */
let parseparam=require("./parseparams.js");
let str="username=admin&password=123&timeout=10000&isLogged=true&systemVersion=10";
let finished=parseparam.parse(str)
console.log(finished);