import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:String,
        required:true
    },
    about:{
        types:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true
    }
})

const Profile = mongoose.model('Profile',profileSchema)
export default Profile