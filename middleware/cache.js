const redisClient=require('../db/RedisDB')


exports.cache=async (req,res,next)=>{
    const {shortUrl}=req.params
    try {
        const cacheData=await redisClient.get(shortUrl,(err,reply)=>{
            if (err) {
                console.error(`Error setting value in Redis: ${err}`);
              } else {
                console.log(`Value get in Redis: ${reply}`);
              }
        })
        if(cacheData){
            const longUrl=cacheData
            return res.status(200).redirect(longUrl)
        }
        else{
            next()
        }
    } catch (error) {
        next()
    }
}