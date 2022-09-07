import { addItem_FlashSaleDto } from './dto/addItemFS.dto';
import { QueueService } from './../../share/queue/queue.service';
import { FlashSaleRepository } from './flash_sale.repository';
import { Injectable, NotFoundException, ConflictException, BadRequestException, HttpStatus } from '@nestjs/common';
import { CreateFlashSaleDto, Item_FlashSale } from './dto/create-flash_sale.dto';
import { UpdateFlashSaleDto } from './dto/update-flash_sale.dto';
import { Like, getConnection } from 'typeorm';
import { ItemFlashsaleService } from '../item_flashsale/item_flashsale.service';
const dateNow = new Date();

@Injectable()
export class FlashSaleService {
  constructor(public flashSaleRepository: FlashSaleRepository,
    private itemFSService: ItemFlashsaleService,
    private queueService: QueueService,
  ) { }

  async findAll(query) {
    const take = query.take || process.env.TAKE_PAGE;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';

    const data = await this.flashSaleRepository.findAndOptions({
      where: { nameSale: Like('%' + keyword + '%') },
      order: {
        nameSale: query.order,
      },
      take: take,
      skip: skip,
    });

    return this.flashSaleRepository.paginateResponse(data, page, take);
  }

  async findOne(id: number) {
    const sale = await this.flashSaleRepository.findOneByCondition({
      where: {
        id,
      },
      relations: ['itemFlashSales'],
    });
    if (!sale) return null;
    return sale;
  }

  async findByName(nameSale: string) {
    const sale = await this.flashSaleRepository.findOneByCondition({
      where: {
        nameSale,
      },
      relations: ['itemFlashSales'],
    });
    if (!sale) return null;
    return sale;
  }

  async create(createFlashSaleDto: CreateFlashSaleDto) {
    const { nameSale, timeStart, timeEnd, itemFlashSale, ...data } = createFlashSaleDto;
    const nameFS = await this.findByName(nameSale);
    if (nameFS !== null) throw new BadRequestException('Name sale is exited');
    const timeS = new Date(timeStart);
    const timeE = new Date(timeEnd);
    // console.log('hour:' + timeE.getHours() + ' minutes:' + timeE.getMinutes() + ' seconds:' + timeE.getSeconds());
    if (timeS.getTime() < dateNow.getTime()) {
      throw new ConflictException('start time must not be less than current time');
    }
    if (timeS.getTime() > timeE.getTime())
      throw new ConflictException('the start time cannot be greater than the end time');
    const checkTime = await this.checkTime(timeStart, timeEnd);

    if (checkTime)
      throw new ConflictException('The times do not coincide');
    const saleNew = {
      nameSale,
      timeStart,
      timeEnd,
      ...data,
    };
    const fs = await this.flashSaleRepository.save(saleNew);
    if (fs) {
      const itemFS = itemFlashSale.map((item_fs) => {
        return this.itemFSService.create(item_fs, fs);
      });
      await Promise.all(itemFS);
      await this.queueService.sendStart(fs.id, timeStart.getTime() - Date.now())
      await this.queueService.sendEnd(fs.id, timeEnd.getTime() - Date.now())
      return fs;

    }
  }

  async update(id: number, updateFlashSaleDto: UpdateFlashSaleDto) {
    const { timeStart, timeEnd, ...data } = updateFlashSaleDto;
    // console.log(updateFlashSaleDto);
    const saleFound = await this.findOne(id);
    if (saleFound === null)
      throw new NotFoundException(`Not found sale id ${id}`);
    const timeS = new Date(timeStart);
    const timeE = new Date(timeEnd);
    // console.log(timeStart.getTime())
    if (timeS.getTime() < dateNow.getTime()) {
      throw new ConflictException('start time must not be less than current time');
    }
    if (timeS.getTime() > timeE.getTime())
      throw new ConflictException('the start time cannot be greater than the end time');
    const checkTime = await this.checkTime(timeStart, timeEnd);
    if (checkTime)
      throw new ConflictException('The times do not coincide');
    const saleUpdate = {
      timeStart,
      timeEnd,
      ...data,
    };
    await this.flashSaleRepository.update(id, saleUpdate);

    await this.queueService.sendStart(id, timeStart.getTime() - Date.now())
    await this.queueService.sendEnd(id, timeEnd.getTime() - Date.now())
    return { message: `Sale updated successfully with id is ${id}` };
  }

  async addItemFS(id: number, additemFlashSale: addItem_FlashSaleDto) {
    const { itemFlashSale } = additemFlashSale;
    const saleFound = await this.findOne(id);
    if (saleFound === null)
      throw new NotFoundException(`Not found sale id ${id}`);
    const itemFS = itemFlashSale.map((item_fs) => {
      return this.itemFSService.create(item_fs, saleFound);
    });
    await Promise.all(itemFS);

    return {
      message: `add item for flash sale ${saleFound.nameSale}  successfully`,
      HttpStatus: 200
    }
  }

  async removeItemFS(id: number, idItem: number) {
    const saleFound = await this.findOne(id);
    if (saleFound === null)
      throw new NotFoundException(`Not found sale id ${id}`);
    const items = saleFound.itemFlashSales;
    const rmfs = await items.map(async (item_fs) => {
      const itemFS = await this.itemFSService.findOne(item_fs.id);
      console.log(itemFS);
      if (itemFS !== null && +itemFS.item.id === idItem) {
        this.itemFSService.remove(itemFS.id);
        console.log('remove item flash sale successfully')
        return { message: 'remove item flash sale successfully' };
      }
    })
    await Promise.all(rmfs);
    // return { message: 'remove item flash sale successfully' };
  }

  async remove(id: number) {
    const saleFound = await this.findOne(id);
    if (saleFound === null)
      throw new NotFoundException(`Not found sale id ${id}`);
    const itemFS = await this.itemFSService.itemFSRepository.findAndOptions({
      where: { flashSale: saleFound },
    })
    await this.itemFSService.itemFSRepository.delete(itemFS);

    await this.flashSaleRepository.delete(id);

    return { message: `Sale removed successfully with id ${id}` };
  }

  async checkTime(timeStart: Date, timeEnd: Date) {
    const checkTime = await getConnection()
      .createQueryBuilder('flash_sale', 'fl')
      .where(
        '(fl.timeStart <= :timeStart AND (fl.timeEnd BETWEEN :timeStart AND :timeEnd))',
        {
          timeStart,
          timeEnd,
        },
      )
      .orWhere(
        '((fl.timeStart BETWEEN :timeStart AND :timeEnd) AND fl.timeEnd >= :timeEnd)',
        {
          timeStart,
          timeEnd,
        },
      )
      .orWhere('(fl.timeStart <= :timeStart AND  fl.timeEnd >= :timeEnd)', {
        timeStart,
        timeEnd,
      })
      .orWhere('(fl.timeStart >= :timeStart AND  fl.timeEnd <= :timeEnd)', {
        timeStart,
        timeEnd,
      })
      .getMany();

    if (checkTime.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
