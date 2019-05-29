const mongoose = require('mongoose')
const Schema = mongoose.Schema

let myPlantsSchema = new Schema({
    c: Number,
    h: Number
})


const MyPlants = mongoose.model("MyPlants", myPlantsSchema)
module.exports = MyPlants