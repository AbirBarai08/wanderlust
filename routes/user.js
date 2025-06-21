const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl , validateUser } = require("../middleware.js");

const userController = require("../controllers/user.js");

//signup get and post routes
router.route("/signup")
.get(userController.renderSignupForm)
.post(validateUser , userController.userSignup);

// User Login And Authentication Routes
router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl , passport.authenticate("local" , { failureRedirect: "/user/login" , failureFlash : true }) , userController.userLogin);

// User Logout
router.get("/logout" , userController.userLogout);

module.exports = router;