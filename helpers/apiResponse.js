
const successResponse = (res, data, message = '',  status = 200, errCode = 0) => {
    return res.status(status).json({
        status,
        errCode,
        message,
        data,
    });
}

const errorResponse = (res,  message = '', data = {}, status = 200, errCode = 1) => {
    return res.status(status).json({
        status,
        errCode,
        message,
        data,
    });
}

module.exports = {
    successResponse,
    errorResponse
}