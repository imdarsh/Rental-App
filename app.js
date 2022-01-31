const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db/connect');
const productRouter = require('./routes/productRoutes');
app.use(express.json());
const port = process.env.PORT || 3000;

// Routes
app.use('/api/v1/products', productRouter);


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