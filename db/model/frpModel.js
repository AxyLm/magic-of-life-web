const mongoose = require('mongoose')

const trafficScheme = new mongoose.Schema({
    now: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    in: { type: Number, required: true },
    out: { type: Number, required: true },
    dimension: { type: String, required: false },
});

module.exports = {
    traffic: mongoose.model('frp_traffics', trafficScheme),
}