import { Test, TestingModule } from '@nestjs/testing';
import { ItemFlashsaleService } from './item_flashsale.service';

describe('ItemFlashsaleService', () => {
  let service: ItemFlashsaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemFlashsaleService],
    }).compile();

    service = module.get<ItemFlashsaleService>(ItemFlashsaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
