import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log('database connection not established',error.message)
        process.exit(1)
    }
}

export default connectDB