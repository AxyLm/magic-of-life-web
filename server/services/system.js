const { rejects } = require("assert")
const { resolve } = require("path")
const { dictionarys } = require("../model/system")
const logs = require('../../utils/log')
const { queryByPage } = require("../util/queryByPage")


function getDataCodeByPageServices(value) {
    return new Promise(function (resolve, reject) {
        let { code, vested, data, pageSize, pageIndex } = value
        queryByPage(dictionarys, { pageSize, pageIndex }, {
            param: {
                code: { $regex: code, $options: "i" },
                vested: { $regex: vested, $options: "i" },
                data: { $regex: data, $options: "i" },
            },
            option: "-_id"
        })
            .then(res => {
                resolve({
                    code: 0,
                    msg: "success",
                    data: res
                })
            }).catch(err => {
                logs.error('[getDataCodeByPageServices]', `数据字典查询失败${err}`)
                reject({
                    code: 400,
                    msg: "运行异常",
                    data: null
                })
            })
    })
}

function getDataCodeServices(value) {
    return new Promise(function (resolve, reject) {
        const { code, vested, data } = value
        dictionarys.find({
            code: { $regex: code, $options: "i" },
            vested: vested,
            data: { $regex: data, $options: "i" }
        }, "-_id")
            .then(res => {
                resolve({
                    code: 0,
                    msg: "success",
                    data: res
                })
            }).catch(err => {
                logs.error('[getDataCodeServices]', `数据字典查询失败${err}`)
                reject({
                    code: 400,
                    msg: "运行异常",
                    data: null
                })
            })
    })
}

function addDataCodeServices(value) {
    return new Promise(function (resolve, reject) {
        dictionarys.insertMany(value).then((res) => {
            if (res) {
                const { code, data, remark, vested } = res
                logs.info('[addDataCodeServices]', `数据字典新增成功${res}`)
                resolve({
                    code: 0,
                    msg: "添加成功",
                    data: { code, data, remark, vested }
                })
            } else {
                logs.error('[addDataCodeServices]', `数据字典新增失败${res}`)
                reject({
                    code: 401,
                    msg: "新增失败",
                    data: null
                })
            }
        }).catch((err) => {
            logs.error('[addDataCodeServices]', `数据字典新增失败${err}`)
            reject({
                code: 400,
                msg: "运行异常",
                data: null
            })
        })
    })
}

function delDataCodeServices(value) {
    return new Promise(function (resolve, reject) {
        const { code, data, remark, vested, userAuth } = value
        dictionarys.deleteOne({ code, data, remark, vested }).then((res) => {
            logs.info('[delDataCodeServices]', `${userAuth.account}删除数据字典${code},${data},${vested}成功`)
            resolve({
                code: 0,
                msg: "删除成功",
                data: { code, data, remark, vested }
            })
        }).catch((err) => {
            logs.error('[delDataCodeServices]', `数据字典删除失败失败${err}`)
            reject({
                code: 400,
                msg: "运行异常",
                data: null
            })
        })
    })
}
module.exports = {
    getDataCodeByPageServices,
    getDataCodeServices,
    addDataCodeServices,
    delDataCodeServices
}