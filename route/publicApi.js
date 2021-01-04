const express =require('express')
const Router = express.Router()
const axios = require('../utils/axios')
const logs = require('../utils/log')

/**
 * @api {post} /api/v1/qrcode title
 * @apiGroup public
 */

Router.post('/qrcode',(req,res)=>{

})

module.exports=Router
