//how to create own server

const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/',productRoutes);

app.get('/',(req,res)=>{
    res.json({message:"api runing in server"});
});

const port = 5600;
app.listen(port,()=>{
    console.log("server is running port 5600");
})
