import Category from "../models/Category.model"
// create Tag
export const createTag = async(req,res)=>{
    try {
        // name and des from body 
        const{name,description} = req.body

        // validation 
        if(!name || !description){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            })
        }
        // save the datat in 
        const categoryData = await Category.create({
            name,
            description
        })
        return res.status(200).json({
            message:"Tag created successfully",
            success:true,
            tagData
        })
    } catch (error) {
        console.log('tag created error',error.message)
        return res.status(500).json({
            message:'Tag creation failure! Please try again',
            success:false
        })
    }
}
// get all tag
export const getAllTag = async(req,res)=>{
    try {
        const allTags = await Category.find({},{name:true,description:true})
        if(!tagDetail){
            return res.status(400).json({
                message:'Tag data not found error',
                success:false
            })
        }
        return res.status(200).json({
            message:"All Tag data retrive successfully",
            success:true,
            allTags
        })
        
    } catch (error) {
        console.log('get tag errror',error.message)
        return res.status(500).json({
            message:'Retrive Tag data failure ! Please try again',
            success:false
        })
        
    }
}