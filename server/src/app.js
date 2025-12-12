require('dotenv').config()
const express = require('express');
const cookieParser=require('cookie-parser')
const cors = require('cors');
const { connectDb } = require('../services/databaseConnection');

//initializing express app/server
const app = express();

//connection MongoDB
connectDb()

//middlewares
app.use(express.json());
app.use(cookieParser(`${process.env.COOKIE_PARSER_SECRET_KEY}`));

//cors 
app.use(cors({
  origin: [`${process.env.CLIENT_URL}`],
  credentials: true,
}));


module.exports = app;
