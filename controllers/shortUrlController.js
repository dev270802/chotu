const link=require('../models/linkModel');
const shortner=require('../utils/shortUrl.js');



exports.shortUrl=async (req,res)=>{
    const {longUrl}=req.body;
    try {
        const data = await link.find({
            $and: [
                { username: req.user },
                { longUrl: req.body.longUrl }
              ]
          });
        if(data.length > 0){
            return res.status(200).json({
                "status":"success",
                "data":{data},
                "info":"already exist"
            })
        }
        let shortUrl=shortner.generateRandomString(7);
        let exist=await link.findOne({shortUrl});
        while(exist){
            shortUrl=await shortner.generateRandomString(7);
            exist=await link.findOne({shortUrl});
        }
        const newUrl=await link.create({
            shortUrl,
            longUrl,
            username:req.user,
            desc:req.body.desc
        })
        res.status(201).json({
            status:'success',
            newUrl:{newUrl}
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:'fail'
        })
    }
}
exports.getAllUrl=async (req,res)=>{
    try {
        const data=await link.find({username:req.user});
        if(!data){
            res.status(401).json({
                'status':'fail',
                'data':'no data'
            })
        }
        else{
            res.status(200).json({
                'status':'success',
                'data':{
                    data
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({
            'status':'fail',
            'data':'error'
        })
    }
}

