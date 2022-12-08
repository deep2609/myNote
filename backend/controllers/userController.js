const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

// Create an user
exports.createUser = catchAsyncErrors( async(req,res,next)=>{
    const user = await User.create(req.body);
    
    res.status(200).json({
        success:true,
        message:"User created successfully!"
    })

});