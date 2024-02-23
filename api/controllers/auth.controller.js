import user from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req,res,next) =>{
    const {username,email,password}= req.body;
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new user({username,email,password : hashedPassword})
    try {    
    await newUser.save()
    res.status(200).json({message:'user created successfully!'})
    } catch (error) {
        next(error)
    }
}

export const signin = async (req,res,next)=>{
    const {email,password}= req.body;
    try {
        const validUser = await user.findOne({email})
        if(!validUser) return next(errorHandler(404,'User not Found'))
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword) return next(errorHandler(403,'Wrong Credentials'))
        //add a token to the cookie of the browser
        const token = jwt.token({id:validUser._id},process.env.JWT_SECRET)
        const {password:hashedPassword,...rest} = validUser._doc
        const expiryDate = new Date(Date.now()+3600000); //1 hour
        res.cookie('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest)
    } catch (error) {
        next(error)
    }
}
