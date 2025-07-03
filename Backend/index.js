const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.RUNNING_PORT ||5000;


app.get('/',(req,res)=>{
    res.send("backend running")
})

app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`);
});