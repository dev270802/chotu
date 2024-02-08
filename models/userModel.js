const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide username"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please provide password"]
    },

});

userSchema.set('timestamps',true);
module.exports=mongoose.model('user',userSchema)