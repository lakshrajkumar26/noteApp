const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique :true
    },
    opt : {
         type : String,
    },
    isVerified :{
    type : Boolean,
    default : false,
    },
    googleId : {
        type : String  
    }
} ,{timestamps : true}) ;

const user =  mongoose.model('users',userSchema);
module.exports = user;