const express = require('express');
const router = express.Router()

router.get('/downLoad/:id',function(req,res){
    req.params.id
})