const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.RUNNING_PORT ||8080;
const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');
const cors = require('cors');
const db = require('./dbConnection/db');
const session = require('express-session');

// For deployment, set this to your deployed frontend URL (no trailing slash!)
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: allowedOrigin,
  credentials: true, // Allow cookies, Authorization headers, etc.
}));

app.use(express.json());
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,      // Only send cookie over HTTPS (required for Vercel/Render)
        sameSite: 'none'   // Allow cross-site cookies (required for Vercel/Render)
    }
}));

app.use('/api/auth',authRoutes);
app.use('/api/notes',notesRoutes);

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

//testing
app.get('/',(req,res)=>{
    res.send("backend running")
})

app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`);
});
