import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

// creating connection with database
const connectToDB = () => {
    mongoose.connect(DATABASE_URL, () => {
        console.log('Connected to Database Successfully...');
    })
}

export default connectToDB;