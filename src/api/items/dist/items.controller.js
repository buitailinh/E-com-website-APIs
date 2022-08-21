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
exports.ItemsController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var items_constant_1 = require("./items.constant");
var swagger_1 = require("@nestjs/swagger");
var item_entity_1 = require("./entities/item.entity");
var roles_decorator_1 = require("src/share/decorator/roles.decorator");
var app_object_1 = require("src/share/common/app.object");
var ItemsController = /** @class */ (function () {
    function ItemsController(itemsService) {
        this.itemsService = itemsService;
    }
    ItemsController.prototype.findAll = function (query) {
        return this.itemsService.findAll(query);
    };
    ItemsController.prototype.findOne = function (id) {
        return this.itemsService.getById(+id);
    };
    ItemsController.prototype.findByName = function (nameItem) {
        return this.itemsService.getByName(nameItem);
    };
    ItemsController.prototype.create = function (image, createItemDto) {
        console.log(createItemDto);
        return this.itemsService.create(createItemDto, image === null || image === void 0 ? void 0 : image.filename);
    };
    ItemsController.prototype.addAmount = function (id, amount) {
        return this.itemsService.addSLB(+id, amount);
    };
    ItemsController.prototype.seeFile = function (image, res) {
        return res.sendFile(image, { root: './images/itemMain' });
    };
    ItemsController.prototype.updateImageMain = function (id, image) {
        // console.log(id);
        return this.itemsService.updateImageMain(+id, image === null || image === void 0 ? void 0 : image.filename);
    };
    ItemsController.prototype.update = function (id, image, updateItemDto) {
        return this.itemsService.update(+id, updateItemDto, image === null || image === void 0 ? void 0 : image.filename);
    };
    ItemsController.prototype.remove = function (id) {
        return this.itemsService.remove(+id);
    };
    ItemsController.prototype.removeFile = function (id) {
        return this.itemsService.removeFile(+id);
    };
    __decorate([
        swagger_1.ApiOkResponse({
            description: 'List of items',
            type: item_entity_1.Item
        }),
        common_1.Get(),
        __param(0, common_1.Query())
    ], ItemsController.prototype, "findAll");
    __decorate([
        swagger_1.ApiOkResponse({
            description: 'Information about an item',
            type: item_entity_1.Item
        }),
        swagger_1.ApiParam({ name: 'id' }),
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], ItemsController.prototype, "findOne");
    __decorate([
        swagger_1.ApiOkResponse({
            type: item_entity_1.Item,
            description: 'Item details'
        }),
        swagger_1.ApiParam({ name: 'nameItem' }),
        common_1.Get(':nameItem'),
        __param(0, common_1.Param('nameItem'))
    ], ItemsController.prototype, "findByName");
    __decorate([
        swagger_1.ApiOkResponse({
            type: item_entity_1.Item,
            description: 'Create a new item object as response'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Item cannot register. Try again!'
        }),
        roles_decorator_1.Roles(app_object_1.AppObject.USER_MODULE.ROLE.ADMIN, app_object_1.AppObject.USER_MODULE.ROLE.PRO),
        common_1.Post(),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file', items_constant_1.multerOptions)),
        __param(0, common_1.UploadedFile()), __param(1, common_1.Body())
    ], ItemsController.prototype, "create");
    __decorate([
        swagger_1.ApiOkResponse({
            type: item_entity_1.Item,
            description: 'Add  quantity of item object as response'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Item cannot  add quantity. Try again!'
        }),
        common_1.Post('addAmount/:id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body('amount'))
    ], ItemsController.prototype, "addAmount");
    __decorate([
        swagger_1.ApiOkResponse({
            description: 'See file Image of item'
        }),
        common_1.Get('/images/:image'),
        __param(0, common_1.Param('image')), __param(1, common_1.Res())
    ], ItemsController.prototype, "seeFile");
    __decorate([
        swagger_1.ApiOkResponse({
            type: item_entity_1.Item,
            description: 'Update image Item object as response'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Item cannot update image. Try again!'
        }),
        common_1.Patch('uploadfile/:id'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file', items_constant_1.multerOptions)),
        __param(0, common_1.Param('id')), __param(1, common_1.UploadedFile())
    ], ItemsController.prototype, "updateImageMain");
    __decorate([
        swagger_1.ApiOkResponse({
            type: item_entity_1.Item,
            description: 'Update item object as response'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Item cannot update. Try again!'
        }),
        common_1.Patch(':id'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file', items_constant_1.multerOptions)),
        __param(0, common_1.Param('id')), __param(1, common_1.UploadedFile()), __param(2, common_1.Body())
    ], ItemsController.prototype, "update");
    __decorate([
        swagger_1.ApiOkResponse({
            description: 'Delete a item object as response'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Item cannot delete. Try again!'
        }),
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], ItemsController.prototype, "remove");
    __decorate([
        swagger_1.ApiOkResponse({
            type: item_entity_1.Item,
            description: 'Delete image item object as response'
        }),
        swagger_1.ApiBadGatewayResponse({
            description: 'Item cannot delete image. Try again!'
        }),
        common_1.Delete('/image/:id'),
        __param(0, common_1.Param('id'))
    ], ItemsController.prototype, "removeFile");
    ItemsController = __decorate([
        swagger_1.ApiTags('Items'),
        common_1.Controller('items')
    ], ItemsController);
    return ItemsController;
}());
exports.ItemsController = ItemsController;
