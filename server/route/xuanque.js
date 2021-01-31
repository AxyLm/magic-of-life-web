const express = require('express')
const Router = express.Router()
const BannerModel = require('../model/tourismpic')
const ph = require('path')
const { queryByPage } = require("../util/queryByPage")

const imgSize = require('image-size')

/**
 * @api {post} /Banners/query  查询 [全部]
 
 * @apiGroup Banners
 *  @apiSuccessExample {json} 返回实列:
*   {
    "code": 0,
    "msg": "查询ok",
    "data": [
        {
            "_id": "5dc7acfb69a67d3d68245196",
            "imgPath": "axy",
            "type": "123",
            "__v": 0
        },
        {
            "_id": "5dd8259f9eb18b4590b6647e",
            "imgPath": "tes",
            "type": "tes2",
            "__v": 0
        }
    ]
}
 */
Router.post('/query', (req, res) => {
    BannerModel.find({})
        .then((data) => {
            res.send({ code: 0, msg: '查询ok', data: data })
        })
        .catch(() => {
            res.send({ code: -1, msg: '查询失败' })
        })
})


/**
 * @api {post} /Banners/add  添加

 * @apiGroup Banners
 *
 * @apiParam {String} imgPath  图片路径.
 * @apiParam {String} type  图片类型
 *  @apiSuccessExample {json} 返回实列:
*     {
        "code": 0,
        "msg": "添加成功",
        "data": {
            "imgPath": "tes",
            "type": "tes2"
        }
      }
 * 
 */
Router.post('/picAdd', (req, res) => {
    let { path } = req.body
    // 判断参数是否正确   
    let { width, height } = imgSize(ph.join(__dirname, '../../static/xuanque/' + path))
    BannerModel.insertMany({ path, width, height, ratio: (width / height).toFixed(3) })
        .then((data) => {
            res.send({
                code: 0,
                msg: '添加成功',
                data: {
                    path, width, height
                }
            })
        })
        .catch((err) => {
            res.send({ code: -1, msg: '添加失败' })
        })
})


/**
 * @api {post} /Banners/updata  修改
 
 * @apiGroup Banners
 *
 * @apiParam {String} imgPath  图片路径.
 * @apiParam {String} type  图片类型.
 * @apiParam {String} id  图片id
*  @apiSuccessExample {json} 返回实列:
*     {
        code:0,
        msg:'修改成功',
        data:{
          imgPath:imgPath,
          type:type
        }
      }
 * 
 */
Router.post('/updata', (req, res) => {
    let { imgPath, type, id } = req.body
    BannerModel.updateOne({ _id: id }, { imgPath, type })
        .then((data) => {
            res.send({
                code: 0, msg: '修改成功', data: {
                    imgPath: imgPath,
                    type: type
                }
            })
        })
        .catch((err) => {
            res.send({ code: -1, msg: '修改失败' })
        })
})


/**
 * @api {post} /Banners/getInfoByPage  查询 分页
 * 
 * @apiGroup Banners
 *
 * @apiParam {String} pageSize  每页条数
 * @apiParam {String} page  页码1++
 *  @apiSuccessExample {json} 返回实列:
*    {
      "code": 0,
      "msg": "查询成功",
      "data": {
          "banerList": [
              {
                  "_id": "5dd825ca9eb18b4590b6647f",
                  "imgPath": "tes",
                  "type": "tes2",
                  "__v": 0
              }
          ],
          "allSize": 3,
          "allPage": 2,
          "page": "2",
          "pageSize": "2"
      }
    }
 */
Router.post('/getInfoByPage', (req, res) => {
    let pageSize = req.body.pageSize || 5 //设置默认值
    let pageIndex = req.body.pageIndex || 1
    queryByPage(BannerModel, { pageSize, pageIndex }, "-_id -__v")
        .then((data) => {
            res.send({ code: 0, msg: '查询成功', data })
        })
        .catch((err) => {
            console.log(err)
            res.send({ code: -1, msg: '查询失败' })
        })
})
//   end=======================






module.exports = Router