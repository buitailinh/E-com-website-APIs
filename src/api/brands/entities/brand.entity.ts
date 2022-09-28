import { Item } from './../../items/entities/item.entity';
import { BaseEntity } from './../../../share/database/BaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BRAND_CONST } from './../brands.constant';

@Entity({ name: BRAND_CONST.MODEL_NAME })
export class Brand extends BaseEntity {
    @Column({ length: 255, unique: true })
    nameBrand: string;

    @OneToMany(() => Item, (item) => item.brand)
    items: Item[];

    @Column({ default: 0 })
    amount?: number;
}
