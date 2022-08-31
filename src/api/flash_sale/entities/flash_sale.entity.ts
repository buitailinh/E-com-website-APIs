import { ItemFlashsale } from './../../item_flashsale/entities/item_flashsale.entity';
import { BaseEntity } from './../../../share/database/BaseEntity';
import format from 'date-fns/format';
import parseJSON from 'date-fns/parseJSON';
import { Column, Entity, OneToMany } from 'typeorm';
import { FLASH_SALE_CONST } from '../flash_sale.constant';
import { ApiTags } from '@nestjs/swagger';


@Entity({ name: FLASH_SALE_CONST.MODEL_NAME })
export class FlashSale extends BaseEntity {
    @Column({ length: 255, unique: true })
    nameSale: string;

    @Column('datetime', {})
    timeStart: Date;

    @Column('datetime', {})
    timeEnd: Date;

    @Column({ length: 255, default: null })
    description: string;

    @OneToMany(() => ItemFlashsale, (itemFalshSale) => itemFalshSale.flashSale,

    )
    itemFlashSales: ItemFlashsale[];
}
