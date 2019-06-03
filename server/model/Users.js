const mongoose = require('mongoose')
// const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
    userName : String,
    plants : [{type: Schema.Types.ObjectId, ref: 'MyPlants'}] 

})

// userSchema.plugin(passportLocalMongoose)
const Users = mongoose.model("Users", userSchema)
module.exports = Users