const {User}= require("../models/user");
const bcrypt= require("bcrypt");
const {createTokenForUser}= require("../util/createToken");

async function HandelUserSignup(req, res) {
  const {name, email, password} = req.body;
  try {
    if(!name || !email || !password){
      return res.status(400).json({
        status:false,
        message:"All fields are mandatory",
      })
    }
    if(password.length<6){
      return res.status(400).json({
        status:false,
        message:"Password must be at least 6 characters long",
      })
    }
    const existingUser= await User.findOne({email});
    if(existingUser){
      return res.status(409).json({
        //409 = “Conflict” (standard for something like “this resource already exists”).
        status:false,
        message:"Email is already registered",
      })
    }
    const user=await User.create({
      name,
      email,
      password,
    });
    const token= createTokenForUser(user);
    return res.cookie("token", token).status(201).json({
      status:true,
      data:{
        id:user._id,
        name:user.name,
        email:user.email,
      },
    });
  } catch (error) {
    console.log("Error in HandelUserSignup", error);
    return res.status(500).json({
      status:false,
      message:"Internal Server error",
    })
  }
};

async function HandelUserlogin(req, res) {
  const {email, password} = req.body;
  try {
    if(!email || !password){
      return res.status(400).json({
        status:false,
        message:"All fields are mandatory",
      });
    }
    const user= await User.findOne({email});
    if(!user){
      return res.status(400).json({
        status:false,
        message:"Invalid email or password",
      })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token= createTokenForUser(user);
    return res.status(200).cookie("token",token).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error in HandelUserlogin", error);
    return res.status(500).json({
      status:false,
      message:"Internal Server error",
    });
  }
};

async function HandelUserLogout(req, res) {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // set true in production with HTTPS
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error in HandelUserLogout:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function getCurrentUser(req, res) {
  try {
    const user= await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}



module.exports= {
  HandelUserSignup,
  HandelUserlogin,
  getCurrentUser,
  HandelUserLogout
}