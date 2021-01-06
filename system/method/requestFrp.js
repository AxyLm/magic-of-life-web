const axios = require('../../utils/axios')

module.exports = function (type) {
    if (!type || type == 'serverinfo') {

    } else {
        type = '/proxy' + type
    }
    let url = 'http://admin.frp.soulfree.cn/api' + type
    return axios({
        url: url,
        methods: 'get',
        auth: process.env.FrpAuth
    })
}