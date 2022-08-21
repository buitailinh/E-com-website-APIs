"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.VoucherController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var voucher_entity_1 = require("./entities/voucher.entity");
var VoucherController = /** @class */ (function () {
    function VoucherController(voucherService) {
        this.voucherService = voucherService;
    }
    VoucherController.prototype.findAll = function (query) {
        return this.voucherService.findAll(query);
    };
    VoucherController.prototype.findOne = function (id) {
        return this.voucherService.findOne(+id);
    };
    VoucherController.prototype.create = function (createVoucherDto) {
        return this.voucherService.create(createVoucherDto);
    };
    VoucherController.prototype.update = function (id, updateVourchDto) {
        return this.voucherService.update(+id, updateVourchDto);
    };
    VoucherController.prototype.remove = function (id) {
        return this.voucherService.remove(+id);
    };
    __decorate([
        swagger_1.ApiOkResponse({
            type: voucher_entity_1.Voucher,
            description: 'List voucher'
        }),
        common_1.Get(),
        __param(0, common_1.Query())
    ], VoucherController.prototype, "findAll");
    __decorate([
        swagger_1.ApiOkResponse({
            type: voucher_entity_1.Voucher,
            description: 'information about Voucher'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], VoucherController.prototype, "findOne");
    __decorate([
        swagger_1.ApiOkResponse({
            type: voucher_entity_1.Voucher,
            description: 'Create a new Voucher successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Voucher cannot create. Try again!'
        }),
        common_1.Post(),
        __param(0, common_1.Body())
    ], VoucherController.prototype, "create");
    __decorate([
        swagger_1.ApiOkResponse({
            type: voucher_entity_1.Voucher,
            description: 'Update voucher successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Voucher cannot update. Try again!'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        common_1.Patch(':id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], VoucherController.prototype, "update");
    __decorate([
        swagger_1.ApiOkResponse({
            description: 'Delete a voucher successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Voucher cannot delete. Try again!'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], VoucherController.prototype, "remove");
    VoucherController = __decorate([
        common_1.Controller('voucher')
    ], VoucherController);
    return VoucherController;
}());
exports.VoucherController = VoucherController;
