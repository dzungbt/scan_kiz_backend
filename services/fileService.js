// import db from "../models/index";
// import fs from 'fs';
// import dotenv from "dotenv";

const db = require('../models/index');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

let createFileAndGetInsertedId = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataResponse = {};
            let newFile = await db.File.create({
                data: data.products,
            });
            console.log('file data : ', newFile)
            if (newFile) {
                dataResponse.errCode = 0;
                dataResponse.newFileId = newFile.id;
                dataResponse.message = 'Create complete';

            } else {
                dataResponse.errCode = 2;
                dataResponse.message = 'Can not create';
            }
            resolve(dataResponse);
        } catch (e) {
            reject(e);
        }
    });
}


let getFileById = async (data) => {
    return new Promise(async (resolve, reject) => {
        console.log('get file by id : ', data.fileId)
        try {
            let dataResponse = {};

            const fileId = data.fileId
            if ( isNaN(Number(fileId))) {
                dataResponse.errCode = 2;
                dataResponse.message = 'Can not Get';
                resolve(dataResponse);
            } 
            let file = await db.File.findOne({ where: { id: Number(fileId) } });
            console.log('get file : ', file);
            if (file) {
                dataResponse.errCode = 0;
                dataResponse.file = file;
                dataResponse.message = 'Get complete';

            } else {
                dataResponse.errCode = 2;
                dataResponse.message = 'Can not Get';
            }
            resolve(dataResponse);
        } catch (e) {
            reject(e);
        }
    });
}


let updateFile = (data) => {
    console.log('===> file update file : ', data)
    return new Promise(async (resolve, reject) => {
        try {
            let dataResponse = {};
            const fileId = data.fileId
            if ( isNaN(Number(fileId))) {
                dataResponse.errCode = 2;
                dataResponse.message = 'Can not update';
                resolve(dataResponse);
            } 

            let file = await db.File.findOne({ where: { id: Number(fileId) } });
            if (file == null) {
                dataResponse.errCode = 2;
                dataResponse.message = 'Can not Get';
                resolve(dataResponse);
            }
            let updateFile = await db.File.update({
                data: data.products,
            }, { where: { id: Number(fileId) } });
            if (updateFile[0] == 1) {
                updateFile = await db.File.findOne({ where: { id: Number(fileId) } });
                console.log('file updated : ', updateFile)
                dataResponse.errCode = 0;
                dataResponse.file = updateFile;
                dataResponse.message = 'Get complete';

            } else {
                dataResponse.errCode = 2;
                dataResponse.message = 'Can not Get';
            }
            resolve(dataResponse);
        } catch (e) {
            reject(e);
        }
    });
}
module.exports = {
    createFileAndGetInsertedId: createFileAndGetInsertedId,
    getFileById: getFileById,
    updateFile: updateFile
}