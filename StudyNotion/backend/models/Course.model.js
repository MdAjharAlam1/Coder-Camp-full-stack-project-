import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName:{
        types:String,
        required:true
    },
    courseDescription:{
        types:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    instructor:{
        types:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    whatYouWillLearn:{
        types:String,
    },

    courseContent:[
        {
            types:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            types:mongoose.Schema.Types.ObjectId,
            ref:'RatingAndReviews'
        }
    ],
    thumnail:{
        types:String,
        required:true
    },
    tag:{
        types:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    },
    studentEnrolled:[
        {
            types:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ]

})

const Course = mongoose.model('Course',courseSchema)

export default Course