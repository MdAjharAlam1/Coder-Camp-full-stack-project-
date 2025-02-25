import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        types:String,
        required:true
    },
    description:{
        types:String,
    },
    course:[
        {
            types:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ]
}) 

const Category = mongoose.model('Tag',categorySchema)

export default Category