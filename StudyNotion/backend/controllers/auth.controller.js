import User from "../models/user.model";
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
import OTP from "../models/OTP.model";
import Profile from "../models/Profile.model";
import otpGenerator from 'otp-generator'
import bcrypt from 'bcrypt'
config()


// send otp
export const otpGenerate = async(req,res)=>{
    try {
        // email from req body 
        const {email} = req.body
        // email validation
        if(!email){
            return res.status(400).json({
                message:"email is required",
                success: false
            })
        }
        // check email in user DB
        const checkUserPresent = await User.findOne({email})
        if(checkUserPresent){
            return res.status(401).json({
                message:"User already registered",
                suceess:false
            })
        }
        // generate OTP
        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        console.log("OTP generated",otp)

        // check otp is unique but this is bad code
        let result = await OTP.findOne({otp:opt})
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            result = await OTP.findOne({otp:otp})
        }
        const otpPayload = {email,otp}
        // create an entry in OTP
        const otpBody = await OTP.create(otpPayload)
        console.log('otp body', otpBody)

        // send response
        return res.status(200).json({
            message:'OTP send successfully',
            success:true
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message:"OTP generated error",
            suceess:false
        })
    }
}
// signup

export const createAcoount = async(req,res)=>{
    try {
        const{firstName,lastName,email,password,confirmPassword,role,otp} = req.body
        if(!firstName || !lastName || !email || !password || !confirmPassword || !role || !otp ){
            return res.status(401).json({
                message:'All fields are required',
                success:false
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                message:"Password does not match",
                success:false
            })
        }
        const checkUserPresent = await User.findOne({email})
        if(checkUserPresent){
            return res.status(400).json({
                message:"User already registered",
                suceess:false
            })
        }
        const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1)
        if(recentOtp.length  === 0){
            return res.status(400).json({
                message:'OTP not found',
                success:false
            })
        }

        if(recentOtp !== otp){
            return res.status(400).json({
                messgae:'invailid OTP',
                success:false
            })
        }
        const profileDetail = await Profile.create({
            gender:null,
            dateOfBirth:null,
            contactNumber:null,
            about:null

        })
        const hashPassword = await bcrypt.hash(password,10)

        const user  = await User.create({
            firstName,
            lastName,
            email,
            password:hashPassword,
            confirmPassword:hashPassword,
            role,
            additionDetail: profileDetail._id,
            image:`https://api.dicebear.com/5.x/initials/svg/seed=${firstName} ${lastName}`

        })

        return res.status(200).json({
            message:"User registered successfully",
            success:true,
            user
        })

    } catch (error) {
        console.log('signup error',error.message)
        return res.status(500).json({
            message:'User cannot be registered ! Please try again',
            success:false
        })
    }
}

// login
export const loginAccount = async(req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                message:'All fields are required',
                success:false
            })
        }
        const user = await User.findOne({email}).populate('additionDetails')
        if(!userCheck){
            return res.status(400).json({
                message:"User does not exist ! Please registere account",
                success:false
            })
        }
        const matchPassword = await bcrypt.compare(password,user.password)
        if(!matchPassword){
            return res.status(400).json({
                message:'Password does not match',
                success:false
            })
        }
        const tokenPayload = {
            id:user._id,
            email:user.email,
            role:user.role
        }
        const token = await jwt.sign(tokenPayload,process.env.SECRET_KEY,{expiresIn:'5h'})
        user.token = token
        user.password = undefined

        const options ={
            expires:new Date.now() + 3*24*60*60*1000,
            httpOnly:true
        }
        return res.cookie('token',token,options).status(200).json({
            message:"User logged in Successfully",
            success:true,
            user,
            token
        })
    } catch (error) {
        console.log('login error',error.message)
        return res.status(500).json({
            message:'Login Failure ! try again',
            success:false
        })
    }
}

// change Password
export const changePassword = async(req,res)=>{
    try {
        const {oldPassword,newPassword,confirmPassword} = req.body
        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(400).json({
                message:'All fields are required',
                success:false
            })
        }
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message:'passoword doest not match ! please try again',
                success:false
            })
        }
        const user = await User.findOne({email:req.user.email})
        if(!user){
            return res.status(400).json({
                message:'user not found ! please registered',
                success:false
            })
        }
        const isMatchPassword = await bcrypt.compare(oldPassword,user.password)
        if(!isMatchPassword){
            return res.status(400).json({
                message:'old password does not match',
                success:false
            })
        }
        const hashPassword = await bcrypt.hash(newPassword,10)

        await User.findOneAndUpdate(
                                    {email:req.user.email},
                                    {password:hashPassword,
                                    confirmPassword:hashPassword},
                                    {new:true})

        return res.status(200).json({
            message:"Password changed Successfully",
            success:true
        })
    } catch (error) {
        console.log('change password error',error.message)
        return res.status(500).json({
            message:'password change failure ! please try again',
            success:false
        })
    }
}