const scheduleJob = require('../scheduleJob')
const { frpTrafficInsert } = require("./StatisticsTraffic")
const log = require("../../utils/log.js");

module.exports = function() {
    log.info('[job] start')

    // 每小时查询frp流量
    scheduleJob.startJob('0 0 * * * *', function () {
        frpTrafficInsert(new Date(), "h")
    })
    scheduleJob.startJob('0 0 2 * * *', function () {
        frpTrafficInsert(new Date(), 'd')
    } )
}