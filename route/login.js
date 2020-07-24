const express =require('express')
const Router = express.Router()
// const User=require('../db/model/userModel')
// const loginTime=require('../db/model/loginTime')
// const authRouter=require('../db/model/authRouter')
// const Jwt = require('../utils/jwt')
// const Mail=require('../utils/mile')

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
  User.find({username,password})
  .then((data)=>{
    if(data[0].username==username){ 
    	if(data[0].password==password){
        let  token=Jwt.creatToken(username,6000)
        
        
        // authRouter.find({auth:data[0].authority}) //路由列表
        // .then((auth)=>{
          // let userInfo = new Object()
          // userInfo.username = data[0].username
          // userInfo.authRouterList = data[0].authRouterList
          // userInfo.token = token
          // console.log(userInfo,data[0])
          let userInfo = {
            "token":token,
            "username":data[0].username,
            "authRouterList":data[0].authRouterList
          }
          res.send({code:0,msg :'登录成功',data:userInfo})
        // })



        let date = new Date
        let timeLine = Math.round( ( date.getTime() ) / 1000 )
        let loginTimeInfo = {
          "userId":data[0]._id,
          "userName":data[0].username,
          "loginTime":timeLine
        }
        loginTime.insertMany(loginTimeInfo)
        // User.updateOne({_id:data[0]._id},{loginTime})
    	}else{
    		res.send({code:-7,msg : '密码不正确'})
    	}
    }
  })
	.catch((err)=>{
    console.log(err)
		return res.send({code:-1,msg:'运行异常'})
	})

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
  let  {username, password} = req.body
  // 判断参数是否正确
  User.find({username})
  .then((data)=>{
    if(data.length===0){
        // 用户名不存在 可以注册
        User.insertMany({username,password})
        .then((data)=>{
          res.send({
              code:0,
              msg:'注册成功',
              data:{
                username:username,
                password:password,
              }
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
    res.send({code:-2,msg:'运行异常'})
  })
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