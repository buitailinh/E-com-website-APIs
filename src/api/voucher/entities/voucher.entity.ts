import { Order } from './../../order/entities/order.entity';
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from './../../../share/database/BaseEntity';
import { VOUCHER_CONST } from "../voucher.constant";



@Entity({ name: VOUCHER_CONST.MODEL_NAME })
export class Voucher extends BaseEntity {

    @Column({ length: 255, unique: true })
    nameVoucher: string;

    @Column({ length: 255, unique: true })
    codeVoucher: string;

    @Column()
    sale?: number;

    @Column({})
    quantity?: number;

    @Column({ default: true })
    status?: boolean;

    @Column('datetime', {
    })
    timeStart: Date;

    @Column('datetime', {
    })
    timeEnd: Date;

    @OneToMany(() => Order, (order) => order.voucher)
    orders: Order[];
}
