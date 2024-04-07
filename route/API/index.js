import express from "express";
import productRoutes from "./product";
import requestRoutes from "./request";
import blogRoute from "./blog";
import authRoutes from "./auth";
import fileRoutes from "./file";
const router = express.Router({ mergeParams: true });

router.use(express.json());

router.use("/product", productRoutes);
router.use("/request", requestRoutes);
router.use("/blog", blogRoute);
router.use("/auth", authRoutes);
router.use("/file", fileRoutes);

module.exports = router;
