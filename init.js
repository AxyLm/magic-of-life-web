const { routers, authRoules, roles, users } = require('./db/model/users')
const moment = require("moment")


async function createRole() {
    return await roles.insert({
        rolecode: "admin",
        rolename: "管理员",
        createTime: moment.now(),
    })
}
async function createUser() {
    return await users.insert({
        username: "管理员",
        account: "admin",
        userId: "0001",
        password: "0FA00516C7FA7350DED84B110C438F04",
        rolecode: "admin",
        avatar: null,
        phone: null,
        emile: null,
        createTime: moment.now(),
    })
}

createUser()
console.log("用户创建完成")
createRole()
console.log("角色创建完成")

