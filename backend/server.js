require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const auth = require('./routes/auth');
const item = require('./routes/items');
const admin = require('./routes/admin');
const path = require('path');

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
    }   
}
connectDB();


const app = express();
app.use(express.json());
app.use(cors({
    origin: '*', // Allow requests from any domain
    methods: ['GET', 'POST', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/',item);
app.use('/auth',auth);
app.use('/admin',admin);
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
});