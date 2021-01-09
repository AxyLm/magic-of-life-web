const express = require('express')
const Router = express.Router()
const { roles } = require('../../db/model/users')
const rolesModel = roles
const logs = require('../../utils/log')


/**
 * @api {post} /role/getrole 获取所有角色
 * @apiGroup 角色管理
 */
Router.post('/getrole',(req,res)=>{
    try {
        logs.info('[/getrole] ',req.body)
        if(req.body.info){
            var {code,name,roles} = req.body.info
        }else{
            var code='',name='',roles='';
        }
        rolesModel.find({code:{$regex:code},name:{$regex:name},roles:{$regex:roles}},'-_id roles name code')
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
        logs.error('[/getrole] ',error)
        res.send({code:-1,msg:'运行异常'}) 
    }
})

/**
 * @api {post} /role/addrole 添加角色
 * @apiGroup 角色管理
 * @apiParam {string} code
 * @apiParam {string} name
 * @apiParam {string} roles
 */
Router.post('/addrole',(req,res)=>{
    try {
        logs.info('[/addrole] ',req.body)
        let {code,name,roles} = req.body.info
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
        logs.error('[/addrole] ',error)
        res.send({code:-1,msg:'运行异常'})
    }
})

/**
 * @api {post} /role/delrole 删除角色
 * @apiGroup 角色管理
 * @apiParam {string} code
 * @apiParam {string} name
 * @apiParam {string} roles
 */
Router.post('/delrole',(req,res)=>{
    try {
        logs.info('[/delrole] ',req.body)
        let { code,name,roles } = req.body
        rolesModel.deleteOne({code:code})
        .then((data)=>{
            res.send({code:0,msg:'删除成功',data:{
                code,name,roles
            }})
        })
        .catch(()=>{
          res.send({code:404,msg:'删除失败'})
        })
    } catch (error) {
        logs.error('[/delrole] ',error)
        res.send({code:-1,msg:'运行异常'})
    }
})

/**
 * @api {post} /role/editrole 修改角色信息
 * @apiGroup 角色管理
 * @apiParam {string} code
 * @apiParam {string} name
 * @apiParam {string} roles
 */
Router.post('/editrole',(req,res)=>{
    try {
        logs.info('[/editrole] ',req.body)
        let { code,name,roles } = req.body.info
        if(!code || !name || !role){
            res.send({code:101,msg:'更新失败'})
            return
        }
        rolesModel.findByIdAndUpdate(code,{name,roles})
        .then((data)=>{
            res.send({code:0,msg:'更新成功',data:{
                code,name,roles
            }})
        })
        .catch(()=>{
          res.send({code:404,msg:'更新失败'})
        })
    } catch (error) {
        logs.error('[/editrole] ',error)
        res.send({code:-1,msg:'运行异常'})
    }
})

module.exports=Router
