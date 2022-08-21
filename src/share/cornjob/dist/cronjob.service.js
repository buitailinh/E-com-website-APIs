"use strict";
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
exports.__esModule = true;
exports.CronjobService = void 0;
var common_1 = require("@nestjs/common");
var schedule_1 = require("@nestjs/schedule");
var CronjobService = /** @class */ (function () {
    function CronjobService(itemService, flashSaleService, sendEmailService) {
        this.itemService = itemService;
        this.flashSaleService = flashSaleService;
        this.sendEmailService = sendEmailService;
        this.logger = new common_1.Logger(CronjobService_1.name);
    }
    CronjobService_1 = CronjobService;
    CronjobService.prototype.checkFSOfItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var item, itemFS;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.itemService.itemRepository.find()];
                    case 1:
                        item = _a.sent();
                        return [4 /*yield*/, item.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.itemService.getItemWithFS(item.id)];
                                        case 1:
                                            result = _a.sent();
                                            if (!result) return [3 /*break*/, 3];
                                            // this.logger.debug(`true: ${item.id}`);
                                            return [4 /*yield*/, this.itemService.updateIsSaleTrue(item.id)];
                                        case 2:
                                            // this.logger.debug(`true: ${item.id}`);
                                            _a.sent();
                                            return [3 /*break*/, 5];
                                        case 3: 
                                        // this.logger.debug(` false ${item.id}`);
                                        return [4 /*yield*/, this.itemService.updateIsSaleFalse(item.id)];
                                        case 4:
                                            // this.logger.debug(` false ${item.id}`);
                                            _a.sent();
                                            _a.label = 5;
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        itemFS = _a.sent();
                        return [4 /*yield*/, Promise.all(itemFS)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CronjobService.prototype.sendEmailNotification = function () {
        return __awaiter(this, void 0, void 0, function () {
            var timeNow_1, flashsale, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        timeNow_1 = new Date().setSeconds(0, 0);
                        return [4 /*yield*/, this.flashSaleService.flashSaleRepository.find()];
                    case 1:
                        flashsale = _a.sent();
                        return [4 /*yield*/, flashsale.map(function (flashsale) { return __awaiter(_this, void 0, void 0, function () {
                                var timeStartBefore15min;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            timeStartBefore15min = new Date(new Date(flashsale.timeStart).getTime() - 5 * 60 * 1000).getTime();
                                            if (!(timeNow_1 === timeStartBefore15min)) return [3 /*break*/, 2];
                                            this.logger.debug('Send email notification');
                                            return [4 /*yield*/, this.sendEmailService.sendNotification(flashsale)];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var CronjobService_1;
    __decorate([
        schedule_1.Cron('* * * * *', {
            name: 'checkIsSaleItems',
            timeZone: 'Asia/Ho_Chi_Minh'
        })
    ], CronjobService.prototype, "checkFSOfItems");
    __decorate([
        schedule_1.Cron('* * * * *', {
            name: 'checkFSOfItems',
            timeZone: 'Asia/Ho_Chi_Minh'
        })
    ], CronjobService.prototype, "sendEmailNotification");
    CronjobService = CronjobService_1 = __decorate([
        common_1.Injectable()
    ], CronjobService);
    return CronjobService;
}());
exports.CronjobService = CronjobService;
