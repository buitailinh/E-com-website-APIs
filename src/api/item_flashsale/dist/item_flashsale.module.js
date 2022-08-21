"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ItemFlashsaleModule = void 0;
var item_flashsale_provider_1 = require("./item_flashsale.provider");
var item_flashsale_repository_1 = require("./item_flashsale.repository");
var items_module_1 = require("./../items/items.module");
var database_module_1 = require("./../../config/database/database.module");
var common_1 = require("@nestjs/common");
var item_flashsale_service_1 = require("./item_flashsale.service");
var item_flashsale_controller_1 = require("./item_flashsale.controller");
var ItemFlashsaleModule = /** @class */ (function () {
    function ItemFlashsaleModule() {
    }
    ItemFlashsaleModule = __decorate([
        common_1.Module({
            imports: [database_module_1.DatabaseModule, items_module_1.ItemsModule],
            controllers: [item_flashsale_controller_1.ItemFlashsaleController],
            providers: __spreadArrays([
                item_flashsale_service_1.ItemFlashsaleService,
                item_flashsale_repository_1.ItemFlashsaleRepository
            ], item_flashsale_provider_1.item_flashsaleProvider),
            exports: [item_flashsale_service_1.ItemFlashsaleService, item_flashsale_repository_1.ItemFlashsaleRepository]
        })
    ], ItemFlashsaleModule);
    return ItemFlashsaleModule;
}());
exports.ItemFlashsaleModule = ItemFlashsaleModule;
