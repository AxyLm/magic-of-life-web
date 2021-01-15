const mongoose = require('mongoose')

/**
 * 用户信息
 */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  account: { type: String, require: true },
  userId: { type: String, required: true },
  password: { type: String, required: true },
  rolecode: { type: String, required: true },
  avatar: { type: String, require: false },
  phone: { type: String, require: false },
  emile: { type: String, require: false },
  createTime: { type: String, required: true },
}, { versionKey: false })

/**
 * 角色
 */
const rolesScheme = new mongoose.Schema({
  rolecode: { type: String, require: true },
  rolename: { type: String, required: true },
  remark: { type: String, required: false, default: null },
}, { versionKey: false })

/**
 * 角色权限-路由关系
 */
const authRoles = new mongoose.Schema({
  parent: { type: String, require: false },
  routerId: { type: String, require: true },
  visibleRoles: { type: Array, require: true },
  sequence: { type: Number, require: true }
}, { versionKey: false })

/**
 * 路由/菜单
 */
const routerScheme = new mongoose.Schema({
  title: { type: String, required: false },
  route: { type: String, required: false },
  path: { type: String, required: false },
  icon: { type: String, required: false },
  type: { type: String, required: false },
  component: { type: String, required: false },
  description: { type: String, required: false },
}, { versionKey: false })
module.exports = {
  users: mongoose.model('users', userSchema),
  roles: mongoose.model('roles', rolesScheme),
  authRoules: mongoose.model('authRoles', authRoles),
  routers: mongoose.model('routers', routerScheme),
}