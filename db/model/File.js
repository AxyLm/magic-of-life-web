const mongoose = require('mongoose')
const DefaultScheme = {
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fieldname: { type: String, required: true },
    sufName: { type: String, required: false },
    downloadId: { type: String, required: false },
    md5: { type: String, required: false },
    createTime: { type: String, required: true },
    Exif: { type: Object, required: false },
    mimetype: { type: String, required: true },
    size: { type: Number, required: false}
}

const scheme = new mongoose.Schema(DefaultScheme);
const ImgScheme = new mongoose.Schema({
    ...DefaultScheme,
    exif: { type: Object, required: false },
});

module.exports = mongoose.model('Files', scheme)