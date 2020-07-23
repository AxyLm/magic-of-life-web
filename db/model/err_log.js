const mongoose=require('mongoose')
let scheme = new mongoose.Schema({
  log : {type:String,require:true},
  errcode : {type:String,require:false},
  createTime  : {type:String,required:true,default:nowDate()},
});
function nowDate(){
    let time = new Date()
    return time.getTime()
}
// 将schema 对象转化为数据模型

//该数据对象和集合关联('集合名',schema对象)

module.exports= mongoose.model('errlog', scheme);