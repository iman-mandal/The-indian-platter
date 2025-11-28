const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
db();
const cors = require("cors");


// ===== Enable CORS =====
app.use(cors({
    origin: "http://localhost:5173",   // frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
const PORT = process.env.PORT;

//imports routes
const authRoutes=require('./routes/userRouters');
const menuRoutes=require('./routes/menuRoutes');
const orderRoutes=require('./routes/orderRouters');


app.use('/user',authRoutes);
app.use('/menu',menuRoutes);
app.use('/orders',orderRoutes);


app.listen(PORT, ()=>{
    console.log(`listening on http://localhost:${PORT}`);
})