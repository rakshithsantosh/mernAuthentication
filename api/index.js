import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
dotenv.config();

mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("connected to MongoDB")
}).catch((error)=>{
    console.log(error)
});

const app = express()
app.use(express.json())

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})

//api route
app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    })
})