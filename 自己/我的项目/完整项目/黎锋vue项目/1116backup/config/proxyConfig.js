module.exports = {
  proxyList: {
        '/shipper': {
            // 测试环境
            target: 'https://city.56dog.net',  // 接口域名
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/shipper': ''   //需要rewrite重写的,
            }              
        }
  }
}