"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusMessage = exports.statusCode = void 0;
var statusCode;
(function (statusCode) {
    statusCode[statusCode["SUCCESS"] = 200] = "SUCCESS";
    statusCode[statusCode["NO_CONTENT"] = 401] = "NO_CONTENT";
    statusCode[statusCode["ERROR"] = 401] = "ERROR";
})(statusCode = exports.statusCode || (exports.statusCode = {}));
var statusMessage;
(function (statusMessage) {
    statusMessage["SUCCESS"] = "success";
    statusMessage["ERROR"] = "error";
    statusMessage["NO_CONTENT"] = "no-data-found";
})(statusMessage = exports.statusMessage || (exports.statusMessage = {}));
