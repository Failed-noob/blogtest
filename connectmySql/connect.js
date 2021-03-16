const mysql = require('mysql');
// const http =  require('http');
const  nodeuuid = require('node-uuid');
// const { v4: uuidv4 } = require('uuid');


// //连接数据库
// let db = mysql.createConnection({
//   host:"localhost", 
//   user:"root",
//   password:"123456",
//   database:"userList"
// })
// db.connect((err,data)=>{
//   if(err)console.log(err,"<----- error");
//   else console.log(data,'<---data','connect successfully!!');
// });

//创建数据库
// let sql = "CREATE DATABASE nodetest";
// db.query(sql,(err,result)=>{
//   if(err)console.log(err,"<----- error");
//   else console.log(result,'<---result','create successfully!!');
// })

// //获取该数据库中所有数据
// db.query(" SELECT * FROM userlist.users",(err,result)=>{
//   if(err)throw err;
//   else console.log(result)
// })

//uuid.v1() 按时间戳生成 uuid.v4() 随机生成
// console.log(nodeuuid.v1(),'<-----uuid v1按时间戳生成 长度------>',nodeuuid.v1().length); 
// //558ff060-6a95-11eb-8572-dfe5267829ba 631d7b80-6a95-11eb-94cb-3da1411822c4
// console.log(nodeuuid.v4(),'<-----uuid v4按时间戳生成 长度------>',nodeuuid.v4().length)
// console.log(uuidv4(),'<--')
//插入数据 

// db.query(`INSERT INTO users (id,username,password) VALUES ('${nodeuuid.v1()}','DH','123456')`,(err,result)=>{
//   if(err)throw err;
//   else console.log(result,'<------write successfully!');
// })
module.exports= operateMysql= class  {
  constructor(){
    this.db = mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"123456",
      database:"userList"
    });
    this.table = 'users'
    this.random = nodeuuid.v1();
    this.queryData = `SELECT * FROM ${this.table}`;
    this.insertData = `INSERT INTO ${this.table} SET id='${this.random}',username="hello",password="456123"`;
  };
  test (){
    console.log(this.db);
  };
  //判断数据库是否连接
  judegeConnectStatus(){
    this.db.connect((err,result)=>{
      if(err) throw err;
      else console.log(result,'<---result','connect successfully!!');
    })
  };
  //查找所有数据
  findAll(sql){
    return new Promise((resolve, reject) => {
       this.db.query(sql,(err,result)=>{
        if(err) throw err;
        else resolve(result);
      });
    })
   
  }
  //插入数据
  writeData(table,id,username,password){
    //两种插入方式都可以;
    let sql = `INSERT INTO ${table} (id,username,password) VALUES ('${id}','${username}','${password}')`;
    let sql1 = `INSERT INTO ${table} SET id='${id}',username='${username}',password='${password}'`;
    this.db.query(sql1,(err,result)=>{
      if(err) console.log(err);
      else console.log(result,'<---result','insert successfully!!');
    })
    // console.log(`--'${table}'---'${id}'---'${username}'----'${password}'`,this);
  }
}
let newtest = new operateMysql();
// console.log(newtest.test())
// newtest.judegeConnectStatus();
// console.log(newtest.table)
// newtest.writeData(newtest.table,newtest.random,'hhh','555555');

// newtest.findAll(newtest.queryData).then(data=>{
//   console.log(data)
// })

//async await;

let a = async _=>{
  let data=  await newtest.findAll(newtest.queryData);
  console.log(data)
}
a();
// console.log(newtest.db.query)
