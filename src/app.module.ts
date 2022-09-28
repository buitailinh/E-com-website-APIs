
import { RolesGuard } from './share/auth/guards/role.guard';
import { DatabaseModule } from './config/database/database.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './share/middlewares/logger.middleware';
import { CategoryModule } from './api/category/category.module';
import { ItemsModule } from './api/items/items.module';
import { ImagesModule } from './api/images/images.module';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './share/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { VoucherModule } from './api/voucher/voucher.module';
import { FlashSaleModule } from './api/flash_sale/flash_sale.module';
import { ItemFlashsaleModule } from './api/item_flashsale/item_flashsale.module';
import { OrderDetailModule } from './api/order_detail/order_detail.module';
import { OrderModule } from './api/order/order.module';
import { SendmailModule } from './share/sendmail/sendmail.module';
import { OtpModule } from './share/otp/otp.module';
import { CronjobModule } from './share/cronjob/cronjob.module';
import { CronjobService } from './share/cronjob/cronjob.service';
import { ScheduleModule } from '@nestjs/schedule';
import { QueueModule } from './share/queue/queue.module';
import { FavoriteItemModule } from './api/favorite_item/favorite_item.module';
import { BrandsModule } from './api/brands/brands.module';
import { MinioClientModule } from './share/minio-client/minio-client.module';
import { FileUploadModule } from './api/file-upload/file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    DatabaseModule,
    CategoryModule,
    ItemsModule,
    ImagesModule,
    UsersModule,
    AuthModule,
    VoucherModule,
    FlashSaleModule,
    ItemFlashsaleModule,
    OrderDetailModule,
    OrderModule,
    SendmailModule,
    OtpModule,
    CronjobModule,
    QueueModule,
    FavoriteItemModule,
    BrandsModule,
    MinioClientModule,
    FileUploadModule
  ],
  controllers: [],
  providers: [
    CronjobService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
