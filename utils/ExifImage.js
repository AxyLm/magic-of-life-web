const exif = require('jpeg-exif');
const logs = require('./log')

module.exports = function(data){
    try {
        return exif.parseSync(data);
    } catch (error) {
        logs.error(error)
    }
}