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
    const goalDate = new Date(req.body.date || Date.now());
    goalDate.setUTCHours(0, 0, 0, 0);

    const userGoal= await Goal.create({
      user:req.user.id,
      title,
      description,
      date: goalDate,
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
      status: false,
      message: "Internal server error",
    });
  }
}

async function handleToggleComplete(req, res) {
  const goalId= req.params.id;
  try {
    const goal= await Goal.findOne({
      _id:goalId,
      user:req.user.id,
    });

    if(!goal) {
      return res.status(404).json({
        status: false,
        message: "Goal not found",
      });
    }
    goal.completed=!goal.completed;

    await goal.save();

    return res.status(200).json({
      status:true,
      message:"toggled",
    })
  } catch (error) {
    console.log( "Error in handleToggleComplete", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}

async function handleDeleteGoal(req, res) {
  const goalId= req.params.id;
  try {
    const goal= await Goal.findOneAndDelete({
      _id:goalId,
      user:req.user.id,
    });

    if(!goal){
      return res.status(404).json({
        status:false,
        message:"Goal not Found",
      })
    }

    return res.status(200).json({
      status:true,
      message:"Goal Delete",
    })

  } catch (error) {
    console.log( "Error in handleDeleteGoal", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}

async function handleGetStats(req, res) {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

    const todayTotalGoals = await Goal.countDocuments({
      user: req.user.id,
      date: { $gte: today, $lt: tomorrow }
    });

    const todayCompletedGoals = await Goal.countDocuments({
      user: req.user.id,
      completed: true,
      date: { $gte: today, $lt: tomorrow }
    });

    // ex: getDate() → 24 & getDay()  → 3
    // setDate(24 - 3)
    // setDate(21) ==>  That moves the date back to Sunday of the same week.
    // Sun Jan 21 2026 00:00:00
    const startofWeek= new Date();
    startofWeek.setDate(startofWeek.getDate() - startofWeek.getDay());
    startofWeek.setHours(0,0,0,0);

    const weekTotalGoals= await Goal.countDocuments({
      user:req.user.id,
      date: {$gte: startofWeek},
    });
    const weekCompletedGoals= await Goal.countDocuments({
      user:req.user.id,
      completed:true,
      date: {$gte: startofWeek},
    });
    const weekCompletionPercentage= weekTotalGoals===0?0: Math.round((weekCompletedGoals/weekTotalGoals)*100);

    return res.status(200).json({
      status: true,
      data: {
        today: {
          total: todayTotalGoals,
          completed: todayCompletedGoals,
        },
        week: {
          total: weekTotalGoals,
          completed: weekCompletedGoals
        },
        weekCompletionPercentage,
      }
    });
  } catch (error) {
    console.error("Stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stats"
    });
  }
}
module.exports={
  handelCreateGoal,
  handelTodayGoal,
  handleToggleComplete,
  handleDeleteGoal,
  handleGetStats
}