import mongoose from "mongoose";
const ratingAndReviewsSchema = new mongoose.Schema({
    rating:{
        type:String,
        required:true
    },
    review:{
        types:String,
        required:true
    },
    userId:{
        types:mongoose.Schema.Types.ObjectId,
        ref:'User'
        
    }
})

const RatingAndReviews = mongoose.model('RatingAndReviews',ratingAndReviewsSchema)

export default RatingAndReviews