import Course from "../models/Course.model";
import Tag from "../models/Tag.model";
import User from '../models/user.model'

export const createCourse = async(req,res)=>{
    try {
        
        // fetch data
        const{courseName,courseDescription,whatWillYouLearn,price,tag} = req.body
        // thumnail
        const thumbnail = req.file.thumailImage

        // validation
        if(!courseName||
            !courseDescription ||
            !price ||
            !tag ||
            !whatWillYouLearn ||
            !thumbnail
        ){
            return res.status(400).json({
                message:'All fields are required',
                success:false
            })
        }
        const userId = req.user.id
        const instructorDeatail = await User.findById(userId)
        if(!instructorDeatail){
            res.status(400).json({
                message:'instructor detail not found',
                success:false
            })
        }
        
        
    } catch (error) {
        console.log('course creation error',error.message)
        return res.status(500).json({
            message:'Course Creation failure ! Please try again',
            success:false
        })
    }
}