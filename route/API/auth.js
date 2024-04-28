// import express from "express";
// import authController from "../../controllers/authController";
// import auth from "../../middleware/auth";

const express = require('express');
const authController = require("../../controllers/authController");
const auth = require("../../middleware/auth");
const router = express.Router({ mergeParams: true });
router.use(express.json());
router.post('/login', authController.userLogin);
router.get('/me', auth.checkAuthAccess, authController.me);

module.exports = router;