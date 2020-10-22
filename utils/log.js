const log4js = require('log4js');
const path = require('path');

const config = {
    "appenders": {
        "consoleout": {
            "type": "file",
            "filename": "./log/app.log"
        }
    },
    "categories": {
        "default": {
            "appenders": [
                "consoleout"
            ],
            "level": "debug"
        }
    }
}

log4js.configure(config);

module.exports = log4js.getLogger()
