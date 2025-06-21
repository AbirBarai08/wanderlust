const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required(),
        catagory: Joi.string().required().valid("rooms", "house", "historic" , "cottage", "safari lodge" , "villa", "bungalow", "farmhouse", "tent" , "treehouse", "castle", "cabin", "boat", "campervan", "yurt", "chalet", "studio", "loft", "mansion", "resort" , "trending" , "iconic cities" , "amazing pools" , "camping" , "farm" , "arctic" , "island" , "apartment" , "oasis" , "beach house", "others"),
        image: Joi.object({
            filename: Joi.string().allow("", null),
            url: Joi.string().allow("", null),
        }).unknown(),
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
        createdAt: Joi.date().allow("", null),
    }).required()
})

module.exports.userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})