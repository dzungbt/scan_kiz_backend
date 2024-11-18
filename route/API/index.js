// import express from "express";
// import productRoutes from "./product";
// import requestRoutes from "./request";
// import blogRoute from "./blog";
// import authRoutes from "./auth";
// import fileRoutes from "./file";
// import accountRoutes from "./account";
// import auth from "../../middleware/auth";

const express = require('express');
const productRoutes = require('./product');
const requestRoutes = require('./request');
const blogRoute = require('./blog');
const authRoutes = require('./auth');
const fileRoutes = require('./file');
const ocr = require('./ocr');
const accountRoutes = require('./account');
const auth = require('../../middleware/auth');

const router = express.Router({ mergeParams: true });

router.use(express.json());

router.use("/product", productRoutes);
router.use("/request", requestRoutes);
router.use("/blog", blogRoute);
router.use("/auth", authRoutes);
router.use("/file", auth.checkAuthAccess, fileRoutes);
router.use("/account", auth.checkAuthAccess, accountRoutes);
router.use("/ocr", auth.checkAuthAccess, ocr);

module.exports = router;
