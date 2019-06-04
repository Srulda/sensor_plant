
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SensorSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  id: String,
  c: Number,
  h: Number,
  m: Number
});

const Sensor = mongoose.model("Sensor", SensorSchema);
module.exports = Sensor;

