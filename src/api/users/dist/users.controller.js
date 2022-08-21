"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UsersController = void 0;
var user_entity_1 = require("./entities/user.entity");
var role_guard_1 = require("./../../share/auth/guards/role.guard");
var app_object_1 = require("./../../share/common/app.object");
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var users_constant_1 = require("./users.constant");
var roles_decorator_1 = require("src/share/decorator/roles.decorator");
var jwt_auth_guard_1 = require("src/share/auth/guards/jwt-auth.guard");
var swagger_1 = require("@nestjs/swagger");
var UsersController = /** @class */ (function () {
    function UsersController(usersService, mailerServicce) {
        this.usersService = usersService;
        this.mailerServicce = mailerServicce;
    }
    UsersController.prototype.findAll = function (query) {
        return this.usersService.findAll(query);
    };
    UsersController.prototype.findOne = function (id) {
        return this.usersService.findOne(+id);
    };
    UsersController.prototype.getByEmail = function (email) {
        return this.usersService.getByEmail(email);
    };
    UsersController.prototype.getByPhone = function (phone) {
        return this.usersService.getByPhone(phone);
    };
    // @Post()
    // @UseInterceptors(FileInterceptor('file', multerOptions))
    // async create(@UploadedFile() image, @Body() createUserDto: CreateUserDto,) {
    //   return await this.usersService.create(createUserDto, image?.filename);
    // }
    UsersController.prototype.updateForUser = function (req, updateUserDto, image) {
        console.log(req.user);
        return this.usersService.UpdateByUser(updateUserDto, req.user, image === null || image === void 0 ? void 0 : image.filename);
    };
    UsersController.prototype.update = function (id, updateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    };
    UsersController.prototype.remove = function (query, req) {
        return this.usersService.remove(query.id);
    };
    __decorate([
        common_1.Get(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
        roles_decorator_1.Roles(app_object_1.AppObject.USER_MODULE.ROLE.ADMIN, app_object_1.AppObject.USER_MODULE.ROLE.PRO),
        swagger_1.ApiOkResponse({
            type: user_entity_1.User,
            description: 'List user'
        }),
        swagger_1.ApiQuery({}),
        __param(0, common_1.Query())
    ], UsersController.prototype, "findAll");
    __decorate([
        common_1.Get('/id/:id')
        // @UseGuards(JwtAuthGuard, RolesGuard)
        // @Roles(AppObject.USER_MODULE.ROLE.ADMIN, AppObject.USER_MODULE.ROLE.PRO)
        ,
        swagger_1.ApiOkResponse({
            type: user_entity_1.User,
            description: 'information about user'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        __param(0, common_1.Param('id'))
    ], UsersController.prototype, "findOne");
    __decorate([
        swagger_1.ApiOkResponse({
            type: user_entity_1.User,
            description: 'information about user with email'
        }),
        swagger_1.ApiParam({ name: 'email' }),
        common_1.Get('email/:email'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
        roles_decorator_1.Roles(app_object_1.AppObject.USER_MODULE.ROLE.ADMIN, app_object_1.AppObject.USER_MODULE.ROLE.PRO),
        __param(0, common_1.Param('email'))
    ], UsersController.prototype, "getByEmail");
    __decorate([
        common_1.Get('phone/:phone'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
        roles_decorator_1.Roles(app_object_1.AppObject.USER_MODULE.ROLE.ADMIN, app_object_1.AppObject.USER_MODULE.ROLE.PRO),
        __param(0, common_1.Param('phone'))
    ], UsersController.prototype, "getByPhone");
    __decorate([
        swagger_1.ApiOkResponse({
            type: user_entity_1.User,
            description: 'Update user successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'User cannot update. Try again!'
        }),
        common_1.Patch('update'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file', users_constant_1.multerOptions)),
        __param(0, common_1.Request()), __param(1, common_1.Body()), __param(2, common_1.UploadedFile())
    ], UsersController.prototype, "updateForUser");
    __decorate([
        swagger_1.ApiOkResponse({
            type: user_entity_1.User,
            description: 'Update user successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'User cannot update. Try again!'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        common_1.Patch(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
        roles_decorator_1.Roles(app_object_1.AppObject.USER_MODULE.ROLE.PRO),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], UsersController.prototype, "update");
    __decorate([
        swagger_1.ApiOkResponse({
            description: 'Delete user successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'User cannot delete. Try again!'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        common_1.Delete(''),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
        roles_decorator_1.Roles(app_object_1.AppObject.USER_MODULE.ROLE.ADMIN, app_object_1.AppObject.USER_MODULE.ROLE.PRO),
        __param(0, common_1.Query()), __param(1, common_1.Request())
    ], UsersController.prototype, "remove");
    UsersController = __decorate([
        common_1.Controller('user')
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
