import { ItemFlashsaleModule } from './../../api/item_flashsale/item_flashsale.module';
import { ItemsModule } from './../../api/items/items.module';
import { QueueCusumer } from './queue.consumer';
import { Module, forwardRef } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bull';
import { FlashSaleModule } from 'src/api/flash_sale/flash_sale.module';

@Module({
  imports: [
    ItemsModule,
    forwardRef(() => FlashSaleModule),
    ItemFlashsaleModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 5003,
      }
    }),
    BullModule.registerQueue({
      name: 'flash-sale',
    })
  ],
  controllers: [],
  providers: [QueueService, QueueCusumer],
  exports: [QueueService],
})
export class QueueModule { }
