"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var pattern_lib_1 = require("src/share/utils/pattern.lib");
var SignDto = /** @class */ (function () {
    function SignDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ type: 'string', required: true, description: ' email address' }),
        class_validator_1.IsNotEmpty({ message: "Email iss not empty" }),
        class_validator_1.IsEmail({ message: 'Invalid email format' }),
        class_validator_1.Matches(pattern_lib_1.PatternLib.email, {
            message: 'Invalid email format'
        })
    ], SignDto.prototype, "email");
    __decorate([
        swagger_1.ApiProperty({ required: true, description: ' password' }),
        class_validator_1.IsNotEmpty({ message: "Password is not empty" }),
        class_validator_1.Matches(pattern_lib_1.PatternLib.password, { message: 'Invalid password format' }),
        class_validator_1.Length(8, 30, { message: 'Min lenght must be 8' }),
        class_validator_1.IsString()
    ], SignDto.prototype, "password");
    return SignDto;
}());
exports.SignDto = SignDto;
