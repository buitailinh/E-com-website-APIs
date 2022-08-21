"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FlashSale = void 0;
var item_flashsale_entity_1 = require("./../../item_flashsale/entities/item_flashsale.entity");
var BaseEntity_1 = require("./../../../share/database/BaseEntity");
var typeorm_1 = require("typeorm");
var flash_sale_constant_1 = require("../flash_sale.constant");
var FlashSale = /** @class */ (function (_super) {
    __extends(FlashSale, _super);
    function FlashSale() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({ length: 255, unique: true })
    ], FlashSale.prototype, "nameSale");
    __decorate([
        typeorm_1.Column('datetime', {})
    ], FlashSale.prototype, "timeStart");
    __decorate([
        typeorm_1.Column('datetime', {})
    ], FlashSale.prototype, "timeEnd");
    __decorate([
        typeorm_1.Column({ length: 255, "default": null })
    ], FlashSale.prototype, "description");
    __decorate([
        typeorm_1.OneToMany(function () { return item_flashsale_entity_1.ItemFlashsale; }, function (itemFalshSale) { return itemFalshSale.flashSale; })
    ], FlashSale.prototype, "itemFlashSales");
    FlashSale = __decorate([
        typeorm_1.Entity({ name: flash_sale_constant_1.FLASH_SALE_CONST.MODEL_NAME })
    ], FlashSale);
    return FlashSale;
}(BaseEntity_1.BaseEntity));
exports.FlashSale = FlashSale;
