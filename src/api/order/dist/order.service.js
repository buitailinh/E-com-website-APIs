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
exports.OrderService = void 0;
var app_key_1 = require("src/share/common/app.key");
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var OrderService = /** @class */ (function () {
    function OrderService(orderRepository, voucherService, orderDetailService) {
        this.orderRepository = orderRepository;
        this.voucherService = voucherService;
        this.orderDetailService = orderDetailService;
    }
    OrderService.prototype.findAll = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var take, page, skip, keyword, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        take = query.take || process.env.TAKE_PAGE;
                        page = query.page || 1;
                        skip = (page - 1) * take;
                        keyword = query.keywork || '';
                        return [4 /*yield*/, this.orderRepository.findAndOptions({
                                where: { id: typeorm_1.Like('%' + keyword + '%') },
                                order: {
                                    id: query.order
                                },
                                take: take,
                                skip: skip
                            })];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.orderRepository.paginateResponse(data, page, take)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrderService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderRepository.findOneByCondition({
                            where: { id: id },
                            relations: ['user', 'order_details', 'voucher']
                        })];
                    case 1:
                        order = _a.sent();
                        if (!order)
                            throw new Error("Order " + id + " not found");
                        return [2 /*return*/, order];
                }
            });
        });
    };
    OrderService.prototype.getOrderByUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderRepository.findOneByCondition({
                            where: { user: user }
                        })];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, order];
                }
            });
        });
    };
    OrderService.prototype.create = function (createOrderDto, user) {
        return __awaiter(this, void 0, void 0, function () {
            var total_1, codeVoucher, order_Details, data, orderDetails, order_1, order_detail, orders, dateNow, voucher, timeStart, timeEnd, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        total_1 = 0;
                        codeVoucher = createOrderDto.codeVoucher, order_Details = createOrderDto.order_Details, data = __rest(createOrderDto, ["codeVoucher", "order_Details"]);
                        orderDetails = Object.values(order_Details.reduce(function (acc, item) {
                            acc[item.itemId] = acc[item.itemId] ? __assign(__assign({}, item), { quantity: item.quantity + acc[item.itemId].quantity }) : item;
                            return acc;
                        }, {}));
                        return [4 /*yield*/, this.orderRepository.create(__assign({ fullname: user.fullname, address: user.address, phone: user.phone, user: user, dateOrder: new Date() }, data))];
                    case 1:
                        order_1 = _a.sent();
                        return [4 /*yield*/, this.orderRepository.save(order_1)];
                    case 2:
                        _a.sent();
                        if (!order_1) return [3 /*break*/, 10];
                        return [4 /*yield*/, orderDetails.map(function (order_detail) {
                                return _this.orderDetailService.create(order_detail, order_1);
                            })];
                    case 3:
                        order_detail = _a.sent();
                        return [4 /*yield*/, Promise.all(order_detail)];
                    case 4:
                        orders = _a.sent();
                        return [4 /*yield*/, orders.map(function (orderDetail) {
                                total_1 += orderDetail.price;
                            })];
                    case 5:
                        _a.sent();
                        if (!codeVoucher) return [3 /*break*/, 8];
                        dateNow = new Date().getTime();
                        return [4 /*yield*/, this.voucherService.getByCodeVoucher(codeVoucher)];
                    case 6:
                        voucher = _a.sent();
                        if (voucher === null)
                            throw new common_1.NotFoundException({ message: app_key_1.AppKey.ERROR_MESSAGE.VOUCHER.ERR_CODEVOURCH_NOT_EXIST });
                        timeStart = new Date(voucher.timeStart).getTime();
                        timeEnd = new Date(voucher.timeEnd).getTime();
                        if (voucher.status === false)
                            throw new common_1.ConflictException('Voucher inactive');
                        if (voucher.quantity === 0)
                            throw new common_1.ConflictException('It is over');
                        if (dateNow < timeStart || dateNow > timeEnd)
                            throw new common_1.ConflictException('Voucher expired ');
                        voucher.quantity = voucher.quantity - 1;
                        return [4 /*yield*/, this.voucherService.voucherRepository.save(voucher)];
                    case 7:
                        _a.sent();
                        total_1 = (total_1 * (100 - voucher.sale)) / 100;
                        order_1.voucher = voucher;
                        _a.label = 8;
                    case 8:
                        order_1.total = total_1;
                        return [4 /*yield*/, this.orderRepository.save(order_1)];
                    case 9: return [2 /*return*/, _a.sent()];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_1 = _a.sent();
                        throw new common_1.BadRequestException(error_1);
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.update = function (id, updateOrderDto) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        order = _a.sent();
                        return [4 /*yield*/, this.orderRepository.save(__assign(__assign({}, order), updateOrderDto))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { code: 200, message: 'Order updated successfully' }];
                }
            });
        });
    };
    OrderService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, { code: 200, message: "Order deleted successfully with id " + order.id }];
                }
            });
        });
    };
    OrderService = __decorate([
        common_1.Injectable()
    ], OrderService);
    return OrderService;
}());
exports.OrderService = OrderService;
