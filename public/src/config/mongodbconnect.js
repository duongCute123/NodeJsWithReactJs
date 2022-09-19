var mongosee = require("mongoose")
async function connect() {
    try {
        await mongosee.connect('mongodb://localhost:27017/mydb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Susscess nha ban")
    } catch (error) {
        console.log(error)
    }
}
module.exports={connect}