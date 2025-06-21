if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const user = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash"); 
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const dbUrl = process.env.ATLASDB_URL;

app.engine("ejs" , ejsMate);
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname , "/public")));
app.use(express.json());

//Connecting to MongoDB
main()
.then(() => {
    console.log("connected to DB")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

//Mongo store is almost as same as session to store data in online database server
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600, // time in seconds after which the session will be updated
    ttl: 7 * 24 * 60 * 60, // time to live
});

store.on("error" , () => {
    console.log("Database related error");
})

//Session options
//Session is used to store user data in the server side
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}

//Using session and flash middleware
app.use(session(sessionOptions));
app.use(flash());

//Passport for Authentication And Authorization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware for flash messages
app.use((req , res , next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user; // current user
    next();
})

app.get("/" , (req , res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs" , { allListings } );
})

//Routes
app.use("/listings" , listings);
app.use("/listings/:id/reviews" , reviews);
app.use("/user" , user);

//All routes that are not defined
app.all("/{*splat}" , (req , res) => {
    throw new ExpressError(404 , "Page not found");
});

//Error Handling Middleware
app.use((err , req , res , next) => {
    let { statusCode = 500 , message = "Something went wrong" } = err;
    res.status(statusCode).render("error" , { err });
})

//Server listening
app.listen(port , (req , res) => {
    console.log("app is now listening");
})
