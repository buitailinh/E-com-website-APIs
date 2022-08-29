import { AppObject } from '../../../share/common/app.object';
import { BaseEntity } from './../../../share/database/BaseEntity';
import { OrderDetail } from './../../order_detail/entities/order_detail.entity';
import { User } from './../../users/entities/user.entity';
import { Voucher } from './../../voucher/entities/voucher.entity';
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

    @Column({ type: 'enum', enum: AppObject.ORDER.STATUS, default: AppObject.ORDER.STATUS.WFC })
    status: string;

    @ManyToOne(() => Voucher, (voucher) => voucher.orders)
    voucher?: Voucher;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
    order_details: OrderDetail[];

}
