// import JWTAction from './JWTAction'
// import ApiResponse from '../helpers/apiResponse';
// import db from "../models/index";
// import { Op } from "sequelize";
// import * as Constants from '../config/constants/Constants'

const JWTAction = require('./JWTAction');
const ApiResponse = require('../helpers/apiResponse');
const db = require("../models/index");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Constants = require( '../config/constants/Constants');
const checkJWTToken = (token) => {
    if (token === undefined) {
        return {
            errCode: 1,
            message: 'Not found token',
        }

    }
    let userId = JWTAction.verifyToken(token) ? JWTAction.verifyToken(token).id : null;
    if (!userId) {
        return {
            errCode: 2,
            message: 'Token is invalid',
        }
    }
    return {
        errCode: 0,
        message: 'JWT oke',
    }
}

const checkAuthAccess = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const jwtVerify = JWTAction.verifyToken(token)
    let userId = jwtVerify ? jwtVerify.id : null;
    if (!userId) {
        return ApiResponse.errorResponse(res,  'Token is invalid', {}, 401)
    }
    const userData = await db.user.findOne({
        where: {[Op.and]: [{ id: userId }]},
        attributes: ['email', 'id', 'password', 'name', 'expireDate', 'role', 'status'],
    })

    if (!userData) {
        return ApiResponse.errorResponse(res,  'User not found', {}, 401)
    }

    if (userData.role == Constants.SYSTEM_ROLE.USER && userData.status == Constants.SYSTEM_STATUS.BLOCKED ) {
        return ApiResponse.errorResponse(res,  'Account is not activated', {}, 401)
    }
    req.userId = userId; 
    next();
}
module.exports = {
    checkJWTToken: checkJWTToken,
    checkAuthAccess: checkAuthAccess
}