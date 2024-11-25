import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './route/userRoute.js';
import postRoute from './route/postRoute.js';
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

const app = express();
app.use(express.json());


app.use('/users', userRoute);
app.use('/posts', postRoute);

app.listen(process.env.PORT, () => {
    console.log('Server is running!');
})