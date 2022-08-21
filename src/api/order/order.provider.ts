import { Connection } from 'typeorm';
import { Order } from './entities/order.entity';
import { ORDER_CONST } from './order.constant';
export const orderProvider = [
    {
        provide: ORDER_CONST.MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.getRepository(Order),
        inject: ['DATABASE_CONNECTION']
    }
]