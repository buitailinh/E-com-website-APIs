import { OrderDetail } from './../../order_detail/entities/order_detail.entity';
import { User } from './../../users/entities/user.entity';
import { Voucher } from './../../voucher/entities/voucher.entity';
import { BaseEntity } from 'src/share/database/BaseEntity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ORDER_CONST } from './../order.constant';


@Entity({ name: ORDER_CONST.ORDER_NAME })
export class Order extends BaseEntity {
    @Column({ default: 0 })
    total: number

    @Column()
    fullname: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    note: string;

    @Column('datetime')
    dateOrder: Date;

    @ManyToOne(() => Voucher, (voucher) => voucher.orders)
    voucher?: Voucher;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
    order_details: OrderDetail[];

}
