const mongoose = require('mongoose');

//Notes Schema
const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
},{timestamps : true});

const notes = mongoose.model("Notes",notesSchema);
module.exports = notes ;