import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteItemController } from './favorite_item.controller';
import { FavoriteItemService } from './favorite_item.service';

describe('FavoriteItemController', () => {
  let controller: FavoriteItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteItemController],
      providers: [FavoriteItemService],
    }).compile();

    controller = module.get<FavoriteItemController>(FavoriteItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
