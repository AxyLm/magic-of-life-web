const { users } = require('../../db/model/users')
const EncryptUtil = require('../../utils/EncryptUtil')
const { roleGetRouter } = require('../../utils/Auth')
const Jwt = require('../../utils/jwt')
const logs = require('../../utils/log')

function loginMain(body) {
    const { account, password } = body
    return new Promise(function (resolve, reject) {
        users.findOne({ account }, "-_id -_v")
            .then((data) => {
                if (data) {
                    let encryptPs = EncryptUtil.Decrypt(data.password)
                    if (encryptPs == password) {
                        const { avatar, username, account, emile, phone, rolecode } = data
                        if (!rolecode) {
                            logs.warn('[/login] {', account, '}当前用户未分配角色')
                            reject({ code: 108, msg: '当前用户未分配角色', data: null })
                        }
                        roleGetRouter(rolecode)
                            .then((data) => {
                                logs.info('[/login] {', account, data + '}登录成功')
                                let resInfo = {
                                    account, username,
                                    avatar: avatar || null,
                                    phone: phone || null,
                                    emile: emile || null,
                                    ...data.role
                                }
                                logs.info(resInfo)
                                let token = (Jwt.creatToken(resInfo, 6000))
                                resolve({
                                    code: 0,
                                    msg: '登录成功',
                                    data: { ...resInfo, token }
                                })
                            })
                            .catch((err) => {
                                logs.warn('[/login] ', err)
                                reject({ code: 103, msg: "运行异常", data: null })
                            })
                    } else {
                        logs.warn('[/login] {', account, encryptPs + '}用户名或密码错误')
                        reject({ code: 107, msg: '用户名或密码错误', data: null })
                    }
                } else {
                    logs.warn('[/login]', '{', account, '}用户不存在')
                    reject({ code: 102, msg: '用户名或密码错误', data: null })
                }
            })
    })
}


module.exports = {
    loginMain,
}