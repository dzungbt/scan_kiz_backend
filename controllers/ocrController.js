const axios = require('axios');
const FormData = require('form-data');
const ApiResponse = require('../helpers/apiResponse');
const { SPACE_OCR_API_KEY } = require('../config/api');

const OCR_BASE_URL = "https://api.ocr.space/parse/image";

const scanBySpaceOCR = async (req, res) => {
    const { base64 } = req.body;
    try {
        const headers = {
            'apikey': SPACE_OCR_API_KEY,
            "Content-Type": "multipart/form-data",
        };

        const formData = new FormData();
        formData.append('base64image', base64);
        formData.append('ocrengine', '2');

        const response = await axios.post(OCR_BASE_URL, formData, { headers });

        const result = response.data;

        if (result.ParsedResults && result.ParsedResults[0]?.ErrorMessage) {
            return ApiResponse.errorResponse(res, result.ParsedResults[0].ErrorMessage);
        }

        if (result.ParsedResults && result.ParsedResults[0]?.ParsedText) {
            return ApiResponse.successResponse(res, result.ParsedResults[0].ParsedText.replace(/\D/g, ''));
        }

        return ApiResponse.errorResponse(res, 'Không thể nhận dạng được văn bản');

    } catch (error) {
        console.log('---->OCR:', error);
        return ApiResponse.errorResponse(res, 'Một lỗi đã xảy ra, hãy thử lại');
    }
};

module.exports = {
    scanBySpaceOCR
};
