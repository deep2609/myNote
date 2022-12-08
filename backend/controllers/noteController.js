const Note = require("../models/noteModel");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHander = require("../utils/errorhander");
// Get All Notes

exports.getAllNotes = catchAsyncError(async (req,res,next)=>{
    const apifeatures = new ApiFeatures(Note.find(),req.query).search();
    const notes = await apifeatures.query;
    res.status(200).json({
        success:true,
        notes
    })
});

// Create A Note

exports.createNote = catchAsyncError(async (req,res,next) => {
    const note = await Note.create(req.body);

    res.status(201).json({
        success:true,
        note
    })
});

// Update A Note

exports.updateNote = catchAsyncError(async (req,res,next) => {
    let note = await Note.findById(req.params.id);

    if(!note){
        return next(new ErrorHander("Note not found!!",404));
    }

    note = await Note.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });
    res.status(200).json({
        success:true,
        message:"Updated successfully",
        note
    })
});

// Delete a note

exports.deleteNote = catchAsyncError(async (req,res,next) => {
    let note = await Note.findById(req.params.id);
    if(!note){
        return next(new ErrorHander("Note not found!!",404));
    }

    await note.remove();
    res.status(200).json({
        success:true,
        message:"Deleted successfully"
    });
});