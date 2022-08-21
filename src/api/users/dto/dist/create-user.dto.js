"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateUserDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var app_object_1 = require("src/share/common/app.object");
var pattern_lib_1 = require("src/share/utils/pattern.lib");
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
        this.role = app_object_1.AppObject.USER_MODULE.ROLE.CLIENT;
        this.brithday = new Date();
        this.avatar = null;
    }
    __decorate([
        swagger_1.ApiProperty({ type: 'string', required: true, description: ' email address', example: 'example@example.com' }),
        class_validator_1.IsNotEmpty({ message: "Email iss not empty" }),
        class_validator_1.IsEmail({ message: 'Invalid email format' }),
        class_validator_1.Matches(pattern_lib_1.PatternLib.email, {
            message: 'Invalid email format'
        })
    ], CreateUserDto.prototype, "email");
    __decorate([
        swagger_1.ApiProperty({ type: 'string', required: true, description: 'your fullname ', example: 'example' }),
        class_validator_1.IsNotEmpty({ message: "Fullname is not empty" }),
        class_validator_1.Matches(pattern_lib_1.PatternLib.name, { message: 'Invalid  fullname format' }),
        class_validator_1.IsString(),
        class_validator_1.MinLength(2, {
            message: ' fullname must be should 2'
        })
    ], CreateUserDto.prototype, "fullname");
    __decorate([
        swagger_1.ApiProperty({ required: true, description: 'account password', type: 'string', example: 'password' }),
        class_validator_1.IsNotEmpty({ message: "Password is not empty" }),
        class_validator_1.Matches(pattern_lib_1.PatternLib.password, { message: 'Invalid password format' }),
        class_validator_1.Length(8, 30, { message: 'Min lenght must be 8' }),
        class_validator_1.IsString()
    ], CreateUserDto.prototype, "password");
    __decorate([
        swagger_1.ApiProperty({ "enum": app_object_1.AppObject.USER_MODULE.ROLE, "default": app_object_1.AppObject.USER_MODULE.ROLE.CLIENT, description: 'role ' }),
        class_validator_1.IsEnum(app_object_1.AppObject.USER_MODULE.ROLE),
        class_validator_1.IsString()
    ], CreateUserDto.prototype, "role");
    __decorate([
        swagger_1.ApiProperty({ required: true, description: ' phone number', type: 'string', example: '0123456789' }),
        class_validator_1.IsNotEmpty({ message: "phone number is not empty" }),
        class_validator_1.Matches(pattern_lib_1.PatternLib.phone, { message: 'Invalid phone number format' })
    ], CreateUserDto.prototype, "phone");
    __decorate([
        swagger_1.ApiProperty({ required: false, description: 'input a address', type: 'string', example: '123 Main St' }),
        class_validator_1.IsNotEmpty({ message: "address is not empty" })
    ], CreateUserDto.prototype, "address");
    __decorate([
        swagger_1.ApiProperty({ required: false, description: 'input a address', type: 'date', example: '2015-10-20' })
        // @Type(() => Date)
        // @Transform(brithday => moment(brithday).format('DD/MM/YY'))
        ,
        class_transformer_1.Type(function () { return Date; }),
        class_validator_1.IsDate()
    ], CreateUserDto.prototype, "brithday");
    __decorate([
        swagger_1.ApiProperty({ required: false, description: 'input a file picture', type: 'string', example: 'image.png' })
    ], CreateUserDto.prototype, "avatar");
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;
