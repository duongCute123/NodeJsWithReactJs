var mongoose=require("mongoose")
var Schema=mongoose.Schema;
const Role=new Schema({
    role:{type:String}
})
module.exports=mongoose.model("Role",Role)