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
exports.OrderDetailService = void 0;
var common_1 = require("@nestjs/common");
var OrderDetailService = /** @class */ (function () {
    function OrderDetailService(orderDetailRepository, itemsService, itemFSService) {
        this.orderDetailRepository = orderDetailRepository;
        this.itemsService = itemsService;
        this.itemFSService = itemFSService;
    }
    OrderDetailService.prototype.findAll = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var keyword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyword = query.keyword || '';
                        return [4 /*yield*/, this.orderDetailRepository.findOneByCondition({
                                where: {},
                                order: { price: query.order }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrderDetailService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var orderDetail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderDetailRepository.findOneByCondition({
                            where: { id: id },
                            relations: ['item']
                        })];
                    case 1:
                        orderDetail = _a.sent();
                        if (!orderDetail)
                            return [2 /*return*/, null];
                        return [2 /*return*/, orderDetail];
                }
            });
        });
    };
    OrderDetailService.prototype.create = function (createOrderDetailDto, order) {
        return __awaiter(this, void 0, void 0, function () {
            var price, quantity, itemId, item, itemSale, item_flashsale, orderDetailNew;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        price = 0;
                        quantity = createOrderDetailDto.quantity, itemId = createOrderDetailDto.itemId;
                        return [4 /*yield*/, this.itemsService.getById(itemId)];
                    case 1:
                        item = _a.sent();
                        if (!(item.is_sale === true)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.itemsService.getItemWithFS(itemId)];
                    case 2:
                        itemSale = _a.sent();
                        if (!itemSale) return [3 /*break*/, 5];
                        if (quantity > itemSale.item_flashsale_quantity) {
                            throw new common_1.HttpException({
                                status: common_1.HttpStatus.FORBIDDEN,
                                error: "purchase quantity does not exceed " + itemSale.item_flashsale_quantity + " item"
                            }, common_1.HttpStatus.FORBIDDEN);
                        }
                        price = itemSale.total * quantity;
                        return [4 /*yield*/, this.itemFSService.findOne(itemSale.item_flashsale_id)];
                    case 3:
                        item_flashsale = _a.sent();
                        if (item_flashsale !== null)
                            item_flashsale.quantity = item_flashsale.quantity - quantity;
                        return [4 /*yield*/, this.itemFSService.itemFSRepository.save(item_flashsale)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (quantity > item.quantity) {
                            throw new common_1.HttpException({
                                status: common_1.HttpStatus.FORBIDDEN,
                                error: "purchase quantity does not exceed " + item.quantity + " item"
                            }, common_1.HttpStatus.FORBIDDEN);
                        }
                        price = item.priceEX * quantity * (100 - item.sale) / 100;
                        _a.label = 7;
                    case 7:
                        item.quantity -= quantity;
                        return [4 /*yield*/, this.itemsService.itemRepository.save(item)];
                    case 8:
                        _a.sent();
                        orderDetailNew = {
                            order: order,
                            price: price,
                            quantity: quantity,
                            item: item
                        };
                        return [4 /*yield*/, this.orderDetailRepository.save(orderDetailNew)];
                    case 9: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) { }
    OrderDetailService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var OrderDetail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        OrderDetail = _a.sent();
                        if (OrderDetail === null)
                            return [2 /*return*/, { code: 200, message: 'Order detail not found' }];
                        return [4 /*yield*/, this.orderDetailRepository["delete"](id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { code: 200, message: 'Order detail deleted successfully' }];
                }
            });
        });
    };
    OrderDetailService = __decorate([
        common_1.Injectable()
    ], OrderDetailService);
    return OrderDetailService;
}());
exports.OrderDetailService = OrderDetailService;
