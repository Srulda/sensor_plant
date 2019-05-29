const mongoose = require('mongoose')
const Schema = mongoose.Schema

let myPlantsSchema = new Schema({
    timestamp: { type: Date, default: Date.now},
    c: Number,
    h: Number,
    m: Number
})


const MyPlants = mongoose.model("MyPlants", myPlantsSchema)
module.exports = MyPlants