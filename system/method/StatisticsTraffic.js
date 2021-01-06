const axios = require('../../utils/axios')
const moment = require('moment')
const baseUrl = process.env.FRP_MONIT
const frpAuth = process.env.FrpAuth
const { traffic } = require("../../db/model/frpModel")
const log = require("../../utils/log.js");
function queryFrp(query,now,dimension,list=[]) {
    return new Promise(function (resolve, reject) {
        axios({
            url: baseUrl + "/proxy/"+query,
            methods: 'get',
            auth: frpAuth
        }).then((res) => {
            res.proxies.forEach(item => {
                if (item) {
                    list.push({
                        dimension:dimension,
                        now:now,
                        name:item.name,
                        status:item.status,
                        in:item.today_traffic_in,
                        out:item.today_traffic_out
                    })
                }
            })
            resolve(list)
        })
    })
}
async function asyncGetAllFrp(time,dimension) {
    const tcp = await queryFrp("tcp",time,dimension)
    const http = await queryFrp("http", time,dimension)
    const list = tcp.concat(http)
    return list
}

function frpTrafficInsert(time,dimension) {
    time = moment(time).format('YYYY-MM-DD HH:mm:ss')
    asyncGetAllFrp(time,dimension).then((res) => {
        traffic.insertMany(res)
        log.info('[frp] traffic 更新',time)
    })
}

module.exports = {asyncGetAllFrp,frpTrafficInsert}