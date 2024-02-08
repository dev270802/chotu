const mongoose=require('mongoose');

const linkSchema=mongoose.Schema({
    longUrl:{
        type:String,
        required:[true,"Please provide a url"]
    },
    shortUrl:{
        type:String,
        unique:true
    },
    desc:{
        type:String,
    },
    username:{
        type:String,
        required:[true,"Please Provide a username"]
    },
    count:{
        type:Number,
        default:0
    }
});

linkSchema.set('timestamps',true);

module.exports=mongoose.model('link',linkSchema);