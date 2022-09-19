var mongoose=require("mongoose")
var Schema=mongoose.Schema;
const SinhVien=new Schema({
    email: { type: String, maxLength: 255 },
    first_name: { type: String, maxLength: 255 },
    last_name: { type: String, maxLength: 255 },
})
module.exports=mongoose.model("Customer",SinhVien)