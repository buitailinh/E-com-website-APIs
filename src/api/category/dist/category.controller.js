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
exports.CategoryController = void 0;
var category_entity_1 = require("./entities/category.entity");
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var category_constant_1 = require("./category.constant");
var swagger_1 = require("@nestjs/swagger");
var CategoryController = /** @class */ (function () {
    function CategoryController(categoryService) {
        this.categoryService = categoryService;
    }
    CategoryController.prototype.findAll = function (query) {
        return this.categoryService.findAll(query);
    };
    CategoryController.prototype.findById = function (id) {
        return this.categoryService.getById(+id);
    };
    CategoryController.prototype.create = function (image, createCategoryDto) {
        return this.categoryService.create(createCategoryDto, image === null || image === void 0 ? void 0 : image.filename);
    };
    // @UseGuards(JwtGuard)
    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file', multerOptions))
    // async upload(@UploadedFile() file) {
    //   console.log(file)
    //   return file;
    // }
    CategoryController.prototype.seeFile = function (image, res) {
        return res.sendFile(image, { root: './images/Category' });
    };
    CategoryController.prototype.update = function (id, image, updateCategoryDto) {
        return this.categoryService.update(+id, updateCategoryDto, image === null || image === void 0 ? void 0 : image.filename);
    };
    CategoryController.prototype.updateImage = function (id, image) {
        return this.categoryService.updateImage(+id, image === null || image === void 0 ? void 0 : image.filename);
    };
    CategoryController.prototype.remove = function (id) {
        return this.categoryService.remove(+id);
    };
    CategoryController.prototype.removeFile = function (id) {
        return this.categoryService.removeFile(+id);
    };
    __decorate([
        swagger_1.ApiOkResponse({
            type: category_entity_1.Category,
            description: 'List category'
        }),
        common_1.Get(),
        __param(0, common_1.Query())
    ], CategoryController.prototype, "findAll");
    __decorate([
        swagger_1.ApiOkResponse({
            type: category_entity_1.Category,
            description: 'information about item'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], CategoryController.prototype, "findById");
    __decorate([
        swagger_1.ApiOkResponse({
            type: category_entity_1.Category,
            description: 'Create a new category successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Category cannot create. Try again!'
        }),
        swagger_1.ApiConsumes('multipart/form-data'),
        common_1.Post(),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file', category_constant_1.multerOptions)),
        __param(0, common_1.UploadedFile()), __param(1, common_1.Body())
    ], CategoryController.prototype, "create");
    __decorate([
        swagger_1.ApiOkResponse({ description: 'see file image' }),
        swagger_1.ApiBadRequestResponse({ description: 'not found' }),
        common_1.Get('/images/:image'),
        __param(0, common_1.Param('image')), __param(1, common_1.Res())
    ], CategoryController.prototype, "seeFile");
    __decorate([
        swagger_1.ApiOkResponse({
            type: category_entity_1.Category,
            description: 'Update category successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Category cannot update. Try again!'
        }),
        swagger_1.ApiConsumes('multipart/form-data'),
        common_1.Patch(':id'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file', category_constant_1.multerOptions)),
        __param(0, common_1.Param('id')), __param(1, common_1.UploadedFile()), __param(2, common_1.Body())
    ], CategoryController.prototype, "update");
    __decorate([
        swagger_1.ApiOkResponse({
            type: category_entity_1.Category,
            description: 'Update image category successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Category cannot update image. Try again!'
        }),
        swagger_1.ApiConsumes('multipart/form-data'),
        common_1.Patch(':id'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file', category_constant_1.multerOptions)),
        __param(0, common_1.Param('id')), __param(1, common_1.UploadedFile())
    ], CategoryController.prototype, "updateImage");
    __decorate([
        swagger_1.ApiOkResponse({
            description: 'Delete a category successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Category cannot delete. Try again!'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], CategoryController.prototype, "remove");
    __decorate([
        swagger_1.ApiOkResponse({
            type: category_entity_1.Category,
            description: 'Delete image category successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Category cannot delete image. Try again!'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        common_1.Delete('/image/:id'),
        __param(0, common_1.Param('id'))
    ], CategoryController.prototype, "removeFile");
    CategoryController = __decorate([
        swagger_1.ApiTags('Category'),
        common_1.Controller('category')
    ], CategoryController);
    return CategoryController;
}());
exports.CategoryController = CategoryController;
