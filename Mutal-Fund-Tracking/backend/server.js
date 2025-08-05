
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Api is running');
});
const PORT = process.env.PORT || 5800;
app.listen(PORT,()=>console.log('server is running port 5800'));