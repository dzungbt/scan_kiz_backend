const {
    File,
} = require("../models");
import FileService from '../services/fileService';
import ValidateFileData from "../middleware/validateFileData";

let createFile = async (req, res) => {
    let products = req.body.products;
    const errors = ValidateFileData.productsImportValidate(products).error;
    if (errors) {
        return res.status(200).json({
            errCode: 1,
            message: 'Parameters input are not met requirements',
        });
    }
    let data = await FileService.createFileAndGetInsertedId({products})
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}


let getFile = async (req, res) => {
    let fileId = req.params.id;
    if (isNaN(Number(fileId))) {
        return res.status(200).json({
            errCode: 1,
            message: 'file id is invalid',
            data,
        });
    }
    let data = await FileService.getFileById({
        fileId,
    })

    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}

let updateFile = async (req, res) => {
    let fileId = req.body.id;
    if (isNaN(Number(fileId))) {
        return res.status(200).json({
            errCode: 1,
            message: 'file id is invalid',
            data,
        });
    }
    let products = req.body.products;
    const errors = ValidateFileData.productsImportValidate(products).error;
    if (errors) {
        return res.status(200).json({
            errCode: 1,
            message: 'Parameters input are not met requirements',
        });
    }
    let data = await FileService.updateFile({
        fileId,
        products
    })
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });

}

module.exports = {
    createFile: createFile,
    getFile: getFile,
    updateFile: updateFile
};