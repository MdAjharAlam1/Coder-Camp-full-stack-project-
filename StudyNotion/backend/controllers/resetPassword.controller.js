import User from "../models/user.model";
import mailSender from "../utils/nodemailer";
import bcrypt from 'bcrypt'


export const resetPasswordToken = async(req,res)=>{
    try {
        const {email}  = req.body
        if(!email){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"User doest not exists ! please create an account",
                success:false
            })
        }
        const token = crypto.randomUUID()
        
        const updatedDetails = await User.findOneAndUpdate(
                                                {email:email},
                                                {
                                                    token:token,
                                                    resetPasswordExpires : Date.now() + 5*60*1000   
                                                },{new:true})
        const url = `${process.env.FRONTEND_UL}reset-password/${token}`
        await mailSender(email,'Password Reset Link',`Password Reset Link:${url} `)

        return res.status(200).json({
            message:'Email sent successfully, please check email  and change password',
            success:true
        })
    } catch (error) {
        console.log('resety password error',error.message)
        return res.status(500).json({
            message:'resest password failure ! Please try again',
            success:false
        })
    }
}

export  const resetPassword = async(req,res)=>{
    try {
        const{token, newPassword, confirmPassword} = req.body 
        if(!token || !newPassword || !confirmPassword){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            })
        }
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message:"password does not match",
                success:false
            })
        }
        
        const userDetail = await User.findOne({token:token})
        if(!userDetail){
            return res.status(400).json({
                message:"token Invailid",
                success:false
            })
        }
        if(userDetail.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                message:"Token expired , please try again",
                success:false
            })
        }
        const hashPassword = await bcrypt.hash(newPassword,10)
        await User.findOneAndUpdate(
                                    {token:token},
                                    {
                                        password:hashPassword,
                                        confirmPassword:hashPassword
                                    },
                                    {new:true})

        return res.status(200).json({
            message:"Password reset successfully",
            success:true
        })

    } catch (error) {
        console.log('reset password error',error.message)
        return res.status(500).json({
            message:"Reset password failure",
            success:false
        })
    }
}