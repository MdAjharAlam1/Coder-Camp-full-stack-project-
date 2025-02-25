import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    sectionName:{
        types:String,
        required:true
    },
    subSection:[
        {
            types:mongoose.Schema.Types.ObjectId,
            ref:'SubSection',
            required:true
        }
    ]
})

const Section = mongoose.model('Section', sectionSchema)

export default Section