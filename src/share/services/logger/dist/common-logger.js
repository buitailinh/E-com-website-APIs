"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.CommonLogger = void 0;
var common_1 = require("@nestjs/common");
var winston = require("winston");
var winston_daily_rotate_file_1 = require("winston-daily-rotate-file");
var CommonLogger = /** @class */ (function (_super) {
    __extends(CommonLogger, _super);
    function CommonLogger(context) {
        var _this = _super.call(this, context) || this;
        var winstonTransports = winston.createLogger({
            transports: [new winston_daily_rotate_file_1["default"]({
                    filename: '%DATE%.log',
                    dirname: './logs/',
                    datePattern: 'YYYY-MM-DD',
                    maxSize: '10m',
                    maxFiles: '7d',
                    format: winston.format.combine(winston.format.timestamp(), winston.format.json())
                })]
        });
        _this.winstonLogger = winston.createLogger({
            transports: winstonTransports
        });
        return _this;
    }
    CommonLogger.prototype.customError = function (message, trace, log) {
        this.winstonLogger.error(message, log);
        _super.prototype.error.call(this, message, trace);
    };
    return CommonLogger;
}(common_1.Logger));
exports.CommonLogger = CommonLogger;
