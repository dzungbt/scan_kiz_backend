// import express from "express";
// import AccountController from "../../controllers/accountController";

const express = require('express');
const AccountController = require("../../controllers/accountController");
const router = express.Router({ mergeParams: true });
router.use(express.json());
router.get('/get-accounts', AccountController.getAccounts);
router.post('/create-account', AccountController.createAccount);
router.put('/update-account/:id', AccountController.updateAccount);
module.exports = router;