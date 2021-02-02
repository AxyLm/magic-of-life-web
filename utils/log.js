const log4js = require('log4js');
const path = require('path');

const config = {
    "appenders": {
        "dataFile":{
            "type": "dateFile",
            "filename": path.join(__dirname, '../log/app.log'),
        }
    },
    "categories": {
        "default": {
            "appenders": [
                "dataFile"
            ],
            "level": "debug"
        }
    }
}

log4js.configure(config);

module.exports = log4js.getLogger()
