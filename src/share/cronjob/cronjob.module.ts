import { ItemFlashsaleModule } from '../../api/item_flashsale/item_flashsale.module';
import { FlashSaleModule } from '../../api/flash_sale/flash_sale.module';
import { Module } from '@nestjs/common';
import { ItemsModule } from './../../api/items/items.module';
import { CronjobService } from './cronjob.service';
import { SendmailModule } from '../sendmail/sendmail.module';


@Module({
  imports: [ItemsModule, FlashSaleModule, ItemFlashsaleModule, SendmailModule],
  providers: [CronjobService]
})
export class CronjobModule { }
