// import AuthService from '../services/authService';
// import validateAccountData from "../middleware/validateAccountData";
// import JWTAction from '../middleware/JWTAction';
// import db from "../models/index";
// import ApiResponse from '../helpers/apiResponse';
// import * as Constants from '../config/constants/Constants'
// import sequelize, { Op } from "sequelize";

const AuthService = require('../services/authService');
const validateAccountData = require('../middleware/validateAccountData');
const JWTAction = require('../middleware/JWTAction');
const db = require('../models/index');
const ApiResponse = require('../helpers/apiResponse');
const Constants = require('../config/constants/Constants');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const moment = require('moment');

const createAccount = async (req, res) => {
    let data = req.body;
    const errors = validateAccountData.accountDataCreate(data).error;
    if (errors) {
        return ApiResponse.errorResponse(res, 'Data không hợp lệ, đảm bảo điền đầy đủ thông tin', errors)
    }

    try{
        let user = await db.user.findOne({
            where: { email: data.email }
        });

        if (user) {
            return ApiResponse.errorResponse(res,  'Email đã tồn tại, hãy chọn emnail khác')
        }

        let newUser = await db.user.create({
            name: data.name,
            email: data.email,
            password: data.password,
            expireDate: data.expireDate,
            role: Constants.SYSTEM_ROLE.USER,
            status: data.status,
        });
    } catch (e) {
        return ApiResponse.errorResponse(res,  'Một lỗi đã xảy ra, hãy thử lại')
    }

    return ApiResponse.successResponse(res, {}, 'Tạo tài khoản thành công')
}

const getAccounts = async (req, res) => {
    let allUsers = await db.user.findAll({
        where: { role: Constants.SYSTEM_ROLE.USER }
    });
    return ApiResponse.successResponse(res,
    {
        users: allUsers
    })
}

const updateAccount = async (req, res) => {
    const accountId = req.params.id;
    const accountInfo = req.body.account;
    const errors = validateAccountData.accountDataCreate(accountInfo).error;
    if (errors) {
        return ApiResponse.errorResponse(res,  errors)
    }

    let userAfterUpdate = {}

    try{
        let user = await db.user.findOne({
            where: {[Op.and]: [{ email: accountInfo.email }, {id: {[Op.not]: accountId}}]}
        });

        if (user) {
            return ApiResponse.errorResponse(res,  'Email đã tồn tại, hãy chọn emnail khác')
        }

        user = await db.user.findOne({
            where: { id: accountId }
        });

        if (!user) {
            return ApiResponse.errorResponse(res,  'Account Id không đúng')
        }

        await db.user.update({
            name: accountInfo.name ?? '',
            email: accountInfo.email ?? '',
            password: accountInfo.password ?? '',
            expireDate: accountInfo.expireDate ?? '',
            status: accountInfo.status ?? Constants.SYSTEM_STATUS.ACTIVE,
        }, {
            where : {id: accountId}
        });
        userAfterUpdate = await db.user.findByPk(accountId);

    } catch (e) {
        return ApiResponse.errorResponse(res,  'Một lỗi đã xảy ra, hãy thử lại')
    }

    return ApiResponse.successResponse(res, {
        accountInfo: userAfterUpdate
    }, 'Update tài khoản thành công')
}

const updateAccountStatus = async () => {
    await db.user.update(
        { status: 'blocked' },
        {
            where: {
                [Op.and] : [
                    {expireDate: {
                        [Op.lt]: moment().toDate()
                    }},
                    { status: 'active' },
                ]
            }
        }
    );

    await db.user.update(
        { status: 'active' },
        {
            where: {
                [Op.and] : [
                    {expireDate: {
                        [Op.gte]: moment().toDate()
                    }},
                    { status: 'active' },
                ]
            }
        }
    );
}

module.exports = {
    createAccount: createAccount,
    getAccounts: getAccounts,
    updateAccount: updateAccount,
    updateAccountStatus: updateAccountStatus
}