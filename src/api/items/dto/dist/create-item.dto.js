"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateItemDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var CreateItemDto = /** @class */ (function () {
    function CreateItemDto() {
        this.description = null;
        this.sale = 0;
    }
    __decorate([
        swagger_1.ApiProperty({
            required: true,
            description: 'Name item is not empty',
            example: 'name item',
            type: 'string'
        }),
        class_validator_1.IsNotEmpty({ message: "Name item not empty" }),
        class_validator_1.IsString(),
        class_validator_1.MinLength(3, { message: 'Name item length must be greater than 3' })
    ], CreateItemDto.prototype, "nameItem");
    __decorate([
        swagger_1.ApiProperty({
            required: true,
            description: 'barcode just the only one',
            example: 'name item',
            type: 'string'
        }),
        class_validator_1.IsNotEmpty({ message: "Barcode item not empty" }),
        class_validator_1.IsString(),
        class_validator_1.Length(8)
    ], CreateItemDto.prototype, "barcode");
    __decorate([
        swagger_1.ApiProperty({
            required: true,
            description: 'Price imput',
            example: '10.000',
            type: 'int'
        }),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsNumber(),
        class_validator_1.Min(0, { message: ' price must be greater than 0' })
    ], CreateItemDto.prototype, "priceIM");
    __decorate([
        swagger_1.ApiProperty({
            required: true,
            description: 'Price export',
            example: '15.000',
            type: 'int'
        }),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsNumber(),
        class_validator_1.Min(0, { message: ' price must be greater than 0' })
    ], CreateItemDto.prototype, "priceEX");
    __decorate([
        swagger_1.ApiProperty({
            required: false,
            description: 'file image of product',
            example: 'name item',
            type: 'string'
        })
    ], CreateItemDto.prototype, "imageMain");
    __decorate([
        swagger_1.ApiProperty({
            required: false,
            description: 'description of product',
            example: 'name item',
            type: 'string'
        }),
        class_validator_1.IsString()
    ], CreateItemDto.prototype, "description");
    __decorate([
        swagger_1.ApiProperty({
            required: false,
            description: 'sale of product',
            example: '10',
            type: 'int'
        }),
        class_validator_1.Min(0, { message: ' price sale must be greater than 0%' }),
        class_validator_1.Max(100, { message: ' price sale must be less than 100%' }),
        class_validator_1.IsNumber(),
        class_transformer_1.Type(function () { return Number; })
    ], CreateItemDto.prototype, "sale");
    __decorate([
        swagger_1.ApiProperty({
            required: true,
            description: 'Number of product',
            example: '10',
            type: 'int'
        }),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.IsNumber(),
        class_validator_1.Min(0, { message: 'Number product must be greater than 0' })
    ], CreateItemDto.prototype, "quantity");
    __decorate([
        swagger_1.ApiProperty({
            required: true,
            description: 'number of product',
            example: '12',
            type: 'int'
        }),
        class_validator_1.IsNotEmpty({ message: "Category item not empty" }),
        class_transformer_1.Type(function () { return Number; })
    ], CreateItemDto.prototype, "categoryId");
    return CreateItemDto;
}());
exports.CreateItemDto = CreateItemDto;
