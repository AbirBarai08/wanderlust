const mongoose = require("mongoose");
const initData = require("./data.js");
const initReview = require("./comment.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

main()
.then(() => {
  console.log("connected to DB")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async() => {
  await Review.deleteMany({});

  // Add author to each review
  const reviewsWithAuthor = initReview.review.map(r => ({ ...r, author: "68479535db07ecfd2cfe0400" }));
  const insertedReviews = await Review.insertMany(reviewsWithAuthor);
  
  await Listing.deleteMany({});

  const reviewIds = insertedReviews.map(r => r._id);

  const listingWithReviews = initData.data.map(listing => ({
    ...listing , reviews: [...reviewIds]
  }));

  const listings = listingWithReviews.map((obj) => ({
    ...obj , owner: "68479535db07ecfd2cfe0400"
  }))

  await Listing.insertMany(listings);
  console.log("Data was initialized");
}

initDB();