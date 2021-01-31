const Joi = require("joi")
const { getDataCodeByPageServices, addDataCodeServices, delDataCodeServices,getDataCodeServices } = require("../services/system")
function getDataCodeByPage(req, res) {
    let dataSchema = Joi.object().keys({
        code: Joi.string().max(32).empty('').default(''),
        data: Joi.string().max(32).empty('').default(''),
        vested: Joi.string().max(32).empty('').default(''),
        remark: Joi.string().max(32).empty('').default(''),
        pageSize: Joi.number().min(1).max(32).default(20),
        pageIndex: Joi.number().min(1).max(32),
        userAuth: Joi.object().required()
    })
    const { error, value } = dataSchema.validate(req.body)
    if (error) {
        res.send({
            code: 500,
            data: null,
            msg: "参数错误"
        })
    } else {
        getDataCodeByPageServices(value)
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.send(err)
            })
    }
}
function getDataCode(req, res) {
    let dataSchema = Joi.object().keys({
        code: Joi.string().max(32).empty('').default(''),
        data: Joi.string().max(32).empty('').default(''),
        vested: Joi.string().max(32).required(),
        remark: Joi.string().max(32).empty('').default(''),
        userAuth: Joi.object().required()
    })
    const { error, value } = dataSchema.validate(req.body)
    if (error) {
        res.send({
            code: 500,
            data: null,
            msg: "参数错误"
        })
    } else {
        getDataCodeServices(value)
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.send(err)
            })
    }
}
function addDataCode(req, res) {
    let dataSchema = Joi.object().keys({
        code: Joi.string().min(1).max(32).required(),
        data: Joi.string().min(1).max(32).required(),
        remark: Joi.string().min(1).max(128),
        vested: Joi.string().min(1).max(32),
        userAuth: Joi.object().required()
    })
    const { error, value } = dataSchema.validate(req.body)
    if (error) {
        res.send({
            code: 500,
            data: null,
            msg: "参数错误"
        })
    } else {
        addDataCodeServices(value)
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.send(err)
            })
    }
}
function delDataCode(req, res) {
    let dataSchema = Joi.object().keys({
        code: Joi.string().min(1).max(32).required(),
        data: Joi.string().min(1).max(32).required(),
        remark: Joi.string().min(1).max(128),
        vested: Joi.string().min(1).max(32).required(),
        userAuth: Joi.object().required()
    })
    const { error, value } = dataSchema.validate(req.body)
    if (error) {
        res.send({
            code: 500,
            data: null,
            msg: "参数错误"
        })
    } else {
        delDataCodeServices(value)
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }
}
module.exports = {
    getDataCode,
    addDataCode,
    delDataCode,
    getDataCodeByPage
}