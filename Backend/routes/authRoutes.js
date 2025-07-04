const express = require('express');
const router =  express.Router();
const user  = require('../models/userModel');
const { register , verifyOTP , resendOTP ,login , logout ,DashBoard } = require('../controllers/authController');
 const {isAuth}   = require('../middleware/authMiddleware');

router.get('/create' , (req,res)=>{
    res.send("Db isntance created")
});




router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', login);
router.post('/logout', logout);
router.post('/dashboard2',isAuth , DashBoard)
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