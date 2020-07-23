const mongoose=require('mongoose')
let schema = new mongoose.Schema({
  title:{type:String,required:true},
  detail:{type:String,required:true},
  address:{type:String,required:false},
  TravelTime:{type:String,required:true},
  fileList:{type:Array,required:false},
});

// 将schema 对象转化为数据模型
let User = mongoose.model('lifejourneys', schema);//该数据对象和集合关联('集合名',schema对象)

module.exports=User