import { query } from 'express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ItemsService } from '../items/items.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { OrderDetailRepository } from './order_detail.repository';
import { ItemFlashsaleService } from '../item_flashsale/item_flashsale.service';
import { identity } from 'rxjs';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    private readonly orderDetailRepository: OrderDetailRepository,
    private readonly itemsService: ItemsService,
    private readonly itemFSService: ItemFlashsaleService,
  ) { }

  async findAll(query) {
    const keyword = query.keyword || '';
    return await this.orderDetailRepository.findOneByCondition({
      where: {},
      order: { price: query.order },
    });
  }

  async findOne(id: number) {
    const orderDetail = await this.orderDetailRepository.findOneByCondition({
      where: { id },
      relations: ['item'],
    });
    if (!orderDetail) return null;
    return orderDetail;
  }

  async create(createOrderDetailDto: CreateOrderDetailDto, order: Order) {
    let price = 0;
    const { quantity, itemId } = createOrderDetailDto;
    const item = await this.itemsService.getById(itemId);
    if (item.is_sale === true) {
      const itemSale = await this.itemsService.getItemWithFS(item.id);
      if (itemSale) {
        if (quantity > itemSale.item_flashsale_quantity || itemSale.item_flashsale_quantity === 0) {
          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: `purchase quantity does not exceed ${itemSale.item_flashsale_quantity} item`,
            },
            HttpStatus.FORBIDDEN,
          );
        }
        price = itemSale.total * quantity;
        const item_flashsale = await this.itemFSService.findOne(
          itemSale.item_flashsale_id,
        );
        if (item_flashsale !== null)
          item_flashsale.quantity = item_flashsale.quantity - quantity;
        await this.itemFSService.itemFSRepository.save(item_flashsale);
      }
    } else {
      if (quantity > item.quantity || item.quantity === 0) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: `purchase quantity does not exceed ${item.quantity} item`,
          },
          HttpStatus.FORBIDDEN
        );
      }
      price = item.total * quantity;
      console.log('price', price, 'item price', item.total);
    }
    item.quantity -= quantity;
    await this.itemsService.itemRepository.save(item);
    const orderDetailNew = {
      order,
      price,
      quantity,
      item,
    }
    return this.orderDetailRepository.save(orderDetailNew);
  }

  // update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) { }

  async remove(id: number) {
    const OrderDetail = await this.findOne(id);
    if (OrderDetail === null) return { code: 200, message: 'Order detail not found' };
    await this.orderDetailRepository.delete(id);
    return { code: 200, message: 'Order detail deleted successfully' };
  }
}
