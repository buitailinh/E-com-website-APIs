import { ORDER_DETAIL_CONST } from './order_detail.constant';
import { Inject, Injectable } from "@nestjs/common";
import { TypeOrmRepository } from "src/share/database/typeorm.repository";
import { OrderDetail } from "./entities/order_detail.entity";
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailRepository extends TypeOrmRepository<OrderDetail>{
    constructor(
        @Inject(ORDER_DETAIL_CONST.MODEL_PROVIDER)
        order_detail: Repository<OrderDetail>,
    ) {
        super(order_detail);
    }
}
