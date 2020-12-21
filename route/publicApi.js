const express =require('express')
const Router = express.Router()
const axios = require('../utils/axios')
const logs = require('../utils/log')
const pm2 = require('pm2')

/**
 * @api {post} /api/v1/qrcode title
 * @apiGroup public
 */

Router.post('/qrcode',(req,res)=>{

})

Router.post('/pm2_monit',(req,res)=>{
    logs.info('[/api/v1//pm2_monit] request',req.body)
    if (req.body.authToken === 'ad9971d1f97qE11d9f7e') {
        pm2.connect(error=>{
            console.log(error)
            pm2.list((e,list)=>{
                let arr = []
                list.forEach(item=>{
                    let {status,username,pm_exec_path,exec_mode,pm_uptime,created_at,version,exec_interpreter} = item.pm2_env
                    let data = {
                        "pid": item.pid,
                        "name": item.name,
                        status,username,pm_exec_path,exec_mode,pm_uptime,created_at,version,exec_interpreter,
                        ...item.monit
                    }
                    arr.push(data)
                })
                let sendMsg = { res: 0, msg: '成功', data: arr }
                logs.info('[/api/v1//pm2_monit] response', sendMsg)
                res.send(sendMsg)
            })
        })
    } else {
        res.sendStatus(404)
    }
})
module.exports=Router
