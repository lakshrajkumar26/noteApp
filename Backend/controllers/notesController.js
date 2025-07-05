const Notes = require('../models/notesModel');
const User = require('../models/userModel');

// Helper to get userId from session or email
async function getUserId(req) {
    if (req.session.user && req.session.user.id) {
        return req.session.user.id;
    }
    // For Auth0/Google users, expect email in body
    const email = req.body.email || req.query.email;
    if (email) {
        let user = await User.findOne({ email });
        if (!user) {
            // Create user if not exists (for Google login)
            user = await User.create({ email, isVerified: true, name: req.body.name || 'Google User' });
        }
        return user._id;
    }
    return null;
}

// Create Note
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = await getUserId(req);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newNote = await Notes.create({
            title,
            content,
            userId
        });

        res.status(201).json({ message: "Note created successfully", note: newNote });
    } catch (error) {
        console.log("Error creating note:", error);
        res.status(500).json({ message: "Error creating note", error });
    }
};

// Get all notes for a user
const getUserNotes = async (req, res) => {
    try {
        const userId = await getUserId(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }
        const notes = await Notes.find({ userId }).sort({ createdAt: -1 });
        res.json({ notes });
    } catch (error) {
        console.log("Error fetching notes:", error);
        res.status(500).json({ message: "Error fetching notes", error });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const userId = await getUserId(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }
        const note = await Notes.findOne({ _id: noteId, userId });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        await Notes.findByIdAndDelete(noteId);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        console.log("Error deleting note:", error);
        res.status(500).json({ message: "Error deleting note", error });
    }
};

module.exports = { createNote, getUserNotes, deleteNote }; 