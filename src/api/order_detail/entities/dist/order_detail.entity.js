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
exports.OrderDetail = void 0;
var item_entity_1 = require("./../../items/entities/item.entity");
var BaseEntity_1 = require("src/share/database/BaseEntity");
var typeorm_1 = require("typeorm");
var order_detail_constant_1 = require("../order_detail.constant");
var order_entity_1 = require("src/api/order/entities/order.entity");
var OrderDetail = /** @class */ (function (_super) {
    __extends(OrderDetail, _super);
    function OrderDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({ type: 'double' })
    ], OrderDetail.prototype, "price");
    __decorate([
        typeorm_1.Column({ type: 'int' })
    ], OrderDetail.prototype, "quantity");
    __decorate([
        typeorm_1.ManyToOne(function () { return item_entity_1.Item; }, function (item) { return item.order_details; })
    ], OrderDetail.prototype, "item");
    __decorate([
        typeorm_1.ManyToOne(function () { return order_entity_1.Order; }, function (order) { return order.order_details; })
    ], OrderDetail.prototype, "order");
    OrderDetail = __decorate([
        typeorm_1.Entity({ name: order_detail_constant_1.ORDER_DETAIL_CONST.MODEL_NAME })
    ], OrderDetail);
    return OrderDetail;
}(BaseEntity_1.BaseEntity));
exports.OrderDetail = OrderDetail;
