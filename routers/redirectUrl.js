const express=require('express')
const  router=express.Router()
const redirectController=require('../controllers/redirectController')
const {cache}=require('../middleware/cache')

router.get('/:shortUrl',cache,redirectController.redirect);

module.exports=router;