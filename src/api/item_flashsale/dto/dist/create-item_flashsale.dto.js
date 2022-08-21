"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateItemFlashsaleDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var CreateItemFlashsaleDto = /** @class */ (function () {
    function CreateItemFlashsaleDto() {
    }
    __decorate([
        swagger_1.ApiProperty({
            type: 'int',
            required: true,
            description: 'number sale ',
            example: '50'
        }),
        class_validator_1.IsNotEmpty({ message: 'sale number is not empty' }),
        class_validator_1.IsNumber(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.Min(0),
        class_validator_1.Max(100)
    ], CreateItemFlashsaleDto.prototype, "sale");
    __decorate([
        swagger_1.ApiProperty({
            required: true,
            description: 'quantity of items sale',
            example: '100',
            type: 'int'
        }),
        class_validator_1.IsNotEmpty({ message: 'quantity item sale number is not empty' }),
        class_validator_1.IsNumber(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.Min(0)
    ], CreateItemFlashsaleDto.prototype, "quantity");
    __decorate([
        swagger_1.ApiProperty({
            type: 'int',
            required: true,
            description: 'id item sale',
            example: '1'
        }),
        class_validator_1.IsNotEmpty({ message: 'Id item sale is not empty' }),
        class_validator_1.IsNumber(),
        class_transformer_1.Type(function () { return Number; })
    ], CreateItemFlashsaleDto.prototype, "itemId");
    return CreateItemFlashsaleDto;
}());
exports.CreateItemFlashsaleDto = CreateItemFlashsaleDto;
