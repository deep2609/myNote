const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");


exports.isAuthenticatedUser = catchAsyncErrors( async (req,res,next)=>{
    let token = req.headers.cookie;
    
    if(!token){
        return next(new ErrorHander("Please login in to continue",401));
    }
    token = token.substring(6);
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
})