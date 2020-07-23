const app = require('express')()
const path=require('path')
const express = require('express')
const Router = express.Router()
const exStatic = require("express-static")
const db = require('./db/connect')
const bodyParser = require('body-parser')
const initShell = require('./bin/doc')

const {SERVER_NAME,SERVER_PORT} = require('./config/main')
var jsonParser = bodyParser.json()//解析json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//通过cors 解决跨域
   const cors=require('cors')
   app.use(cors())

const users = require('./route/users')

// initShell

app.use('/users',users)

app.use('/',express.static(path.join(__dirname,'./static/apidoc'))) // 接口文档页

app.listen(SERVER_PORT,()=>{
  console.log(SERVER_NAME,'start：http://localhost:'+SERVER_PORT)
})
