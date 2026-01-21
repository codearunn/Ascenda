const mongoose= require("mongoose");

const goalSchema= new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
  },
  title:{
    type:String,
    required:true,
    trim:true,
  },
  description:{
    type:String,
    required:true,
    trim:true,
  },
  completed:{
    type:Boolean,
    default:false,
  },
  // The day this goal belongs to (e.g. 2026-01-21)
  date:{
    type:Date,
    required:true,
  }
}, {timestamps:true});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = {
  Goal,
}