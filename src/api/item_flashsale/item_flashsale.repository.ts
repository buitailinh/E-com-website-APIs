import { ITEM_FLASHSALE_CONST } from './item_flashsale.constant';
import { TypeOrmRepository } from './../../share/database/typeorm.repository';
import { ItemFlashsale } from './entities/item_flashsale.entity';
import { Inject, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';

@Injectable()
export class ItemFlashsaleRepository extends TypeOrmRepository<ItemFlashsale>{
    constructor(
        @Inject(ITEM_FLASHSALE_CONST.MODEL_PROVIDER)
        itemFSEntity: Repository<ItemFlashsale>
    ) {
        super(itemFSEntity);
    }
}