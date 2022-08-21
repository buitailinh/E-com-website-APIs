import { Order } from './../../order/entities/order.entity';
import { BaseEntity } from './../../../share/database/BaseEntity';
import { USER_CONST } from './../users.constant';
import { Column, Entity, OneToMany } from "typeorm";
import { Exclude, Transform, Type } from 'class-transformer';
import { AppObject } from 'src/share/common/app.object';

@Entity({ name: USER_CONST.MODEL_NAME })
export class User extends BaseEntity {
    @Column({ length: 255, unique: true })
    email: string;

    @Column({ length: 255, default: null })
    fullname?: string;

    @Exclude()
    @Column({ length: 255, select: true })
    password: string;

    @Column({ type: 'enum', enum: AppObject.USER_MODULE.ROLE, default: AppObject.USER_MODULE.ROLE.CLIENT })
    role: string;

    @Column({ default: null })
    phone?: string;

    @Column({ length: 255 })
    address?: string;

    @Column({ default: null })
    brithday: Date;

    @Column({ default: null })
    avatar: string;

    @Column({ default: false })
    isVerify: boolean;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

}
