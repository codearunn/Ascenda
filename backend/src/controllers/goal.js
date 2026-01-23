const {Goal} = require("../models/goal");
const {User} = require("../models/user");

// Streak calculation function
async function calculateUserStreak(userId) {
  try {
    // Get all completed goals for this user, sorted by date (newest first)
    const completedGoals = await Goal.find({
      user: userId,
      completed: true
    }).sort({ date: -1 });

    if (completedGoals.length === 0) {
      // No completed goals, reset streak
      await User.findByIdAndUpdate(userId, {
        currentStreak: 0,
        longestStreak: 0,
        lastCompletionDate: null
      });
      return { currentStreak: 0, longestStreak: 0 };
    }

    // Group goals by date to get unique completion dates
    const completionDates = [...new Set(
      completedGoals.map(goal => goal.date.toISOString().split('T')[0])
    )].sort((a, b) => new Date(b) - new Date(a)); // Sort newest first

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if user completed goals today or yesterday to continue streak
    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    let streakStartDate;
    if (completionDates.includes(todayStr)) {
      streakStartDate = today;
    } else if (completionDates.includes(yesterdayStr)) {
      streakStartDate = yesterday;
    } else {
      // No recent completions, streak is broken
      currentStreak = 0;
    }

    if (streakStartDate) {
      // Count consecutive days backwards from streak start date
      let checkDate = new Date(streakStartDate);
      
      for (const dateStr of completionDates) {
        const completionDate = new Date(dateStr);
        completionDate.setHours(0, 0, 0, 0);
        
        if (completionDate.getTime() === checkDate.getTime()) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else if (completionDate.getTime() < checkDate.getTime()) {
          // Gap found, streak ends
          break;
        }
      }
    }

    // Calculate longest streak in history
    let longestStreak = 0;
    let tempStreak = 0;
    let previousDate = null;

    // Sort completion dates chronologically for longest streak calculation
    const chronologicalDates = [...completionDates].reverse();
    
    for (const dateStr of chronologicalDates) {
      const currentDate = new Date(dateStr);
      
      if (previousDate === null) {
        tempStreak = 1;
      } else {
        const dayDifference = (currentDate - previousDate) / (1000 * 60 * 60 * 24);
        
        if (dayDifference === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
      
      previousDate = currentDate;
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // Update user's streak data
    const lastCompletionDate = completedGoals.length > 0 ? completedGoals[0].date : null;
    
    await User.findByIdAndUpdate(userId, {
      currentStreak,
      longestStreak,
      lastCompletionDate
    });

    return { currentStreak, longestStreak };
  } catch (error) {
    console.error("Error calculating user streak:", error);
    return { currentStreak: 0, longestStreak: 0 };
  }
}

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

    // Recalculate user streak after goal completion change
    await calculateUserStreak(req.user.id);

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

    // Get user streak data
    const user = await User.findById(req.user.id);
    const currentStreak = user.currentStreak || 0;
    const longestStreak = user.longestStreak || 0;

    // Calculate focus score based on recent performance
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    last7Days.setHours(0, 0, 0, 0);

    const last7DaysTotal = await Goal.countDocuments({
      user: req.user.id,
      date: { $gte: last7Days }
    });

    const last7DaysCompleted = await Goal.countDocuments({
      user: req.user.id,
      completed: true,
      date: { $gte: last7Days }
    });

    // Focus score calculation (0-10 scale)
    // Based on: completion rate (40%), current streak (30%), consistency (30%)
    const completionRate = last7DaysTotal === 0 ? 0 : (last7DaysCompleted / last7DaysTotal);
    const streakScore = Math.min(currentStreak / 7, 1); // Normalize to 0-1, 7+ days = max score
    
    // Consistency: how many of the last 7 days had at least one completed goal
    const daysWithCompletions = await Goal.aggregate([
      {
        $match: {
          user: req.user.id,
          completed: true,
          date: { $gte: last7Days }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }
          }
        }
      },
      {
        $count: "uniqueDays"
      }
    ]);

    const consistencyScore = daysWithCompletions.length > 0 ? (daysWithCompletions[0].uniqueDays / 7) : 0;
    
    const focusScore = Math.round(
      (completionRate * 0.4 + streakScore * 0.3 + consistencyScore * 0.3) * 10 * 10
    ) / 10; // Round to 1 decimal place

    // Calculate habits overview data
    const habitsOverview = await Goal.aggregate([
      {
        $match: {
          user: req.user.id,
          date: { $gte: last7Days }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            completed: "$completed"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          total: { $sum: "$count" },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$_id.completed", true] }, "$count", 0]
            }
          }
        }
      },
      {
        $project: {
          date: "$_id",
          completionRate: {
            $cond: [
              { $eq: ["$total", 0] },
              0,
              { $divide: ["$completed", "$total"] }
            ]
          }
        }
      }
    ]);

    const avgConsistency = habitsOverview.length > 0 
      ? Math.round(habitsOverview.reduce((sum, day) => sum + day.completionRate, 0) / habitsOverview.length * 100)
      : 0;

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
        streak: {
          current: currentStreak,
          longest: longestStreak
        },
        focusScore: {
          score: focusScore,
          status: focusScore >= 8 ? "Excellent" : focusScore >= 6 ? "Good" : focusScore >= 4 ? "Stable" : "Needs Focus"
        },
        habitsOverview: {
          consistency: avgConsistency,
          daysActive: daysWithCompletions.length > 0 ? daysWithCompletions[0].uniqueDays : 0,
          totalDays: 7
        }
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