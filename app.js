import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectToDB from './database/db.js';
import auth from './routes/auth.js'
import notes from './routes/notes.js'

const app = express();
const port = process.env.PORT;

// connecting to Database
connectToDB();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// route
app.use('/auth', auth);
app.use('/notes', notes);

// home route
app.get('/', (req, res) => {
    res.send('Cloud Notebook');
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})