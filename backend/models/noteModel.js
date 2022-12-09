const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter a title"],
        maxLength:[20,"Title should be less than equal to 20 characters"],
    },
    content:{
        type:String,
        required:[true,"Please enter content"],
        maxLength:[500,"Content should be less than equal to 500 characters"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    importance:{
        type:Number,
        default:0,
        min:0,
        max:10
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    }

})

module.exports = mongoose.model("Note",noteSchema);