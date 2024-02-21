import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
dotenv.config();

mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("connected to MongoDB")
}).catch((error)=>{
    console.log(error)
});

const app = express()

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})

//api route
app.use("/api/user",userRoute)