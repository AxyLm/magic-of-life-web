const mongoose=require('mongoose')
var schema = new mongoose.Schema({
  name  : {type:String,required:false},
  dep  : {type:String,required:false},
  img  : {type:String,required:false},
});

// 将schema 对象转化为数据模型
var User = mongoose.model('deps', schema);//该数据对象和集合关联('集合名',schema对象)

module.exports=User