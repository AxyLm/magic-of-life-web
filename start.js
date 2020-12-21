const express = require('express')
const config = require('./config/config')
const db = require('./db/connect')
const app = express()
const router = require('./route/index')
const net = require('net')
const path = require('path')
const cors = require('cors')
const colors = require('colors');
const timeout = require('connect-timeout')
const log4js = require('log4js');
const bodyParser = require('body-parser')

if(process.env.NODE_ENV === "development"){
  //const initShell = require('./bin/doc')
}
const log = require("./utils/log.js");
log.info('[app] env:',process.env.NODE_ENV)
app.use(bodyParser.json());
// app.use(timeout('30s'))
app.use(bodyParser.urlencoded({ extended: false }));
const corsoption = {
  "origin": "*",
  "methods": "*",
}
app.use(cors())

/**  */
app.use(log4js.connectLogger(log4js.getLogger("request"), {level: log4js.levels.INFO}));
router.init(app)
app.use('/life/',express.static(path.join(__dirname,'./public/web'))) // 接口文档页
app.use('/api/apidoc',express.static(path.join(__dirname,'./static/apidoc'))) // 接口文档页
app.use('/life/public',express.static(path.join(__dirname,'./static/media'))) // 静态目录

let server = net.createServer().listen(process.env.SERVER_PORT)
server.on('listening', function () {
  server.close()
  app.listen(process.env.SERVER_PORT, () => {
    log.info('[app] start success')
    console.log(colors.green('[app] start success：http://localhost:' + process.env.SERVER_PORT))
  })
})
server.on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    log.error('[app] 端口被占用', process.env.SERVER_PORT)
    console.log(colors.red('[app] error port：http://localhost:' + process.env.SERVER_PORT))
  }
})