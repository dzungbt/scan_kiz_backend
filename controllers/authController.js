import AuthService from '../services/authService';
import AuthMiddleware from '../middleware/auth'
import validateAuthData from "../middleware/validateAuthData";
import SendMail from '../utils/mail/sendMail';
import JWTAction from '../middleware/JWTAction';
import db from "../models/index";
import ApiResponse from '../helpers/apiResponse';
let userLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    const errors = validateAuthData.userLoginValidate(req.body).error;
    if (errors) {
        return ApiResponse.errorResponse(res,  'Parameters input are not met requirements')
    }

    let userData = await AuthService.userLogin({
        email: email,
        password: password,
    });

    if (userData.errCode == 3) {
        return ApiResponse.errorResponse(res,  'Sai mật khẩu')
    }

    if (userData.errCode == 2) {
        return ApiResponse.errorResponse(res,  'Sai email')
    }

    if (userData.errCode == 4) {
        return ApiResponse.errorResponse(res,  'Tài khoản đã bị khóa, vui lòng liên hệ đội ngũ admin của chúng tôi để được tư vấn');
    }



    let jwt = null;
    if (userData.errCode == 0) {
        jwt = JWTAction.createToken({ id: userData.user.id, email: userData.user.email });
    }

    res.setHeader('Authorization', `Bearer ${jwt}`);
    return ApiResponse.successResponse(res, {
        jwt,
        user: userData
    })
}


let me = async (req, res) => {
    let userId = req.userId;
    const userData = await db.user.findOne({
        where: { id: userId },
        attributes: ['email', 'id', 'status', 'role', 'name'],
    })
    return ApiResponse.successResponse(res, userData)
}
module.exports = {
    userLogin: userLogin,
    me: me
}