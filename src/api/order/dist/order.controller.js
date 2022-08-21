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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.OrderController = void 0;
var order_entity_1 = require("./entities/order.entity");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var OrderController = /** @class */ (function () {
    function OrderController(orderService, userService) {
        this.orderService = orderService;
        this.userService = userService;
    }
    OrderController.prototype.findAll = function (query) {
        return this.orderService.findAll(query);
    };
    OrderController.prototype.getUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findOne(id)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, this.orderService.getOrderByUser(user)];
                }
            });
        });
    };
    OrderController.prototype.findOne = function (id) {
        return this.orderService.findOne(+id);
    };
    OrderController.prototype.create = function (createOrderDto, id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findOne(id)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, this.orderService.create(createOrderDto, user)];
                }
            });
        });
    };
    OrderController.prototype.update = function (id, updateOrderDto) {
        return this.orderService.update(+id, updateOrderDto);
    };
    OrderController.prototype.remove = function (id) {
        return this.orderService.remove(+id);
    };
    __decorate([
        swagger_1.ApiOkResponse({
            type: order_entity_1.Order,
            description: 'List order'
        }),
        common_1.Get(),
        __param(0, common_1.Query())
    ], OrderController.prototype, "findAll");
    __decorate([
        swagger_1.ApiOkResponse({
            type: order_entity_1.Order,
            description: 'information User order'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        common_1.Get('user/:id'),
        __param(0, common_1.Param('id'))
    ], OrderController.prototype, "getUser");
    __decorate([
        swagger_1.ApiOkResponse({
            type: order_entity_1.Order,
            description: 'information about order'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], OrderController.prototype, "findOne");
    __decorate([
        swagger_1.ApiOkResponse({
            type: order_entity_1.Order,
            description: 'Create a new order successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Order cannot create. Try again!'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        swagger_1.ApiBody({}),
        common_1.Post(':id'),
        __param(0, common_1.Body()), __param(1, common_1.Param('id'))
    ], OrderController.prototype, "create");
    __decorate([
        swagger_1.ApiOkResponse({
            type: order_entity_1.Order,
            description: 'Update a new order successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Order cannot update. Try again!'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        swagger_1.ApiBody({}),
        common_1.Patch(':id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], OrderController.prototype, "update");
    __decorate([
        swagger_1.ApiOkResponse({
            description: 'delete a new order successfully'
        }),
        swagger_1.ApiBadRequestResponse({
            description: 'Order cannot delete. Try again!'
        }),
        swagger_1.ApiParam({ name: 'id' }),
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], OrderController.prototype, "remove");
    OrderController = __decorate([
        swagger_1.ApiTags('Order'),
        common_1.Controller('order')
    ], OrderController);
    return OrderController;
}());
exports.OrderController = OrderController;
