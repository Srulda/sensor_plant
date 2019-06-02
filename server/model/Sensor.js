const mongoose = require('mongoose')
const Schema = mongoose.Schema

let sensorSchema = new Schema({
    timestamp: { type: Date, default: Date.now},
    c: Number,
    h: Number,
    m: Number
})


const sensor = mongoose.model("sensor", sensorSchema)
module.exports = sensor