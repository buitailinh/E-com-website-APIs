import { VoucherModule } from './../voucher/voucher.module';
import { DatabaseModule } from './../../config/database/database.module';
import { OrderDetailModule } from './../order_detail/order_detail.module';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { orderProvider } from './order.provider';


@Module({
  imports: [DatabaseModule, UsersModule, OrderDetailModule, VoucherModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, ...orderProvider],
  exports: [OrderService, OrderRepository]
})
export class OrderModule { }
