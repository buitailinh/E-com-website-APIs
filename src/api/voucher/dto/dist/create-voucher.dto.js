"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateVoucherDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var CreateVoucherDto = /** @class */ (function () {
    function CreateVoucherDto() {
        this.quantity = 0;
        this.status = true;
    }
    __decorate([
        swagger_1.ApiProperty({ required: true, description: 'name voucher apply item' }),
        class_validator_1.IsNotEmpty({ message: 'name voucher is not empty' }),
        class_validator_1.MinLength(4)
    ], CreateVoucherDto.prototype, "nameVoucher");
    __decorate([
        swagger_1.ApiProperty({ required: true, description: 'Code voucher apply item' }),
        class_validator_1.IsNotEmpty({ message: 'code voucher is not empty' }),
        class_validator_1.IsAlphanumeric(),
        class_validator_1.MinLength(4)
    ], CreateVoucherDto.prototype, "codeVoucher");
    __decorate([
        swagger_1.ApiProperty({ type: 'number' }),
        class_validator_1.IsNumber(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.Min(0),
        class_validator_1.Max(100)
    ], CreateVoucherDto.prototype, "sale");
    __decorate([
        swagger_1.ApiProperty({ required: true, description: 'amount voucher' }),
        class_validator_1.IsNotEmpty({ message: 'amount vourch is not empty' }),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsNumber(),
        class_validator_1.Min(0)
    ], CreateVoucherDto.prototype, "quantity");
    __decorate([
        class_transformer_1.Type(function () { return Boolean; }),
        class_validator_1.IsBoolean()
    ], CreateVoucherDto.prototype, "status");
    __decorate([
        class_validator_1.IsNotEmpty({
            message: 'Time start flash is not empty'
        }),
        class_validator_1.IsDate(),
        class_transformer_1.Type(function () { return Date; })
    ], CreateVoucherDto.prototype, "timeStart");
    __decorate([
        class_validator_1.IsNotEmpty({
            message: 'Time start flash is not empty'
        }),
        class_validator_1.IsDate(),
        class_transformer_1.Type(function () { return Date; })
    ], CreateVoucherDto.prototype, "timeEnd");
    return CreateVoucherDto;
}());
exports.CreateVoucherDto = CreateVoucherDto;
