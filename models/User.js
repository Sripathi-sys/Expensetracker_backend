const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({

    title:{type:String, required:true},

    amount:{type:Number}
})

module.exports=mongoose.model("User",userSchema);