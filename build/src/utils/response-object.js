"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponseArr = exports.successResponse = exports.errorResponse = exports.noContentResponse = void 0;
const status_1 = require("../enums/status");
const noContentResponse = (res, data, message = 'No data found') => {
    return res.status(status_1.statusCode.NO_CONTENT).json({
        message: message,
        data: data,
        status: status_1.statusMessage.NO_CONTENT,
        statusCode: status_1.statusCode.NO_CONTENT
    });
};
exports.noContentResponse = noContentResponse;
const errorResponse = (res, error, message = 'something went wrong') => {
    return res.status(status_1.statusCode.ERROR).json({
        message: message,
        data: error,
        status: status_1.statusMessage.ERROR,
        statusCode: status_1.statusCode.ERROR
    });
};
exports.errorResponse = errorResponse;
const successResponse = (res, data, message = 'operation successfully') => {
    return res.status(status_1.statusCode.SUCCESS).json({
        message: message,
        data: data,
        status: status_1.statusMessage.SUCCESS,
        statusCode: status_1.statusCode.SUCCESS
    });
};
exports.successResponse = successResponse;
const successResponseArr = (res, data, count = {}, message = 'Operation Successfull') => {
    return res.status(status_1.statusCode.SUCCESS).json({
        message: message,
        data: data,
        count: count,
        status: status_1.statusMessage.SUCCESS,
        statusCode: status_1.statusCode.SUCCESS
    });
};
exports.successResponseArr = successResponseArr;
