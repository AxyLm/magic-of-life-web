const { routers, authRoules, roles, users } = require('../db/model/users')
const log = require("./log.js");
const { checkToken } = require('./jwt')
const EncryptUtil = require('./EncryptUtil')

function roleGetRouter(role, flag) {
    return new Promise((res, rej) => {
        try {
            if (!role) {
                rej('缺少参数')
            }
            routers.find({}).sort({ 'sequence': 1 })
                .then((data) => {
                    let routerList = bubbleSort(data)
                    roles.findOne({ rolecode: role }, '-_id rolecode rolename')
                        .then((data) => {
                            if (!data) {
                                rej('该用户未分配角色或角色不存在')
                            }
                            if (role === process.env.ROUTER_MAIN || 'admin') {
                                log.info('{' + role + '}[查询全部路由]')
                                authRoules.find().sort({ "sequence": 1 })
                                    .then((auth) => {
                                        let tree = getTree(flag, auth, routerList)
                                        const { rolecode, rolename } = data
                                        res({ tree, role: { rolecode, rolename } })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                        rej('查找角色权限失败')
                                    })
                            } else {
                                log.info('{' + role + '}[查询路由]')
                                authRoules.find({ visibleRoles: { $regex: data.code } }).sort({ "sequence": 1 })
                                    .then((auth) => {
                                        let tree = getTree(flag, auth, routerList)
                                        res({ tree, role: data })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                        rej('查找角色权限失败')
                                    })
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            rej('查找用户角色失败')
                        })
                })
        } catch (error) {
            console.log(error)
            rej('运行异常')
        }
    })
}
/**
 * 合成路由树tree
 * @param {Array} data 父级对应列表 
 * @param {Array} routerList 路由列表
 * @param {string} sid 
 * @param {string} parent 
 */
function getTree(flag, data = [], routerList, sid, parent = null) {
    const children = [];
    for (const i in data) {
        const node = data[i];
        if (((!parent && !node.parent) || node.parent === parent) && node.routerId !== sid) {
            let { title, route, path, icon, component, type } = getRouter(routerList, node.routerId, '_id')
            let id = node.routerId
            let { parent, sequence } = node
            if (flag && flag == 1) {
                children.push({
                    title, route, type, path, icon, component, sequence, parent, id, scopedSlots: ({ title: 'change' }),
                    children: getTree(flag, data, routerList, sid, node.routerId)
                });
            } else {
                children.push({
                    title, route, type, path, icon, component, sequence, parent, id,
                    children: getTree(flag, data, routerList, sid, node.routerId)
                });
            }
        }
    }
    return children.length ? children : null;
}

/**
 * 查出相应路由
 * @param {Array} arr 
 * @param {string} id 
 * @param {string} key 
 */
function getRouter(arr, id, key) {
    for (let index = 0; index < arr.length; index++) {
        const item = arr[index];
        if (item[key] == id) {
            return item
        }
    }
}

/**
 * 根据角色过滤 authRoute 表
 * @param {Array} authRoute 
 * @param {string} rule 
 */
function getAuthRoute(authRoute, rule) {
    let arr = []
    for (let i = 0; i < authRoute.length; i++) {
        const item = authRoute[i]
        if (item.visibleRoles.indexOf(rule) !== -1) {
            arr.push(item)
        }
    }
    return arr
}

/**
 * 冒泡排序
 * @param {Array} arr 
 * @param {string} key 
 */
function bubbleSort(arr, key) {
    if (!key) {
        key = "sequence"
    }
    let i = arr.length - 1;  //初始时,最后位置保持不变
    while (i > 0) {
        let pos = 0; //每趟开始时,无记录交换le
        for (let j = 0; j < i; j++)
            if (arr[j][key] > arr[j + 1][key]) {
                pos = j; //记录交换的位置
                let tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
            }
        i = pos; //为下一趟排序作准备
    }
    return arr;

}
function getAuth() {

}



function validateAuth(req, res, next) {
    let token = req.headers["authorization"]
    if (token) {
        checkToken(token)
            .then(res => {
                if (res.iat > res.exp) {
                    res.send({ code: 4997, msg: 'token过期' })
                } else {
                    req.body.userAuth = {
                        ...res.data
                    }
                    next()
                }
            }).catch((err) => {
                res.send({ code: 4996, msg: '权限异常' })
            })
    } else {
        res.send({ code: 4998, msg: '无权限' })
    }
}
module.exports = {
    roleGetRouter,
    validateAuth
}