"use strict"
const env = global.appenv

const config = {
    "dev":{
        SERVER_NAME:'magic-of-life-web',
        SERVER_PORT:'9233',
        dbclient:"mongodb://localhost:27017/magic-of-life-db"
    },
    "pro":{
        SERVER_NAME:'magic-of-life-web',
        SERVER_PORT:'9233',
        dbclient:"mongodb://localhost:27018/magic-of-life-db"
    }
}

module.exports = config[env]