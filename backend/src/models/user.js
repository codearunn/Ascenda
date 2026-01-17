const mongoose = require("mongoose");
const bcrypt= require("bcrypt");

const userSchema= mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true,
    minlength:2,
    maxlength: 50,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
  },
  password:{
    type:String,
    required:true,
    minlength:6,
  },
  profilePic:{
    type:String,
    default:"../public/images/default.jpeg",
  }
},{timestamps:true}//automatically adds CreatedAt and UpdatedAt
);

//Hashing Password
userSchema.pre("save", async function() {
  // "this" is the user document (user=this;)

  if (!this.isModified("password")) {
    // If password wasn't changed, do nothing
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
});

const User= mongoose.model("user", userSchema);

module.exports={
  User,
}