import mongoose from "mongoose";
import mailSender from "../utils/nodemailer";

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        types:Date,
        default:Date.now(),
        expires: 5*60
    }
})

async function sendVerificationMail(email,otp){
    try {
        const sendMail = await mailSender(email,'Email Verification OTP',otp)
        console.log('mail send',sendMail)
    } catch (error) {
        console.log('error occur while mail',error.message)
        
    }
}

otpSchema.pre('save',async function(next){
    await sendVerificationMail(this.email, this.otp)
    next()
})


const OTP = mongoose.model('OTP', otpSchema)

export default OTP