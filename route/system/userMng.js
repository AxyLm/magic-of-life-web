const express = require('express')
const Router = express.Router()
const { roles, users } = require('../../db/model/users')
const logs = require('../../utils/log')
const EncryptUtil = require('../../utils/EncryptUtil')

const userModel = users
/**
 * @api {post} /user/getUserList 分页获取用户
 * @apiGroup 用户管理
 */
Router.post('/getUserList', (req, res) => {
    try {
        let pageSize = req.body.pageSize || 10 //设置默认值
        let pageIndex = (typeof req.body.pageIndex) == "number"?req.body.pageIndex : 1
        let count = 0
        users.find({}, '-_id -__v -passWord')
            .then((list) => {
                count = list.length //获取总的数据条数
                return users.find({}, '-_id -__v -passWord').limit(Number(pageSize)).skip(Number((pageIndex - 1) * pageSize)).sort({"createTime":1})
            })
            .then((data) => {
                // res.send({err:0,msg:'查询ok',list:data})
                let allpage = Math.ceil(count / pageSize)
                if (data) {
                    res.send({ code: 0, msg: '成功', data: data, count: count, allpage: allpage, pageIndex, pageSize })
                } else {
                    res.send({ code: -1, msg: '无数据' })
                }
            })
            .catch((error) => {
                logs.error('[/getUserList] ', error)
                res.send({ code: -1, msg: '查询失败' })
            })
    } catch (error) {
        logs.error('[/getUserList] ', error)
        res.send({ code: -1, msg: '运行异常' })
    }
})

/**
 * @api {post} /user/adduser 添加用户
 * @apiGroup 用户管理
 * @apiParam {string} account
 * @apiParam {string} usersName
 * @apiParam {string} password
 * @apiParam {string} role
 * @apiParam {string} phone
 * @apiParam {string} emile
 * @apiParam {string} avatar
 * @apiParam {number} uId
 */
Router.post('/adduser', (req, res) => {
    try {
        logs.info('[/adduser] ', req.body)
        let { usersName, password, role, phone, emile, avatar, account, uId } = req.body
        if(!usersName || !password || !role || !uId || !account){
            res.send({ code: -2, msg: '参数错误' })
            return
        }
        let now = (new Date).getTime()
        userModel.insertMany({
            usersName,
            uId:account,
            passWord: EncryptUtil.aesDecrypt(password),
            role,
            phone,
            emile,
            avatar,
            account,
            createTime: now })
            .then((data) => {
                res.send({
                    code: 0, msg: '添加成功',
                    data: { usersName, password, role, phone, emile, avatar, account }
                })
            })
            .catch((err) => {
                console.log(err)
                logs.error('[/adduser] 用户添加失败', err)
                res.send({ code: -1, msg: '用户添加失败' })
            })
    } catch (error) {
        logs.error('[/adduser] 运行异常', error)
        res.send({ code: -1, msg: '运行异常' })
    }
})
module.exports = Router
