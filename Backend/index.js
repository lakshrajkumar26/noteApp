const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.RUNNING_PORT ||8080;
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const db = require('./dbConnection/db');
const session = require('express-session');

// const allowedOrigin = 'http://localhost:5173';

// app.use(cors({
//   origin: allowedOrigin,
//   credentials: true, // Allow cookies, Authorization headers, etc.
// }));
app.use(cors());
app.use(express.json());
app.use(session({
    secret : 'supersecretkey',
    resave :false,
    saveUninitilized : true,
    cookie : {secure : false}
}));

app.use('/api/auth',authRoutes);


//testing
app.get('/',(req,res)=>{
    res.send("backend running")
})



app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`);
});