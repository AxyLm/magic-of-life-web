"use strict"
const auth = require("./account.config")
const config = {
    "dev": {
        NODE_ENV: "development",
        BASE_URL: "/life",
        SERVER_NAME: "magic-of-life-web",
        SERVER_PORT: "9233",
        DB_CLIENT: "mongodb://magic:123456@localhost:27017/magic-of-life-db",
        ROUTER_MAIN: "admin",  // 管理员账号 ，可以查询所有路由
        GLANSEURL: "http://gweb.frp.soulfree.cn/api/3/all",
        FRP_MONIT: "http://admin.frp.soulfree.cn/api",
    },
    "pro": {
        NODE_ENV: "production",
        BASE_URL: "/life",
        SERVER_NAME: "magic-of-life-web",
        SERVER_PORT: "9233",
        DB_CLIENT: "mongodb://localhost:27017/magic-of-life-db",
        ROUTER_MAIN: "admin",
        GLANSEURL: "http://gweb.frp.soulfree.cn/api/3/all",
        FRP_MONIT: "http://admin.frp.soulfree.cn/api",
    }
}
const env = process.argv[2] || "dev"

if (!config[env]) {
    throw "env is not found"
}

process.env = {
    // 原环境变量
    ...process.env,

    // 自定义配置
    ...config[env],

    // 账户类配置 不上传git
    ...auth[env],
}
module.exports = config[env]