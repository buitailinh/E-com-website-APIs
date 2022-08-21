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
exports.ItemsService = void 0;
var common_1 = require("@nestjs/common");
var app_key_1 = require("src/share/common/app.key");
var typeorm_1 = require("typeorm");
var item_entity_1 = require("./entities/item.entity");
var fs = require("fs");
var typeorm_2 = require("typeorm");
var ItemsService = /** @class */ (function () {
    function ItemsService(itemRepository, categoryService) {
        this.itemRepository = itemRepository;
        this.categoryService = categoryService;
    }
    ItemsService.prototype.save = function (item) {
        throw new Error('Method not implemented.');
    };
    ItemsService.prototype.findAll = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var take, page, skip, keyword, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        take = query.take || process.env.TAKE_PAGE;
                        page = query.page || 1;
                        skip = (page - 1) * take;
                        keyword = query.keywork || '';
                        return [4 /*yield*/, this.itemRepository.findAndOptions({
                                where: { nameItem: typeorm_1.Like('%' + keyword + '%') },
                                order: {
                                    nameItem: query.order === 'descend' ? 'DESC' : 'ASC'
                                },
                                take: take,
                                skip: skip
                            })];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.itemRepository.paginateResponse(data, page, take)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ItemsService.prototype.getById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.itemRepository.findOneByCondition({
                            where: {
                                id: id
                            },
                            relations: ['images', 'category']
                        })];
                    case 1:
                        item = _a.sent();
                        if (!item)
                            throw new common_1.NotFoundException({
                                message: app_key_1.AppKey.ERROR_MESSAGE.ITEM.ERR_NOT_EXIST
                            });
                        return [2 /*return*/, item];
                }
            });
        });
    };
    ItemsService.prototype.getByName = function (nameItem) {
        return __awaiter(this, void 0, Promise, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.itemRepository.findOneByCondition({
                            where: {
                                nameItem: nameItem
                            }
                        })];
                    case 1:
                        item = _a.sent();
                        if (!item)
                            return [2 /*return*/, null];
                        return [2 /*return*/, item];
                }
            });
        });
    };
    ItemsService.prototype.getByBarCode = function (barcode) {
        return __awaiter(this, void 0, Promise, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.itemRepository.findOneByCondition({
                            where: {
                                barcode: barcode
                            }
                        })];
                    case 1:
                        item = _a.sent();
                        if (!item)
                            return [2 /*return*/, null];
                        return [2 /*return*/, item];
                }
            });
        });
    };
    ItemsService.prototype.create = function (createItemDto, imageMain) {
        return __awaiter(this, void 0, Promise, function () {
            var nameItem, categoryId, barcode, priceIM, priceEX, quantity, data, nameItemFound, barcodeFound, category, itemNew;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nameItem = createItemDto.nameItem, categoryId = createItemDto.categoryId, barcode = createItemDto.barcode, priceIM = createItemDto.priceIM, priceEX = createItemDto.priceEX, quantity = createItemDto.quantity, data = __rest(createItemDto, ["nameItem", "categoryId", "barcode", "priceIM", "priceEX", "quantity"]);
                        return [4 /*yield*/, this.getByName(nameItem)];
                    case 1:
                        nameItemFound = _a.sent();
                        if (nameItemFound)
                            throw new common_1.NotFoundException({
                                message: app_key_1.AppKey.ERROR_MESSAGE.ITEM.ERR_NAMEITEM_EXIST
                            });
                        return [4 /*yield*/, this.itemRepository.findOneByCondition({
                                where: { barcode: barcode }
                            })];
                    case 2:
                        barcodeFound = _a.sent();
                        if (barcodeFound)
                            throw new common_1.NotFoundException({
                                message: app_key_1.AppKey.ERROR_MESSAGE.ITEM.ERR_BARCODE_EXIST
                            });
                        return [4 /*yield*/, this.categoryService.getById(categoryId)];
                    case 3:
                        category = _a.sent();
                        if (priceEX < priceIM)
                            throw new common_1.NotFoundException({
                                message: app_key_1.AppKey.ERROR_MESSAGE.ITEM.ERR_PRICE
                            });
                        itemNew = __assign({ nameItem: nameItem,
                            category: category,
                            barcode: barcode,
                            priceEX: priceEX,
                            priceIM: priceIM,
                            imageMain: imageMain,
                            quantity: quantity }, data);
                        return [4 /*yield*/, this.itemRepository.save(itemNew)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ItemsService.prototype.update = function (id, updateItemDto, image) {
        return __awaiter(this, void 0, void 0, function () {
            var priceIM, priceEX, quantity, nameItem, description, sale, item, itemFeld, itemUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        priceIM = updateItemDto.priceIM, priceEX = updateItemDto.priceEX, quantity = updateItemDto.quantity, nameItem = updateItemDto.nameItem, description = updateItemDto.description, sale = updateItemDto.sale;
                        item = this.getById(id);
                        if (!item)
                            throw new common_1.NotFoundException({
                                message: app_key_1.AppKey.ERROR_MESSAGE.ITEM.ERR_NOT_EXIST
                            });
                        if (priceEX < priceIM)
                            throw new common_1.NotFoundException({
                                message: app_key_1.AppKey.ERROR_MESSAGE.ITEM.ERR_PRICE
                            });
                        if (!image) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.removeFile(id)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        itemFeld = {
                            imageMain: image,
                            priceIM: priceIM,
                            priceEX: priceEX,
                            quantity: quantity,
                            nameItem: nameItem,
                            description: description,
                            sale: sale
                        };
                        itemUpdate = Object.assign(item, itemFeld);
                        return [4 /*yield*/, this.itemRepository.update(id, itemUpdate)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { message: "update successfully " + id }];
                }
            });
        });
    };
    ItemsService.prototype.updateImageMain = function (id, imageMain) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.removeFile(id)];
                    case 1:
                        item = _a.sent();
                        item.imageMain = imageMain;
                        return [4 /*yield*/, this.itemRepository.save(item)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ItemsService.prototype.purchaseItem = function (id, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getById(id)];
                    case 1:
                        item = _a.sent();
                        if (item.quantity === 0)
                            throw new common_1.ConflictException('Item out of stock');
                        item.quantity = item.quantity - amount;
                        if (item.quantity < 0)
                            throw new common_1.ConflictException('Quantity ordered exceeds the number of items available');
                        return [4 /*yield*/, this.itemRepository.save(item)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ItemsService.prototype.addSLB = function (id, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getById(id)];
                    case 1:
                        item = _a.sent();
                        item.quantity = parseInt(item.quantity.toString()) + parseInt(amount.toString());
                        return [4 /*yield*/, this.itemRepository.save(item)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ItemsService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.removeFile(id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.itemRepository["delete"](id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "This action removes a #" + id + " item" }];
                }
            });
        });
    };
    ItemsService.prototype.removeFile = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var item, link, imageUpdate, itemUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getById(id)];
                    case 1:
                        item = _a.sent();
                        if (!item)
                            throw new common_1.NotFoundException({
                                message: app_key_1.AppKey.ERROR_MESSAGE.ITEM.ERR_NOT_EXIST
                            });
                        if (!item.imageMain) {
                            return [2 /*return*/, item];
                        }
                        ;
                        try {
                            link = "./images/itemMain/" + item.imageMain;
                            fs.unlinkSync(link);
                            console.log('Successfully deleted the file.');
                        }
                        catch (err) {
                            throw err;
                        }
                        imageUpdate = {
                            imageMain: null
                        };
                        itemUpdate = Object.assign(item, imageUpdate);
                        return [4 /*yield*/, this.itemRepository.update(id, itemUpdate)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, item];
                }
            });
        });
    };
    ItemsService.prototype.updateIsSaleTrue = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getById(id)];
                    case 1:
                        item = _a.sent();
                        if (!!item.is_sale) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.itemRepository.save(__assign(__assign({}, item), { is_sale: true }))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ItemsService.prototype.updateIsSaleFalse = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getById(id)];
                    case 1:
                        item = _a.sent();
                        if (!item.is_sale) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.itemRepository.save(__assign(__assign({}, item), { is_sale: false }))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ItemsService.prototype.getItemWithFS = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var timeNow, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timeNow = new Date();
                        return [4 /*yield*/, typeorm_2.getConnection()
                                .createQueryBuilder()
                                .select('item')
                                .addSelect('item_flashsale')
                                .addSelect('flash_sale')
                                .addSelect('item.priceEX', 'price')
                                .addSelect('(item.priceEX*(100-item_flashsale.sale))/100', 'total')
                                .from(item_entity_1.Item, 'item')
                                .leftJoin('item.itemFlashSales', 'item_flashsale')
                                .leftJoin('item_flashsale.flashSale', 'flash_sale')
                                .where('item.id = :id', { id: id })
                                .andWhere('flash_sale.timeStart <= :timeNow', { timeNow: timeNow })
                                .andWhere('flash_sale.timeEnd >= :timeNow', { timeNow: timeNow })
                                .execute()];
                    case 1:
                        query = _a.sent();
                        return [2 /*return*/, query[0]];
                }
            });
        });
    };
    ItemsService = __decorate([
        common_1.Injectable()
    ], ItemsService);
    return ItemsService;
}());
exports.ItemsService = ItemsService;
