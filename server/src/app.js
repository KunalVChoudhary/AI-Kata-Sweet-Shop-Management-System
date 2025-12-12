require('dotenv').config()
const express = require('express');
const cookieParser=require('cookie-parser')
const cors = require('cors');
const { connectDb } = require('../services/databaseConnection');

//Routes
const userRoute = require('../routes/user');

//initializing express app/server
const app = express();

//connection MongoDB
connectDb()

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors())
// //cors 
// app.use(cors({
//   origin: [`${process.env.CLIENT_URL}`],
//   credentials: true,
// }));

app.use('/',userRoute)


module.exports = app;
