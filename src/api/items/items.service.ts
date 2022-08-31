import { AppObject } from './../../share/common/app.object';
import { async } from 'rxjs';
import { AppKey } from './../../share/common/app.key';
import { OrderDetail } from './../order_detail/entities/order_detail.entity';
import { query } from 'express';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Between, Like, ObjectID } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { ItemRepository } from './items.repository';
import * as fs from 'fs';
import { CategoryService } from '../category/category.service';
import { getConnection } from 'typeorm';
@Injectable()
export class ItemsService {
  save(item: Item) {
    throw new Error('Method not implemented.');
  }
  constructor(
    public itemRepository: ItemRepository,
    private readonly categoryService: CategoryService,
  ) { }

  async findAll(query) {
    const take = query.take || process.env.TAKE_PAGE;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keywork || '';
    const totalmin = query.totalmin || 0;
    const totalmax = query.totalmax || +10E+10;
    const data = await this.itemRepository.findAndOptions({
      where: {
        nameItem: Like('%' + keyword + '%'),
        total: Between(totalmin, totalmax),
      },
      order: {
        nameItem: query.order === 'descend' ? 'DESC' : 'ASC',
      },

      take: take,
      skip: skip,
    });
    return await this.itemRepository.paginateResponse(data, page, take);
  }

  async getById(id: number): Promise<Item> {
    const item = await this.itemRepository.findOneByCondition({
      where: {
        id,
      },
      relations: ['images', 'category'],
    });
    if (!item)
      throw new NotFoundException({
        message: AppKey.ERROR_MESSAGE.ITEM.ERR_NOT_EXIST,
      });

    return item;
  }

  async getByName(nameItem: string): Promise<Item | null> {
    const item = await this.itemRepository.findOneByCondition({
      where: {
        nameItem,
      },
    });
    if (!item) return null;

    return item;
  }

  async getByBarCode(barcode: string): Promise<Item | null> {
    const item = await this.itemRepository.findOneByCondition({
      where: {
        barcode,
      },
    });
    if (!item) return null;

    return item;
  }

  async getByItemSale() {
    const items = await this.itemRepository.findAndOptions({
      where: {
        is_sale: true,
      }
    });
    if (items) return items;
    return { message: 'Not have items sale' };
  }

  async create(
    createItemDto: CreateItemDto,
    imageMain?: string,
  ): Promise<Item> {
    const {
      nameItem,
      categoryId,
      barcode,
      priceIM,
      priceEX,
      quantity,
      ...data
    } = createItemDto;
    const nameItemFound = await this.getByName(nameItem);
    if (nameItemFound)
      throw new NotFoundException({
        message: AppKey.ERROR_MESSAGE.ITEM.ERR_NAMEITEM_EXIST,
      });
    const barcodeFound = await this.itemRepository.findOneByCondition({
      where: { barcode },
    });
    if (barcodeFound)
      throw new NotFoundException({
        message: AppKey.ERROR_MESSAGE.ITEM.ERR_BARCODE_EXIST,
      });
    const category = await this.categoryService.getById(categoryId);
    category.amount++;
    await this.categoryService.categoryRepository.save(category);
    if (priceEX < priceIM)
      throw new NotFoundException({
        message: AppKey.ERROR_MESSAGE.ITEM.ERR_PRICE,
      });
    const itemNew = {
      nameItem,
      category,
      barcode,
      priceEX,
      priceIM,
      imageMain,
      quantity,
      total: priceEX,
      ...data,
    };

    return await this.itemRepository.save(itemNew);
  }

  async update(id: number, updateItemDto: UpdateItemDto, image: string) {
    const { priceIM, priceEX, quantity, nameItem, description, sale } =
      updateItemDto;
    const item = this.getById(id);
    if (!item)
      throw new NotFoundException({
        message: AppKey.ERROR_MESSAGE.ITEM.ERR_NOT_EXIST,
      });
    if (priceEX < priceIM)
      throw new NotFoundException({
        message: AppKey.ERROR_MESSAGE.ITEM.ERR_PRICE,
      });
    if (image) {
      await this.removeFile(id);
    }
    const itemFeld = {
      imageMain: image,
      priceIM,
      priceEX,
      quantity,
      nameItem,
      description,
      sale,
    };
    const itemUpdate = Object.assign(item, itemFeld);
    await this.itemRepository.update(id, itemUpdate);
    return { message: `update successfully ${id}` };
  }

