const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    usersName:{type:String,required:true}, 
    passWord:{type:String,required:true},
    role:{type:String,required:true}, // 角色
    avatar:{type:String,require:false}, // 头像
    phone:{type:String,require:false}, // 手机号
    emile:{type:String,require:false}, // emile
    createTime:{type:String,required:true},
});

module.exports = {
    users:mongoose.model('users', userSchema),
}