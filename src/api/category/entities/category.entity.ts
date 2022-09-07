import { Item } from './../../items/entities/item.entity';
import { BaseEntity } from './../../../share/database/BaseEntity';
import { CATEGORY_CONST } from './../category.constant';
import { Column, Entity, OneToMany, getConnection } from 'typeorm';

@Entity({ name: CATEGORY_CONST.MODEL_NAME })
export class Category extends BaseEntity {
    @Column({ length: 255, unique: true })
    nameCategory: string;

    @Column({ nullable: true })
    banner?: string;

    @Column({ default: true })
    active?: boolean;

    @OneToMany(() => Item, (item) => item.category,)
    items: Item[];

    @Column({ default: 0 })
    amount?: number;
}
