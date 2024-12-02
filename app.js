const express = require("express");
const bodyParser = require("body-parser");
const viewEngine = require("./config/viewEngine");
const initWebRoutes = require("./route/web");
const dotenv = require("dotenv");
const cronJobs = require("./job/cronjob");
const cors = require("cors");
const nodemailer = require("nodemailer");


// import express from "express";
// import bodyParser from "body-parser";
// import viewEngine from "./config/viewEngine";
// import initWebRoutes from "./route/web";
// import dotenv from "dotenv";
// import cronJobs from './job/cronjob'
// import cors from 'cors';
// import nodemailer from 'nodemailer';

const db = require("./models");
// const cors = require('cors');


dotenv.config();// required for running process.env.PORT
let app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use('/product-images', express.static('uploads/products'));
app.use('/request-files', express.static('uploads/requests'));
app.use('/category-logo', express.static('uploads/categoryLogos'));
cronJobs();
// app.use(cors({ origin: true }));
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
//config app
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(expressValidator());

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
initWebRoutes(app);

const args = process.argv;

const port = getValueByKey(args, 'sysport') || process.env.PORT || 3010

app.listen(port, () => {
    console.log('backend is running : ' + port);
})

function getValueByKey(arr, key) {
    const regex = new RegExp(`^${key}=(.*)$`);
    
    for (let i = 0; i < arr.length; i++) {
      const match = arr[i].match(regex);
      if (match) {
        return match[1];
      }
    }
    
    return null;
}