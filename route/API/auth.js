import express from "express";

const router = express.Router({ mergeParams: true });
router.use(express.json());
import authController from "../../controllers/authController";
import auth from "../../middleware/auth";
router.post('/login', authController.userLogin);
router.get('/me', auth.checkAuthAccess, authController.me);

module.exports = router;