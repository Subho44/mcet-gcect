
const express = require('express');
const dotenv = require('dotenv');
const connectdb = require('./config/db');
const cors = require('cors');
const fundRoutes = require('./routes/fundRoutes')
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/funds',fundRoutes);
connectdb();
app.get('/',(req,res)=>{
    res.send('Api is running');
});
const PORT = process.env.PORT || 5800;
app.listen(PORT,()=>console.log('server is running port 5800'));