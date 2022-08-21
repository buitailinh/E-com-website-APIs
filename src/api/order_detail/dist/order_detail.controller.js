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
exports.OrderDetailController = void 0;
var order_detail_entity_1 = require("./entities/order_detail.entity");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var OrderDetailController = /** @class */ (function () {
    function OrderDetailController(orderDetailService) {
        this.orderDetailService = orderDetailService;
    }
    // @Post(':id')
    // async create(@Body() createOrderDetailDto: CreateOrderDetailDto, @Param('id') id: string) {
    //   const order = await this.orderService.findOne(+id);
    //   return this.orderDetailService.create(createOrderDetailDto, order);
    // }
    OrderDetailController.prototype.findAll = function (query) {
        return this.orderDetailService.findAll(query);
    };
    OrderDetailController.prototype.findOne = function (id) {
        return this.orderDetailService.findOne(+id);
    };
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    //   return this.orderDetailService.update(+id, updateOrderDetailDto);
    // }
    OrderDetailController.prototype.remove = function (id) {
        return this.orderDetailService.remove(+id);
    };
    __decorate([
        swagger_1.ApiOkResponse({
            type: order_detail_entity_1.OrderDetail,
            description: 'List order details'
        }),
        swagger_1.ApiQuery({}),
        common_1.Get(),
        __param(0, common_1.Query())
    ], OrderDetailController.prototype, "findAll");
    __decorate([
        swagger_1.ApiOkResponse({
            type: order_detail_entity_1.OrderDetail,
            description: 'information about order details'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], OrderDetailController.prototype, "findOne");
    __decorate([
        swagger_1.ApiOkResponse({
            description: 'Delete a order detail successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Order detail cannot delete. Try again!'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], OrderDetailController.prototype, "remove");
    OrderDetailController = __decorate([
        swagger_1.ApiTags('Order detail'),
        common_1.Controller('order-detail')
    ], OrderDetailController);
    return OrderDetailController;
}());
exports.OrderDetailController = OrderDetailController;
