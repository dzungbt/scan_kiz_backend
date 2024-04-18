import express from "express";
const router = express.Router({ mergeParams: true });
router.use(express.json());
import AccountController from "../../controllers/accountController";
router.get('/get-accounts', AccountController.getAccounts);
router.post('/create-account', AccountController.createAccount);
router.put('/update-account/:id', AccountController.updateAccount);
module.exports = router;