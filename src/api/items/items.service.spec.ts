import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';

const itemdata = {
  nameItem: 'item',
  barcode: '12121244',
  priceIM: 12000,
  priceEX: 13000,
  quantity: 10,
  categoryId: 1,
}
const file = 'a.jpg';
describe('ItemsService', () => {
  let service: ItemsService;
  const mockItemRepository = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService, {
        provide: ItemsService,
        useValue: mockItemRepository,
      }],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create item', () => {
    it('should create item after create', async () => {

      expect(await service.create(itemdata, file)).toEqual(itemdata);

    })
  });
});
