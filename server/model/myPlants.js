const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MyPlantsSchema = new Schema({
    name : String,
})

const MyPlants = mongoose.model("MyPlants", MyPlantsSchema);
module.exports = MyPlants;
