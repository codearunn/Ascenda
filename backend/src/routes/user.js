const express= require("express");
const router= express.Router();
const {HandelUserSignup, HandelUserlogin, getCurrentUser, HandelUserLogout}= require("../controllers/user");
const requireAuth= require("../middlewares/auth");

router.post("/signup", HandelUserSignup);

router.post("/login", HandelUserlogin);

router.get("/me",requireAuth, getCurrentUser);

router.post("/logout", HandelUserLogout);


module.exports= router;