const express=require('express');
const shortUrlController=require('../controllers/shortUrlController')
const router=express.Router()
const {verify}=require('../middleware/verify.js')

router.post('/',verify,shortUrlController.shortUrl)
router.get('/',verify,shortUrlController.getAllUrl)

module.exports=router;