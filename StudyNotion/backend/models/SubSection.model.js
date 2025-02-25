import mongoose from "mongoose";

const subSectionSchema = new mongoose.Schema({
    title:{
        types:String
    },
    timeDuration:{
        types:String,
    },
    description:{
        types:String
    },
    videoUrl:{
        types:String
    }
})

const SubSection = mongoose.model('SubSection',subSectionSchema)

export default SubSection