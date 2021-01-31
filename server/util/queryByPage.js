/**
 *
 *
 * @param {*} db
 * @param {*} param
 * @param {*} options
 * @return {*} 
 */
function queryByPage(db, param, options) {
    try {
        let { pageSize, pageIndex } = param
        pageSize = pageSize && (typeof pageSize) == "number" && pageSize != 0 ? pageSize : 10
        pageIndex = pageIndex && (typeof pageIndex) == "number" && pageIndex != 0 ? pageIndex : 1
        let count = 0

        let option = {
            dbParam: {},
            dbOption:""
        }
        if (typeof options == "string") {
            option.dbOption = options
        } else if (typeof options == "object") {
            option.dbParam = options.param ? options.param : {}
            option.dbOption =  options.option ? options.option : ""
        }
        return new Promise(function (resolve, reject) {
            db.find(option.dbParam, option.dbOption)
                .then((list) => {
                    count = list.length
                    return db.find(option.dbParam, option.dbOption).limit(Number(pageSize)).skip(Number((pageIndex - 1) * pageSize))
                })
                .then((data) => {
                    let allpage = Math.ceil(count / pageSize)
                    if (data) {
                        resolve({  list: data, count: count, allpage: allpage, pageIndex, pageSize })
                    } else {
                        resolve(null)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    } catch (error) {
        return Promise.reject(error)
    }
}
module.exports = {
    queryByPage
}