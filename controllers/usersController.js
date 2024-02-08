const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const User =require('../models/userModel')
const {SECRET_KEY}=require('../config/config')
exports.signup=async (req,res)=>{
    try {
        const hashPassword=await bcrypt.hash(req.body.password,12)
        const newUser=await User.create({
            username:req.body.username,
            password:hashPassword
        })
        res.status(201).json({
            status:'success',
            data:{
                newUser
            }
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            status:'fail'
        })
    }
}
exports.login=async (req,res)=>{
    try {
        const user=await User.findOne({username:req.body.username});
        if(!user){
            res.status(401).json({
                status:'fail',
                error:"Username not found"
            })
        }
        else{
            const isCorrect=await bcrypt.compare(req.body.password,user.password)
            if(isCorrect){
                const token=await jwt.sign({username:user.username},SECRET_KEY,{expiresIn:86400})
                res.status(201).json({
                    status:'success',
                    token:token
                })
            }
            else{
                res.status(401).json({
                    status:'fail',
                    error:"Username or password wrong"
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({
            status:'fail'
        })
    }
}