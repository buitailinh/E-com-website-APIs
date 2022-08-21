import { FlashSale } from './../flash_sale/entities/flash_sale.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ItemsService } from '../items/items.service';
import { CreateItemFlashsaleDto } from './dto/create-item_flashsale.dto';
import { UpdateItemFlashsaleDto } from './dto/update-item_flashsale.dto';
import { ItemFlashsaleRepository } from './item_flashsale.repository';

@Injectable()
export class ItemFlashsaleService {
  constructor(
    public itemFSRepository: ItemFlashsaleRepository,
    private readonly itemsService: ItemsService,
  ) { };

  async findAll() {
    return await this.itemFSRepository.find();
  }

  async findOne(id: number) {
    const itemFS = await this.itemFSRepository.findOneByCondition({
      where: id,
      relations: ['item'],
    });
    // console.log(itemFS);
    if (!itemFS) return null;
    return itemFS;
  }

  async create(
    createItemFlashsaleDto: CreateItemFlashsaleDto,
    flashSale: FlashSale,
  ) {
    const { sale, quantity, itemId } = createItemFlashsaleDto;
    const item = await this.itemsService.getById(itemId);
    if (quantity > item.quantity)
      throw new NotFoundException({
        message: 'quantity item must be greater than ... quantity item sale',
      });

    const itemFSNew = {
      sale,
      quantity,
      item,
      flashSale,
    };
    return await this.itemFSRepository.save(itemFSNew);
  }

  async update(id: number, updateItemFlashsaleDto: UpdateItemFlashsaleDto) {
    try {
      const { quantity, sale } = updateItemFlashsaleDto;
      const itemFS = await this.findOne(id);
      if (itemFS === null) throw new NotFoundException({ message: 'Item Flashsale not found' });
      const item = await this.itemsService.getById(itemFS.item.id);

      if (quantity) {
        if (quantity > item.quantity + itemFS.quantity)
          throw new NotFoundException({
            message: 'quantity item must be greater than ... quantity item sale',
          });
        item.quantity = item.quantity + itemFS.quantity - quantity;
        await this.itemsService.save(item);
      }

      const itemFSUpdated = Object.assign(itemFS, UpdateItemFlashsaleDto);
      return await this.itemFSRepository.update(id, itemFSUpdated);

    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }

  async remove(id: number) {
    const itemFS = await this.findOne(id);
    if (itemFS === null) throw new NotFoundException({ message: 'Item Flashsale not found' });
    await this.itemFSRepository.delete(id);
    return { message: 'Item Flashsale removed' };
  }
}
