import { ORDER_CONST } from './order.constant';
import { Inject, Injectable } from "@nestjs/common";
import { TypeOrmRepository } from "../../share/database/typeorm.repository";
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository extends TypeOrmRepository<Order>{
    constructor(
        @Inject(ORDER_CONST.MODEL_PROVIDER)
        order: Repository<Order>,
    ) {
        super(order)
    }
}