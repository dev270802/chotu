const jwt=require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config');

exports.verify=async (req,res,next)=>{
    const token=req.header("token");
    try {
        if(!token){
            res.status(401).json({
                "msg":"Access denied"
            })
        }
        else{
            const isVerfied=jwt.verify(token,SECRET_KEY)
            if(isVerfied){
                req.user=isVerfied.username
                next()
            }
            else{
                res.status(401).json({
                    "msg":"Invalid Token"
                })
            }
        }
    } catch (error) {
        res.status(401).json({
            "msg":"Invalid Token"
        })
    }
}