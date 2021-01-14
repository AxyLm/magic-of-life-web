let express =require('express')
let Router = express.Router()
let spvModel =require('../db/model/spvModel')
let yy =require('../db/model/yy')
let multer= require('multer')
let fs = require('fs')

let common = require('../utils/common.js')

/**
 * @api {post} /scripture/infoSave  添加

 * @apiGroup scripture
 *
 * @apiParam {String} fileType  类型.
 * @apiParam {String} name  名称
 * @apiParam {String} fileInfo  文件详情
 *  @apiSuccessExample {json} 返回实列:
*
{
    "code":"0",
    "msg":"请求完成!",
    "data":{
        "path":"/public/scripturepavilion/1580221329533-5937.EXE",
        "originalname":"BANDIZIP-SETUP.EXE",
        "filename":"1580221329533-5937.EXE",
        "size":6545512
    }
}
 *
 */
Router.post('/infoSave',(req,res)=>{
    let {fileType,name,fileInfo} = req.body
    let depict = req.body.depict || null
    spvModel.insertMany({
        fileType,
        depict,
        name,
        fileInfo
    })
    .then((data)=>{
        return res.send({code:'0',msg:'添加成功!',data:fileInfo})
    })
    .catch((err)=>{
        console.log(err)
        return res.send({code:'-1',msg:'运行异常'})
    })
})

Router.post('/getInfoList',(req,res)=>{
    let {findType} = req.body
    spvModel.find({})
    .then((data)=>{
        if(findType === 'type'){
            let fileList = [];
            for (let i = 0; i < data.length; i++) {
              let obj = {
                type: data[i].fileType,
                list: []
              }
              fileList.push(obj)
            }
            fileList=removeRepeat(fileList)
            for (let u = 0; u < data.length; u++) {
                for (let k = 0; k < fileList.length; k++) {
                    if( data[u].fileType == fileList[k].type){
                        fileList[k].list.push(data[u])
                    }
                }
            }

            res.send({code:0,msg:'查询成功',data:fileList})
        }else if(findType === 'all'){
            res.send({code:0,msg:'查询成功',data:data})
        }else{
            res.send({code:-1,msg:'参数错误'})

        }
    })
    .catch((err)=>{
        console.log(err)
        res.send({code:-1,msg:'查询失败'})
    })
    function removeRepeat(arr) {
        let newArr = [arr[0]];
        for (let i = 1; i < arr.length; i++) {
          let repeat = false;
          for (let j = 0; j < newArr.length; j++) {
            if (arr[i].type === newArr[j].type) {
              repeat = true;
              break;
            } else {
            }
          }
          if (!repeat) {
            newArr.push(arr[i]);
          }
        }
        return newArr;
      }
})

/**
 * @api {post} /scripture/del  删除

 * @apiGroup scripture
 *
 * @apiParam {String} id  id.
 */

Router.post('/del',(req,res)=>{
    let {id}=req.body
    //单个删除  多个删除
    spvModel.deleteOne({_id:id})
    .then((data)=>{
        console.log(data)
        let {n,ok,deletedCount} = data
        if( n === 1 && ok === 1 && deletedCount === 1){
            res.send({code:0,msg:'删除成功'})
        }else{
            res.send({code:-2,msg:'删除失败'})
        }
    })
    .catch(()=>{
      res.send({code:-1,msg:'运行异常'})
    })
  }) 
  


/**
 * @api {post} /scripture/getFileList  文件树
 * @apiGroup scripture
 *
 * @apiParam {String} path  文件夹路径.
 *  @apiSuccessExample {json} 返回实列:
*{
    "code": "0",
    "msg": "请求完成!",
    "data": [
        {
            "size": "92.8MB",
            "mtime": "2019-11-08T12:48:38.411Z",
            "name": "08_ControlCenter.zip"
        }
    }
}
 *
 */
Router.put('/getFileList',(req,res)=>{
    let {path} = req.body
    let fileListAll = fs.readdirSync(path)
    let fileList = []
    for (let i = 0; i < fileListAll.length; i++) {
        let fileInfoAll = fs.statSync( path+'/'+fileListAll[i] )
        let fileInfo = new Object()
        fileInfo.name = fileListAll[i]
        fileInfo.size = common.bytesToSize(fileInfoAll.size)
        fileInfo.mtime = fileInfoAll.mtime
        fileList.push(fileInfo)
    }
    res.send({code:'0',msg:'请求完成!',data:fileList})
})



let storage = multer.diskStorage({
	destination: function(req, file, cb) {
    // 指定文件路径
		cb(null, './static/scripturepavilion')
	},
	filename: function(req, file, cb) {
    // 指定文件名
    // 文件名重复覆盖
    // 后缀名发生改变

    let exts=file.originalname.split('.')
    let ext=exts[exts.length-1]
    let tmpname=(new Date()).getTime()+'-'+parseInt(Math.random()*9999)
		cb(null, `${tmpname}.${ext}`);
	}
});
let upload = multer({
	storage: storage
});
/**
 * @api {post} /file/upload  文件上传
 * @apiGroup File
 *
 * @apiParam {String} file  file.
 *
 */
Router.post('/upload',upload.single('scrpture'),(req,res)=>{
    let types=['exe','zip','rar','msi','EXE'] //允许上传的数据类型
    let tmp=req.file.filename.split('.')[1]
    if(types.indexOf(tmp)==-1){
        fs.unlink('./static/scripturepavilion/'+req.file.filename,(err)=>{
        })
        return  res.send({code:-2,msg:'类型错误'})
    }else{
      let path = new Object()
      path.path= `/public/scripturepavilion/${req.file.filename}`
      path.originalname = req.file.originalname
      path.filename = req.file.filename
      path.size = req.file.size
      res.send({code:0,msg:'ok',data:path})
    }
  })

/**
 * @api {post} /scripture/getList  文档引用
 * @apiGroup File
 *
 *
 */
Router.post('/getList',(req,res)=>{
    let { name } = req.body
    yy.find({name})
    .then( (data)=>{
        console.log(data)
        res.send({code:0,msg:'查询ok',data:data})
    } )
    .catch(()=>{
        res.send({code:-1,msg:'查询失败'})
    })
})
module.exports=Router