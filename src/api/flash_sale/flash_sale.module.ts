import { QueueModule } from './../../share/queue/queue.module';
import { ItemFlashsaleModule } from './../item_flashsale/item_flashsale.module';
import { FlashSaleRepository } from './flash_sale.repository';
import { flashSaleProvider } from './flash_sale.provider';
import { DatabaseModule } from './../../config/database/database.module';
import { Module } from '@nestjs/common';
import { FlashSaleService } from './flash_sale.service';
import { FlashSaleController } from './flash_sale.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, ItemFlashsaleModule, UsersModule, QueueModule],
  controllers: [FlashSaleController],
  providers: [FlashSaleService, FlashSaleRepository, ...flashSaleProvider],
  exports: [FlashSaleService, FlashSaleRepository]
})
export class FlashSaleModule { }
