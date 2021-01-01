const users = require('./users')
const login = require('./login')
const divers = require('./divers')
const monit = require('./monit')
const publicApi = require('./publicApi')
const file = require('./File/file')
const scripturepavilion = require('./scripturepavilion')
const {validateAuth} = require('../utils/Auth')

module.exports = {
    init:function(app){
        app.use('/life',login)
        app.use('/life/file',file)
        app.use('/life/users',validateAuth,users) // 缺少权限控制
        app.use('/life/soulfree',divers)
        app.use('/life/monit',monit)
        app.use('/life/scripturepavilion',scripturepavilion)
        app.use('/life/api/v1',publicApi)
    }
}
