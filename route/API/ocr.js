const express = require('express');
const router = express.Router({mergeParams: true});
const {
    scanBySpaceOCR
}
    = require('../../controllers/ocrController');

router.post("/scan-1", express.json(), scanBySpaceOCR);

module.exports = router;