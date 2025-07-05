const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.RUNNING_PORT ||8080;
const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');
const cors = require('cors');
const db = require('./dbConnection/db');
const session = require('express-session');

// For deployment, set this to your deployed frontend URL
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: allowedOrigin,
  credentials: true, // Allow cookies, Authorization headers, etc.
}));

app.use(express.json());
app.use(session({
    secret : 'supersecretkey',
    resave :false,
    saveUninitilized : true,
    cookie : {secure : false}
}));

app.use('/api/auth',authRoutes);
app.use('/api/notes',notesRoutes);

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
