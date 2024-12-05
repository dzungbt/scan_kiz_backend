const express = require('express');
const router = express.Router({mergeParams: true});
const {
    scanBySpaceOCR,
    scanByGoogleVisionOCR

}
    = require('../../controllers/ocrController');

router.post("/scan-1", express.json(), scanBySpaceOCR);
router.post("/scan-2", express.json(), scanByGoogleVisionOCR);

module.exports = router;