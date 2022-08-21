import { Test, TestingModule } from '@nestjs/testing';
import { FlashSaleController } from './flash_sale.controller';
import { FlashSaleService } from './flash_sale.service';

describe('FlashSaleController', () => {
  let controller: FlashSaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashSaleController],
      providers: [FlashSaleService],
    }).compile();

    controller = module.get<FlashSaleController>(FlashSaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
