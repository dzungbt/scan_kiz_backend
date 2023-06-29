import express from "express";
import { uploads, uploadsExcel } from "../../multerconf";
import SendMail from '../../utils/mail/sendMail';
const router = express.Router({ mergeParams: true });
router.use(express.json());
import requestController from "../../controllers/requestController";
router.post('/create-request', uploadsExcel("requests").array("fileSelected"), requestController.createNewRequest);
router.get('/get-all-request', requestController.getAllRequests);
router.put('/update-request-status', requestController.updateRequestStatus);
router.get('/find-request/:requestCode', requestController.findRequest);


router.get('/email', async (req, res) => {
    let response = await SendMail.requestConfirm({
        email: 'thedung.1292@gmail.com',
        name: 'Bui The Dung',
        requestCode: 'ADAWW!#@ADAWDAW',
    });

    res.status(200).send(response);
})


module.exports = router;
