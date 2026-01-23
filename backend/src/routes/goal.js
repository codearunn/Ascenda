const express = require("express");
const router= express.Router();

const {handelCreateGoal,
        handelTodayGoal,
        handleToggleComplete,
        handleDeleteGoal,
        handleGetStats}= require("../controllers/goal");
const requireAuth= require("../middlewares/auth");

router.post("/",requireAuth, handelCreateGoal);

router.get("/today", requireAuth, handelTodayGoal);

router.patch("/:id/toggle", requireAuth, handleToggleComplete);

router.delete("/:id", requireAuth, handleDeleteGoal);

router.get("/stats", requireAuth, handleGetStats);





module.exports= router;