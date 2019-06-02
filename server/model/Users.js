const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
    userName : String,
    plants : [{type: Schema.Types.ObjectId, ref: 'MyPlants'}] 

})

const Users = mongoose.model("Users", userSchema)
module.exports = Users