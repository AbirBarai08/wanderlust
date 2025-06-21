const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { validateListing , isLoggedIn , isOwner } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

//Index And Create Route
router.route("/")
.get(wrapAsync(listingController.index))
.post(upload.single('listing[image]') , validateListing , wrapAsync(listingController.createListing));

//New Route
router.get("/new" , isLoggedIn , listingController.renderNewForm);

//View Route
router.get("/view" , isLoggedIn , wrapAsync(listingController.viewSearchListings));

//catagory Route
router.get("/search" , isLoggedIn , wrapAsync(listingController.catagoryListings));

//Show, Update, and Delete Route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn ,  isOwner , upload.single('listing[image]') , validateListing , wrapAsync(listingController.updateListing))
.delete(isLoggedIn , isOwner , wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit" , isLoggedIn , isOwner , wrapAsync(listingController.editListing));

module.exports = router;