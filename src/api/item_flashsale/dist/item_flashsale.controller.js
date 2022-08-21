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
exports.ItemFlashsaleController = void 0;
var create_flash_sale_dto_1 = require("./../flash_sale/dto/create-flash_sale.dto");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var ItemFlashsaleController = /** @class */ (function () {
    function ItemFlashsaleController(itemFlashsaleService) {
        this.itemFlashsaleService = itemFlashsaleService;
    }
    ItemFlashsaleController.prototype.findAll = function () {
        return this.itemFlashsaleService.findAll();
    };
    ItemFlashsaleController.prototype.findOne = function (id) {
        return this.itemFlashsaleService.findOne(+id);
    };
    // @Post(':id')
    // async create(@Body() createItemFlashsaleDto: CreateItemFlashsaleDto, @Param('id') id: string) {
    //   const flashSale = await this.flashSaleService.findOne(+id);
    //   if (flashSale === null) throw new NotFoundException({ message: ' id flash sale not defined' });
    //   return this.itemFlashsaleService.create(createItemFlashsaleDto, flashSale);
    // }
    ItemFlashsaleController.prototype.update = function (id, updateItemFlashsaleDto) {
        return this.itemFlashsaleService.update(+id, updateItemFlashsaleDto);
    };
    ItemFlashsaleController.prototype.remove = function (id) {
        return this.itemFlashsaleService.remove(+id);
    };
    __decorate([
        swagger_1.ApiOkResponse({
            type: create_flash_sale_dto_1.Item_FlashSale,
            description: 'List item flash sale'
        }),
        common_1.Get()
    ], ItemFlashsaleController.prototype, "findAll");
    __decorate([
        swagger_1.ApiOkResponse({
            type: create_flash_sale_dto_1.Item_FlashSale,
            description: 'Information item flash sale'
        }),
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], ItemFlashsaleController.prototype, "findOne");
    __decorate([
        swagger_1.ApiOkResponse({
            type: create_flash_sale_dto_1.Item_FlashSale,
            description: 'Update item flash sale successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Item flash sale cannot update. Try again!'
        }),
        common_1.Patch(':id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], ItemFlashsaleController.prototype, "update");
    __decorate([
        swagger_1.ApiOkResponse({
            description: 'Delete a item flash sale successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Item flash sale cannot delete. Try again!'
        }),
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], ItemFlashsaleController.prototype, "remove");
    ItemFlashsaleController = __decorate([
        swagger_1.ApiTags('Item flash sale'),
        common_1.Controller('item-flashsale')
    ], ItemFlashsaleController);
    return ItemFlashsaleController;
}());
exports.ItemFlashsaleController = ItemFlashsaleController;
