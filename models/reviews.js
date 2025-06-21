const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        set: v => {
            if (!v) return Date.now();
            if (typeof v === "string" && v.trim() === "") return Date.now();
            return v;
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Review = mongoose.model("Review" , reviewSchema);
module.exports = Review;