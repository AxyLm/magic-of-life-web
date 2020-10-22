const express = require('express')

const db = require('./db/connect')
const app = express()
const net = require('net')
const path = require('path')
const cors = require('cors')
const colors = require('colors');
const timeout = require('connect-timeout')
const log4js = require('log4js');
const bodyParser = require('body-parser')

const initShell = require('./bin/doc')
const log = require("./utils/log");
const {SERVER_NAME,SERVER_PORT} = require('./config/main')

app.use(bodyParser.json());
// app.use(timeout('30s'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(log4js.connectLogger(log4js.getLogger("request"), {level: log4js.levels.INFO}));

const users = require('./route/users')
const login = require('./route/login')
const divers = require('./route/divers')
const api = require('./route/api')
// initShell


app.use('/user',login)
app.use('/users',users) // 缺少权限控制
app.use('/soulfree',divers)
app.use('/monit',api)

app.use('/',express.static(path.join(__dirname,'./static/apidoc'))) // 接口文档页
app.use('/public',express.static(path.join(__dirname,'./static/media'))) // 静态目录

let server = net.createServer().listen(SERVER_PORT)
server.on('listening', function () {
  server.close()
  app.listen(SERVER_PORT, () => {
    log.info('[app] start success')
    console.log(colors.green('[app] start success：http://localhost:' + SERVER_PORT))
  })
})
server.on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    log.error('[app] 端口被占用',SERVER_PORT)
  }
})