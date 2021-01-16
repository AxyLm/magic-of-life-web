"use strict"
const env = process.argv[2] || "dev"

const config = {
    "dev": {
        NODE_ENV: "development",
        BASE_URL: "/life",
        SERVER_NAME: "magic-of-life-web",
        SERVER_PORT: "9233",
        DB_CLIENT: "mongodb://localhost:27017/magic-of-life-db",
        ROUTER_MAIN: "admin",  // 管理员账号 ，可以查询所有路由
        GLANSEURL: "http://gweb.frp.soulfree.cn/api/3/all",
        FRP_MONIT: "http://admin.frp.soulfree.cn/api",
        TOKEN_KEY: "0p9UD",
        FrpAuth: {
            username: 'admin',
            password: '123456'
        },
        eMail: {
            host: "smtp.qq.com",
            port: 465,
            user: 'awm3@vip.qq.com',
            pass: 'kyrsifqbiocxcade'
        }
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
        TOKEN_KEY: "0p9UD",
        FrpAuth: {
            username: 'admin',
            password: '123456'
        },
        eMail: {
            host: "smtp.qq.com",
            port: 465,
            user: 'awm3@vip.qq.com',
            pass: 'kyrsifqbiocxcade'
        }
    }
}
process.env = {
    ...process.env,
    ...config[env],
}
module.exports = config[env]