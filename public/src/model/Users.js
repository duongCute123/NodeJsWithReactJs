var mongoose = require("mongoose")
var bcrypt=require("bcryptjs")
var Schema = mongoose.Schema;
const User = new Schema({
    fullName: { type: String },
    emailaddress: { type: String },
    passwork: { type: String },
    created: { type: Date }
})
module.exports=mongoose.model("User",User)