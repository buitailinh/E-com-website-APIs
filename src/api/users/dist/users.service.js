"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.UsersService = void 0;
var app_object_1 = require("src/share/common/app.object");
var app_key_1 = require("./../../share/common/app.key");
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var bcrypt = require("bcrypt");
var fs = require("fs");
var UsersService = /** @class */ (function () {
    function UsersService(userRepository) {
        this.userRepository = userRepository;
    }
    ;
    UsersService.prototype.findAll = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var take, page, skip, keyword, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        take = query.take || process.env.TAKE_PAGE;
                        page = query.page || 1;
                        skip = (page - 1) * take;
                        keyword = query.keywork || '';
                        return [4 /*yield*/, this.userRepository.findAndOptions({
                                where: { fullname: typeorm_1.Like('%' + keyword + '%') },
                                order: {
                                    fullname: query.order
                                },
                                take: take,
                                skip: skip
                            })];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.userRepository.paginateResponse(data, page, take)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneByCondition({
                            where: { id: id },
                            relations: ['orders']
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, null];
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UsersService.prototype.getByName = function (name) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneByCondition({
                            where: {
                                fullname: name
                            }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.NotFoundException({ message: app_key_1.AppKey.ERROR_MESSAGE.USER.ERR_NOT_EXIST });
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UsersService.prototype.getByEmail = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneByCondition({
                            where: {
                                email: email
                            }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new common_1.NotFoundException({ message: app_key_1.AppKey.ERROR_MESSAGE.USER.ERR_NOT_EMAIL_EXIST });
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UsersService.prototype.getByPhone = function (phone) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneByCondition({
                            where: {
                                phone: phone
                            }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, null];
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UsersService.prototype.create = function (createUserDto, file) {
        return __awaiter(this, void 0, void 0, function () {
            var email, phone, password, data, emailUser, phoneUser, salt, hashPassword, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = createUserDto.email, phone = createUserDto.phone, password = createUserDto.password, data = __rest(createUserDto, ["email", "phone", "password"]);
                        return [4 /*yield*/, this.userRepository.findOneByCondition({ where: { email: email } })];
                    case 1:
                        emailUser = _a.sent();
                        if (emailUser)
                            throw new common_1.HttpException({
                                status: common_1.HttpStatus.BAD_REQUEST,
                                error: app_key_1.AppKey.ERROR_MESSAGE.USER.ERR_EMAIL_EXIST
                            }, common_1.HttpStatus.BAD_REQUEST);
                        return [4 /*yield*/, this.getByPhone(phone)];
                    case 2:
                        phoneUser = _a.sent();
                        if (phoneUser)
                            throw new common_1.HttpException({
                                status: common_1.HttpStatus.BAD_REQUEST,
                                error: app_key_1.AppKey.ERROR_MESSAGE.USER.ERR_PHONE_EXIST
                            }, common_1.HttpStatus.BAD_REQUEST);
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 3:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(password, salt)];
                    case 4:
                        hashPassword = _a.sent();
                        user = __assign({ email: email,
                            phone: phone, password: hashPassword, avatar: file }, data);
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.update = function (id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var userFound, role, user, userUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        userFound = _a.sent();
                        role = updateUserDto.role;
                        user = {
                            role: role
                        };
                        userUpdate = Object.assign(userFound, user);
                        return [4 /*yield*/, this.userRepository.update(id, userUpdate)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "Update successfully id " + id }];
                }
            });
        });
    };
    UsersService.prototype.UpdateByUser = function (updateUserDto, user, file) {
        return __awaiter(this, void 0, void 0, function () {
            var phone, fullname, address, brithday, phoneUser, updateUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        phone = updateUserDto.phone, fullname = updateUserDto.fullname, address = updateUserDto.address, brithday = updateUserDto.brithday;
                        if (!phone) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getByPhone(phone)];
                    case 1:
                        phoneUser = _a.sent();
                        if (phoneUser && user.phone !== phoneUser.phone)
                            throw new common_1.NotFoundException({ message: app_key_1.AppKey.ERROR_MESSAGE.USER.ERR_PHONE_EXIST });
                        _a.label = 2;
                    case 2:
                        updateUser = {
                            phone: phone,
                            avatar: file,
                            fullname: fullname,
                            address: address,
                            brithday: brithday
                        };
                        return [4 /*yield*/, this.userRepository.save(__assign(__assign({}, user), updateUser))];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.remove = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var userNotExit, _i, ids_1, id, user, link;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ids.length) return [3 /*break*/, 9];
                        userNotExit = [];
                        _i = 0, ids_1 = ids;
                        _a.label = 1;
                    case 1:
                        if (!(_i < ids_1.length)) return [3 /*break*/, 8];
                        id = ids_1[_i];
                        return [4 /*yield*/, this.findOne(id)];
                    case 2:
                        user = _a.sent();
                        if (user.role === app_object_1.AppObject.USER_MODULE.ROLE.PRO)
                            throw new common_1.NotFoundException({ message: id + " this is manager " });
                        if (!!user) return [3 /*break*/, 4];
                        return [4 /*yield*/, userNotExit.push(id)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        if (user.avatar) {
                            link = "./images/Profile/" + user.avatar;
                            fs.unlinkSync(link);
                        }
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.userRepository["delete"](id)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 1];
                    case 8:
                        if (userNotExit)
                            return [2 /*return*/, { message: "users not exit " + userNotExit }];
                        _a.label = 9;
                    case 9: return [2 /*return*/, { message: "This action removes  users" }];
                }
            });
        });
    };
    UsersService.prototype.verifyEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getByEmail(email)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.userRepository.save(__assign(__assign({}, user), { isVerify: true }))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.resertPassword = function (email, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var user, salt, hashPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getByEmail(email)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 2:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(newPassword, salt)];
                    case 3:
                        hashPassword = _a.sent();
                        return [4 /*yield*/, this.userRepository.save(__assign(__assign({}, user), { password: hashPassword }))];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService = __decorate([
        common_1.Injectable()
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
