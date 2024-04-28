'use strict';
// import * as Constants from '../config/constants/Constants';
const Constants = require('../config/constants/Constants');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    user.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.ENUM(...Constants.SYSTEM_ROLE_ARR),
        status: DataTypes.ENUM(...Constants.SYSTEM_STATUS_ARR),
        expireDate: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'user',
    });
    return user;
};