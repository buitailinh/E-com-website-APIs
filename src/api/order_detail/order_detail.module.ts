
import { UsersModule } from './../users/users.module';
import { ItemFlashsaleModule } from './../item_flashsale/item_flashsale.module';
import { orderDetailProvider } from './order_detail.provider';
import { OrderDetailRepository } from './order_detail.repository';
import { ItemsModule } from './../items/items.module';
import { Module } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailController } from './order_detail.controller';
import { DatabaseModule } from '../../config/database/database.module';
import { ExportDataService } from './exportData.service';

@Module({
  imports: [DatabaseModule, ItemsModule, ItemFlashsaleModule, UsersModule],
  controllers: [OrderDetailController],
  providers: [OrderDetailService, ExportDataService, OrderDetailRepository, ...orderDetailProvider],
  exports: [OrderDetailService, ExportDataService, OrderDetailRepository]
})
export class OrderDetailModule { }
