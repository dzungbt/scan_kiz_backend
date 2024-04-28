// import express from "express";
// import { uploads, uploadsExcel } from "../../multerconf";
// import SendMail from '../../utils/mail/sendMail';
// import blogController from "../../controllers/blogController";

const express = require('express');
const SendMail = require('../../utils/mail/sendMail');
const blogController = require("../../controllers/blogController");
const router = express.Router({ mergeParams: true });
router.use(express.json());
router.post('/create-blog', blogController.createNewBlog);
router.get('/get-blog/:id', blogController.getBlogById);
router.get('/get-all-blog', blogController.getAllBlog);
router.put('/update-blog', blogController.updateBlog);

module.exports = router;