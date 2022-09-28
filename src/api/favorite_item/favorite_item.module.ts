import { Module } from '@nestjs/common';
import { FavoriteItemService } from './favorite_item.service';
import { FavoriteItemController } from './favorite_item.controller';

@Module({
  controllers: [FavoriteItemController],
  providers: [FavoriteItemService]
})
export class FavoriteItemModule {}
