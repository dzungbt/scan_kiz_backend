import db from "../models/index";
import fs from 'fs';
import dotenv from "dotenv";
import * as Constants from '../config/constants/Constants'
dotenv.config();

let userLogin = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataResponse = {};
            let user = await db.user.findOne({
                where: { email: data.email }
            });

            if (!user) {
                dataResponse.errCode = 2;
                dataResponse.message = 'Wrong email';

            } else {
                if (data.password == user.password) {
                    const userData = await db.user.findOne({
                        where: { email: data.email },
                        attributes: ['email', 'id', 'password', 'name', 'expireDate', 'role', 'status'],
                    })

                    if (userData.role == Constants.SYSTEM_ROLE.USER && userData.status == Constants.SYSTEM_STATUS.BLOCKED ) {
                        dataResponse.errCode = 4;
                        dataResponse.message = 'Tài khoản đã bị khóa';
                    } else {
                        dataResponse.errCode = 0;
                        dataResponse.user = userData;
                        dataResponse.message = '';
                    }

                } else {
                    dataResponse.errCode = 3;
                    dataResponse.message = '';
                }
            }
            resolve(dataResponse);
        } catch (e) {
            reject(e);
        }
    });
}



module.exports = {
    userLogin: userLogin,

}