const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db/connect');
app.use(express.json());
const port = process.env.PORT || 3000;

// Router
const productRouter = require('./routes/productRoutes');
const authRouter = require('./routes/authRoutes');

// Routes
app.use('/api/v1', productRouter);
app.use('api/v1', authRouter);


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`Server is listening on port ${port}...`));
    }
    catch(error){
        console.log(error);
    }
}

start();