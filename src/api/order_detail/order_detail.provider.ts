import { Connection } from 'typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { ORDER_DETAIL_CONST } from './order_detail.constant';
export const orderDetailProvider = [
    {
        provide: ORDER_DETAIL_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(OrderDetail),
        inject: ["DATABASE_CONNECTION"]
    }
]