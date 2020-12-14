const express = require('express')
const Router = express.Router()
const multer = require('multer')
const logs = require('../../utils/log')
const path = require('path')
const fs = require('fs')
const fileDb = require('../../db/model/File')
const ExifImg = require('../../utils/ExifImage')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 指定文件路径
        console.log(file)
        file.createTime = (new Date()).getTime()
        cb(null, path.join(__dirname,'../../static/file'))
        
    },
    filename: function (req, file, cb) {
        // 指定文件名
        //文件名重复覆盖
        // 后缀名发生改变

        let exts = file.originalname.split('.')
        let ext = exts[exts.length - 1]
        let tmpname = (new Date()).getTime() + '-' + parseInt(Math.random() * 9999)
        file.fieldname = tmpname
        cb(null, `${tmpname}.${ext}`);
    }
});
var upload = multer({
    storage: storage
});
/**
 * @api {post} /file/upload  文件上传
 * @apiGroup File
 *
 * @apiParam {String} file  file.
 *
 */
Router.post('/upload', upload.single('magic_life'), (req, res) => {
    console.log(req.file)
    const fileDesc = req.file
    const exts = fileDesc.originalname.split('.')
    const ext = exts[exts.length-1]
    const mimetype = fileDesc.mimetype
    const buffer = fs.readFileSync(fileDesc.path);
    let Exif = null
    if(mimetype.indexOf('image') > -1){
        Exif = ExifImg( buffer )
    }
    console.log(ext,Exif)
    
    // fileDb.insertMany({
    //     fileName: fileDesc.filename,
    //     filePath: fileDesc.path,
    //     fieldname: fileDesc.fieldname,
    //     sufName: ext,
    //     mimetype: mimetype,
    //     size: fileDesc.size,
    //     createTime:fileDesc.createTime,
    //     Exif: Exif
    //     // file
    // })
    logs.info('[/upLoad] ',req.file)
    res.send({ code: 0, msg: 'ok', data: { imgPath: req.file.filename } })
})

module.exports = Router
