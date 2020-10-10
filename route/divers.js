const express =require('express')
const Router = express.Router()

Router.post('/divers/:id',(req,res)=>{
    res.send('1')
})
Router.get('/divers/ZH',(req,res)=>{
    res.send('2')
})
module.exports=Router