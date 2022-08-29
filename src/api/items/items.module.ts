import { UsersModule } from './../users/users.module';
import { CategoryModule } from './../category/category.module';

import { itemProvider } from './items.provider';
import { ItemRepository } from './items.repository';
import { forwardRef, Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { DatabaseModule } from '../../config/database/database.module';
import { ExportDataService } from './exportData.service';


@Module({
  imports: [DatabaseModule, CategoryModule, UsersModule
    // forwardRef(() => ImagesModule,)
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ExportDataService, ItemRepository, ...itemProvider],
  exports: [ItemsService, ExportDataService, ItemRepository,]
})
export class ItemsModule { }
