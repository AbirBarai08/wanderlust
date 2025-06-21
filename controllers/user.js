const User = require("../models/user.js");

module.exports.renderSignupForm = (req , res) => {
    res.render("users/signup.ejs");
};

module.exports.userSignup = async(req , res , next) => {
    try{
        let { username , email , password } = req.body;
        const newUser = new User({ username , email });
        const registeredUser = await User.register(newUser , password);
        req.login(registeredUser , (err) => {
            if(err) {
                return next(err)
            }
            req.flash("success" , "Wellcome to Wanderlust!");
            res.redirect("/listings");
        })
    } catch(err) {
        req.flash("error" , err.message);
        res.redirect("/user");
    }
};

module.exports.renderLoginForm = (req , res) => {
    res.render("users/login.ejs")
};

module.exports.userLogin = async(req , res) => {
    req.flash("success" , "Hello user , wellcome to wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.userLogout = (req , res , next) => {
    req.logOut((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success" , "You are successfully logged out");
        res.redirect("/listings");
    })
}