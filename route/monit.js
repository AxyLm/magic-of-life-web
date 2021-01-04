const express = require('express')
const Router = express.Router()
const axios = require('../utils/axios')
const logs = require('../utils/log')
const pm2 = require('pm2')
const colors = require('colors');

/**
 * @api {post} /monit/rpiMonit 获取树莓派运行状态
 * @apiGroup monit
 */
Router.post('/rpiMonit', (req, res) => {
    logs.info('[/rpiMonit] ', req.body)
    let url = 'http://gweb.frp.soulfree.cn/api/3/all'
    axios.get(url)
        .then(data => {
            logs.info('[/rpiMonit] 查询成功', url)
            res.send({ code: 0, msg: '查询成功', data })
        })
        .catch(error => {
            logs.error('[/rpiMonit] 运行异常', error)
            res.send({ code: 400, msg: '运行异常', data: null })
        })
})

/**
 * @api {post} /monit/frpMonit 获取frp服务端状态
 * @apiGroup monit
 */
Router.post('/frpMonit', (req, res) => {
    logs.info('[/frpMonit] ', req.body)
    let type = req.body.type
    if (!type || type == 'serverinfo') {

    } else {
        type = '/proxy' + type
    }
    let url = 'http://admin.frp.soulfree.cn/api' + type
    axios({
        url: url,
        methods: 'get',
        auth: {
            username: 'admin',
            password: '123456'
        }
    }).then((data) => {
        logs.info('[/frpMonit] 查询成功', url)
        res.send({ code: 0, msg: '查询成功', data })
    }).catch((err) => {
        logs.error('[/frpMonit] ', err)
        res.send({ code: 400, msg: '运行异常', data: null })
    })
})

/**
 * @api {post} /monit/pm2Monit 获取pm2运行状态
 * @apiGroup monit
 */
var pm2Start = false
pm2.connect(error => {
    if (!error) {
        console.log(colors.green('[pm2] connect success'))
        pm2Start = true
    } else {
        logs.error('[pm2] connect error ', error)
    }
})
Router.post('/pm2Monit', (req, res) => {
    logs.info('[/monit/pm2Monit] request', req.body)
    if (!pm2Start) {
        res.send({ res: -1, msg: 'pm2 error', data: null })
        return
    }
    pm2.list((e, list) => {
        let arr = []
        list.forEach(item => {
            let { status, username, pm_exec_path, exec_mode, pm_uptime, created_at, version, exec_interpreter } = item.pm2_env
            let data = {
                "pid": item.pid,
                "name": item.name,
                status, username, pm_exec_path, exec_mode, pm_uptime, created_at, version, exec_interpreter,
                ...item.monit
            }
            arr.push(data)
        })
        let sendMsg = { res: 0, msg: '成功', data: arr }
        logs.info('[/monit/pm2Monit] response', sendMsg)
        res.send(sendMsg)
    })
})

/**
 * @api {post} /monit/pm2/operation 操作pm2进程
 * @apiGroup monit
 */
Router.post('/pm2/operation', (req, res) => {
    logs.info('[/monit//pm2/operation] request', req.body)
    if (!pm2Start) {
        res.send({ res: -1, msg: 'pm2 error', data: null })
        return
    }
    let { type, pid } = req.body
    if (!type || (!pid && pid != 0)) {
        res.send({ res: -1, msg: '缺少参数', data: null })
        return
    }
    if (type == 'restart') {
        pm2.restart(pid, (error) => {
            if (error) {
                logs.error('[/monit/pm2/operation] restart', error)
                res.send({ res: -2, msg: '重启失败', data: null })
                return
            }
            let sendMsg = { res: 0, msg: pid+'重启成功', data: null }
            logs.info('[/monit/pm2/operation] response', sendMsg)
            res.send(sendMsg)
        })
    } else if (type == 'stop') {
        pm2.stop(pid, (error) => {
            if (error) {
                logs.error('[/monit/pm2/operation] stop', error)
                res.send({ res: -2, msg: '启动失败', data: null })
                return
            }
            let sendMsg = { res: 0, msg: pid+'已停止', data: null }
            logs.info('[/monit/pm2/operation] response', sendMsg)
            res.send(sendMsg)
        })
    } else {
        res.send({ res: -3, msg: '暂无', data: null })
    }
})
module.exports = Router
