import { VOUCHER_CONST } from './voucher.constant';
import { AppKey } from '../../share/common/app.key';
import { query } from 'express';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { VoucherRepository } from './voucher.repository';
import { Like } from 'typeorm';
const dateNow = new Date();

@Injectable()
export class VoucherService {
  constructor(public voucherRepository: VoucherRepository) { }

  async findAll(query) {
    const take = query.take || process.env.TAKE_PAGE;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keywork || '';
    // console.log(keyword);
    const data = await this.voucherRepository.findAndOptions({
      where: { nameVoucher: Like('%' + keyword + '%') },
      order: {
        nameVoucher: query.order,
      },
      take: take,
      skip: skip,
    });

    return await this.voucherRepository.paginateResponse(data, page, take);
  }


  async findOne(id: number) {
    const voucher = await this.voucherRepository.findOneByCondition({
      where: {
        id,
      }
    });
    if (!voucher) throw new NotFoundException(AppKey.ERROR_MESSAGE.VOUCHER.ERR_ID_NOT_EXIST);
    return voucher;
  }

  async getByCodeVoucher(codeVoucher: string) {
    const voucher = await this.voucherRepository.findOneByCondition({
      where: {
        codeVoucher,
      }
    });
    if (!voucher) return null;
    return voucher;
  }

  async create(createVoucherDto: CreateVoucherDto) {
    const { codeVoucher, quantity, sale, timeStart, timeEnd, ...data } = createVoucherDto;
    const voucher = await this.getByCodeVoucher(codeVoucher);
    if (voucher) throw new NotFoundException(AppKey.ERROR_MESSAGE.VOUCHER.ERR_CODEVOURCH_EXITS);

    const timeS = new Date(timeStart);
    const timeE = new Date(timeEnd);
    if (timeS.getTime() < dateNow.getTime()) {
      throw new NotFoundException({ message: 'start time must be greater than current time' });
    }
    if (timeS.getTime() > timeE.getTime()) throw new NotFoundException({ message: 'start time must be less than end time' });
    return await this.voucherRepository.save(createVoucherDto);
  }

  async update(id: number, updateVoucherDto: UpdateVoucherDto) {
    const { codeVoucher, quantity, timeStart, timeEnd, ...data } = updateVoucherDto;
    const voucher = await this.findOne(id);
    const codeVoucherFound = await this.getByCodeVoucher(codeVoucher);
    if (codeVoucherFound && codeVoucherFound.codeVoucher !== voucher.codeVoucher) throw new NotFoundException(AppKey.ERROR_MESSAGE.VOUCHER.ERR_CODEVOURCH_EXITS);
    const timeS = new Date(timeStart);
    const timeE = new Date(timeEnd);

    if (timeS.getTime() < dateNow.getTime()) {
      throw new NotFoundException({ message: 'start time must be greater than current time' });
    }
    if (timeS.getTime() > timeE.getTime()) throw new NotFoundException({ message: 'start time must be less than end time' });
    const voucherUpdate = {
      codeVoucher,
      quantity,
      timeStart: timeS,
      timeEnd: timeE,
      ...data
    }
    return await this.voucherRepository.update(id, voucherUpdate);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.voucherRepository.delete(id);
    return { message: 'deleted successfully with id: ' + id };
  }
}
