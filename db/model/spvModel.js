const mongoose = require('mongoose')

const data = new mongoose.Schema({
  name: { type: String, required: true },
  fileType: { type: String, required: false },
  depict: { type: Object, required: false },
  fileInfo: { type: Object, required: true },
});

module.exports = mongoose.model('spvInfos', data);