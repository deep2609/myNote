const Note = require("../models/noteModel");
const catchAsyncError = require("../middleware/catchAsyncErrors");

// Get All Notes

exports.getAllNotes = catchAsyncError(async (req,res,next)=>{
    const notes = await Note.find();
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
        return res.status(404).json({
            success:false,
            message:"Note not found"
        })
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
        return res.status(404).json({
            success:false,
            message:"Note not found"
        });
    }

    await note.remove();
    res.status(200).json({
        success:true,
        message:"Deleted successfully"
    });
});