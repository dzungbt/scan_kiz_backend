const dotenv = require('dotenv');
// CREDENTIALS
const SPACE_OCR_API_KEY = process.env.SPACE_OCR_API_KEY || 'K85681428788957';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyATziejr49q34hgQpMvcqIi1SHSQ2k0280';

module.exports = {
    SPACE_OCR_API_KEY,
    GOOGLE_API_KEY
}