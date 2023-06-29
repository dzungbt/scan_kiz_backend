import express from "express";
import productRoutes from "./product";
import requestRoutes from "./request";

const router = express.Router({ mergeParams: true });

router.use(express.json());

router.use("/product", productRoutes);
router.use("/request", requestRoutes);

module.exports = router;
