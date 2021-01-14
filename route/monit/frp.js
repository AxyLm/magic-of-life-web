const express = require('express')
const Router = express.Router()
const { traffic } = require("../../db/model/frpModel")
const logs = require('../../utils/log')



/**
 * @api {post} /monit/queryTraffic 流量统计
 * @apiGroup 系统状态
 * @apiParam {string} usersName
 */
Router.post('/queryTraffic', (req, res) => {
    let dimension = req.body.dimension || "d"

    traffic.find({dimension:dimension,},"-_id -__v")
    .then((data)=>{
        res.send({
            code:0,
            data,
            msg:"成功"
        })
    })
    .catch((err)=>{

    })

})






module.exports = Router
