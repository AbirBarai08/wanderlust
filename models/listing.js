const mongoose = require("mongoose");
const Review = require("./reviews");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1744429523595-2c06b8611242?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDcwfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D",
            set : (v) => 
            !v || v.trim() === "" 
            ? "https://images.unsplash.com/photo-1744429523595-2c06b8611242?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDcwfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D" 
            : v
        }
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
        default: "India"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    catagory: {
        type: String,
        required: true,
        enum: ["rooms", "house", "cottage", "villa", "historic" , "bungalow", "beachfront" , "penthouse" , "farmhouse", "tent" , "treehouse", "castle", "cabin", "boat", "campervan", "yurt", "chalet", "studio", "loft", "mansion", "resort" , "trending" , "safari lodge" , "iconic cities" , "amazing pools" , "camping" , "farm" , "arctic" , "island" , "apartment" , "oasis" , "beach house", "others"]
    },
})

listingSchema.post("findOneAndDelete" , async(listing) => {
    if(listing) {
        await Review.deleteMany({ _id : { $in: listing.reviews }});
    }
})

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;
