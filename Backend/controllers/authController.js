
const user =require('../models/userModel');

const axios = require('axios');
const jwt = require("jsonwebtoken");
const  nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service :'gmail',
    auth : {
        user : 'lakshrajkumar.791.lrk@gmail.com',
        pass : 'dsagsadg'
    }
})
// Gen OTP
const generateOTP =() => crypto.randomInt(100000,999999).toString();  

//testing
const register = async(req ,res) =>{
    try{
        const searchedUser =  user.findOne({email : req.body.email})  //diff

        if(searchedUser) return res.status(400).json({message : "user already exist"});
        
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now()+ 10 * 60 * 1000); //convert to milli 10 min expires
        
        const newUser = await user.create({
        name : req.body.name,
        email : req.body.email,
        dob : req.body.dob,
        otp : otp,
        otpExpiry : otpExpiry,
        isVerified : req.body.isVerified ,
        googleId : req.body.googleId,
    }) //user created send otp to verify

    await transporter.sendMail({
        from : 'lakshrajkumar.791.lrk@gmail.com',
        to : req.body.email,
        subject : "OTP Verification",
        text : `Your OTP is ${otp}`,
    });


    res.status(201).json({message : 'User registered. Please verify OTP send to gmail.'});

    }
    catch(err){
        console.log("error in creating user",err);
        res.status(500).json({message : "Error registering User",err});
    }
  
};

//Now V erify OTP

module.exports = {register};