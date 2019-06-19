const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserPlantSchema = new Schema({
  name: String,
  active: Boolean,
  activeSensor: String,
  stats: []
});

const UserPlant = mongoose.model("UserPlant", UserPlantSchema);
module.exports = UserPlant;
