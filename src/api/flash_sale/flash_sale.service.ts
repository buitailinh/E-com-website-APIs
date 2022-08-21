import { FlashSaleRepository } from './flash_sale.repository';
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateFlashSaleDto, Item_FlashSale } from './dto/create-flash_sale.dto';
import { UpdateFlashSaleDto } from './dto/update-flash_sale.dto';
import { Like, getConnection } from 'typeorm';
import { ItemFlashsaleService } from '../item_flashsale/item_flashsale.service';
const dateNow = new Date();

@Injectable()
export class FlashSaleService {
  constructor(public flashSaleRepository: FlashSaleRepository,
    private itemFSService: ItemFlashsaleService,
  ) { }

  async findAll(query) {
    const take = query.take || process.env.TAKE_PAGE;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keywork || '';
    // console.log(keyword);
    const data = await this.flashSaleRepository.findAndOptions({
      where: { nameSale: Like('%' + keyword + '%') },
      order: {
        nameSale: query.order,
      },
      take: take,
      skip: skip,
    });

    return await this.flashSaleRepository.paginateResponse(data, page, take);
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

  async create(createFlashSaleDto: CreateFlashSaleDto) {
    const { nameSale, timeStart, timeEnd, itemFlashSale, ...data } = createFlashSaleDto;;
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
      return fs;

    }
  }

  async update(id: number, updateFlashSaleDto: UpdateFlashSaleDto) {
    const { nameSale, timeStart, timeEnd, ...data } = updateFlashSaleDto;

    const saleFound = await this.findOne(id);
    if (saleFound === null)
      throw new NotFoundException(`Not found sale id ${id}`);
    const timeS = new Date(timeStart);
    const timeE = new Date(timeEnd);

    if (timeS.getTime() < dateNow.getTime()) {
      throw new ConflictException('start time must not be less than current time');
    }
    if (timeS.getTime() > timeE.getTime())
      throw new ConflictException('the start time cannot be greater than the end time');
    const checkTime = await this.checkTime(timeStart, timeEnd);
    if (checkTime)
      throw new ConflictException('The times do not coincide');
    const saleUpdate = {
      nameSale,
      timeStart,
      timeEnd,
      ...data,
    };
    await this.flashSaleRepository.update(id, saleUpdate);

    return { message: `Sale updated successfully with id is ${id}` };
  }

  async remove(id: number) {
    const saleFound = await this.findOne(id);
    if (saleFound === null)
      throw new NotFoundException(`Not found sale id ${id}`);
    await this.flashSaleRepository.delete(id);
    const itemFS = await this.itemFSService.itemFSRepository.findAndOptions({
      where: { flashSale: saleFound },
    })
    await this.itemFSService.itemFSRepository.delete(itemFS);

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
