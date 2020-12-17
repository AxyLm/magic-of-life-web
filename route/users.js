const express =require('express')
const Router = express.Router()
const {routers,authRoules,roles,users} =require('../db/model/users')
// const {routerList,authRoute,roles} = require('./route.js')
const rolesModel = roles
const {roleGetRouter} = require('../utils/Auth')
const logs = require('../utils/log')

/**
 * @api {post} /users/getAuthRouter 根据权限获取相应路由
 * @apiGroup userInfo
 * @apiParam {String} role
 */
Router.post('/getAuthRouter',(req,res)=>{
    try {
        logs.info('[/getAuthRouter] ',req.body)
        let role = req.body.role
        roleGetRouter(role)
        .then((data)=>{
            logs.info('[/getAuthRouter] 路由查询成功'+JSON.stringify(data))
            res.send({code:0,msg :'成功',data:data.tree})
        })
        .catch((err)=>{
            res.send({code:103,msg:err,data:null})
        })
    } catch (error) {
        res.send({code:-1,msg:'运行异常'})
    }
})
Router.post('/queryRouter',(req,res)=>{
try {
    logs.info('[/queryRouter] ',req.body)
    let {node} = req.body

    let router = routers.findOne({_id:node.id})
    let auth = authRoules.findOne({routerId:node.id})
    Promise.all([router,auth])
    .then((promises)=>{
        let routerData = promises[0]
        let authData = promises[1]

        let {component,icon,path,route,title,_id} = routerData
        let routeData = {component,icon,path,route,title,id:_id}
        if(node.parent){
            routers.findOne({_id:node.parent})
            .then((parent)=>{
                let parentData = {
                    title:parent.title,
                    id:parent._id
                }
                res.send({code:0,msg:null,data:{...routeData,parent:parentData,sequence:authData.sequence,visibleRoles:authData.visibleRoles}})
            })
        }else{
            res.send({code:0,msg:null,data:{...routeData,parent:null,sequence:authData.sequence,visibleRoles:authData.visibleRoles}})
        }
    }).catch((err)=>{

    })
    // routers.findOne({_id:node.id})
    // .then((data)=>{
        
    // })
} catch (error) {
    res.send({code:400,msg:'运行异常'})
}
})

/**
 * @api {post} /users/addroute 添加路由
 * @apiGroup userInfo
 * @apiParam {String} title
 * @apiParam {String} name
 * @apiParam {String} parent
 * @apiParam {Array} visibleRoles
 */
Router.post('/addroute',(req,res)=>{
try {
    logs.info('[/addroute] ',req.body)
    let {title,route,path,icon,component,parent,visibleRoles,sequence} = req.body
    if(!parent && component !== 'Layout'){
        res.send({code:102,msg:'根组件的compoent需指向框架Layout'})
        return
    }
    if(!sequence){
        res.send({code:103,msg:'缺少序列'})
    }
    // 判断参数是否正确 
    routers.insertMany({title,route,path,icon,component})
    // authRoute.insertMany({})
    .then((data)=>{
        if(visibleRoles == 'all'){
            rolesModel.find({}) // 取所有角色
            .then((role)=>{
                let visibleRoles = []
                for (let i = 0; i < role.length; i++) {
                    const item = role[i];
                    visibleRoles.push(item.code)
                }
                authRoules.insertMany({routerId:data[0]._id,parent,visibleRoles,sequence})
                .then(()=>{
                    res.send({code:0,msg:'添加成功',data:{title,route,path,icon,component,sequence,id:data[0]._id}})
                })
                .catch((err)=>{
                    console.log(err)
                    res.send({code:101,msg:'权限添加失败'})
                })
            }).catch((err)=>{
                res.send({code:103,msg:'角色获取失败'})
            })
        }else{
            authRoules.insertMany({routerId:data[0]._id,parent,visibleRoles,sequence})
            .then(()=>{
                res.send({code:0,msg:'添加成功',data:{title,route,path,icon,component,sequence,id:data[0]._id}})
            })
            .catch((err)=>{
                console.log(err)
                res.send({code:101,msg:'权限添加失败'})
            })
        }

    })
    .catch((err)=>{
        console.log(err)
        res.send({code:100,msg:'添加失败'})
    })
} catch (error) {
    console.log(error)

    res.send({code:400,msg:'运行异常'})
        
}
})

