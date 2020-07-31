const express =require('express')
const Router = express.Router()
const Mail=require('../utils/mile')
const {users} =require('../db/model/users')
const EncryptUtil = require('../utils/EncryptUtil')
const {roleGetRouter} = require('../utils/Auth')
const DeepClone = require('../utils/cs')

const Jwt = require('../utils/jwt')
/**
 * @api {post} /user/login  用户登录
 * @apiGroup User
 *
 * @apiParam {String} username  用户名.
 * @apiParam {String} password 密码.
 * @apiSuccessExample {json} 返回实列:
 *     {
 *      code:0,
 *      msg :'登录成功',
 *      data:{
  *        token:token,
  *        username:username
  *      }
  *     }
 * @apiSampleRequest http://localhost:9999/user/login
 * 
 */


Router.post('/login',(req,res)=>{
  let {username,password}=req.body
  console.log(DeepClone)
  users.findOne({usersName:username})
  .then((data)=>{
    if(data){
      let encryptPs = EncryptUtil.Decrypt(data.passWord)
    	if(encryptPs == password){
          let userInfo = {
            "username":data.usersName,
          }
          let  token=Jwt.creatToken(username,6000)
          roleGetRouter(data.role)
          .then((data)=>{
            console.log(data)
            res.send({code:0,msg :'登录成功',data:{...userInfo,...data.role,token,route:data.tree}})
          })
          .catch((err)=>{
            res.send({code:-1,msg :err,data:userInfo})
          })
    	}else{
    		res.send({code:-7,msg : '用户名或密码错误',data:null})
    	}
    }else{
      res.send({code:-8,msg : '用户不存在',data:null})
    }
  })
	.catch((err)=>{
    console.log(err)
		return res.send({code:-1,msg:'运行异常'})
	})

})

Router.post('/sig',(req,res)=>{
  let sig = 1//EncryptUtil.md5Get(req.body.sig)
  let aes = EncryptUtil.aesDecrypt(req.body.sig)
  console.log(aes)
  res.status().send(aes,sig)
})
/**
 * @api {post} /user/reg  用户注册
 * @apiGroup User
 *
 * @apiParam {String} username  用户名.
 * @apiParam {String} password 密码.
 * @apiSuccessExample {json} 返回实列:
 *     {
      code:0,
        msg:'注册成功',
        data:{
          username:username,
          password:password,
        }
      }
 * @apiSampleRequest http://localhost:9999/user/reg
 */
Router.post('/reg',(req,res)=>{
  try {
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
            res.send({
                code:0,
                msg:'注册成功',
                data:{username, password,role,uId}
              })
          })
          .catch((err)=>{
            res.send({code:-1,msg:'注册失败'})
          })
      }else{
        res.send({code:-3,msg:'用户名已存在'})
      }
    })  
    .catch((err)=>{
      console.log(err)
      res.send({code:-2,msg:'运行异常'})
    })
  } catch (error) {
    res.send({code:-3,msg:'系统异常'})
  }
})




 /**
 * @api {post} /user/getMailCode  发送邮箱验证码
 * @apiGroup User
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


  Mail.send(mail,code)
  .then(()=>{
    codes[mail]=code
    //将邮箱和邮箱匹配的验证码保存到缓存中】
    res.send({code:0,msg:'验证码发送成功'})
  })
  .catch((err)=>{
    res.send({code:-1,msg:'验证码发送失败'})
  })
 
})
module.exports=Router