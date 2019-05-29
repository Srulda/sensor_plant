const mongoose = require('mongoose')
const Schema = mongoose.Schema

let myPlantsSchema = new Schema({
    c: Number,
    h: Number
})


const MyPlants = mongoose.model("MyPlant", myPlantsSchema)
module.exports = MyPlants