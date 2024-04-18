require("dotenv").config();
import jwt from 'jsonwebtoken';

const createToken = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, {
            expiresIn: 60 * 60 * 24 * 30
        });

    } catch (err) {
    }

    return token;
}

const verifyToken = (token) => {
    let data = null;
    return jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return data;
        }

        return decoded;

    });
}

module.exports = {
    createToken: createToken,
    verifyToken: verifyToken,
}