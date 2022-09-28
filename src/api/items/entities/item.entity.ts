import { Brand } from './../../brands/entities/brand.entity';
import { OrderDetail } from './../../order_detail/entities/order_detail.entity';
import { ItemFlashsale } from './../../item_flashsale/entities/item_flashsale.entity';
import { Category } from './../../category/entities/category.entity';
import { IsNotEmpty, IsNumber, IsString, Length, Max, Min, MinLength, validate } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ITEM_CONST } from '../items.constant';
import { Image } from './../../images/entities/image.entity';

import { BaseEntity } from './../../../share/database/BaseEntity';
import { FavoriteItem } from 'src/api/favorite_item/entities/favorite_item.entity';
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

    @Column({ default: 0 })
    total: number;

    @Column({ default: null })
    imageMain?: string;

    @Column({ length: 255, default: null })
    description?: string;

    @Column({ default: 0 })
    sale?: number;

    @Column({ default: false })
    is_sale?: boolean;

    @Column('integer')
    quantity?: number;

    @ManyToOne(() => Category, (category) => category.items, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    category?: Category;


    @ManyToOne(() => Brand, (brand) => brand.items, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    brand?: Brand;

    @OneToMany(() => Image, (image) => image.item)
    images: Image[];

    @OneToMany(() => ItemFlashsale, (itemFlashSale) => itemFlashSale.item)
    itemFlashSales: ItemFlashsale[];

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.item)
    order_details: OrderDetail[];

    @OneToMany(() => FavoriteItem, (favoriteItem) => favoriteItem.item)
    favorites: FavoriteItem[];
}
