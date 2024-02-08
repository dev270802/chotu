const link=require('../models/linkModel')
const redisClient=require('../db/RedisDB')


exports.redirect=async (req,res)=>{
    const {shortUrl}=req.params
    try {
        const data=await link.find({shortUrl})
        console.log(shortUrl)
        console.log(data)
        if(data.length>0){
            const url=data[0].longUrl;
            //console.log(data.longUrl);
            redisClient.set(shortUrl,url,(err,reply)=>{
                if (err) {
                    console.error(`Error setting value in Redis: ${err}`);
                } else {
                    console.log(`Value set in Redis: ${reply}`);
                }
            })

            return res.status(200).redirect(url)
        }
        else{
            res.status(401).json({
                'msg':'no such url found'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(401).json({
            'msg':'error occured'
        })
    }
}
