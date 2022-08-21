import { ItemFlashsaleModule } from './../item_flashsale/item_flashsale.module';
import { orderDetailProvider } from './order_detail.provider';
import { OrderDetailRepository } from './order_detail.repository';
import { ItemsModule } from './../items/items.module';
import { Module } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailController } from './order_detail.controller';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
  imports: [DatabaseModule, ItemsModule, ItemFlashsaleModule],
  controllers: [OrderDetailController],
  providers: [OrderDetailService, OrderDetailRepository, ...orderDetailProvider],
  exports: [OrderDetailService, OrderDetailRepository]
})
export class OrderDetailModule { }