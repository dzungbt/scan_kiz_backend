const axios = require('axios');
const FormData = require('form-data');
const ApiResponse = require('../helpers/apiResponse');
const { SPACE_OCR_API_KEY, GOOGLE_API_KEY } = require('../config/api');

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

const scanByGoogleVisionOCR = async (req, res) => {
    const { base64 } = req.body;

    // remove prefix: data:image/jpeg;base64,
    // jpeg, png
    const base64Data = base64.replace(/^data:image\/(png|jpeg);base64,/, "");

    try {
        const headers = {
            'Content-Type': 'application/json',
        }

        const data = {
            requests: [
                {
                    image: {
                        content: base64Data
                    },
                    features: [
                        {
                            type: 'TEXT_DETECTION',
                            maxResults: 1
                        }
                    ]
                }
            ]
        }
        const url = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`;
        const response = await axios.post(url, data, { headers });

        const result = response.data;

        if (result.responses && result.responses[0]?.textAnnotations) {
            const textAnnotations = result.responses[0].textAnnotations;

            // Duyệt qua tất cả các phần tử trong textAnnotations
            const numericDescriptions = textAnnotations
                .filter((annotation) => {
                    // Kiểm tra nếu "description" là một chuỗi chỉ chứa dãy số
                    return /^[0-9]+$/.test(annotation.description);
                })
                .map((annotation) => annotation.description);

            console.log("Các dãy số tìm được:", numericDescriptions);

            if (numericDescriptions.length > 0) {
                const combinedNumber = numericDescriptions.join('');
                return ApiResponse.successResponse(res, combinedNumber);
            }
        }

        return ApiResponse.errorResponse(res, 'Không thể nhận dạng được văn bản');

    }catch (e) {
        console.log('---->OCR:', e);
        return ApiResponse.errorResponse(res, `Exception: ${e}`);
    }
}

module.exports = {
    scanBySpaceOCR,
    scanByGoogleVisionOCR
};
