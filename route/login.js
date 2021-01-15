const express =require('express')
const Router = express.Router()
const Mail=require('../utils/mile')
const {users} =require('../db/model/users')
const EncryptUtil = require('../utils/EncryptUtil')
const {roleGetRouter} = require('../utils/Auth')
const Jwt = require('../utils/jwt')
const logs = require('../utils/log')

var codes;
/**
 * @api {post} /login  用户登录
 * @apiGroup 登录
 * @apiParam {String} username  用户名.
 * @apiParam {String} password 密码.
 * @apiSuccessExample {json} 返回实列:
 *     {
 *      code:0,
 *      msg :'登录成功',
 *      data:{
  *        token:'',
  *        username:'',
  *        role:''
  *        route:[]
  *      }
  *     }
  * @apiSampleRequest /login
 */
Router.post('/login',(req,res)=>{
  try {
    logs.info('[/login] ',req.body)
    let {username,password}=req.body
  if(!username || !password){
    res.send({code:104,msg:'缺少参数'})
  }
  users.findOne({usersName:username})
  .then((data)=>{
    if(data){
      let encryptPs = EncryptUtil.Decrypt(data.passWord)
    	if(encryptPs == password){
          let userInfo = {
            "username":data.usersName,
            "avatar" : data.avatar,
          }
          if(!data.role){
            logs.warn('[/login] {',username,'}当前用户未分配角色')
    		    res.send({code:108,msg : '当前用户未分配角色',data:null})
          }
          roleGetRouter(data.role)
          .then((data)=>{
            console.log(data)
            logs.info('[/login] {',username+'}登录成功')
            let resInfo = {
              ...userInfo,
              name: data.role.name || null,
              roles: data.role.roles || null,
            }
            logs.info(resInfo)
            let token = ( Jwt.creatToken(resInfo,6000) )
            res.send({
              code:0,
              msg :'登录成功',
              data:{...resInfo , token }
            })
          })
          .catch((err)=>{
            logs.warn('[/login] ',err)
            res.send({code:103,msg :err,data:userInfo})
          })
    	}else{
        logs.warn('[/login] {',username,encryptPs+'}用户名或密码错误')
    		res.send({code:107,msg : '用户名或密码错误',data:null})
    	}
    }else{
      logs.warn('[/login]','{',username,'}用户不存在')
      res.send({code:102,msg : '用户不存在',data:null})
    }
  })
	.catch((err)=>{
    logs.error('[/login]',err)
    console.log(err)
		return res.send({code:101,msg:'运行异常'})
	})
} catch (error) {
  logs.error('[/login]',{code:400,msg:'系统异常'},error)
  res.send({code:400,msg:'系统异常'})
}
})

Router.post('/sig',(req,res)=>{
  let sig = 1//EncryptUtil.md5Get(req.body.sig)
  let aes = EncryptUtil.aesDecrypt(req.body.sig)
  console.log(aes)
  res.status().send(aes,sig)
})


/**
 * @api {post} /reg  用户注册
 * @apiGroup 登录
 * @apiVersion 0.0.3
 * @apiParam {String} username  用户名.
 * @apiParam {String} password 密码.
 * @apiParam {String} role 角色.
 * @apiSuccessExample {json} 返回实列:
 *     {
        code:0,
        msg:'注册成功',
        data:{
          username:username,
          password:password,
        }
      }
 * @apiSampleRequest /reg
 */
Router.post('/reg',(req,res)=>{
  try {
    logs.info('[/reg] ',req.body)
    if(!req.body.role){
      req.body.role = 'guest' // 默认访客
    }
    let  {username, password,role,uId} = req.body
    // 判断参数是否正确
    users.find({usersName:username})
    .then((data)=>{
      if(data.length===0){
          // 用户名不存在 可以注册
          let info = {
            usersName:username,
            passWord:EncryptUtil.aesDecrypt(password),
            uId:uId,
            role:role, // 角色
            createTime:(new Date().getTime()),
          }
          users.insertMany({...info})
          .then((data)=>{
            logs.info('[/reg]','{',username,role,'}注册成功')
            res.send({
                code:0,
                msg:'注册成功',
                data:{username, password,role,uId}
              })
          })
          .catch((err)=>{
            logs.warn('[/reg]','{',username,'}注册失败')
            res.send({code:-1,msg:'注册失败'})
          })
      }else{
        logs.warn('[/reg]','{',username,'}用户名已存在')
        res.send({code:-3,msg:'用户名已存在'})
      }
    })
    .catch((err)=>{
      logs.error('[/reg]',err)
      res.send({code:-2,msg:'运行异常'})
    })
  } catch (error) {
    res.send({code:-3,msg:'系统异常'})
  }
})




 /**
 * @api {post} /getMailCode  发送邮箱验证码
 * @apiGroup 登录
 *
 * @apiParam {String} mail  邮箱
 * @apiSuccessExample {json} 返回实列:
*     {
        code:0,
*       msg:'验证码发送成功'
*     }
 */
// 发送邮件验证码
Router.post('/getMailCode',(req,res)=>{
  console.log(req.body)
  let {mail}=req.body
  let code=parseInt(Math.random()*10000)// 产生随机码

console.log(code)
  Mail.send(mail,code)
  .then(()=>{
    // codes[mail]=code
    //将邮箱和邮箱匹配的验证码保存到缓存中】
    res.send({code:0,msg:'验证码发送成功'})
  })
    .catch((err) => {
    console.log(err)
    res.send({code:-1,msg:'验证码发送失败'})
  })
 
})
module.exports=Router