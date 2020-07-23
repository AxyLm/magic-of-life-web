const mongoose = require('mongoose')
let scheme = new mongoose.Schema({
    hash: { type: String, require: true },
    path: { type: String, required: true },
    size: { type: String, require: true },
    mimetype: { type: String, require: true },
    originalname: { type: String, require: false },
    createTime: { type: String, required: true, default: nowDate() },
});
function nowDate() {
    let time = new Date()
    return time.getTime()
}
// 将schema 对象转化为数据模型

//该数据对象和集合关联('集合名',schema对象)

module.exports = mongoose.model('temporary', scheme);