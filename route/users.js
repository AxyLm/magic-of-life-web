const express =require('express')
const Router = express.Router()
const {routers,authRoules,roles,users} =require('../db/model/users')
// const {routerList,authRoute,roles} = require('./route.js')


/**
 * @api {post} /users/getAuthRouter 根据权限获取相应路由
 * 
 * @apiParam {String} role
 */
Router.post('/getAuthRouter',(req,res)=>{
    try {
        let role = req.body.role
        routers.find({})
        .then((data)=>{
            let routerList = data
            // authRoules.find({})
            roles.findOne({roles:role})
            .then((data)=>{
                authRoules.find({visibleRoles:{$regex:data.code}})
                .then((auth)=>{
                    console.log(auth)
                    // let list = getAuthRoute(auth,data.code) // 过滤角色权限
                    let b = getTree(auth,routerList) // 合并树状路由
                    res.send({code:0,data:b,msg:'ok'})
                })
                
            })
            .catch((err)=>{
                console.log(err)
                res.send('err')
            })
        })
    } catch (error) {
        res.send({code:-1,msg:'运行异常'})
    }
    // 合成路由树tree
    function getTree(data = [],routerList, sid, parent = null) {
        const children = [];
        for (const i in data) {
            const node = data[i];
            if ( ( (!parent && !node.parent) || node.parent === parent) && node.routerId !== sid ) {
                let {title,name} = getRouter(routerList,node.routerId,'_id')
                children.push({
                    title,name,
                    children: getTree(data,routerList, sid, node.routerId)
                });
            }
        }
        return children.length ? children : null;
    }
    // 查出相应路由
    function getRouter(arr,id,key){
        for (let index = 0; index < arr.length; index++) {
            const item = arr[index];
            if(item[key] == id){
                return item
            }
        }
    }
    // 根据角色过滤authRoute表
    function getAuthRoute(authRoute,rule){
        let arr = []
        for (let i = 0; i < authRoute.length; i++) {
            const item = authRoute[i]
            if( item.visibleRoles.indexOf(rule) !== -1 ){
                arr.push(item)
            }
        }
        return arr
    }
}) 

/**
 * @api {post} /users/addroute
 */
Router.post('/addroute',(req,res)=>{
    let  {title,name,parent,visibleRoles} = req.body
    // 判断参数是否正确 
    routers.insertMany({title,name})
    // authRoute.insertMany({})
    .then((data)=>{
        authRoules.insertMany({routerId:data[0]._id,parent,visibleRoles})
        .then(()=>{
            res.send({code:0,msg:'添加成功',data:{title,name}})
        })
        .catch((err)=>{
            console.log(err)
            res.send({code:-2,msg:'权限添加失败'})
        })
    })
    .catch((err)=>{
        console.log(err)
      res.send({code:-1,msg:'添加失败'})
    })
})

/**
 * @api {post} /users/addrole 添加角色
 * 
 */
Router.post('/addrole',(req,res)=>{
    try {
        let {code,name,title} = req.body
        roles.insertMany({code,name,title})
        .then((data)=>{
            res.send({code:0,msg:'添加成功',
                data:{
                    code,name,title
                }
            })
        })
        .catch((err)=>{
            console.log(err)
            res.send({code:-1,msg:'角色添加失败'})
        })
    } catch (error) {
        console.log(console.log(error))
        res.send({code:-1,msg:'运行异常'}) 
    }
    
})
Router.post('/request',(req,res)=>{
  let  {routerId,parent} = req.body
  // 判断参数是否正确 
  users.insertMany({routerId,parent})
  .then((data)=>{
    res.send({
        code:0,
        msg:'添加成功',
        data:{
            routerId,parent
        }
      })
  })
  .catch((err)=>{
    res.send({code:-1,msg:'添加失败'})
  })
})
 
module.exports=Router