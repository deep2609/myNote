const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const crypto = require("crypto");

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


//Hashing password
userSchema.pre("save",async function(next){
    
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
})


//JWT Token

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

//Compare password

userSchema.methods.comparePassword = async function(givenPassword){

    return await bcrypt.compare(givenPassword,this.password);

}

//Generating password reset token

userSchema.methods.generatePasswordResetToken = function(){
    
    //Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}


module.exports = mongoose.model("User",userSchema);