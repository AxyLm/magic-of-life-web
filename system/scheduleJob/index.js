var schedule = require('node-schedule');
var flag = "magicJob"
var Jobs = {};
module.exports = {
    startJob(spec, callback) {
        if (!spec) {
            return false
        }
        let name = flag + (new Date()).getTime()
        Jobs[name] = schedule.scheduleJob(spec, callback)
        return name
    },
    closeJob(name) {
        if (!name) {
            return false
        }
        Jobs[name].cancel()
        Jobs[name] = null;
    },
    queryJobs() {
        let joblist = []
        Object.keys(Jobs).forEach(item => {
            if (item) {
                joblist.push(item.toString())
            }
        })
        return joblist
    }
}

function scheduleCronstyle() {
    Jobs[flag+"1"] = schedule.scheduleJob('job_1', '30 * * * * *', function () {
        console.log('scheduleCronstyle:' + new Date());
    })
    Jobs[flag+"2"] = schedule.scheduleJob('job_2','35-40 * * * * *', function(){
        console.log( queryJobs() );
        if (Jobs[flag + "1"]) {
            Jobs[flag + "1"].cancel()
            Jobs[flag + "1"] = null
        }
    })


    console.log(Jobs[flag+"1"].name)
    // schedule.scheduleJob('1-10 * * * * *', function(){
    //     console.log('job_2:' + new Date());
    // });
}