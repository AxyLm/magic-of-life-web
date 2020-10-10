const app = require('express')()
const path=require('path')
const express = require('express')
const Router = express.Router()
const exStatic = require("express-static")
const db = require('./db/connect')
const bodyParser = require('body-parser')
const cors=require('cors')
const initShell = require('./bin/doc')
const {SERVER_NAME,SERVER_PORT} = require('./config/main')
var jsonParser = bodyParser.json()//解析json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//通过cors 解决跨域
app.use(cors())

const users = require('./route/users')
const login = require('./route/login')
const divers = require('./route/divers')
const api = require('./route/api')
// initShell
app.use('/soulfree/login',(req,res,next)=>{
  if(req['headers'].sig = 'magicLife'){
    next()
  }else{
    res.send(404)
  }
},login)
app.use('/users',users)

/**
 * 娱乐
 */
app.use('/soulfree',divers)
app.use('/soulfree/api',api)

app.use('/',express.static(path.join(__dirname,'./static/apidoc'))) // 接口文档页
app.use('/public',express.static(path.join(__dirname,'./static/media'))) // 静态目录

app.listen(SERVER_PORT,()=>{
  console.log(SERVER_NAME,'start：http://localhost:'+SERVER_PORT)
})
