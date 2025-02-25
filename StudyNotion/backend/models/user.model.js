import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phoneNumber:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
        
    },
    role:{
        type:String,
        enum:["Student","Instructor","Admin"],
        required:true
    },
    image:{
        type:String,
        required:true

    },
    additionDetail:{
        types: mongoose.Schema.Types.ObjectId,
        ref:'Profile',
        required:true
    },
    courses :[
        {
            types:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ],
    courseProgress:[
        {
            types:mongoose.Schema.Types.ObjectId,
            ref:'CourseProgress'
        }
    ]

})

const User  = mongoose.model('User',userSchema)

export default User