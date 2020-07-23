const mongoose=require('mongoose')
var userSchema = new mongoose.Schema({
  username  : {type:String,required:true},
  password  : {type:String,required:true},
  authority  : {type:String,required:true},
});

// 将schema 对象转化为数据模型
var User = mongoose.model('users', userSchema);//该数据对象和集合关联('集合名',schema对象)

module.exports=User