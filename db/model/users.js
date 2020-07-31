const mongoose=require('mongoose')

/**
 * 用户信息
 */
const userSchema = new mongoose.Schema({
  usersName:{type:String,required:true}, 
  uId:{type:String,required:true},
  passWord:{type:String,required:true},
  role:{type:String,required:true}, // 角色
  avatar:{type:String,require:false}, // 头像
  phone:{type:String,require:false}, // 手机号
  emile:{type:String,require:false}, // emile
  createTime:{type:String,required:true},
});

/**
 * 角色
 */
const rolesScheme = new mongoose.Schema({
  roles:{type:String,require:true},
  code:{type:String,require:true},
  name:{type:String,required:true}, 
  description:{type:String,required:false}, 
})

/**
 * 角色权限-路由关系
 */
const authRoles = new mongoose.Schema({
  parent:{type:String,require:false},
  routerId:{type:String,require:true},
  visibleRoles:{type:Array,require:true}
})

/**
 * 路由/菜单
 */
const routerScheme = new mongoose.Schema({
  title:{type:String,required:false},
  route:{type:String,required:false},
  path:{type:String,required:false},
  icon:{type:String,required:false},
  type:{type:String,required:false},
  component:{type:String,required:false},
  description:{type:String,required:false},
})
module.exports = {
  users : mongoose.model('users', userSchema),
  roles : mongoose.model('roles', rolesScheme),
  authRoules : mongoose.model('authRoles', authRoles),
  routers : mongoose.model('routers', routerScheme),
}