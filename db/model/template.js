const mongoose=require('mongoose')
let schema = new mongoose.Schema({
    template:{type:String,required:true}, 
});

// 将schema 对象转化为数据模型
// 该数据对象和集合关联('集合名',schema对象)

module.exports = mongoose.model('templates', schema); 