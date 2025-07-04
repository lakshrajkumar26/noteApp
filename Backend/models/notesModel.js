const mongoose = require('mongoose');

//Notes Schema
const notesSchema = new mongoose.Schema({

    
 
},{timestamps : true});

const notes = mongoose.model("Notes",notesSchema);
module.exports = notes ;