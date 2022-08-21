"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateOrderDetailDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var CreateOrderDetailDto = /** @class */ (function () {
    function CreateOrderDetailDto() {
    }
    __decorate([
        swagger_1.ApiProperty({
            required: true,
            description: 'Quatity of item the order',
            example: '5',
            type: 'int'
        }),
        class_validator_1.IsNotEmpty({ message: 'Please imput is a quantity' }),
        class_validator_1.IsNumber(),
        class_transformer_1.Type(function () { return Number; }),
        class_validator_1.Min(0, { message: 'quantity must be greater than 0' })
    ], CreateOrderDetailDto.prototype, "quantity");
    __decorate([
        swagger_1.ApiProperty({
            required: true,
            description: 'Id item item the order',
            example: '5',
            type: 'int'
        }),
        class_validator_1.IsNotEmpty({ message: 'Please imput a id item' }),
        class_validator_1.IsNumber(),
        class_transformer_1.Type(function () { return Number; })
    ], CreateOrderDetailDto.prototype, "itemId");
    return CreateOrderDetailDto;
}());
exports.CreateOrderDetailDto = CreateOrderDetailDto;
