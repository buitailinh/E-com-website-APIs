"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateOrderDto = exports.Item_OrderDetail = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var Item_OrderDetail = /** @class */ (function () {
    function Item_OrderDetail() {
    }
    __decorate([
        swagger_1.ApiProperty({
            required: true,
            description: 'Id item ',
            example: '1',
            type: 'int'
        }),
        class_validator_1.IsNotEmpty({ message: 'ID item is not empty' }),
        class_validator_1.IsNumber(),
        class_transformer_1.Type(function () { return Number; })
    ], Item_OrderDetail.prototype, "itemId");
    __decorate([
        swagger_1.ApiProperty({
            required: true,
            description: 'Quantity item order ',
            example: '2',
            type: 'int'
        }),
        class_validator_1.IsNotEmpty({ message: 'Quantity item order is not empty' }),
        class_validator_1.IsNumber(),
        class_transformer_1.Type(function () { return Number; })
    ], Item_OrderDetail.prototype, "quantity");
    return Item_OrderDetail;
}());
exports.Item_OrderDetail = Item_OrderDetail;
var CreateOrderDto = /** @class */ (function () {
    function CreateOrderDto() {
        this.note = '';
        this.codeVoucher = '';
    }
    __decorate([
        swagger_1.ApiProperty({
            required: false,
            description: 'Note item order ',
            example: 'Note item order',
            type: 'string'
        }),
        class_validator_1.IsString()
    ], CreateOrderDto.prototype, "note");
    __decorate([
        swagger_1.ApiProperty({
            required: false,
            description: 'Code voucher item order ',
            example: 'abcdc',
            type: 'string'
        }),
        class_validator_1.IsString()
    ], CreateOrderDto.prototype, "codeVoucher");
    __decorate([
        swagger_1.ApiProperty({
            required: false,
            description: 'order detail item order ',
            example: '[order_detail]',
            type: 'array'
        }),
        class_validator_1.IsArray()
    ], CreateOrderDto.prototype, "order_Details");
    return CreateOrderDto;
}());
exports.CreateOrderDto = CreateOrderDto;
