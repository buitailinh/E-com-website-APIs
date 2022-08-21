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
exports.Voucher = void 0;
var typeorm_1 = require("typeorm");
var BaseEntity_1 = require("./../../../share/database/BaseEntity");
var voucher_constant_1 = require("../voucher.constant");
var order_entity_1 = require("src/api/order/entities/order.entity");
var Voucher = /** @class */ (function (_super) {
    __extends(Voucher, _super);
    function Voucher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({ length: 255, unique: true })
    ], Voucher.prototype, "nameVoucher");
    __decorate([
        typeorm_1.Column({ length: 255, unique: true })
    ], Voucher.prototype, "codeVoucher");
    __decorate([
        typeorm_1.Column()
    ], Voucher.prototype, "sale");
    __decorate([
        typeorm_1.Column({})
    ], Voucher.prototype, "quantity");
    __decorate([
        typeorm_1.Column({ "default": true })
    ], Voucher.prototype, "status");
    __decorate([
        typeorm_1.Column('datetime', {})
    ], Voucher.prototype, "timeStart");
    __decorate([
        typeorm_1.Column('datetime', {})
    ], Voucher.prototype, "timeEnd");
    __decorate([
        typeorm_1.OneToMany(function () { return order_entity_1.Order; }, function (order) { return order.voucher; })
    ], Voucher.prototype, "orders");
    Voucher = __decorate([
        typeorm_1.Entity({ name: voucher_constant_1.VOUCHER_CONST.MODEL_NAME })
    ], Voucher);
    return Voucher;
}(BaseEntity_1.BaseEntity));
exports.Voucher = Voucher;
