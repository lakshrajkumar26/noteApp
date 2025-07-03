const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.RUNNING_PORT ||5000;
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

const db = require('./dbConnection/db');


app.get('/',(req,res)=>{
    res.send("backend running")
})
app.use('/api',authRoutes);


app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`);
});