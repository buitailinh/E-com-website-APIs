import { StatusDto } from './dto/status-order.dto';
import { AppKey } from '../../share/common/app.key';
import { async } from 'rxjs';
import { query } from 'express';
import { User } from './../users/entities/user.entity';
import { OrderRepository } from './order.repository';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { VoucherService } from '../voucher/voucher.service';
import { OrderDetailService } from '../order_detail/order_detail.service';
import { Like } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrderService {

  constructor(
    public orderRepository: OrderRepository,
    private readonly voucherService: VoucherService,
    private readonly orderDetailService: OrderDetailService,

  ) { }

  async findAll(query) {
    const take = query.take || process.env.TAKE_PAGE;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keywork || '';

    const data = await this.orderRepository.findAndOptions({
      where: { id: Like('%' + keyword + '%') },
      order: {
        id: query.order,
      },
      take: take,
      skip: skip,
    });

    return await this.orderRepository.paginateResponse(data, page, take);
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOneByCondition({
      where: { id },
      relations: ['user', 'order_details', 'voucher'],
    });
    if (!order) throw new Error(`Order ${id} not found`);
    return order;
  }

  async getOrderByUser(user: User) {
    const order = await this.orderRepository.findOneByCondition({
      where: { user },
    })
    return order;
  }

  async create(createOrderDto: CreateOrderDto, user: User) {
    try {
      let total = 0;
      const { codeVoucher, order_Details, ...data } = createOrderDto;
      // check item coincident
      const orderDetails = Object.values(
        order_Details.reduce((acc, item) => {
          acc[item.itemId] = acc[item.itemId] ? { ...item, quantity: item.quantity + acc[item.itemId].quantity, } : item;
          return acc;
        }, {}),
      );
      // Create order
      const order = await this.orderRepository.create({
        fullname: user.fullname,
        address: user.address,
        phone: user.phone,
        user,
        ...data,
      });

      await this.orderRepository.save(order);
      if (order) {
        const order_detail = await orderDetails.map((order_detail) => {
          return this.orderDetailService.create(order_detail, order);
        });
        const orders = await Promise.all(order_detail);
        await orders.map((orderDetail) => {
          total += orderDetail.price;
        });

        //check voucher
        if (codeVoucher) {
          const dateNow = new Date().getTime();
          const voucher = await this.voucherService.getByCodeVoucher(codeVoucher);
          if (voucher === null) throw new NotFoundException({ message: AppKey.ERROR_MESSAGE.VOUCHER.ERR_CODEVOURCH_NOT_EXIST });
          const timeStart = new Date(voucher.timeStart).getTime();
          const timeEnd = new Date(voucher.timeEnd).getTime();
          if (voucher.status === false) throw new ConflictException('Voucher inactive');
          if (voucher.quantity === 0) throw new ConflictException('It is over');
          if (dateNow < timeStart || dateNow > timeEnd) throw new ConflictException('Voucher expired ');
          voucher.quantity = voucher.quantity - 1;
          await this.voucherService.voucherRepository.save(voucher);
          total = (total * (100 - voucher.sale)) / 100;
          order.voucher = voucher;
        }
        order.total = total;
        return await this.orderRepository.save(order);
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, user: User) {
    const order = await this.findOne(id);
    if (order.user.id !== user.id) throw new NotFoundException({ message: 'user not ....' })
    await this.orderRepository.save({ ...order, ...updateOrderDto });
    return { code: 200, message: 'Order updated successfully' };
  }

  async updateStatus(id: number, status) {
    console.log(status);
    const order = await this.findOne(id);
    await this.orderRepository.save({ ...order, status });
    return { code: 200, message: `Order with ID order ${id} and status ${status} updated successfully` };
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return { code: 200, message: `Order deleted successfully with id ${order.id}` };
  }
}

