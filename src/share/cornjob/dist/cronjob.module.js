"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CronjobModule = void 0;
var item_flashsale_module_1 = require("../../api/item_flashsale/item_flashsale.module");
var flash_sale_module_1 = require("../../api/flash_sale/flash_sale.module");
var common_1 = require("@nestjs/common");
var items_module_1 = require("src/api/items/items.module");
var cronjob_service_1 = require("./cronjob.service");
var sendmail_module_1 = require("../sendmail/sendmail.module");
var CronjobModule = /** @class */ (function () {
    function CronjobModule() {
    }
    CronjobModule = __decorate([
        common_1.Module({
            imports: [items_module_1.ItemsModule, flash_sale_module_1.FlashSaleModule, item_flashsale_module_1.ItemFlashsaleModule, sendmail_module_1.SendmailModule],
            providers: [cronjob_service_1.CronjobService]
        })
    ], CronjobModule);
    return CronjobModule;
}());
exports.CronjobModule = CronjobModule;
