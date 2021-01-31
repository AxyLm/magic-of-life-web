
const mongoose = require('mongoose')

/** 数据字典 */
const dicSchema = new mongoose.Schema({
    code: { type: String, required: true },
    data: { type: String, required: true },
    remark: { type: String, required: false },
    vested: { type: String, required: true },
  }, { versionKey: false })

module.exports = {
    dictionarys:mongoose.model('dictionarys', dicSchema),
}