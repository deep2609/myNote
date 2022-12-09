const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
// register a user
exports.registerUser = catchAsyncErrors( async(req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profileurl"
        }
    
    });
    
    sendToken(user,201,res);

});

//Login user

exports.loginUser = catchAsyncErrors( async (req,res,next) => {
    const {email,password} = req.body;

    //checking if user has given email and password both

    if(!email || !password){
        return next(new ErrorHander("Please enter email and password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401));
    }
    
    sendToken(user,200,res);


});

//Logout user

exports.logOut = catchAsyncErrors( async(req,res,next) => {
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:"Logged out",
    })
})


//Forgot password

exports.forgotPassword = catchAsyncErrors( async (req,res,next)=>{
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHander("User not found"),404);
    }

    //Get password reset token
    const resetToken = User.generatePasswordResetToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocal}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email, please ignore it.`

    try {
        await sendEmail({
          email:user.email,
          subject:`myNote Password Recovery`,
          message
        });

        res.status(200).json({
            success:true,
            message:"Email sent to ${user.email} successfully."
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHander(error.message,500));
    }
})