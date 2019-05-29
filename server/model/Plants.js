const mongoose = require('mongoose')
const Schema = mongoose.Schema

let plantsSchema = new Schema({
    name: String,
    temperature_min: Number,
    temperature_max: Number,
    temp_for_growth: String,
    pH:String,
    water: String,
    width : String,
    height: String,
    planting_depth: String,
    fertilizer: String,
    harvest: String
})


const Plants = mongoose.model("Plants", plantsSchema)
module.exports = Plants