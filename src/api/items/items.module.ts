
import { itemProvider } from './items.provider';
import { ItemRepository } from './items.repository';
import { forwardRef, Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { DatabaseModule } from 'src/config/database/database.module';


@Module({
  imports: [DatabaseModule,
    // forwardRef(() => ImagesModule,)
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemRepository, ...itemProvider],
  exports: [ItemsService, ItemRepository,]
})
export class ItemsModule { }