/**
 * @api {post} /users/addroute 删除路由
 * @apiGroup userInfo
 * @apiParam {String} routerId
 */
Router.post('/delrouter',(req,res)=>{
try {
    logs.info('[/delrouter] ',req.body)
    let id = req.body.routerId
    if(!id){
        res.send({code:300,msg:'缺少参数'})
    }
    routers.deleteOne({_id:id})
    .then((data)=>{

        authRoules.deleteOne({routerId:id})
        .then((auth)=>{
            res.send({code:0,msg:'删除成功',data,auth})
        })
        .catch(()=>{
            res.send({code:-1,msg:'删除失败'})
        })
    })
    .catch(()=>{
      res.send({code:404,msg:'删除失败'})
    })
    
} catch (error) {
    res.send({code:400,msg:'运行异常'})
}
})

/**
 * @api {post} /users/updataRouote 更新路由信息
 * @apiGroup userInfo
 * @apiParam {String} id
 */
Router.post('/updateRoute',(req,res)=>{
try {
    logs.info('[/updateRoute] ',req.body)
    let id = req.body.id
    let {component,icon,path,route,title,visibleRoles} = req.body
    routers.findByIdAndUpdate(id,{component,icon,path,route,title,visibleRoles})
    .then((data)=>{
        let {component,icon,path,route,title,visibleRoles} = data

        let {sequence,parent} = req.body
        if( sequence || parent ){
            authRoules.findOneAndUpdate({routerId:id},{sequence,parent})
            .then((auth)=>{
                let {sequence,parent} = auth
                res.send({code:0,data:{component,icon,path,route,title,visibleRoles,sequence,parent},msg:'成功'})
            })
        }else{
            res.send({code:0,data:{component,icon,path,route,title,visibleRoles,sequence,parent},msg:'成功'})
        }
    })
} catch (error) {
    res.send({code:400,msg:'运行异常'})
}
})
/**
 * @api {post} /user/getrole 获取所有角色
 * @apiGroup userInfo
 */
Router.post('/getrole',(req,res)=>{
    try {
        logs.info('[/getrole] ',req.body)
        rolesModel.find({},{_id:0})
        .then((data)=>{
            if(data){
                if(req.body.type == 'list'){
                    let role = data
                    let visibleRoles = []
                    for (let i = 0; i < role.length; i++) {
                        const item = role[i];
                        visibleRoles.push(item.code)
                    }
                    res.send({code:0,msg:'成功',data:visibleRoles}) 
                }else{
                    res.send({code:0,msg:'成功',data}) 
                }
            }else{
                res.send({code:-1,msg:'无数据'})
            }
        })
    } catch (error) {
        console.log(console.log(error))
        res.send({code:-1,msg:'运行异常'}) 
    }
})

/**
 * @api {post} /users/addrole 添加角色
 * @apiGroup userInfo
 * @apiParam {string} code
 * @apiParam {string} name
 * @apiParam {string} roles
 */
Router.post('/addrole',(req,res)=>{
    try {
        logs.info('[/addrole] ',req.body)
        let {code,name,roles} = req.body
        rolesModel.findOne({code})
        .then((data)=>{
            if(data){
                res.send({code:-2,msg:'code重复'})
            }else{
                rolesModel.insertMany({code,name,roles})
                .then((data)=>{
                    res.send({code:0,msg:'添加成功',
                        data:{code,name,roles}
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    res.send({code:-1,msg:'角色添加失败'})
                })
            }
        })
    } catch (error) {
        console.log(console.log(error))
        res.send({code:-1,msg:'运行异常'})
    }
})

module.exports=Router