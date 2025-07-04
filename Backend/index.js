const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.RUNNING_PORT ||8080;
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

// const allowedOrigin = 'http://localhost:5173';

// app.use(cors({
//   origin: allowedOrigin,
//   credentials: true, // Allow cookies, Authorization headers, etc.
// }));
app.use(cors());
app.use(express.json());

const db = require('./dbConnection/db');


app.get('/',(req,res)=>{
    res.send("backend running")
})
app.use('/auth',authRoutes);


app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`);
});