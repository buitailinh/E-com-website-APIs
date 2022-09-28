import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteItemService } from './favorite_item.service';

describe('FavoriteItemService', () => {
  let service: FavoriteItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteItemService],
    }).compile();

    service = module.get<FavoriteItemService>(FavoriteItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
