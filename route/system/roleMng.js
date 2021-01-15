const express = require('express')
const Router = express.Router()
const { roles } = require('../../db/model/users')
const rolesModel = roles
const logs = require('../../utils/log')


/**
 * @api {post} /role/getrole 获取所有角色
 * @apiGroup 角色管理
 */
Router.post('/getrole', (req, res) => {
    try {
        logs.info('[/getrole] ', req.body)
        const { rolecode, rolename } = req.body
        rolesModel.find({ rolecode: { $regex: rolecode }, rolename: { $regex: rolename } }, '-_id -_v')
            .then((data) => {
                if (data) {
                    if (req.body.type == 'list') {
                        let role = data
                        let visibleRoles = []
                        for (let i = 0; i < role.length; i++) {
                            const item = role[i];
                            visibleRoles.push(item.code)
                        }
                        res.send({ code: 0, msg: '成功', data: visibleRoles })
                    } else {
                        res.send({ code: 0, msg: '成功', data })
                    }
                } else {
                    res.send({ code: -1, msg: '无数据' })
                }
            })
    } catch (error) {
        logs.error('[/getrole] ', error)
        res.send({ code: -1, msg: '运行异常' })
    }
})

/**
 * @api {post} /role/addrole 添加角色
 * @apiGroup 角色管理
 * @apiParam {string} rolecode
 * @apiParam {string} rolename
 * @apiParam {string} remark
 */
Router.post('/addrole', (req, res) => {
    try {
        logs.info('[/addrole] ', req.body)
        let { rolecode, rolename, remark } = req.body
        rolesModel.findOne({ rolecode }, '-_id -_v')
            .then((data) => {
                if (data) {
                    res.send({ code: -2, msg: '重复的角色' })
                } else {
                    rolesModel.insertMany({ rolecode, rolename, remark })
                        .then((data) => {
                            res.send({
                                code: 0, msg: '添加成功',
                                data: { rolecode, rolename, remark }
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                            res.send({ code: -1, msg: '角色添加失败' })
                        })
                }
            })
    } catch (error) {
        logs.error('[/addrole] ', error)
        res.send({ code: -1, msg: '运行异常' })
    }
})

/**
 * @api {post} /role/delrole 删除角色
 * @apiGroup 角色管理
 * @apiParam {string} code
 * @apiParam {string} name
 * @apiParam {string} roles
 */
Router.post('/delrole', (req, res) => {
    try {
        logs.info('[/delrole] ', req.body)
        let { code, name, roles } = req.body
        rolesModel.deleteOne({ code: code })
            .then((data) => {
                res.send({
                    code: 0, msg: '删除成功', data: {
                        code, name, roles
                    }
                })
            })
            .catch(() => {
                res.send({ code: 404, msg: '删除失败' })
            })
    } catch (error) {
        logs.error('[/delrole] ', error)
        res.send({ code: -1, msg: '运行异常' })
    }
})

/**
 * @api {post} /role/editrole 修改角色信息
 * @apiGroup 角色管理
 * @apiParam {string} code
 * @apiParam {string} name
 * @apiParam {string} roles
 */
Router.post('/editrole', (req, res) => {
    try {
        logs.info('[/editrole] ', req.body)
        let { rolecode, rolename, remark } = req.body
        if (!rolecode || (!rolename && !remark)) {
            res.send({ code: 101, msg: '更新失败' })
            return
        }
        rolesModel.findOneAndUpdate(rolecode, { rolename, remark })
            .then((data) => {
                res.send({
                    code: 0, msg: '更新成功', data: {
                        rolecode, rolename, remark
                    }
                })
            })
            .catch(() => {
                res.send({ code: 404, msg: '更新失败' })
            })
    } catch (error) {
        logs.error('[/editrole] ', error)
        res.send({ code: -1, msg: '运行异常' })
    }
})

module.exports = Router
