import { Test, TestingModule } from '@nestjs/testing';
import { ItemFlashsaleController } from './item_flashsale.controller';
import { ItemFlashsaleService } from './item_flashsale.service';

describe('ItemFlashsaleController', () => {
  let controller: ItemFlashsaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemFlashsaleController],
      providers: [ItemFlashsaleService],
    }).compile();

    controller = module.get<ItemFlashsaleController>(ItemFlashsaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
