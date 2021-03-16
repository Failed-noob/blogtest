const mysql = require('mysql');
const express = require('express');
const  nodeuuid = require('node-uuid');
let operateMysql = require('./connect');
// console.log(operateMysql);
let nMysql = new operateMysql();
let app = express();
// console.log(nMysql)
// http.createServer((req,res)=>{
  
//  (async _=>{
//    let data = await nMysql.findAll(nMysql.queryData);
//   //  console.log(typeof data);
//    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
//    res.write(JSON.stringify(data));
//    res.end();
//  })()
// }).listen(3000,()=>console.log("Server is running!"))

//解决跨域
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});

app.get('/',(req,res)=>{ 
 (async _=>{
   let data = await nMysql.findAll(nMysql.queryData);
   //之前是 res. writeHead(200,{"Content-Type":"text/html;charset=utf-8"}) 还有 res.write('********')
   res.set({"Content-Type":"text/html;charset=utf-8"})
   res.send(JSON.stringify(data));
   res.end();
 })()
}).listen(3000,()=>{
  console.log("Server is running!")
})