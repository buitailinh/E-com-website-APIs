import { Item } from './../../items/entities/item.entity';
import { FlashSale } from './../../flash_sale/entities/flash_sale.entity';
import { ITEM_FLASHSALE_CONST } from './../item_flashsale.constant';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './../../../share/database/BaseEntity';


@Entity({ name: ITEM_FLASHSALE_CONST.MODEL_NAME })
export class ItemFlashsale extends BaseEntity {
    @Column('int')
    sale: number;

    @Column('int')
    quantity: number;

    @ManyToOne(() => FlashSale, (flashSale) => flashSale.itemFlashSales)
    flashSale: FlashSale;

    @ManyToOne(() => Item, (item) => item.itemFlashSales)
    item: Item;
}
