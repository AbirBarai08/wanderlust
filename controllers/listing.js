const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const fetch = require('node-fetch');


module.exports.index = async (req , res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs" , { allListings });
};

module.exports.renderNewForm = (req , res) => {
    res.render("listings/new.ejs");
};

module.exports.viewSearchListings = async (req , res) => {
    let { place } = req.query;
    
    // Find all listings that match any field
    let matchedListings = await Listing.find({
        $or: [
            { title: new RegExp(place, "i") },
            { location: new RegExp(place, "i") },
            { country: new RegExp(place, "i") },
            { state: new RegExp(place, "i") },
            { category: new RegExp(place, "i") }
        ]
    });
    if (matchedListings.length === 0) {
        req.flash("error", "Searched results do not exist");
        return res.redirect("/listings");
    }

    res.render("listings/view.ejs" , { allListings: matchedListings , place });
};

module.exports.showListing = async (req , res) => {
    let currUser = req.user;
    let { id } = req.params;
    let listing = await Listing.findById(id)
    .populate({ 
        path : "reviews" ,
        populate : { path : "author" }})
    .populate("owner");
    
    if(!listing) {
        throw new ExpressError(404 , "page not found");
    }
    res.render("listings/show.ejs" , { listing , currUser});
};

module.exports.catagoryListings = async (req , res) => {
    let { catagory } = req.query;
    let allListings = await Listing.find({});
    res.render("listings/catagory.ejs" , { allListings , catagory });
}

module.exports.createListing = async (req , res , next) => {
    const requestOptions = {
        method: 'GET',
    };
    const mapAPIKey = process.env.MAP_API_KEY;
    const encodedAddress = encodeURIComponent(req.body.listing.location , req.body.listing.state , req.body.listing.country);
    const URL = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${mapAPIKey}`;

    const response = await fetch(URL  , requestOptions);
    const data = await response.json();

    let url = req.file.path;
    let filename = req.file.filename;

    let listing = new Listing({
        ...req.body.listing,
        owner: req.user._id,
        image: { url , filename },
        geometry: {
            type: "Point",
            coordinates: data.features[0].geometry.coordinates
        }
    });

    await listing.save();

    req.flash("success" , "New listing created successfully!");
    res.redirect("/listings");
};

module.exports.editListing = async (req , res , next) =>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error" , "Listing you searched for doesn't exists");
        return res.redirect("/listings");
    }

    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload" , "/upload/w_250");

    res.render("listings/edit.ejs" , { listing , originalUrl });
};

module.exports.updateListing = async (req , res , next) => {
    const requestOptions = {
        method: 'GET',
    };
    const mapAPIKey = process.env.MAP_API_KEY;
    const encodedAddress = encodeURIComponent(req.body.listing.location , req.body.listing.state , req.body.listing.country);
    const URL = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${mapAPIKey}`;

    const response = await fetch(URL  , requestOptions);
    const data = await response.json();

    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing});

    //Update geometry coordinates
    if(data.features && data.features.length > 0) {
        listing.geometry = {
            type: "Point",
            coordinates: data.features[0].geometry.coordinates
        };  
    }

    // If a new image is uploaded, update the image field
    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url , filename };
    }

    await listing.save();

    req.flash("success" , "Listing updated successfully");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req , res , next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id , req.body.listing);
    req.flash("success" , "Listing deleted successfully");
    res.redirect("/listings");
};