import { Injectable, NotFoundException } from '@nestjs/common';
import { AppKey } from 'src/share/common/app.key';
import { Like } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { ItemRepository } from './items.repository';
import * as fs from 'fs';
@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) { };


  async findAll(query) {
    const take = query.take || process.env.TAKE_PAGE;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keywork || '';

    const data = await this.itemRepository.findAndOptions({
      where: { nameItem: Like('%' + keyword + '%') },
      order: {
        nameItem: query.order === "descend" ? 'DESC' : 'ASC',
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
      relations: ['images'],
    });
    if (!item) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.ITEM.ERR_NOT_EXIST });

    return item;
  }

  async getByName(nameItem: string): Promise<Item | null> {
    const item = await this.itemRepository.findOneByCondition({
      where: {
        nameItem,
      }
    });
    if (!item) return null;

    return item;
  }

  async getByBarCode(barcode: string): Promise<Item | null> {
    const item = await this.itemRepository.findOneByCondition({
      where: {
        barcode,
      }
    });
    if (!item) return null;

    return item;
  }


  async create(createItemDto: CreateItemDto, imageMain?: string): Promise<Item> {
    const { nameItem, barcode, priceIM, priceEX, sluong, sluongBan, ...data } = createItemDto;
    const nameItemFound = await this.getByName(nameItem);
    if (nameItemFound) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.ITEM.ERR_NAMEITEM_EXIST });
    const barcodeFound = await this.itemRepository.findOneByCondition({
      where: {
        barcode,
      }
    });
    if (barcodeFound) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.ITEM.ERR_BARCODE_EXIST });
    if (priceEX < priceIM) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.ITEM.ERR_PRICE });
    if (sluong < sluongBan) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.ITEM.ERR_NUMBER_VALUE });
    const itemNew = {
      nameItem,
      barcode,
      priceEX,
      priceIM,
      imageMain,
      sluong,
      sluongBan: sluongBan ? sluongBan : sluong,
      ...data,
    };

    return await this.itemRepository.save(itemNew);
  }


  async update(id: number, updateItemDto: UpdateItemDto, image: string) {
    const { priceIM, priceEX, sluong, sluongBan, ...data } = updateItemDto;
    const item = this.getById(id);
    if (!item) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.ITEM.ERR_NOT_EXIST });
    if (priceEX < priceIM) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.ITEM.ERR_PRICE });
    if (sluong < sluongBan) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.ITEM.ERR_NUMBER_VALUE });
    const itemFeld = {
      imageMain: image,
      priceIM,
      priceEX,
      sluong,
      sluongBan: sluongBan ? sluongBan : sluong,
      ...data,
    }
    const itemUpdate = Object.assign(item, itemFeld);
    await this.itemRepository.update(id, itemUpdate);
    return { message: `update successfully ${id}` };
  }

  async updateImageMain(id: number, imageMain: string) {
    const item = this.getById(id);
    if (!item) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.ITEM.ERR_NOT_EXIST });
    const itemUpdate = Object.assign(item, imageMain);
    return await this.itemRepository.update(id, itemUpdate);
  }

  async remove(id: number) {
    const item = await this.getById(id);
    if (!item) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.ITEM.ERR_NOT_EXIST });
    await this.itemRepository.delete(id);
    return { message: `This action removes a #${id} item` };
  }
  async removeFile(id: number) {
    const item = await this.getById(id);
    if (!item) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.ITEM.ERR_NOT_EXIST });
    try {
      const link = `./images/${item.imageMain}`;
      fs.unlinkSync(link)
      console.log("Successfully deleted the file.")
    } catch (err) {
      throw err
    }
    const imageUpdate = {
      imageMain: null,
    }
    const itemUpdate = Object.assign(item, imageUpdate);
    await this.itemRepository.update(id, itemUpdate);
    return item;
  }
}
