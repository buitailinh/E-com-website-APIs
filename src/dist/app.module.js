"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var database_module_1 = require("./config/database/database.module");
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var logger_middleware_1 = require("./share/middlewares/logger.middleware");
var category_module_1 = require("./api/category/category.module");
var items_module_1 = require("./api/items/items.module");
var images_module_1 = require("./api/images/images.module");
var users_module_1 = require("./api/users/users.module");
var auth_module_1 = require("./share/auth/auth.module");
var voucher_module_1 = require("./api/voucher/voucher.module");
var flash_sale_module_1 = require("./api/flash_sale/flash_sale.module");
var item_flashsale_module_1 = require("./api/item_flashsale/item_flashsale.module");
var order_detail_module_1 = require("./api/order_detail/order_detail.module");
var order_module_1 = require("./api/order/order.module");
var sendmail_module_1 = require("./share/sendmail/sendmail.module");
var otp_module_1 = require("./share/otp/otp.module");
var cronjob_module_1 = require("./share/cornjob/cronjob.module");
var cronjob_service_1 = require("./share/cornjob/cronjob.service");
var schedule_1 = require("@nestjs/schedule");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    };
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot(),
                schedule_1.ScheduleModule.forRoot(),
                database_module_1.DatabaseModule,
                category_module_1.CategoryModule,
                items_module_1.ItemsModule,
                images_module_1.ImagesModule,
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                voucher_module_1.VoucherModule,
                flash_sale_module_1.FlashSaleModule,
                item_flashsale_module_1.ItemFlashsaleModule,
                order_detail_module_1.OrderDetailModule,
                order_module_1.OrderModule,
                sendmail_module_1.SendmailModule,
                otp_module_1.OtpModule,
                cronjob_module_1.CronjobModule
            ],
            controllers: [],
            providers: [
                cronjob_service_1.CronjobService
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
