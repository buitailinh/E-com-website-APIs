"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.TypeOrmRepository = void 0;
var TypeOrmRepository = /** @class */ (function () {
    function TypeOrmRepository(repository) {
        this.repository = repository;
    }
    TypeOrmRepository.prototype.create = function (data) {
        return this.repository.create(data);
    };
    TypeOrmRepository.prototype.save = function (data) {
        return this.repository.save(data);
    };
    TypeOrmRepository.prototype.update = function (id, data) {
        return this.repository.update(id, data);
    };
    TypeOrmRepository.prototype["delete"] = function (id) {
        return this.repository["delete"](id);
    };
    TypeOrmRepository.prototype.findOneByCondition = function (conditions) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.findOne(conditions)];
            });
        });
    };
    TypeOrmRepository.prototype.findOne = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.findOne(id)];
            });
        });
    };
    TypeOrmRepository.prototype.find = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.find()];
            });
        });
    };
    TypeOrmRepository.prototype.finByIds = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.findBy(id)];
            });
        });
    };
    TypeOrmRepository.prototype.findAndOptions = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.findAndCount(data)];
            });
        });
    };
    TypeOrmRepository.prototype.paginateResponse = function (data, page, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var result, total, lastPage, nextPage, prevPage;
            return __generator(this, function (_a) {
                result = data[0], total = data[1];
                lastPage = Math.ceil(total / limit);
                nextPage = page + 1 > lastPage ? null : page + 1;
                prevPage = page - 1 < 1 ? null : page - 1;
                return [2 /*return*/, {
                        statusCode: 'success',
                        data: __spreadArrays(result),
                        count: total,
                        currentPage: page,
                        nextPage: nextPage,
                        prevPage: prevPage,
                        lastPage: lastPage
                    }];
            });
        });
    };
    ;
    return TypeOrmRepository;
}());
exports.TypeOrmRepository = TypeOrmRepository;
