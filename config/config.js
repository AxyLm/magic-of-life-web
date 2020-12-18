"use strict"
const env = process.argv[2] || "dev"

const config = {
    "dev":{
        NODE_ENV: "development",
        SERVER_NAME:"magic-of-life-web",
        SERVER_PORT:"9233",
        dbclient:"mongodb://localhost:27017/magic-of-life-db",
        ROUTER_MAIN:"admin"
    },
    "pro":{
        NODE_ENV: "production",
        SERVER_NAME:"magic-of-life-web",
        SERVER_PORT:"9233",
        dbclient:"mongodb://localhost:27018/magic-of-life-db",
        ROUTER_MAIN:"admin"
    }
}
process.env = {
    ...process.env,
    ...config[env],
}
module.exports = config[env]