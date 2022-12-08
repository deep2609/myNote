const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please enter your name"],
        minLength:[1,"Name should have atleast 1 character"],
        maxLength:[30,"Name should have atleast 30 characters"],
    },
    email: {
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
        type:String,
        required: [true,"Please enter your password"],
        minLength: [8,"Please enter atleast 8 characters"],
        select: false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,


});

module.exports = mongoose.model("User",userSchema);