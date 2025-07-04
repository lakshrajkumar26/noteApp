const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    dob:{
        type:Date,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    otp: {
        type: String,
        default: "123456"
    },
    otpExpiry : { type : Date},
    isVerified: {
        type: Boolean,
        default: false,
    },
    googleId: {
        type: String,
        default: "NAN"
    }
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;