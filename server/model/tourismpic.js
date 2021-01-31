const mongoose=require('mongoose')
var schema = new mongoose.Schema({
  path:{type:String,required:true},
  width:{type:Number,required:true},
  height:{type:Number,required:true},
  ratio:{type:Number,required:true},
});

// 将schema 对象转化为数据模型
var schema = mongoose.model('tourisms', schema);//该数据对象和集合关联('集合名',schema对象)

module.exports=schema
// a*10000+b*10000 4