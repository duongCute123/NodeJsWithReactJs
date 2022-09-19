var mongoose = require("mongoose")
var bcrypt=require("bcryptjs")
var Schema = mongoose.Schema;
const User = new Schema({
    fullName: { type: String },
    emailaddress: { type: String },
    passwork: { type: String },
    created: { type: Date }
})
User.method.comparePassword=function (password) {
    return bcrypt.compareSync(password,this.passwork)
}
module.exports=mongoose.model("User",User)