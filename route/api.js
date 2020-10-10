const express =require('express')
const Router = express.Router()
const axios = require('../utils/axios')

/**
 * @api {post} /soulfree/api/rpiMonit 获取树莓派运行状态
 * @apiGroup monit
 */
Router.post('/rpiMonit',(req,res)=>{
    axios.get("http://gweb.frp.soulfree.cn/api/3/all")
    .then(data=>{
        res.send({code:0,msg :'查询成功',data})
    })
    .catch(error=>{
        res.send({code:400,msg :'运行异常',data:null})
    })
})

/**
 * @api {get} /soulfree/api/frpMonit 获取frp服务端状态
 * @apiGroup monit
 */
Router.get('/frpMonit',(req,res)=>{
    
    axios({
        url:'http://admin.frp.soulfree.cn/api/serverinfo',
        methods:'get',
    })
})
module.exports=Router
