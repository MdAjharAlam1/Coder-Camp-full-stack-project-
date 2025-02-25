import express from 'express'
import { config } from 'dotenv'
import connectDB from './config/database.js'
config()

const app = express()

const PORT = process.env.PORT || 3000;

connectDB().then(()=>{
    console.log('database connection successfully')
    app.listen(PORT,()=>{
        console.log(`Server running on ${PORT}`)
    })
}).catch((error) => {
    console.log('database connection failed',error.meessage)
})