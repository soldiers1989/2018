let parseparam = require("./demo2.js");
let str = 'username=admin&password=123&timeout=10000&isLogged=true&systemVersion=10';
let finished = parseparam.parse(str);
console.log(finished);