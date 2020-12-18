const express = require('express')

const config = require('./config/config')
const db = require('./db/connect')
const app = express()
const net = require('net')
const path = require('path')
const cors = require('cors')
const colors = require('colors');
const timeout = require('connect-timeout')
const log4js = require('log4js');
const bodyParser = require('body-parser')

if(process.env.NODE_ENV === "development"){
  const initShell = require('./bin/doc')
}
const log = require("./utils/log.js");
log.info('[app] env:',process.env.NODE_ENV)
const {SERVER_NAME,SERVER_PORT} = require('./config/config')



console.log(process.env)
app.use(bodyParser.json());
// app.use(timeout('30s'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(log4js.connectLogger(log4js.getLogger("request"), {level: log4js.levels.INFO}));

const users = require('./route/users')
const login = require('./route/login')
const divers = require('./route/divers')
const monit = require('./route/monit')
const publicApi = require('./route/publicApi')
const file = require('./route/File/file')
// initShell


app.use('/life/user',login)
app.use('/life/file',file)
app.use('/life/users',users) // 缺少权限控制
app.use('/life/soulfree',divers)
app.use('/life/monit',monit)
app.use('/life/api/v1',publicApi)

app.use('/life/',express.static(path.join(__dirname,'./public/web'))) // 接口文档页
app.use('/api/apidoc',express.static(path.join(__dirname,'./static/apidoc'))) // 接口文档页
app.use('/life/public',express.static(path.join(__dirname,'./static/media'))) // 静态目录

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
    log.error('[app] 端口被占用', SERVER_PORT)
    console.log(colors.red('[app] error port：http://localhost:' + SERVER_PORT))
  }
})