import express from "express";
import productRoutes from "./product";
import requestRoutes from "./request";
import blogRoute from "./blog";
import authRoutes from "./auth";
import fileRoutes from "./file";
import accountRoutes from "./account";
const router = express.Router({ mergeParams: true });
import auth from "../../middleware/auth";

router.use(express.json());

router.use("/product", productRoutes);
router.use("/request", requestRoutes);
router.use("/blog", blogRoute);
router.use("/auth", authRoutes);
router.use("/file", auth.checkAuthAccess, fileRoutes);
router.use("/account", auth.checkAuthAccess, accountRoutes);

module.exports = router;
