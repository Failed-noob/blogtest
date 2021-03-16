module.exports={
  devServer:{
    //配置跨域
    proxy: {
      '/api' :{
        target:'http://127.0.0.1:3030',
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
}