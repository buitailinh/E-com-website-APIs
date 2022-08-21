import { OrderDetail } from './../../order_detail/entities/order_detail.entity';
import { ItemFlashsale } from './../../item_flashsale/entities/item_flashsale.entity';
import { Category } from './../../category/entities/category.entity';
import { IsNotEmpty, IsNumber, IsString, Length, Max, Min, MinLength, validate } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ITEM_CONST } from '../items.constant';
import { Image } from 'src/api/images/entities/image.entity';
import { BaseEntity } from './../../../share/database/BaseEntity';
@Entity({ name: ITEM_CONST.MODEL_NAME })
export class Item extends BaseEntity {
    @Column({ length: 255, unique: true, })
    nameItem: string;

    @Column({ length: 255, unique: true, })
    barcode: string;

    @Column()
    priceIM: number;

    @Column()
    priceEX: number;

    @Column({ default: null })
    imageMain?: string;

    @Column({ length: 255, default: null })
    description?: string;

    @Column({ default: 0 })
    sale?: number;

    @Column({ default: false })
    is_sale: boolean;

    @Column('integer')
    quantity?: number;

    @ManyToOne(() => Category, (category) => category.items)
    category?: Category;

    @OneToMany(() => Image, (image) => image.item, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    images: Image[];

    @OneToMany(() => ItemFlashsale, (itemFlashSale) => itemFlashSale.item)
    itemFlashSales: ItemFlashsale[];

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.item)
    order_details: OrderDetail[];
}
