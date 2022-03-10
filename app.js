const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db/connect');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middleware/errorMiddleware');
const fileUpload = require('express-fileupload');
const path = require('path');

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.use(fileUpload());

app.get('/uploads/:image', (req,res) => {
    const { fileid } = req.params.image;
    res.sendFile(path.join(__dirname, "./uploads/"+fileid));
    // console.log(req.params.image);
    // res.sendFile(__dirname+'/uploads/'+{fileid});
}); 

const port = process.env.PORT || 4000;

// Router
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const authRouter = require('./routes/authRoutes');
const renterAuthRouter = require('./routes/renterAuthRoutes');
const res = require('express/lib/response');





// Routes
app.use('/api/v1', renterAuthRouter);
app.use('/api/v1', productRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1', userRouter);


// app.use(n`otFound);

app.use(errorHandler);

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