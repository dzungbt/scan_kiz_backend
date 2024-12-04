const express = require("express");
const bodyParser = require("body-parser");
const viewEngine = require("./config/viewEngine");
const initWebRoutes = require("./route/web");
const dotenv = require("dotenv");
const cronJobs = require("./job/cronjob");
const cors = require("cors");
const nodemailer = require("nodemailer");

const db = require("./models");


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

app.use(bodyParser.json({ limit: '50mb' }));

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