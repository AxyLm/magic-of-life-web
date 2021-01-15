const { loginMain } = require("../services/login")
const Joi = require("joi")

function login(req, res) {
    const loginScheme = Joi.object().keys({
        account: Joi.string().min(3).max(32).required(),
        password: Joi.string().min(3).max(32).required(),
    })
    const body = req.body
    const { error, value } = loginScheme.validate(body)
    if (error) {
        res.send({
            code: 5000,
            data: null,
            msg: "参数错误"
        })
    } else {
        loginMain(value)
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

function getMailCode(req, res) {

}

module.exports = {
    login,
    getMailCode
}