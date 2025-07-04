const express = require('express');
const router =  express.Router();
const user  = require('../models/userModel');
const { register } = require('../controllers/authController');
 

router.get('/create' , (req,res)=>{
    res.send("Db isntance created")
});





router.post('/register', register)
//own

// router.post('/register', async (req ,res) =>{
//     try{
//           const newUser = await user.create({
//         email : req.body.email,
//         opt : req.body.otp,
//         isVerified : req.body.isVerified ,
//         googleId : req.body.googleId,
//     })

//     res.status(200).json({newUser});

//     }
//     catch(err){
//         console.log("error in creating user",err);
//         res.status(500).json(err);
//     }
  
// })

module.exports = router;