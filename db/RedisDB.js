const Redis=require('ioredis')

const { REDIS_PORT, REDIS_URL } = require('../config/config');
const redisClient=new Redis(`redis://${REDIS_URL}:${REDIS_PORT}`)

module.exports = redisClient;
