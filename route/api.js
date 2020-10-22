const express =require('express')
const Router = express.Router()
const axios = require('../utils/axios')
const logs = require('../utils/log')

/**
 * @api {post} /monit/rpiMonit 获取树莓派运行状态
 * @apiGroup monit
 */
Router.post('/rpiMonit',(req,res)=>{
    logs.info('[/rpiMonit] ',req.body)
    let url = 'http://gweb.frp.soulfree.cn/api/3/all'
    axios.get(url)
    .then(data=>{
        logs.info('[/rpiMonit] 查询成功',url)
        res.send({code:0,msg :'查询成功',data})
    })
    .catch(error=>{
        logs.error('[/rpiMonit] 运行异常',error)
        res.send({code:400,msg :'运行异常',data:null})
    })
})

/**
 * @api {post} /monit/frpMonit 获取frp服务端状态
 * @apiGroup monit
 */
Router.post('/frpMonit',(req,res)=>{
    logs.info('[/frpMonit] ',req.body)
    let type = req.body.type
    if(!type || type == 'serverinfo'){

    }else{
        type = '/proxy' + type
    }
    let url = 'http://admin.frp.soulfree.cn/api'+type
    axios({
        url:url,
        methods:'get',
        auth: {
            username: 'admin',
            password: '123456'
        }
    }).then((data)=>{
        logs.info('[/frpMonit] 查询成功',url)
        res.send({code:0,msg :'查询成功',data})
    }).catch((err)=>{
        logs.error('[/frpMonit] ',err)
        res.send({code:400,msg :'运行异常',data:null})
    })
})
module.exports=Router
