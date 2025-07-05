const User = require('../models/userModel');
require("dotenv").config();
const axios = require('axios');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_ID,
        pass: process.env.PASS
    }
})
// Gen OTP
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

//testing
const register = async (req, res) => {
    try {
        const searchedUser = await User.findOne({ email: req.body.email })  //diff

        if (searchedUser) return res.status(400).json({ message: "user already exist" });

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); //convert to milli 10 min expires

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            dob: req.body.dob,
            otp: otp,
            otpExpiry: otpExpiry,
            isVerified: req.body.isVerified,
            googleId: req.body.googleId,
        }) //user created send otp to verify

        await transporter.sendMail({
            from: process.env.USER_ID,
            to: req.body.email,
            subject: "OTP Verification",
            text: `Your OTP is ${otp}`,
        });


        res.status(201).json({ message: 'User registered. Please verify OTP send to gmail.' });

    }
    catch (err) {
        console.log("error in creating user", err);
        res.status(500).json({ message: "Error registering User", err });
    }

};

//Now V erify OTP

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) return res.status(400).json({ message: "User not Faound" });
        if (user.isVerified) return res.status(400).json({ message: "user already verified" });

        if (user.otp !== otp || user.otpExpiry < new Date()) {
            return res.status(400).json({ message: "Invalid or OTP expired" });
        }
        //then otp == otp undo all and save user to db
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save(); 

        res.json({ message: 'Email verified successfully. you can now log in' });
    }
    catch (err) {
        res.status(500).json({ message: "Error verifying OTP", err });
    }

};

const resendOTP = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(400).json({ message: "User not Found" });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();
        
        //otp chanded now mail
        await transporter.sendMail({
            from: process.env.USER_ID,
            to: req.body.email,
            subject: "Login OTP",
            text: `Your login OTP is : ${otp}`
        });

        res.json({ message: 'OTP sent successfully.' });
    }
    catch (err) {
  console.log(err);
  res.status(500).json({message : " error in sending OTP "});
    }
}
 //login 
const login = async(req,res) =>{
   try {
    const {email,password } = req.body;
    const user = await User.findOne({email : email});
    
    if(!user) return  res.status(400).json({message : "User not Found"});

    if(!user.isVerified){
        return res.status(400).json({message  : 'Email not Verified. Please verify OTP'});
    }

    // Check if password is actually OTP for verified users
    if(user.otp !== password || user.otpExpiry < new Date()) {
        return res.status(400).json({message : "Invalid or expired OTP"});
    }

    // Clear OTP after successful login
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    //storing in session key user 
    req.session.user = {id : user._id, email : user.email ,name : user.name };
    res.json({message : "Logged in Successfully"});    
   } catch (error) {
    res.status(500).json({message : 'Error in Logging In',error})
   }
}

const logout = (req,res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(500).json({message  : 'Error logging out'});
        res.json({message : "Logged out successfully"});
    });
};

//DashBoard (Protected Route)
const DashBoard = async(req,res) =>{
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({
        message: `welcome to the dashboard, ${req.session.user.name}`,
        user: {
            name: req.session.user.name,
            email: req.session.user.email
        }
    });
}

module.exports = { register , verifyOTP , resendOTP ,login , logout ,DashBoard };