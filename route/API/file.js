// import express from "express";
// import FileController from "../../controllers/fileController";

const express = require('express');
const FileController = require( "../../controllers/fileController");
const router = express.Router({ mergeParams: true });
router.use(express.json());
router.post('/create-file', FileController.createFile);
router.get('/get-file/:id', FileController.getFile);
router.put('/update-file', FileController.updateFile);
module.exports = router;