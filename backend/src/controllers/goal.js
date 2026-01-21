const {Goal} = require("../models/goal");

async function handelCreateGoal(req, res) {
  const {title, description} = req.body;
  try {
    if(!title || !description){
    return res.status(400).json({
      status:false,
        message:"Title and Description is Required!"
      })
    }
    const userGoal= await Goal.create({
      user:req.user.id,
      title,
      description,
      date: Date.now(),
    });
    return res.status(201).json({
      status:true,
      data:{
        name:req.user.name,
        data:userGoal,
      }
    });
  } catch (error) {
    console.log("Error in handelCreateGoal", error);
    return res.status(500).json({
      status:false,
      message:"Internal Server error",
    })
  }
}

async function handelTodayGoal(req, res) {
  try {
    const startDay= new Date();
    startDay.setHours(0,0,0,0);

    const endDay= new Date();
    endDay.setHours(23,59,59,999);

    const goal= await Goal.find({
      user:req.user.id,
      date:{$gte:startDay, $lte:endDay } //$get: greaterthanorEqualto
    }).sort({createdAt: 1});

    return res.status(200).json({
      status: true,
      data: goal,
    });
  } catch (error) {
    console.error("Error in handelTodayGoal:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}


module.exports={
  handelCreateGoal,
  handelTodayGoal
}