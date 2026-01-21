const express = require("express");
const router= express.Router();

const {handelCreateGoal, handelTodayGoal}= require("../controllers/goal");
const requireAuth= require("../middlewares/auth");

router.post("/",requireAuth, handelCreateGoal);

router.get("/today", requireAuth, handelTodayGoal)









module.exports= router;