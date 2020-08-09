//  连接数据库
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/magic-of-life-db'
mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true})

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open success ');
});

/**
* 连接异常rs
*/
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

/**
* 连接断开
*/
mongoose.connection.on('disconnected', function (err) {
  console.log('Mongoose connection disconnected : ' + err);
})

module.exports = mongoose;
//连接数据库

// db.createUser({user:'magic',pwd:'magic161718',roles:['root']})
