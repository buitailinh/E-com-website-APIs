import { User } from './../../users/entities/user.entity';
import { Item } from './../../items/entities/item.entity';
import { BaseEntity } from './../../../share/database/BaseEntity';
import { FAVORITEITEM_CONST } from './../favorite_item.constant';
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: FAVORITEITEM_CONST.MODEL_NAME })
export class FavoriteItem extends BaseEntity {
    @Column({ default: false })
    is_order: boolean;

    @ManyToOne(() => Item, (item) => item.favorites, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    item?: Item;

    @ManyToOne(() => User, (user) => user.favorites, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    user?: User;
}
