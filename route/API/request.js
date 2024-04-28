// import express from "express";
// import { uploads, uploadsExcel } from "../../multerconf";
// import SendMail from '../../utils/mail/sendMail';
// import requestController from "../../controllers/requestController";

const express = require('express');
const multerconf = require('../../multerconf');
const uploads = multerconf.uploads;
const uploadsExcel = multerconf.uploadsExcel;
const uploadsCategoryLogo = multerconf.uploadsCategoryLogo;
const SendMail = require('../../utils/mail/sendMail');
const requestController = require('../../controllers/requestController');

const router = express.Router({ mergeParams: true });
router.use(express.json());
router.post('/create-request', uploadsExcel("requests").array("fileSelected"), requestController.createNewRequest);
router.get('/get-all-request', requestController.getAllRequests);
router.put('/update-request-status', requestController.updateRequestStatus);
router.get('/find-request/:requestCode', requestController.findRequest);

module.exports = router;
