import { Item } from './../../items/entities/item.entity';
import { BaseEntity } from "src/share/database/BaseEntity";
import { Column, Entity, ManyToOne } from "typeorm";
import { ORDER_DETAIL_CONST } from '../order_detail.constant'
import { Order } from 'src/api/order/entities/order.entity';
@Entity({ name: ORDER_DETAIL_CONST.MODEL_NAME })
export class OrderDetail extends BaseEntity {
    @Column({ type: 'double' })
    price: number;

    @Column({ type: 'int' })
    quantity: number;

    @ManyToOne(() => Item, (item) => item.order_details)
    item: Item;

    @ManyToOne(() => Order, (order) => order.order_details)
    order: Order;

}
