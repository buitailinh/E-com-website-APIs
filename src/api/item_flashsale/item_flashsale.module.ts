import { UsersModule } from './../users/users.module';
import { FlashSaleModule } from './../flash_sale/flash_sale.module';
import { item_flashsaleProvider } from './item_flashsale.provider';
import { ItemFlashsaleRepository } from './item_flashsale.repository';
import { ItemsModule } from './../items/items.module';
import { DatabaseModule } from './../../config/database/database.module';
import { Module } from '@nestjs/common';
import { ItemFlashsaleService } from './item_flashsale.service';
import { ItemFlashsaleController } from './item_flashsale.controller';

@Module({
  imports: [DatabaseModule, ItemsModule, UsersModule],
  controllers: [ItemFlashsaleController],
  providers: [
    ItemFlashsaleService,
    ItemFlashsaleRepository,
    ...item_flashsaleProvider,
  ],
  exports: [ItemFlashsaleService, ItemFlashsaleRepository],
})
export class ItemFlashsaleModule { }
