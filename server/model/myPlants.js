const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MyPlantsSchema = new Schema({

    name : String,
    // stats : [{type: Schema.Types.ObjectId, ref: 'Sensor'}],

})

const MyPlants = mongoose.model("MyPlants", MyPlantsSchema);
module.exports = MyPlants;