  async updateImageMain(id: number, imageMain: string) {
    // const item = await this.getById(id);
    const item = await this.removeFile(id);
    item.imageMain = imageMain;
    return await this.itemRepository.save(item);
  }

  async purchaseItem(id: number, amount: number) {
    const item = await this.getById(id);
    if (item.quantity === 0) throw new ConflictException('Item out of stock');
    item.quantity = item.quantity - amount;
    if (item.quantity < 0)
      throw new ConflictException(
        'Quantity ordered exceeds the number of items available',
      );
    return await this.itemRepository.save(item);
  }

  async addSLB(id: number, amount: number) {
    const item = await this.getById(id);
    item.quantity = parseInt(item.quantity.toString()) + parseInt(amount.toString());
    return await this.itemRepository.save(item);
  }

  async getItemForOrder(id: number) {
    const query = await getConnection()
      .createQueryBuilder()
      .select('item')
      .addSelect('order_detail')
      .addSelect('order')
      .from(Item, 'item')
      .leftJoin('item.order_details', 'order_detail')
      .leftJoin('order_detail.order', 'order')
      .where('item.id = :id', { id })
      .andWhere('order_detail.itemId= :id', { id })
      .andWhere('order.status = :status', { status: AppObject.ORDER.STATUS.WFC })
      .execute();

    return query[0];
  }

  async remove(id: number) {
    const result = await this.getItemForOrder(id);
    console.log(result);

    if (result) {
      throw new NotFoundException('Item in the process of selling');
    }
    const item = await this.getById(id);
    const category = await this.categoryService.getById(item.category.id);
    category.amount--;
    await this.categoryService.categoryRepository.save(category);
    await this.removeFile(id);
    await this.itemRepository.delete(id);
    return { message: `This action removes a #${id} item` };
  }


  async removeFile(id: number) {
    const item = await this.getById(id);

    if (!item)
      throw new NotFoundException({
        message: AppKey.ERROR_MESSAGE.ITEM.ERR_NOT_EXIST,
      });
    if (!item.imageMain) {
      return item
    };
    try {
      const link = `./images/itemMain/${item.imageMain}`;
      fs.unlinkSync(link);
      console.log('Successfully deleted the file.');
    } catch (err) {
      throw err;
    }
    const imageUpdate = {
      imageMain: null,
    };
    const itemUpdate = Object.assign(item, imageUpdate);
    await this.itemRepository.update(id, itemUpdate);
    return item;
  }


  async getItemWithFS(id: number) {
    const timeNow = new Date();
    const query = await getConnection()
      .createQueryBuilder()
      .select('item')
      .addSelect('item_flashsale')
      .addSelect('flash_sale')
      .addSelect('item.priceEX', 'price')
      .addSelect(
        '(item.priceEX*(100-item_flashsale.sale))/100',
        'total',
      )
      .from(Item, 'item')
      .leftJoin('item.itemFlashSales', 'item_flashsale')
      .leftJoin('item_flashsale.flashSale', 'flash_sale')
      .where('item.id = :id', { id })
      .andWhere('flash_sale.timeStart <= :timeNow', { timeNow })
      .andWhere('flash_sale.timeEnd >= :timeNow', { timeNow })
      .execute();

    return query[0];
  }


  async updateIsSaleTrue(id: number) {
    const item = await this.getById(id);
    if (!item.is_sale) {
      item.is_sale = true;
      return await this.itemRepository.save(item);
    }
    // console.log(item);
  }

  async updateIsSaleFalse(id: number) {
    const item = await this.getById(id);
    if (item.is_sale) {
      return await this.itemRepository.save({
        ...item,
        is_sale: false,
        total: item.priceEX * (100 - item.sale) / 100,
      });
    }
  }

  async exportData1() {
    console.log('exportData');
    return { message: 'daata' };

  }

}
