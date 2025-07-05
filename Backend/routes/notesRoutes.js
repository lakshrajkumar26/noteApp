const express = require('express');
const router = express.Router();
const { createNote, getUserNotes, deleteNote } = require('../controllers/notesController');
const { isAuth } = require('../middleware/authMiddleware');

// All notes routes require authentication
router.use(isAuth);

// Create a new note
router.post('/create', createNote);

// Get all notes for the logged-in user
router.get('/all', getUserNotes);

// Delete a specific note
router.delete('/delete/:noteId', deleteNote);

module.exports = router; 