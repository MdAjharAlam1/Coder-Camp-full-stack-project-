import cloudinary from 'cloudinary'

const uploadImageToCloudinary = async(file,height,folder,quality)=>{
    try {
        const options = {folder}
        if(height){
            options.height = height
        }
        if(quality){
            options.quality = quality
        }
        options.resource_type ="auto";

        return await cloudinary.v2.uploader.upload(file.temFilePath,options)
    } catch (error) {
        console.log(error)
    }
}

export default uploadImageToCloudinary