//  连接数据库
const mongoose = require('mongoose')
const colors = require('colors');

const log = require("../utils/log");

const url = process.env.DB_CLIENT
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect('mongodb://host1[:port1][,host2[:port2],...[,hostN[:portN]]] [/[database][?options]]' [, options]);


mongoose.connection.on('connected', function () {
  let logs = '[app][mongoose] Mongoose connection open success'
  log.info(logs)
  console.log(colors.green(logs))
});

/**
* 连接异常rs
*/
mongoose.connection.on('error', function (err) {
  let logs = '[app][mongoose] Mongoose connection error: ' + err
  log.error(logs)
  console.log(colors.red(logs))
});

/**
* 连接断开
*/
mongoose.connection.on('disconnected', function (err) {
  let logs = '[app][mongoose] Mongoose disconnected: ' + err
  log.warn(logs)
  console.log(colors.yellow(logs))
})

module.exports = mongoose;
