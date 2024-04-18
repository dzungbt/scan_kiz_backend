import express from "express";
const router = express.Router({ mergeParams: true });
router.use(express.json());
import FileController from "../../controllers/fileController";
router.post('/create-file', FileController.createFile);
router.get('/get-file/:id', FileController.getFile);
router.put('/update-file', FileController.updateFile);
module.exports = router;