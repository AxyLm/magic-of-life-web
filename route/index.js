const users = require('./users')
const login = require('./login')
const divers = require('./divers')
const monit = require('./monit')
const publicApi = require('./publicApi')
const file = require('./File/file')
const scripturepavilion = require('./scripturepavilion')
const { validateAuth } = require('../utils/Auth')

const userMng = require('./system/userMng')
const roleMng = require('./system/roleMng')
const frpMonit = require('./monit/frp')

module.exports = {
    init: function (app) {
        app.use(process.env.BASE_URL, login)
        app.use(process.env.BASE_URL + '/file', file)
        app.use(process.env.BASE_URL + '/users', validateAuth, users)
        app.use(process.env.BASE_URL + '/user', validateAuth, userMng)
        app.use(process.env.BASE_URL + '/role', validateAuth, roleMng)
        app.use(process.env.BASE_URL + '/soulfree', divers)
        app.use(process.env.BASE_URL + '/monit', validateAuth, monit)
        app.use(process.env.BASE_URL + '/monit', validateAuth, frpMonit)
        app.use(process.env.BASE_URL + '/scripturepavilion', scripturepavilion)
        app.use(process.env.BASE_URL + '/api/v1', publicApi)
    }
}
