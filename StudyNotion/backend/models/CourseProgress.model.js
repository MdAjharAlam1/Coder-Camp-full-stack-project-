import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema({
    courseID:{
        types:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    completedVideo : [
        {
            types:mongoose.Schema.Types.ObjectId,
            ref:"SubSection"
        }
    ]
})

const CourseProgress = mongoose.model('CourseProgress',courseProgressSchema)

export default CourseProgress