const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SensorSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  c: Number,
  h: Number,
  m: Number
});

const Sensor = mongoose.model("Sensor", SensorSchema);
module.exports = Sensor;
