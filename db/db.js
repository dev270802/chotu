const mongoose=require('mongoose');
const {MONGO_USER,MONGO_PASSWORD,MONGO_PORT,MONGO_IP
}=require('../config/config')

const mongoUrl=`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectDB=async ()=>{
    let isConnected = false;
    while (!isConnected) {
        try {
            await mongoose.connect(
                mongoUrl
        );
        isConnected = true;
        } catch (error) {
            console.error(error);
            await new Promise(resolve => setTimeout(resolve, 5000));
    }
    }
};

module.exports=connectDB;